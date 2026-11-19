'use strict';
const { html, raw } = require('../lib/html');
const { asset } = require('../web/assets');
const { MARK } = require('./layout');
const { fmtDate, fmtDateTime, addDays, today } = require('../lib/dates');
const { formatPhone } = require('../domain/catalog');
const { STATUS_LABEL, SOURCE_LABEL } = require('../domain/reservations');
const { PROVIDERS } = require('../channels/registry');
const config = require('../config');

// Shown on every admin page while nothing the site stores can last (see config.temporaryStorage).
function storageNote() {
  return config.temporaryStorage
    ? html`<p class="storage-note" role="note">This copy of the site has no lasting storage yet. Enquiries, bookings and changes made here can disappear at any time, so keep taking real bookings by phone and WhatsApp.</p>`
    : '';
}

const NAV = [
  ['/admin', 'Overview'],
  ['/admin/bookings', 'Bookings'],
  ['/admin/calendar', 'Calendar'],
  ['/admin/stays', 'Stays and villas'],
  ['/admin/property', 'Property and contacts'],
  ['/admin/channels', 'Airbnb and MakeMyTrip'],
  ['/admin/emails', 'Emails'],
  ['/admin/activity', 'Activity'],
  ['/admin/settings', 'Settings'],
];

const MESSAGES = {
  saved: 'Saved.', created: 'Booking created.', blocked: 'Dates blocked.', unblocked: 'Block removed.',
  password: 'Password changed.', retried: 'Sending queued emails.', deleted: 'Deleted.', dates: 'Dates changed.',
  enquiry: 'Moved back to enquiry.', hold: 'Villas held.', confirmed: 'Booking confirmed.', declined: 'Enquiry declined.',
  cancelled: 'Booking cancelled.', checked_in: 'Checked in.', checked_out: 'Checked out.', no_show: 'Marked as no-show.',
  signed_out_all: 'Signed out of every other device.',
};

function badge(status) {
  return html`<span class="badge badge--${status}">${STATUS_LABEL[status] || status}</span>`;
}

function csrf(req) { return html`<input type="hidden" name="_csrf" value="${req.admin.csrf}">`; }

function shell(req, { title, body, active, flash }) {
  const msg = flash && MESSAGES[flash];
  return '<!doctype html>' + html`<html lang="en-IN"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} | Siri Homestay admin</title>
<meta name="robots" content="noindex, nofollow">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/fonts/anek-latin-wdth.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${asset('/css/admin.css')}">
<script src="${asset('/js/admin.js')}" defer></script>
</head><body class="admin">
<a class="skip" href="#main">Skip to content</a>
<aside class="side">
  <a class="side__brand" href="/admin">${MARK}<span>Siri Homestay<small>Admin</small></span></a>
  <button class="side__toggle" type="button" aria-expanded="false" aria-controls="side-nav" data-side-toggle>Menu</button>
  <nav id="side-nav" class="side__nav" aria-label="Admin">
    <ul>${NAV.map(([href, label]) => html`<li><a href="${href}"${active === href ? raw(' aria-current="page"') : ''}>${label}</a></li>`)}</ul>
    <div class="side__foot">
      <a href="/" target="_blank" rel="noopener">View the website</a>
      <form method="post" action="/admin/logout">${csrf(req)}<button type="submit" class="linklike">Sign out ${req.admin.email}</button></form>
    </div>
  </nav>
</aside>
<main id="main" class="main" tabindex="-1">
  ${storageNote()}
  ${msg ? html`<p class="flash" role="status">${msg}</p>` : ''}
  ${body}
</main>
</body></html>`;
}

function bare(title, body) {
  return '<!doctype html>' + html`<html lang="en-IN"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} | Siri Homestay admin</title><meta name="robots" content="noindex, nofollow">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="${asset('/css/admin.css')}"></head>
<body class="admin admin--bare"><main class="auth">${MARK}${storageNote()}${body}</main></body></html>`;
}

function login({ error, pre, email = '', next = '' }) {
  return bare('Sign in', html`<h1>Sign in</h1>
  ${error ? html`<p class="error" role="alert">${error}</p>` : ''}
  <form method="post" action="/admin/login" class="stack">
    <input type="hidden" name="_pre" value="${pre}"><input type="hidden" name="next" value="${next}">
    <label for="email">Email</label><input id="email" name="email" type="email" autocomplete="username" required value="${email}">
    <label for="password">Password</label><input id="password" name="password" type="password" autocomplete="current-password" required>
    <button class="btn" type="submit">Sign in</button>
  </form>`);
}

function password(req, { errors = [], forced }) {
  const body = html`<header class="page-h"><h1>Change your password</h1>
  ${forced ? html`<p>You’re signed in with a temporary password. Choose your own before continuing.</p>` : ''}</header>
  ${errors.length ? html`<div class="error" role="alert"><ul>${errors.map((e) => html`<li>${e}</li>`)}</ul></div>` : ''}
  <form method="post" action="/admin/password" class="panel stack narrow">${csrf(req)}
    <label for="current">Current password</label><input id="current" name="current" type="password" autocomplete="current-password" required>
    <label for="next">New password</label><input id="next" name="next" type="password" autocomplete="new-password" minlength="12" required aria-describedby="pw-hint">
    <p id="pw-hint" class="hint">At least 12 characters. A short sentence is easy to remember.</p>
    <label for="confirm">New password again</label><input id="confirm" name="confirm" type="password" autocomplete="new-password" required>
    <button class="btn" type="submit">Change password</button>
  </form>`;
  return shell(req, { title: 'Password', body, active: '/admin/settings' });
}

