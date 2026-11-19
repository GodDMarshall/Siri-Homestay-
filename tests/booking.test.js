'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { open, migrate } = require('../src/db');
const { seed } = require('../src/db/seed');
const { addDays, today } = require('../src/lib/dates');
const R = require('../src/domain/reservations');
const inventory = require('../src/domain/inventory');
const catalog = require('../src/domain/catalog');
const { setSetting } = require('../src/domain/core');
const sync = require('../src/channels/sync');
const { canConnect } = require('../src/channels/registry');

function fresh() {
  const db = open(':memory:');
  migrate(db);
  seed(db, { log: () => {}, createAdmin: false });
  return db;
}
const d = (n) => addDays(today(), n);
const guest = { full_name: 'Asha Rao', phone: '98450 00000', email: 'asha@example.com', consent: '1' };

test('seed has 5 villas, 2 stay types and contacts in the client’s order', () => {
  const db = fresh();
  assert.equal(catalog.units(db).length, 5);
  assert.deepEqual(catalog.roomTypes(db).map((t) => t.slug), ['garden-villa', 'whole-estate']);
  assert.deepEqual(catalog.contacts(db).map((c) => c.name), ['Swetha Iyappa', 'Ganesh UT', 'Dilip']);
  assert.equal(catalog.formatPhone('+917795378068'), '+91 77953 78068');
});

test('public enquiry is stored without occupying inventory', () => {
  const db = fresh();
  const r = R.createEnquiry(db, { ...guest, room_type: 'garden-villa', check_in: d(10), check_out: d(12), adults: 2, units: 1 });
  assert.match(r.ref, /^SH-[A-Z2-9]{6}$/);
  assert.equal(r.status, 'enquiry');
  assert.equal(r.phone, '+919845000000');
  assert.equal(db.prepare('SELECT COUNT(*) n FROM inventory_nights').get().n, 0);
  const notes = db.prepare('SELECT * FROM notifications').all();
  assert.equal(notes.length, 3, 'two hosts + guest acknowledgement');
  assert.ok(notes.every((n) => n.status === 'not_configured'), 'no SMTP in tests');
});

test('validation: past dates, reversed dates, capacity, consent', () => {
  const db = fresh();
  assert.throws(() => R.createEnquiry(db, { ...guest, room_type: 'garden-villa', check_in: d(-1), check_out: d(1), adults: 2 }),
    (e) => Boolean(e.errors && e.errors.check_in));
  assert.throws(() => R.createEnquiry(db, { ...guest, room_type: 'garden-villa', check_in: d(5), check_out: d(5), adults: 2 }),
    (e) => Boolean(e.errors && e.errors.check_out));
  assert.throws(() => R.createEnquiry(db, { ...guest, room_type: 'garden-villa', check_in: d(5), check_out: d(6), adults: 5, units: 1 }),
    (e) => Boolean(e.errors && e.errors.adults));
  assert.throws(() => R.createEnquiry(db, { ...guest, consent: '', room_type: 'garden-villa', check_in: d(5), check_out: d(6), adults: 2 }),
    (e) => Boolean(e.errors && e.errors.consent));
  assert.throws(() => R.createEnquiry(db, { ...guest, room_type: 'nope', check_in: d(5), check_out: d(6), adults: 2 }),
    (e) => Boolean(e.errors && e.errors.room_type));
  // 2 villas can sleep 8
  const ok = R.createEnquiry(db, { ...guest, room_type: 'garden-villa', check_in: d(5), check_out: d(6), adults: 7, units: 2 });
  assert.equal(ok.units_requested, 2);
});

test('confirming allocates villas; overlapping confirmations are refused', () => {
  const db = fresh();
  const make = (ci, co, units = 1) => R.createEnquiry(db, { ...guest, room_type: 'garden-villa', check_in: d(ci), check_out: d(co), adults: 2, units });
  const a = make(20, 23, 3);
  R.transition(db, a.id, 'confirmed', { adminId: 1 });
  assert.equal(R.get(db, a.id).units.length, 3);
  assert.equal(db.prepare('SELECT COUNT(*) n FROM inventory_nights').get().n, 9);
  const b = make(22, 24, 2);
  R.transition(db, b.id, 'confirmed', { adminId: 1 }); // uses villas 4 and 5
  const c = make(22, 23, 1);
  assert.throws(() => R.transition(db, c.id, 'confirmed', { adminId: 1 }), /Only 0 villas are free/);
  assert.equal(R.get(db, c.id).status, 'enquiry', 'failed confirmation is rolled back');
  // Back-to-back is fine: check-out day is free.
  const e = make(23, 25, 1);
  assert.doesNotThrow(() => R.transition(db, e.id, 'confirmed', { adminId: 1, unitIds: [R.get(db, a.id).units[0].id] }));
});

