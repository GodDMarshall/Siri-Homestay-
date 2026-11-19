#!/usr/bin/env node
// Renders the code-built estate from every named view to PNG, in headless Chrome.
//   node scripts/render-views.mjs --out ./renders [--views a,b] [--q ultra] [--pr 1.5] [--w 1600]
// Needs Chrome/Chromium (CHROME_PATH, default /usr/bin/google-chrome) and `npm run build:world`.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public');
const args = Object.fromEntries(process.argv.slice(2).reduce((a, v, i, all) => (v.startsWith('--') ? [...a, [v.slice(2), all[i + 1] && !all[i + 1].startsWith('--') ? all[i + 1] : true]] : a), []));
const OUT = path.resolve(args.out || 'renders');
const Q = args.q || 'ultra';
const PR = Number(args.pr || 1.5);
const LONG = Number(args.w || 1600);
fs.mkdirSync(OUT, { recursive: true });

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.woff2': 'font/woff2' };
const server = http.createServer((req, res) => {
  const p = path.normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^([/\\])+/, '');
  const file = path.join(ROOT, p);
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const port = server.address().port;

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome',
  args: ['--ignore-gpu-blocklist', '--enable-unsafe-swiftshader', '--use-angle=swiftshader'],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 960 } });
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') console.log('[page]', m.type(), m.text().slice(0, 300)); });
page.on('pageerror', (e) => console.log('[pageerror]', e.message));
await page.goto(`http://127.0.0.1:${port}/world/studio.html?q=${Q}&pr=${PR}&hide`);
await page.waitForFunction(() => window.studio && (window.studio.ready || window.studio.error), null, { timeout: 300000 });
const info0 = await page.evaluate(() => ({ ready: window.studio.ready, error: window.studio.error, buildMs: window.studio.buildMs, views: window.studio.world?.views }));
if (!info0.ready) { console.error(info0.error); process.exit(1); }
console.log(`world built in ${info0.buildMs} ms`);

if (args.eval) { const r = await page.evaluate(`(async () => { const w = window.studio.world; const THREE = await import('/js/world.js'); ${fs.readFileSync(args.eval, 'utf8')} })()`); console.log(JSON.stringify(r, null, 1)); }
const custom = args.spec ? JSON.parse(fs.readFileSync(args.spec, 'utf8')) : null;
const list = custom || (args.views ? String(args.views).split(',') : info0.views).map((v) => (typeof v === 'string' ? { view: v } : v));
const meta = fs.existsSync(path.join(OUT, 'renders.json')) ? JSON.parse(fs.readFileSync(path.join(OUT, 'renders.json'), 'utf8')) : {};
for (const item of list) {
  const name = item.name || item.view;
  const aspect = await page.evaluate((v) => (window.studio.world && v ? (window.studio.world.views.includes(v) ? null : null) : null), item.view);
  const portrait = item.portrait ?? (await page.evaluate(async (v) => {
    const mod = await import('/js/world.js');
    return (mod.VIEWS[v]?.aspect || 4 / 3) < 1;
  }, item.view));
  const w = item.w || (portrait ? Math.round(LONG * 0.75) : LONG), h = item.h || (portrait ? LONG : Math.round(LONG * 0.75));
  const t = Date.now();
  const { url, ms } = await page.evaluate((o) => window.studio.shot(o), { ...item, w, h });
  fs.writeFileSync(path.join(OUT, `${name}.png`), Buffer.from(url.split(',')[1], 'base64'));
  // where each named 3D anchor lands in this picture (0..1), for hotspots on the stills
  meta[name] = await page.evaluate(() => {
    const w = window.studio.world, c = w.renderer.domElement, out = {};
    for (const k of Object.keys(w.anchors)) {
      const p = w.project(k);
      if (p && p.visible) out[k] = [+(p.x / c.clientWidth).toFixed(4), +(p.y / c.clientHeight).toFixed(4)];
    }
    const s = w.state;
    return { w: c.clientWidth, h: c.clientHeight, camera: { pos: s.pos.toArray().map((v) => +v.toFixed(3)), target: s.target.toArray().map((v) => +v.toFixed(3)), fov: s.fov }, preset: w.preset, anchors: out };
  });
  console.log(`${name}: ${w}x${h} render ${ms} ms, total ${Date.now() - t} ms`, aspect ?? '');
}
fs.writeFileSync(path.join(OUT, 'renders.json'), JSON.stringify(meta, null, 1));
const info = await page.evaluate(() => window.studio.info());
console.log('renderer', JSON.stringify(info));
await browser.close();
server.close();
