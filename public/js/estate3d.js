/* Siri Homestay in 3D. The estate is generated in code (no photographs) by /js/world.js,
   which is loaded only when it is about to be seen. One WebGL canvas is shared by every
   stage on a page: the home hero, the scroll walk to the villa, the room entry, the tours
   and the explorer. Without WebGL, with reduced motion or with data saver on, the rendered
   stills already in the page are all that is shown. */
const doc = document, root = doc.documentElement;
const SH = (window.SH = window.SH || {});
const me = doc.querySelector('script[data-world]');
const WORLD_URL = me ? me.getAttribute('data-world') : '/js/world.js';

// 'gpu' | 'software' | null. A software renderer (no usable graphics card) would make the
// page sluggish, so it gets the stills unless 3D is forced (localStorage sh-3d=force, used in QA).
function glKind() {
  try {
    const c = doc.createElement('canvas'), gl = c.getContext('webgl2') || c.getContext('webgl');
    if (!gl) return null;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const name = String(ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER));
    const lose = gl.getExtension('WEBGL_lose_context'); if (lose) lose.loseContext();
    return /swiftshader|llvmpipe|softpipe|software|basic render/i.test(name) ? 'software' : 'gpu';
  } catch (e) { return null; }
}
let forced = false, quality = 'auto';
try {
  forced = localStorage.getItem('sh-3d') === 'force';
  quality = localStorage.getItem('sh-3d-quality') || 'auto'; // low | medium | high, for testing
} catch (e) { /* storage blocked */ }
const conn = navigator.connection;
const lite = !!(conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || '')));
const reduce = root.classList.contains('reduce-motion');
const gl = reduce || lite ? null : glKind();
const able = gl === 'gpu' || (gl === 'software' && forced);
if (able) root.classList.add('can-3d');

let worldP = null, world = null, canvas = null, host = null, owner = null;
const parked = doc.createElement('div');
parked.className = 'world-park';
parked.setAttribute('aria-hidden', 'true');

function load() {
  if (!able) return Promise.reject(new Error('3D not available'));
  if (!worldP) {
    worldP = import(WORLD_URL).then(async (m) => {
      canvas = doc.createElement('canvas');
      canvas.className = 'world-canvas';
      canvas.setAttribute('aria-hidden', 'true');
      doc.body.appendChild(parked);
      parked.appendChild(canvas);
      world = await m.createWorld(canvas, { quality, view: 'lawn-stepping-stones', maxFps: 60 });
      root.classList.add('has-world');
      return world;
    }).catch((e) => { root.classList.add('no-world'); throw e; });
  }
  return worldP;
}

// Moves the shared canvas into a stage. `who` is the stage object; the previous owner is
// told to let go.
function mount(el, who) {
  if (!world) return null;
  if (owner && owner !== who && owner.release) owner.release();
  owner = who || null;
  if (canvas.parentNode !== el) el.appendChild(canvas);
  host = el;
  world.live = false; world.onFrame = null; world.keepAlive = false; world.maxFps = 60;
  world.resize();
  world.invalidate();
  return world;
}
function release(who) {
  if (owner !== who) return;
  owner = null;
  if (world) { world.live = false; world.onFrame = null; }
  if (canvas && canvas.parentNode !== parked) parked.appendChild(canvas);
  host = null;
}
window.addEventListener('resize', () => { if (world && host) world.resize(); });
doc.addEventListener('visibilitychange', () => {
  if (!world) return;
  if (doc.hidden) world.live = false;
  else if (owner && owner.resume) owner.resume();
});

SH.world = { able, load, mount, release, get world() { return world; }, owns: (who) => owner === who };

const idle = (fn, t = 900) => ('requestIdleCallback' in window ? requestIdleCallback(fn, { timeout: t }) : setTimeout(fn, 300));
const onScreen = (el) => { const r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; };

