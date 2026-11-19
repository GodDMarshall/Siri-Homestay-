// Buildings, modelled on the photographs:
//  - garden villa: whitewashed walls, floor-to-ceiling glass with white aluminium frames, a sliding
//    door onto a concrete patio under a translucent steel pergola, a raised blue-lined pool against
//    the wall, a taupe side volume with a wall lamp, clay-tile hip roof; inside a bedroom with a
//    king-size bed and red throw, a single bed, wardrobe, dressing table, TV wall and an attached
//    bathroom with a vessel basin.
//  - cottage: hip-roofed, clay tiles, white walls, white-framed windows, polka-dot curtain.
//  - dining hall: open-sided pavilion on square pillars with yellow and white chairs.
import * as THREE from 'three';
import { M, mul, boxMM, worldUV, rng } from './util.js';
import * as O from './objects.js';
import { INTERIOR } from './layout.js';

// ---------------------------------------------------------------- roof
export function hipRoofGeometry(W, D, H, uvScale = 2) {
  const hw = W / 2, hd = D / 2, rl = Math.max(0.01, hw - hd);
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const A = V(-hw, 0, -hd), B = V(hw, 0, -hd), C = V(hw, 0, hd), Dv = V(-hw, 0, hd), R1 = V(-rl, H, 0), R2 = V(rl, H, 0);
  const pos = [], uv = [];
  function face(pts, eaveA, eaveB, apex) {
    const e = eaveB.clone().sub(eaveA).normalize();
    const mid = eaveA.clone().add(eaveB).multiplyScalar(0.5);
    const up = apex.clone().sub(mid); up.sub(e.clone().multiplyScalar(up.dot(e))).normalize();
    for (const p of pts) { pos.push(p.x, p.y, p.z); const d = p.clone().sub(eaveA); uv.push(d.dot(e) / uvScale, d.dot(up) / uvScale); }
  }
  face([Dv, C, R2, Dv, R2, R1], Dv, C, R1);       // front
  face([B, A, R1, B, R1, R2], B, A, R1);          // back
  face([C, B, R2], C, B, R2);                      // east hip
  face([A, Dv, R1], A, Dv, R1);                    // west hip
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.computeVertexNormals();
  return g;
}

function roof(B, mats, T, { W, D, H, cx = 0, cz = 0, y }) {
  B.add(hipRoofGeometry(W, D, H), mats.roof, mul(T, M(cx, y + 0.06, cz)));
  B.add(boxMM(-W / 2, y - 0.02, -D / 2, W / 2, y + 0.06, D / 2), mats.fascia, mul(T, M(cx, 0, cz)), { cast: false });
  for (const [x0, z0, x1, z1] of [[-W / 2, D / 2 - 0.04, W / 2, D / 2 + 0.02], [-W / 2, -D / 2 - 0.02, W / 2, -D / 2 + 0.04], [W / 2 - 0.04, -D / 2, W / 2 + 0.02, D / 2], [-W / 2 - 0.02, -D / 2, -W / 2 + 0.04, D / 2]]) {
    B.add(boxMM(x0, y - 0.18, z0, x1, y + 0.08, z1), mats.fascia, mul(T, M(cx, 0, cz)), { cast: false });
  }
}

// ---------------------------------------------------------------- glazing
function pane(B, mats, T, x0, y0, x1, y1, z, { fw = 0.05, depth = 0.07, mullions = [] } = {}) {
  const g = new THREE.PlaneGeometry(x1 - x0 - fw, y1 - y0 - fw);
  B.add(g, mats.glass, mul(T, M((x0 + x1) / 2, (y0 + y1) / 2, z)), { cast: false, receive: false });
  const f = (a, b, c, d) => B.add(boxMM(a, b, z - depth / 2, c, d, z + depth / 2), mats.frame, T, { cast: false });
  f(x0, y0, x1, y0 + fw); f(x0, y1 - fw, x1, y1); f(x0, y0, x0 + fw, y1); f(x1 - fw, y0, x1, y1);
  for (const mx of mullions) f(mx - fw / 2, y0, mx + fw / 2, y1);
}

