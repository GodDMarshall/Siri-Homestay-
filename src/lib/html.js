'use strict';
// Tagged-template HTML with escaping by default. Use raw() only for trusted markup.
const MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

class Raw {
  constructor(s) { this.s = s; }
  toString() { return this.s; }
}

const raw = (s) => new Raw(String(s ?? ''));

function esc(v) {
  if (v === null || v === undefined || v === false) return '';
  if (v instanceof Raw) return v.s;
  if (Array.isArray(v)) return v.map(esc).join('');
  return String(v).replace(/[&<>"']/g, (c) => MAP[c]);
}

function html(strings, ...vals) {
  let out = strings[0];
  for (let i = 0; i < vals.length; i++) out += esc(vals[i]) + strings[i + 1];
  return new Raw(out);
}

// JSON safe for embedding inside <script type="application/json|ld+json">.
function jsonForScript(obj) {
  return raw(JSON.stringify(obj).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029'));
}

module.exports = { html, raw, esc, Raw, jsonForScript };
