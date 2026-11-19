// Every surface in the estate is painted here, in code, onto canvases.
// Colours were sampled by eye from the owner's photographs.
import * as THREE from 'three';
import { canvas, fbm, rng } from './util.js';

let ANISO = 8;
let SCALE = 1; // 0.5 on low-end devices: halves every texture's resolution
export function configureTextures({ anisotropy = 8, scale = 1 } = {}) { ANISO = anisotropy; SCALE = scale; }

const cache = new Map();
function memo(key, fn) { if (!cache.has(key)) cache.set(key, fn()); return cache.get(key); }
export function disposeTextures() { for (const t of cache.values()) t.dispose && t.dispose(); cache.clear(); }

function toTex(c, { srgb = true, wrap = true } = {}) {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  if (wrap) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = ANISO;
  t.generateMipmaps = true;
  t.minFilter = THREE.LinearMipmapLinearFilter;
  t.needsUpdate = true;
  return t;
}
const S = (n) => Math.max(32, Math.round(n * SCALE));
function hex(h) { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
function ramp(stops, t) {
  t = Math.min(1, Math.max(0, t));
  const f = t * (stops.length - 1), i = Math.min(stops.length - 2, Math.floor(f)), k = f - i;
  const a = stops[i], b = stops[i + 1];
  return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
}

// Low-res tileable noise mapped through a colour ramp, scaled up smoothly.
function noiseBase(ctx, size, colors, { period = 4, octaves = 4, seed = 1, contrast = 1.25, res = 128 } = {}) {
  const r = Math.min(res, size), c = canvas(r, r), x = c.getContext('2d');
  const img = x.createImageData(r, r), stops = colors.map(hex);
  for (let j = 0; j < r; j++) for (let i = 0; i < r; i++) {
    let n = fbm((i / r) * period, (j / r) * period, { octaves, period, seed });
    n = (n - 0.5) * contrast + 0.5;
    const [R, G, B] = ramp(stops, n), o = (j * r + i) * 4;
    img.data[o] = R; img.data[o + 1] = G; img.data[o + 2] = B; img.data[o + 3] = 255;
  }
  x.putImageData(img, 0, 0);
  ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
  // draw 3x3 so the upscale stays seamless at the edges
  for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) ctx.drawImage(c, a * size, b * size, size, size);
}

function wrapDraw(size, fn) { for (const dx of [-size, 0, size]) for (const dy of [-size, 0, size]) fn(dx, dy); }