// Wall with rectangular openings: draws the solid parts around each hole, per skin.
function wallX(B, mat, T, x0, x1, y0, y1, z0, z1, holes = [], uv = 2) {
  // wall runs along x; holes: [hx0, hx1, hy0, hy1]
  const xs = [x0, x1, ...holes.flatMap((h) => [h[0], h[1]])].sort((a, b) => a - b);
  for (let i = 0; i < xs.length - 1; i++) {
    const a = xs[i], b = xs[i + 1];
    if (b - a < 1e-3) continue;
    const mid = (a + b) / 2, h = holes.find((k) => mid > k[0] && mid < k[1]);
    if (!h) B.add(boxMM(a, y0, z0, b, y1, z1, uv), mat, T);
    else {
      if (h[2] > y0) B.add(boxMM(a, y0, z0, b, h[2], z1, uv), mat, T);
      if (h[3] < y1) B.add(boxMM(a, h[3], z0, b, y1, z1, uv), mat, T);
    }
  }
}
function wallZ(B, mat, T, z0, z1, y0, y1, x0, x1, holes = [], uv = 2) {
  const zs = [z0, z1, ...holes.flatMap((h) => [h[0], h[1]])].sort((a, b) => a - b);
  for (let i = 0; i < zs.length - 1; i++) {
    const a = zs[i], b = zs[i + 1];
    if (b - a < 1e-3) continue;
    const mid = (a + b) / 2, h = holes.find((k) => mid > k[0] && mid < k[1]);
    if (!h) B.add(boxMM(x0, y0, a, x1, y1, b, uv), mat, T);
    else {
      if (h[2] > y0) B.add(boxMM(x0, y0, a, x1, h[2], b, uv), mat, T);
      if (h[3] < y1) B.add(boxMM(x0, h[3], a, x1, y1, b, uv), mat, T);
    }
  }
}

