'use strict';
const crypto = require('node:crypto');
const config = require('../config');

// ---- Passwords (scrypt, built into Node) ---------------------------------
const SCRYPT = { N: 16384, r: 8, p: 1, keylen: 64 };

function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const key = crypto.scryptSync(password, salt, SCRYPT.keylen, { N: SCRYPT.N, r: SCRYPT.r, p: SCRYPT.p });
  return `scrypt$${SCRYPT.N}$${SCRYPT.r}$${SCRYPT.p}$${salt.toString('base64')}$${key.toString('base64')}`;
}

function verifyPassword(password, stored) {
  try {
    const [alg, N, r, p, saltB64, keyB64] = String(stored).split('$');
    if (alg !== 'scrypt') return false;
    const key = Buffer.from(keyB64, 'base64');
    const test = crypto.scryptSync(password, Buffer.from(saltB64, 'base64'), key.length, { N: +N, r: +r, p: +p });
    return crypto.timingSafeEqual(key, test);
  } catch {
    return false;
  }
}

function passwordProblems(pw) {
  const problems = [];
  if (typeof pw !== 'string' || pw.length < 12) problems.push('Use at least 12 characters.');
  if (pw && pw.length > 200) problems.push('Use 200 characters or fewer.');
  return problems;
}

// ---- Tokens ----------------------------------------------------------------
const token = (bytes = 32) => crypto.randomBytes(bytes).toString('base64url');
const sha256 = (s) => crypto.createHash('sha256').update(String(s)).digest('hex');
const hmac = (s) => crypto.createHmac('sha256', config.appSecret).update(String(s)).digest('base64url');

function safeEqual(a, b) {
  const x = Buffer.from(String(a ?? '')), y = Buffer.from(String(b ?? ''));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

// Human-friendly booking reference, no ambiguous characters.
const REF_ALPHABET = 'ABCDEFGHJKMNPQRSTVWXYZ23456789';
function bookingRef() {
  const bytes = crypto.randomBytes(6);
  let s = '';
  for (const b of bytes) s += REF_ALPHABET[b % REF_ALPHABET.length];
  return `SH-${s}`;
}

// Signed timestamp embedded in public forms: rejects instant bot posts and stale replays.
function formStamp() {
  const t = Date.now().toString(36);
  return `${t}.${hmac('form:' + t)}`;
}
function checkFormStamp(stamp, { minMs = 2500, maxMs = 6 * 3600 * 1000 } = {}) {
  const [t, sig] = String(stamp || '').split('.');
  if (!t || !sig || !safeEqual(sig, hmac('form:' + t))) return 'invalid';
  const age = Date.now() - parseInt(t, 36);
  if (age < minMs) return 'too_fast';
  if (age > maxMs) return 'expired';
  return 'ok';
}

// ---- Rate limiting (in-memory, per process) -------------------------------
// Good for a single-instance homestay site. Swap for a shared store if scaled out.
const buckets = new Map();
function rateLimit({ key, limit, windowMs }) {
  const now = Date.now();
  let b = buckets.get(key);
  if (!b || now - b.start > windowMs) {
    b = { start: now, count: 0 };
    buckets.set(key, b);
  }
  b.count += 1;
  if (buckets.size > 50000) {
    for (const [k, v] of buckets) if (now - v.start > windowMs) buckets.delete(k);
  }
  return { allowed: b.count <= limit, retryAfterS: Math.ceil((b.start + windowMs - now) / 1000) };
}
function resetRateLimits() { buckets.clear(); }

const ipKey = (ip) => sha256(config.appSecret + '|' + (ip || '')).slice(0, 24);

module.exports = {
  hashPassword, verifyPassword, passwordProblems, token, sha256, hmac, safeEqual, bookingRef,
  formStamp, checkFormStamp, rateLimit, resetRateLimits, ipKey,
};