function specks(ctx, size, n, colors, rnd, rMin = 0.5, rMax = 1.5, alpha = 0.6) {
  for (let i = 0; i < n; i++) {
    ctx.fillStyle = colors[(rnd() * colors.length) | 0];
    ctx.globalAlpha = alpha * (0.4 + rnd() * 0.6);
    const x = rnd() * size, y = rnd() * size, r = rMin + rnd() * (rMax - rMin);
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalAlpha = 1;
}

// ------------------------------------------------------------------ ground
export const grass = () => memo('grass', () => {
  const s = S(512), c = canvas(s, s), x = c.getContext('2d'), rnd = rng(11);
  noiseBase(x, s, ['#557A2B', '#688D35', '#7C9C3F', '#93AB4D'], { period: 5, seed: 3 });
  const greens = ['#5A8030', '#6A8F36', '#7A9C3F', '#8BA84A', '#9EB257', '#4D7228', '#AEB866'];
  x.lineCap = 'round';
  for (let i = 0; i < 16000 * SCALE * SCALE; i++) {
    const px = rnd() * s, py = rnd() * s, len = (2 + rnd() * 6) * SCALE + 1, a = -Math.PI / 2 + (rnd() - 0.5) * 1.3;
    x.strokeStyle = rnd() < 0.06 ? '#BDB878' : greens[(rnd() * greens.length) | 0];
    x.globalAlpha = 0.45 + rnd() * 0.5; x.lineWidth = 0.8 + rnd() * 0.9;
    wrapDraw(s, (dx, dy) => { if (px + dx < -10 || px + dx > s + 10 || py + dy < -10 || py + dy > s + 10) return; x.beginPath(); x.moveTo(px + dx, py + dy); x.lineTo(px + dx + Math.cos(a) * len, py + dy + Math.sin(a) * len); x.stroke(); });
  }
  x.globalAlpha = 1;
  return toTex(c);
});

export const soil = () => memo('soil', () => {
  const s = S(512), c = canvas(s, s), x = c.getContext('2d'), rnd = rng(21);
  noiseBase(x, s, ['#5A4331', '#6E523C', '#83674C', '#937A5E'], { period: 4, seed: 7 });
  specks(x, s, 2500 * SCALE, ['#3E2E22', '#4B3828', '#A08767'], rnd, 0.4, 1.4, 0.7);
  // fallen dry bamboo leaves
  const tans = ['#B49563', '#C5AC80', '#9E8257', '#D2BE95', '#8A7048'];
  for (let i = 0; i < 700 * SCALE; i++) {
    const px = rnd() * s, py = rnd() * s, l = (10 + rnd() * 16) * SCALE, w = (1.4 + rnd() * 1.6) * SCALE, a = rnd() * Math.PI;
    x.fillStyle = tans[(rnd() * tans.length) | 0]; x.globalAlpha = 0.75 + rnd() * 0.25;
    wrapDraw(s, (dx, dy) => { x.save(); x.translate(px + dx, py + dy); x.rotate(a); x.beginPath(); x.ellipse(0, 0, l, w, 0, 0, Math.PI * 2); x.fill(); x.restore(); });
  }
  x.globalAlpha = 1;
  return toTex(c);
});

export const concrete = () => memo('concrete', () => {
  const s = S(512), c = canvas(s, s), x = c.getContext('2d'), rnd = rng(31);
  noiseBase(x, s, ['#8F8B83', '#A5A199', '#B6B2AA', '#C3BFB6'], { period: 6, seed: 9, contrast: 1.1 });
  specks(x, s, 3000 * SCALE, ['#6F6B65', '#D2CEC6', '#85817A'], rnd, 0.3, 1.1, 0.5);
  for (let i = 0; i < 14; i++) { x.fillStyle = '#4F4B45'; x.globalAlpha = 0.05 + rnd() * 0.05; x.beginPath(); x.ellipse(rnd() * s, rnd() * s, 20 + rnd() * 70, 10 + rnd() * 40, rnd() * 3, 0, Math.PI * 2); x.fill(); }
  x.globalAlpha = 1;
  return toTex(c);
});

export const stone = () => memo('stone', () => {
  const s = S(256), c = canvas(s, s), x = c.getContext('2d'), rnd = rng(41);
  noiseBase(x, s, ['#7B7266', '#8E8475', '#A09684', '#B0A693'], { period: 3, seed: 13 });
  specks(x, s, 1400 * SCALE, ['#5E564C', '#C2B8A4', '#6F675B'], rnd, 0.3, 1.3, 0.6);
  return toTex(c);
});

// Interlocking "I" pavers of the courtyard, 2 m tile.
export const pavers = () => memo('pavers', () => {
  const s = S(1024), c = canvas(s, s), x = c.getContext('2d'), rnd = rng(51);
  x.fillStyle = '#5A5246'; x.fillRect(0, 0, s, s);
  const pxm = s / 2; // px per metre
  const L = 0.22 * pxm, W = 0.11 * pxm, gap = 0.008 * pxm;
  const cols = ['#9A9083', '#A69C8D', '#8E8578', '#B0A594', '#968C7E', '#A89E8F'];
  for (let row = 0, y = 0; y < s + W; row++, y += W + gap) {
    const off = (row % 2) * (L / 2);
    for (let xx = -L + off; xx < s + L; xx += L + gap) {
      x.fillStyle = cols[(rnd() * cols.length) | 0];
      x.beginPath();
      const n = W * 0.22;
      x.moveTo(xx, y); x.lineTo(xx + L * 0.38, y); x.quadraticCurveTo(xx + L / 2, y + n, xx + L * 0.62, y); x.lineTo(xx + L, y);
      x.lineTo(xx + L, y + W); x.lineTo(xx + L * 0.62, y + W); x.quadraticCurveTo(xx + L / 2, y + W - n, xx + L * 0.38, y + W); x.lineTo(xx, y + W);
      x.closePath(); x.fill();
    }
  }
  // grime, wear and moss in joints
  x.globalCompositeOperation = 'multiply';
  noiseBase(x, s, ['#9C9A92', '#D8D6CF', '#FFFFFF'], { period: 4, seed: 17, contrast: 1.4 });
  x.globalCompositeOperation = 'source-over';
  for (let i = 0; i < 1600 * SCALE; i++) { x.fillStyle = rnd() < 0.5 ? '#5F6E39' : '#6E7D44'; x.globalAlpha = 0.55; x.fillRect(rnd() * s, rnd() * s, 1 + rnd() * 3, 1 + rnd() * 2); }
  x.globalAlpha = 1;
  return toTex(c);
});

// ------------------------------------------------------------------ building
// Mangalore clay tiles, 2 m tile: rows of curved channels, weathered.
export const roofTiles = () => memo('roof', () => {
  const s = S(512), c = canvas(s, s), x = c.getContext('2d'), rnd = rng(61);
  x.fillStyle = '#3A1F17'; x.fillRect(0, 0, s, s);
  const rows = 7, rh = s / rows, cols = 8, cw = s / cols;
  const base = ['#94442B', '#87402A', '#7B3A27', '#A04B2F', '#6F3424'];
  for (let r = 0; r < rows; r++) for (let k = 0; k < cols; k++) {
    const x0 = k * cw + ((r % 2) * cw) / 2, y0 = r * rh;
    for (const dx of [-s, 0]) {
      const g = x.createLinearGradient(0, y0, 0, y0 + rh);
      const b = base[(rnd() * base.length) | 0];
      g.addColorStop(0, b); g.addColorStop(0.75, b); g.addColorStop(1, '#4A2219');
      x.fillStyle = g; x.fillRect(x0 + dx + 1, y0 + 1, cw - 2, rh - 2);
      // two raised channels per tile
      for (const t of [0.3, 0.7]) {
        const hg = x.createLinearGradient(x0 + dx + cw * (t - 0.12), 0, x0 + dx + cw * (t + 0.12), 0);
        hg.addColorStop(0, 'rgba(0,0,0,0.25)'); hg.addColorStop(0.5, 'rgba(255,190,150,0.18)'); hg.addColorStop(1, 'rgba(0,0,0,0.25)');
        x.fillStyle = hg; x.fillRect(x0 + dx + cw * (t - 0.12), y0 + 1, cw * 0.24, rh - 2);
      }
    }
  }
  x.globalCompositeOperation = 'multiply';
  noiseBase(x, s, ['#4C3A33', '#9A8578', '#E6DDD5', '#FFFFFF'], { period: 3, seed: 19, contrast: 1.6 });
  x.globalCompositeOperation = 'source-over';
  return toTex(c);
});

export const plaster = () => memo('plaster', () => {
  const s = S(256), c = canvas(s, s), x = c.getContext('2d'), rnd = rng(71);
  noiseBase(x, s, ['#D6D3CC', '#E2E0DA', '#ECEAE5'], { period: 4, seed: 23, contrast: 1.0 });
  specks(x, s, 600 * SCALE, ['#C9C5BE', '#F2F0EC'], rnd, 0.3, 0.9, 0.5);
  return toTex(c);
});

export const wenge = () => memo('wenge', () => {
  const s = S(512), c = canvas(s, s), x = c.getContext('2d'), rnd = rng(81);
  x.fillStyle = '#3B2B22'; x.fillRect(0, 0, s, s);
  for (let i = 0; i < 260; i++) {
    const y = rnd() * s, amp = 1 + rnd() * 3, f = 0.01 + rnd() * 0.02, ph = rnd() * 6;
    x.strokeStyle = rnd() < 0.5 ? '#2A1E18' : '#4A382D'; x.globalAlpha = 0.35 + rnd() * 0.4; x.lineWidth = 0.6 + rnd() * 1.8;
    x.beginPath();
    for (let px = 0; px <= s; px += 8) { const yy = y + Math.sin(px * f + ph) * amp; px ? x.lineTo(px, yy) : x.moveTo(px, yy); }
    x.stroke();
  }
  x.globalAlpha = 1;
  return toTex(c);
});

export const rootWood = () => memo('rootwood', () => {
  const s = S(256), c = canvas(s, s), x = c.getContext('2d'), rnd = rng(91);
  noiseBase(x, s, ['#4A3123', '#674632', '#7E5A40', '#946B4C'], { period: 3, seed: 29, contrast: 1.5 });
  for (let i = 0; i < 160; i++) { const px = rnd() * s; x.strokeStyle = rnd() < 0.6 ? '#3A271C' : '#A07A58'; x.globalAlpha = 0.4; x.lineWidth = 0.5 + rnd() * 1.5; x.beginPath(); x.moveTo(px, 0); x.bezierCurveTo(px + 6, s * 0.3, px - 6, s * 0.6, px + rnd() * 6, s); x.stroke(); }
  x.globalAlpha = 1;
  return toTex(c);
});

export const bark = () => memo('bark', () => {
  const s = S(256), c = canvas(s, s), x = c.getContext('2d'), rnd = rng(101);
  noiseBase(x, s, ['#6C6356', '#857B6C', '#9C9282', '#B0A796'], { period: 3, seed: 31 });
  for (let i = 0; i < 200; i++) { const px = rnd() * s; x.strokeStyle = rnd() < 0.6 ? '#544B40' : '#BDB4A4'; x.globalAlpha = 0.45; x.lineWidth = 0.5 + rnd() * 2; x.beginPath(); x.moveTo(px, 0); x.lineTo(px + (rnd() - 0.5) * 10, s); x.stroke(); }
  x.globalAlpha = 1;
  return toTex(c);
});

// One bamboo internode: golden culm with green stripes, node ring at the top.
export const culm = () => memo('culm', () => {
  const w = S(64), h = S(512), c = canvas(w, h), x = c.getContext('2d'), rnd = rng(111);
  const g = x.createLinearGradient(0, 0, w, 0);
  g.addColorStop(0, '#B38F2F'); g.addColorStop(0.35, '#E6C150'); g.addColorStop(0.55, '#EED062'); g.addColorStop(1, '#AE8A2C');
  x.fillStyle = g; x.fillRect(0, 0, w, h);
  for (let k = 0; k < 3; k++) {
    const cx = (0.15 + rnd() * 0.7) * w, sw = (1.5 + rnd() * 4) * SCALE;
    x.fillStyle = rnd() < 0.5 ? '#557F31' : '#6A8D3A'; x.globalAlpha = 0.85;
    x.beginPath(); x.moveTo(cx, 0);
    for (let y = 0; y <= h; y += 16) x.lineTo(cx + Math.sin(y * 0.02 + k) * 1.5, y);
    for (let y = h; y >= 0; y -= 16) x.lineTo(cx + sw + Math.sin(y * 0.02 + k) * 1.5, y);
    x.closePath(); x.fill();
  }
  x.globalAlpha = 1;
  // node: dark ring and a pale powdery band beneath it
  x.fillStyle = '#5E4C22'; x.fillRect(0, 0, w, 3 * SCALE + 1);
  x.fillStyle = '#F2E6B4'; x.globalAlpha = 0.7; x.fillRect(0, 3 * SCALE + 1, w, 5 * SCALE); x.globalAlpha = 1;
  x.fillStyle = '#7A6530'; x.globalAlpha = 0.5; x.fillRect(0, h - 3 * SCALE, w, 3 * SCALE); x.globalAlpha = 1;
  return toTex(c);
});

// ------------------------------------------------------------------ foliage (RGBA atlases, 2x2)
function leafAtlas(key, seed, painter) {
  return memo(key, () => {
    const s = S(512), c = canvas(s, s), x = c.getContext('2d'), rnd = rng(seed);
    x.clearRect(0, 0, s, s);
    for (let v = 0; v < 4; v++) { x.save(); x.translate((v % 2) * s / 2, ((v / 2) | 0) * s / 2); x.beginPath(); x.rect(1, 1, s / 2 - 2, s / 2 - 2); x.clip(); painter(x, s / 2, rnd, v); x.restore(); }
    const t = toTex(c, { wrap: false });
    t.premultiplyAlpha = false;
    return t;
  });
}

function lanceLeaf(x, len, wid, col, mid) {
  x.fillStyle = col;
  x.beginPath(); x.moveTo(0, 0);
  x.quadraticCurveTo(wid, len * 0.35, 0, len); x.quadraticCurveTo(-wid, len * 0.35, 0, 0); x.fill();
  x.strokeStyle = mid; x.lineWidth = Math.max(0.6, wid * 0.08); x.globalAlpha = 0.6;
  x.beginPath(); x.moveTo(0, 2); x.lineTo(0, len * 0.92); x.stroke(); x.globalAlpha = 1;
}

// Drooping sprays of narrow bamboo leaves on a twig.
export const bambooLeaves = () => leafAtlas('bambooLeaves', 121, (x, s, rnd) => {
  const greens = ['#3C6A28', '#4C7A31', '#2E5A21', '#5A8A3A', '#41702B'];
  x.strokeStyle = '#6E6A33'; x.lineWidth = 1.2;
  const twigs = 3 + ((rnd() * 2) | 0);
  for (let t = 0; t < twigs; t++) {
    const ox = s * (0.25 + rnd() * 0.5), oy = s * 0.06, ang = (rnd() - 0.5) * 1.2, tl = s * (0.45 + rnd() * 0.35);
    const ex = ox + Math.sin(ang) * tl, ey = oy + Math.cos(ang) * tl;
    x.beginPath(); x.moveTo(ox, oy); x.quadraticCurveTo(ox + Math.sin(ang) * tl * 0.5 + 6, oy + tl * 0.5, ex, ey); x.stroke();
    const n = 5 + ((rnd() * 5) | 0);
    for (let i = 0; i < n; i++) {
      const k = 0.25 + (i / n) * 0.75, px = ox + (ex - ox) * k, py = oy + (ey - oy) * k;
      x.save(); x.translate(px, py); x.rotate(ang + (rnd() < 0.5 ? -1 : 1) * (0.35 + rnd() * 0.6));
      lanceLeaf(x, s * (0.18 + rnd() * 0.16), s * (0.025 + rnd() * 0.02), greens[(rnd() * greens.length) | 0], '#8DB062');
      x.restore();
    }
  }
});

// Clusters of small oval leaves for the forest trees.
export const treeLeaves = () => leafAtlas('treeLeaves', 131, (x, s, rnd, v) => {
  const greens = v === 3 ? ['#5D7E36', '#6E8C3E', '#839A45', '#4E6E2F'] : ['#2F5426', '#3B652C', '#4B7633', '#28491F', '#577F3A'];
  for (let i = 0; i < 160; i++) {
    const a = rnd() * Math.PI * 2, r = Math.sqrt(rnd()) * s * 0.44, px = s / 2 + Math.cos(a) * r, py = s / 2 + Math.sin(a) * r * 0.8;
    x.fillStyle = greens[(rnd() * greens.length) | 0];
    x.save(); x.translate(px, py); x.rotate(rnd() * Math.PI * 2);
    x.beginPath(); x.ellipse(0, 0, s * (0.025 + rnd() * 0.03), s * (0.012 + rnd() * 0.012), 0, 0, Math.PI * 2); x.fill(); x.restore();
  }
});

// Broad leaves (the tree by the courtyard has large obovate leaves).
export const broadLeaves = () => leafAtlas('broadLeaves', 141, (x, s, rnd) => {
  const greens = ['#3F6E2C', '#4F7F35', '#5E8E3C', '#36602A', '#6B9A45'];
  for (let i = 0; i < 46; i++) {
    const a = rnd() * Math.PI * 2, r = Math.sqrt(rnd()) * s * 0.38, px = s / 2 + Math.cos(a) * r, py = s / 2 + Math.sin(a) * r * 0.7;
    x.save(); x.translate(px, py); x.rotate(a + Math.PI / 2 + (rnd() - 0.5));
    x.fillStyle = greens[(rnd() * greens.length) | 0];
    x.beginPath(); x.moveTo(0, 0); x.bezierCurveTo(s * 0.07, s * 0.05, s * 0.06, s * 0.15, 0, s * 0.17); x.bezierCurveTo(-s * 0.06, s * 0.15, -s * 0.07, s * 0.05, 0, 0); x.fill();
    x.strokeStyle = '#9CC06E'; x.globalAlpha = 0.45; x.lineWidth = 1; x.beginPath(); x.moveTo(0, 2); x.lineTo(0, s * 0.16); x.stroke(); x.globalAlpha = 1;
    x.restore();
  }
});

// Variegated spider plants in the pots.
export const spiderPlant = () => memo('spider', () => {
  const s = S(256), c = canvas(s, s), x = c.getContext('2d'), rnd = rng(151);
  x.clearRect(0, 0, s, s); x.lineCap = 'round';
  for (let i = 0; i < 42; i++) {
    const a = -Math.PI / 2 + (rnd() - 0.5) * 2.6, len = s * (0.35 + rnd() * 0.5);
    const ex = s / 2 + Math.cos(a) * len, ey = s + Math.sin(a) * len * 0.9;
    const cx = s / 2 + Math.cos(a) * len * 0.5, cy = s - len * 0.75;
    x.strokeStyle = rnd() < 0.5 ? '#5C8E3A' : '#4E7D30'; x.lineWidth = 3.2 * SCALE + 1;
    x.beginPath(); x.moveTo(s / 2, s); x.quadraticCurveTo(cx, cy, ex, ey); x.stroke();
    x.strokeStyle = '#E7E5C6'; x.lineWidth = 1.1 * SCALE + 0.4;
    x.beginPath(); x.moveTo(s / 2, s); x.quadraticCurveTo(cx, cy, ex, ey); x.stroke();
  }
  return toTex(c, { wrap: false });
});

// ------------------------------------------------------------------ textiles & details
export const fabric = () => memo('fabric', () => {
  const s = S(256), c = canvas(s, s), x = c.getContext('2d'), rnd = rng(161);
  noiseBase(x, s, ['#D6D0C1', '#E3DED1', '#EEEAE0'], { period: 4, seed: 37, contrast: 0.9 });
  for (let i = 0; i < s; i += 2) { x.fillStyle = 'rgba(0,0,0,0.035)'; x.fillRect(0, i, s, 1); x.fillRect(i, 0, 1, s); }
  return toTex(c);
});

export const net = () => memo('net', () => {
  const s = S(256), c = canvas(s, s), x = c.getContext('2d');
  x.clearRect(0, 0, s, s); x.strokeStyle = '#F4F4F2'; x.lineWidth = Math.max(1.5, 3 * SCALE);
  const step = s / 8;
  for (let i = 0; i <= s; i += step) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, s); x.stroke(); x.beginPath(); x.moveTo(0, i); x.lineTo(s, i); x.stroke(); }
  return toTex(c);
});

