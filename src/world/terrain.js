import * as THREE from 'three';
import { blobShape, shapeGround, worldUV, fbm, M } from './util.js';
import { LAYOUT } from './layout.js';
import { lawnWear, WEAR_N } from './materials.js';

// Distant ridges of the Western Ghats; close to the estate there is only forest.
export const HILLS = [
  { x: 300, z: -190, r: 210, h: 48, seed: 6 },
  { x: -340, z: -220, r: 240, h: 58, seed: 7 },
  { x: -60, z: -400, r: 250, h: 70, seed: 8 },
  { x: 370, z: 170, r: 230, h: 42, seed: 9 },
  { x: -260, z: 320, r: 250, h: 52, seed: 10 },
];

export function hillHeight(x, z) {
  let h = 0;
  for (const H of HILLS) {
    const d = Math.hypot(x - H.x, z - H.z) / H.r;
    if (d < 1) {
      const k = 1 - d * d;
      h = Math.max(h, H.h * k * k * (0.8 + 0.4 * fbm(x * 0.012 + H.seed, z * 0.012, { octaves: 3 })));
    }
  }
  return h;
}

function hillMesh(H, mat) {
  const seg = 48;
  const g = new THREE.PlaneGeometry(H.r * 2, H.r * 2, seg, seg);
  g.rotateX(-Math.PI / 2);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i) + H.x, z = p.getZ(i) + H.z;
    const d = Math.hypot(x - H.x, z - H.z) / H.r;
    let y = -2;
    if (d < 1) { const k = 1 - d * d; y = H.h * k * k * (0.8 + 0.4 * fbm(x * 0.012 + H.seed, z * 0.012, { octaves: 3 })) - 0.5; }
    p.setY(i, y);
  }
  g.translate(H.x, 0, H.z);
  g.computeVertexNormals();
  worldUV(g, 30);
  const m = new THREE.Mesh(g, mat);
  m.receiveShadow = false;
  m.matrixAutoUpdate = false;
  m.name = 'hills';
  return m;
}

const inPoly = (x, z, poly) => {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, zi] = poly[i], [xj, zj] = poly[j];
    if ((zi > z) !== (zj > z) && x < ((xj - xi) * (z - zi)) / (zj - zi) + xi) inside = !inside;
  }
  return inside;
};
export const onLawn = (x, z) => inPoly(x, z, LAYOUT.lawn) || inPoly(x, z, LAYOUT.eastLawn);
export const onCourtyard = (x, z) => inPoly(x, z, LAYOUT.courtyard);

export function pondRing(extra = 0, n = 16) {
  const P = LAYOUT.pond;
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2, k = 1 + (fbm(Math.cos(a) * 2 + 3, Math.sin(a) * 2, { octaves: 2 }) - 0.5) * 0.36;
    return [P.x + Math.cos(a) * (P.r + extra) * k, P.z + Math.sin(a) * (P.r + extra) * k * 0.85];
  });
}

// Worn ground on the lawn: [x, z, radius, strength]
function wearSpots() {
  const L = LAYOUT, w = [];
  for (const p of L.pads) w.push([p.x, p.z, 3.6, 0.85]);
  for (const f of L.firewood) { w.push([f.x + 0.8, f.z, 3.2, 1]); w.push([f.ring[0], f.ring[1], 1.8, 1]); }
  w.push([L.net.x, L.net.z - 2.5, 3.6, 0.5], [L.net.x, L.net.z + 2.5, 3.6, 0.5]);
  for (const s of L.stones) w.push([s[0], s[1], 2.0, 0.55]);
  // bare, leaf-strewn ground under the bamboo along the villa side of the lawn
  for (let z = -18; z <= 24; z += 4.2) w.push([-29.5, z, 3.4, 0.95]);
  w.push([-24, 9.5, 3.5, 0.75], [-22, 3, 2.6, 0.6], [-25.5, 12.5, 3, 0.7]);
  w.push([L.treeTable.x, L.treeTable.z, 1.5, 0.6], [L.crossTable.x, L.crossTable.z, 2.2, 0.7]);
  return w.slice(0, WEAR_N);
}

export function buildTerrain(scene, B, mats) {
  // estate floor: soil and leaf litter wherever nothing else covers it
  const ground = worldUV(new THREE.PlaneGeometry(900, 900, 1, 1).rotateX(-Math.PI / 2), 2.5);
  B.add(ground, mats.soil, null, { cast: false });
  // lawns (drawn over the soil; see the ground layers in materials.js)
  B.add(shapeGround(blobShape(LAYOUT.lawn, 160), 0, 2.5), mats.grass, null, { cast: false });
  B.add(shapeGround(blobShape(LAYOUT.eastLawn, 90), 0, 2.5), mats.grass, null, { cast: false });
  // grass also runs round the pond
  const P = LAYOUT.pond;
  const meadow = [[P.x - 34, P.z - 30], [P.x + 8, P.z - 32], [P.x + 36, P.z - 18], [P.x + 34, P.z + 22], [P.x - 4, P.z + 32], [P.x - 38, P.z + 16]];
  B.add(shapeGround(blobShape(meadow, 120), 0, 2.5), mats.grass, null, { cast: false });
  // pond: muddy margin, then still water
  B.add(shapeGround(blobShape(pondRing(1.8), 140), 0, 2.5), mats.mud, null, { cast: false });
  B.add(shapeGround(blobShape(pondRing(0), 140), 0, 4), mats.pond, null, { cast: false });
  // paved courtyard with a concrete kerb
  const shape = new THREE.Shape(LAYOUT.courtyard.map(([x, z]) => new THREE.Vector2(x, -z)));
  B.add(shapeGround(shape, 0, 2), mats.pavers, null, { cast: false });
  const cz = LAYOUT.courtyard;
  for (let i = 0; i < cz.length; i++) {
    const [x0, z0] = cz[i], [x1, z1] = cz[(i + 1) % cz.length];
    const len = Math.hypot(x1 - x0, z1 - z0), a = Math.atan2(x1 - x0, z1 - z0);
    B.add(worldUV(new THREE.BoxGeometry(0.16, 0.08, len), 2), mats.concrete, M((x0 + x1) / 2, 0.04, (z0 + z1) / 2, a), { cast: false });
  }
  // wear on the lawn
  wearSpots().forEach((s, i) => lawnWear.value[i].set(...s));
  // ridges on the horizon
  for (const H of HILLS) scene.add(hillMesh(H, mats.forest));
}
