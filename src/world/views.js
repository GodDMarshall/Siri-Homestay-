// Camera set-ups. Each still on the site is rendered from one of these, framed to match the
// owner's photograph of the same spot. `local` views are in the walk-in villa's own coordinates.
import * as THREE from 'three';
import { heroVilla, villaToWorld } from './layout.js';

// [x, y, z] in villa-local metres -> world
const VL = (x, y, z) => villaToWorld(heroVilla(), x, y, z).toArray();

export const VIEWS = {
  // ---- lawn
  'lawn-stepping-stones': { pos: [-28.2, 1.55, 6.4], target: [0, 0.6, 0.5], fov: 55, preset: 'day', focus: 30 },
  'estate-lawn-dining': { pos: [-27.8, 1.5, -1.2], target: [-5, 1.3, -16], fov: 55, preset: 'day', focus: 32 },
  'lawn-umbrellas': { pos: [-0.4, 1.45, -10.9], target: [3.7, 0.65, -16.1], fov: 60, preset: 'day', focus: 28 },
  'lawn-table-villa': { pos: [-16.2, 1.6, 13.4], target: [-27, 1.4, 17.8], fov: 55, preset: 'day', focus: 22 },
  'lawn-table-closeup': { pos: [-18.7, 1.3, 14.0], target: [-23.5, 0.5, 16.1], fov: 62, preset: 'day', focus: 18 },
  'bamboo-view-lawn': { pos: [-31.4, 1.45, 5.9], target: [-21, 1.0, 13.5], fov: 69, aspect: 0.75, preset: 'day', focus: 24 },
  // ---- the walk-in garden villa
  'villa-patio': { pos: VL(-0.2, 1.4, 7.6), target: VL(1.4, 1.65, 0), fov: 58, preset: 'day', focus: 14 },
  'patio-chairs': { pos: VL(1.75, 1.6, -0.3), target: VL(0.5, 0.25, 1.7), fov: 69, aspect: 0.75, preset: 'day', focus: 10, door: 1 },
  'doorway-bedroom': { pos: VL(1.9, 1.55, 1.1), target: VL(3.6, 0.85, -3.2), fov: 69, aspect: 0.75, preset: 'day', focus: 10, door: 1 },
  'villa-bedroom': { pos: VL(2.0, 1.45, -5.45), target: VL(2.6, 0.85, -0.3), fov: 66, preset: 'day', focus: 12, door: 0 },
  'villa-window-pool': { pos: VL(-2.55, 1.5, -2.65), target: VL(-2.0, 0.4, 1.2), fov: 62, preset: 'day', focus: 10 },
  'villa-pool': { pos: VL(-1.0, 1.55, 5.2), target: VL(-1.9, 1.05, -0.2), fov: 58, preset: 'day', focus: 12 },
  'room-beds': { pos: VL(2.15, 1.55, -1.0), target: VL(4.5, 0.7, -2.15), fov: 69, aspect: 0.75, preset: 'day', focus: 10, door: 0 },
  'room-pool-view': { pos: VL(-0.6, 1.5, -2.6), target: VL(-1.8, 0.75, 1.2), fov: 69, aspect: 0.75, preset: 'day', focus: 10, door: 0 },
  'bath-basin': { pos: VL(-3.45, 1.5, -3.75), target: VL(-4.9, 1.05, -1.55), fov: 69, aspect: 0.75, preset: 'day', focus: 8 },
  'bath-wc': { pos: VL(-3.4, 1.45, -0.75), target: VL(-4.8, 0.65, -2.9), fov: 69, aspect: 0.75, preset: 'day', focus: 8 },
  'walk-door': { pos: VL(1.4, 1.5, 3.4), target: VL(2.0, 0.7, 0), fov: 69, aspect: 0.75, preset: 'day', focus: 10, door: 1 },
  'walk-bed': { pos: VL(2.0, 1.55, -0.45), target: VL(3.9, 0.65, -2.1), fov: 69, aspect: 0.75, preset: 'day', focus: 10, door: 1 },
  // ---- the courtyard cottages
  'courtyard-villas': { pos: [16.0, 1.6, -12.5], target: [27, 1.6, -28], fov: 55, preset: 'overcast', focus: 30 },
  'courtyard-villa': { pos: [14.5, 1.6, -15.5], target: [22, 1.6, -31], fov: 55, preset: 'overcast', focus: 24 },
  'courtyard-garden': { pos: [41, 1.6, -4.5], target: [33, 1.6, -22], fov: 55, preset: 'overcast', focus: 24 },
  // ---- after dark
  'night-garden': { pos: [-20, 1.5, 21], target: [-6, 1.6, 6], fov: 55, preset: 'night', focus: 34 },
  'night-lawn': { pos: [-9, 1.5, 16], target: [14, 1.2, 3], fov: 55, preset: 'night', focus: 34 },
  'night-path': { pos: [13, 1.5, 25], target: [24, 3.6, 17], fov: 55, preset: 'night', focus: 24 },
  // ---- overviews (no photograph; used by the explorer and the arrival)
  'aerial': { pos: [-62, 46, 58], target: [2, 0, -2], fov: 40, preset: 'golden', focus: 60 },
  'arrival-start': { pos: [24, 7, 46], target: [-10, 2, 4], fov: 50, preset: 'golden', focus: 50 },
  'pond': { pos: [-2, 2.2, 31], target: [26, 0.6, 52], fov: 55, preset: 'golden', focus: 40 },
  'bed': { pos: VL(1.6, 1.45, -0.95), target: VL(3.95, 0.72, -2.0), fov: 55, preset: 'day', focus: 10, door: 1 },
};

