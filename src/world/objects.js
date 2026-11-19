// Furniture and props, each modelled from the owner's photographs.
// Builders take a Batch, a base matrix T (local origin on the floor) and the material set.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { M, mul, boxMM, rng, worldUV } from './util.js';

const box = (w, h, d) => new THREE.BoxGeometry(w, h, d);
const cyl = (rt, rb, h, s = 12, open = false) => new THREE.CylinderGeometry(rt, rb, h, s, 1, open);
const rbox = (w, h, d, r = 0.02, s = 2) => new RoundedBoxGeometry(w, h, d, s, Math.min(r, w / 2.01, h / 2.01, d / 2.01));
const put = (B, geo, mat, T, local, opts) => B.add(geo, mat, local ? mul(T, local) : T, opts);

// Cylinder between two points.
export function rod(B, mat, T, a, b, r, seg = 8, opts) {
  const A = new THREE.Vector3(...a), Bv = new THREE.Vector3(...b);
  const len = A.distanceTo(Bv);
  const g = cyl(r, r, len, seg);
  const mid = A.clone().add(Bv).multiplyScalar(0.5);
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), Bv.clone().sub(A).normalize());
  const m = new THREE.Matrix4().compose(mid, q, new THREE.Vector3(1, 1, 1));
  B.add(g, mat, mul(T, m), opts);
}

// ---------------------------------------------------------------- seating
// Plastic tub armchair with aluminium legs (blue at the umbrella tables): one curved shell forms
// the back and both arms, with vent slots across the back and a rolled top edge.
function tubShell(R = 0.27, y0 = 0.47, back = 0.84, arm = 0.65, span = 3.7, seg = 28, rows = 5) {
  const pos = [], idx = [], uv = [];
  const edge = [];
  for (let i = 0; i <= seg; i++) {
    const th = -span / 2 + (span * i) / seg;
    const k = Math.cos((th / span) * Math.PI); // 1 at the back, 0 at the arm ends
    const top = arm + (back - arm) * k * k;
    for (let j = 0; j <= rows; j++) {
      const v = j / rows, rr = R * (1 + 0.14 * v), y = y0 + (top - y0) * v;
      pos.push(rr * Math.sin(th), y, -rr * Math.cos(th) + 0.03);
      uv.push(i / seg, v);
    }
    edge.push(new THREE.Vector3(R * 1.14 * Math.sin(th), top, -R * 1.14 * Math.cos(th) + 0.03));
  }
  for (let i = 0; i < seg; i++) for (let j = 0; j < rows; j++) {
    const a = i * (rows + 1) + j, b = a + rows + 1;
    idx.push(a, b, a + 1, b, b + 1, a + 1);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx); g.computeVertexNormals();
  const rim = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(edge), seg, 0.016, 6, false);
  return [g, rim];
}
let _tub = null;
export function plasticChair(B, mats, T, { color = 'chairBlue', metalLegs = true } = {}) {
  const P = mats[color], L = metalLegs ? mats.alu : mats[color];
  if (!_tub) _tub = tubShell();
  put(B, rbox(0.46, 0.045, 0.43, 0.02), P, T, M(0, 0.465, 0.02));
  put(B, _tub[0], P, T, null);
  put(B, _tub[1], P, T, null);
  // vent slots on the back
  for (let i = 0; i < 4; i++) put(B, box(0.15, 0.013, 0.01), mats.black, T, M(0, 0.6 + i * 0.04, -0.255, 0, -0.12));
  // legs
  for (const [x, z] of [[-0.2, -0.17], [0.2, -0.17], [-0.21, 0.2], [0.21, 0.2]]) {
    rod(B, L, T, [x * 1.1, 0.02, z * 1.12], [x, 0.45, z], 0.012, 8);
    put(B, cyl(0.017, 0.017, 0.03, 8), P, T, M(x * 1.1, 0.015, z * 1.12));
  }
}

