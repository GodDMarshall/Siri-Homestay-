'use strict';
// Shared domain helpers: settings, audit log, typed errors.
const { nowIso } = require('../lib/dates');

class DomainError extends Error {
  constructor(message, { code = 'invalid', field = null, status = 400, details = null } = {}) {
    super(message);
    this.code = code; this.field = field; this.status = status; this.details = details;
  }
}
class ValidationError extends DomainError {
  constructor(errors) {
    super('Please check the highlighted fields.', { code: 'validation', status: 422, details: errors });
    this.errors = errors; // { field: message }
  }
}
class ConflictError extends DomainError {
  constructor(message, details) { super(message, { code: 'conflict', status: 409, details }); }
}
class NotFoundError extends DomainError {
  constructor(what = 'Record') { super(`${what} not found.`, { code: 'not_found', status: 404 }); }
}

const SETTING_DEFAULTS = {
  publish_availability: '0',  // only show calendar status publicly once the owner keeps it current
  hold_hours: '48',
  guest_ack_email: '1',
  booking_window_days: '540',
  max_nights: '30',
};

function getSetting(db, key) {
  const row = db.prepare('SELECT value FROM settings WHERE key = ?').get(key);
  return row ? row.value : SETTING_DEFAULTS[key];
}
function setSetting(db, key, value) {
  db.prepare('INSERT INTO settings(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value = excluded.value')
    .run(key, String(value));
}
function allSettings(db) {
  const out = { ...SETTING_DEFAULTS };
  for (const r of db.prepare('SELECT key, value FROM settings').all()) out[r.key] = r.value;
  return out;
}

function audit(db, { actorType, actorId = null, action, entityType, entityId = null, details = null }) {
  db.prepare(`INSERT INTO audit_log (at, actor_type, actor_id, action, entity_type, entity_id, details_json)
              VALUES (?,?,?,?,?,?,?)`)
    .run(nowIso(), actorType, actorId, action, entityType, entityId, details ? JSON.stringify(details) : null);
}

module.exports = {
  DomainError, ValidationError, ConflictError, NotFoundError,
  getSetting, setSetting, allSettings, SETTING_DEFAULTS, audit,
};
