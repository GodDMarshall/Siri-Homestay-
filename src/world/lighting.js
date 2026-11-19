// Sky, sun, ambient light, fog and the estate's night lighting, with four looks:
// day, golden (early morning), dusk and night.
import * as THREE from 'three';
import { nightGlow } from './materials.js';
import * as TX from './textures.js';
import { LAYOUT, VILLA, villaToWorld } from './layout.js';

export const PRESETS = {
  day: {
    sunElev: 50, sunAzim: 128, sunColor: '#fff3e0', sunI: 3.1,
    skyTop: '#4f86d4', skyHorizon: '#cfe1ef', skyBottom: '#56653e', sunGlow: 0.35,
    fog: '#c6d5dc', fogDensity: 0.0034, env: 1.25, exposure: 0.9, night: 0, stars: 0,
  },
  golden: {
    sunElev: 9, sunAzim: 98, sunColor: '#ffb067', sunI: 2.6,
    skyTop: '#5a83c2', skyHorizon: '#f3c393', skyBottom: '#4a4a2c', sunGlow: 1.0,
    fog: '#e5c39d', fogDensity: 0.0045, env: 1.0, exposure: 0.98, night: 0, stars: 0,
  },
  overcast: {
    sunElev: 24, sunAzim: 230, sunColor: '#f1ece4', sunI: 0.9,
    skyTop: '#9fb0c2', skyHorizon: '#e3e4e2', skyBottom: '#5e6450', sunGlow: 0.25,
    fog: '#d3d8d8', fogDensity: 0.0048, env: 1.25, exposure: 0.95, night: 0, stars: 0,
  },
  dusk: {
    sunElev: -3, sunAzim: 255, sunColor: '#ff9a72', sunI: 0.0,
    skyTop: '#1c2b57', skyHorizon: '#c98d78', skyBottom: '#1e2119', sunGlow: 0.8,
    fog: '#465372', fogDensity: 0.0055, env: 0.55, exposure: 1.2, night: 0.75, stars: 0.15,
  },
  night: {
    sunElev: -30, sunAzim: 200, sunColor: '#9fb4e8', sunI: 0.0,
    skyTop: '#03060f', skyHorizon: '#141d33', skyBottom: '#06080a', sunGlow: 0,
    fog: '#0b1120', fogDensity: 0.0065, env: 0.32, exposure: 1.2, night: 1, stars: 0.1,
    moon: { elev: 42, azim: 215, color: '#a9bce6', intensity: 0.28 },
  },
};

const skyVert = /* glsl */`
  varying vec3 vDir;
  void main() {
    vDir = normalize((modelMatrix * vec4(position, 0.0)).xyz);
    vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_Position = p.xyww;
  }`;
const skyFrag = /* glsl */`
  uniform vec3 uTop; uniform vec3 uHorizon; uniform vec3 uBottom;
  uniform vec3 uSunDir; uniform vec3 uSunColor; uniform float uSunGlow; uniform float uStars; uniform float uDisc;
  varying vec3 vDir;
  float hash(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
  void main() {
    vec3 d = normalize(vDir);
    float h = d.y;
    vec3 col = h > 0.0 ? mix(uHorizon, uTop, pow(clamp(h, 0.0, 1.0), 0.48)) : mix(uHorizon, uBottom, clamp(-h * 6.0, 0.0, 1.0));
    float sd = max(dot(d, uSunDir), 0.0);
    col += uSunColor * uSunGlow * (pow(sd, 6.0) * 0.35 + pow(sd, 64.0) * 0.6) * smoothstep(-0.12, 0.05, h);
    col += uSunColor * uDisc * smoothstep(0.9993, 0.9997, sd) * 30.0;
    if (uStars > 0.0 && h > 0.0) {
      vec3 g = floor(d * 380.0);
      float s = hash(g);
      float star = step(0.9975, s) * (0.4 + 0.6 * hash(g + 3.1));
      col += vec3(star) * uStars * smoothstep(0.02, 0.3, h) * 1.4;
    }
    gl_FragColor = vec4(col, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }`;

function dirFrom(elevDeg, azimDeg) {
  // azimuth measured from north (-z) clockwise towards east (+x)
  const e = THREE.MathUtils.degToRad(elevDeg), a = THREE.MathUtils.degToRad(azimDeg);
  return new THREE.Vector3(Math.sin(a) * Math.cos(e), Math.sin(e), -Math.cos(a) * Math.cos(e));
}