// Rustic ladder-back chair made from branches (villa patios).
export function rootChair(B, mats, T) {
  const W = mats.rootWood, r = rng(7);
  const legs = [[-0.22, -0.2], [0.22, -0.2], [-0.22, 0.2], [0.22, 0.2]];
  for (const [x, z] of legs) rod(B, W, T, [x * 1.15, 0.02, z * 1.1], [x, 0.46, z], 0.042, 7);
  rod(B, W, T, [-0.32, 0.06, -0.12], [0.32, 0.06, 0.18], 0.05, 7);
  rod(B, W, T, [0.3, 0.06, -0.15], [-0.3, 0.06, 0.2], 0.05, 7);
  for (let i = 0; i < 3; i++) put(B, box(0.5, 0.045, 0.14), W, T, M(0, 0.48, -0.16 + i * 0.155, 0, 0, (r() - 0.5) * 0.05));
  for (const x of [-0.22, 0.22]) rod(B, W, T, [x, 0.46, -0.2], [x * 0.95, 1.12, -0.25], 0.04, 7);
  for (let i = 0; i < 3; i++) rod(B, W, T, [-0.23, 0.68 + i * 0.16, -0.22 - i * 0.01], [0.23, 0.68 + i * 0.16, -0.22 - i * 0.01], 0.03, 6);
  put(B, box(0.5, 0.05, 0.08), W, T, M(0, 1.12, -0.25));
}

export function rootTable(B, mats, T, { radius = 0.32, height = 0.52 } = {}) {
  const r = rng(11);
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2 + r();
    rod(B, mats.rootWood, T, [Math.cos(a) * 0.28, 0.02, Math.sin(a) * 0.28], [Math.cos(a + 1.2) * 0.06, height - 0.02, Math.sin(a + 1.2) * 0.06], 0.035, 6);
  }
  put(B, cyl(radius, radius, 0.015, 32), mats.glass, T, M(0, height, 0), { cast: false });
}

// ---------------------------------------------------------------- umbrella table set
function canopyGeometry(half = 2.0, apex = 3.15, edge = 2.5, n = 18) {
  const g = new THREE.PlaneGeometry(half * 2, half * 2, n, n);
  g.rotateX(-Math.PI / 2);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), z = p.getZ(i);
    const t = Math.max(Math.abs(x), Math.abs(z)) / half;            // pyramid
    const across = Math.min(Math.abs(x), Math.abs(z)) / half;        // distance from a rib line
    const sag = Math.sin(Math.min(1, across / Math.max(t, 1e-3)) * Math.PI) * 0.0; // keep faces taut
    p.setY(i, apex - (apex - edge) * Math.pow(t, 0.92) - sag - 0.06 * Math.sin(t * Math.PI));
  }
  g.computeVertexNormals();
  return g;
}

