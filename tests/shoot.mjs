// Screenshot helper for visual QA. Usage: node tests/shoot.mjs <baseUrl> <outDir> [spec...]
// spec = name|path|width|height|scrollY|waitMs
import { chromium } from 'playwright-core';
import fs from 'node:fs';

const [, , base = 'http://localhost:3100', out = '/tmp/shots', ...specs] = process.argv;
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'] });
const errors = [];
for (const spec of specs) {
  const [name, path, w = '1440', h = '900', y = '0', waitMs = '1600', reduce = ''] = spec.split('|');
  const ctx = await browser.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, reducedMotion: reduce ? 'reduce' : 'no-preference', isMobile: +w < 600, hasTouch: +w < 600 });
  if (!reduce) await ctx.addInitScript(() => { try { localStorage.setItem('sh-3d', 'force'); } catch (e) {} });
  const page = await ctx.newPage();
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`${name}: ${m.text()}`); });
  page.on('pageerror', (e) => errors.push(`${name}: ${e.message}`));
  await page.goto(base + path, { waitUntil: 'networkidle' });
  if (+y) {
    // scroll in steps so scroll-driven scenes update
    const steps = 8;
    for (let i = 1; i <= steps; i++) { await page.evaluate((v) => window.scrollTo(0, v), Math.round((+y * i) / steps)); await page.waitForTimeout(60); }
  }
  await page.waitForTimeout(+waitMs);
  await page.screenshot({ path: `${out}/${name}.png`, timeout: 120000 });
  await ctx.close();
}
await browser.close();
if (errors.length) console.log('CONSOLE ERRORS:\n' + errors.join('\n')); else console.log('no console errors');