// ---------------------------------------------------------------- garden villa
export function gardenVilla(B, mats, T, { interior = false, seed = 1 } = {}) {
  const fl = 0.3, top = 3.4, ceil = 3.25;
  const E = { x0: -5.2, x1: 5.2, z0: -6.0, z1: 0 };
  // plinth, floors, patio
  B.add(boxMM(-5.35, 0, -6.15, 5.35, fl, 0.02), mats.plinth, T, { cast: false });
  B.add(boxMM(-5.35, 0, 0.02, 5.35, 0.2, 3.25, 3), mats.concrete, T, { cast: false });
  B.add(boxMM(-3.1, fl - 0.02, INTERIOR.z0, INTERIOR.x1, fl + 0.012, INTERIOR.z1, 1.6), mats.floorTile, T, { cast: false });
  B.add(boxMM(INTERIOR.x0, fl - 0.02, INTERIOR.z0, -3.1, fl + 0.012, INTERIOR.z1, 0.6), mats.bathFloor, T, { cast: false });
  B.add(boxMM(INTERIOR.x0, ceil, INTERIOR.z0, INTERIOR.x1, ceil + 0.04, INTERIOR.z1), mats.ceiling, T, { cast: false });

  // --- front wall (z 0 .. -0.23): taupe volume | blue sill + fixed glass | doors | pillar | window
  wallX(B, mats.plasterTaupe, T, -5.2, -3.1, fl, top, -0.12, 0);
  B.add(boxMM(-3.1, fl, -0.12, -0.7, 0.9, 0), mats.poolBlue, T);
  B.add(boxMM(-3.1, 3.0, -0.12, 2.9, top, 0), mats.plaster, T);
  wallX(B, mats.plaster, T, 2.9, 5.2, fl, top, -0.12, 0, [[3.75, 4.85, 0.95, 2.65]]);
  // inner skin
  wallX(B, mats.bathWall, T, -4.97, -3.1, fl, top - 0.15, -0.23, -0.12, [], 1.2);
  B.add(boxMM(-3.1, fl, -0.23, -0.7, 0.9, -0.12), mats.wallInner, T);
  B.add(boxMM(-3.1, 3.0, -0.23, 2.9, ceil, -0.12), mats.wallInner, T);
  wallX(B, mats.wallInner, T, 2.9, 4.97, fl, ceil, -0.23, -0.12, [[3.75, 4.85, 0.95, 2.65]]);
  // glazing
  pane(B, mats, T, -3.1, 0.9, -0.7, 3.0, -0.1, { mullions: [-1.9] });
  pane(B, mats, T, -0.7, fl, 1.1, 2.75, -0.08);          // fixed half of the sliding door
  pane(B, mats, T, -0.7, 2.75, 2.9, 3.0, -0.1, { mullions: [1.1] });
  pane(B, mats, T, 3.75, 0.95, 4.85, 2.65, -0.1);
  B.add(boxMM(-0.75, fl - 0.02, -0.16, 2.95, fl + 0.02, 0.02), mats.alu, T, { cast: false }); // track

  // --- back wall with the back door and a small bathroom window
  wallX(B, mats.plaster, T, -5.2, 5.2, fl, top, -6.0, -5.88, [[2.0, 2.9, fl, 2.4], [-4.6, -3.6, 2.1, 2.7]]);
  wallX(B, mats.wallInner, T, -3.1, 4.97, fl, ceil, -5.88, -5.77, [[2.0, 2.9, fl, 2.4]]);
  wallX(B, mats.bathWall, T, -4.97, -3.1, fl, ceil, -5.88, -5.77, [[-4.6, -3.6, 2.1, 2.7]], 1.2);
  B.add(boxMM(2.0, fl, -5.95, 2.9, 2.4, -5.9), mats.doorWhite, T);
  pane(B, mats, T, -4.6, 2.1, -3.6, 2.7, -5.94);
  B.add(boxMM(1.7, 0, -6.95, 3.2, 0.15, -6.0, 2), mats.concrete, T);       // steps to the back door
  B.add(boxMM(1.8, 0.15, -6.55, 3.1, 0.3, -6.0, 2), mats.concrete, T);

  // --- side walls
  B.add(boxMM(-5.2, fl, -6.0, -5.08, top, 0, 2), mats.plaster, T);
  B.add(boxMM(-5.08, fl, -5.88, -4.97, ceil, -0.12, 1.2), mats.bathWall, T);
  B.add(boxMM(5.08, fl, -6.0, 5.2, top, 0, 2), mats.plaster, T);
  B.add(boxMM(4.97, fl, -5.88, 5.08, ceil, -0.12), mats.wallInner, T);
  // partition between bathroom and bedroom, with the bathroom door opening
  wallZ(B, mats.wallInner, T, -5.77, -0.23, fl, ceil, -3.04, -2.98, [[-5.3, -4.4, fl, 2.15]]);
  wallZ(B, mats.bathWall, T, -5.77, -0.23, fl, ceil, -3.1, -3.04, [[-5.3, -4.4, fl, 2.15]], 1.2);

  // --- roof, pergola, pool, lamp, patio furniture
  roof(B, mats, T, { W: 11.5, D: 7.1, H: 1.75, cz: -3.0, y: top });
  for (const x of [-5.15, -3.1, 5.15]) B.add(boxMM(x - 0.045, 0.2, 3.1, x + 0.045, 2.95, 3.19), mats.steel, T);
  B.add(boxMM(-5.25, 2.84, 3.08, 5.25, 2.96, 3.2), mats.steel, T);
  B.add(boxMM(-5.25, 2.84, 0.02, 5.25, 2.96, 0.12), mats.steel, T);
  for (let x = -5.15; x <= 5.2; x += 1.03) B.add(boxMM(x - 0.03, 2.96, 0.02, x + 0.03, 3.02, 3.2), mats.steel, T, { cast: false });
  B.add(new THREE.PlaneGeometry(10.5, 3.2).rotateX(-Math.PI / 2 + 0.03), mats.pergolaRoof, mul(T, M(0, 3.06, 1.6)), { cast: false, receive: false });
  // raised blue-lined pool against the wall
  const rim = (a, b, c, d) => B.add(boxMM(a, 0.2, b, c, 0.78, d, 2), mats.concrete, T);
  rim(-3.05, 0.02, -2.9, 2.75); rim(-0.95, 0.02, -0.8, 2.75); rim(-3.05, 2.6, -0.8, 2.75);
  B.add(boxMM(-2.9, 0.2, 0.02, -0.95, 0.24, 2.6), mats.poolBlue, T, { cast: false });
  B.add(boxMM(-2.9, 0.24, 2.58, -0.95, 0.7, 2.6), mats.poolBlue, T, { cast: false });
  B.add(boxMM(-2.92, 0.24, 0.02, -2.9, 0.7, 2.6), mats.poolBlue, T, { cast: false });
  B.add(boxMM(-0.95, 0.24, 0.02, -0.93, 0.7, 2.6), mats.poolBlue, T, { cast: false });
  B.add(new THREE.PlaneGeometry(1.95, 2.58).rotateX(-Math.PI / 2), mats.water, mul(T, M(-1.925, 0.69, 1.31)), { cast: false, receive: true });
  O.wallLamp(B, mats, mul(T, M(-4.1, 2.35, 0)));
  B.add(boxMM(1.55, 0.2, 0.12, 2.45, 0.218, 0.67), mats.doormat, T, { cast: false }); // welcome mat at the sliding door
  O.rootTable(B, mats, mul(T, M(0.55, 0.2, 1.3)), { height: 0.5, radius: 0.3 });
  O.rootChair(B, mats, mul(T, M(-0.35, 0.2, 1.25, 1.1)));
  O.rootChair(B, mats, mul(T, M(1.35, 0.2, 1.0, -0.9)));
  O.rootChair(B, mats, mul(T, M(1.55, 0.2, 1.95, -1.9)));

  // --- the sliding door panel (animated, so kept out of the batch)
  const door = new THREE.Group();
  const dB = new (B.constructor)();
  pane(dB, mats, M(), 1.1, fl, 2.9, 2.75, -0.03);
  dB.add(new THREE.BoxGeometry(0.03, 0.3, 0.04), mats.alu, M(1.2, 1.25, 0.0));
  door.add(dB.build('door'));
  door.matrixAutoUpdate = true;

  const anchors = {};
  const lights = [];
  if (interior) furnishInterior(B, mats, T, anchors, lights);
  else {
    // other villas: curtains drawn behind the glass
    for (const [x, w] of [[-1.9, 2.4], [1.1, 3.6], [4.3, 1.1]]) O.curtain(B, mats, mul(T, M(x, fl, -0.32)), { width: w, height: 2.65, folds: Math.round(w * 4) });
  }
  return { door, anchors, lights, doorTravel: 1.72 };
}

