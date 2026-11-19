'use strict';
// Email notifications. Every message is written to the notifications table first,
// then sent if SMTP is configured. Without SMTP they stay visible in the admin as
// "Email not set up" so nothing is silently lost.
const config = require('../config');
const { fmtDate, nowIso } = require('../lib/dates');

let transport = null;
function getTransport() {
  if (!config.smtp.enabled) return null;
  if (!transport) {
    const nodemailer = require('nodemailer');
    transport = nodemailer.createTransport({
      host: config.smtp.host, port: config.smtp.port, secure: config.smtp.secure,
      auth: config.smtp.user ? { user: config.smtp.user, pass: config.smtp.pass } : undefined,
    });
  }
  return transport;
}
function setTransportForTests(t) { transport = t; }

function loadReservation(db, id) {
  return db.prepare(`SELECT r.*, g.full_name, g.email, g.phone, g.city, rt.name AS room_type_name, rt.kind AS room_type_kind
    FROM reservations r JOIN guests g ON g.id = r.guest_id JOIN room_types rt ON rt.id = r.room_type_id WHERE r.id = ?`).get(id);
}

function stayLines(r) {
  const n = Math.round((Date.parse(r.check_out) - Date.parse(r.check_in)) / 86400000);
  return [
    `Reference: ${r.ref}`,
    `Stay: ${r.room_type_name}${r.room_type_kind === 'unit' ? ` × ${r.units_requested}` : ''}`,
    `Arrive: ${fmtDate(r.check_in, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}`,
    `Leave: ${fmtDate(r.check_out, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })} (${n} night${n > 1 ? 's' : ''})`,
    `Guests: ${r.adults} adult${r.adults > 1 ? 's' : ''}${r.children ? `, ${r.children} child${r.children > 1 ? 'ren' : ''}` : ''}`,
  ];
}

function queue(db, { reservationId, kind, recipient, subject, body }) {
  db.prepare(`INSERT INTO notifications (reservation_id, kind, recipient, subject, body_text, status)
              VALUES (?,?,?,?,?,?)`).run(reservationId, kind, recipient, subject, body, config.smtp.enabled ? 'pending' : 'not_configured');
}

function hostRecipients(db) {
  return db.prepare(`SELECT name, email FROM contacts WHERE notify_on_enquiry = 1 AND email IS NOT NULL ORDER BY sort_order`).all();
}

function queueEnquiry(db, reservationId) {
  const r = loadReservation(db, reservationId);
  const prop = db.prepare('SELECT name FROM property WHERE id = ?').get(r.property_id);
  const adminUrl = `${config.siteUrl}/admin/bookings/${r.id}`;
  const hostBody = [
    `New enquiry from ${r.full_name}.`, '', ...stayLines(r), '',
    `Phone: ${r.phone || '-'}`, `Email: ${r.email || '-'}`, r.city ? `From: ${r.city}` : null,
    r.guest_message ? `\nMessage:\n${r.guest_message}` : null, '',
    'Nothing is confirmed yet. Reply to the guest, then confirm or decline it here:', adminUrl,
  ].filter((x) => x !== null).join('\n');
  for (const h of hostRecipients(db)) {
    queue(db, { reservationId, kind: 'host_new_enquiry', recipient: h.email,
      subject: `New enquiry ${r.ref}: ${fmtDate(r.check_in, { day: 'numeric', month: 'short' })} – ${fmtDate(r.check_out, { day: 'numeric', month: 'short' })}`,
      body: hostBody });
  }
  const ack = db.prepare("SELECT value FROM settings WHERE key = 'guest_ack_email'").get();
  if (r.email && (!ack || ack.value === '1')) {
    queue(db, { reservationId, kind: 'guest_enquiry_received', recipient: r.email,
      subject: `We’ve received your enquiry (${r.ref})`,
      body: [
        `Hello ${r.full_name},`, '',
        `Thank you for your enquiry for ${prop.name}. This is not a confirmation yet: the hosts will check the dates and reply by phone or email.`,
        '', ...stayLines(r), '', 'No payment has been taken.', '', `— ${prop.name}`,
      ].join('\n') });
  }
}

function queueConfirmation(db, reservationId) {
  const r = loadReservation(db, reservationId);
  if (!r.email) return;
  const prop = db.prepare('SELECT name, check_in_time, check_out_time FROM property WHERE id = ?').get(r.property_id);
  queue(db, { reservationId, kind: 'guest_confirmed', recipient: r.email, subject: `Your stay is confirmed (${r.ref})`,
    body: [
      `Hello ${r.full_name},`, '', `Your stay at ${prop.name} is confirmed.`, '', ...stayLines(r),
      prop.check_in_time ? `Check-in from ${prop.check_in_time}, check-out by ${prop.check_out_time}.` : null,
      '', `— ${prop.name}`,
    ].filter((x) => x !== null).join('\n') });
}

let scheduled = false;
function dispatchSoon(db) {
  if (!config.smtp.enabled || scheduled) return;
  scheduled = true;
  setImmediate(() => { scheduled = false; dispatchPending(db).catch((e) => console.error('mail dispatch', e)); });
}

async function dispatchPending(db) {
  const t = getTransport();
  if (!t) return 0;
  const rows = db.prepare("SELECT * FROM notifications WHERE status IN ('pending','failed') AND attempts < 5 ORDER BY id LIMIT 20").all();
  let sent = 0;
  for (const n of rows) {
    try {
      await t.sendMail({ from: config.smtp.from, to: n.recipient, subject: n.subject, text: n.body_text });
      db.prepare("UPDATE notifications SET status = 'sent', attempts = attempts + 1, sent_at = ?, last_error = NULL WHERE id = ?").run(nowIso(), n.id);
      sent++;
    } catch (e) {
      db.prepare("UPDATE notifications SET status = 'failed', attempts = attempts + 1, last_error = ? WHERE id = ?").run(String(e.message).slice(0, 500), n.id);
    }
  }
  return sent;
}

module.exports = { queueEnquiry, queueConfirmation, dispatchSoon, dispatchPending, setTransportForTests };
