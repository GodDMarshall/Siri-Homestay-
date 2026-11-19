// Studio: renders the code-built estate from a named view, for stills and side-by-side checks.
// Used by scripts/render-views.mjs; also handy in a browser: /world/studio.html?view=villa-bedroom
import { createWorld } from '/js/world.js';

const params = new URLSearchParams(location.search);
const canvas = document.getElementById('studio-canvas');
const status = document.getElementById('studio-status');
const t0 = performance.now();
window.studio = { ready: false };
try {
  const world = await createWorld(canvas, {
    quality: params.get('q') || 'ultra',
    view: params.get('view') || 'aerial',
    preserveDrawingBuffer: true,
    pixelRatio: params.has('pr') ? Number(params.get('pr')) : null,
    onProgress: (p, what) => { status.textContent = `Building the estate… ${Math.round(p * 100)}% (${what})`; },
  });
  const buildMs = Math.round(performance.now() - t0);
  status.textContent = `Ready in ${buildMs} ms — ${world.quality}`;
  if (params.has('hide')) status.hidden = true;
  window.studio = {
    ready: true, world, buildMs,
    shot({ view, w, h, preset, pos, target, fov, door, hide = [], noShadow = false, type = 'image/png' }) {
      world.scene.traverse((o) => { if (o.userData.__hidden) { o.visible = true; o.userData.__hidden = false; } });
      for (const n of hide) world.scene.traverse((o) => { if (o.name === n) { o.visible = false; o.userData.__hidden = true; } });
      world.renderer.shadowMap.enabled = !noShadow;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      world.resize(w, h);
      if (view) world.setView(view);
      if (pos || target || fov !== undefined || door !== undefined) {
        const s = world.state;
        if (pos) s.pos.set(...pos);
        if (target) s.target.set(...target);
        if (fov !== undefined) s.fov = fov;
        if (door !== undefined) world.setDoor(door); else world.setDoor(s.door);
      }
      if (preset) world.setPreset(preset);
      const t = performance.now();
      world.render();
      const url = canvas.toDataURL(type, 0.95);
      return { url, ms: Math.round(performance.now() - t) };
    },
    info() {
      const r = world.renderer.info;
      return { calls: r.render.calls, triangles: r.render.triangles, geometries: r.memory.geometries, textures: r.memory.textures, programs: r.programs?.length };
    },
  };
} catch (e) {
  status.textContent = 'Could not start WebGL: ' + e.message;
  window.studio = { ready: false, error: String(e && e.stack || e) };
}
