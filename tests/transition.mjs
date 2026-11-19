import { chromium } from 'playwright-core';
const [, , w = '1440', h = '900', tag = 'd'] = process.argv;
const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required'] });
const ctx = await browser.newContext({ viewport: { width: +w, height: +h }, isMobile: +w < 600, hasTouch: +w < 600 });
const page = await ctx.newPage();
const errs = []; page.on('pageerror', e => errs.push(e.message)); page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
await page.goto('http://localhost:3100/stay', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
const t0 = Date.now();
await page.locator('.stay__actions a[data-enter="garden-villa"]').first().click();
for (const ms of [500, 1500, 3200, 5200, 7600]) {
  await page.waitForTimeout(Math.max(0, ms - (Date.now() - t0)));
  await page.screenshot({ path: `/tmp/shots/${tag}-tr-${ms}.png` });
}
await page.waitForURL('**/stay/garden-villa', { timeout: 15000 });
await page.waitForTimeout(1500);
console.log('landed at', page.url(), 'after', Date.now() - t0, 'ms', 'arriving class:', await page.locator('.room-hero.is-arriving').count());
await page.screenshot({ path: `/tmp/shots/${tag}-tr-landed.png` });
console.log(errs.length ? errs.join('\n') : 'no errors');
await browser.close();
