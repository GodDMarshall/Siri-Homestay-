/* The home page journey. Scrolling moves a camera through the estate: each chapter's picture
   fills the screen as a mesh shaped by its depth map; the camera rests while its words are read,
   then moves into the picture towards the next place, which arrives nearest things first. Without WebGL, with reduced motion or without JavaScript the chapters are shown as
   plain pictures with their words. three.js is loaded only here (public/js/vendor). */
(function () {
  'use strict';
  var doc = document, win = window, SH = win.SH || {};
  var root = doc.querySelector('[data-fly]');
  if (!root || SH.reduce) return;
  var probe = doc.createElement('canvas');
  if (!probe.getContext('webgl2')) return;
  import('/js/vendor/three-0.187.0/three.module.js').then(start, function () {});

  function start(T) {
    var clamp = function (x, a, b) { return x < a ? a : x > b ? b : x; };
    var smooth = function (a, b, x) { var t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
    var els = [].slice.call(root.querySelectorAll('[data-chapter]'));
    var N = els.length, D = 5.2, FOV = 50;
    T.ColorManagement.enabled = false;
    var renderer;
    try { renderer = new T.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' }); } catch (e) { return; }
    renderer.outputColorSpace = T.LinearSRGBColorSpace;
    renderer.autoClear = false;
    renderer.setClearColor(0x05080a, 1);
    var gl = renderer.getContext(), info = gl.getExtension('WEBGL_debug_renderer_info');
    var soft = /swiftshader|llvmpipe|software/i.test(info ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL) : '');
    renderer.setPixelRatio(soft ? 0.6 : Math.min(win.devicePixelRatio || 1, 1.5));
    var canvas = renderer.domElement;
    canvas.className = 'fly__canvas';
    canvas.setAttribute('aria-hidden', 'true');
    root.insertBefore(canvas, root.firstChild);
    var scene = new T.Scene(), camera = new T.PerspectiveCamera(FOV, 1, 0.05, 60), res = new T.Vector2(1, 1);

    // Each picture is a fine grid pushed along the rays from where it was taken, so moving
    // the camera into it shows real depth. The next picture arrives nearest things first.
    var VS = [
      'uniform sampler2D dep; uniform vec2 uSize; uniform float uD;',
      'varying vec2 vUv; varying float vN;',
      'void main() {',
      '  vUv = uv; vN = texture2D(dep, uv).r;',
      '  vec3 c = vec3(0.0, 0.0, uD);',
      '  vec3 p = c + (vec3(position.xy * uSize, 0.0) - c) * mix(1.32, 0.86, vN);',
      '  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);',
      '}'].join('\n');
    var FS = [
      'uniform sampler2D map; uniform float uMix; uniform vec2 uRes;',
      'varying vec2 vUv; varying float vN;',
      'void main() {',
      '  vec3 col = texture2D(map, vUv).rgb;',
      '  col = mix(col, col * col * (3.0 - 2.0 * col), 0.22);',
      '  float l = dot(col, vec3(0.2126, 0.7152, 0.0722));',
      '  col += (1.0 - l) * (1.0 - l) * vec3(-0.018, 0.0, 0.022) + l * l * vec3(0.03, 0.012, -0.02);',
      '  vec2 q = gl_FragCoord.xy / uRes - 0.5;',
      '  col *= 1.0 - 0.38 * pow(length(q) * 1.3, 2.4);',
      '  float a = uMix >= 1.0 ? 1.0 : smoothstep(0.0, 1.0, uMix * 1.7 - (1.0 - vN) * 0.7);',
      '  gl_FragColor = vec4(col, a);',
      '}'].join('\n');
    var geo = new T.PlaneGeometry(1, 1, soft ? 80 : 200, soft ? 60 : 150);
    var loader = new T.TextureLoader();
    var big = win.innerWidth * Math.min(win.devicePixelRatio || 1, 2) > 1500;
    var frames = els.map(function (el) {
      var f = (el.getAttribute('data-focus') || '0.5 0.5').split(' ').map(parseFloat);
      return { el: el, ar: parseFloat(el.getAttribute('data-ar')) || 4 / 3, fx: f[0], fy: f[1], mesh: null, asked: false };
    });
    function load(f) {
      if (!f || f.asked) return;
      f.asked = true;
      var left = 2, map, dep;
      function done() {
        if (--left) return;
        f.mat = new T.ShaderMaterial({ vertexShader: VS, fragmentShader: FS, transparent: true,
          uniforms: { map: { value: map }, dep: { value: dep }, uSize: { value: new T.Vector2(1, 1) }, uD: { value: D }, uMix: { value: 1 }, uRes: { value: res } } });
        f.mesh = new T.Mesh(geo, f.mat);
        f.mesh.visible = false;
        scene.add(f.mesh);
        fit(f);
        kick();
      }
      map = loader.load(f.el.getAttribute(big && f.el.getAttribute('data-photo-lg') ? 'data-photo-lg' : 'data-photo'), done, undefined, done);
      dep = loader.load(f.el.getAttribute('data-depth'), done, undefined, done);
      map.colorSpace = dep.colorSpace = T.NoColorSpace;
      map.anisotropy = 4;
      dep.minFilter = T.LinearFilter; dep.generateMipmaps = false;
    }
    function fit(f) {
      if (!f.mesh) return;
      var vh = 2 * D * Math.tan(FOV * Math.PI / 360), vw = vh * camera.aspect;
      f.h = Math.max(vh, vw / f.ar) * 1.1; f.w = f.h * f.ar;
      f.mat.uniforms.uSize.value.set(f.w, f.h);
    }
    // Camera k of the way (0..1) from the resting point into the picture, towards (u, v).
    var aim = new T.Vector3();
    function cam(f, k, u, v) {
      var x = (u - 0.5) * f.w, y = (0.5 - v) * f.h;
      camera.position.set(x * k * 0.8 + ptr.x * 0.22, y * k * 0.8 - ptr.y * 0.13, D * (1 - 0.55 * k));
      camera.lookAt(aim.set(x * k, y * k, 0));
    }

    var target = 0, at = 0, ptr = new T.Vector2(), ptrT = new T.Vector2(), active = -1;
    var rail = [].slice.call(root.querySelectorAll('[data-rail] a'));
    function readScroll() {
      var r = root.getBoundingClientRect(), total = Math.max(1, root.offsetHeight - win.innerHeight);
      var c = clamp(-r.top / total, 0, 1) * (N - 1), i = Math.floor(c), u = c - i;
      target = i + smooth(0.3, 1, u); // hold on each picture while its words are read, then move in
    }
    function draw() {
      var i = Math.min(N - 1, Math.floor(at)), u = at - i, a = frames[i], b = frames[i + 1];
      for (var j = Math.max(0, i - 1); j <= Math.min(N - 1, i + 2); j++) load(frames[j]);
      renderer.clear();
      if (a.mesh) {
        cam(a, smooth(0, 1, u), a.fx, a.fy);
        a.mat.uniforms.uMix.value = 1;
        a.mesh.visible = true; renderer.render(scene, camera); a.mesh.visible = false;
      }
      var mixv = b && b.mesh ? smooth(0.42, 0.96, u) : 0;
      if (mixv > 0) {
        renderer.clearDepth();
        cam(b, 0.38 * (1 - smooth(0.42, 1, u)), 0.5, 0.5);
        b.mat.uniforms.uMix.value = Math.min(0.999, mixv);
        b.mesh.visible = true; renderer.render(scene, camera); b.mesh.visible = false;
      }
      var now = clamp(Math.round(at), 0, N - 1);
      if (now !== active) {
        if (active >= 0) els[active].classList.remove('is-active');
        els[now].classList.add('is-active');
        rail.forEach(function (x, j) { if (j === now) x.setAttribute('aria-current', 'step'); else x.removeAttribute('aria-current'); });
        active = now;
      }
    }
    function resize() {
      var w = win.innerWidth, h = win.innerHeight;
      renderer.setSize(w, h, false);
      res.set(w * renderer.getPixelRatio(), h * renderer.getPixelRatio());
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      frames.forEach(fit);
      kick();
    }
    var raf = 0, visible = true, last = 0;
    function kick() { if (!raf && visible && !doc.hidden) raf = win.requestAnimationFrame(frame); }
    function frame(t) {
      raf = 0;
      var dt = last ? Math.min(0.05, (t - last) / 1000) : 0.016;
      last = t;
      at += (target - at) * Math.min(1, dt * 4.5);
      if (Math.abs(target - at) < 0.0004) at = target;
      ptr.lerp(ptrT, Math.min(1, dt * 3));
      draw();
      if (at !== target || ptr.distanceTo(ptrT) > 0.001) kick();
    }
    win.addEventListener('scroll', function () { readScroll(); kick(); }, { passive: true });
    win.addEventListener('resize', resize);
    if (win.matchMedia('(pointer: fine)').matches) {
      win.addEventListener('pointermove', function (e) { ptrT.set(e.clientX / win.innerWidth * 2 - 1, e.clientY / win.innerHeight * 2 - 1); kick(); }, { passive: true });
    }
    doc.addEventListener('visibilitychange', kick);
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; root.classList.toggle('is-away', !visible); kick(); }).observe(root);
    readScroll();
    at = target;
    resize();
    root.classList.add('is-live');
    kick();
  }
})();
