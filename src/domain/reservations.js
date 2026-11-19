'use strict';
const { isValidDate, diffDays, today, nowIso, addDays } = require('../lib/dates');
const { bookingRef } = require('../lib/security');
const { DomainError, ValidationError, NotFoundError, ConflictError, getSetting, audit } = require('./core');
const catalog = require('./catalog');
const inventory = require('./inventory');
const notifications = require('./notifications');

const STATUSES = ['enquiry', 'hold', 'confirmed', 'checked_in', 'checked_out', 'cancelled', 'declined', 'expired', 'no_show'];
const STATUS_LABEL = {
  enquiry: 'New enquiry', hold: 'On hold', confirmed: 'Confirmed', checked_in: 'Checked in', checked_out: 'Checked out',
  cancelled: 'Cancelled', declined: 'Declined', expired: 'Hold expired', no_show: 'No-show',
};
// Allowed moves. Anything not listed is refused.
const TRANSITIONS = {
  enquiry: ['hold', 'confirmed', 'declined', 'cancelled'],
  hold: ['confirmed', 'enquiry', 'cancelled', 'expired'],
  confirmed: ['checked_in', 'cancelled', 'no_show'],
  checked_in: ['checked_out'],
  checked_out: [], cancelled: [], declined: [], expired: [], no_show: [],
};
const OCCUPYING = new Set(['hold', 'confirmed', 'checked_in', 'checked_out']);
const SOURCES = ['direct_web', 'direct_phone', 'direct_whatsapp', 'walk_in', 'owner', 'airbnb', 'makemytrip', 'other_channel'];
const SOURCE_LABEL = {
  direct_web: 'Website', direct_phone: 'Phone', direct_whatsapp: 'WhatsApp', walk_in: 'Walk-in', owner: 'Owner',
  airbnb: 'Airbnb', makemytrip: 'MakeMyTrip', other_channel: 'Other channel',
};

const clean = (v, max = 200) => (typeof v === 'string' ? v.trim().replace(/\s+/g, ' ').slice(0, max) : '');
const int = (v, d = 0) => { const n = parseInt(v, 10); return Number.isFinite(n) ? n : d; };

function normalisePhone(raw) {
  const s = clean(raw, 40);
  const digits = s.replace(/[^\d+]/g, '');
  const onlyDigits = digits.replace(/\+/g, '');
  if (onlyDigits.length < 8 || onlyDigits.length > 15) return null;
  if (/^\d{10}$/.test(digits) && /^[6-9]/.test(digits)) return '+91' + digits; // Indian mobile without code
  if (digits.startsWith('+')) return '+' + onlyDigits;
  if (/^0\d{10}$/.test(digits)) return '+91' + digits.slice(1);
  if (/^91\d{10}$/.test(digits)) return '+' + digits;
  return digits;
}

// Validates stay details shared by public enquiries and admin bookings.
function validateStay(db, input, { admin = false } = {}) {
  const errors = {};
  const rt = catalog.roomTypeBySlug(db, clean(input.room_type, 60), { activeOnly: !admin });
  if (!rt) errors.room_type = 'Choose where you would like to stay.';
  const checkIn = clean(input.check_in, 10), checkOut = clean(input.check_out, 10);
  const t = today();
  const maxNights = int(getSetting(db, 'max_nights'), 30);
  const windowDays = int(getSetting(db, 'booking_window_days'), 540);
  if (!isValidDate(checkIn)) errors.check_in = 'Choose your arrival date.';
  else if (!admin && checkIn < t) errors.check_in = 'Arrival can’t be in the past.';
  else if (admin && checkIn < addDays(t, -365)) errors.check_in = 'Arrival is more than a year ago.';
  else if (checkIn > addDays(t, windowDays)) errors.check_in = `We take enquiries up to ${Math.round(windowDays / 30)} months ahead.`;
  if (!isValidDate(checkOut)) errors.check_out = 'Choose your departure date.';
  else if (isValidDate(checkIn) && checkOut <= checkIn) errors.check_out = 'Departure must be after arrival.';
  else if (isValidDate(checkIn) && diffDays(checkIn, checkOut) > maxNights) errors.check_out = `For stays over ${maxNights} nights, call the hosts.`;

  const adults = int(input.adults, 0), children = int(input.children, 0);
  let unitsRequested = int(input.units, 1);
  if (rt) {
    const pool = catalog.unitsForRoomType(db, rt);
    if (!pool.length) errors.room_type = 'This stay isn’t open for bookings right now.';
    if (rt.kind === 'whole_property') unitsRequested = pool.length;
    else if (unitsRequested < 1 || unitsRequested > pool.length) errors.units = `Choose between 1 and ${pool.length} villas.`;
    const cap = rt.kind === 'whole_property' ? rt.max_guests : rt.max_guests * Math.max(1, unitsRequested);
    if (adults < 1) errors.adults = 'At least one adult is needed.';
    else if (adults + children > cap) errors.adults = `${unitsRequested > 1 ? `${unitsRequested} villas sleep` : 'This sleeps'} up to ${cap} guests. Add a villa or call the hosts.`;
  }
  if (children < 0 || children > 30) errors.children = 'Enter the number of children.';
  return { errors, rt, checkIn, checkOut, adults, children, unitsRequested };
}

