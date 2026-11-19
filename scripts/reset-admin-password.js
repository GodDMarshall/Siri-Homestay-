'use strict';
// Usage: npm run admin:reset-password -- owner@example.com
// Prints a new temporary password; the owner must change it at next sign-in.
const { get } = require('../src/db');
const { hashPassword, token } = require('../src/lib/security');
const email = process.argv[2];
if (!email) { console.error('Usage: npm run admin:reset-password -- <email>'); process.exit(1); }
const db = get();
const pw = token(12);
const existing = db.prepare('SELECT id FROM admin_users WHERE email = ?').get(email);
if (existing) {
  db.prepare('UPDATE admin_users SET password_hash = ?, must_change_password = 1, failed_attempts = 0, locked_until = NULL WHERE id = ?').run(hashPassword(pw), existing.id);
  db.prepare('DELETE FROM sessions WHERE user_id = ?').run(existing.id);
  console.log(`Password reset for ${email}. Temporary password: ${pw}`);
} else {
  db.prepare('INSERT INTO admin_users (email, name, password_hash, must_change_password) VALUES (?,?,?,1)').run(email, 'Owner', hashPassword(pw));
  console.log(`Created admin ${email}. Temporary password: ${pw}`);
}
