// Shared helpers for the procedural estate: seeded randomness, tileable noise,
// geometry batching (one draw call per material) and matrix shortcuts.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// ---------------------------------------------------------------- randomness
export function rng(seed = 1) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export const lerp = (a, b, t) => a + (b - a) * t;
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const smooth = (t) => t * t * (3 - 2 * t);

// Tileable value noise (period p) for painting textures.
function hash2(x, y, seed) {
  let h = (x * 374761393 + y * 668265263 + seed * 2147483647) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}
export function noise2(x, y, period = 1e9, seed = 0) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const w = (v) => ((v % period) + period) % period;
  const a = hash2(w(xi), w(yi), seed), b = hash2(w(xi + 1), w(yi), seed);
  const c = hash2(w(xi), w(yi + 1), seed), d = hash2(w(xi + 1), w(yi + 1), seed);
  const u = smooth(xf), v = smooth(yf);
  return lerp(lerp(a, b, u), lerp(c, d, u), v);
}
export function fbm(x, y, { octaves = 4, period = 1e9, seed = 0, gain = 0.5 } = {}) {
  let amp = 0.5, freq = 1, sum = 0, norm = 0;
  for (let i = 0; i < octaves; i++) {
    sum += amp * noise2(x * freq, y * freq, period * freq, seed + i * 17);
    norm += amp; amp *= gain; freq *= 2;
  }
  return sum / norm;
}

// ---------------------------------------------------------------- matrices
const _q = new THREE.Quaternion(), _e = new THREE.Euler(), _p = new THREE.Vector3(), _s = new THREE.Vector3();
export function M(x = 0, y = 0, z = 0, ry = 0, rx = 0, rz = 0, sx = 1, sy = sx, sz = sx) {
  _e.set(rx, ry, rz, 'YXZ');
  _q.setFromEuler(_e);
  return new THREE.Matrix4().compose(_p.set(x, y, z), _q, _s.set(sx, sy, sz));
}
export const mul = (a, b) => new THREE.Matrix4().multiplyMatrices(a, b);

// ---------------------------------------------------------------- geometry
// Planar UVs in metres, chosen per face by its dominant normal, so textures keep
// real-world scale whatever the size of the box.
export function worldUV(geo, scale = 1, offset = [0, 0]) {
  const pos = geo.attributes.position, nor = geo.attributes.normal;
  const uv = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    const nx = Math.abs(nor.getX(i)), ny = Math.abs(nor.getY(i)), nz = Math.abs(nor.getZ(i));
    let u, v;
    if (ny >= nx && ny >= nz) { u = x; v = z; } else if (nx >= nz) { u = z; v = y; } else { u = x; v = y; }
    uv[i * 2] = u / scale + offset[0]; uv[i * 2 + 1] = v / scale + offset[1];
  }
  geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  return geo;
}

// Box from min/max corners, with metre-scaled UVs.
export function boxMM(x0, y0, z0, x1, y1, z1, uvScale = 1) {
  const g = new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0);
  g.translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
  return worldUV(g, uvScale);
}

// Collects static geometry and merges it into one mesh per material + shadow mode.
export class Batch {
  constructor() { this.parts = new Map(); }
  add(geo, mat, matrix = null, { cast = true, receive = true } = {}) {
    let g = geo.index ? geo.clone() : geo.clone();
    if (matrix) g.applyMatrix4(matrix);
    for (const name of Object.keys(g.attributes)) if (!['position', 'normal', 'uv'].includes(name)) g.deleteAttribute(name);
    if (!g.attributes.normal) g.computeVertexNormals();
    if (!g.attributes.uv) g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
    if (!g.index) {
      const n = g.attributes.position.count;
      const idx = new (n > 65535 ? Uint32Array : Uint16Array)(n);
      for (let i = 0; i < n; i++) idx[i] = i;
      g.setIndex(new THREE.BufferAttribute(idx, 1));
    }
    g.morphAttributes = {};
    g.clearGroups();
    const key = `${mat.uuid}|${cast ? 1 : 0}${receive ? 1 : 0}`;
    if (!this.parts.has(key)) this.parts.set(key, { mat, cast, receive, geos: [] });
    this.parts.get(key).geos.push(g);
  }
  build(name = 'batch') {
    const group = new THREE.Group();
    group.name = name;
    for (const { mat, cast, receive, geos } of this.parts.values()) {
      // Merge in chunks so no single buffer gets unwieldy.
      for (let i = 0; i < geos.length; i += 400) {
        const merged = mergeGeometries(geos.slice(i, i + 400), false);
        if (!merged) continue;
        merged.computeBoundingSphere();
        const mesh = new THREE.Mesh(merged, mat);
        mesh.castShadow = cast; mesh.receiveShadow = receive;
        mesh.matrixAutoUpdate = false;
        group.add(mesh);
      }
    }
    this.parts.clear();
    return group;
  }
}

// Instanced mesh from a list of matrices.
export function instanced(geo, mat, matrices, { cast = true, receive = true, colors = null } = {}) {
  const mesh = new THREE.InstancedMesh(geo, mat, matrices.length);
  matrices.forEach((m, i) => mesh.setMatrixAt(i, m));
  if (colors) colors.forEach((c, i) => mesh.setColorAt(i, c));
  mesh.instanceMatrix.needsUpdate = true;
  mesh.castShadow = cast; mesh.receiveShadow = receive;
  mesh.computeBoundingSphere();
  mesh.frustumCulled = true;
  return mesh;
}

// A smooth closed outline (Catmull-Rom through points) as a Shape.
export function blobShape(points, segments = 120) {
  const curve = new THREE.CatmullRomCurve3(points.map(([x, z]) => new THREE.Vector3(x, 0, z)), true, 'centripetal');
  const pts = curve.getSpacedPoints(segments).map((p) => new THREE.Vector2(p.x, -p.z));
  return new THREE.Shape(pts);
}

// Flat ground mesh from a shape, lying in XZ, UVs in metres / scale.
export function shapeGround(shape, y = 0, uvScale = 1, curveSegments = 24) {
  const g = new THREE.ShapeGeometry(shape, curveSegments);
  g.rotateX(-Math.PI / 2);
  g.translate(0, y, 0);
  const pos = g.attributes.position, uv = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) { uv[i * 2] = pos.getX(i) / uvScale; uv[i * 2 + 1] = pos.getZ(i) / uvScale; }
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  return g;
}

export function canvas(w, h) {
  if (typeof OffscreenCanvas !== 'undefined') {
    try { const c = new OffscreenCanvas(w, h); if (c.getContext('2d')) return c; } catch (e) { /* fall through */ }
  }
  const c = document.createElement('canvas'); c.width = w; c.height = h; return c;
}
