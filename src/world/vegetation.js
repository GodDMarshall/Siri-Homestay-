// Golden bamboo, forest trees with layered crowns, the broad-leaved courtyard tree, shrubs and
// thickets along the lawn, reeds, spider plants and lawn grass. All instanced: a few draw calls
// for many thousands of plants.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { rng, M, instanced } from './util.js';
import { LAYOUT, VILLA, villaToWorld } from './layout.js';
import { hillHeight, onLawn, onCourtyard, pondRing } from './terrain.js';
import { VIEWS, PATHS } from './views.js';

// Crossed quads using one cell of a 2x2 atlas. hang: the card hangs below its anchor.
function cardGeometry(cell, { w = 1, h = 1, hang = false, planes = 2 } = {}) {
  const u0 = (cell % 2) * 0.5, v0 = cell < 2 ? 0.5 : 0;
  const parts = [];
  for (let k = 0; k < planes; k++) {
    const g = new THREE.PlaneGeometry(w, h);
    g.translate(0, hang ? -h / 2 : 0, 0);
    if (k === 2) g.rotateX(-Math.PI / 2); else g.rotateY((k * Math.PI) / 2);
    const uv = g.attributes.uv;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, u0 + uv.getX(i) * 0.5, v0 + uv.getY(i) * 0.5);
    parts.push(g);
  }
  const g = mergeGeometries(parts);
  // soft, rounded normals so foliage lights like a volume, not like flat cards
  const p = g.attributes.position, n = g.attributes.normal;
  for (let i = 0; i < p.count; i++) {
    const v = new THREE.Vector3(p.getX(i) * 0.6, 1.0 + p.getY(i) * 0.15, p.getZ(i) * 0.6).normalize();
    n.setXYZ(i, v.x, v.y, v.z);
  }
  return g;
}

// Every camera position used by the site, so plants never grow through the lens.
function cameraPoints() {
  const pts = [];
  for (const v of Object.values(VIEWS)) pts.push(new THREE.Vector3(...v.pos));
  for (const path of Object.values(PATHS)) {
    const c = new THREE.CatmullRomCurve3(path.map((p) => new THREE.Vector3(...p[0])), false, 'centripetal');
    const n = Math.ceil(c.getLength() / 0.6);
    for (let i = 0; i <= n; i++) pts.push(c.getPointAt(i / n));
  }
  return pts;
}

// Is a point inside one of the buildings? (Foliage must not poke through walls or roofs.)
const _inv = [...VILLA.garden, ...VILLA.cottage].map((v) => ({ v, cottage: !!VILLA.cottage.includes(v) }));
function insideBuilding(p) {
  for (const { v, cottage } of _inv) {
    const dx = p.x - v.x, dz = p.z - v.z, c = Math.cos(v.rot), s = Math.sin(v.rot);
    const lx = dx * c - dz * s, lz = dx * s + dz * c; // inverse of villaToWorld
    if (cottage ? (Math.abs(lx) < 6 && lz > -8.2 && lz < 1.2 && p.y < 6.2) : (Math.abs(lx) < 6.1 && lz > -6.9 && lz < 3.6 && p.y < 5.6)) return true;
  }
  return false;
}

function blocked(x, z, margin = 0) {
  if (onLawn(x, z) || onCourtyard(x, z)) return true;
  for (const v of VILLA.garden) if (Math.abs(x - (v.x - 3)) < 7.5 + margin && Math.abs(z - v.z) < 7 + margin) return true;
  for (const v of VILLA.cottage) {
    const c = villaToWorld(v, 0, 0, -3.6);
    if (Math.abs(x - c.x) < 7 + margin && Math.abs(z - c.z) < 7 + margin) return true;
  }
  const L = LAYOUT;
  if (Math.hypot(x - L.diningHall.x, z - L.diningHall.z) < 9 + margin) return true;
  for (const b of [L.kitchen, L.staff]) if (Math.hypot(x - b.x, z - (b.z - 2.5)) < 7 + margin) return true;
  if (Math.hypot(x - L.pond.x, (z - L.pond.z) / 0.85) < L.pond.r + 6) return true;
  return false;
}