export const curtainBrown = () => memo('curtainBrown', () => {
  const s = S(256), c = canvas(s, s), x = c.getContext('2d'), rnd = rng(171);
  for (let i = 0; i < s; i++) { const k = 0.5 + 0.5 * Math.sin(i / s * Math.PI * 2 * 6); const v = 0.75 + 0.35 * k; x.fillStyle = `rgb(${92 * v | 0},${72 * v | 0},${54 * v | 0})`; x.fillRect(i, 0, 1, s); }
  for (let i = 0; i < 2600 * SCALE; i++) { x.fillStyle = rnd() < 0.5 ? 'rgba(40,28,18,0.25)' : 'rgba(160,130,100,0.18)'; x.fillRect(rnd() * s, rnd() * s, 1, 2 + rnd() * 4); }
  return toTex(c);
});

export const curtainPolka = () => memo('curtainPolka', () => {
  const s = S(256), c = canvas(s, s), x = c.getContext('2d'), rnd = rng(181);
  x.fillStyle = '#6A2332'; x.fillRect(0, 0, s, s);
  for (let j = 0; j < 10; j++) for (let i = 0; i < 10; i++) {
    x.fillStyle = rnd() < 0.3 ? '#E9C9CF' : '#F3EDE6';
    x.beginPath(); x.arc((i + (j % 2) * 0.5) * s / 10, (j + 0.5) * s / 10, s / 34, 0, Math.PI * 2); x.fill();
  }
  for (let i = 0; i < s; i++) { const k = 0.5 + 0.5 * Math.sin(i / s * Math.PI * 2 * 5); x.fillStyle = `rgba(0,0,0,${0.18 * k})`; x.fillRect(i, 0, 1, s); }
  return toTex(c);
});

