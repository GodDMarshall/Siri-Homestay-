'use strict';
const express = require('express');
const V = require('../views/admin');
const auth = require('./auth');
const catalog = require('../domain/catalog');
const inventory = require('../domain/inventory');
const R = require('../domain/reservations');
const { allSettings, setSetting, audit, ValidationError, DomainError } = require('../domain/core');
const notifications = require('../domain/notifications');
const { today, addDays, monthStart, addMonths, isValidDate, nowIso, diffDays } = require('../lib/dates');
const { hashPassword, verifyPassword, passwordProblems } = require('../lib/security');
const { canConnect } = require('../channels/registry');
const sync = require('../channels/sync');
const config = require('../config');

const s = (v, max = 300) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const nOrNull = (v) => { const t = s(v, 30); if (t === '') return null; const n = Number(t); return Number.isFinite(n) ? n : NaN; };

module.exports = function adminRoutes(db) {
  const r = express.Router();

  // --- Auth -----------------------------------------------------------------
  r.get('/login', (req, res) => {
    if (req.admin) return res.redirect(303, '/admin');
    res.set('Cache-Control', 'no-store').send(V.login({ pre: auth.preLoginToken(req, res), next: s(req.query.next, 200) }));
  });
  r.post('/login', (req, res) => {
    const out = auth.attemptLogin(db, req, res, { email: req.body.email, password: req.body.password, pre: req.body._pre });
    if (out.ok) {
      const next = s(req.body.next, 200);
      return res.redirect(303, next.startsWith('/admin') && !next.startsWith('//') ? next : '/admin');
    }
    res.status(401).set('Cache-Control', 'no-store').send(V.login({ error: out.error, pre: auth.preLoginToken(req, res), email: s(req.body.email, 160), next: s(req.body.next, 200) }));
  });

  r.use(auth.requireAdmin, auth.requireCsrf);

  r.post('/logout', (req, res) => { auth.logout(db, req, res); res.redirect(303, '/admin/login'); });

  r.get('/password', (req, res) => res.send(V.password(req, { forced: req.admin.mustChange })));
  r.post('/password', (req, res) => {
    const user = db.prepare('SELECT * FROM admin_users WHERE id = ?').get(req.admin.id);
    const errors = [];
    if (!verifyPassword(req.body.current || '', user.password_hash)) errors.push('Your current password isn’t right.');
    errors.push(...passwordProblems(req.body.next));
    if (req.body.next !== req.body.confirm) errors.push('The new passwords don’t match.');
    if (req.body.next && req.body.next === req.body.current) errors.push('Choose a password different from the current one.');
    if (errors.length) return res.status(422).send(V.password(req, { errors, forced: req.admin.mustChange }));
    db.prepare('UPDATE admin_users SET password_hash = ?, must_change_password = 0 WHERE id = ?').run(hashPassword(req.body.next), user.id);
    db.prepare('DELETE FROM sessions WHERE user_id = ? AND id <> ?').run(user.id, req.admin.sessionId);
    audit(db, { actorType: 'admin', actorId: user.id, action: 'auth.password_changed', entityType: 'admin_user', entityId: user.id });
    res.redirect(303, '/admin?msg=password');
  });
  r.post('/sessions/revoke', (req, res) => {
    db.prepare('DELETE FROM sessions WHERE user_id = ? AND id <> ?').run(req.admin.id, req.admin.sessionId);
    res.redirect(303, '/admin/settings?msg=signed_out_all');
  });

  // --- Overview -------------------------------------------------------------
  r.get('/', (req, res) => {
    const t = today();
    const p = catalog.property(db);
    const counts = {
      enquiry: db.prepare("SELECT COUNT(*) n FROM reservations WHERE status = 'enquiry'").get().n,
      hold: db.prepare("SELECT COUNT(*) n FROM reservations WHERE status = 'hold'").get().n,
      upcoming: db.prepare("SELECT COUNT(*) n FROM reservations WHERE status = 'confirmed' AND check_in >= ?").get(t).n,
    };
    const unitCount = catalog.units(db).length || 1;
    const booked = db.prepare(`SELECT COUNT(*) n FROM inventory_nights WHERE reservation_id IS NOT NULL AND night >= ? AND night < ?`).get(t, addDays(t, 30)).n;
    const settings = allSettings(db);
    const setup = [];
    if (!config.smtp.enabled) setup.push({ href: '/admin/emails', label: 'Set up email', why: 'so new enquiries reach Swetha and Ganesh by email.' });
    if (p.latitude == null) setup.push({ href: '/admin/property', label: 'Add the map pin', why: 'so directions lead to the gate.' });
    if (!p.postal_code) setup.push({ href: '/admin/property', label: 'Add the PIN code', why: 'for the address on the website.' });
    if (!p.licence_number) setup.push({ href: '/admin/property', label: 'Add the homestay licence number', why: 'shown in the footer.' });
    if (catalog.roomTypes(db).every((x) => x.rate_mode === 'on_request')) setup.push({ href: '/admin/stays', label: 'Decide whether to show rates', why: 'rates currently say “quoted by the hosts”.' });
    if (settings.publish_availability !== '1') setup.push({ href: '/admin/settings', label: 'Publish your calendar', why: 'once all bookings are entered here.' });
    res.send(V.dashboard(req, {
      counts, setup,
      occupancy: Math.round((booked / (unitCount * 30)) * 100),
      enquiries: R.list(db, { status: 'enquiry', limit: 8 }),
      arrivals: R.list(db, { status: 'open', limit: 20 }).filter((x) => x.check_in >= t && x.check_in < addDays(t, 7) && x.status !== 'enquiry'),
      departures: R.list(db, { status: 'open', limit: 50 }).filter((x) => x.check_out >= t && x.check_out < addDays(t, 7) && ['confirmed', 'checked_in'].includes(x.status)),
    }));
  });

  // --- Bookings -------------------------------------------------------------
  r.get('/bookings', (req, res) => {
    const status = ['open', 'enquiry', 'hold', 'confirmed', 'checked_in', 'all'].includes(req.query.status) ? req.query.status : 'open';
    const q = s(req.query.q, 80);
    res.send(V.bookings(req, R.list(db, { status: status === 'all' ? null : status, q: q || null }), { status, q }));
  });

  const newForm = (req, extra = {}) => ({ stays: catalog.roomTypes(db, { activeOnly: false }), pool: catalog.units(db), ...extra });
  r.get('/bookings/new', (req, res) => res.send(V.newBooking(req, newForm(req))));
  r.post('/bookings/new', (req, res, next) => {
    try {
      const resv = R.createManual(db, req.body, req.admin.id);
      res.redirect(303, `/admin/bookings/${resv.id}?msg=created`);
    } catch (e) {
      if (e instanceof ValidationError) return res.status(422).send(V.newBooking(req, newForm(req, { values: req.body, errors: e.errors })));
      if (e instanceof DomainError) return res.status(e.status).send(V.newBooking(req, newForm(req, { values: req.body, error: e.message })));
      next(e);
    }
  });

  function renderBooking(req, res, id, error, status = 200) {
    const resv = R.get(db, Number(id));
    if (!resv) return res.status(404).send('Booking not found.');
    const rt = catalog.roomTypeById(db, resv.room_type_id);
    const pool = catalog.unitsForRoomType(db, rt);
    const free = inventory.freeUnits(db, rt, resv.check_in, resv.check_out, { ignoreReservationId: resv.id });
    const events = db.prepare(`SELECT a.*, u.email AS actor_email FROM audit_log a LEFT JOIN admin_users u ON u.id = a.actor_id AND a.actor_type = 'admin'
                               WHERE a.entity_type = 'reservation' AND a.entity_id = ? ORDER BY a.id`).all(resv.id);
    const notices = db.prepare('SELECT * FROM notifications WHERE reservation_id = ? ORDER BY id').all(resv.id);
    res.status(status).send(V.booking(req, resv, { free, pool, events, notices, error, holdHours: allSettings(db).hold_hours }));
  }
  r.get('/bookings/:id', (req, res) => renderBooking(req, res, req.params.id));
  r.post('/bookings/:id/status', (req, res, next) => {
    const id = Number(req.params.id);
    const to = s(req.body.to, 20);
    try {
      R.transition(db, id, to, { adminId: req.admin.id, unitIds: [].concat(req.body.unit_ids || []), notifyGuest: req.body.notify_guest === '1' });
      res.redirect(303, `/admin/bookings/${id}?msg=${encodeURIComponent(to)}`);
    } catch (e) {
      if (e instanceof DomainError) return renderBooking(req, res, id, e.message, e.status);
      next(e);
    }
  });
  r.post('/bookings/:id/dates', (req, res, next) => {
    const id = Number(req.params.id);
    try {
      R.changeDates(db, id, { checkIn: s(req.body.check_in, 10), checkOut: s(req.body.check_out, 10) }, req.admin.id);
      res.redirect(303, `/admin/bookings/${id}?msg=dates`);
    } catch (e) {
      if (e instanceof ValidationError) return renderBooking(req, res, id, Object.values(e.errors).join(' '), 422);
      if (e instanceof DomainError) return renderBooking(req, res, id, e.message, e.status);
      next(e);
    }
  });
  r.post('/bookings/:id/notes', (req, res) => {
    R.updateNotes(db, Number(req.params.id), { internalNotes: req.body.internal_notes, quotedTotal: req.body.quoted_total_inr }, req.admin.id);
    res.redirect(303, `/admin/bookings/${req.params.id}?msg=saved`);
  });

  // --- Calendar & blocks ----------------------------------------------------
  function renderCalendar(req, res, { error, values, status = 200 } = {}) {
    const month = isValidDate(String(req.query.month || '')) ? monthStart(req.query.month) : monthStart(today());
    const days = diffDays(month, addMonths(month, 1));
    const g = inventory.grid(db, month, days);
    const blocks = db.prepare(`SELECT b.*, u.name AS unit_name FROM blocks b JOIN units u ON u.id = b.unit_id
                               WHERE b.end_date > ? ORDER BY b.start_date, u.sort_order LIMIT 100`).all(today());
    res.status(status).send(V.calendar(req, g, { month, prev: addMonths(month, -1), next: addMonths(month, 1), blocks, error, values }));
  }
  r.get('/calendar', (req, res) => renderCalendar(req, res));
  r.post('/blocks', (req, res, next) => {
    const start = s(req.body.start_date, 10), end = s(req.body.end_date, 10), reason = s(req.body.reason, 120) || null;
    try {
      const ids = req.body.unit_id === 'all' ? catalog.units(db).map((u) => u.id) : [Number(req.body.unit_id)];
      db.transaction(() => { for (const u of ids) inventory.createBlock(db, { unitId: u, startDate: start, endDate: end, reason, adminId: req.admin.id }); })();
      res.redirect(303, `/admin/calendar?month=${start.slice(0, 7)}-01&msg=blocked`);
    } catch (e) {
      if (e instanceof DomainError) return renderCalendar(req, res, { error: e.message, values: req.body, status: e.status });
      next(e);
    }
  });
  r.post('/blocks/:id/delete', (req, res) => {
    inventory.deleteBlock(db, Number(req.params.id), req.admin.id);
    res.redirect(303, '/admin/calendar?msg=unblocked');
  });
  r.get('/units/:id/calendar.ics', (req, res) => {
    const u = db.prepare('SELECT * FROM units WHERE id = ?').get(Number(req.params.id));
    if (!u) return res.status(404).send('Villa not found.');
    const ranges = sync.occupiedRanges(db, u.id, addDays(today(), -30), addDays(today(), 540));
    res.type('text/calendar').set('Content-Disposition', `attachment; filename="siri-homestay-${u.code}.ics"`)
      .send(sync.toICal({ calName: `Siri Homestay ${u.name}`, unitCode: u.code, ranges }));
  });

  // --- Stays & villas -------------------------------------------------------
  r.get('/stays', (req, res) => res.send(V.stays(req, { types: catalog.roomTypes(db, { activeOnly: false }), units: catalog.units(db, { activeOnly: false }) })));
  r.post('/stays/:id', (req, res) => {
    const id = Number(req.params.id);
    const b = req.body;
    const features = s(b.features, 3000).split(/\r?\n/).map((x) => x.trim()).filter(Boolean).slice(0, 20);
    const maxGuests = Math.max(1, Math.min(60, parseInt(b.max_guests, 10) || 1));
    const rate = nOrNull(String(b.rate_from_inr || '').replace(/[^\d]/g, ''));
    const mode = b.rate_mode === 'from' && rate > 0 ? 'from' : 'on_request';
    const name = s(b.name, 60);
    const err = (m) => res.status(422).send(V.stays(req, { types: catalog.roomTypes(db, { activeOnly: false }), units: catalog.units(db, { activeOnly: false }), error: m }));
    if (!name) return err('Give the stay a name.');
    if (b.rate_mode === 'from' && !(rate > 0)) return err('Enter a “from” rate in rupees, or choose “Quoted by the hosts”.');
    db.prepare(`UPDATE room_types SET name=?, summary=?, description=?, bed_config=?, max_guests=?, features_json=?, rate_mode=?, rate_from_inr=?, rate_basis=?, is_active=?, updated_at=? WHERE id=?`)
      .run(name, s(b.summary, 300), s(b.description, 2000), s(b.bed_config, 200), maxGuests, JSON.stringify(features), mode,
        mode === 'from' ? rate : null, s(b.rate_basis, 60) || null, b.is_active === '1' ? 1 : 0, nowIso(), id);
    audit(db, { actorType: 'admin', actorId: req.admin.id, action: 'room_type.updated', entityType: 'room_type', entityId: id });
    res.redirect(303, '/admin/stays?msg=saved');
  });
  r.post('/units/:id', (req, res) => {
    const id = Number(req.params.id);
    const name = s(req.body.name, 40);
    if (!name) return res.redirect(303, '/admin/stays');
    db.prepare('UPDATE units SET name = ?, notes = ?, is_active = ? WHERE id = ?').run(name, s(req.body.notes, 200) || null, req.body.is_active === '1' ? 1 : 0, id);
    audit(db, { actorType: 'admin', actorId: req.admin.id, action: 'unit.updated', entityType: 'unit', entityId: id });
    res.redirect(303, '/admin/stays?msg=saved');
  });

  // --- Property & contacts --------------------------------------------------
  r.get('/property', (req, res) => res.send(V.property(req, { p: catalog.property(db), contacts: catalog.contacts(db, { publicOnly: false }) })));
  r.post('/property', (req, res) => {
    const b = req.body;
    const p = catalog.property(db);
    const fail = (m) => res.status(422).send(V.property(req, { p: { ...p, ...b }, contacts: catalog.contacts(db, { publicOnly: false }), error: m }));
    const nums = {};
    for (const k of ['latitude', 'longitude', 'land_area_acres', 'converted_land_acres', 'villa_count', 'pond_area_sqft', 'lawn_area_sqft', 'generator_kw', 'ups_kw']) {
      nums[k] = nOrNull(b[k]);
      if (Number.isNaN(nums[k])) return fail(`Check the number in “${k.replace(/_/g, ' ')}”.`);
    }
    if ((nums.latitude == null) !== (nums.longitude == null)) return fail('Enter both latitude and longitude, or neither.');
    if (nums.latitude != null && (Math.abs(nums.latitude) > 90 || Math.abs(nums.longitude) > 180)) return fail('Those coordinates aren’t valid.');
    const time = (v) => (/^\d{2}:\d{2}$/.test(s(v, 5)) ? s(v, 5) : null);
    const url = (v) => { const t = s(v, 300); return /^https:\/\//.test(t) ? t : null; };
    const pin = s(b.postal_code, 6);
    if (pin && !/^\d{6}$/.test(pin)) return fail('A PIN code has six digits.');
    if (!s(b.name, 80)) return fail('The property needs a name.');
    db.prepare(`UPDATE property SET name=?, summary=?, address_locality=?, address_district=?, address_region=?, postal_code=?, latitude=?, longitude=?, map_url=?,
        check_in_time=?, check_in_until=?, check_out_time=?, land_area_acres=?, converted_land_acres=?, villa_count=?, pond_area_sqft=?, lawn_area_sqft=?,
        generator_kw=?, ups_kw=?, licence_number=?, facebook_url=?, homestay_licensed=?, has_dining_hall=?, has_kitchen=?, has_staff_quarters=?, updated_at=? WHERE id=?`)
      .run(s(b.name, 80), s(b.summary, 300), s(b.address_locality, 80), s(b.address_district, 80), s(b.address_region, 80), pin || null,
        nums.latitude, nums.longitude, url(b.map_url), time(b.check_in_time), time(b.check_in_until), time(b.check_out_time),
        nums.land_area_acres, nums.converted_land_acres, nums.villa_count, nums.pond_area_sqft, nums.lawn_area_sqft, nums.generator_kw, nums.ups_kw,
        s(b.licence_number, 60) || null, url(b.facebook_url), b.homestay_licensed === '1' ? 1 : 0, b.has_dining_hall === '1' ? 1 : 0,
        b.has_kitchen === '1' ? 1 : 0, b.has_staff_quarters === '1' ? 1 : 0, nowIso(), p.id);
    audit(db, { actorType: 'admin', actorId: req.admin.id, action: 'property.updated', entityType: 'property', entityId: p.id });
    res.redirect(303, '/admin/property?msg=saved');
  });

  function contactValues(b) {
    const phone = s(b.phone, 40) ? R.normalisePhone(b.phone) : null;
    const email = s(b.email, 160).toLowerCase() || null;
    if (s(b.phone, 40) && !phone) throw new DomainError('Check the phone number.');
    if (phone && !/^\+[1-9]\d{7,14}$/.test(phone)) throw new DomainError('Write the phone number with its country code, e.g. +91 98450 00000.');
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) throw new DomainError('Check the email address.');
    if (!s(b.name, 60)) throw new DomainError('Every contact needs a name.');
    return { name: s(b.name, 60), phone, email };
  }
  function contactFail(req, res, e) {
    res.status(422).send(V.property(req, { p: catalog.property(db), contacts: catalog.contacts(db, { publicOnly: false }), error: e.message }));
  }
  r.post('/contacts', (req, res) => {
    try {
      const c = contactValues(req.body);
      const p = catalog.property(db);
      const max = db.prepare('SELECT COALESCE(MAX(sort_order),0) m FROM contacts').get().m;
      db.prepare('INSERT INTO contacts (property_id, name, phone_e164, email, whatsapp, sort_order) VALUES (?,?,?,?,?,?)').run(p.id, c.name, c.phone, c.email, c.phone ? 1 : 0, max + 1);
      res.redirect(303, '/admin/property?msg=saved');
    } catch (e) { contactFail(req, res, e); }
  });
  r.post('/contacts/:id', (req, res) => {
    try {
      const c = contactValues(req.body);
      db.prepare('UPDATE contacts SET name=?, phone_e164=?, email=?, whatsapp=?, is_public=?, notify_on_enquiry=?, sort_order=? WHERE id=?')
        .run(c.name, c.phone, c.email, req.body.whatsapp === '1' ? 1 : 0, req.body.is_public === '1' ? 1 : 0, req.body.notify_on_enquiry === '1' && c.email ? 1 : 0,
          parseInt(req.body.sort_order, 10) || 0, Number(req.params.id));
      audit(db, { actorType: 'admin', actorId: req.admin.id, action: 'contact.updated', entityType: 'contact', entityId: Number(req.params.id) });
      res.redirect(303, '/admin/property?msg=saved');
    } catch (e) { contactFail(req, res, e); }
  });
  r.post('/contacts/:id/delete', (req, res) => {
    db.prepare('DELETE FROM contacts WHERE id = ?').run(Number(req.params.id));
    audit(db, { actorType: 'admin', actorId: req.admin.id, action: 'contact.deleted', entityType: 'contact', entityId: Number(req.params.id) });
    res.redirect(303, '/admin/property?msg=deleted');
  });

  // --- Channels (Phase 2 references only) -------------------------------------
  function renderChannels(req, res, error, status = 200) {
    const listings = db.prepare(`SELECT l.*, u.name AS unit_name, t.name AS type_name FROM channel_listings l
                                 LEFT JOIN units u ON u.id = l.unit_id LEFT JOIN room_types t ON t.id = l.room_type_id ORDER BY l.provider, l.id`).all();
    const runs = db.prepare('SELECT * FROM channel_sync_runs ORDER BY id DESC LIMIT 50').all();
    res.status(status).send(V.channels(req, { listings, runs, types: catalog.roomTypes(db, { activeOnly: false }), units: catalog.units(db, { activeOnly: false }), error }));
  }
  r.get('/channels', (req, res) => renderChannels(req, res));
  r.post('/channels', (req, res) => {
    const b = req.body;
    if (!['airbnb', 'makemytrip', 'other'].includes(b.provider)) return renderChannels(req, res, 'Choose a platform.', 422);
    const [kind, idStr] = String(b.target || '').split(':');
    const id = Number(idStr);
    if (!id || !['type', 'unit'].includes(kind)) return renderChannels(req, res, 'Choose what the listing is for.', 422);
    const url = s(b.external_url, 300);
    if (url && !/^https:\/\//.test(url)) return renderChannels(req, res, 'The link should start with https://', 422);
    try {
      // Phase 1: references only. A listing can't be connected until its provider has an adapter.
      const status = canConnect(b.provider) ? 'pending' : 'not_connected';
      db.prepare(`INSERT INTO channel_listings (provider, room_type_id, unit_id, external_listing_id, external_url, connection_status, sync_enabled, notes)
                  VALUES (?,?,?,?,?,?,0,?)`).run(b.provider, kind === 'type' ? id : null, kind === 'unit' ? id : null, s(b.external_listing_id, 80) || null, url || null, status, s(b.notes, 300) || null);
      audit(db, { actorType: 'admin', actorId: req.admin.id, action: 'channel_listing.created', entityType: 'channel_listing', details: { provider: b.provider } });
      res.redirect(303, '/admin/channels?msg=saved');
    } catch (e) {
      if (String(e.code).startsWith('SQLITE_CONSTRAINT')) return renderChannels(req, res, 'That listing ID is already recorded.', 409);
      throw e;
    }
  });
  r.post('/channels/:id/delete', (req, res) => {
    db.prepare('DELETE FROM channel_listings WHERE id = ?').run(Number(req.params.id));
    res.redirect(303, '/admin/channels?msg=deleted');
  });

  // --- Emails, activity, settings ------------------------------------------
  r.get('/emails', (req, res) => res.send(V.emails(req, { rows: db.prepare('SELECT * FROM notifications ORDER BY id DESC LIMIT 200').all(), smtp: config.smtp.enabled })));
  r.post('/emails/retry', async (req, res) => {
    db.prepare("UPDATE notifications SET attempts = 0 WHERE status = 'failed'").run();
    notifications.dispatchSoon(db);
    res.redirect(303, '/admin/emails?msg=retried');
  });
  r.get('/activity', (req, res) => {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const rows = db.prepare(`SELECT a.*, u.email AS actor_email FROM audit_log a LEFT JOIN admin_users u ON u.id = a.actor_id AND a.actor_type = 'admin'
                             ORDER BY a.id DESC LIMIT 100 OFFSET ?`).all((page - 1) * 100);
    res.send(V.activity(req, { rows, page }));
  });
  r.get('/settings', (req, res) => res.send(V.settings(req, { s: allSettings(db) })));
  r.post('/settings', (req, res) => {
    setSetting(db, 'publish_availability', req.body.publish_availability === '1' ? '1' : '0');
    setSetting(db, 'hold_hours', String(Math.max(1, Math.min(336, parseInt(req.body.hold_hours, 10) || 48))));
    setSetting(db, 'guest_ack_email', req.body.guest_ack_email === '1' ? '1' : '0');
    audit(db, { actorType: 'admin', actorId: req.admin.id, action: 'settings.updated', entityType: 'settings', details: { publish_availability: req.body.publish_availability === '1' } });
    res.redirect(303, '/admin/settings?msg=saved');
  });

  return r;
};
