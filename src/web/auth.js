'use strict';
const config = require('../config');
const { token, sha256, safeEqual, verifyPassword, hashPassword, rateLimit, ipKey } = require('../lib/security');
const { nowIso } = require('../lib/dates');
const { audit } = require('../domain/core');

const COOKIE = 'sh_session';
const PRE = 'sh_pre'; // pre-login CSRF (double-submit)

function cookieOpts(maxAgeMs) {
  return { httpOnly: true, sameSite: 'lax', secure: config.isProd, path: '/', maxAge: maxAgeMs };
}

function loadSession(db) {
  return (req, res, next) => {
    const t = req.cookies && req.cookies[COOKIE];
    if (t) {
      const s = db.prepare(`SELECT s.*, u.email, u.name, u.must_change_password FROM sessions s JOIN admin_users u ON u.id = s.user_id
                            WHERE s.id = ? AND s.expires_at > ?`).get(sha256(t), nowIso());
      if (s) req.admin = { id: s.user_id, email: s.email, name: s.name, csrf: s.csrf_token, mustChange: !!s.must_change_password, sessionId: s.id };
    }
    next();
  };
}

function requireAdmin(req, res, next) {
  if (!req.admin) return res.redirect(303, '/admin/login?next=' + encodeURIComponent(req.originalUrl));
  if (req.admin.mustChange && !req.path.startsWith('/password') && req.path !== '/logout') {
    return res.redirect(303, '/admin/password');
  }
  res.set('Cache-Control', 'no-store');
  res.set('X-Robots-Tag', 'noindex, nofollow');
  next();
}

function requireCsrf(req, res, next) {
  if (req.method === 'GET' || req.method === 'HEAD') return next();
  const sent = req.body && req.body._csrf;
  if (!req.admin || !safeEqual(sent, req.admin.csrf)) {
    return res.status(403).send('This form expired. Go back, refresh the page and try again.');
  }
  next();
}

function preLoginToken(req, res) {
  let t = req.cookies && req.cookies[PRE];
  if (!t) {
    t = token(18);
    res.cookie(PRE, t, cookieOpts(2 * 3600e3));
  }
  return t;
}

function attemptLogin(db, req, res, { email, password, pre }) {
  const ip = ipKey(req.ip);
  if (!safeEqual(pre, req.cookies && req.cookies[PRE])) return { error: 'This form expired. Try again.' };
  const rl = rateLimit({ key: 'login:' + ip, limit: 10, windowMs: 15 * 60e3 });
  if (!rl.allowed) return { error: `Too many attempts. Try again in ${Math.ceil(rl.retryAfterS / 60)} minutes.` };
  const user = db.prepare('SELECT * FROM admin_users WHERE email = ?').get(String(email || '').trim());
  const fail = { error: 'That email and password don’t match.' };
  if (!user) { verifyPassword(password || '', hashPassword('timing-equaliser')); return fail; }
  if (user.locked_until && user.locked_until > nowIso()) return { error: 'This account is locked for 15 minutes after repeated failed sign-ins.' };
  if (!verifyPassword(password || '', user.password_hash)) {
    const attempts = user.failed_attempts + 1;
    const lock = attempts >= 8 ? new Date(Date.now() + 15 * 60e3).toISOString().replace(/\.\d{3}Z$/, 'Z') : null;
    db.prepare('UPDATE admin_users SET failed_attempts = ?, locked_until = ? WHERE id = ?').run(lock ? 0 : attempts, lock, user.id);
    audit(db, { actorType: 'admin', actorId: user.id, action: 'auth.failed', entityType: 'admin_user', entityId: user.id });
    return fail;
  }
  const t = token(32);
  const expires = new Date(Date.now() + config.sessionDays * 86400e3).toISOString().replace(/\.\d{3}Z$/, 'Z');
  db.prepare('INSERT INTO sessions (id, user_id, csrf_token, expires_at, user_agent) VALUES (?,?,?,?,?)')
    .run(sha256(t), user.id, token(24), expires, String(req.get('user-agent') || '').slice(0, 200));
  db.prepare('UPDATE admin_users SET failed_attempts = 0, locked_until = NULL, last_login_at = ? WHERE id = ?').run(nowIso(), user.id);
  db.prepare('DELETE FROM sessions WHERE expires_at < ?').run(nowIso());
  audit(db, { actorType: 'admin', actorId: user.id, action: 'auth.signed_in', entityType: 'admin_user', entityId: user.id });
  res.cookie(COOKIE, t, cookieOpts(config.sessionDays * 86400e3));
  res.clearCookie(PRE, { path: '/' });
  return { ok: true };
}

function logout(db, req, res) {
  if (req.admin) db.prepare('DELETE FROM sessions WHERE id = ?').run(req.admin.sessionId);
  res.clearCookie(COOKIE, { path: '/' });
}

module.exports = { loadSession, requireAdmin, requireCsrf, preLoginToken, attemptLogin, logout, COOKIE };