function furnishInterior(B, mats, T, anchors, lights) {
  const fl = 0.3;
  const L = (x, y, z, ry = 0) => mul(T, M(x, y, z, ry));
  O.kingBed(B, mats, L(4.97, fl, -2.0, -Math.PI / 2));
  O.singleBed(B, mats, L(4.97, fl, -4.55, -Math.PI / 2));
  O.wardrobe(B, mats, L(1.15, fl, -5.77));
  O.dressingTable(B, mats, L(-0.95, fl, -5.77));
  O.tvWall(B, mats, L(-2.98, fl, -2.6, Math.PI / 2));
  O.dayBed(B, mats, L(-1.55, fl, -1.37, Math.PI));
  O.rootTable(B, mats, L(-2.45, fl, -1.3), { height: 0.5, radius: 0.3 });
  O.curtain(B, mats, L(-2.75, fl, -0.33), { width: 0.55, height: 2.75, folds: 4 });
  O.curtain(B, mats, L(3.25, fl, -0.33), { width: 0.6, height: 2.75, folds: 4 });
  O.curtain(B, mats, L(4.55, fl, -0.33), { width: 0.75, height: 2.75, folds: 5 });
  O.rod(B, mats.rod, T, [-3.0, 3.08, -0.3], [2.9, 3.08, -0.3], 0.012, 6, { cast: false });
  O.tubeLight(B, mats, L(1.1, 3.0, -0.23, Math.PI));
  O.tubeLight(B, mats, L(1.4, 2.9, -5.77, 0));
  // bathroom door, standing open into the bedroom
  B.add(new THREE.BoxGeometry(0.88, 2.08, 0.04), mats.doorWhite, mul(T, M(-2.98 + 0.44 * Math.sin(1.1), fl + 1.04, -4.4 - 0.44 * Math.cos(1.1), Math.PI / 2 - 1.1)));
  // bathroom fittings on the outer side wall
  O.bathroomFittings(B, mats, L(-4.97, fl, -1.6, Math.PI / 2));

  const W = (x, y, z) => ({ local: [x, y, z] });
  Object.assign(anchors, {
    doorOutside: W(2.0, 1.6, 2.6), doorInside: W(2.0, 1.55, -1.1), door: W(2.0, 1.4, 0),
    bed: W(3.9, 0.75, -2.0), pillows: W(4.55, 0.9, -2.0), throw: W(2.9, 0.7, -2.0), singleBed: W(4.0, 0.7, -4.55),
    pool: W(-1.9, 0.75, 1.3), patio: W(0.6, 0.7, 1.4), dayBed: W(-1.55, 0.65, -1.37), sideTable: W(-2.45, 0.8, -1.3),
    tv: W(-2.95, 1.55, -2.6), dressing: W(-0.95, 1.4, -5.6), wardrobe: W(1.15, 1.3, -5.5), bathroomDoor: W(-3.05, 1.3, -4.85),
    basin: W(-4.72, 1.0, -1.6), wc: W(-4.7, 0.7, -2.85), glass: W(-1.9, 1.9, -0.1),
  });
  lights.push({ type: 'room', local: [1.0, 2.6, -2.8] });
}

