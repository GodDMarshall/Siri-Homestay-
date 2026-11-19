'use strict';
const path = require('node:path');
const fs = require('node:fs');

// Minimal .env loader (no dependency). Existing environment variables win.
const envFile = path.join(__dirname, '..', '.env');
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m || line.trim().startsWith('#')) continue;
    let v = m[2];
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    if (process.env[m[1]] === undefined) process.env[m[1]] = v;
  }
}

const env = process.env;
// On Vercel the code is read-only and only /tmp can be written; the platform sits behind a proxy.
const onVercel = Boolean(env.VERCEL);
// Vercel deployments are always served over HTTPS, so they run as production.
const isProd = env.NODE_ENV === 'production' || onVercel;
// Whether what the site stores lasts. On Vercel the database sits in /tmp, which is wiped
// whenever the platform starts a fresh copy of the site, so nothing stored there can be
// relied on until a hosted database is connected. TEMPORARY_STORAGE=1 or 0 overrides this.
const flag = (v) => (v === undefined || v === '' ? null : v === '1' || v === 'true');
const temporaryStorage = flag(env.TEMPORARY_STORAGE) ?? onVercel;
const vercelUrl = env.VERCEL_ENV === 'production' && env.VERCEL_PROJECT_PRODUCTION_URL ? env.VERCEL_PROJECT_PRODUCTION_URL : env.VERCEL_URL;

function required(name, fallback) {
  const v = env[name] ?? fallback;
  if (v === undefined || v === '') throw new Error(`Missing required setting ${name}`);
  return v;
}

const config = {
  isProd,
  port: Number(env.PORT || 3000),
  host: env.HOST || '0.0.0.0',
  onVercel,
  temporaryStorage,
  siteUrl: (env.SITE_URL || (onVercel && vercelUrl ? `https://${vercelUrl}` : 'http://localhost:3000')).replace(/\/$/, ''),
  dataDir: path.resolve(env.DATA_DIR || (onVercel ? '/tmp/siri-homestay' : path.join(__dirname, '..', 'data'))),
  dbFile: null,
  // Used to sign form timestamps and hash IPs for rate limiting. Must be set in production.
  appSecret: isProd ? required('APP_SECRET') : (env.APP_SECRET || 'dev-only-secret-change-me'),
  trustProxy: env.TRUST_PROXY === '1' || env.TRUST_PROXY === 'true' || onVercel,
  sessionDays: Number(env.SESSION_DAYS || 7),
  smtp: {
    host: env.SMTP_HOST || '',
    port: Number(env.SMTP_PORT || 587),
    secure: env.SMTP_SECURE === '1' || env.SMTP_SECURE === 'true',
    user: env.SMTP_USER || '',
    pass: env.SMTP_PASS || '',
    from: env.MAIL_FROM || '',
  },
};
config.dbFile = path.join(config.dataDir, env.DB_FILE || 'siri-homestay.db');
config.smtp.enabled = Boolean(config.smtp.host && config.smtp.from);

module.exports = config;
