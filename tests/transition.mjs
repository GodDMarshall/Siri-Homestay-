// Screenshots of the "Step inside" room entry, for visual QA.
// Usage: node tests/transition.mjs [baseUrl] [width] [height] [tag] [mode]
//   mode "3d" forces the 3D flight in headless Chrome (software WebGL); "stills" shows the fallback.
import { chromium } from 'playwright-core';
import fs from 'node:fs';
const [, , base = 'http://localhost:3100', w = '1440', h = '900', tag = 'd', mode = '3d'] = process.argv;
fs.mkdirSync('/tmp/shots', { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: +w, height: +h }, isMobile: +w < 600, hasTouch: +w < 600 });
if (mode === '3d') await ctx.addInitScript(() => { try { localStorage.setItem('sh-3d', 'force'); } catch (e) {} });
const page = await ctx.newPage();
const errs = []; page.on('pageerror', (e) => errs.push(e.message)); page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
await page.goto(base + '/stay', { waitUntil: 'networkidle' });
const link = page.locator('.stay__actions a[data-enter="garden-villa"]').first();
await link.hover();
if (mode === '3d') await page.waitForFunction(() => window.SH.world && window.SH.world.world, null, { timeout: 120000 });
const t0 = Date.now();
await link.click();
for (const ms of [800, 2500, 4500, 6500]) {
  await page.waitForTimeout(Math.max(0, ms - (Date.now() - t0)));
  await page.screenshot({ path: `/tmp/shots/${tag}-tr-${ms}.png`, timeout: 120000 });
}
await page.waitForURL('**/stay/garden-villa', { timeout: 120000 });
await page.waitForTimeout(1500);
console.log('landed at', page.url(), 'after', Date.now() - t0, 'ms', 'arriving class:', await page.locator('.room-hero.is-arriving').count());
await page.screenshot({ path: `/tmp/shots/${tag}-tr-landed.png` });
console.log(errs.length ? errs.join('\n') : 'no errors');
await browser.close();
