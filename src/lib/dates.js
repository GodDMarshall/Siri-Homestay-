'use strict';
// Calendar-date helpers. Dates are 'YYYY-MM-DD' strings handled in UTC so that
// no server timezone can shift a night.

const ISO = /^\d{4}-\d{2}-\d{2}$/;

function isValidDate(s) {
  if (typeof s !== 'string' || !ISO.test(s)) return false;
  const d = new Date(s + 'T00:00:00Z');
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
}

function addDays(s, n) {
  const d = new Date(s + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

function diffDays(a, b) {
  return Math.round((Date.parse(b + 'T00:00:00Z') - Date.parse(a + 'T00:00:00Z')) / 86400000);
}

// Nights occupied by a stay: [checkIn, checkOut)
function nights(checkIn, checkOut) {
  const out = [];
  for (let d = checkIn; d < checkOut; d = addDays(d, 1)) out.push(d);
  return out;
}

// Today's date at the property (Asia/Kolkata by default).
function today(tz = 'Asia/Kolkata') {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' })
    .formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t).value;
  return `${get('year')}-${get('month')}-${get('day')}`;
}

function nowIso() {
  return new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
}

function fmtDate(s, opts = { day: 'numeric', month: 'short', year: 'numeric' }) {
  if (!s) return '';
  return new Date(s.length === 10 ? s + 'T00:00:00Z' : s).toLocaleDateString('en-IN', { timeZone: 'UTC', ...opts });
}

function fmtDateTime(s, tz = 'Asia/Kolkata') {
  if (!s) return '';
  return new Date(s).toLocaleString('en-IN', { timeZone: tz, day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' });
}

function monthStart(s) { return s.slice(0, 8) + '01'; }

function addMonths(s, n) {
  const d = new Date(monthStart(s) + 'T00:00:00Z');
  d.setUTCMonth(d.getUTCMonth() + n);
  return d.toISOString().slice(0, 10);
}

module.exports = { isValidDate, addDays, diffDays, nights, today, nowIso, fmtDate, fmtDateTime, monthStart, addMonths };