export const floorTile = () => memo('floorTile', () => {
  const s = S(512), c = canvas(s, s), x = c.getContext('2d'); // 2 x 2 tiles of 0.8 m
  noiseBase(x, s, ['#E1E1DD', '#EAEAE7', '#F2F2EF'], { period: 3, seed: 41, contrast: 0.9 });
  x.fillStyle = '#CFCFC9';
  x.fillRect(0, 0, s, 2); x.fillRect(0, s / 2 - 1, s, 2); x.fillRect(0, 0, 2, s); x.fillRect(s / 2 - 1, 0, 2, s);
  return toTex(c);
});

export const bathWall = () => memo('bathWall', () => {
  const s = S(512), c = canvas(s, s), x = c.getContext('2d'), rnd = rng(191); // planks 0.6 x 0.15 m on 1.2 m tile
  const ph = s / 8, cols = ['#6D8A8D', '#7A9696', '#678284', '#83A09F'];
  for (let r = 0; r < 8; r++) for (let k = -1; k < 3; k++) {
    const xo = k * s / 2 + (r % 2) * s / 4;
    x.fillStyle = cols[(rnd() * cols.length) | 0]; x.fillRect(xo + 1, r * ph + 1, s / 2 - 2, ph - 2);
  }
  for (let i = 0; i < 900 * SCALE; i++) { x.strokeStyle = rnd() < 0.7 ? 'rgba(60,80,82,0.35)' : 'rgba(150,104,72,0.55)'; x.lineWidth = 0.7; const y = rnd() * s, px = rnd() * s; x.beginPath(); x.moveTo(px, y); x.lineTo(px + 8 + rnd() * 30, y + (rnd() - 0.5) * 2); x.stroke(); }
  return toTex(c);
});