export function umbrellaSet(B, mats, T, { chairs = 6, seed = 1, pad = true, chairColor = 'chairBlue' } = {}) {
  const r = rng(seed);
  if (pad) {
    put(B, cyl(2.22, 2.3, 0.1, 48), mats.padConcrete, T, M(0, 0.05, 0), { cast: false });
    put(B, cyl(2.3, 2.42, 0.04, 48), mats.padConcrete, T, M(0, 0.02, 0), { cast: false });
  }
  const y0 = pad ? 0.1 : 0;
  const L = mul(T, M(0, y0, 0));
  // table: dark top on a black cross base
  put(B, cyl(0.56, 0.56, 0.03, 40), mats.tableTop, L, M(0, 0.745, 0));
  put(B, box(0.07, 0.68, 0.07), mats.black, L, M(0, 0.38, 0));
  for (const a of [Math.PI / 4, -Math.PI / 4]) {
    put(B, box(1.05, 0.06, 0.07), mats.black, L, M(0, 0.03, 0, a));
    put(B, box(0.62, 0.05, 0.05), mats.black, L, M(0, 0.7, 0, a));
    rod(B, mats.black, L, [Math.cos(a) * 0.48, 0.05, Math.sin(a) * 0.48], [0, 0.66, 0], 0.03, 6);
    rod(B, mats.black, L, [-Math.cos(a) * 0.48, 0.05, -Math.sin(a) * 0.48], [0, 0.66, 0], 0.03, 6);
  }
  // umbrella
  const apex = 3.2, edge = 2.5, half = 2.0;
  put(B, cyl(0.027, 0.03, apex + 0.1, 10), mats.pole, L, M(0, (apex + 0.1) / 2, 0));
  put(B, canopyGeometry(half, apex, edge), mats.umbrella, L, null, { cast: true, receive: true });
  for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { // valance flaps
    const g = box(dx ? 0.005 : half * 2, 0.16, dz ? 0.005 : half * 2);
    put(B, g, mats.umbrella, L, M(dx * half, edge - 0.08, dz * half));
  }
  for (let i = 0; i < 8; i++) { // ribs and stretchers under the canopy
    const a = (i / 8) * Math.PI * 2, k = i % 2 ? 1 : Math.SQRT2;
    const ex = Math.cos(a) * half * k * 0.97, ez = Math.sin(a) * half * k * 0.97;
    rod(B, mats.pole, L, [0, apex - 0.05, 0], [ex, edge + 0.02, ez], 0.012, 5);
    rod(B, mats.pole, L, [0, 2.15, 0], [ex * 0.45, edge + 0.32, ez * 0.45], 0.01, 5);
  }
  put(B, cyl(0.05, 0.06, 0.16, 10), mats.pole, L, M(0, apex + 0.08, 0));
  // chairs around, facing the table
  for (let i = 0; i < chairs; i++) {
    const a = (i / chairs) * Math.PI * 2 + (r() - 0.5) * 0.35 + seed;
    const d = 0.95 + r() * 0.25;
    const x = Math.cos(a) * d, z = Math.sin(a) * d;
    plasticChair(B, mats, mul(L, M(x, 0, z, Math.atan2(-x, -z) + Math.PI + (r() - 0.5) * 0.4)), { color: chairColor });
  }
}

// ---------------------------------------------------------------- beds & interior
export function kingBed(B, mats, T) {
  // origin: centre of the headboard at the wall; bed runs along +z
  put(B, box(2.25, 1.12, 0.07), mats.wenge, T, M(0, 0.56, 0.035));
  put(B, box(1.86, 0.26, 1.98), mats.wenge, T, M(0, 0.19, 1.08));
  put(B, box(1.7, 0.06, 1.8), mats.black, T, M(0, 0.03, 1.08), { cast: false });
  put(B, rbox(1.82, 0.26, 1.98, 0.06, 3), mats.linen, T, M(0, 0.45, 1.08));
  put(B, rbox(1.9, 0.05, 1.5, 0.025, 2), mats.linen, T, M(0, 0.6, 1.32));
  for (const [x, z, y] of [[-0.45, 0.3, 0.665], [0.45, 0.3, 0.665], [-0.43, 0.5, 0.69], [0.43, 0.5, 0.69]]) {
    put(B, rbox(0.7, 0.12, 0.44, 0.05, 3), mats.linen, T, M(x, y, z, 0, -0.22));
  }
  // red throw across the foot, draped over the end and the sides
  put(B, rbox(1.98, 0.02, 0.7, 0.008, 1), mats.throwRed, T, M(0.02, 0.633, 1.72, 0.03));
  put(B, rbox(1.94, 0.26, 0.02, 0.008, 1), mats.throwRed, T, M(0.02, 0.515, 2.075, 0.03, 0.06));
  for (const sd of [-1, 1]) put(B, rbox(0.02, 0.2, 0.68, 0.008, 1), mats.throwRed, T, M(sd * 0.99 + 0.02, 0.545, 1.72, 0.03, 0, sd * 0.07));
  for (const s of [-1, 1]) { // side tables
    put(B, box(0.45, 0.42, 0.42), mats.wenge, T, M(s * 1.38, 0.21, 0.26));
  }
}

export function singleBed(B, mats, T) {
  put(B, box(1.02, 0.95, 0.06), mats.wenge, T, M(0, 0.475, 0.03));
  put(B, box(0.96, 0.3, 1.98), mats.wenge, T, M(0, 0.15, 1.05));
  put(B, rbox(0.92, 0.2, 1.94, 0.05, 3), mats.linen, T, M(0, 0.4, 1.05));
  put(B, rbox(0.6, 0.13, 0.36, 0.06, 3), mats.linen, T, M(0, 0.56, 0.3));
  put(B, rbox(0.94, 0.07, 0.62, 0.03, 2), mats.blanket, T, M(0, 0.53, 1.62));
}

