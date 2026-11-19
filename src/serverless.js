'use strict';
// Runs the site as a serverless function (Vercel). The app is built once per instance and
// reused; housekeeping that a long-running server does on a timer happens on requests instead.
let app = null, db = null, lastHousekeeping = 0;

function getApp() {
  if (!app) {
    const config = require('./config');
    const { get } = require('./db');
    const { seed } = require('./db/seed');
    const { createApp } = require('./web/app');
    db = get();
    seed(db, { dataDir: config.dataDir });
    app = createApp(db);
  }
  return app;
}

function housekeeping() {
  const now = Date.now();
  if (!db || now - lastHousekeeping < 5 * 60 * 1000) return;
  lastHousekeeping = now;
  const reservations = require('./domain/reservations');
  const notifications = require('./domain/notifications');
  try { reservations.expireHolds(db); } catch (e) { console.error('expire holds', e); }
  notifications.dispatchPending(db).catch((e) => console.error('mail', e));
}

module.exports = function handler(req, res) {
  const a = getApp();
  housekeeping();
  return a(req, res);
};
