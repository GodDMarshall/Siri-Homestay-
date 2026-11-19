import * as THREE from 'three';
import * as T from './textures.js';

export const wind = { value: 0 };     // seconds, drives foliage sway
export const nightGlow = { value: 0 }; // 0 day .. 1 night, fades emissive lamps

function std(opts) { return new THREE.MeshStandardMaterial(opts); }

function withTexture(map, repeat = [1, 1]) {
  const t = map.clone();
  t.needsUpdate = true;
  t.repeat.set(repeat[0], repeat[1]);
  return t;
}

// Breaks up visible tiling on large ground surfaces with a low-frequency multiplier.
function withMacro(mat, scale = 0.02, strength = 0.4) {
  const macro = T.macro();
  mat.onBeforeCompile = (sh) => {
    sh.uniforms.macroMap = { value: macro };
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec2 vMacroPos;')
      .replace('#include <project_vertex>', '#include <project_vertex>\nvMacroPos = (modelMatrix * vec4(transformed, 1.0)).xz;');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform sampler2D macroMap;\nvarying vec2 vMacroPos;')
      .replace('#include <map_fragment>', `#include <map_fragment>
        float mA = texture2D(macroMap, vMacroPos * ${scale.toFixed(4)}).r;
        float mB = texture2D(macroMap, vMacroPos * ${(scale * 0.31).toFixed(4)} + vec2(0.37, 0.71)).r;
        diffuseColor.rgb *= mix(1.0, 0.55 + 0.5 * (mA * 0.6 + mB * 0.6), ${strength.toFixed(3)});`);
  };
  mat.customProgramCacheKey = () => `macro${scale}|${strength}`;
  return mat;
}

// Worn patches on the lawn (around tables, along paths, under bamboo), filled in by terrain.js.
export const WEAR_N = 40;
export const lawnWear = { value: Array.from({ length: WEAR_N }, () => new THREE.Vector4(0, 0, 1, 0)) };

function lawnShader(mat, soilMap) {
  const macro = T.macro();
  mat.onBeforeCompile = (sh) => {
    sh.uniforms.macroMap = { value: macro };
    sh.uniforms.soilMap = { value: soilMap };
    sh.uniforms.uWear = lawnWear;
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec2 vMacroPos;')
      .replace('#include <project_vertex>', '#include <project_vertex>\nvMacroPos = (modelMatrix * vec4(transformed, 1.0)).xz;');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>
        uniform sampler2D macroMap; uniform sampler2D soilMap; uniform vec4 uWear[${WEAR_N}];
        varying vec2 vMacroPos;`)
      .replace('#include <map_fragment>', `#include <map_fragment>
        float mA = texture2D(macroMap, vMacroPos * 0.018).r;
        float mB = texture2D(macroMap, vMacroPos * 0.0056 + vec2(0.37, 0.71)).r;
        diffuseColor.rgb *= mix(1.0, 0.6 + 0.45 * (mA * 0.6 + mB * 0.6), 0.5);
        float dryN = texture2D(macroMap, vMacroPos * 0.031 + vec2(0.13, 0.52)).r;
        diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(1.25, 1.1, 0.62), smoothstep(0.42, 0.8, dryN) * 0.7);
        float wearF = 0.0;
        for (int i = 0; i < ${WEAR_N}; i++) {
          vec4 w = uWear[i];
          float d = length(vMacroPos - w.xy) / w.z;
          wearF = max(wearF, w.w * (1.0 - smoothstep(0.25, 1.0, d)));
        }
        float bn = texture2D(macroMap, vMacroPos * 0.21).r * 0.55 + texture2D(macroMap, vMacroPos * 0.67 + 0.2).r * 0.45;
        wearF = smoothstep(0.38, 0.7, wearF * (0.25 + 1.35 * bn));
        vec3 soilC = texture2D(soilMap, vMacroPos / 1.3).rgb * vec3(0.92, 0.88, 0.84);
        diffuseColor.rgb = mix(diffuseColor.rgb, mix(soilC, diffuseColor.rgb * vec3(1.15, 1.0, 0.7), 0.25), wearF);`);
  };
  mat.customProgramCacheKey = () => 'lawn' + WEAR_N;
  return mat;
}

// Gentle sway for instanced foliage; amplitude grows with distance from the attachment point.
function withWind(mat, amp = 0.05, key = 'w') {
  const prev = mat.onBeforeCompile;
  mat.onBeforeCompile = (sh, r) => {
    if (prev) prev(sh, r);
    sh.uniforms.uWind = wind;
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nuniform float uWind;')
      .replace('#include <begin_vertex>', `#include <begin_vertex>
        #ifdef USE_INSTANCING
          vec3 wIp = vec3(instanceMatrix[3]);
        #else
          vec3 wIp = vec3(0.0);
        #endif
        float wK = clamp(length(position.xy), 0.0, 2.0);
        transformed.x += sin(uWind * 1.4 + wIp.x * 0.6 + wIp.z * 0.3) * ${amp.toFixed(3)} * wK;
        transformed.z += cos(uWind * 1.1 + wIp.z * 0.5 + wIp.x * 0.2) * ${(amp * 0.8).toFixed(3)} * wK;`);
  };
  mat.customProgramCacheKey = () => `wind${amp}${key}`;
  return mat;
}

// Lamps that glow only at night.
function lamp(color, strength) {
  const m = std({ color: '#2a2a2a', emissive: new THREE.Color(color), emissiveIntensity: 0, roughness: 0.4 });
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uNight = nightGlow;
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform float uNight;')
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>\n totalEmissiveRadiance = emissive * ${strength.toFixed(2)} * uNight;`);
  };
  m.customProgramCacheKey = () => 'lamp' + color + strength;
  return m;
}

