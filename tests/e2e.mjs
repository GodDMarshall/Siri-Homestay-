// End-to-end QA: starts a fresh server on a temporary database, drives it with
// Chrome (playwright-core + system Chrome) and checks the full guest and owner flows.
// Usage: node tests/e2e.mjs   (writes tests/e2e-report.json)
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const PORT = 3200 + Math.floor(Math.random() * 300);
const BASE = `http://localhost:${PORT}`;
const DATA = fs.mkdtempSync(path.join(os.tmpdir(), 'sh-e2e-'));
const CHROME = process.env.CHROME_PATH || '/usr/bin/google-chrome';

const results = [];
function record(name, ok, detail = '') { results.push({ name, ok, detail }); console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  — ' + detail : ''}`); }
async function check(name, fn) { try { const d = await fn(); record(name, true, d || ''); } catch (e) { record(name, false, e.message.split('\n')[0]); } }
function assert(c, m) { if (!c) throw new Error(m); }
const day = (n) => { const d = new Date(); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };

const server = spawn(process.execPath, ['server.js'], { cwd: ROOT, env: { ...process.env, PORT: String(PORT), DATA_DIR: DATA, SITE_URL: BASE, NODE_ENV: 'test' }, stdio: ['ignore', 'pipe', 'pipe'] });
let log = ''; server.stdout.on('data', (d) => { log += d; }); server.stderr.on('data', (d) => { log += d; });
for (let i = 0; i < 50 && !log.includes('running at'); i++) await new Promise((r) => setTimeout(r, 100));

// WebGL in headless Chrome runs on SwiftShader; it has to be allowed explicitly.
const browser = await chromium.launch({ executablePath: CHROME, args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 860 } });
const page = await ctx.newPage();
page.setDefaultTimeout(10000);
const consoleErrors = [];
const badResponses = [];
page.on('response', (r) => { if (r.status() === 404 && !r.url().includes('/no-such-page')) badResponses.push(r.url()); });
page.on('pageerror', (e) => consoleErrors.push(e.message));
page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });

try {
  // ---------------------------------------------------------------- public pages
  await check('All public pages return 200 with a title and one h1', async () => {
    const paths = ['/', '/stay', '/stay/garden-villa', '/stay/whole-estate', '/explore', '/explore?spot=villa-pool', '/estate', '/around', '/gallery', '/contact', '/enquire', '/privacy'];
    for (const p of paths) {
      const res = await page.goto(BASE + p, { waitUntil: 'domcontentloaded' });
      assert(res.status() === 200, `${p} returned ${res.status()}`);
      const h1 = await page.locator('h1').count();
      assert(h1 === 1, `${p} has ${h1} h1 elements`);
      assert((await page.title()).includes('Siri Homestay'), `${p} title`);
    }
    return `${paths.length} pages`;
  });

  await check('404 page for unknown address', async () => {
    const res = await page.goto(BASE + '/no-such-page');
    assert(res.status() === 404, 'status ' + res.status());
  });

  await check('Old WordPress addresses redirect permanently', async () => {
    const r = await fetch(BASE + '/resort/chickmagalore-homestay/', { redirect: 'manual' });
    assert(r.status === 301 && r.headers.get('location') === '/stay', `${r.status} ${r.headers.get('location')}`);
  });

  await check('Contacts appear in the client’s order (Swetha, Ganesh, Dilip last)', async () => {
    await page.goto(BASE + '/contact');
    const names = await page.locator('.contact-page .contact__name').allTextContents();
    assert(JSON.stringify(names) === JSON.stringify(['Swetha Iyappa', 'Ganesh UT', 'Dilip']), names.join(', '));
    const tel = await page.locator('.contact-page a[href^="tel:"]').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
    assert(tel.join(',') === 'tel:+919845451273,tel:+919901769567,tel:+917795378068', tel.join(','));
  });

  await check('No OTA platform is shown as connected on the public site', async () => {
    for (const p of ['/', '/stay', '/stay/garden-villa', '/contact', '/enquire']) {
      await page.goto(BASE + p);
      const txt = (await page.locator('body').innerText()).toLowerCase();
      assert(!txt.includes('airbnb') && !txt.includes('makemytrip'), `${p} mentions a platform`);
    }
  });

  await check('Structured data is valid JSON-LD LodgingBusiness', async () => {
    await page.goto(BASE + '/');
    const ld = await page.locator('script[type="application/ld+json"]').first().textContent();
    const j = JSON.parse(ld);
    assert(j['@type'] === 'LodgingBusiness' && j.numberOfRooms === 5, 'type/rooms');
    assert(!('aggregateRating' in j), 'must not invent ratings');
  });

  await check('Security headers are set', async () => {
    const r = await fetch(BASE + '/');
    const h = Object.fromEntries(r.headers);
    assert(h['content-security-policy']?.includes("frame-ancestors 'none'"), 'CSP');
    assert(h['x-content-type-options'] === 'nosniff', 'nosniff');
    assert(!h['x-powered-by'], 'x-powered-by leaked');
    assert(h['referrer-policy'], 'referrer-policy');
  });

  // ---------------------------------------------------------------- enquiry flow
  await check('Empty enquiry shows an error summary linked to fields', async () => {
    await page.goto(BASE + '/enquire');
    await page.waitForTimeout(2800);
    await page.click('button[type="submit"]');
    await page.waitForLoadState('domcontentloaded');
    const items = await page.locator('[data-error-summary] li a').count();
    assert(items >= 4, `only ${items} errors listed`);
    assert(await page.locator('[aria-invalid="true"]').count() >= 3, 'fields not marked invalid');
  });

  let ref1;
  await check('Guest can send an enquiry and gets a reference', async () => {
    await page.goto(BASE + '/enquire?stay=garden-villa');
    await page.fill('#f-check_in', day(30));
    await page.fill('#f-check_out', day(32));
    await page.fill('#f-adults', '2');
    await page.fill('#f-full_name', 'Meera Shetty');
    await page.fill('#f-phone', '98860 12345');
    await page.fill('#f-email', 'meera@example.com');
    await page.fill('#f-message', 'Arriving around 4 pm. Vegetarian meals, please.');
    await page.check('#f-consent-box');
    assert((await page.locator('[data-nights]').textContent()).includes('2 nights'), 'nights hint');
    await page.waitForTimeout(2800);
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/enquire\/sent\/SH-/);
    ref1 = (await page.locator('.ref').textContent()).trim();
    assert(/^SH-[A-Z2-9]{6}$/.test(ref1), 'ref ' + ref1);
    const wa = await page.locator('a.btn[href^="https://wa.me/919845451273"]:has-text("Send it on WhatsApp too")').count();
    assert(wa === 1, 'WhatsApp hand-off to Swetha missing');
    return ref1;
  });

  await check('Confirmation page details are private to the sender', async () => {
    const r = await fetch(`${BASE}/enquire/sent/${ref1}`);
    const t = await r.text();
    assert(!t.includes('Meera'), 'guest name leaked to another browser');
  });

  await check('Bots: honeypot and instant posts are silently dropped', async () => {
    const before = log.length;
    const r = await fetch(BASE + '/enquire', { method: 'POST', redirect: 'manual', headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ room_type: 'garden-villa', check_in: day(40), check_out: day(41), adults: '2', full_name: 'Bot', phone: '9999999999', consent: '1', website: 'http://spam', _stamp: 'x.y' }) });
    assert(r.status === 303 && r.headers.get('location') === '/enquire/sent/received', `${r.status} ${r.headers.get('location')}`);
    return 'dropped without storing (verified in admin count below)';
  });

  await check('Cross-site form posts are refused', async () => {
    const r = await fetch(BASE + '/enquire', { method: 'POST', headers: { origin: 'https://evil.example', 'content-type': 'application/x-www-form-urlencoded' }, body: 'a=b' });
    assert(r.status === 403, 'status ' + r.status);
  });

  await check('Availability API reports "not published" by default', async () => {
    const j = await (await fetch(`${BASE}/api/availability?stay=garden-villa&from=${day(30)}&to=${day(32)}`)).json();
    assert(j.published === false && !j.days, JSON.stringify(j));
  });

  // ---------------------------------------------------------------- admin
  const creds = fs.readFileSync(path.join(DATA, 'INITIAL-ADMIN-LOGIN.txt'), 'utf8');
  const email = /Email: (.+)/.exec(creds)[1].trim(), tempPw = /Password: (.+)/.exec(creds)[1].trim();
  const newPw = 'a quiet walk across the lawn 2026';

  await check('Admin requires sign-in', async () => {
    const r = await fetch(BASE + '/admin/bookings', { redirect: 'manual' });
    assert(r.status === 303 && r.headers.get('location').startsWith('/admin/login'), String(r.status));
  });

  await check('Wrong password is refused', async () => {
    await page.goto(BASE + '/admin/login');
    await page.fill('#email', email); await page.fill('#password', 'wrong-password-123');
    await page.click('button[type="submit"]');
    assert(await page.locator('.error').count() === 1, 'no error shown');
  });

  await check('First sign-in forces a password change', async () => {
    await page.goto(BASE + '/admin/login');
    await page.fill('#email', email); await page.fill('#password', tempPw);
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin/password');
    // The field has minlength=12 in the browser; switch that off to prove the server also refuses.
    await page.evaluate(() => { document.querySelector('form[action="/admin/password"]').noValidate = true; });
    await page.fill('#current', tempPw); await page.fill('#next', 'short'); await page.fill('#confirm', 'short');
    await page.click('form[action="/admin/password"] button[type="submit"]');
    assert(await page.locator('.error').count() === 1, 'short password accepted');
    await page.fill('#current', tempPw); await page.fill('#next', newPw); await page.fill('#confirm', newPw);
    await page.click('form[action="/admin/password"] button[type="submit"]');
    await page.waitForURL('**/admin?msg=password');
  });

  await check('Overview lists the new enquiry and the setup checklist', async () => {
    await page.goto(BASE + '/admin');
    assert((await page.locator('.stat__n').first().textContent()).trim() === '1', 'expected exactly 1 new enquiry (bot dropped)');
    assert(await page.locator(`text=${ref1}`).count() >= 1, 'ref not listed');
    assert(await page.locator('.checklist li').count() >= 3, 'checklist');
  });

  let id1;
  await check('Owner confirms the enquiry into Villa 1', async () => {
    await page.click(`a:has-text("${ref1}")`);
    id1 = page.url().split('/').pop();
    await page.check('input[name="unit_ids"][value="1"]');
    await page.click('button[name="to"][value="confirmed"]');
    await page.waitForURL(/msg=confirmed/);
    assert((await page.locator('.badge').first().textContent()).includes('Confirmed'), 'badge');
    assert(await page.locator('dd:has-text("Villa 1")').count() === 1, 'villa not allocated');
  });

  await check('Overlapping booking for the same villa is refused', async () => {
    await page.goto(BASE + '/admin/bookings/new');
    await page.selectOption('#room_type', 'garden-villa');
    await page.fill('#units', '1');
    await page.selectOption('#status', 'confirmed');
    await page.check('input[name="unit_ids"][value="1"]');
    await page.fill('#check_in', day(31)); await page.fill('#check_out', day(33));
    await page.fill('#full_name', 'Phone Guest'); await page.fill('#phone', '9900011122');
    await page.click('button:has-text("Add booking")');
    const err = await page.locator('.error').first().textContent();
    assert(/Villa 1 is already booked/.test(err), err);
  });

  await check('Same dates in a different villa are accepted', async () => {
    await page.uncheck('input[name="unit_ids"][value="1"]').catch(() => {});
    await page.check('input[name="unit_ids"][value="2"]');
    await page.click('button:has-text("Add booking")');
    await page.waitForURL(/msg=created/);
    assert(await page.locator('dd:has-text("Villa 2")').count() === 1, 'Villa 2 not allocated');
  });

  await check('Whole-estate booking is refused while any villa is taken', async () => {
    await page.goto(BASE + '/admin/bookings/new');
    await page.selectOption('#room_type', 'whole-estate');
    await page.fill('#check_in', day(31)); await page.fill('#check_out', day(32));
    await page.fill('#adults', '10'); await page.fill('#full_name', 'Group'); await page.fill('#phone', '9900011133');
    await page.click('button:has-text("Add booking")');
    const err = await page.locator('.error').first().textContent();
    assert(/already booked/.test(err), err);
  });

  await check('Owner blocks dates; overlapping block is refused', async () => {
    await page.goto(BASE + '/admin/calendar');
    await page.selectOption('#unit', '3');
    await page.fill('#bs', day(45)); await page.fill('#be', day(48)); await page.fill('#reason', 'Painting');
    await page.click('button:has-text("Block dates")');
    await page.waitForURL(/msg=blocked/);
    await page.selectOption('#unit', '3');
    await page.fill('#bs', day(47)); await page.fill('#be', day(49));
    await page.click('button:has-text("Block dates")');
    const err = await page.locator('.error').first().textContent();
    assert(/Villa 3 is blocked/.test(err), err);
  });

  await check('Calendar grid shows the confirmed booking', async () => {
    const d = day(30);
    await page.goto(`${BASE}/admin/calendar?month=${d.slice(0, 8)}01`);
    assert(await page.locator('td.cell--confirmed').count() >= 2, 'no confirmed cells');
  });

  await check('Villa calendar exports as iCalendar', async () => {
    const cookies = await ctx.cookies();
    const r = await fetch(BASE + '/admin/units/1/calendar.ics', { headers: { cookie: cookies.map((c) => `${c.name}=${c.value}`).join('; ') } });
    const t = await r.text();
    assert(r.headers.get('content-type').includes('text/calendar') && t.includes(`DTSTART;VALUE=DATE:${day(30).replace(/-/g, '')}`), 'ics');
  });

  await check('Admin POST without CSRF token is refused', async () => {
    const cookies = await ctx.cookies();
    const r = await fetch(BASE + '/admin/settings', { method: 'POST', headers: { cookie: cookies.map((c) => `${c.name}=${c.value}`).join('; '), 'content-type': 'application/x-www-form-urlencoded' }, body: 'publish_availability=1' });
    assert(r.status === 403, 'status ' + r.status);
  });

  await check('Publishing the calendar exposes only real ledger data', async () => {
    await page.goto(BASE + '/admin/settings');
    await page.check('input[name="publish_availability"]');
    await page.click('button:has-text("Save settings")');
    await page.waitForURL(/msg=saved/);
    const j = await (await fetch(`${BASE}/api/availability?stay=garden-villa&from=${day(30)}&to=${day(33)}`)).json();
    assert(j.published === true, 'not published');
    // Villa 1 is booked for days 30–31, Villa 2 for days 31–32.
    assert(j.days[day(30)].free === 4 && j.days[day(31)].free === 3 && j.days[day(32)].free === 4, JSON.stringify(j.days));
    const e = await (await fetch(`${BASE}/api/availability?stay=whole-estate&from=${day(30)}&to=${day(31)}`)).json();
    assert(e.minFree === 0, 'whole estate should be unavailable');
  });

  await check('With the calendar published, enquiries for full dates are refused', async () => {
    // Fill the remaining villas on day 30 via blocks, then try to enquire.
    for (const u of ['2', '3', '4', '5']) {
      await page.goto(BASE + '/admin/calendar');
      await page.selectOption('#unit', u); await page.fill('#bs', day(30)); await page.fill('#be', day(31));
      await page.click('button:has-text("Block dates")');
    }
    const p2 = await ctx.newPage();
    await p2.goto(BASE + '/enquire?stay=garden-villa');
    await p2.fill('#f-check_in', day(30)); await p2.fill('#f-check_out', day(31));
    await p2.waitForSelector('.avail-note.is-full', { timeout: 4000 });
    await p2.fill('#f-full_name', 'Late Guest'); await p2.fill('#f-phone', '9845098450'); await p2.check('#f-consent-box');
    await p2.waitForTimeout(2800);
    await p2.click('button[type="submit"]');
    await p2.waitForLoadState('domcontentloaded');
    assert(await p2.locator('text=Those dates look full').count() === 1, 'not refused');
    await p2.close();
  });

  await check('Channel references are stored as "Not connected"', async () => {
    await page.goto(BASE + '/admin/channels');
    assert(await page.locator('text=not connected').count() >= 1, 'banner');
    await page.selectOption('#prov', 'airbnb');
    await page.selectOption('#target', 'unit:4');
    await page.fill('#xid', '12345678');
    await page.fill('#xurl', 'https://www.airbnb.co.in/rooms/12345678');
    await page.click('button:has-text("Save reference")');
    await page.waitForURL(/msg=saved/);
    assert(await page.locator('td .badge--off:has-text("Not connected")').count() === 1, 'status');
    assert(await page.locator('text=No syncs have run').count() === 1, 'sync history');
  });

  await check('Emails are queued and shown as "not set up" without SMTP', async () => {
    await page.goto(BASE + '/admin/emails');
    assert(await page.locator('text=Email isn’t set up yet').count() === 1, 'banner');
    const rows = await page.locator('tbody tr').count();
    assert(rows === 4, `expected 4 queued emails (2 hosts + guest acknowledgement + guest confirmation), got ${rows}`);
  });

  await check('Owner edits the rate shown on the website', async () => {
    await page.goto(BASE + '/admin/stays');
    const form = page.locator('form[action="/admin/stays/1"]');
    await form.locator('input[name="rate_mode"][value="from"]').check();
    await form.locator('input[name="rate_from_inr"]').fill('4500');
    await form.locator('input[name="rate_basis"]').fill('per villa per night');
    await form.locator('button[type="submit"]').click();
    await page.waitForURL(/msg=saved/);
    await page.goto(BASE + '/stay/garden-villa');
    assert(await page.locator('dd:has-text("From ₹4,500 per villa per night")').count() === 1, 'rate not shown');
    // put it back to "on request" so no unverified price stays live
    await page.goto(BASE + '/admin/stays');
    await page.locator('form[action="/admin/stays/1"] input[name="rate_mode"][value="on_request"]').check();
    await page.locator('form[action="/admin/stays/1"] button[type="submit"]').click();
  });

  await check('Booking history records every change', async () => {
    await page.goto(`${BASE}/admin/bookings/${id1}`);
    const items = await page.locator('.timeline li').allTextContents();
    assert(items.some((t) => t.includes('Enquiry received')) && items.some((t) => t.includes('Confirmed')), items.join(' | '));
  });

  // ---------------------------------------------------------------- photos, tour and room views
  await check('Every picture is one of the owners’ photos; the old code-built world is gone', async () => {
    const m = await (await fetch(BASE + '/media/manifest.json')).json();
    const keys = Object.keys(m.photos || {});
    assert(keys.length === 20, `${keys.length} photos in the manifest`);
    assert(keys.filter((k) => m.photos[k].source === 'video').every((k) => k.startsWith('bath-')), 'only the bathroom comes from the video');
    assert(!m.renders, 'renders still listed');
    for (const u of ['/js/world.js', '/js/estate3d.js', '/js/cinema.js', '/world/studio.html', '/media/renders/villa-bedroom-1024.webp']) {
      const r = await fetch(BASE + u); assert(r.status === 404, `${u} is still served`);
    }
    for (const p of ['/', '/stay/garden-villa', '/stay/whole-estate', '/explore', '/gallery', '/estate']) {
      const html = await (await fetch(BASE + p)).text();
      // 3D now comes only from the photos' depth maps, drawn by motion.js/explore.js: no models or modules
      assert(!/<canvas|type="module"|three(\.module)?(\.min)?\.js/.test(html), `${p} still loads the old 3D world`);
      const imgs = [...html.matchAll(/<img [^>]*src="([^"]+)"/g)].map((x) => x[1]);
      assert(imgs.length && imgs.every((u) => u.startsWith('/media/photos/')), `${p} has a picture that isn't a photo: ${imgs.find((u) => !u.startsWith('/media/photos/'))}`);
    }
    await page.goto(BASE + '/');
    assert(/taken at Siri Homestay by its owners/.test(await page.locator('.footer__legal').innerText()), 'footer note');
    return `${keys.length} photos`;
  });

  await check('The home page is a 3D journey: scrolling flies the camera from chapter to chapter', async () => {
    const r = await fetch(BASE + '/js/vendor/three-0.187.0/three.module.js'); assert(r.status === 200, 'three.js not served');
    const m = await (await fetch(BASE + '/media/manifest.json')).json();
    assert(Object.values(m.photos).filter((p) => p.depth).length === 18, 'depth maps missing');
    assert((await fetch(BASE + '/media/depth/' + m.photos['villa-patio'].depth)).status === 200, 'depth map not served');
    await page.goto(BASE + '/');
    await page.waitForSelector('.fly.is-live canvas.fly__canvas', { timeout: 30000 });
    const n = await page.locator('[data-chapter]').count();
    assert(n === 9, `${n} chapters`);
    await page.waitForSelector('#arrive.is-active');
    const seen = [];
    for (const id of ['lawn', 'night', 'stay']) {
      await page.evaluate((x) => document.getElementById(x).scrollIntoView(), id);
      await page.waitForFunction((x) => document.getElementById(x).classList.contains('is-active'), id, { timeout: 15000 });
      seen.push(await page.locator(`#${id} .chapter__title`).innerText());
    }
    assert(await page.locator('#stay a[href="/enquire"]').isVisible(), 'enquiry button missing at the end of the journey');
    return `${n} chapters: ${seen.join(', ')}`;
  });

  await check('A room shows its photos side by side on a 3D carousel turned by scrolling', async () => {
    await page.goto(BASE + '/stay/garden-villa');
    await page.waitForSelector('.strip.is-flow');
    const at = async (p) => {
      await page.evaluate((q) => { const t = document.querySelector('.strip__track'); window.scrollTo(0, t.getBoundingClientRect().top + scrollY + (t.offsetHeight - innerHeight) * q); }, p);
      await page.waitForTimeout(250);
      return page.evaluate(() => {
        const items = [...document.querySelectorAll('.strip__item')].map((li) => li.getBoundingClientRect());
        return { x: items[0].left, visible: items.filter((r) => r.right > 0 && r.left < innerWidth && r.bottom > 0 && r.top < innerHeight).length };
      });
    };
    const a = await at(0), b = await at(0.7);
    assert(a.visible >= 2, `only ${a.visible} photo(s) side by side`);
    assert(b.x < a.x - 200, 'the row did not move sideways');
    const n = await page.locator('.strip__item').count();
    await at(0); // back to the start
    // A photo at the side turns to the front first; selecting the front photo opens it larger.
    await page.evaluate(() => document.querySelectorAll('.strip__item a')[1].click());
    await page.waitForSelector('.strip__item:nth-child(2).is-current');
    await page.waitForTimeout(400);
    // (a script click: Playwright's own click scrolls first, which would turn the carousel)
    await page.evaluate(() => document.querySelector('.strip__item.is-current a').click());
    await page.waitForSelector('dialog.lightbox[open]');
    await page.keyboard.press('Escape');
    return `${n} photos, ${a.visible} side by side`;
  });

  await check('Explore the estate: each spot is a photo in 3D, and its marks fly to the next spot', async () => {
    const html = await (await fetch(BASE + '/explore')).text();
    const data = JSON.parse(html.match(/<script type="application\/json" id="explore-data">([^<]*)<\/script>/)[1]);
    const ids = new Set(data.spots.map((s) => s.id));
    assert(data.spots.length === 18, `${data.spots.length} spots`);
    for (const s of data.spots) {
      assert(s.photo.startsWith('/media/photos/') && s.depth && s.depth.startsWith('/media/depth/'), `${s.id} is not a photo with a depth map`);
      for (const mk of s.marks) assert(ids.has(mk.to) && mk.to !== s.id && mk.x > 0 && mk.x < 1 && mk.y > 0 && mk.y < 1, `${s.id}: bad mark to ${mk.to}`);
    }
    // every spot can be reached from the first by marks or the Next link
    const seen = new Set([data.spots[0].id]), queue = [data.spots[0]];
    while (queue.length) { const s = queue.shift(); const next = data.spots[(s.index ?? data.spots.indexOf(s)) + 1]; for (const t of [...s.marks.map((m) => m.to), next && next.id]) if (t && !seen.has(t)) { seen.add(t); queue.push(data.spots.find((x) => x.id === t)); } }
    assert(seen.size === 18, `only ${seen.size} spots reachable`);
    // without JavaScript every spot is a page, its marks plain links over the whole photo
    const villa = await (await fetch(BASE + '/explore?spot=villa-patio')).text();
    const links = [...villa.matchAll(/<a class="mark" href="\/explore\?spot=([a-z-]+)"/g)].map((x) => x[1]);
    assert(links.join() === 'villa-bedroom,patio-chairs,villa-pool', `villa marks: ${links}`);
    assert(/<h2 class="explorer__title"[^>]*>A villa</.test(villa), 'spot page shows its own spot');
    assert(/<h2 class="explorer__title"[^>]*>Arrive</.test(await (await fetch(BASE + '/explore?spot=nonsense')).text()), 'unknown spot should show the first');

    await page.goto(BASE + '/explore');
    await page.waitForSelector('.explorer.is-3d canvas.explorer__canvas', { timeout: 30000 });
    await page.waitForFunction(() => [...document.querySelectorAll('a.mark')].some((a) => /translate3d/.test(a.style.transform)));
    const before = await page.$eval('a.mark', (a) => a.style.transform);
    // drag to look around: the marks stay on their places, so they move with the photo
    const box = await page.locator('[data-frame]').boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    for (let i = 1; i <= 8; i++) await page.mouse.move(box.x + box.width / 2 + i * 30, box.y + box.height / 2 + i * 12);
    await page.waitForTimeout(200);
    const during = await page.$eval('a.mark', (a) => a.style.transform);
    await page.mouse.up();
    assert(during !== before, 'marks did not follow the drag');
    // a mark flies to its spot; the page address and the caption follow
    const to = await page.$eval('a.mark', (a) => a.getAttribute('data-to'));
    const title = data.spots.find((s) => s.id === to).title;
    await page.evaluate(() => document.querySelector('a.mark').click());
    await page.waitForFunction((t) => document.querySelector('[data-title]').textContent === t, title, { timeout: 15000 });
    await page.waitForFunction((id) => location.search === '?spot=' + id && !document.querySelector('[data-marks]').classList.contains('is-moving'), to, { timeout: 15000 });
    const idx = data.spots.findIndex((s) => s.id === to);
    await page.click('[data-next]');
    await page.waitForFunction((t) => document.querySelector('[data-title]').textContent === t, data.spots[idx + 1].title, { timeout: 15000 });
    await page.waitForFunction(() => !document.querySelector('[data-marks]').classList.contains('is-moving'), null, { timeout: 15000 });
    // the index below jumps to any spot
    await page.evaluate(() => document.querySelector('[data-goto="night-garden"]').click());
    await page.waitForFunction(() => document.querySelector('[data-title]').textContent === 'After dark', null, { timeout: 15000 });
    return `18 spots, ${data.spots.reduce((n, s) => n + s.marks.length, 0)} marks; flew to ${title}`;
  });

  await check('With reduced motion: no 3D, the tour is a plain photo list and the room photos scroll sideways', async () => {
    const rctx = await browser.newContext({ viewport: { width: 1280, height: 860 }, reducedMotion: 'reduce' });
    const p = await rctx.newPage();
    await p.goto(BASE + '/');
    assert(await p.locator('.fly.is-live').count() === 0, 'journey animates despite reduced motion');
    assert(await p.locator('#lawn .chapter__media img').isVisible(), 'journey pictures missing');
    await p.goto(BASE + '/stay/garden-villa');
    assert(await p.locator('.strip.is-flow').count() === 0, 'carousel turns despite reduced motion');
    assert(await p.locator('canvas').count() === 0, 'WebGL started despite reduced motion');
    const scrolls = await p.evaluate(() => { const r = document.querySelector('.strip__row'); return r.scrollWidth > r.clientWidth && getComputedStyle(r).overflowX === 'auto'; });
    assert(scrolls, 'room photos should scroll sideways on their own');
    // the explorer shows the plain photos, with the marks still leading on
    await p.goto(BASE + '/explore?spot=villa-patio');
    await p.waitForSelector('.explorer.is-live');
    assert(await p.locator('canvas').count() === 0, 'explorer started WebGL despite reduced motion');
    assert(await p.locator('.explorer__img').isVisible(), 'explorer photo missing');
    await p.evaluate(() => document.querySelector('a.mark[data-to="villa-bedroom"]').click());
    await p.waitForFunction(() => document.querySelector('[data-title]').textContent === 'Inside' && /villa-bedroom/.test(document.querySelector('.explorer__img').currentSrc || document.querySelector('.explorer__img').src));
    await rctx.close();
  });

  await check('Gallery shows the real photos and opens them larger', async () => {
    await page.goto(BASE + '/gallery');
    const n = await page.locator('.gallery__item').count();
    assert(n === 20, `${n} photos in the gallery`);
    await page.click('.gallery__item:first-child a');
    await page.waitForSelector('dialog.lightbox[open]');
    const src = await page.getAttribute('dialog.lightbox img', 'src');
    assert(/\/media\/photos\/villa-patio-ai-2400\.webp$/.test(src), src);
    await page.keyboard.press('Escape');
    return `${n} photos`;
  });

  // ---------------------------------------------------------------- accessibility
  const axeSrc = fs.readFileSync(path.join(ROOT, 'node_modules/axe-core/axe.min.js'), 'utf8');
  const a11y = {};
  await check('Accessibility scan (axe-core, WCAG 2.1 A/AA) on key pages', async () => {
    // axe is injected as a script, so this context bypasses CSP; signed-in cookies are carried over.
    const actx = await browser.newContext({ viewport: { width: 1280, height: 860 }, bypassCSP: true, storageState: await ctx.storageState() });
    const page = await actx.newPage();
    const pages = ['/', '/stay', '/stay/garden-villa', '/stay/whole-estate', '/explore', '/estate', '/around', '/gallery', '/contact', '/enquire', '/admin', '/admin/bookings', `/admin/bookings/${id1}`, '/admin/calendar'];
    let serious = 0;
    for (const p of pages) {
      await page.goto(BASE + p, { waitUntil: 'networkidle' });
      await page.addScriptTag({ content: axeSrc });
      const res = await page.evaluate(async () => {
        const r = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } });
        return r.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length, sample: v.nodes[0]?.target?.join(' ') }));
      });
      a11y[p] = res;
      serious += res.filter((v) => ['serious', 'critical'].includes(v.impact)).length;
    }
    await actx.close();
    const all = Object.entries(a11y).flatMap(([p, vs]) => vs.map((v) => `${p}: ${v.id} (${v.impact}, ${v.nodes}) ${v.sample}`));
    assert(serious === 0, all.join(' || '));
    return all.length ? `minor: ${all.join(' || ')}` : 'no violations';
  });

  // ---------------------------------------------------------------- rate limit (last: it blocks this IP)
  await check('Enquiry endpoint is rate limited per connection', async () => {
    let last = 0;
    for (let i = 0; i < 8; i++) {
      const r = await fetch(BASE + '/enquire', { method: 'POST', redirect: 'manual', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: 'x=1' });
      last = r.status;
    }
    assert(last === 429, 'last status ' + last);
  });

  await check('No JavaScript errors in the browser during the run', async () => {
    const real = consoleErrors.filter((e) => !/status of (403|404|409|422|429|401)/.test(e));
    assert(real.length === 0, real.slice(0, 5).join(' | '));
    assert(badResponses.length === 0, 'missing files: ' + badResponses.join(', '));
  });
} finally {
  await browser.close();
  server.kill();
  const passed = results.filter((r) => r.ok).length;
  fs.writeFileSync(path.join(ROOT, 'tests', 'e2e-report.json'), JSON.stringify({ at: new Date().toISOString(), passed, failed: results.length - passed, results }, null, 2));
  console.log(`\n${passed}/${results.length} checks passed`);
  fs.rmSync(DATA, { recursive: true, force: true });
  process.exitCode = passed === results.length ? 0 : 1;
}