test('choosing a specific taken villa explains the clash', () => {
  const db = fresh();
  const a = R.createEnquiry(db, { ...guest, room_type: 'garden-villa', check_in: d(30), check_out: d(32), adults: 2 });
  R.transition(db, a.id, 'confirmed', { unitIds: [1] });
  const b = R.createEnquiry(db, { ...guest, room_type: 'garden-villa', check_in: d(31), check_out: d(33), adults: 2 });
  assert.throws(() => R.transition(db, b.id, 'hold', { unitIds: [1] }), /Villa 1 is already booked/);
});

test('the database itself rejects a double-booked night', () => {
  const db = fresh();
  const a = R.createEnquiry(db, { ...guest, room_type: 'garden-villa', check_in: d(40), check_out: d(41), adults: 2 });
  R.transition(db, a.id, 'confirmed', { unitIds: [2] });
  const b = R.createEnquiry(db, { ...guest, room_type: 'garden-villa', check_in: d(40), check_out: d(41), adults: 2 });
  assert.throws(() => db.prepare('INSERT INTO inventory_nights (unit_id, night, reservation_id) VALUES (2, ?, ?)').run(d(40), b.id),
    /UNIQUE|PRIMARY KEY/);
});

test('cancel releases nights; whole estate needs every villa free', () => {
  const db = fresh();
  const a = R.createEnquiry(db, { ...guest, room_type: 'garden-villa', check_in: d(50), check_out: d(52), adults: 2 });
  R.transition(db, a.id, 'confirmed', {});
  const w = R.createEnquiry(db, { ...guest, room_type: 'whole-estate', check_in: d(51), check_out: d(53), adults: 12 });
  assert.equal(w.units_requested, 5);
  assert.throws(() => R.transition(db, w.id, 'confirmed', {}), /already booked/);
  R.transition(db, a.id, 'cancelled', {});
  assert.equal(db.prepare('SELECT COUNT(*) n FROM inventory_nights WHERE reservation_id = ?').get(a.id).n, 0);
  R.transition(db, w.id, 'confirmed', {});
  assert.equal(R.get(db, w.id).units.length, 5);
});

test('status machine refuses illegal moves', () => {
  const db = fresh();
  const a = R.createEnquiry(db, { ...guest, room_type: 'garden-villa', check_in: d(60), check_out: d(61), adults: 1 });
  assert.throws(() => R.transition(db, a.id, 'checked_out', {}), /can’t be changed/);
  R.transition(db, a.id, 'declined', {});
  assert.throws(() => R.transition(db, a.id, 'confirmed', {}), /can’t be changed/);
});

test('holds expire and release their nights', () => {
  const db = fresh();
  const a = R.createEnquiry(db, { ...guest, room_type: 'garden-villa', check_in: d(70), check_out: d(72), adults: 2 });
  R.transition(db, a.id, 'hold', {});
  assert.equal(db.prepare('SELECT COUNT(*) n FROM inventory_nights').get().n, 2);
  const n = R.expireHolds(db, '9999-01-01T00:00:00Z');
  assert.equal(n, 1);
  assert.equal(R.get(db, a.id).status, 'expired');
  assert.equal(db.prepare('SELECT COUNT(*) n FROM inventory_nights').get().n, 0);
});

test('owner blocks occupy nights and conflict with bookings', () => {
  const db = fresh();
  const id = inventory.createBlock(db, { unitId: 3, startDate: d(80), endDate: d(83), reason: 'Painting', adminId: null });
  assert.equal(db.prepare('SELECT COUNT(*) n FROM inventory_nights WHERE block_id = ?').get(id).n, 3);
  assert.throws(() => inventory.createBlock(db, { unitId: 3, startDate: d(82), endDate: d(84) }), /Villa 3 is blocked/);
  const a = R.createEnquiry(db, { ...guest, room_type: 'garden-villa', check_in: d(81), check_out: d(82), adults: 2 });
  assert.throws(() => R.transition(db, a.id, 'confirmed', { unitIds: [3] }), /Villa 3 is blocked/);
  inventory.deleteBlock(db, id);
  assert.doesNotThrow(() => R.transition(db, a.id, 'confirmed', { unitIds: [3] }));
});

