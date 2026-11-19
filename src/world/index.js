// Siri Homestay, rebuilt in code. Every surface, building, plant and light is generated here;
// no photograph or video is loaded. The arrangement of the estate is illustrative.
//
//   const world = await createWorld(canvas, { quality: 'auto', view: 'lawn-stepping-stones' });
//   world.setView('villa-bedroom');         // jump
//   await world.flyTo('villa-patio');       // animate
//   world.setPathProgress('enter', 0.4);    // scroll-driven camera paths
//   world.project('bed');                   // screen position of a 3D anchor
import * as THREE from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { configureTextures, disposeTextures, ALL as ALL_TEXTURES } from './textures.js';
import { createMaterials, wind } from './materials.js';
import { Batch, M } from './util.js';
import { VILLA, LAYOUT, villaToWorld, heroVilla, INTERIOR } from './layout.js';
import { buildTerrain } from './terrain.js';
import { buildVegetation } from './vegetation.js';
import * as BLD from './buildings.js';
import * as O from './objects.js';
import { createLighting, PRESETS } from './lighting.js';
import { VIEWS, PATHS, viewCamera, Path } from './views.js';

export { VIEWS, PATHS, PRESETS };

export const QUALITY = {
  low: { pixelRatio: 1, shadow: 1024, density: 0.45, grass: 0, texScale: 0.5, aniso: 2, antialias: false, reflect: 0 },
  medium: { pixelRatio: 1.25, shadow: 2048, density: 0.7, grass: 14000, texScale: 0.75, aniso: 4, antialias: true, reflect: 0 },
  high: { pixelRatio: 1.75, shadow: 4096, density: 1, grass: 30000, texScale: 1, aniso: 8, antialias: true, reflect: 1024 },
  ultra: { pixelRatio: 2, shadow: 4096, density: 1.15, grass: 50000, texScale: 1, aniso: 16, antialias: true, reflect: 1536 },
};

export function pickQuality() {
  if (typeof window === 'undefined') return 'medium';
  const coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  const small = Math.min(window.screen?.width || 1200, window.screen?.height || 800) < 600;
  const mem = navigator.deviceMemory || 4, cores = navigator.hardwareConcurrency || 4;
  if (coarse || small) return mem >= 6 && cores >= 8 ? 'medium' : 'low';
  return mem >= 8 && cores >= 8 ? 'high' : 'medium';
}

export function webglAvailable() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch (e) { return false; }
}

const nextFrame = () => new Promise((r) => (typeof requestAnimationFrame === 'function' ? requestAnimationFrame(() => r()) : setTimeout(r, 0)));
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function potPositions() {
  const out = [];
  for (const row of LAYOUT.potRows) {
    const [x0, z0] = row.from, [x1, z1] = row.to, n = Math.floor(Math.hypot(x1 - x0, z1 - z0) / row.step);
    for (let i = 0; i <= n; i++) out.push([x0 + ((x1 - x0) * i) / n, z0 + ((z1 - z0) * i) / n]);
  }
  return out;
}