function bookingRow(r) {
  return html`<tr>
    <td><a href="/admin/bookings/${r.id}" class="ref">${r.ref}</a></td>
    <td>${r.full_name}<br><span class="muted">${r.phone ? formatPhone(r.phone) : ''}</span></td>
    <td>${r.room_type_name}${r.room_type_kind === 'unit' && r.units_requested > 1 ? ` × ${r.units_requested}` : ''}</td>
    <td>${fmtDate(r.check_in, { day: 'numeric', month: 'short' })} – ${fmtDate(r.check_out, { day: 'numeric', month: 'short', year: 'numeric' })}</td>
    <td>${r.adults + r.children}</td>
    <td>${badge(r.status)}</td>
    <td class="muted">${SOURCE_LABEL[r.source]}</td>
  </tr>`;
}

function bookingTable(rows, empty) {
  if (!rows.length) return html`<p class="empty">${empty}</p>`;
  return html`<div class="table-wrap"><table class="table">
    <thead><tr><th scope="col">Ref</th><th scope="col">Guest</th><th scope="col">Stay</th><th scope="col">Dates</th><th scope="col">Guests</th><th scope="col">Status</th><th scope="col">Source</th></tr></thead>
    <tbody>${rows.map(bookingRow)}</tbody></table></div>`;
}

function dashboard(req, d) {
  const body = html`<header class="page-h"><h1>Overview</h1><p>${fmtDate(today(), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
    <a class="btn" href="/admin/bookings/new">Add a booking</a></header>
  ${d.setup.length ? html`<section class="panel panel--note" aria-labelledby="setup-h"><h2 id="setup-h">Finish setting up</h2>
    <ul class="checklist">${d.setup.map((s) => html`<li><a href="${s.href}">${s.label}</a><span class="muted"> ${s.why}</span></li>`)}</ul></section>` : ''}
  <section class="stats" aria-label="Summary">
    <a class="stat" href="/admin/bookings?status=enquiry"><span class="stat__n">${d.counts.enquiry}</span><span>New enquiries</span></a>
    <a class="stat" href="/admin/bookings?status=hold"><span class="stat__n">${d.counts.hold}</span><span>On hold</span></a>
    <a class="stat" href="/admin/bookings?status=confirmed"><span class="stat__n">${d.counts.upcoming}</span><span>Confirmed, upcoming</span></a>
    <a class="stat" href="/admin/calendar"><span class="stat__n">${d.occupancy}%</span><span>Villa-nights booked, next 30 days</span></a>
  </section>
  <section class="panel" aria-labelledby="new-h"><h2 id="new-h">New enquiries</h2>
    ${bookingTable(d.enquiries, 'No new enquiries. New ones from the website appear here.')}</section>
  <section class="panel" aria-labelledby="arr-h"><h2 id="arr-h">Arriving in the next 7 days</h2>
    ${bookingTable(d.arrivals, 'No arrivals in the next 7 days.')}</section>
  <section class="panel" aria-labelledby="dep-h"><h2 id="dep-h">Leaving in the next 7 days</h2>
    ${bookingTable(d.departures, 'No departures in the next 7 days.')}</section>`;
  return shell(req, { title: 'Overview', body, active: '/admin', flash: req.query.msg });
}

const TABS = [['open', 'Open'], ['enquiry', 'New enquiries'], ['hold', 'On hold'], ['confirmed', 'Confirmed'], ['checked_in', 'Checked in'], ['all', 'All']];

function bookings(req, rows, { status, q }) {
  const body = html`<header class="page-h"><h1>Bookings</h1><a class="btn" href="/admin/bookings/new">Add a booking</a></header>
  <nav class="tabs" aria-label="Filter by status"><ul>${TABS.map(([k, label]) => html`<li><a href="/admin/bookings?status=${k}${q ? `&q=${encodeURIComponent(q)}` : ''}"${status === k ? raw(' aria-current="page"') : ''}>${label}</a></li>`)}</ul></nav>
  <form class="search" method="get" action="/admin/bookings" role="search">
    <input type="hidden" name="status" value="${status}">
    <label for="q" class="visually-hidden">Search bookings</label>
    <input id="q" name="q" type="search" value="${q || ''}" placeholder="Name, phone, email or reference">
    <button class="btn btn--quiet" type="submit">Search</button>
  </form>
  ${bookingTable(rows, q ? 'No bookings match that search.' : 'No bookings here yet.')}`;
  return shell(req, { title: 'Bookings', body, active: '/admin/bookings', flash: req.query.msg });
}

const ACTION_LABEL = {
  hold: 'Hold villas', confirmed: 'Confirm booking', declined: 'Decline enquiry', cancelled: 'Cancel booking',
  checked_in: 'Check in', checked_out: 'Check out', no_show: 'Mark no-show', enquiry: 'Release hold', expired: null,
};

