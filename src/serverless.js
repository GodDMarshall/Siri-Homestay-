'use strict';
// Runs the site as a serverless function (Vercel). The Express app is built once per instance
// and exported as it is. Vercel adds its own request helpers (res.send, res.redirect, a
// pre-parsed req.body …) to a plain function export, but leaves an app that has .listen()
// alone, so Express behaves exactly as it does on a normal server.
// Housekeeping that a long-running server does on a timer happens on requests instead.
const config = require('./config');
const { get } = require('./db');
const { seed } = require('./db/seed');
const { createApp } = require('./web/app');
const reservations = require('./domain/reservations');
const notifications = require('./domain/notifications');

const db = get();
seed(db, { dataDir: config.dataDir, temporaryStorage: config.temporaryStorage });

let lastHousekeeping = 0;
function housekeeping(req, res, next) {
  const now = Date.now();
  if (now - lastHousekeeping >= 5 * 60 * 1000) {
    lastHousekeeping = now;
    try { reservations.expireHolds(db); } catch (e) { console.error('expire holds', e); }
    notifications.dispatchPending(db).catch((e) => console.error('mail', e));
  }
  next();
}

module.exports = createApp(db, { before: [housekeeping] });
