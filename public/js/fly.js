/* The home page journey. A camera flies through the estate as you scroll: each chapter's
   picture is a mesh shaped by its depth map, floating in fog among drifting motes of light.
   The camera rests in front of a picture while its words are read, then flies into it on to
   the next. Without WebGL, with reduced motion or without JavaScript the chapters are shown as
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
    var N = els.length, GAP = 15, D = 5.2, FOV = 50;
    T.ColorManagement.enabled = false;
    var renderer;
    try { renderer = new T.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' }); } catch (e) { return; }
    renderer.outputColorSpace = T.LinearSRGBColorSpace;
    var gl = renderer.getContext(), info = gl.getExtension('WEBGL_debug_renderer_info');
    var soft = /swiftshader|llvmpipe|software/i.test(info ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL) : '');
    renderer.setPixelRatio(soft ? 0.6 : Math.min(win.devicePixelRatio || 1, 1.5));
    var canvas = renderer.domElement;
    canvas.className = 'fly__canvas';
    canvas.setAttribute('aria-hidden', 'true');
    root.insertBefore(canvas, root.firstChild);

    var scene = new T.Scene(), camera = new T.PerspectiveCamera(FOV, 1, 0.05, 140);
    var DAY = new T.Color(0x0c1612), NIGHT = new T.Color(0x05080f), sky = DAY.clone();
    scene.background = sky;
    var fog = { value: sky }, density = { value: 0.052 };
    var nightAt = els.findIndex(function (el) { return el.hasAttribute('data-night'); });
    if (nightAt < 0) nightAt = N + 1;

    // ---- pictures: a fine grid pushed along the rays from where the photo was taken
    var size = new T.Vector2(1, 1);
    var VS = [
      'uniform sampler2D dep; uniform vec2 uSize; uniform float uD; uniform float uRelief;',
      'varying vec2 vUv; varying float vDist;',
      'void main() {',
      '  vUv = uv;',
      '  float n = texture2D(dep, uv).r;',
      '  vec3 c = vec3(0.0, 0.0, uD);',
      '  vec3 p = c + (vec3(position.xy * uSize, 0.0) - c) * mix(1.0 + uRelief, 1.0 - uRelief * 0.42, n);',
      '  vec4 mv = modelViewMatrix * vec4(p, 1.0);',
      '  vDist = -mv.z;',
      '  gl_Position = projectionMatrix * mv;',
      '}'].join('\n');
    var FS = [
      'uniform sampler2D map; uniform float uOpacity; uniform vec3 uFog; uniform float uDensity;',
      'varying vec2 vUv; varying float vDist;',
      'void main() {',
      '  vec3 col = texture2D(map, vUv).rgb;',
      '  float e = smoothstep(0.0, 0.045, vUv.x) * smoothstep(0.0, 0.045, 1.0 - vUv.x) * smoothstep(0.0, 0.06, vUv.y) * smoothstep(0.0, 0.06, 1.0 - vUv.y);',
      '  float f = 1.0 - exp(-uDensity * uDensity * vDist * vDist);',
      '  gl_FragColor = vec4(mix(col, uFog, f), uOpacity * e);',
      '}'].join('\n');
    var geo = new T.PlaneGeometry(1, 1, soft ? 80 : 180, soft ? 60 : 135);
    var loader = new T.TextureLoader();
    var big = win.innerWidth * Math.min(win.devicePixelRatio || 1, 2) > 1700;
    var frames = els.map(function (el, i) {
      var g = new T.Group();
      g.position.set(i ? Math.sin(i * 1.7) * 1.7 : 0, i ? Math.cos(i * 1.1) * 0.4 : 0, -i * GAP);
      scene.add(g);
      return { el: el, g: g, ar: parseFloat(el.getAttribute('data-ar')) || 4 / 3, mesh: null, asked: false };
    });
    function load(f) {
      if (f.asked) return;
      f.asked = true;
      var left = 2, map, dep;
      function done() {
        if (--left) return;
        var m = new T.ShaderMaterial({
          vertexShader: VS, fragmentShader: FS, transparent: true,
          uniforms: { map: { value: map }, dep: { value: dep }, uSize: { value: new T.Vector2(1, 1) }, uD: { value: D },
            uRelief: { value: 0.55 }, uOpacity: { value: 0 }, uFog: fog, uDensity: density },
        });
        f.mesh = new T.Mesh(geo, m);
        f.g.add(f.mesh);
        fit(f);
        f.el.classList.add('is-ready');
        kick();
      }
      map = loader.load(f.el.getAttribute(big && f.el.getAttribute('data-photo-lg') ? 'data-photo-lg' : 'data-photo'), done, undefined, done);
      dep = loader.load(f.el.getAttribute('data-depth'), done, undefined, done);
      map.colorSpace = dep.colorSpace = T.NoColorSpace;
      map.anisotropy = 4;
      dep.minFilter = T.LinearFilter; dep.generateMipmaps = false;
    }
    // Size each picture to fill the screen from its resting point.
    function fit(f) {
      if (!f.mesh) return;
      var vh = 2 * D * Math.tan(FOV * Math.PI / 360), vw = vh * camera.aspect;
      var h = Math.max(vh, vw / f.ar) * 1.06;
      f.mesh.material.uniforms.uSize.value.set(h * f.ar, h);
    }

    // ---- motes of light drifting through the whole journey
    var M = soft ? 500 : 1600, pos = new Float32Array(M * 3), seed = new Float32Array(M);
    for (var k = 0; k < M; k++) {
      pos[k * 3] = (Math.random() - 0.5) * 16;
      pos[k * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[k * 3 + 2] = D + 3 - Math.random() * ((N - 1) * GAP + 10);
      seed[k] = Math.random();
    }
    var pg = new T.BufferGeometry();
    pg.setAttribute('position', new T.BufferAttribute(pos, 3));
    pg.setAttribute('seed', new T.BufferAttribute(seed, 1));
    var motes = { uTime: { value: 0 }, uColor: { value: new T.Color(0xe9c46a) }, uGain: { value: 0.55 }, uScale: { value: 1 } };
    scene.add(new T.Points(pg, new T.ShaderMaterial({
      uniforms: motes, transparent: true, depthWrite: false, blending: T.AdditiveBlending,
      vertexShader: [
        'uniform float uTime; uniform float uScale; attribute float seed; varying float vA;',
        'void main() {',
        '  vec3 p = position;',
        '  p.y += mod(uTime * (0.05 + seed * 0.08) + seed * 8.0, 8.0) - 4.0;',
        '  p.x += sin(uTime * 0.25 + seed * 40.0) * 0.3;',
        '  vec4 mv = modelViewMatrix * vec4(p, 1.0);',
        '  gl_PointSize = uScale * (18.0 + 40.0 * seed) / -mv.z;',
        '  vA = (0.3 + 0.7 * abs(sin(uTime * (0.6 + seed) + seed * 30.0))) * smoothstep(34.0, 3.0, -mv.z) * smoothstep(0.2, 1.2, -mv.z);',
        '  gl_Position = projectionMatrix * mv;',
        '}'].join('\n'),
      fragmentShader: [
        'uniform vec3 uColor; uniform float uGain; varying float vA;',
        'void main() { float d = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.0, d); gl_FragColor = vec4(uColor * uGain * a * a * vA, 1.0); }'].join('\n'),
    })));

    // ---- scroll, pointer, chapters
    var target = 0, at = 0, ptr = new T.Vector2(), ptrT = new T.Vector2(), active = -1;
    function readScroll() {
      var r = root.getBoundingClientRect(), total = Math.max(1, root.offsetHeight - win.innerHeight);
      var c = clamp(-r.top / total, 0, 1) * (N - 1), i = Math.floor(c), u = c - i;
      target = i + smooth(0.32, 1, u); // rest in front of each picture, then fly
    }
    var A = new T.Vector3(), B = new T.Vector3(), look = new T.Vector3(), tmp = new T.Vector3();
    function viewPoint(i, out) { return out.copy(frames[clamp(i, 0, N - 1)].g.position).setZ(frames[clamp(i, 0, N - 1)].g.position.z + D); }
    function place() {
      var i = Math.min(N - 1, Math.floor(at)), u = at - i;
      viewPoint(i, A); viewPoint(i + 1, B);
      camera.position.lerpVectors(A, B, u);
      camera.position.y += Math.sin(u * Math.PI) * 0.35;
      camera.position.x += ptr.x * 0.32; camera.position.y -= ptr.y * 0.18;
      look.copy(frames[i].g.position).lerp(frames[Math.min(N - 1, i + 1)].g.position, smooth(0.25, 0.85, u));
      look.x += ptr.x * 0.12; look.y -= ptr.y * 0.06;
      camera.lookAt(look);
      frames.forEach(function (f, j) {
        if (Math.abs(j - at) < 2.2) load(f);
        if (!f.mesh) return;
        var dz = camera.position.z - f.g.position.z;
        f.mesh.visible = dz > 0.25 && dz < GAP * 2.6;
        f.mesh.material.uniforms.uOpacity.value = smooth(0.3, 2.4, dz);
      });
      var night = smooth(nightAt - 0.9, nightAt - 0.1, at);
      sky.copy(DAY).lerp(NIGHT, night);
      density.value = 0.052 + night * 0.012;
      motes.uGain.value = 0.55 + night * 0.9;
      motes.uColor.value.setHex(night > 0.5 ? 0xf3d77c : 0xe9c46a);
      var now = clamp(Math.round(at), 0, N - 1);
      if (now !== active) {
        if (active >= 0) els[active].classList.remove('is-active');
        els[now].classList.add('is-active');
        root.style.setProperty('--chapter', now);
        rail.forEach(function (a, j) { if (j === now) a.setAttribute('aria-current', 'step'); else a.removeAttribute('aria-current'); });
        active = now;
      }
    }
    var rail = [].slice.call(root.querySelectorAll('[data-rail] a'));

    function resize() {
      var w = win.innerWidth, h = win.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      motes.uScale.value = h / 900 * renderer.getPixelRatio();
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
      ptr.lerp(ptrT, Math.min(1, dt * 3));
      motes.uTime.value = t / 1000;
      place();
      renderer.render(scene, camera);
      var moving = Math.abs(target - at) > 0.0005 || ptr.distanceTo(ptrT) > 0.001;
      if (!soft || moving) kick();
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
    load(frames[0]);
    if (frames[1]) load(frames[1]);
    kick();
  }
})();