// ---------------------------------------------------------------- cottage
export function cottage(B, mats, T, { seed = 1, dish = true } = {}) {
  const fl = 0.45, top = 3.45, W = 9.6, D = 7.2, hw = W / 2;
  B.add(boxMM(-hw - 0.1, 0, -D - 0.1, hw + 0.1, fl, 0.1), mats.plinth, T, { cast: false });
  B.add(boxMM(-hw, fl, -D, hw, 0.75, 0.005), mats.plinth, T); // weathered lower band
  wallX(B, mats.plaster, T, -hw, hw, 0.75, top, -0.2, 0, [[-3.6, -2.5, 1.25, 2.35], [-0.2, 1.9, 1.05, 2.55], [2.9, 3.85, 0.75, 2.55]]);
  wallX(B, mats.plaster, T, -hw, hw, 0.75, top, -D, -D + 0.2, [[-2.2, -1.1, 1.3, 2.3], [1.6, 2.7, 1.3, 2.3]]);
  wallZ(B, mats.plaster, T, -D, 0, 0.75, top, -hw, -hw + 0.2, [[-4.6, -3.4, 1.3, 2.3]]);
  wallZ(B, mats.plaster, T, -D, 0, 0.75, top, hw - 0.2, hw, [[-3.8, -2.6, 1.3, 2.3]]);
  // dark interior behind glass
  B.add(boxMM(-hw + 0.2, fl, -D + 0.2, hw - 0.2, top - 0.1, -0.2), mats.black, T, { cast: false, receive: false });
  pane(B, mats, T, -3.6, 1.25, -2.5, 2.35, -0.06, { mullions: [-3.05] });
  for (let y = 1.4; y < 2.3; y += 0.18) B.add(boxMM(-3.58, y, -0.13, -2.52, y + 0.012, -0.11), mats.frame, T, { cast: false });
  pane(B, mats, T, -0.2, 1.05, 1.9, 2.55, -0.06, { mullions: [0.85] });
  O.curtain(B, mats, mul(T, M(0.85, 1.0, -0.15)), { width: 2.1, height: 1.55, folds: 8, mat: 'curtainPolka' });
  for (const [x0, x1] of [[-2.2, -1.1], [1.6, 2.7]]) pane(B, mats, T, x0, 1.3, x1, 2.3, -D + 0.06);
  B.add(boxMM(2.9, fl, -0.12, 3.85, 2.55, -0.06), mats.doorWhite, T);
  B.add(boxMM(2.7, 0, 0.1, 4.05, 0.3, 0.75, 2), mats.concrete, T);
  B.add(boxMM(2.7, 0.3, 0.1, 4.05, 0.45, 0.4, 2), mats.concrete, T);
  B.add(boxMM(2.6, 2.8, 0.0, 4.15, 2.86, 1.1), mats.steel, T);
  B.add(new THREE.PlaneGeometry(1.5, 1.1).rotateX(-Math.PI / 2), mats.pergolaRoof, mul(T, M(3.375, 2.88, 0.55)), { cast: false });
  O.wallLamp(B, mats, mul(T, M(2.5, 2.4, 0)));
  O.rod(B, mats.pipe, T, [-4.4, 0.4, 0.06], [-4.4, top - 0.1, 0.06], 0.04, 8);
  O.rod(B, mats.pipe, T, [4.2, 0.4, 0.06], [4.2, 1.6, 0.06], 0.03, 8);
  if (dish) O.satelliteDish(B, mats, mul(T, M(-hw - 0.05, 3.0, -1.6, -Math.PI / 2)));
  roof(B, mats, T, { W: W + 1.5, D: D + 1.5, H: 2.15, cz: -D / 2, y: top });
}