// Paths are lists of [position, target] pairs; positions are interpolated with a
// centripetal Catmull-Rom spline, targets with the same parameter.
export const PATHS = {
  // From above the pond, down over the lawn and along the stepping stones to the villa door.
  arrival: [
    [[24, 9, 46], [-10, 2, 4]],
    [[8, 5, 26], [-18, 1.6, 6]],
    [[-8, 2.6, 12], [-26, 1.5, 4.5]],
    [[-21, 1.65, 6.2], VL(1.6, 1.6, 0)],
    [VL(1.95, 1.62, 4.2), VL(1.95, 1.5, 0)],
    [VL(2.0, 1.6, 2.4), VL(2.0, 1.5, -1)],
  ],
  // Through the opened door, into the room, to the bed.
  enter: [
    [VL(2.0, 1.6, 2.4), VL(2.0, 1.5, -1)],
    [VL(2.0, 1.58, 0.6), VL(2.3, 1.3, -3)],
    [VL(1.6, 1.45, -0.95), VL(3.95, 0.72, -2.0)],
  ],
  // A slow drift for the live hero.
  drift: [
    [[-28.2, 1.55, 6.4], [0, 0.6, 0.5]],
    [[-27.4, 1.65, 7.6], [0, 0.6, 2.5]],
  ],
};

export function viewCamera(key) {
  const v = VIEWS[key];
  if (!v) throw new Error('Unknown view ' + key);
  return {
    pos: new THREE.Vector3(...v.pos), target: new THREE.Vector3(...v.target),
    fov: v.fov || 55, preset: v.preset || 'day', focus: v.focus || 30, door: v.door, aspect: v.aspect || 4 / 3,
  };
}

export class Path {
  constructor(points) {
    this.pos = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p[0])), false, 'centripetal');
    this.tgt = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p[1])), false, 'centripetal');
  }
  at(t, pos = new THREE.Vector3(), tgt = new THREE.Vector3()) {
    const k = Math.min(1, Math.max(0, t));
    this.pos.getPointAt(k, pos); this.tgt.getPoint(k, tgt);
    return { pos, tgt };
  }
}