function booking(req, r, { free, pool, events, notices, error, holdHours }) {
  const needsUnits = ['hold', 'confirmed'].filter((s) => r.allowed.includes(s)).length && !r.units.length;
  const phoneDigits = r.phone ? r.phone.replace(/\D/g, '') : '';
  const body = html`<header class="page-h">
    <p class="crumbs"><a href="/admin/bookings">Bookings</a></p>
    <h1>${r.full_name} <span class="ref">${r.ref}</span></h1>
    <p>${badge(r.status)} <span class="muted">From ${SOURCE_LABEL[r.source]}${r.external_reservation_id ? `, platform ID ${r.external_reservation_id}` : ''}. Received ${fmtDateTime(r.created_at)}.</span></p>
  </header>
  ${error ? html`<p class="error" role="alert">${error}</p>` : ''}
  <div class="grid-2">
    <section class="panel" aria-labelledby="stay-h"><h2 id="stay-h">Stay</h2>
      <dl class="dl">
        <div><dt>Stay</dt><dd>${r.room_type_name}${r.room_type_kind === 'unit' ? `, ${r.units_requested} villa${r.units_requested > 1 ? 's' : ''}` : ''}</dd></div>
        <div><dt>Arrive</dt><dd>${fmtDate(r.check_in, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</dd></div>
        <div><dt>Leave</dt><dd>${fmtDate(r.check_out, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })} (${r.nights} night${r.nights > 1 ? 's' : ''})</dd></div>
        <div><dt>Guests</dt><dd>${r.adults} adult${r.adults > 1 ? 's' : ''}${r.children ? `, ${r.children} child${r.children > 1 ? 'ren' : ''}` : ''}</dd></div>
        <div><dt>Villas</dt><dd>${r.units.length ? r.units.map((u) => u.name).join(', ') : html`<span class="muted">Not allocated yet</span>`}</dd></div>
        ${r.status === 'hold' ? html`<div><dt>Hold ends</dt><dd>${fmtDateTime(r.hold_expires_at)}</dd></div>` : ''}
        ${r.quoted_total_inr != null ? html`<div><dt>Quoted</dt><dd>₹${r.quoted_total_inr.toLocaleString('en-IN')}</dd></div>` : ''}
      </dl>
      ${r.guest_message ? html`<h3>Guest’s message</h3><p class="quote">${r.guest_message}</p>` : ''}
    </section>
    <section class="panel" aria-labelledby="guest-h"><h2 id="guest-h">Guest</h2>
      <dl class="dl">
        <div><dt>Name</dt><dd>${r.full_name}</dd></div>
        <div><dt>Phone</dt><dd>${r.phone ? html`<a href="tel:${r.phone}">${formatPhone(r.phone)}</a> · <a href="https://wa.me/${phoneDigits}" target="_blank" rel="noopener">WhatsApp</a>` : '—'}</dd></div>
        <div><dt>Email</dt><dd>${r.email ? html`<a href="mailto:${r.email}">${r.email}</a>` : '—'}</dd></div>
        <div><dt>From</dt><dd>${r.city || '—'}</dd></div>
        ${r.consent_at ? html`<div><dt>Consent</dt><dd>Given ${fmtDateTime(r.consent_at)}</dd></div>` : ''}
      </dl>
    </section>
  </div>

  ${r.allowed.length ? html`<section class="panel" aria-labelledby="act-h"><h2 id="act-h">Next step</h2>
    ${needsUnits ? html`<form method="post" action="/admin/bookings/${r.id}/status" class="stack">${csrf(req)}
      <fieldset><legend>Choose ${r.room_type_kind === 'whole_property' ? 'villas (all are needed)' : `${r.units_requested} villa${r.units_requested > 1 ? 's' : ''}`}</legend>
        ${r.room_type_kind === 'whole_property' ? html`<p class="hint">The whole estate uses every villa. ${free.length === pool.length ? 'All are free for these dates.' : 'Some villas are already taken on these dates.'}</p>` : html`
        <div class="checks">${pool.map((u) => { const isFree = free.some((f) => f.id === u.id); return html`<label class="check${isFree ? '' : ' check--off'}"><input type="checkbox" name="unit_ids" value="${u.id}"${isFree ? '' : raw(' disabled')}> ${u.name}${isFree ? '' : ' (taken)'}</label>`; })}</div>
        <p class="hint">Leave all unticked to pick the first free villas automatically. ${free.length} of ${pool.length} free for every night.</p>`}
      </fieldset>
      <label class="check"><input type="checkbox" name="notify_guest" value="1"${r.email ? raw(' checked') : raw(' disabled')}> Email the guest when confirmed${r.email ? '' : ' (no email given)'}</label>
      <div class="actions">
        ${r.allowed.includes('confirmed') ? html`<button class="btn" name="to" value="confirmed">Confirm booking</button>` : ''}
        ${r.allowed.includes('hold') ? html`<button class="btn btn--quiet" name="to" value="hold">Hold for ${holdHours} hours</button>` : ''}
      </div>
    </form>` : ''}
    <form method="post" action="/admin/bookings/${r.id}/status" class="actions">${csrf(req)}
      ${r.allowed.filter((s) => !(needsUnits && ['hold', 'confirmed'].includes(s)) && ACTION_LABEL[s]).map((s) => html`<button class="btn ${['cancelled', 'declined', 'no_show'].includes(s) ? 'btn--danger' : (s === 'enquiry' ? 'btn--quiet' : '')}" name="to" value="${s}"${['cancelled', 'declined', 'no_show'].includes(s) ? raw(' data-confirm="Are you sure? This releases the villas.\"') : ''}>${ACTION_LABEL[s]}</button>`)}
    </form>
  </section>` : ''}

  <div class="grid-2">
    ${['enquiry', 'hold', 'confirmed'].includes(r.status) ? html`<section class="panel" aria-labelledby="dates-h"><h2 id="dates-h">Change dates</h2>
      <form method="post" action="/admin/bookings/${r.id}/dates" class="stack">${csrf(req)}
        <div class="row"><div><label for="ci">Arrive</label><input id="ci" type="date" name="check_in" value="${r.check_in}" required></div>
        <div><label for="co">Leave</label><input id="co" type="date" name="check_out" value="${r.check_out}" required></div></div>
        <button class="btn btn--quiet" type="submit">Change dates</button>
      </form></section>` : ''}
    <section class="panel" aria-labelledby="notes-h"><h2 id="notes-h">Notes and quote</h2>
      <form method="post" action="/admin/bookings/${r.id}/notes" class="stack">${csrf(req)}
        <label for="quoted">Quoted total (₹)</label><input id="quoted" name="quoted_total_inr" inputmode="numeric" value="${r.quoted_total_inr ?? ''}">
        <label for="notes">Private notes</label><textarea id="notes" name="internal_notes" rows="4">${r.internal_notes || ''}</textarea>
        <button class="btn btn--quiet" type="submit">Save notes</button>
      </form></section>
  </div>

  <section class="panel" aria-labelledby="hist-h"><h2 id="hist-h">History</h2>
    <ol class="timeline">${events.map((e) => html`<li><time>${fmtDateTime(e.at)}</time> ${describeEvent(e)}</li>`)}</ol>
    ${notices.length ? html`<h3>Emails</h3><ul class="timeline">${notices.map((n) => html`<li><time>${fmtDateTime(n.created_at)}</time> ${n.subject} to ${n.recipient}: <strong>${emailStatus(n.status)}</strong></li>`)}</ul>` : ''}
  </section>`;
  return shell(req, { title: r.ref, body, active: '/admin/bookings', flash: req.query.msg });
}