export const bathFloor = () => memo('bathFloor', () => {
  const s = S(256), c = canvas(s, s), x = c.getContext('2d');
  noiseBase(x, s, ['#4C3A2D', '#5C4637', '#6C5442'], { period: 3, seed: 43 });
  x.fillStyle = '#3A2C22'; x.fillRect(0, 0, s, 2); x.fillRect(0, 0, 2, s);
  return toTex(c);
});

export const blanket = () => memo('blanket', () => {
  const s = S(256), c = canvas(s, s), x = c.getContext('2d');
  x.fillStyle = '#2B3343'; x.fillRect(0, 0, s, s);
  x.strokeStyle = '#3E4A5E'; x.lineWidth = 2;
  const r = s / 10;
  for (let j = -1; j < 12; j++) for (let i = -1; i < 8; i++) {
    const cx = i * r * 1.75 + (j % 2) * r * 0.87, cy = j * r * 1.5;
    x.beginPath(); for (let k = 0; k < 7; k++) { const a = Math.PI / 6 + k * Math.PI / 3; const px = cx + Math.cos(a) * r * 0.9, py = cy + Math.sin(a) * r * 0.9; k ? x.lineTo(px, py) : x.moveTo(px, py); } x.stroke();
  }
  return toTex(c);
});

export const mirrorFrame = () => memo('mirrorFrame', () => {
  const w = S(256), h = S(32), c = canvas(w, h), x = c.getContext('2d');
  x.fillStyle = '#B3202A'; x.fillRect(0, 0, w, h);
  x.fillStyle = '#121212'; for (let i = 0; i < w; i += w / 6) x.fillRect(i + w / 24, h * 0.22, w / 12, h * 0.56);
  return toTex(c);
});

