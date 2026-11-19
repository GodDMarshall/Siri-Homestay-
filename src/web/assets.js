'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { html, raw } = require('../lib/html');

const PUBLIC = path.join(__dirname, '..', '..', 'public');
const manifest = JSON.parse(fs.readFileSync(path.join(PUBLIC, 'media', 'manifest.json'), 'utf8'));

// Cache-busting for CSS/JS: ?v=<content hash>, computed once per process.
const versions = new Map();
function asset(p) {
  if (!versions.has(p)) {
    try {
      const h = crypto.createHash('sha1').update(fs.readFileSync(path.join(PUBLIC, p))).digest('hex').slice(0, 10);
      versions.set(p, `${p}?v=${h}`);
    } catch { versions.set(p, p); }
  }
  return versions.get(p);
}

// Every picture on the site is one of the owners' photographs (see scripts/build-photos.py).
const DIR = '/media/photos/';

function media(key) {
  return manifest.photos[key] || null;
}

function srcset(m) {
  return m.files.map((f) => `${DIR}${f.src} ${f.w}w`).join(', ');
}

function largest(m) {
  return `${DIR}${m.files[m.files.length - 1].src}`;
}

function src(key, maxW = 1600) {
  const m = media(key);
  if (!m) return '';
  const f = [...m.files].reverse().find((x) => x.w <= maxW) || m.files[0];
  return `${DIR}${f.src}`;
}

function ogImage(key) {
  const m = media(key);
  return m ? `${DIR}${m.jpg}` : null;
}

/**
 * <img> with responsive srcset, intrinsic size and a blurred placeholder.
 * pos: object-position, e.g. '30% 60%'.
 */
function img(key, { sizes = '100vw', cls = '', loading = 'lazy', alt = null, pos = null, fetchpriority = null, attrs = '' } = {}) {
  const m = media(key);
  if (!m) return '';
  const style = `background-image:url(${m.lqip});${pos ? `object-position:${pos};` : ''}`;
  return html`<img class="${cls}" src="${src(key, 1024)}" srcset="${srcset(m)}" sizes="${sizes}" width="${m.files[m.files.length - 1].w}" height="${m.files[m.files.length - 1].h}" alt="${alt ?? m.alt}" loading="${loading}" decoding="async" style="${style}"${fetchpriority ? raw(` fetchpriority="${fetchpriority}"`) : ''}${raw(attrs ? ' ' + attrs : '')}>`;
}

module.exports = { manifest, asset, media, img, src, srcset, largest, ogImage, PUBLIC };