export function buildVegetation(scene, mats, Q) {
  const r = rng(2026);
  const dens = Q.density;
  const out = new THREE.Group(); out.name = 'vegetation';
  const cams = cameraPoints();
  const camNear = (p, rad) => { for (const c of cams) if (c.distanceToSquared(p) < rad * rad) return true; return false; };
  const tmp = new THREE.Vector3();

  // ------------------------------------------------------------ golden bamboo
  const culmGeo = new THREE.CylinderGeometry(0.72, 1, 1, 7, 1, true).translate(0, 0.5, 0);
  const culms = [], bambooCards = [[], [], [], []];
  const up = new THREE.Vector3(0, 1, 0);
  for (const [cx, cz, rad, n, height] of LAYOUT.bamboo) {
    const count = Math.max(5, Math.round(n * Math.min(1, dens + 0.25)));
    for (let i = 0; i < count; i++) {
      const a = r() * Math.PI * 2, d = Math.sqrt(r()) * rad;
      const x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d;
      const h = height * (0.7 + r() * 0.45), rr = 0.03 + r() * 0.022;
      const lean = 0.03 + (d / rad) * 0.13 + r() * 0.05;
      const dir = new THREE.Vector3(Math.cos(a) * Math.sin(lean), Math.cos(lean), Math.sin(a) * Math.sin(lean)).normalize();
      let hitsCam = false; // keep culms out of camera positions
      for (let k = 0.05; k < 1; k += 0.1) if (camNear(tmp.set(x, 0, z).addScaledVector(dir, h * k), 0.3)) { hitsCam = true; break; }
      if (hitsCam || insideBuilding(tmp.set(x, 0, z).addScaledVector(dir, h * 0.5))) continue;
      const q = new THREE.Quaternion().setFromUnitVectors(up, dir);
      culms.push(new THREE.Matrix4().compose(new THREE.Vector3(x, 0, z), q, new THREE.Vector3(rr, h, rr)));
      // leaf sprays on short side branches, from a third of the way up
      const sprays = Math.round((9 + h * 2.0) * Math.min(1, dens + 0.15));
      for (let k = 0; k < sprays; k++) {
        const t = 0.36 + Math.pow(r(), 0.65) * 0.64;
        const p = new THREE.Vector3(x, 0, z).add(dir.clone().multiplyScalar(h * t));
        const ba = a + (r() - 0.5) * 2.8, bl = 0.12 + r() * 0.6 * t;
        p.x += Math.cos(ba) * bl; p.z += Math.sin(ba) * bl; p.y += 0.2;
        const s = 0.7 + r() * 0.5;
        if (camNear(tmp.copy(p).setY(p.y - 0.47 * s), 0.25 + 0.62 * s)) continue;
        if (insideBuilding(tmp) || insideBuilding(p)) continue;
        bambooCards[(r() * 4) | 0].push(M(p.x, p.y, p.z, r() * Math.PI * 2, (r() - 0.5) * 0.5, (r() - 0.5) * 0.5, s, s * (0.9 + r() * 0.4), s));
      }
    }
  }
  out.add(Object.assign(instanced(culmGeo, mats.culm, culms, { cast: true, receive: true }), { name: 'bamboo-culms' }));
  bambooCards.forEach((ms, cell) => {
    if (!ms.length) return;
    const m = instanced(cardGeometry(cell, { w: 0.78, h: 0.95, hang: true }), mats.bambooLeaf, ms, { cast: true, receive: true });
    m.customDepthMaterial = mats.bambooLeafDepth; m.name = 'bamboo-leaves';
    out.add(m);
  });

  // ------------------------------------------------------------ trees and undergrowth
  const trunkGeo = new THREE.CylinderGeometry(0.55, 1, 1, 7, 1, true).translate(0, 0.5, 0);
  const trunks = [];
  const crowns = [[], [], [], []], crownCol = [[], [], [], []];
  const shrubs = [[], [], [], []], shrubCol = [[], [], [], []];
  const tints = ['#ffffff', '#f2f7e6', '#e3ecd2', '#fff7e0', '#d8e4c8', '#eef0d6'].map((c) => new THREE.Color(c));
  const jitter = (c, k = 0.06) => c.clone().offsetHSL((r() - 0.5) * 0.02, (r() - 0.5) * k, (r() - 0.5) * k);

  function tree(x, z, y = 0, scale = 1, far = false) {
    const H = (9 + r() * 11) * scale;
    const trunkH = H * (0.4 + r() * 0.18);
    const R = (0.13 + r() * 0.13) * scale;
    const lx = (r() - 0.5) * 0.06, lz = (r() - 0.5) * 0.06;
    trunks.push(M(x, y - 0.3, z, r() * 6, lx, lz, R, trunkH + H * 0.18, R));
    const tint = tints[(r() * tints.length) | 0];
    const crownR = (2.0 + r() * 2.4) * scale;
    const clumps = far ? 2 + ((r() * 2) | 0) : 3 + ((r() * 4) | 0);
    const yellowish = r() < 0.18;
    for (let c = 0; c < clumps; c++) {
      const a = r() * Math.PI * 2, d = c === 0 ? 0 : (0.35 + r() * 0.6) * crownR * 0.75;
      const cy = y + trunkH + (H - trunkH) * (c === 0 ? 0.55 : 0.15 + r() * 0.75);
      const cr = crownR * (c === 0 ? 0.85 : 0.45 + r() * 0.35);
      const cx = x + Math.cos(a) * d + lz * cy, czz = z + Math.sin(a) * d - lx * cy;
      if (c > 0 && !far) { // a limb from the trunk out to the clump
        const bx = x + lz * trunkH, by = y + trunkH * (0.8 + r() * 0.2), bz = z - lx * trunkH;
        const dx = cx - bx, dy = cy - by, dz = czz - bz, L = Math.hypot(dx, dy, dz);
        trunks.push(M(bx, by, bz, Math.atan2(dx, dz), Math.acos(Math.max(-1, Math.min(1, dy / L))), 0, R * 0.45, L, R * 0.45));
      }
      const n = Math.max(3, Math.round((far ? 3 + cr : 5 + cr * 2.6) * Math.max(0.55, dens)));
      for (let k = 0; k < n; k++) {
        const u = r() * Math.PI * 2, v = Math.acos(2 * r() - 1), rr = Math.cbrt(r()) * cr;
        const s = (far ? 2.6 + r() * 1.6 : 1.5 + r() * 1.3) * scale;
        const cell = yellowish ? 3 : (r() * 3) | 0;
        crowns[cell].push(M(cx + rr * Math.sin(v) * Math.cos(u), cy + rr * Math.cos(v) * 0.62, czz + rr * Math.sin(v) * Math.sin(u), r() * 6, (r() - 0.5) * 0.9, (r() - 0.5) * 0.9, s));
        crownCol[cell].push(jitter(tint));
      }
    }
  }
  function shrub(x, z, rad, height, y = 0) {
    const n = Math.max(3, Math.round(rad * height * 3.2 * Math.max(0.5, dens)));
    const tint = tints[(r() * tints.length) | 0];
    for (let k = 0; k < n; k++) {
      const a = r() * Math.PI * 2, d = Math.sqrt(r()) * rad, s = 0.9 + r() * 1.0;
      const py = y + 0.3 + r() * height * 0.85;
      if (camNear(tmp.set(x + Math.cos(a) * d, py, z + Math.sin(a) * d), 0.5 + s * 0.5)) continue;
      const cell = (r() * 4) | 0;
      shrubs[cell].push(M(tmp.x, py, tmp.z, r() * 6, (r() - 0.5) * 0.5, (r() - 0.5) * 0.5, s));
      shrubCol[cell].push(jitter(tint, 0.1));
    }
  }

  // the forest around the estate: dense near, sparser and coarser far away
  const nearN = Math.round(330 * dens), farN = Math.round(420 * Math.max(0.5, dens));
  for (let i = 0; i < nearN + farN; i++) {
    const isFar = i >= nearN;
    const a = r() * Math.PI * 2, d = isFar ? 95 + Math.pow(r(), 0.7) * 160 : 44 + Math.pow(r(), 0.9) * 55;
    const x = 2 + Math.cos(a) * d, z = 4 + Math.sin(a) * d * 0.95;
    if (blocked(x, z, 2)) continue;
    const y = hillHeight(x, z);
    tree(x, z, y, isFar ? 1.15 : 1, isFar);
    if (!isFar && r() < 0.8) shrub(x + (r() - 0.5) * 4, z + (r() - 0.5) * 4, 1.5 + r() * 2, 1.5 + r() * 2.5, y);
  }
  // groves close behind the buildings
  for (const [gx, gz, n] of [[-46, -8, 7], [-47, 12, 7], [-45, 30, 6], [-4, -50, 8], [26, -46, 7], [58, -14, 7], [56, 10, 6], [-22, -48, 6], [-38, -34, 5], [8, 34, 4], [-30, 36, 5], [50, -32, 5], [44, 22, 5]]) {
    for (let i = 0; i < Math.round(n * Math.max(0.6, dens)); i++) {
      const x = gx + (r() - 0.5) * 14, z = gz + (r() - 0.5) * 14;
      if (blocked(x, z, 0.5)) continue;
      tree(x, z, hillHeight(x, z));
      if (r() < 0.6) shrub(x + (r() - 0.5) * 3, z + (r() - 0.5) * 3, 1.4 + r() * 1.6, 1.4 + r() * 2);
    }
  }
  // thickets along the lawn's edge: a continuous wall of green behind the open grass
  {
    const ring = new THREE.CatmullRomCurve3(LAYOUT.lawn.map(([x, z]) => new THREE.Vector3(x, 0, z)), true, 'centripetal');
    const n = Math.round(ring.getLength() / 2.6);
    const c = new THREE.Vector3(-2, 0, 2);
    for (let i = 0; i < n; i++) {
      const p = ring.getPointAt(i / n);
      const outward = p.clone().sub(c).setY(0).normalize();
      for (let k = 0; k < 2; k++) {
        const q = p.clone().addScaledVector(outward, 3 + r() * 7).add(new THREE.Vector3((r() - 0.5) * 2, 0, (r() - 0.5) * 2));
        if (blocked(q.x, q.z, 0.8)) continue;
        if (Math.abs(q.x - LAYOUT.pond.x) < 40 && q.z > 24) continue; // keep the view to the pond open
        shrub(q.x, q.z, 1.4 + r() * 1.8, 1.6 + r() * 2.8);
        if (r() < 0.35) tree(q.x + outward.x * 2.5, q.z + outward.z * 2.5, 0, 0.8 + r() * 0.3);
      }
    }
  }
  for (const [x0, z0, x1, z1] of LAYOUT.thickets) {
    const len = Math.hypot(x1 - x0, z1 - z0), n = Math.round(len / 2.2);
    for (let i = 0; i <= n; i++) {
      const t = i / n, x = x0 + (x1 - x0) * t + (r() - 0.5) * 2, z = z0 + (z1 - z0) * t + (r() - 0.5) * 2;
      shrub(x, z, 1.6 + r() * 1.6, 2.2 + r() * 2.6);
      if (r() < 0.5) tree(x + (r() - 0.5) * 3, z + (r() - 0.5) * 3, 0, 0.75 + r() * 0.35);
    }
  }
  for (const [x, z, rad] of LAYOUT.shrubs) shrub(x, z, rad, rad * 1.1);
  for (const v of VILLA.cottage) { const p = villaToWorld(v, 5.9, 0, -1.2); shrub(p.x, p.z, 1.1, 1.3); }

  out.add(Object.assign(instanced(trunkGeo, mats.bark, trunks, { cast: true, receive: false }), { name: 'trunks' }));
  crowns.forEach((ms, cell) => {
    if (!ms.length) return;
    const m = instanced(cardGeometry(cell, { planes: 3 }), mats.treeLeaf, ms, { cast: true, receive: true, colors: crownCol[cell] });
    m.customDepthMaterial = mats.treeLeafDepth; m.name = 'crowns';
    out.add(m);
  });
  shrubs.forEach((ms, cell) => {
    if (!ms.length) return;
    const m = instanced(cardGeometry(cell, { planes: 3 }), mats.shrub, ms, { cast: true, receive: true, colors: shrubCol[cell] });
    m.customDepthMaterial = mats.shrubDepth; m.name = 'shrubs';
    out.add(m);
  });

  // ------------------------------------------------------------ the broad-leaved tree by the courtyard
  {
    const { x, z } = LAYOUT.bigTree, bt = [], cards = [[], [], [], []];
    bt.push(M(x, 0, z, 0, 0.05, -0.04, 0.3, 6.8, 0.3));
    const tiers = [[3.3, 3.4], [4.6, 3.0], [5.8, 2.4], [6.9, 1.5]];
    for (const [y, rad] of tiers) {
      for (let k = 0; k < 4; k++) { const a = k * 1.6 + y; bt.push(M(x, y - 0.5, z, a, Math.PI / 2 - 0.25, 0, 0.06, rad * 0.9, 0.06)); }
      for (let k = 0; k < Math.round(rad * 11); k++) {
        const a = r() * Math.PI * 2, d = Math.sqrt(r()) * rad;
        cards[(r() * 4) | 0].push(M(x + Math.cos(a) * d, y + (r() - 0.3) * 0.55, z + Math.sin(a) * d, r() * 6, (r() - 0.5) * 0.3, 0, 1.5 + r() * 0.7, 0.8 + r() * 0.4, 1.5 + r() * 0.7));
      }
    }
    out.add(Object.assign(instanced(trunkGeo, mats.bark, bt), { name: 'big-tree' }));
    cards.forEach((ms, cell) => { if (ms.length) { const m = instanced(cardGeometry(cell, { planes: 3 }), mats.broadLeaf, ms); m.customDepthMaterial = mats.broadLeafDepth; m.name = 'big-tree-leaves'; out.add(m); } });
  }

  // ------------------------------------------------------------ reeds round the pond
  {
    const reeds = [];
    const ring = new THREE.CatmullRomCurve3(pondRing(0.3).map(([x, z]) => new THREE.Vector3(x, 0, z)), true);
    const reedGeo = new THREE.PlaneGeometry(0.05, 1.3).translate(0, 0.65, 0);
    for (let i = 0; i < Math.round(900 * dens); i++) {
      const p = ring.getPointAt(r());
      reeds.push(M(p.x + (r() - 0.5) * 1.6, 0, p.z + (r() - 0.5) * 1.6, r() * 6, (r() - 0.5) * 0.3, (r() - 0.5) * 0.3, 1, 0.5 + r() * 0.9, 1));
    }
    out.add(Object.assign(instanced(reedGeo, mats.reed, reeds, { cast: false }), { name: 'reeds' }));
  }

  // ------------------------------------------------------------ spider plants in pots
  {
    const leaves = [];
    for (const row of LAYOUT.potRows) {
      const [x0, z0] = row.from, [x1, z1] = row.to, len = Math.hypot(x1 - x0, z1 - z0), n = Math.floor(len / row.step);
      for (let i = 0; i <= n; i++) {
        const t = i / n, x = x0 + (x1 - x0) * t, z = z0 + (z1 - z0) * t;
        leaves.push(M(x, 0.22, z, r() * 6, 0, 0, 0.65 + r() * 0.2));
      }
    }
    const g = new THREE.PlaneGeometry(1, 0.7).translate(0, 0.35, 0);
    const g2 = g.clone().rotateY(Math.PI / 2), g3 = g.clone().rotateY(Math.PI / 4), g4 = g.clone().rotateY(-Math.PI / 4);
    const m = instanced(mergeGeometries([g, g2, g3, g4]), mats.spider, leaves, { cast: true });
    m.customDepthMaterial = mats.spiderDepth; m.name = 'spider-plants';
    out.add(m);
  }

  // ------------------------------------------------------------ grass blades close to the cameras
  if (Q.grass > 0) {
    const pts = [];
    for (let k = 0; k < 6; k++) {
      const a = (k / 6) * Math.PI * 2 + 0.4, ox = Math.cos(a) * 0.035, oz = Math.sin(a) * 0.035, lean = 0.03 + (k % 3) * 0.012;
      const h = 0.05 + (k % 3) * 0.018, wd = 0.0045;
      pts.push(ox - wd * Math.sin(a), 0, oz + wd * Math.cos(a), ox + wd * Math.sin(a), 0, oz - wd * Math.cos(a), ox + Math.cos(a) * lean, h, oz + Math.sin(a) * lean);
    }
    const blade = new THREE.BufferGeometry();
    blade.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    const nrm = new Float32Array(pts.length); for (let i = 1; i < nrm.length; i += 3) nrm[i] = 1;
    blade.setAttribute('normal', new THREE.BufferAttribute(nrm, 3));
    const patches = [];
    for (const v of Object.values(VIEWS)) {
      if (v.pos[1] > 3) continue;
      const p = new THREE.Vector3(...v.pos), t = new THREE.Vector3(...v.target);
      const f = t.clone().sub(p).setY(0).normalize();
      const c = p.clone().addScaledVector(f, 6);
      if (onLawn(c.x, c.z) || onLawn(p.x, p.z)) patches.push({ c, rad: 9 });
    }
    const tufts = [], cols = [];
    const greens = ['#93ad4c', '#86a345', '#a1b55a', '#b1bb66', '#7b9a40', '#bdbd72'].map((c) => new THREE.Color(c));
    const per = Math.floor(Q.grass / Math.max(1, patches.length));
    for (const { c, rad } of patches) {
      let placed = 0, tries = 0;
      while (placed < per && tries < per * 3) {
        tries++;
        const a = r() * Math.PI * 2, d = Math.sqrt(r()) * rad, x = c.x + Math.cos(a) * d, z = c.z + Math.sin(a) * d;
        if (!onLawn(x, z)) continue;
        tufts.push(M(x, 0, z, r() * 6, 0, 0, 0.55 + r() * 0.6));
        cols.push(greens[(r() * greens.length) | 0]);
        placed++;
      }
    }
    if (tufts.length) out.add(Object.assign(instanced(blade, mats.blade, tufts, { cast: false, receive: true, colors: cols }), { name: 'grass' }));
  }

  scene.add(out);
  return out;
}