export function dayBed(B, mats, T) {
  for (const [x, z] of [[-0.42, -0.9], [0.42, -0.9], [-0.42, 0.9], [0.42, 0.9]]) put(B, cyl(0.035, 0.03, 0.42, 10), mats.rootWood, T, M(x, 0.21, z));
  put(B, box(0.96, 0.08, 1.96), mats.rootWood, T, M(0, 0.42, 0));
  put(B, rbox(0.9, 0.15, 1.9, 0.05, 3), mats.linen, T, M(0, 0.535, 0));
  put(B, rbox(0.5, 0.12, 0.34, 0.05, 3), mats.linen, T, M(0, 0.66, -0.7));
  put(B, rbox(0.7, 0.1, 0.45, 0.04, 2), mats.linen, T, M(0.05, 0.66, -0.25, 0.2));
}

export function wardrobe(B, mats, T) {
  put(B, box(1.2, 2.1, 0.58), mats.wenge, T, M(0, 1.05, 0.29));
  put(B, box(0.006, 2.0, 0.01), mats.black, T, M(0, 1.05, 0.585));
  for (const s of [-1, 1]) put(B, box(0.02, 0.2, 0.02), mats.alu, T, M(s * 0.05, 1.1, 0.6));
}

export function dressingTable(B, mats, T) {
  put(B, box(1.25, 0.045, 0.46), mats.wenge, T, M(0, 0.76, 0.23));
  put(B, box(0.04, 0.76, 0.44), mats.wenge, T, M(0.6, 0.38, 0.22));
  put(B, box(0.42, 0.3, 0.44), mats.wenge, T, M(-0.4, 0.6, 0.22));
  // mirror with the red and black frame
  put(B, box(0.62, 0.84, 0.01), mats.mirror, T, M(0.05, 1.42, 0.01));
  for (const [w, h, x, y] of [[0.74, 0.06, 0.05, 1.87], [0.74, 0.06, 0.05, 0.97], [0.06, 0.96, -0.31, 1.42], [0.06, 0.96, 0.41, 1.42]]) put(B, box(w, h, 0.02), mats.mirrorFrame, T, M(x, y, 0.015));
  plasticChair(B, mats, mul(T, M(0.05, 0, 0.78, Math.PI + 0.25)));
}

export function tvWall(B, mats, T) {
  put(B, box(1.4, 2.5, 0.05), mats.wenge, T, M(0, 1.25, 0.025));
  put(B, box(1.02, 0.6, 0.05), mats.tv, T, M(0, 1.25, 0.07));
  put(B, new THREE.PlaneGeometry(0.42, 0.105), mats.sign, T, M(0, 2.12, 0.052));
}

export function curtain(B, mats, T, { width = 1.0, height = 2.6, folds = 7, mat = 'curtain' } = {}) {
  const g = new THREE.PlaneGeometry(width, height, folds * 6, 2);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) p.setZ(i, Math.sin((p.getX(i) / width) * Math.PI * 2 * folds) * 0.045);
  g.computeVertexNormals();
  put(B, g, mats[mat], T, M(0, height / 2, 0));
}

export function tubeLight(B, mats, T) {
  put(B, box(1.22, 0.05, 0.05), mats.frame, T, M(0, 0, 0.03));
  put(B, cyl(0.016, 0.016, 1.15, 10), mats.tubeLight, T, M(0, -0.005, 0.06, 0, 0, Math.PI / 2), { cast: false });
}