// ---------------------------------------------------------------- home hero: the live lawn
const hero = doc.querySelector('[data-hero3d]');
let heroStage = null;
if (hero && able) {
  let t = 0, slow = false;
  heroStage = {
    release() { hero.classList.remove('is-live'); },
    resume() { if (world && owner === heroStage && onScreen(hero) && !slow) { world.live = true; world.start(); } },
    show() {
      if (!world) return;
      mount(hero, heroStage);
      world.setView(hero.getAttribute('data-hero3d'));
      world.maxFps = 40;
      // If the device can't keep up, stop the motion and keep the still in front.
      const gaps = []; let prev = 0;
      world.onFrame = (dt) => {
        const now = performance.now();
        if (prev) gaps.push(now - prev); prev = now;
        if (gaps.length === 12) {
          const sorted = gaps.slice().sort((a, b) => a - b);
          if (sorted[6] > 110) { slow = true; world.live = false; hero.classList.remove('is-live'); return; }
        }
        t += dt; world.setPathProgress('drift', 0.5 - 0.5 * Math.cos(t * 0.05));
      };
      if (!slow) requestAnimationFrame(() => hero.classList.add('is-live'));
      heroStage.resume();
    },
  };
  const begin = () => load().then(() => { if (!owner && onScreen(hero)) heroStage.show(); }).catch(() => {});
  const start = () => idle(begin);
  if (doc.readyState === 'complete') start(); else window.addEventListener('load', start, { once: true });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((en) => en.forEach((e) => {
      if (!world || owner !== heroStage) return;
      world.live = e.isIntersecting && !doc.hidden;
      if (world.live) world.start();
    })).observe(hero);
  }
}

// ---------------------------------------------------------------- the walk to the villa, driven by scroll
const walk = doc.querySelector('[data-walk3d]');
if (walk && able) {
  const frame = walk.querySelector('.walk__frame');
  const stage = { release() { walk.classList.remove('is-live'); } };
  const ease = (x) => x * x * (3 - 2 * x);
  const SPLIT = 0.64; // the first part crosses the lawn; the rest goes through the door to the bed
  function draw() {
    const p = SH.progress(walk);
    if (p < SPLIT) world.setPathProgress('arrival', ease(p / SPLIT), { door: 0 });
    else {
      const q = (p - SPLIT) / (1 - SPLIT);
      world.setPathProgress('enter', ease(Math.min(1, q * 1.08)), { door: Math.min(1, q / 0.3) });
    }
    world.invalidate();
  }
  function check() {
    const r = walk.getBoundingClientRect();
    const inView = r.top < innerHeight * 0.65 && r.bottom > innerHeight * 0.35;
    if (inView) {
      if (!world) { load().then(check).catch(() => {}); return; }
      if (owner !== stage) { mount(frame, stage); walk.classList.add('is-live'); }
      draw();
    } else if (owner === stage) {
      release(stage);
      if (heroStage && r.top > 0 && onScreen(hero)) heroStage.show();
    } else if (heroStage && !owner && world && onScreen(hero)) heroStage.show();
  }
  (SH.scenes = SH.scenes || []).push(check);
  // start loading as soon as the visitor heads down the page
  window.addEventListener('scroll', () => load().catch(() => {}), { passive: true, once: true });
  check();
}

// ---------------------------------------------------------------- the walk without 3D: rendered stills
if (walk && !able) {
  const stills = Array.from(walk.querySelectorAll('.walk__still'));
  (SH.scenes = SH.scenes || []).push(() => {
    if (reduce) return;
    const p = SH.progress(walk);
    stills.forEach((s) => s.classList.toggle('is-on', p >= +s.dataset.from && p < +s.dataset.to));
  });
}

// ---------------------------------------------------------------- walk beats and progress (both modes)
if (walk) {
  const beats = Array.from(walk.querySelectorAll('.beat'));
  const stage = walk.querySelector('.walk__stage');
  (SH.scenes = SH.scenes || []).push(() => {
    if (reduce) return;
    const r = walk.getBoundingClientRect();
    if (r.bottom < -50 || r.top > innerHeight + 50) return;
    const p = SH.progress(walk);
    beats.forEach((b) => b.classList.toggle('is-on', p >= +b.dataset.from && p < +b.dataset.to));
    stage.style.setProperty('--p', p.toFixed(3));
  });
}