// The bedroom's polished vitrified tiles: a faint mirror image that strengthens at grazing angles.
const GlossShader = {
  name: 'GlossFloor',
  uniforms: { color: { value: null }, tDiffuse: { value: null }, textureMatrix: { value: null }, strength: { value: 0.3 } },
  vertexShader: /* glsl */`
    uniform mat4 textureMatrix;
    varying vec4 vUv; varying vec3 vWorld;
    void main() {
      vUv = textureMatrix * vec4(position, 1.0);
      vWorld = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
  fragmentShader: /* glsl */`
    uniform vec3 color; uniform sampler2D tDiffuse; uniform float strength;
    varying vec4 vUv; varying vec3 vWorld;
    void main() {
      vec3 v = normalize(cameraPosition - vWorld);
      float f = 0.05 + 0.95 * pow(1.0 - max(v.y, 0.0), 4.0);
      vec4 base = texture2DProj(tDiffuse, vUv);
      gl_FragColor = vec4(base.rgb * color, clamp(strength * (0.45 + 0.55 * f), 0.0, 0.85));
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`,
};

function addGlossyFloor(scene, hero, size) {
  const fl = 0.3, x0 = -3.1, x1 = INTERIOR.x1, z0 = INTERIOR.z0, z1 = INTERIOR.z1;
  const mirror = new Reflector(new THREE.PlaneGeometry(x1 - x0, z1 - z0), { textureWidth: size, textureHeight: Math.round(size * 0.7), color: '#ffffff', shader: GlossShader, multisample: 0 });
  mirror.material.transparent = true;
  mirror.material.depthWrite = false;
  mirror.matrixAutoUpdate = false;
  mirror.matrix.copy(hero.T).multiply(M((x0 + x1) / 2, fl + 0.0135, (z0 + z1) / 2, 0, -Math.PI / 2));
  mirror.matrixWorldNeedsUpdate = true;
  mirror.name = 'floor-gloss';
  scene.add(mirror);
  return mirror;
}

function buildEstate(scene, mats) {
  const B = new Batch();
  buildTerrain(scene, B, mats);
  let hero = null;
  for (const v of VILLA.garden) {
    const T = M(v.x, 0, v.z, v.rot);
    const res = BLD.gardenVilla(B, mats, T, { interior: v.interior, seed: v.id.charCodeAt(1) });
    const root = new THREE.Group();
    root.matrixAutoUpdate = false; root.matrix.copy(T); root.matrixWorldNeedsUpdate = true;
    root.add(res.door); scene.add(root);
    if (v.interior) hero = { v, T, ...res };
  }
  for (const v of VILLA.cottage) BLD.cottage(B, mats, M(v.x, 0, v.z, v.rot), { seed: v.id.charCodeAt(1), dish: v.id === 'V4' });
  const { diningHall, kitchen, staff } = LAYOUT;
  BLD.diningHall(B, mats, M(diningHall.x, 0, diningHall.z, diningHall.rot));
  BLD.smallBlock(B, mats, M(kitchen.x, 0, kitchen.z, kitchen.rot), { W: 7, D: 5 });
  BLD.smallBlock(B, mats, M(staff.x, 0, staff.z, staff.rot), { W: 9, D: 4.5 });
  for (const p of LAYOUT.pads) O.umbrellaSet(B, mats, M(p.x, 0, p.z, p.seed * 0.7), { seed: p.seed });
  const tt = LAYOUT.treeTable, ct = LAYOUT.crossTable, mh = LAYOUT.manhole;
  O.umbrellaSet(B, mats, M(tt.x, 0, tt.z, 0.3), { chairs: 0, pad: false, seed: 11 });
  O.crossTable(B, mats, M(ct.x, 0, ct.z, 0.4));
  O.manhole(B, mats, M(mh.x, 0, mh.z));
  for (const f of LAYOUT.firewood) {
    O.firewood(B, mats, M(f.x, 0, f.z, f.rot), { seed: Math.round(f.x * 3) });
    O.fireRing(B, mats, M(f.ring[0], 0, f.ring[1]));
  }
  O.volleyballNet(B, mats, M(LAYOUT.net.x, 0, LAYOUT.net.z, LAYOUT.net.rot));
  O.steppingStones(B, mats, LAYOUT.stones);
  for (const f of LAYOUT.floodlights) O.floodlight(B, mats, M(f.x, 0, f.z, f.ry));
  for (const [x, z] of LAYOUT.gardenLamps) O.gardenLamp(B, mats, M(x, 0, z));
  for (const [x, z] of potPositions()) O.pot(B, mats, M(x, 0, z));
  const estate = B.build('estate');
  // ground layers draw first, in order (see materials.js)
  estate.traverse((o) => { if (o.isMesh && o.material.userData.layer !== undefined) o.renderOrder = o.material.userData.layer; });
  scene.add(estate);
  return hero;
}

export async function createWorld(canvas, opts = {}) {
  const {
    quality = 'auto', view = 'lawn-stepping-stones', preset = null, onProgress = () => {},
    live = false, preserveDrawingBuffer = false, maxFps = 60, pixelRatio = null,
  } = opts;
  const qName = quality === 'auto' ? pickQuality() : quality;
  const Q = QUALITY[qName] || QUALITY.medium;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: Q.antialias, powerPreference: 'high-performance', preserveDrawingBuffer, alpha: false, stencil: false });
  renderer.setPixelRatio(pixelRatio ?? Math.min((typeof devicePixelRatio === 'number' ? devicePixelRatio : 1), Q.pixelRatio));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = Q.shadow > 0;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.shadowMap.autoUpdate = false;
  configureTextures({ anisotropy: Math.min(Q.aniso, renderer.capabilities.getMaxAnisotropy()), scale: Q.texScale });

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 4 / 3, 0.05, 3000);

  // Paint the textures one per frame, so the page stays responsive while the estate is built.
  for (let i = 0; i < ALL_TEXTURES.length; i++) { onProgress(0.05 + 0.25 * (i / ALL_TEXTURES.length), 'textures'); ALL_TEXTURES[i](); await nextFrame(); }
  const mats = createMaterials({ quality: qName });
  onProgress(0.3, 'buildings'); await nextFrame();
  const hero = buildEstate(scene, mats);
  onProgress(0.6, 'planting'); await nextFrame();
  buildVegetation(scene, mats, Q);
  onProgress(0.8, 'light'); await nextFrame();
  const L = createLighting(renderer, scene, Q);
  if (Q.reflect) addGlossyFloor(scene, hero, Q.reflect);
  L.setRoomLight(villaToWorld(hero.v, ...hero.lights[0].local));

  // 3D anchors for labels and hotspots
  const anchors = {};
  for (const [k, a] of Object.entries(hero.anchors)) anchors[k] = villaToWorld(hero.v, ...a.local);
  const pad = (id, y = 2.6) => { const p = LAYOUT.pads.find((q) => q.id === id); return new THREE.Vector3(p.x, y, p.z); };
  const fw = LAYOUT.firewood[0], fl0 = LAYOUT.floodlights[0], gl = LAYOUT.gardenLamps[0];
  const v3 = VILLA.garden[2], v4 = VILLA.cottage[0], v5 = VILLA.cottage[1];
  Object.assign(anchors, {
    lawn: new THREE.Vector3(-2, 0.5, 2),
    stones: new THREE.Vector3(-16.5, 0.3, 8.4),
    diningHall: new THREE.Vector3(LAYOUT.diningHall.x, 2.2, LAYOUT.diningHall.z + 4.2),
    kitchen: new THREE.Vector3(LAYOUT.kitchen.x, 2.0, LAYOUT.kitchen.z - 1),
    courtyard: new THREE.Vector3(24, 0.3, -20),
    pond: new THREE.Vector3(LAYOUT.pond.x, 0.4, LAYOUT.pond.z),
    net: new THREE.Vector3(LAYOUT.net.x, 2.0, LAYOUT.net.z),
    umbrella: pad('P3'), umbrellaP1: pad('P1'), umbrellaP2: pad('P2'), umbrellaP4: pad('P4'), umbrellaP5: pad('P5'),
    tableP3: pad('P3', 0.85), tableP5: pad('P5', 0.85),
    firewood: new THREE.Vector3(fw.x + 1.4, 0.7, fw.z - 0.6),
    bamboo: new THREE.Vector3(-29.4, 4, 7.6),
    villa: villaToWorld(v3, 0.5, 1.8, 0.2),
    patioChairs: villaToWorld(hero.v, 0.9, 0.8, 1.5),
    cottage: villaToWorld(v4, 0, 2.0, 0.1), cottageV5: villaToWorld(v5, 0, 2.0, 0.1),
    potRow: new THREE.Vector3(LAYOUT.potRows[0].from[0], 0.5, (LAYOUT.potRows[0].from[1] + LAYOUT.potRows[0].to[1]) / 2),
    bigTree: new THREE.Vector3(LAYOUT.bigTree.x, 4.5, LAYOUT.bigTree.z),
    floodlight: new THREE.Vector3(fl0.x, 7, fl0.z),
    gardenLamp: new THREE.Vector3(gl[0], 0.3, gl[1]),
  });

  // ------------------------------------------------------------------ camera state
  const state = { pos: new THREE.Vector3(), target: new THREE.Vector3(), fov: 55, door: 0, interiorK: 0 };
  let dirty = true, raf = 0, running = false, last = 0, disposed = false;
  const tweens = new Set();
  const local = new THREE.Vector3();
  const inv = new THREE.Matrix4().copy(hero.T).invert();

  function insideRoom(p) {
    local.copy(p).applyMatrix4(inv);
    return local.x > INTERIOR.x0 - 0.05 && local.x < INTERIOR.x1 && local.z > INTERIOR.z0 && local.z < INTERIOR.z1 + 0.2 && local.y < INTERIOR.y1;
  }
  function apply() {
    camera.position.copy(state.pos);
    camera.fov = state.fov;
    camera.updateProjectionMatrix();
    camera.lookAt(state.target);
    hero.door.position.x = -hero.doorTravel * state.door;
    const k = insideRoom(state.pos) ? 1 : 0;
    if (k !== state.interiorK) { state.interiorK = k; L.interior(k); }
    const nearP = k ? 0.04 : Math.min(0.15, 0.04 + 0.05 * Math.max(0, state.pos.y - 1));
    if (camera.near !== nearP) { camera.near = nearP; camera.updateProjectionMatrix(); }
    dirty = true;
  }
  function setDoor(t) { state.door = Math.max(0, Math.min(1, t)); apply(); }
  function focusOn(center, radius) { L.setFocus(center, radius); dirty = true; }

  function setPreset(name) {
    if (L.preset !== name || !scene.environment) L.set(name);
    L.interior(state.interiorK);
    mats.pergolaRoof.emissiveIntensity = 0.75 * (1 - PRESETS[name].night);
    mats.umbrella.emissiveIntensity = 0.5 * (1 - PRESETS[name].night);
    dirty = true;
  }

  function setView(key) {
    const v = viewCamera(key);
    state.pos.copy(v.pos); state.target.copy(v.target); state.fov = v.fov;
    if (v.door !== undefined) state.door = v.door;
    setPreset(opts.lockPreset || v.preset);
    focusOn(v.target.clone().lerp(v.pos, 0.35), v.focus);
    apply();
    return v;
  }

  // Animated move. Moves between outside and the bedroom go through the sliding door.
  function flyTo(key, { duration = 2.2 } = {}) {
    const v = viewCamera(key);
    const from = { pos: state.pos.clone(), target: state.target.clone(), fov: state.fov };
    const inA = insideRoom(from.pos), inB = insideRoom(v.pos);
    let pts;
    if (inA !== inB) {
      const out = anchors.doorOutside, inn = anchors.doorInside, mid = anchors.door.clone().setY(1.55);
      pts = inA ? [[from.pos, from.target], [inn, mid], [out, out.clone().lerp(v.target, 0.5)], [v.pos, v.target]]
        : [[from.pos, from.target], [out, mid], [inn, inn.clone().lerp(v.target, 0.5)], [v.pos, v.target]];
    } else {
      const d = from.pos.distanceTo(v.pos);
      const midPos = from.pos.clone().lerp(v.pos, 0.5);
      if (!inA) midPos.y += Math.min(14, d * 0.18);
      pts = [[from.pos, from.target], [midPos, from.target.clone().lerp(v.target, 0.5)], [v.pos, v.target]];
    }
    const path = new Path(pts.map(([p, t]) => [p.toArray(), t.toArray()]));
    const doorFrom = state.door, doorTo = inA !== inB ? 1 : (v.door ?? state.door);
    const box = new THREE.Box3().setFromPoints([from.pos, v.pos, from.target, v.target]);
    const sphere = box.getBoundingSphere(new THREE.Sphere());
    focusOn(sphere.center, Math.max(v.focus, sphere.radius + 8));
    if (v.preset !== L.preset && !opts.lockPreset) setPreset(v.preset);
    const dur = inA !== inB ? Math.max(duration, 3.2) : duration;
    return animate(dur, (t) => {
      const e = ease(t);
      path.at(e, state.pos, state.target);
      state.fov = from.fov + (v.fov - from.fov) * e;
      state.door = inA !== inB ? Math.min(1, Math.max(doorFrom, e * 3)) : doorFrom + (doorTo - doorFrom) * e;
      apply();
    }).then(() => { focusOn(v.target.clone().lerp(v.pos, 0.35), v.focus); return v; });
  }

  function animate(duration, fn) {
    return new Promise((resolve) => {
      const tw = { start: -1, duration: duration * 1000, fn, resolve };
      tweens.add(tw); start();
    });
  }

  // Scroll-driven paths
  const pathCache = {};
  function setPathProgress(name, t, { fov = null, door = null } = {}) {
    if (!pathCache[name]) {
      const p = new Path(PATHS[name]);
      const pts = PATHS[name].flatMap(([a, b]) => [new THREE.Vector3(...a), new THREE.Vector3(...b)]);
      const s = new THREE.Box3().setFromPoints(pts).getBoundingSphere(new THREE.Sphere());
      pathCache[name] = { p, center: s.center, radius: Math.min(70, s.radius + 6) };
    }
    const c = pathCache[name];
    if (state.activePath !== name) { state.activePath = name; focusOn(c.center, c.radius); }
    c.p.at(t, state.pos, state.target);
    if (fov) state.fov = fov;
    if (door !== null) state.door = door;
    apply();
  }

  // Screen position of an anchor (CSS pixels relative to the canvas).
  const _v = new THREE.Vector3();
  function project(name) {
    const p = typeof name === 'string' ? anchors[name] : name;
    if (!p) return null;
    _v.copy(p).project(camera);
    const w = canvas.clientWidth, h = canvas.clientHeight;
    const behind = _v.z > 1;
    return { x: (_v.x * 0.5 + 0.5) * w, y: (-_v.y * 0.5 + 0.5) * h, visible: !behind && Math.abs(_v.x) <= 1.02 && Math.abs(_v.y) <= 1.02, depth: _v.z };
  }

  // What is under a point of the canvas (normalised device coordinates, -1..1).
  const raycaster = new THREE.Raycaster();
  function pick(nx, ny) {
    camera.updateMatrixWorld();
    raycaster.setFromCamera(new THREE.Vector2(nx, ny), camera);
    const hit = raycaster.intersectObjects(scene.children, true).find((h) => h.object.visible && h.object.name !== 'sky');
    if (!hit) return null;
    const o = hit.object;
    const m = new THREE.Matrix4();
    if (o.isInstancedMesh && hit.instanceId !== undefined) o.getMatrixAt(hit.instanceId, m);
    return { name: o.name || o.parent?.name, material: o.material?.color?.getHexString?.(), instanceId: hit.instanceId, point: hit.point.toArray().map((v) => +v.toFixed(2)), distance: +hit.distance.toFixed(2), matrix: o.isInstancedMesh ? m.elements.map((v) => +v.toFixed(2)) : null };
  }

  function resize(w = canvas.clientWidth, h = canvas.clientHeight) {
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    dirty = true;
  }

  function render() {
    renderer.render(scene, camera);
    dirty = false;
  }

  function loop(now) {
    if (disposed) return;
    raf = requestAnimationFrame(loop);
    if (now - last < 1000 / api.maxFps - 2) return;
    const dt = last ? Math.min(0.1, (now - last) / 1000) : 0;
    last = now;
    for (const tw of [...tweens]) {
      if (tw.start < 0) tw.start = now;
      const t = Math.min(1, (now - tw.start) / tw.duration);
      tw.fn(t);
      if (t >= 1) { tweens.delete(tw); tw.resolve(); }
    }
    if (api.live) { wind.value += dt; dirty = true; }
    if (api.onFrame) api.onFrame(dt);
    if (dirty) render();
    if (!api.live && !tweens.size && !dirty && !api.keepAlive) { running = false; cancelAnimationFrame(raf); }
  }
  function start() { if (running || disposed) return; running = true; last = 0; raf = requestAnimationFrame(loop); }
  function invalidate() { dirty = true; start(); }

  function snapshot(w, h, type = 'image/png', quality = 0.95) {
    const prev = new THREE.Vector2(); renderer.getSize(prev);
    if (w && h) resize(w, h);
    render();
    const url = canvas.toDataURL(type, quality);
    if (w && h) resize(prev.x, prev.y);
    return url;
  }

  function dispose() {
    disposed = true; cancelAnimationFrame(raf);
    scene.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
    });
    L.dispose(); disposeTextures(); renderer.dispose();
    try { renderer.forceContextLoss(); } catch (e) { /* ignore */ }
  }

  const api = {
    renderer, scene, camera, anchors, quality: qName, live,
    views: Object.keys(VIEWS), paths: Object.keys(PATHS), presets: Object.keys(PRESETS),
    setView, flyTo, setPreset, setDoor, setPathProgress, project, pick, resize, render, invalidate, start, snapshot, dispose,
    blendPresets(a, b, t) { L.blend(a, b, t); L.interior(state.interiorK); invalidate(); },
    rebuildEnvironment() { L.rebuildEnv(); invalidate(); },
    get state() { return state; },
    get preset() { return L.preset; },
    onFrame: null, keepAlive: false, maxFps,
  };

  onProgress(0.95, 'first frame');
  resize();
  setView(view);
  if (preset) setPreset(preset);
  render();
  onProgress(1, 'ready');
  if (live) start();
  return api;
}