export function bathroomFittings(B, mats, T) {
  // origin: inner face of the wall the basin hangs on
  put(B, box(0.95, 0.05, 0.5), mats.granite, T, M(0, 0.84, 0.25));
  put(B, box(0.05, 0.2, 0.45), mats.granite, T, M(0.4, 0.73, 0.23));
  const bowl = new THREE.LatheGeometry([0.02, 0.1, 0.17, 0.205, 0.215, 0.2].map((r, i) => new THREE.Vector2(r, i * 0.03)), 28);
  put(B, bowl, mats.porcelain, T, M(0, 0.865, 0.27));
  rod(B, mats.alu, T, [0.3, 0.865, 0.18], [0.3, 1.1, 0.18], 0.012);
  rod(B, mats.alu, T, [0.3, 1.1, 0.18], [0.18, 1.08, 0.24], 0.011);
  put(B, box(0.55, 0.75, 0.01), mats.mirror, T, M(0, 1.55, 0.006));
  // wall-hung WC further along the wall
  const W = mul(T, M(1.25, 0, 0));
  put(B, rbox(0.38, 0.3, 0.55, 0.12, 4), mats.porcelain, W, M(0, 0.48, 0.3));
  put(B, rbox(0.4, 0.04, 0.5, 0.02, 2), mats.porcelain, W, M(0, 0.64, 0.3));
  put(B, box(0.25, 0.17, 0.012), mats.black, W, M(0, 1.05, 0.008));
  put(B, new THREE.TorusGeometry(0.09, 0.01, 8, 24), mats.alu, T, M(-0.62, 1.35, 0.03));
}

// ---------------------------------------------------------------- props
export function volleyballNet(B, mats, T, { span = 9.4 } = {}) {
  for (const s of [-1, 1]) {
    put(B, cyl(0.04, 0.045, 2.6, 12), mats.pole, T, M(s * span / 2, 1.3, 0));
    rod(B, mats.branch, T, [s * span / 2, 2.4, 0], [s * (span / 2 + 1.4), 0, 0.6], 0.004, 4, { cast: false });
  }
  const netG = new THREE.PlaneGeometry(span - 0.1, 0.9);
  const uv = netG.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * (span / 0.9), uv.getY(i));
  put(B, netG, mats.net, T, M(0, 1.98, 0), { cast: true, receive: false });
  put(B, box(span - 0.1, 0.06, 0.012), mats.netBand, T, M(0, 2.43, 0));
  put(B, box(span - 0.1, 0.035, 0.012), mats.netBand, T, M(0, 1.53, 0));
}

// Thin rectangular sandstone slabs, laid across the direction of the path.
export function steppingStones(B, mats, points, { seed = 3 } = {}) {
  const r = rng(seed);
  const curve = new THREE.CatmullRomCurve3(points.map(([x, z]) => new THREE.Vector3(x, 0, z)));
  const n = Math.round(curve.getLength() / 1.05);
  for (let i = 0; i <= n; i++) {
    const p = curve.getPointAt(i / n), t = curve.getTangentAt(i / n);
    const a = Math.atan2(t.x, t.z) + Math.PI / 2 + (r() - 0.5) * 0.35;
    const g = worldUV(rbox(0.6 + r() * 0.12, 0.05, 0.34 + r() * 0.08, 0.012, 1), 0.6, [r(), r()]);
    B.add(g, mats.stone, M(p.x + (r() - 0.5) * 0.12, 0.012, p.z + (r() - 0.5) * 0.12, a), { cast: false });
  }
}

export function firewood(B, mats, T, { seed = 5, heap = true } = {}) {
  const r = rng(seed);
  for (let i = 0; i < 9; i++) { // logs
    const len = 0.8 + r() * 1.3, rad = 0.07 + r() * 0.08, a = (r() - 0.5) * 1.2;
    put(B, cyl(rad, rad * 1.05, len, 9), mats.log, T, M((r() - 0.5) * 1.2, rad + (i > 5 ? 0.15 : 0), (r() - 0.5) * 0.9, a, 0, Math.PI / 2));
  }
  if (!heap) return;
  // the dome of dry branches beside it
  const H = mul(T, M(1.6, 0, 0.3));
  for (let i = 0; i < 190; i++) { // a heaped dome of dry branches leaning in on each other
    const a = r() * Math.PI * 2, d = 0.25 + Math.sqrt(r()) * 1.05;
    const sx = Math.cos(a) * d, sz = Math.sin(a) * d;
    const inward = r() < 0.7;
    const ta = a + (r() - 0.5) * 1.2, td = inward ? r() * 0.5 : d + 0.3 + r() * 0.6;
    const ex = Math.cos(ta) * td, ez = Math.sin(ta) * td;
    const ey = inward ? 0.55 + r() * 0.65 : 0.1 + r() * 0.5;
    rod(B, mats.branch, H, [sx, 0.02 + r() * 0.1, sz], [ex, ey, ez], 0.006 + r() * 0.01, 3, { cast: true, receive: false });
  }
  for (let i = 0; i < 60; i++) { // twigs sticking out of the heap
    const a = r() * Math.PI * 2, d = r() * 0.8, y = 0.3 + r() * 0.8;
    const b = a + (r() - 0.5), l = 0.4 + r() * 0.7;
    rod(B, mats.branch, H, [Math.cos(a) * d, y, Math.sin(a) * d], [Math.cos(a) * d + Math.cos(b) * l, y + (r() - 0.3) * 0.5, Math.sin(a) * d + Math.sin(b) * l], 0.004, 3, { cast: false, receive: false });
  }
}