function emailStatus(s) {
  return { pending: 'waiting to send', sent: 'sent', failed: 'failed', not_configured: 'not sent, email isn’t set up' }[s] || s;
}

function describeEvent(e) {
  const d = e.details_json ? JSON.parse(e.details_json) : {};
  const who = e.actor_type === 'admin' ? (e.actor_email || 'Admin') : ({ guest: 'Guest', system: 'System', channel: 'Channel' }[e.actor_type]);
  const range = (x) => (Array.isArray(x) ? x.map((v) => fmtDate(v, { day: 'numeric', month: 'short' })).join(' – ') : '');
  const map = {
    'reservation.enquiry_received': () => 'Enquiry received from the website',
    'reservation.created': () => `Booking added (${STATUS_LABEL[d.status] || d.status})`,
    'reservation.dates_changed': () => `Dates changed from ${range(d.from)} to ${range(d.to)}`,
    'reservation.notes_updated': () => 'Notes or quote updated',
    'reservation.imported': () => 'Imported from a channel',
  };
  let text = map[e.action] ? map[e.action]() : null;
  if (!text && e.action.startsWith('reservation.')) {
    text = `Status: ${STATUS_LABEL[d.from] || d.from} → ${STATUS_LABEL[d.to] || d.to}${d.units?.length ? ` (${d.units.join(', ')})` : ''}`;
  }
  return html`${text || e.action} <span class="muted">by ${who}</span>`;
}

function newBooking(req, { stays, pool, values = {}, errors = {}, error }) {
  const v = values;
  const err = (k) => (errors[k] ? html`<p class="field-error" id="e-${k}">${errors[k]}</p>` : '');
  const t = today();
  const body = html`<header class="page-h"><p class="crumbs"><a href="/admin/bookings">Bookings</a></p><h1>Add a booking</h1>
    <p>For bookings taken by phone, WhatsApp or in person. Choose the status: confirmed bookings block the villas straight away.</p></header>
  ${error ? html`<p class="error" role="alert">${error}</p>` : ''}
  ${Object.keys(errors).length ? html`<p class="error" role="alert">Check the highlighted fields.</p>` : ''}
  <form method="post" action="/admin/bookings/new" class="panel stack">${csrf(req)}
    <div class="row">
      <div><label for="room_type">Stay</label><select id="room_type" name="room_type">${stays.map((s) => html`<option value="${s.slug}"${v.room_type === s.slug ? raw(' selected') : ''}>${s.name}</option>`)}</select>${err('room_type')}</div>
      <div><label for="units">Villas</label><input id="units" name="units" type="number" min="1" max="${pool.length}" value="${v.units || 1}">${err('units')}</div>
      <div><label for="status">Status</label><select id="status" name="status">${['confirmed', 'hold', 'enquiry'].map((s) => html`<option value="${s}"${(v.status || 'confirmed') === s ? raw(' selected') : ''}>${STATUS_LABEL[s]}</option>`)}</select></div>
    </div>
    <fieldset><legend>Specific villas <span class="muted">(optional; otherwise the first free ones)</span></legend>
      <div class="checks">${pool.map((u) => html`<label class="check"><input type="checkbox" name="unit_ids" value="${u.id}"${[].concat(v.unit_ids || []).includes(String(u.id)) ? raw(' checked') : ''}> ${u.name}</label>`)}</div></fieldset>
    <div class="row">
      <div><label for="check_in">Arrive</label><input id="check_in" type="date" name="check_in" value="${v.check_in || t}" required>${err('check_in')}</div>
      <div><label for="check_out">Leave</label><input id="check_out" type="date" name="check_out" value="${v.check_out || addDays(t, 1)}" required>${err('check_out')}</div>
      <div><label for="adults">Adults</label><input id="adults" type="number" name="adults" min="1" value="${v.adults || 2}">${err('adults')}</div>
      <div><label for="children">Children</label><input id="children" type="number" name="children" min="0" value="${v.children || 0}"></div>
    </div>
    <div class="row">
      <div><label for="full_name">Guest name</label><input id="full_name" name="full_name" value="${v.full_name || ''}" required>${err('full_name')}</div>
      <div><label for="phone">Phone</label><input id="phone" name="phone" type="tel" value="${v.phone || ''}" required>${err('phone')}</div>
      <div><label for="email">Email</label><input id="email" name="email" type="email" value="${v.email || ''}">${err('email')}</div>
    </div>
    <div class="row">
      <div><label for="source">Came through</label><select id="source" name="source">${['direct_phone', 'direct_whatsapp', 'walk_in', 'owner', 'direct_web', 'airbnb', 'makemytrip', 'other_channel'].map((s) => html`<option value="${s}"${v.source === s ? raw(' selected') : ''}>${SOURCE_LABEL[s]}</option>`)}</select></div>
      <div><label for="ext">Platform booking ID <span class="muted">(Airbnb/MakeMyTrip only)</span></label><input id="ext" name="external_reservation_id" value="${v.external_reservation_id || ''}">${err('external_reservation_id')}</div>
      <div><label for="quoted">Quoted total (₹)</label><input id="quoted" name="quoted_total_inr" inputmode="numeric" value="${v.quoted_total_inr || ''}"></div>
    </div>
    <label for="internal_notes">Private notes</label><textarea id="internal_notes" name="internal_notes" rows="3">${v.internal_notes || ''}</textarea>
    <p class="hint">Recording an Airbnb or MakeMyTrip booking here blocks the villa on this calendar only. Those platforms aren’t connected yet, so block the dates there too.</p>
    <button class="btn" type="submit">Add booking</button>
  </form>`;
  return shell(req, { title: 'Add a booking', body, active: '/admin/bookings' });
}