function validateGuest(input, { requireConsent }) {
  const errors = {};
  const name = clean(input.full_name, 100);
  const email = clean(input.email, 160).toLowerCase();
  const phone = normalisePhone(input.phone);
  const city = clean(input.city, 80);
  const message = typeof input.message === 'string' ? input.message.trim().slice(0, 1500) : '';
  if (name.length < 2) errors.full_name = 'Enter your name.';
  if (!phone) errors.phone = 'Enter a phone number the hosts can call, with country code if outside India.';
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = 'Check the email address.';
  if (requireConsent && !input.consent) errors.consent = 'Tick the box so the hosts may use these details to reply.';
  return { errors, name, email: email || null, phone, city: city || null, message: message || null };
}

function upsertGuest(db, { name, email, phone, city }) {
  let g = null;
  if (email) g = db.prepare('SELECT * FROM guests WHERE email = ? ORDER BY id DESC LIMIT 1').get(email);
  if (!g && phone) g = db.prepare('SELECT * FROM guests WHERE phone = ? ORDER BY id DESC LIMIT 1').get(phone);
  if (g) {
    db.prepare('UPDATE guests SET full_name = ?, email = COALESCE(?, email), phone = COALESCE(?, phone), city = COALESCE(?, city) WHERE id = ?')
      .run(name, email, phone, city, g.id);
    return g.id;
  }
  return Number(db.prepare('INSERT INTO guests (full_name, email, phone, city) VALUES (?,?,?,?)').run(name, email, phone, city).lastInsertRowid);
}

function uniqueRef(db) {
  for (let i = 0; i < 10; i++) {
    const r = bookingRef();
    if (!db.prepare('SELECT 1 FROM reservations WHERE ref = ?').get(r)) return r;
  }
  throw new Error('Could not allocate a booking reference');
}

// Public enquiry. Never occupies inventory: the hosts confirm and allocate.
// Checks a public enquiry without saving anything. Throws ValidationError like createEnquiry.
function checkEnquiry(db, input) {
  const stay = validateStay(db, input);
  const guest = validateGuest(input, { requireConsent: true });
  const errors = { ...stay.errors, ...guest.errors };
  if (Object.keys(errors).length) throw new ValidationError(errors);
  return { stay, guest, nights: diffDays(stay.checkIn, stay.checkOut) };
}