export const sign = (text = 'NO SMOKING') => memo('sign:' + text, () => {
  const w = 256, h = 64, c = canvas(w, h), x = c.getContext('2d');
  x.fillStyle = '#F7F7F5'; x.fillRect(0, 0, w, h);
  x.fillStyle = '#C8102E'; x.font = 'bold 30px Arial, Helvetica, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.fillText(text, w / 2, h / 2 + 2);
  return toTex(c, { wrap: false });
});

// The red coir welcome mat at the villa door.
export const doormat = () => memo('doormat', () => {
  const w = S(512), h = Math.round(w * 0.6), c = canvas(w, h), x = c.getContext('2d'), rnd = rng(77);
  x.fillStyle = '#9b1f24'; x.fillRect(0, 0, w, h);
  for (let i = 0; i < 9000 * SCALE; i++) { x.fillStyle = rnd() < 0.5 ? '#7d171c' : '#b4343a'; x.globalAlpha = 0.5; x.fillRect(rnd() * w, rnd() * h, 1.5, 1.5); }
  x.globalAlpha = 1; x.strokeStyle = '#2a1414'; x.lineWidth = w * 0.03; x.strokeRect(w * 0.04, h * 0.07, w * 0.92, h * 0.86);
  x.fillStyle = '#211010'; x.font = `bold ${Math.round(h * 0.26)}px Georgia, serif`; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.fillText('WELCOME', w / 2, h / 2 + 2);
  return toTex(c, { wrap: false });
});