function calendar(req, g, { month, prev, next, blocks, error, values = {} }) {
  const dow = (d) => new Date(d + 'T00:00:00Z').getUTCDay();
  const body = html`<header class="page-h"><h1>Calendar</h1>
    <p>Every villa, night by night. Select a booking to open it.</p></header>
  ${error ? html`<p class="error" role="alert">${error}</p>` : ''}
  <nav class="month-nav" aria-label="Month"><a class="btn btn--quiet" href="/admin/calendar?month=${prev}">Previous month</a>
    <h2>${new Date(month + 'T00:00:00Z').toLocaleDateString('en-IN', { month: 'long', year: 'numeric', timeZone: 'UTC' })}</h2>
    <a class="btn btn--quiet" href="/admin/calendar?month=${next}">Next month</a></nav>
  <div class="cal-wrap" tabindex="0" aria-label="Calendar grid, scrolls sideways">
  <table class="cal">
    <thead><tr><th scope="col">Villa</th>${g.dates.map((d) => html`<th scope="col" class="${dow(d) === 0 || dow(d) === 6 ? 'we' : ''}${d === today() ? ' today' : ''}"><span>${['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][dow(d)]}</span>${Number(d.slice(8))}</th>`)}</tr></thead>
    <tbody>${g.units.map((u) => html`<tr><th scope="row">${u.name}</th>${g.dates.map((d) => {
      const c = g.cell(u.id, d);
      if (!c) return html`<td class="free"><span class="visually-hidden">${fmtDate(d)} free</span></td>`;
      if (c.block_id) return html`<td class="cell cell--block" title="Blocked: ${c.reason || 'no reason given'}"><span class="visually-hidden">${fmtDate(d)} blocked</span></td>`;
      return html`<td class="cell cell--${c.status}"><a href="/admin/bookings/${c.reservation_id}" title="${c.full_name}, ${c.ref}, ${STATUS_LABEL[c.status]}"><span class="visually-hidden">${fmtDate(d)} ${c.full_name} ${STATUS_LABEL[c.status]}</span></a></td>`;
    })}</tr>`)}</tbody>
  </table></div>
  <p class="legend"><span class="key cell--confirmed"></span> Confirmed <span class="key cell--hold"></span> On hold <span class="key cell--checked_in"></span> Checked in <span class="key cell--block"></span> Blocked</p>

  <div class="grid-2">
  <section class="panel" aria-labelledby="block-h"><h2 id="block-h">Block dates</h2>
    <p class="hint">For maintenance, personal use, or bookings taken elsewhere. Blocked nights can’t be booked.</p>
    <form method="post" action="/admin/blocks" class="stack">${csrf(req)}
      <label for="unit">Villa</label><select id="unit" name="unit_id">${g.units.map((u) => html`<option value="${u.id}"${String(values.unit_id) === String(u.id) ? raw(' selected') : ''}>${u.name}</option>`)}<option value="all">All villas</option></select>
      <div class="row"><div><label for="bs">From</label><input id="bs" type="date" name="start_date" value="${values.start_date || ''}" required></div>
      <div><label for="be">Until (the morning of)</label><input id="be" type="date" name="end_date" value="${values.end_date || ''}" required></div></div>
      <label for="reason">Reason <span class="muted">(only you see this)</span></label><input id="reason" name="reason" maxlength="120" value="${values.reason || ''}">
      <button class="btn" type="submit">Block dates</button>
    </form></section>
  <section class="panel" aria-labelledby="blocks-h"><h2 id="blocks-h">Upcoming blocks</h2>
    ${blocks.length ? html`<ul class="list">${blocks.map((b) => html`<li><span><strong>${b.unit_name}</strong> ${fmtDate(b.start_date, { day: 'numeric', month: 'short' })} – ${fmtDate(b.end_date, { day: 'numeric', month: 'short', year: 'numeric' })}${b.reason ? html` <span class="muted">${b.reason}</span>` : ''}</span>
      <form method="post" action="/admin/blocks/${b.id}/delete">${csrf(req)}<button class="linklike" type="submit" data-confirm="Remove this block?">Remove</button></form></li>`)}</ul>` : html`<p class="empty">No upcoming blocks.</p>`}
    <h3>Download a villa’s calendar</h3>
    <p class="hint">An .ics file of booked and blocked nights, for your phone’s calendar or as a backup.</p>
    <ul class="inline">${g.units.map((u) => html`<li><a href="/admin/units/${u.id}/calendar.ics">${u.name}</a></li>`)}</ul>
  </section></div>`;
  return shell(req, { title: 'Calendar', body, active: '/admin/calendar', flash: req.query.msg });
}

function stays(req, { types, units, error }) {
  const body = html`<header class="page-h"><h1>Stays and villas</h1>
    <p>What guests can choose on the website, and the five physical villas behind them.</p></header>
  ${error ? html`<p class="error" role="alert">${error}</p>` : ''}
  ${types.map((t) => html`<section class="panel" aria-labelledby="t-${t.id}"><h2 id="t-${t.id}">${t.name} <a class="small" href="/stay/${t.slug}" target="_blank" rel="noopener">View page</a></h2>
    <form method="post" action="/admin/stays/${t.id}" class="stack">${csrf(req)}
      <div class="row"><div><label for="n-${t.id}">Name</label><input id="n-${t.id}" name="name" value="${t.name}" required maxlength="60"></div>
      <div><label for="m-${t.id}">Sleeps up to</label><input id="m-${t.id}" name="max_guests" type="number" min="1" max="60" value="${t.max_guests}"></div></div>
      <label for="s-${t.id}">Summary</label><textarea id="s-${t.id}" name="summary" rows="2" maxlength="300">${t.summary || ''}</textarea>
      <label for="d-${t.id}">Description</label><textarea id="d-${t.id}" name="description" rows="5" maxlength="2000">${t.description || ''}</textarea>
      <label for="b-${t.id}">Beds</label><input id="b-${t.id}" name="bed_config" value="${t.bed_config || ''}" maxlength="200">
      <label for="f-${t.id}">Features <span class="muted">(one per line)</span></label><textarea id="f-${t.id}" name="features" rows="6">${t.features.join('\n')}</textarea>
      <fieldset><legend>Rate shown on the website</legend>
        <label class="check"><input type="radio" name="rate_mode" value="on_request"${t.rate_mode === 'on_request' ? raw(' checked') : ''}> “Quoted by the hosts for your dates”</label>
        <label class="check"><input type="radio" name="rate_mode" value="from"${t.rate_mode === 'from' ? raw(' checked') : ''}> “From ₹…”</label>
        <div class="row"><div><label for="r-${t.id}">From (₹)</label><input id="r-${t.id}" name="rate_from_inr" inputmode="numeric" value="${t.rate_from_inr ?? ''}"></div>
        <div><label for="rb-${t.id}">Per</label><input id="rb-${t.id}" name="rate_basis" placeholder="per villa per night" value="${t.rate_basis || ''}" maxlength="60"></div></div>
      </fieldset>
      <label class="check"><input type="checkbox" name="is_active" value="1"${t.is_active ? raw(' checked') : ''}> Show on the website and accept enquiries</label>
      <button class="btn" type="submit">Save ${t.name}</button>
    </form></section>`)}
  <section class="panel" aria-labelledby="units-h"><h2 id="units-h">Villas</h2>
    <div class="table-wrap"><table class="table"><thead><tr><th scope="col">Code</th><th scope="col">Name</th><th scope="col">Notes</th><th scope="col">Bookable</th><th scope="col"><span class="visually-hidden">Save</span></th></tr></thead>
    <tbody>${units.map((u) => html`<tr><td>${u.code}</td><td colspan="4">
      <form method="post" action="/admin/units/${u.id}" class="inline-form">${csrf(req)}
        <label class="visually-hidden" for="un-${u.id}">Name of ${u.code}</label><input id="un-${u.id}" name="name" value="${u.name}" maxlength="40" required>
        <label class="visually-hidden" for="uo-${u.id}">Notes for ${u.code}</label><input id="uo-${u.id}" name="notes" value="${u.notes || ''}" maxlength="200" placeholder="e.g. faces the pond">
        <label class="check"><input type="checkbox" name="is_active" value="1"${u.is_active ? raw(' checked') : ''}> Bookable</label>
        <button class="btn btn--quiet btn--small" type="submit">Save</button>
      </form></td></tr>`)}</tbody></table></div>
    <p class="hint">A villa that isn’t bookable is skipped when villas are allocated, and the whole estate can’t be booked while it’s off.</p>
  </section>`;
  return shell(req, { title: 'Stays and villas', body, active: '/admin/stays', flash: req.query.msg });
}

function property(req, { p, contacts, error }) {
  const f = (name, label, value, attrs = '') => html`<div><label for="p-${name}">${label}</label><input id="p-${name}" name="${name}" value="${value ?? ''}"${raw(attrs ? ' ' + attrs : '')}></div>`;
  const body = html`<header class="page-h"><h1>Property and contacts</h1></header>
  ${error ? html`<p class="error" role="alert">${error}</p>` : ''}
  <form method="post" action="/admin/property" class="panel stack">${csrf(req)}
    <h2>Property</h2>
    ${f('name', 'Name', p.name, 'required maxlength="80"')}
    <label for="p-summary">One-line summary <span class="muted">(search results and sharing)</span></label><textarea id="p-summary" name="summary" rows="2" maxlength="300">${p.summary || ''}</textarea>
    <div class="row">${f('address_locality', 'Village', p.address_locality)}${f('address_district', 'District', p.address_district)}${f('address_region', 'State', p.address_region)}${f('postal_code', 'PIN code', p.postal_code, 'inputmode="numeric" maxlength="6"')}</div>
    <div class="row">${f('latitude', 'Latitude', p.latitude, 'inputmode="decimal" placeholder="13.3…"')}${f('longitude', 'Longitude', p.longitude, 'inputmode="decimal" placeholder="75.7…"')}${f('map_url', 'Google Maps link', p.map_url, 'type="url"')}</div>
    <p class="hint">Drop a pin on the villas in Google Maps, then copy the coordinates here so the map and directions point to the right gate.</p>
    <div class="row">${f('check_in_time', 'Check-in from', p.check_in_time, 'type="time"')}${f('check_in_until', 'Check-in until', p.check_in_until, 'type="time"')}${f('check_out_time', 'Check-out by', p.check_out_time, 'type="time"')}</div>
    <h3>Estate facts</h3>
    <div class="row">${f('land_area_acres', 'Land (acres)', p.land_area_acres, 'inputmode="decimal"')}${f('converted_land_acres', 'Converted / alienated (acres)', p.converted_land_acres, 'inputmode="decimal"')}${f('villa_count', 'Villas', p.villa_count, 'inputmode="numeric"')}</div>
    <div class="row">${f('pond_area_sqft', 'Pond (sq ft)', p.pond_area_sqft, 'inputmode="numeric"')}${f('lawn_area_sqft', 'Lawn (sq ft)', p.lawn_area_sqft, 'inputmode="numeric"')}${f('generator_kw', 'Generator (kW)', p.generator_kw, 'inputmode="decimal"')}${f('ups_kw', 'UPS (kW)', p.ups_kw, 'inputmode="decimal"')}</div>
    <p class="hint">Converted land and lawn area are kept here for your records and aren’t shown on the website.</p>
    <div class="row">${f('licence_number', 'Homestay licence number', p.licence_number, 'maxlength="60"')}${f('facebook_url', 'Facebook page', p.facebook_url, 'type="url"')}</div>
    <div class="checks">
      <label class="check"><input type="checkbox" name="homestay_licensed" value="1"${p.homestay_licensed ? raw(' checked') : ''}> Licensed homestay</label>
      <label class="check"><input type="checkbox" name="has_dining_hall" value="1"${p.has_dining_hall ? raw(' checked') : ''}> Dining hall</label>
      <label class="check"><input type="checkbox" name="has_kitchen" value="1"${p.has_kitchen ? raw(' checked') : ''}> Kitchen</label>
      <label class="check"><input type="checkbox" name="has_staff_quarters" value="1"${p.has_staff_quarters ? raw(' checked') : ''}> Staff quarters</label>
    </div>
    <button class="btn" type="submit">Save property</button>
  </form>

  <section class="panel" aria-labelledby="c-h"><h2 id="c-h">Enquiry contacts</h2>
    <p class="hint">Shown on the website in this order. “Gets emails” means new enquiries are emailed to them.</p>
    ${contacts.map((c) => html`<form method="post" action="/admin/contacts/${c.id}" class="contact-row">${csrf(req)}
      <div><label for="cn-${c.id}">Name</label><input id="cn-${c.id}" name="name" value="${c.name}" required maxlength="60"></div>
      <div><label for="cp-${c.id}">Phone</label><input id="cp-${c.id}" name="phone" type="tel" value="${c.phone_e164 || ''}"></div>
      <div><label for="ce-${c.id}">Email</label><input id="ce-${c.id}" name="email" type="email" value="${c.email || ''}"></div>
      <div><label for="co-${c.id}">Order</label><input id="co-${c.id}" name="sort_order" type="number" value="${c.sort_order}" class="w-s"></div>
      <div class="checks">
        <label class="check"><input type="checkbox" name="whatsapp" value="1"${c.whatsapp ? raw(' checked') : ''}> WhatsApp</label>
        <label class="check"><input type="checkbox" name="is_public" value="1"${c.is_public ? raw(' checked') : ''}> On website</label>
        <label class="check"><input type="checkbox" name="notify_on_enquiry" value="1"${c.notify_on_enquiry ? raw(' checked') : ''}> Gets emails</label>
      </div>
      <div class="actions"><button class="btn btn--quiet btn--small" type="submit">Save</button>
      <button class="linklike danger" type="submit" formaction="/admin/contacts/${c.id}/delete" data-confirm="Remove ${c.name}?">Remove</button></div>
    </form>`)}
    <form method="post" action="/admin/contacts" class="contact-row contact-row--new">${csrf(req)}
      <div><label for="nn">Name</label><input id="nn" name="name" required maxlength="60"></div>
      <div><label for="np">Phone</label><input id="np" name="phone" type="tel"></div>
      <div><label for="ne">Email</label><input id="ne" name="email" type="email"></div>
      <div class="actions"><button class="btn btn--small" type="submit">Add contact</button></div>
    </form>
  </section>`;
  return shell(req, { title: 'Property and contacts', body, active: '/admin/property', flash: req.query.msg });
}

function channels(req, { listings, runs, types, units, error }) {
  const body = html`<header class="page-h"><h1>Airbnb and MakeMyTrip</h1>
    <p>These platforms are <strong>not connected</strong>. Connecting them is planned for Phase 2. Until then, bookings made on them don’t appear here automatically, so add them under <a href="/admin/bookings/new">Add a booking</a> and block dates on the platforms yourself.</p></header>
  ${error ? html`<p class="error" role="alert">${error}</p>` : ''}
  <section class="panel" aria-labelledby="l-h"><h2 id="l-h">Your listing references</h2>
    <p class="hint">Record each listing’s ID and link now, so Phase 2 can match it to the right villa.</p>
    ${listings.length ? html`<div class="table-wrap"><table class="table"><thead><tr><th scope="col">Platform</th><th scope="col">For</th><th scope="col">Listing ID</th><th scope="col">Link</th><th scope="col">Connection</th><th scope="col"><span class="visually-hidden">Actions</span></th></tr></thead>
    <tbody>${listings.map((l) => html`<tr><td>${PROVIDERS[l.provider].label}</td><td>${l.unit_name || l.type_name}</td><td>${l.external_listing_id || '—'}</td>
      <td>${l.external_url ? html`<a href="${l.external_url}" target="_blank" rel="noopener noreferrer">Open</a>` : '—'}</td>
      <td><span class="badge badge--off">Not connected</span></td>
      <td><form method="post" action="/admin/channels/${l.id}/delete">${csrf(req)}<button class="linklike danger" type="submit" data-confirm="Remove this listing reference?">Remove</button></form></td></tr>`)}</tbody></table></div>` : html`<p class="empty">No listing references yet.</p>`}
    <form method="post" action="/admin/channels" class="stack">${csrf(req)}
      <h3>Add a listing reference</h3>
      <div class="row">
        <div><label for="prov">Platform</label><select id="prov" name="provider">${Object.entries(PROVIDERS).map(([k, v]) => html`<option value="${k}">${v.label}</option>`)}</select></div>
        <div><label for="target">For</label><select id="target" name="target">
          ${types.map((t) => html`<option value="type:${t.id}">${t.name} (stay type)</option>`)}
          ${units.map((u) => html`<option value="unit:${u.id}">${u.name}</option>`)}</select></div>
        <div><label for="xid">Listing ID</label><input id="xid" name="external_listing_id" maxlength="80"></div>
        <div><label for="xurl">Listing link</label><input id="xurl" name="external_url" type="url" maxlength="300"></div>
      </div>
      <label for="xnotes">Notes</label><input id="xnotes" name="notes" maxlength="300">
      <button class="btn" type="submit">Save reference</button>
    </form>
  </section>
  <section class="panel" aria-labelledby="r-h"><h2 id="r-h">Sync history</h2>
    ${runs.length ? html`<ul class="timeline">${runs.map((r) => html`<li><time>${fmtDateTime(r.started_at)}</time> ${r.direction} ${r.status}${r.error_message ? `: ${r.error_message}` : ''}</li>`)}</ul>`
      : html`<p class="empty">No syncs have run. Syncing starts when the platforms are connected in Phase 2.</p>`}
  </section>`;
  return shell(req, { title: 'Airbnb and MakeMyTrip', body, active: '/admin/channels', flash: req.query.msg });
}

function emails(req, { rows, smtp }) {
  const body = html`<header class="page-h"><h1>Emails</h1>
    ${smtp ? html`<p>Email is set up. Messages are sent as soon as they’re created.</p>` : html`<p class="panel panel--note"><strong>Email isn’t set up yet.</strong> Enquiries are saved here and on the Bookings page, but no emails go out. Add the SMTP settings described in the README to start sending.</p>`}
    ${smtp ? html`<form method="post" action="/admin/emails/retry">${csrf(req)}<button class="btn btn--quiet" type="submit">Retry failed emails</button></form>` : ''}</header>
  ${rows.length ? html`<div class="table-wrap"><table class="table"><thead><tr><th scope="col">Created</th><th scope="col">To</th><th scope="col">Subject</th><th scope="col">Status</th></tr></thead>
    <tbody>${rows.map((n) => html`<tr><td>${fmtDateTime(n.created_at)}</td><td>${n.recipient}</td><td>${n.reservation_id ? html`<a href="/admin/bookings/${n.reservation_id}">${n.subject}</a>` : n.subject}</td><td>${emailStatus(n.status)}${n.last_error ? html`<br><span class="muted">${n.last_error}</span>` : ''}</td></tr>`)}</tbody></table></div>`
    : html`<p class="empty">No emails yet.</p>`}`;
  return shell(req, { title: 'Emails', body, active: '/admin/emails', flash: req.query.msg });
}

function activity(req, { rows, page }) {
  const body = html`<header class="page-h"><h1>Activity</h1><p>Everything that changed, newest first.</p></header>
  <div class="table-wrap"><table class="table"><thead><tr><th scope="col">When</th><th scope="col">Who</th><th scope="col">What</th><th scope="col">Record</th></tr></thead>
  <tbody>${rows.map((e) => html`<tr><td>${fmtDateTime(e.at)}</td><td>${e.actor_type === 'admin' ? (e.actor_email || 'Admin') : e.actor_type}</td><td>${e.action}</td>
    <td>${e.entity_type === 'reservation' && e.entity_id ? html`<a href="/admin/bookings/${e.entity_id}">Booking ${e.entity_id}</a>` : `${e.entity_type}${e.entity_id ? ' ' + e.entity_id : ''}`}</td></tr>`)}</tbody></table></div>
  <nav class="month-nav" aria-label="Pages">${page > 1 ? html`<a class="btn btn--quiet" href="/admin/activity?page=${page - 1}">Newer</a>` : html`<span></span>`}
    ${rows.length === 100 ? html`<a class="btn btn--quiet" href="/admin/activity?page=${page + 1}">Older</a>` : ''}</nav>`;
  return shell(req, { title: 'Activity', body, active: '/admin/activity' });
}

function settings(req, { s }) {
  const body = html`<header class="page-h"><h1>Settings</h1></header>
  <form method="post" action="/admin/settings" class="panel stack">${csrf(req)}
    <h2>Availability on the website</h2>
    <label class="check"><input type="checkbox" name="publish_availability" value="1"${s.publish_availability === '1' ? raw(' checked') : ''}> Show my calendar to guests</label>
    <p class="hint">Turn this on only once every booking, including phone and platform bookings, is entered here. Guests will then see full dates and can’t send enquiries for them. While it’s off, the website says the hosts confirm availability personally.</p>
    <h2>Holds</h2>
    <label for="hold">Hold villas for (hours)</label><input id="hold" name="hold_hours" type="number" min="1" max="336" value="${s.hold_hours}" class="w-s">
    <p class="hint">A hold keeps villas aside while a guest decides. It expires automatically and the villas are released.</p>
    <h2>Guest emails</h2>
    <label class="check"><input type="checkbox" name="guest_ack_email" value="1"${s.guest_ack_email === '1' ? raw(' checked') : ''}> Email guests an acknowledgement when they send an enquiry</label>
    <button class="btn" type="submit">Save settings</button>
  </form>
  <section class="panel" aria-labelledby="sec-h"><h2 id="sec-h">Your account</h2>
    <p><a class="btn btn--quiet" href="/admin/password">Change password</a></p>
    <form method="post" action="/admin/sessions/revoke">${csrf(req)}<button class="btn btn--quiet" type="submit">Sign out on every other device</button></form>
  </section>`;
  return shell(req, { title: 'Settings', body, active: '/admin/settings', flash: req.query.msg });
}

module.exports = { login, password, dashboard, bookings, booking, newBooking, calendar, stays, property, channels, emails, activity, settings };