function createEnquiry(db, input) {
  const { stay, guest } = checkEnquiry(db, input);

  // If the owner publishes the calendar, refuse dates the ledger shows as full.
  if (getSetting(db, 'publish_availability') === '1') {
    const free = inventory.freeUnits(db, stay.rt, stay.checkIn, stay.checkOut);
    if (free.length < stay.unitsRequested) {
      throw new ConflictError(stay.rt.kind === 'whole_property'
        ? 'Our calendar shows some villas are taken on those dates, so the whole estate isn’t free. Try other dates or call the hosts.'
        : `Our calendar shows ${free.length === 0 ? 'no villas' : `only ${free.length} villa${free.length > 1 ? 's' : ''}`} free for every night of those dates. Try other dates or call the hosts.`);
    }
  }

  const result = db.transaction(() => {
    const guestId = upsertGuest(db, guest);
    const ref = uniqueRef(db);
    const id = Number(db.prepare(`INSERT INTO reservations
        (ref, property_id, room_type_id, guest_id, check_in, check_out, units_requested, adults, children, status, source,
         guest_message, consent_at)
        VALUES (?,?,?,?,?,?,?,?,?,'enquiry','direct_web',?,?)`)
      .run(ref, stay.rt.property_id, stay.rt.id, guestId, stay.checkIn, stay.checkOut, stay.unitsRequested,
        stay.adults, stay.children, guest.message, nowIso()).lastInsertRowid);
    audit(db, { actorType: 'guest', action: 'reservation.enquiry_received', entityType: 'reservation', entityId: id,
      details: { ref, roomType: stay.rt.slug, checkIn: stay.checkIn, checkOut: stay.checkOut } });
    notifications.queueEnquiry(db, id);
    return { id, ref };
  }).immediate();
  notifications.dispatchSoon(db);
  return get(db, result.id);
}

// Owner-entered booking (phone, WhatsApp, walk-in). Can go straight to hold/confirmed.
function createManual(db, input, adminId) {
  const stay = validateStay(db, input, { admin: true });
  const guest = validateGuest(input, { requireConsent: false });
  const errors = { ...stay.errors, ...guest.errors };
  const status = ['enquiry', 'hold', 'confirmed'].includes(input.status) ? input.status : 'enquiry';
  const source = SOURCES.includes(input.source) ? input.source : 'direct_phone';
  if (['airbnb', 'makemytrip', 'other_channel'].includes(source) && !clean(input.external_reservation_id, 80)) {
    errors.external_reservation_id = 'Enter the platform’s booking ID so it can be matched later.';
  }
  if (Object.keys(errors).length) throw new ValidationError(errors);
  const unitIds = [].concat(input.unit_ids || []).map((x) => int(x)).filter(Boolean);
  const quoted = input.quoted_total_inr ? int(String(input.quoted_total_inr).replace(/[^\d]/g, ''), null) : null;

  const id = db.transaction(() => {
    const guestId = upsertGuest(db, guest);
    const ref = uniqueRef(db);
    const holdHours = int(getSetting(db, 'hold_hours'), 48);
    const id = Number(db.prepare(`INSERT INTO reservations
        (ref, property_id, room_type_id, guest_id, check_in, check_out, units_requested, adults, children, status, source,
         external_reservation_id, hold_expires_at, quoted_total_inr, guest_message, internal_notes, confirmed_at)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`)
      .run(ref, stay.rt.property_id, stay.rt.id, guestId, stay.checkIn, stay.checkOut, stay.unitsRequested, stay.adults,
        stay.children, status, source, clean(input.external_reservation_id, 80) || null,
        status === 'hold' ? new Date(Date.now() + holdHours * 3600e3).toISOString().replace(/\.\d{3}Z$/, 'Z') : null,
        quoted, guest.message, clean(input.internal_notes, 2000) || null, status === 'confirmed' ? nowIso() : null).lastInsertRowid);
    if (OCCUPYING.has(status)) {
      const chosen = chooseUnits(db, stay.rt, stay.unitsRequested, unitIds, stay.checkIn, stay.checkOut, id);
      inventory.allocate(db, id, chosen.map((u) => u.id), stay.checkIn, stay.checkOut);
    }
    audit(db, { actorType: 'admin', actorId: adminId, action: 'reservation.created', entityType: 'reservation', entityId: id,
      details: { ref, status, source } });
    return id;
  }).immediate();
  return get(db, id);
}