test('availability reflects real ledger data only', () => {
  const db = fresh();
  const rt = catalog.roomTypeBySlug(db, 'garden-villa');
  const before = inventory.availability(db, rt, d(90), d(92));
  assert.deepEqual(Object.values(before).map((x) => x.free), [5, 5]);
  inventory.createBlock(db, { unitId: 1, startDate: d(90), endDate: d(91) });
  const after = inventory.availability(db, rt, d(90), d(92));
  assert.deepEqual(Object.values(after).map((x) => x.free), [4, 5]);
  const estate = catalog.roomTypeBySlug(db, 'whole-estate');
  assert.deepEqual(Object.values(inventory.availability(db, estate, d(90), d(92))).map((x) => x.free), [0, 1]);
});

test('published calendar refuses enquiries for full dates', () => {
  const db = fresh();
  for (let u = 1; u <= 5; u++) inventory.createBlock(db, { unitId: u, startDate: d(100), endDate: d(101) });
  setSetting(db, 'publish_availability', '0');
  assert.doesNotThrow(() => R.createEnquiry(db, { ...guest, room_type: 'garden-villa', check_in: d(100), check_out: d(101), adults: 2 }));
  setSetting(db, 'publish_availability', '1');
  assert.throws(() => R.createEnquiry(db, { ...guest, room_type: 'garden-villa', check_in: d(100), check_out: d(101), adults: 2 }),
    /no villas/);
});

test('changing dates re-checks the ledger and rolls back on conflict', () => {
  const db = fresh();
  const a = R.createEnquiry(db, { ...guest, room_type: 'garden-villa', check_in: d(110), check_out: d(112), adults: 2 });
  R.transition(db, a.id, 'confirmed', { unitIds: [1] });
  inventory.createBlock(db, { unitId: 1, startDate: d(115), endDate: d(116) });
  assert.throws(() => R.changeDates(db, a.id, { checkIn: d(114), checkOut: d(116) }, 1), /blocked/);
  const still = R.get(db, a.id);
  assert.equal(still.check_in, d(110));
  assert.equal(db.prepare('SELECT COUNT(*) n FROM inventory_nights WHERE reservation_id = ?').get(a.id).n, 2);
  R.changeDates(db, a.id, { checkIn: d(111), checkOut: d(114) }, 1);
  assert.equal(db.prepare('SELECT COUNT(*) n FROM inventory_nights WHERE reservation_id = ?').get(a.id).n, 3);
});

test('OTA boundary: no provider can connect in Phase 1; imports are idempotent', async () => {
  const db = fresh();
  assert.equal(canConnect('airbnb'), false);
  assert.equal(canConnect('makemytrip'), false);
  const lid = Number(db.prepare("INSERT INTO channel_listings (provider, unit_id, external_listing_id) VALUES ('airbnb', 4, 'abc')").run().lastInsertRowid);
  const run = await sync.runSync(db, lid, 'import');
  assert.equal(run.status, 'skipped');
  const listing = db.prepare('SELECT * FROM channel_listings WHERE id = ?').get(lid);
  const item = { externalId: 'HM123', status: 'confirmed', checkIn: d(120), checkOut: d(122), guest: { name: 'Channel Guest' }, adults: 2 };
  const first = sync.importReservation(db, listing, item);
  const again = sync.importReservation(db, listing, item);
  assert.equal(first.changed, true);
  assert.equal(again.changed, false);
  assert.equal(again.id, first.id);
  assert.equal(R.get(db, first.id).source, 'airbnb');
  const cancel = sync.importReservation(db, listing, { ...item, status: 'cancelled' });
  assert.equal(cancel.changed, true);
  assert.equal(db.prepare('SELECT COUNT(*) n FROM inventory_nights').get().n, 0);
  const ics = sync.toICal({ calName: 'Villa 4', unitCode: 'V4', ranges: [{ start: '2027-01-01', end: '2027-01-03', kind: 'reservation' }] });
  assert.match(ics, /DTSTART;VALUE=DATE:20270101/);
  assert.match(ics, /DTEND;VALUE=DATE:20270103/);
});