export const forest = () => memo('forest', () => {
  const s = S(512), c = canvas(s, s), x = c.getContext('2d'), rnd = rng(201);
  noiseBase(x, s, ['#1C3519', '#26431F', '#335427', '#41652F'], { period: 6, seed: 47, contrast: 1.3 });
  for (let i = 0; i < 2200 * SCALE; i++) {
    x.fillStyle = ['#2B4A22', '#3A5E2B', '#4D7234', '#1E3819', '#5B7E3B'][(rnd() * 5) | 0]; x.globalAlpha = 0.6;
    const px = rnd() * s, py = rnd() * s, r = 2 + rnd() * 7;
    wrapDraw(s, (dx, dy) => { x.beginPath(); x.arc(px + dx, py + dy, r, 0, Math.PI * 2); x.fill(); });
  }
  x.globalAlpha = 1;
  return toTex(c);
});

// Radial glow for light halos (lamps, floodlights).
export const glow = () => memo('glow', () => {
  const s = 128, c = canvas(s, s), x = c.getContext('2d');
  const g = x.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.15, 'rgba(255,255,255,0.75)');
  g.addColorStop(0.45, 'rgba(255,255,255,0.16)'); g.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = g; x.fillRect(0, 0, s, s);
  return toTex(c, { wrap: false });
});

// Low-frequency variation used to break up tiling over large areas.
export const macro = () => memo('macro', () => {
  const s = 256, c = canvas(s, s), x = c.getContext('2d');
  noiseBase(x, s, ['#7A7A7A', '#B5B5B5', '#FFFFFF'], { period: 4, seed: 53, octaves: 5, contrast: 1.3, res: 256 });
  return toTex(c, { srgb: false });
});

// Every generator, so the world can paint them one at a time between frames.
export const ALL = [grass, soil, concrete, stone, pavers, roofTiles, plaster, wenge, rootWood, bark, culm, bambooLeaves, treeLeaves, broadLeaves, spiderPlant, fabric, net, curtainBrown, curtainPolka, floorTile, bathWall, bathFloor, blanket, mirrorFrame, doormat, forest, glow, macro, () => sign()];
