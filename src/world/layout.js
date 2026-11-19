// The estate plan: one source of truth for where everything stands.
// Units are metres; +x is east, +z is south, y is up.
// Buildings, furniture and planting are modelled on the owner's photographs;
// their arrangement here is illustrative, since no site plan was supplied.
import * as THREE from 'three';

export const VILLA = {
  // Garden villas face east onto the lawn, behind screens of golden bamboo.
  garden: [
    { id: 'V1', x: -34, z: -13, rot: Math.PI / 2, interior: false },
    { id: 'V2', x: -34, z: 4, rot: Math.PI / 2, interior: true },   // the villa you can walk into
    { id: 'V3', x: -33, z: 21, rot: Math.PI / 2 + 0.06, interior: false },
  ],
  // Hip-roofed cottages around the paved courtyard.
  cottage: [
    { id: 'V4', x: 21, z: -30, rot: 0 },
    { id: 'V5', x: 46, z: -21, rot: -Math.PI / 2 },
  ],
};

export const LAYOUT = {
  lawn: [[-29, -19], [-12, -22], [6, -21], [16, -18], [24, -10], [27, 2], [25, 15], [14, 23], [-4, 25], [-20, 26], [-28.5, 20], [-29, 6], [-29.5, -8]],
  courtyard: [[12, -22], [14, -30.3], [29, -30.5], [32.4, -28], [32.4, -12], [27, -8], [20, -9], [14, -14]],
  // grass between the courtyard's row of potted plants and the second cottage
  eastLawn: [[32.6, -30], [45.5, -29.5], [45.7, -12], [44, 2], [33, 4], [32.6, -8]],
  diningHall: { x: -8, z: -30, rot: 0 },
  kitchen: { x: 5, z: -30, rot: 0 },
  staff: { x: -25, z: -37, rot: 0.1 },
  pond: { x: 22, z: 50, r: 21 },
  pads: [
    { id: 'P1', x: -20, z: -9, seed: 3 },
    { id: 'P2', x: 2, z: -15, seed: 5 },
    { id: 'P3', x: -22, z: 15.5, seed: 7 },
    { id: 'P4', x: 18, z: 11, seed: 9 },
    { id: 'P5', x: -13, z: 11.5, seed: 4 },
  ],
  treeTable: { x: 35, z: -12.5 },               // umbrella on the grass by the big tree
  crossTable: { x: 37.6, z: -16.2 },            // dark cross-legged table under the tree
  manhole: { x: 39.2, z: -7.4 },
  firewood: [{ x: -24.5, z: -5.5, rot: 0.6, ring: [-25.6, -8.4] }, { x: 6.2, z: -17.6, rot: 2.4, ring: [4.4, -12.4] }, { x: -27.4, z: 18.6, rot: 1.2, ring: [-25.6, 17.6] }],
  net: { x: 9, z: -7, rot: Math.PI / 2 },
  stones: [[-30.2, 2.1], [-26.2, 3.4], [-21, 5.6], [-16.5, 8.4], [-11, 8], [-5, 4], [1, 0.5], [5.5, -1.5]],
  floodlights: [{ x: -26, z: 17, ry: 2.5 }, { x: 24, z: 18, ry: -2.4 }, { x: -2, z: -23, ry: 0.1 }, { x: 26, z: -12, ry: -1.2 }],
  gardenLamps: [[-17, 15.5], [-11, 15.8], [-22, 14], [15, 14], [21, 14.5], [-23, -12], [-17, -12.5], [-1, -19], [5, -19], [-29, 9.5], [-29, -1]],
  bamboo: [
    // [x, z, radius, culms, height]
    [-29.6, 0.8, 1.1, 18, 8], [-29.2, 7.6, 1.0, 16, 7.5], [-30.1, 4.6, 0.6, 9, 7.5], [-29.8, -10, 1.0, 16, 8], [-29.5, -16.5, 1.1, 18, 7.5],
    [-29.4, 17.6, 1.0, 16, 7], [-29.1, 24.2, 1.0, 14, 7.5], [-33.6, 10.8, 0.9, 12, 7], [-34.5, -4.3, 0.8, 10, 6.5],
    [12.5, 21.8, 1.2, 18, 8], [21.5, 18.8, 1.0, 14, 7.5], [-14, -23.5, 1.2, 16, 8], [6.5, -24.5, 1.0, 14, 7],
    [27.5, 7.5, 0.9, 12, 7], [-40.5, -22, 1.1, 16, 8.5], [-41, 28, 1.2, 18, 8], [34.5, 16, 1.0, 14, 8],
  ],
  bigTree: { x: 37, z: -19 },
  potRows: [{ from: [32.8, -29.4], to: [32.8, -12.4], step: 0.62 }, { from: [32.3, -11.5], to: [26.8, -7.7], step: 0.62 }],
  // dense bands of shrubs and small trees closing off the far side of the lawn: [x0, z0, x1, z1]
  thickets: [[30.5, -4, 31.5, 21], [27, 20, 14, 28.5], [-34, 30, -18, 31.5], [-2, -25.5, 12, -26.5]],
  shrubs: [[-3, -24.5, 2.2], [7, -36, 1.8], [-31, -27, 2.5], [33, 14, 2], [-22, -27, 2], [9, 27, 2.5], [-15, 28.5, 2.2], [9, -40, 1.6]],
};

// Local villa coordinates -> world.
export function villaToWorld(v, x, y, z) {
  const c = Math.cos(v.rot), s = Math.sin(v.rot);
  return new THREE.Vector3(v.x + x * c + z * s, y, v.z - x * s + z * c);
}
export const heroVilla = () => VILLA.garden.find((v) => v.interior);

// Garden-villa interior extents (local), used for "is the camera inside" checks.
export const INTERIOR = { x0: -5.0, x1: 4.97, z0: -5.77, z1: -0.23, y1: 3.25 };