export function fireRing(B, mats, T) {
  put(B, new THREE.TorusGeometry(0.42, 0.06, 8, 28), mats.rim, T, M(0, 0.07, 0, 0, Math.PI / 2));
  put(B, cyl(0.6, 0.75, 0.04, 24), mats.ash, T, M(0, 0.01, 0), { cast: false });
}

export function floodlight(B, mats, T, { height = 7 } = {}) {
  put(B, cyl(0.06, 0.09, height, 10), mats.lampBody, T, M(0, height / 2, 0));
  put(B, box(0.5, 0.36, 0.14), mats.lampBody, T, M(0, height + 0.05, 0.12, 0, -0.45));
  put(B, box(0.44, 0.3, 0.02), mats.floodLens, T, M(0, height, 0.2, 0, -0.45), { cast: false });
}

export function gardenLamp(B, mats, T) {
  put(B, cyl(0.06, 0.07, 0.22, 10), mats.lampBody, T, M(0, 0.11, 0));
  put(B, cyl(0.05, 0.05, 0.02, 10), mats.warmLens, T, M(0, 0.225, 0), { cast: false });
}

export function wallLamp(B, mats, T) {
  put(B, box(0.1, 0.18, 0.08), mats.frame, T, M(0, 0, 0.04));
  put(B, box(0.07, 0.12, 0.01), mats.warmLens, T, M(0, 0, 0.085), { cast: false });
}

export function pot(B, mats, T, { r = 0.17, h = 0.26 } = {}) {
  put(B, cyl(r, r * 0.8, h, 14), mats.pot, T, M(0, h / 2, 0));
  put(B, cyl(r * 0.93, r * 0.93, 0.02, 14), mats.soil, T, M(0, h - 0.02, 0), { cast: false });
}

export function satelliteDish(B, mats, T) {
  const dish = new THREE.SphereGeometry(0.45, 20, 8, 0, Math.PI * 2, 0, 0.55);
  put(B, dish, mats.dish, T, M(0, 0, 0.3, 0, -Math.PI / 2 + 0.5));
  rod(B, mats.dish, T, [0, 0, 0], [0, 0, 0.3], 0.02);
  rod(B, mats.dish, T, [0, 0.05, 0.42], [0, 0.25, 0.75], 0.008);
}

// Dark round table on crossed legs, under the courtyard tree.
export function crossTable(B, mats, T) {
  put(B, cyl(0.52, 0.52, 0.04, 32), mats.tableTop, T, M(0, 0.74, 0));
  for (const s of [-1, 1]) {
    put(B, box(0.06, 1.0, 0.06), mats.black, T, M(0, 0.37, 0, 0, 0, s * 0.62));
    put(B, box(0.06, 1.0, 0.06), mats.black, T, M(0, 0.37, 0, Math.PI / 2, 0, s * 0.62));
  }
  put(B, box(0.9, 0.05, 0.05), mats.black, T, M(0, 0.03, 0));
  put(B, box(0.05, 0.05, 0.9), mats.black, T, M(0, 0.03, 0));
}

// Round concrete cover set into the grass.
export function manhole(B, mats, T) {
  put(B, cyl(0.66, 0.68, 0.03, 40), mats.concrete, T, M(0, 0.012, 0), { cast: false });
}