export function createMaterials({ quality = 'high' } = {}) {
  const hq = quality !== 'low';
  // Foliage: alpha-cut cards, with a faint emissive fill so shaded leaves never go black
  // (stands in for light passing through the leaves).
  const leaf = (map, color = '#ffffff', fill = '#1d2a12') => withWind(std({
    map, color, alphaTest: 0.45, side: THREE.DoubleSide, roughness: 0.8, metalness: 0,
    emissive: new THREE.Color(fill), emissiveMap: map,
  }), 0.04, map.uuid);

  const m = {
    // ground
    grass: lawnShader(std({ map: withTexture(T.grass()), color: '#f6f2df', roughness: 0.96 }), T.soil()),
    soil: withMacro(std({ map: withTexture(T.soil()), roughness: 1 }), 0.03, 0.35),
    concrete: std({ map: withTexture(T.concrete()), roughness: 0.92 }),
    padConcrete: withMacro(std({ map: withTexture(T.concrete()), color: '#ddd6ca', roughness: 0.95 }), 0.6, 0.32),
    stone: std({ map: withTexture(T.stone()), roughness: 0.85 }),
    pavers: withMacro(std({ map: withTexture(T.pavers()), roughness: 0.9 }), 0.04, 0.3),
    forest: std({ map: withTexture(T.forest()), roughness: 1 }),
    // building shell
    plaster: std({ map: withTexture(T.plaster()), color: '#ffffff', roughness: 0.92 }),
    plasterTaupe: std({ map: withTexture(T.plaster()), color: '#9b9186', roughness: 0.95 }),
    plinth: std({ map: withTexture(T.concrete()), color: '#d2cec6', roughness: 0.95 }),
    roof: std({ map: withTexture(T.roofTiles()), roughness: 0.85 }),
    fascia: std({ color: '#4a3024', roughness: 0.8 }),
    // light bounced up from the floor keeps the ceiling from going grey
    ceiling: std({ color: '#efeee9', roughness: 0.95, emissive: new THREE.Color('#ddd6ca'), emissiveIntensity: 0.4 }),
    frame: std({ color: '#f1f1ec', roughness: 0.42, metalness: 0.1 }),
    steel: std({ color: '#c3c5c6', roughness: 0.5, metalness: 0.45 }),
    // translucent roofing sheet: glows with daylight passing through it
    pergolaRoof: std({ color: '#f6f6f2', emissive: new THREE.Color('#d9dcd8'), emissiveIntensity: 0.75, transparent: true, opacity: 0.5, roughness: 0.3, side: THREE.DoubleSide, depthWrite: false }),
    glass: new THREE.MeshPhysicalMaterial({ color: '#b9cfd2', transparent: true, opacity: 0.16, roughness: 0.03, metalness: 0, reflectivity: 0.6, depthWrite: false, side: THREE.DoubleSide }),
    poolBlue: std({ color: '#2a63ad', roughness: 0.55 }),
    water: new THREE.MeshPhysicalMaterial({ color: '#2a5559', transparent: true, opacity: 0.78, roughness: 0.04, metalness: 0.05, depthWrite: false }),
    pond: new THREE.MeshPhysicalMaterial({ color: '#1f2c22', roughness: 0.07, metalness: 0.0, clearcoat: 0.6, clearcoatRoughness: 0.05 }),
    mud: withMacro(std({ map: withTexture(T.soil()), color: '#9c8f80', roughness: 0.92 }), 0.05, 0.35),
    doorWhite: std({ color: '#eeeeea', roughness: 0.55 }),
    pipe: std({ color: '#e3e3de', roughness: 0.5 }),
    dish: std({ color: '#d8d8d4', roughness: 0.45, metalness: 0.3 }),
    // interior
    floorTile: std({ map: withTexture(T.floorTile()), roughness: 0.18, metalness: 0, envMapIntensity: 0.6 }),
    wallInner: std({ color: '#ebe6dd', roughness: 0.9 }),
    wenge: std({ map: withTexture(T.wenge()), roughness: 0.55 }),
    linen: std({ color: '#f2f2ee', roughness: 0.92 }),
    throwRed: std({ color: '#8a1f27', roughness: 0.96 }),
    blanket: std({ map: withTexture(T.blanket()), roughness: 0.95 }),
    curtain: std({ map: withTexture(T.curtainBrown()), roughness: 0.95, side: THREE.DoubleSide }),
    curtainPolka: std({ map: withTexture(T.curtainPolka()), roughness: 0.95, side: THREE.DoubleSide }),
    mirror: std({ color: '#dfe6ea', metalness: 1, roughness: 0.03 }),
    mirrorFrame: std({ map: withTexture(T.mirrorFrame()), roughness: 0.5 }),
    tv: std({ color: '#0c0d0e', roughness: 0.18, metalness: 0.2 }),
    sign: std({ map: T.sign(), roughness: 0.6 }),
    doormat: std({ map: T.doormat(), roughness: 1 }),
    bathWall: std({ map: withTexture(T.bathWall()), roughness: 0.45 }),
    bathFloor: std({ map: withTexture(T.bathFloor()), roughness: 0.35 }),
    porcelain: std({ color: '#f5f5f3', roughness: 0.12 }),
    granite: std({ color: '#1d1f20', roughness: 0.22 }),
    rod: std({ color: '#6c5c4b', roughness: 0.5, metalness: 0.3 }),
    // outdoor furniture & props
    rootWood: std({ map: withTexture(T.rootWood()), roughness: 0.8 }),
    chairBlue: std({ color: '#1f98d0', roughness: 0.42, side: THREE.DoubleSide }),
    chairYellow: std({ color: '#efbd18', roughness: 0.45, side: THREE.DoubleSide }),
    chairWhite: std({ color: '#e8e8e4', roughness: 0.45, side: THREE.DoubleSide }),
    alu: std({ color: '#b8bcc0', roughness: 0.35, metalness: 0.7 }),
    tableTop: std({ color: '#232826', roughness: 0.2, metalness: 0.05 }),
    black: std({ color: '#1b1b1b', roughness: 0.7 }),
    // canvas umbrellas glow a little underneath, as sunlit fabric does
    umbrella: std({ map: withTexture(T.fabric()), color: '#f3efe4', roughness: 0.9, side: THREE.DoubleSide, emissive: new THREE.Color('#cbc5b4'), emissiveMap: null, emissiveIntensity: 0.5 }),
    pole: std({ color: '#e6e8e9', roughness: 0.4, metalness: 0.3 }),
    net: std({ map: T.net(), alphaTest: 0.4, side: THREE.DoubleSide, roughness: 0.8, transparent: false }),
    netBand: std({ color: '#f4f4f1', roughness: 0.7 }),
    log: std({ map: withTexture(T.bark()), color: '#a58a6a', roughness: 0.95 }),
    branch: std({ color: '#5f4c3a', roughness: 1 }),
    ash: std({ color: '#6a6560', roughness: 1 }),
    rim: std({ color: '#4d3a2f', roughness: 0.6, metalness: 0.4 }),
    pot: std({ color: '#1d1e1d', roughness: 0.55 }),
    lampBody: std({ color: '#3a3d40', roughness: 0.5, metalness: 0.4 }),
    floodLens: lamp('#f4f8ff', 6),
    warmLens: lamp('#ffb95c', 5),
    tubeLight: std({ color: '#ffffff', emissive: new THREE.Color('#ffffff'), emissiveIntensity: 1.6 }),
    // vegetation
    culm: std({ map: withTexture(T.culm()), roughness: 0.55 }),
    bark: std({ map: withTexture(T.bark()), roughness: 0.95 }),
    bambooLeaf: leaf(T.bambooLeaves(), '#f2f6e4', '#2a3d18'),
    treeLeaf: leaf(T.treeLeaves(), '#ffffff', '#1a2711'),
    broadLeaf: leaf(T.broadLeaves(), '#eef4e2', '#22331a'),
    spider: withWind(std({ map: T.spiderPlant(), alphaTest: 0.4, side: THREE.DoubleSide, roughness: 0.8 }), 0.02, 'spider'),
    reed: std({ color: '#6c7f3c', roughness: 0.9, side: THREE.DoubleSide }),
    shrub: leaf(T.treeLeaves(), '#e2ecd0', '#1c2a12'),
    blade: std({ color: '#ffffff', roughness: 0.9, side: THREE.DoubleSide, emissive: new THREE.Color('#1c2410') }),
  };
  // Ground layers are drawn first, in a fixed order, each simply covering the one below.
  // This keeps flat, overlapping ground surfaces free of depth fighting on any GPU.
  const layer = (mat, order, always = true) => { mat.userData.layer = order; if (always) mat.depthFunc = THREE.AlwaysDepth; };
  layer(m.soil, -6, false); layer(m.grass, -5); layer(m.pavers, -4); layer(m.mud, -4); layer(m.pond, -3);
  if (!hq) { m.glass.opacity = 0.2; }
  // Interior surfaces see little of the sky: keep the outdoor environment light off them.
  for (const [k, v] of [['ceiling', 0.12], ['wallInner', 0.3], ['linen', 0.55], ['bathWall', 0.45], ['wenge', 0.6], ['doorWhite', 0.6], ['throwRed', 0.5], ['curtain', 0.5]]) m[k].envMapIntensity = v;
  // Shadows of alpha-cut leaves need their own depth material.
  for (const k of ['bambooLeaf', 'treeLeaf', 'broadLeaf', 'shrub', 'spider', 'net']) {
    m[k + 'Depth'] = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map: m[k].map, alphaTest: m[k].alphaTest });
  }
  return m;
}

// Scales a material's texture repeat for metre-based UVs (repeat = 1 / tile size in metres).
export function tile(mat, metres) {
  if (mat.map) mat.map.repeat.set(1 / metres, 1 / metres);
  return mat;
}
