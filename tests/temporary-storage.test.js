'use strict';
// Hosting without lasting storage (Vercel until a hosted database is connected): enquiries are
// handed to WhatsApp instead of being saved, the calendar is never shown as live and the admin
// says plainly that its data won't last. Also checks the Vercel entry point.
const test = require('node:test');
const assert = require('node:assert/strict');
const { spawn, execFileSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const Database = require('better-sqlite3');
const { addDays, today } = require('../src/lib/dates');

const ROOT = path.join(__dirname, '..');
const ADMIN = { email: 'owner@example.com', password: 'a long walk past the pond 2026' };

function start(env) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sh-temp-'));
  const port = 3600 + Math.floor(Math.random() * 300);
  const base = `http://localhost:${port}`;
  const child = spawn(process.execPath, ['server.js'], {
    cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, PORT: String(port), DATA_DIR: dir, SITE_URL: base, NODE_ENV: 'test',
      ADMIN_EMAIL: ADMIN.email, ADMIN_PASSWORD: ADMIN.password, ...env },
  });
  let out = '';
  child.stdout.on('data', (b) => { out += b; });
  child.stderr.on('data', (b) => { out += b; });
  const ready = new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('server did not start:\n' + out)), 15000);
    child.stdout.on('data', () => { if (out.includes('running at')) { clearTimeout(t); resolve(); } });
    child.on('exit', (c) => reject(new Error(`server exited ${c}:\n${out}`)));
  });
  return { base, dir, child, ready, log: () => out };
}

const form = (o) => new URLSearchParams(o).toString();
const stampOf = (htmlText) => /name="_stamp" value="([^"]+)"/.exec(htmlText)[1];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