// ---------------------------------------------------------------- dining hall
export function diningHall(B, mats, T) {
  const W = 12, D = 8, fl = 0.45, hw = W / 2, hd = D / 2;
  B.add(boxMM(-hw, 0, -hd, hw, fl, hd, 3), mats.plinth, T, { cast: false });
  B.add(boxMM(-hw + 0.1, fl, -hd + 0.1, hw - 0.1, fl + 0.02, hd - 0.1, 1.6), mats.floorTile, T, { cast: false });
  const low = (x0, z0, x1, z1) => B.add(boxMM(x0, fl, z0, x1, fl + 0.55, z1), mats.plaster, T);
  low(-hw, -hd, hw, -hd + 0.2); low(-hw, -hd, -hw + 0.2, hd); low(hw - 0.2, -hd, hw, hd);
  low(-hw, hd - 0.2, -1.6, hd); low(1.6, hd - 0.2, hw, hd);
  for (const x of [-hw + 0.15, -2, 2, hw - 0.15]) for (const z of [-hd + 0.15, hd - 0.15]) B.add(boxMM(x - 0.16, fl, z - 0.16, x + 0.16, 3.3, z + 0.16), mats.plaster, T);
  for (const z of [-0.5]) for (const x of [-hw + 0.15, hw - 0.15]) B.add(boxMM(x - 0.16, fl, z - 0.16, x + 0.16, 3.3, z + 0.16), mats.plaster, T);
  B.add(boxMM(-hw, 3.1, -hd, hw, 3.35, hd), mats.plaster, T);
  B.add(boxMM(-hw + 0.3, 3.05, -hd + 0.3, hw - 0.3, 3.1, hd - 0.3), mats.ceiling, T, { cast: false });
  roof(B, mats, T, { W: W + 1.8, D: D + 1.8, H: 2.3, y: 3.35 });
  O.tubeLight(B, mats, mul(T, M(0, 3.0, -hd + 0.2)));
  const r = rng(17);
  for (const [tx, tz] of [[-3.2, -1.5], [1.2, -1.5], [-3.2, 1.6], [1.2, 1.6], [4.4, 0]]) {
    const TT = mul(T, M(tx, fl, tz));
    B.add(boxMM(-0.8, 0.72, -0.42, 0.8, 0.76, 0.42), mats.chairWhite, TT);
    for (const [lx, lz] of [[-0.72, -0.35], [0.72, -0.35], [-0.72, 0.35], [0.72, 0.35]]) B.add(boxMM(lx - 0.025, 0, lz - 0.025, lx + 0.025, 0.72, lz + 0.025), mats.chairWhite, TT);
    for (const [cx, cz, a] of [[-0.45, -0.75, 0], [0.45, -0.75, 0], [-0.45, 0.75, Math.PI], [0.45, 0.75, Math.PI]]) {
      O.plasticChair(B, mats, mul(TT, M(cx, 0, cz, a + (r() - 0.5) * 0.3)), { color: r() < 0.6 ? 'chairYellow' : 'chairWhite', metalLegs: false });
    }
  }
}

// ---------------------------------------------------------------- small blocks (kitchen, staff quarters)
export function smallBlock(B, mats, T, { W = 7, D = 5, door = true } = {}) {
  const hw = W / 2;
  B.add(boxMM(-hw - 0.1, 0, -D - 0.1, hw + 0.1, 0.35, 0.1), mats.plinth, T, { cast: false });
  wallX(B, mats.plaster, T, -hw, hw, 0.35, 3.1, -0.2, 0, door ? [[-0.5, 0.45, 0.35, 2.4], [1.4, 2.4, 1.2, 2.2]] : [[1.4, 2.4, 1.2, 2.2]]);
  B.add(boxMM(-hw, 0.35, -D, hw, 3.1, -D + 0.2), mats.plaster, T);
  B.add(boxMM(-hw, 0.35, -D, -hw + 0.2, 3.1, 0), mats.plaster, T);
  B.add(boxMM(hw - 0.2, 0.35, -D, hw, 3.1, 0), mats.plaster, T);
  B.add(boxMM(-hw + 0.2, 0.35, -D + 0.2, hw - 0.2, 3.0, -0.2), mats.black, T, { cast: false, receive: false });
  if (door) B.add(boxMM(-0.5, 0.35, -0.1, 0.45, 2.4, -0.04), mats.doorWhite, T);
  pane(B, mats, T, 1.4, 1.2, 2.4, 2.2, -0.06);
  roof(B, mats, T, { W: W + 1.2, D: D + 1.2, H: 1.7, cz: -D / 2, y: 3.1 });
}