export function createLighting(renderer, scene, Q) {
  const L = { preset: 'day' };

  // sky dome (also feeds the environment map)
  const skyMat = new THREE.ShaderMaterial({
    vertexShader: skyVert, fragmentShader: skyFrag, side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: {
      uTop: { value: new THREE.Color() }, uHorizon: { value: new THREE.Color() }, uBottom: { value: new THREE.Color() },
      uSunDir: { value: new THREE.Vector3(0, 1, 0) }, uSunColor: { value: new THREE.Color() },
      uSunGlow: { value: 0 }, uStars: { value: 0 }, uDisc: { value: 1 },
    },
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 24), skyMat);
  sky.scale.setScalar(1500); sky.frustumCulled = false; sky.renderOrder = -10; sky.name = 'sky';
  scene.add(sky);
  const envScene = new THREE.Scene();
  const envSky = new THREE.Mesh(sky.geometry, skyMat.clone());
  envSky.material.uniforms = skyMat.uniforms; envSky.scale.setScalar(100);
  envScene.add(envSky);
  const pmrem = new THREE.PMREMGenerator(renderer);
  let envRT = null;

  // sun
  const sun = new THREE.DirectionalLight('#ffffff', 3);
  sun.castShadow = Q.shadow > 0;
  if (sun.castShadow) {
    sun.shadow.mapSize.set(Q.shadow, Q.shadow);
    sun.shadow.bias = -0.0002;
    sun.shadow.normalBias = 0.03;
    sun.shadow.radius = 3;
  }
  scene.add(sun, sun.target);
  const moon = new THREE.DirectionalLight('#a9bce6', 0);
  scene.add(moon, moon.target);
  const hemi = new THREE.HemisphereLight('#cfe3ff', '#4f5b33', 0.25);
  scene.add(hemi);
  // Inside the white bedroom most light has bounced off the floor and walls; this stands in for it.
  const fill = new THREE.HemisphereLight('#fff3e3', '#e6dac8', 0);
  scene.add(fill);
  scene.fog = new THREE.FogExp2('#c3d3dc', 0.004);

  const focus = { center: new THREE.Vector3(-4, 0, 0), radius: 55 };

  // ------------------------------------------------------------ night lighting
  const glowTex = TX.glow();
  const nightObjs = [];
  const halo = (pos, size, color, strength = 1) => {
    const m = new THREE.SpriteMaterial({ map: glowTex, color, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0, fog: false });
    const s = new THREE.Sprite(m); s.position.copy(pos); s.scale.setScalar(size); s.renderOrder = 5;
    s.userData.strength = strength; nightObjs.push(s); scene.add(s); return s;
  };
  const pool = (x, z, size, color, strength = 1, y = 0.03) => {
    const m = new THREE.MeshBasicMaterial({ map: glowTex, color, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0, fog: false, polygonOffset: true, polygonOffsetFactor: -2 });
    const p = new THREE.Mesh(new THREE.PlaneGeometry(size, size).rotateX(-Math.PI / 2), m);
    p.position.set(x, y, z); p.renderOrder = 4; p.userData.strength = strength; nightObjs.push(p); scene.add(p); return p;
  };

  // floodlights on poles: real spotlights
  const spots = [];
  for (const f of LAYOUT.floodlights) {
    const dir = new THREE.Vector3(Math.sin(f.ry), 0, Math.cos(f.ry));
    const head = new THREE.Vector3(f.x, 7.0, f.z).addScaledVector(dir, 0.2);
    const s = new THREE.SpotLight('#e8f0ff', 0, 60, 0.82, 0.55, 1.6);
    s.position.copy(head);
    s.target.position.copy(head).addScaledVector(dir, 15).setY(0);
    s.castShadow = false;
    scene.add(s, s.target);
    spots.push(s);
    halo(head.clone().addScaledVector(dir, 0.1), 7.5, '#eef4ff', 1.5);
    halo(head.clone().addScaledVector(dir, 0.12), 2.2, '#ffffff', 1.0);
  }
  // garden bollards and villa wall lamps: halos and pools of warm light
  for (const [x, z] of LAYOUT.gardenLamps) {
    halo(new THREE.Vector3(x, 0.32, z), 0.9, '#ffbf73', 0.9);
    pool(x, z, 3.2, '#ffb15c', 0.55);
  }
  const lampPoints = [];
  for (const v of VILLA.garden) {
    const p = villaToWorld(v, -4.1, 2.35, 0.12);
    halo(p, 1.3, '#ffc27a', 1);
    const g = villaToWorld(v, -4.1, 0, 1.4); pool(g.x, g.z, 4.5, '#ffb763', 0.45, 0.22);
    lampPoints.push(p);
  }
  for (const v of VILLA.cottage) {
    const c = Math.cos(v.rot), s = Math.sin(v.rot);
    const p = new THREE.Vector3(v.x + 2.5 * c + 0.12 * s, 2.4, v.z - 2.5 * s + 0.12 * c);
    halo(p, 1.3, '#ffc27a', 1);
    lampPoints.push(p);
  }
  // a few real point lights where the lamps matter most (villa patios)
  const warm = lampPoints.slice(0, 4).map((p) => {
    const l = new THREE.PointLight('#ffb866', 0, 9, 1.8);
    l.position.copy(p).add(new THREE.Vector3(0, -0.15, 0));
    scene.add(l); return l;
  });
  // the bedroom's ceiling light
  const room = new THREE.PointLight('#fff6ea', 0, 10, 1.5);
  scene.add(room);
  // light spilling out through the villa glass at night
  const spill = [];
  for (const v of VILLA.garden) {
    const p = villaToWorld(v, 0.5, 0, 1.8);
    spill.push(pool(p.x, p.z, 7, '#ffd29a', 0.35, 0.215));
  }

  // ------------------------------------------------------------ apply a look
  const cur = {};
  function applyValues(P) {
    const sunDir = dirFrom(P.sunElev, P.sunAzim);
    skyMat.uniforms.uTop.value.set(P.skyTop);
    skyMat.uniforms.uHorizon.value.set(P.skyHorizon);
    skyMat.uniforms.uBottom.value.set(P.skyBottom);
    skyMat.uniforms.uSunDir.value.copy(sunDir);
    skyMat.uniforms.uSunColor.value.set(P.sunColor);
    skyMat.uniforms.uSunGlow.value = P.sunGlow;
    skyMat.uniforms.uStars.value = P.stars;
    skyMat.uniforms.uDisc.value = P.sunElev > -1 ? 1 : 0;

    sun.color.set(P.sunColor);
    sun.intensity = P.sunI * THREE.MathUtils.smoothstep(P.sunElev, -2, 6);
    sun.visible = sun.intensity > 0.001;
    L.sunDir = sunDir;
    placeSun();

    if (P.moon) {
      moon.color.set(P.moon.color); moon.intensity = P.moon.intensity;
      const md = dirFrom(P.moon.elev, P.moon.azim);
      moon.position.copy(focus.center).addScaledVector(md, 100); moon.target.position.copy(focus.center);
    } else moon.intensity = 0;
    moon.visible = moon.intensity > 0;

    hemi.color.set(P.skyHorizon).lerp(new THREE.Color(P.skyTop), 0.4);
    hemi.groundColor.set(P.skyBottom).lerp(new THREE.Color('#8c8274'), 0.6);
    hemi.intensity = 0.15 + 0.22 * (1 - P.night);
    L.fillBase = 0.3 + 0.55 * (1 - P.night);
    scene.fog.color.set(P.fog);
    scene.fog.density = P.fogDensity;
    renderer.toneMappingExposure = P.exposure;
    L.baseEnv = P.env;

    nightGlow.value = P.night;
    for (const o of nightObjs) o.material.opacity = P.night * o.userData.strength;
    for (const s of spots) s.intensity = P.night * 720;
    for (const w of warm) w.intensity = P.night * 7;
    room.intensity = 9 + P.night * 14;
    Object.assign(cur, P);
  }

  function rebuildEnv() {
    const old = envRT;
    envRT = pmrem.fromScene(envScene, 0, 0.1, 1000);
    scene.environment = envRT.texture;
    if (old) old.dispose();
  }

  function placeSun() {
    const d = L.sunDir || dirFrom(50, 128);
    const r = focus.radius;
    sun.position.copy(focus.center).addScaledVector(d, r * 2.2 + 40);
    sun.target.position.copy(focus.center);
    sun.target.updateMatrixWorld();
    if (sun.castShadow) {
      const c = sun.shadow.camera;
      c.left = -r; c.right = r; c.top = r; c.bottom = -r;
      c.near = 1; c.far = r * 4.4 + 80;
      c.updateProjectionMatrix();
    }
    renderer.shadowMap.needsUpdate = true;
  }

  // Interpolates between two looks (for the dusk scroll section).
  function mix(a, b, t) {
    const A = PRESETS[a], B = PRESETS[b], out = {};
    for (const k of Object.keys(A)) {
      const va = A[k], vb = B[k] ?? va;
      if (typeof va === 'number') out[k] = va + (vb - va) * t;
      else if (typeof va === 'string' && va[0] === '#') out[k] = '#' + new THREE.Color(va).lerp(new THREE.Color(vb), t).getHexString();
      else out[k] = t < 0.5 ? va : vb;
    }
    if (!A.moon && B.moon) out.moon = { ...B.moon, intensity: B.moon.intensity * t };
    if (A.moon && !B.moon) out.moon = { ...A.moon, intensity: A.moon.intensity * (1 - t) };
    return out;
  }

  L.set = (name, { env = true } = {}) => {
    L.preset = name;
    applyValues(PRESETS[name]);
    if (env) rebuildEnv();
  };
  L.blend = (a, b, t, { env = false } = {}) => {
    applyValues(mix(a, b, t));
    L.preset = t < 0.5 ? a : b;
    if (env) rebuildEnv();
  };
  L.rebuildEnv = rebuildEnv;
  L.setFocus = (center, radius) => {
    focus.center.copy(center); focus.radius = radius;
    placeSun();
  };
  L.setRoomLight = (pos) => { room.position.copy(pos); };
  L.interior = (k) => { // 0 outside .. 1 inside the bedroom
    scene.environmentIntensity = (L.baseEnv ?? 1) * (1 - 0.45 * k);
    hemi.intensity = (0.15 + 0.22 * (1 - (cur.night || 0))) * (1 - 0.5 * k);
    fill.intensity = (L.fillBase ?? 1) * k;
  };
  L.sun = sun; L.hemi = hemi; L.room = room; L.sky = sky;
  L.dispose = () => { envRT && envRT.dispose(); pmrem.dispose(); };
  return L;
}