test('without lasting storage, an enquiry becomes a WhatsApp message and nothing is saved', async (t) => {
  const s = start({ TEMPORARY_STORAGE: '1' });
  t.after(() => s.child.kill());
  await s.ready;
  assert.match(s.log(), /Temporary storage/);
  assert.match(s.log(), /with the password from ADMIN_PASSWORD/);
  assert.ok(!s.log().includes(ADMIN.password), 'a supplied password is never logged');

  const page = await (await fetch(s.base + '/enquire?stay=garden-villa')).text();
  assert.match(page, /Continue to WhatsApp/);
  assert.match(page, /send it to them on WhatsApp/);
  await sleep(2700); // the form refuses posts made faster than a person could type

  const valid = { _stamp: stampOf(page), room_type: 'garden-villa', units: '2', check_in: addDays(today(), 20), check_out: addDays(today(), 22),
    adults: '4', children: '1', full_name: 'Asha Rao', phone: '98450 00000', email: 'asha@example.com', city: 'Mysuru',
    message: 'We arrive after dark.', consent: '1' };
  const res = await fetch(s.base + '/enquire', { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded', origin: s.base }, body: form(valid), redirect: 'manual' });
  assert.equal(res.status, 200);
  assert.equal(res.headers.get('cache-control'), 'no-store');
  const body = await res.text();
  assert.match(body, /Send your enquiry/);
  assert.doesNotMatch(body, /Enquiry sent|The hosts have your request/);
  const links = [...body.matchAll(/href="(https:\/\/wa\.me\/(\d+)\?text=([^"]+))"/g)];
  assert.deepEqual(links.map((m) => m[2]), ['919845451273', '919901769567'], 'Swetha first, then Ganesh; never Dilip');
  const text = decodeURIComponent(links[0][3].replace(/&amp;/g, '&'));
  for (const bit of ['Garden Villa, 2 villas', '2 nights', 'Guests: 4 adults, 1 child', 'Name: Asha Rao', 'Phone: +91 98450 00000',
    'Email: asha@example.com', 'Travelling from: Mysuru', 'We arrive after dark.']) assert.ok(text.includes(bit), `message has "${bit}":\n${text}`);
  assert.match(body, /href="mailto:sirihomestayjoldhal@gmail\.com\?subject=/);

  const bad = await fetch(s.base + '/enquire', { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded', origin: s.base },
    body: form({ ...valid, full_name: '' }) });
  assert.equal(bad.status, 422);
  assert.match(await bad.text(), /Enter your name/);

  const db = new Database(path.join(s.dir, 'siri-homestay.db'));
  t.after(() => db.close());
  assert.equal(db.prepare('SELECT COUNT(*) n FROM reservations').get().n, 0);
  assert.equal(db.prepare('SELECT COUNT(*) n FROM guests').get().n, 0);

  // Even if the owner turns the calendar on, the public site never shows it as live here.
  db.prepare("UPDATE settings SET value = '1' WHERE key = 'publish_availability'").run();
  const av = await (await fetch(`${s.base}/api/availability?stay=garden-villa&from=${addDays(today(), 30)}&to=${addDays(today(), 32)}`)).json();
  assert.deepEqual(av, { published: false });
  assert.doesNotMatch(await (await fetch(s.base + '/stay/garden-villa')).text(), /class="avail-cal/);

  const privacy = await (await fetch(s.base + '/privacy')).text();
  assert.match(privacy, /doesn’t store enquiries/);
});

test('without lasting storage, the admin warns that data won’t last and doesn’t force a password change', async (t) => {
  const s = start({ TEMPORARY_STORAGE: '1' });
  t.after(() => s.child.kill());
  await s.ready;
  const login = await fetch(s.base + '/admin/login');
  const htmlText = await login.text();
  assert.match(htmlText, /class="storage-note"/);
  const pre = /name="_pre" value="([^"]+)"/.exec(htmlText)[1];
  const cookie = login.headers.getSetCookie().map((c) => c.split(';')[0]).join('; ');
  const res = await fetch(s.base + '/admin/login', { method: 'POST', redirect: 'manual',
    headers: { 'content-type': 'application/x-www-form-urlencoded', origin: s.base, cookie },
    body: form({ _pre: pre, next: '', email: ADMIN.email, password: ADMIN.password }) });
  assert.equal(res.status, 303);
  assert.equal(res.headers.get('location'), '/admin');
  const session = res.headers.getSetCookie().map((c) => c.split(';')[0]).join('; ');
  const home = await fetch(s.base + '/admin', { headers: { cookie: session }, redirect: 'manual' });
  assert.equal(home.status, 200, 'goes straight in: a changed password could not be kept here');
  assert.match(await home.text(), /class="storage-note"/);
});

test('with lasting storage, enquiries are saved as before', async (t) => {
  const s = start({ TEMPORARY_STORAGE: '0' });
  t.after(() => s.child.kill());
  await s.ready;
  const page = await (await fetch(s.base + '/enquire')).text();
  assert.match(page, /Send enquiry/);
  assert.doesNotMatch(page, /Continue to WhatsApp/);
  assert.doesNotMatch(await (await fetch(s.base + '/admin/login')).text(), /storage-note/);
});

test('the Vercel entry exports the Express app, runs as production and defaults to temporary storage', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sh-vercel-'));
  const script = `
    const http = require('node:http');
    const app = require('./api/index.js');
    if (typeof app.listen !== 'function') throw new Error('Vercel would wrap a plain function with its own helpers');
    const config = require('./src/config');
    const server = http.createServer(app).listen(0, async () => {
      const base = 'http://localhost:' + server.address().port;
      const r = await fetch(base + '/enquire');
      const out = { isProd: config.isProd, temporary: config.temporaryStorage, status: r.status,
        hsts: r.headers.get('strict-transport-security'), handoff: (await r.text()).includes('Continue to WhatsApp'),
        health: (await (await fetch(base + '/healthz')).json()).ok };
      console.log(JSON.stringify(out));
      server.close();
    });`;
  const env = { ...process.env, VERCEL: '1', VERCEL_ENV: 'production', VERCEL_PROJECT_PRODUCTION_URL: 'siri-homestay.vercel.app',
    APP_SECRET: 'test-secret-'.repeat(4), ADMIN_EMAIL: ADMIN.email, ADMIN_PASSWORD: ADMIN.password, DATA_DIR: dir };
  delete env.NODE_ENV; delete env.TEMPORARY_STORAGE;
  const out = execFileSync(process.execPath, ['-e', script], { cwd: ROOT, env, encoding: 'utf8' });
  const r = JSON.parse(out.trim().split('\n').pop());
  assert.deepEqual(r, { isProd: true, temporary: true, status: 200, hsts: 'max-age=31536000; includeSubDomains', handoff: true, health: true });
});
