'use strict';
const config = require('./src/config');
const { get } = require('./src/db');
const { seed } = require('./src/db/seed');
const { createApp } = require('./src/web/app');
const reservations = require('./src/domain/reservations');
const notifications = require('./src/domain/notifications');

const db = get(); // opens and migrates
seed(db, { dataDir: config.dataDir, temporaryStorage: config.temporaryStorage }); // no-op once seeded

const app = createApp(db);
const server = app.listen(config.port, config.host, () => {
  console.log(`Siri Homestay running at ${config.siteUrl} (port ${config.port})`);
  if (config.temporaryStorage) console.log('Temporary storage: enquiries are handed to WhatsApp, not saved.');
  else if (!config.smtp.enabled) console.log('Email is not configured: enquiries are saved in the admin but not emailed.');
});

// Housekeeping: expire holds and retry email every 5 minutes.
const timer = setInterval(() => {
  try { reservations.expireHolds(db); } catch (e) { console.error('expire holds', e); }
  notifications.dispatchPending(db).catch((e) => console.error('mail', e));
}, 5 * 60 * 1000);
timer.unref();

function shutdown() {
  server.close(() => { db.close(); process.exit(0); });
  setTimeout(() => process.exit(0), 5000).unref();
}
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