function chooseUnits(db, rt, count, requestedIds, checkIn, checkOut, reservationId) {
  const pool = catalog.unitsForRoomType(db, rt);
  if (rt.kind === 'whole_property') return pool;
  if (requestedIds.length) {
    const byId = new Map(pool.map((u) => [u.id, u]));
    const chosen = requestedIds.map((id) => byId.get(id));
    if (chosen.some((u) => !u)) throw new DomainError('One of the chosen villas isn’t part of this stay type.');
    if (chosen.length !== count) throw new DomainError(`Choose exactly ${count} villa${count > 1 ? 's' : ''}.`);
    return chosen;
  }
  const free = inventory.freeUnits(db, rt, checkIn, checkOut, { ignoreReservationId: reservationId });
  if (free.length < count) {
    throw new ConflictError(`Only ${free.length} villa${free.length === 1 ? ' is' : 's are'} free for every night of this stay; ${count} needed.`);
  }
  return free.slice(0, count);
}

function transition(db, id, to, { adminId = null, actorType = 'admin', unitIds = [], note = null, notifyGuest = false } = {}) {
  const res = db.transaction(() => {
    const r = db.prepare('SELECT * FROM reservations WHERE id = ?').get(id);
    if (!r) throw new NotFoundError('Booking');
    if (!STATUSES.includes(to)) throw new DomainError('Unknown status.');
    if (!(TRANSITIONS[r.status] || []).includes(to)) {
      throw new DomainError(`A booking that is “${STATUS_LABEL[r.status]}” can’t be changed to “${STATUS_LABEL[to]}”.`);
    }
    const rt = catalog.roomTypeById(db, r.room_type_id);
    let allocated = db.prepare('SELECT u.id, u.name FROM reservation_units ru JOIN units u ON u.id = ru.unit_id WHERE ru.reservation_id = ?').all(id);
    if (OCCUPYING.has(to) && !OCCUPYING.has(r.status)) {
      const chosen = chooseUnits(db, rt, r.units_requested, unitIds.map((x) => int(x)).filter(Boolean), r.check_in, r.check_out, id);
      inventory.allocate(db, id, chosen.map((u) => u.id), r.check_in, r.check_out);
      allocated = chosen.map((u) => ({ id: u.id, name: u.name }));
    }
    if (!OCCUPYING.has(to) && OCCUPYING.has(r.status)) {
      inventory.release(db, id);
      db.prepare('DELETE FROM reservation_units WHERE reservation_id = ?').run(id);
    }
    const holdHours = int(getSetting(db, 'hold_hours'), 48);
    const now = nowIso();
    db.prepare(`UPDATE reservations SET status = ?, updated_at = ?,
                  hold_expires_at = ?,
                  confirmed_at = CASE WHEN ? = 'confirmed' THEN ? ELSE confirmed_at END,
                  cancelled_at = CASE WHEN ? IN ('cancelled','declined') THEN ? ELSE cancelled_at END
                WHERE id = ?`)
      .run(to, now, to === 'hold' ? new Date(Date.now() + holdHours * 3600e3).toISOString().replace(/\.\d{3}Z$/, 'Z') : null,
        to, now, to, now, id);
    audit(db, { actorType, actorId: adminId, action: `reservation.${to}`, entityType: 'reservation', entityId: id,
      details: { from: r.status, to, units: allocated.map((u) => u.name), note: note || undefined } });
    if (to === 'confirmed' && notifyGuest) notifications.queueConfirmation(db, id);
    return id;
  }).immediate();
  notifications.dispatchSoon(db);
  return get(db, res);
}

function changeDates(db, id, { checkIn, checkOut }, adminId) {
  return db.transaction(() => {
    const r = db.prepare('SELECT * FROM reservations WHERE id = ?').get(id);
    if (!r) throw new NotFoundError('Booking');
    if (!['enquiry', 'hold', 'confirmed'].includes(r.status)) throw new DomainError('Only open bookings can change dates.');
    const rt = catalog.roomTypeById(db, r.room_type_id);
    const v = validateStay(db, { room_type: rt.slug, check_in: checkIn, check_out: checkOut, adults: r.adults,
      children: r.children, units: r.units_requested }, { admin: true });
    const errs = {};
    if (v.errors.check_in) errs.check_in = v.errors.check_in;
    if (v.errors.check_out) errs.check_out = v.errors.check_out;
    if (Object.keys(errs).length) throw new ValidationError(errs);
    if (OCCUPYING.has(r.status)) {
      const unitIds = db.prepare('SELECT unit_id FROM reservation_units WHERE reservation_id = ?').all(id).map((x) => x.unit_id);
      inventory.release(db, id);
      inventory.allocate(db, id, unitIds, checkIn, checkOut); // throws and rolls back on conflict
    }
    db.prepare('UPDATE reservations SET check_in = ?, check_out = ?, updated_at = ? WHERE id = ?').run(checkIn, checkOut, nowIso(), id);
    audit(db, { actorType: 'admin', actorId: adminId, action: 'reservation.dates_changed', entityType: 'reservation', entityId: id,
      details: { from: [r.check_in, r.check_out], to: [checkIn, checkOut] } });
    return get(db, id);
  }).immediate();
}

function updateNotes(db, id, { internalNotes, quotedTotal }, adminId) {
  const q = quotedTotal === '' || quotedTotal == null ? null : int(String(quotedTotal).replace(/[^\d]/g, ''), null);
  db.prepare('UPDATE reservations SET internal_notes = ?, quoted_total_inr = ?, updated_at = ? WHERE id = ?')
    .run(clean(internalNotes, 2000) || null, q, nowIso(), id);
  audit(db, { actorType: 'admin', actorId: adminId, action: 'reservation.notes_updated', entityType: 'reservation', entityId: id });
}

function expireHolds(db, now = nowIso()) {
  const due = db.prepare("SELECT id FROM reservations WHERE status = 'hold' AND hold_expires_at <= ?").all(now);
  for (const { id } of due) {
    try { transition(db, id, 'expired', { actorType: 'system' }); } catch (e) { console.error('expire hold', id, e.message); }
  }
  return due.length;
}

const SELECT = `SELECT r.*, g.full_name, g.email, g.phone, g.city, rt.name AS room_type_name, rt.slug AS room_type_slug, rt.kind AS room_type_kind
  FROM reservations r JOIN guests g ON g.id = r.guest_id JOIN room_types rt ON rt.id = r.room_type_id`;

function get(db, idOrRef) {
  const r = typeof idOrRef === 'number'
    ? db.prepare(`${SELECT} WHERE r.id = ?`).get(idOrRef)
    : db.prepare(`${SELECT} WHERE r.ref = ?`).get(idOrRef);
  if (!r) return null;
  r.units = db.prepare('SELECT u.id, u.name, u.code FROM reservation_units ru JOIN units u ON u.id = ru.unit_id WHERE ru.reservation_id = ? ORDER BY u.sort_order').all(r.id);
  r.nights = diffDays(r.check_in, r.check_out);
  r.allowed = TRANSITIONS[r.status] || [];
  return r;
}

function list(db, { status = null, q = null, from = null, to = null, limit = 200 } = {}) {
  const where = [], args = [];
  if (status === 'open') where.push("r.status IN ('enquiry','hold','confirmed','checked_in')");
  else if (status && STATUSES.includes(status)) { where.push('r.status = ?'); args.push(status); }
  if (q) {
    where.push('(r.ref LIKE ? OR g.full_name LIKE ? OR g.phone LIKE ? OR g.email LIKE ? OR r.external_reservation_id LIKE ?)');
    const like = `%${q}%`; args.push(like, like, like, like, like);
  }
  if (from) { where.push('r.check_out > ?'); args.push(from); }
  if (to) { where.push('r.check_in < ?'); args.push(to); }
  const sql = `${SELECT} ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
    ORDER BY CASE r.status WHEN 'enquiry' THEN 0 WHEN 'hold' THEN 1 ELSE 2 END, r.check_in ASC, r.id DESC LIMIT ?`;
  return db.prepare(sql).all(...args, limit);
}

module.exports = {
  STATUSES, STATUS_LABEL, TRANSITIONS, SOURCES, SOURCE_LABEL, OCCUPYING,
  checkEnquiry, createEnquiry, createManual, transition, changeDates, updateNotes, expireHolds, get, list, normalisePhone, validateStay,
};
