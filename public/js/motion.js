/* Siri Homestay: motion. Every picture is a real photo; a depth map made from each photo
   (scripts/build-depth.py) lets it move like the real place when the camera drifts.
     - [data-motion] photos (home hero, room heroes, estate header): the photo in 3D, drifting,
       following the pointer and pushing in as the page scrolls
     - [data-tour] home tour: one stop per photo, each with its own camera move, flowing into
       the next stop with a 3D transition
     - [data-strip] room photos: a 3D carousel turned by scrolling
     - headings rise into place, photo cards tilt toward the pointer, framed photos parallax
   Nothing runs with reduced motion. Without WebGL the tour cross-fades and the rest still works.
   No dependencies. */
(function () {
  'use strict';
  var doc = document;
  var SH = window.SH;
  if (!SH || SH.reduce || !SH.progress) return;
  var fineHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var clamp = function (x, a, b) { return x < a ? a : x > b ? b : x; };
  var smooth = function (a, b, x) { var t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  var ease = function (t) { return t * t * (3 - 2 * t); };
  var lerp = function (a, b, t) { return a + (b - a) * t; };

  // ===================================================================== WebGL depth photos
  var VS = 'attribute vec2 p;varying vec2 v;void main(){v=p*.5+.5;gl_Position=vec4(p,0.,1.);}';
  // For each pixel, march from near to far through the depth map to find which point of the
  // photo the moved camera would see there (parallax occlusion), so near things cover far ones.
  function fragmentShader(steps) { return [
    'precision highp float;',
    'varying vec2 v;',
    'uniform sampler2D i0,d0,i1,d1;',
    'uniform vec4 f0,f1;', // photo fit: xy scale, zw offset
    'uniform vec4 c0,c1;', // camera: xy shift, z push-in, w depth that stays still
    'uniform float mixv;',
    'vec3 scene(sampler2D img, sampler2D dep, vec4 f, vec4 c, vec2 p, out float dd) {',
    '  vec2 ctr = vec2(.5) * f.xy + f.zw;',
    '  vec2 q0 = p * f.xy + f.zw;',
    '  vec2 prevQ = q0; float prevDiff = -1.; vec2 hq = q0; float hd = 0.;',
    '  for (int i = 0; i <= ' + steps + '; i++) {',
    '    float L = 1. - float(i) / ' + steps + '.;',
    '    vec2 q = ctr + (q0 - ctr - c.xy * (L - c.w)) / (1. + c.z * L);',
    '    float d = texture2D(dep, q).r;',
    '    float diff = d - L;',
    '    if (diff >= 0.) {',
    '      float t = i == 0 ? 1. : clamp(prevDiff / (prevDiff - diff), 0., 1.);',
    '      hq = mix(prevQ, q, t); hd = d; break;',
    '    }',
    '    prevQ = q; prevDiff = diff; hq = q; hd = d;',
    '  }',
    '  dd = hd;',
    '  return texture2D(img, hq).rgb;',
    '}',
    'void main() {',
    '  float a0, a1;',
    '  vec3 col = scene(i0, d0, f0, c0, v, a0);',
    '  if (mixv > 0.) {',
    '    vec3 b = scene(i1, d1, f1, c1, v, a1);',
    // the next place arrives near-first: its foreground appears, then what lies behind
    '    float m = smoothstep(0., 1., mixv * 1.7 - (1. - a1) * .7);',
    '    col = mix(col, b, m);',
    '  }',
    '  gl_FragColor = vec4(col, 1.);',
    '}',
  ].join('\n'); }

  var AMP = 0.026; // sideways camera move at full strength, as a share of the photo
  var FOCUS = 0.35; // depth that stays still; nearer moves with the camera, farther against it
  var OVER = 1.1; // slight overscan so the edges of the photo never show

  function softwareGL(gl) {
    try {
      var ext = gl.getExtension('WEBGL_debug_renderer_info');
      var r = String(gl.getParameter(ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER));
      return /swiftshader|llvmpipe|softpipe|software|basic render/i.test(r);
    } catch (e) { return true; }
  }

  // opts.steps: depth layers marched per pixel (more for bigger camera moves).
  function Stage(canvas, opts) {
    var gl = canvas.getContext('webgl', { antialias: false, alpha: false, depth: false, stencil: false, powerPreference: 'high-performance' });
    if (!gl) throw new Error('no webgl');
    function sh(type, src) {
      var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
      return s;
    }
    var prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fragmentShader((opts && opts.steps) || 22)));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
    gl.useProgram(prog);
    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    var u = {};
    ['i0', 'd0', 'i1', 'd1', 'f0', 'f1', 'c0', 'c1', 'mixv'].forEach(function (n) { u[n] = gl.getUniformLocation(prog, n); });
    gl.uniform1i(u.i0, 0); gl.uniform1i(u.d0, 1); gl.uniform1i(u.i1, 2); gl.uniform1i(u.d1, 3);
    this.gl = gl; this.u = u; this.canvas = canvas;
    // localStorage sh-motion: 'full' treats any GPU as fast, 'still' renders full size but only
    // when the page scrolls (used for screen recordings in tests).
    var force = ''; try { force = window.localStorage.getItem('sh-motion') || ''; } catch (e) {}
    this.soft = force === 'still' ? true : force === 'full' ? false : softwareGL(gl);
    this.scale = force === 'still' ? 1 : this.soft ? 0.45 : 1;
    this.times = [];
    this.failed = false;
  }
  Stage.prototype.texture = function (url, cb) {
    var gl = this.gl, img = new Image();
    img.decoding = 'async';
    img.onload = function () {
      var t = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      cb(t, img.naturalWidth, img.naturalHeight);
    };
    img.onerror = function () { cb(null); };
    img.src = url;
  };
  // A photo and its depth map: { photo, photoLg, depth, pos: [x, y] like object-position }.
  // sc.pos and sc.zoom may be changed between frames to pan and magnify.
  Stage.prototype.load = function (src, cb) {
    var sc = { ready: false, pos: src.pos || [0.5, 0.5], zoom: 1 };
    var big = (this.canvas.clientWidth || window.innerWidth) * Math.min(window.devicePixelRatio || 1, 2) > 1700;
    var left = 2;
    function done() { if (--left === 0) { sc.ready = !!(sc.img && sc.dep); cb && cb(sc); } }
    this.texture(big && src.photoLg ? src.photoLg : src.photo, function (t, w, h) { sc.img = t; sc.w = w; sc.h = h; done(); });
    this.texture(src.depth, function (t) { sc.dep = t; done(); });
    return sc;
  };
  // The same, from an element's data attributes.
  Stage.prototype.scene = function (el, cb) {
    var pos = (el.getAttribute('data-pos') || '50% 50%').split(' ').map(function (s) { return parseFloat(s) / 100; });
    var sc = this.load({ photo: el.getAttribute('data-photo'), photoLg: el.getAttribute('data-photo-lg'), depth: el.getAttribute('data-depth'),
      pos: [isNaN(pos[0]) ? 0.5 : pos[0], isNaN(pos[1]) ? 0.5 : pos[1]] }, cb);
    sc.el = el;
    return sc;
  };
  Stage.prototype.release = function (sc) {
    if (sc.img) this.gl.deleteTexture(sc.img);
    if (sc.dep) this.gl.deleteTexture(sc.dep);
    sc.img = sc.dep = null; sc.ready = false;
  };
  Stage.prototype.resize = function () {
    var c = this.canvas, dpr = Math.min(window.devicePixelRatio || 1, 1.75) * this.scale;
    var w = Math.max(2, Math.round(c.clientWidth * dpr)), h = Math.max(2, Math.round(c.clientHeight * dpr));
    if (c.width !== w || c.height !== h) { c.width = w; c.height = h; }
    this.gl.viewport(0, 0, w, h);
  };
  Stage.prototype.fit = function (sc) {
    var ra = this.canvas.width / this.canvas.height, ri = sc.w / sc.h, sx = 1, sy = 1;
    if (ra > ri) sy = ri / ra; else sx = ra / ri;
    var z = OVER * (sc.zoom || 1);
    sx /= z; sy /= z;
    return [sx, sy, sc.pos[0] * (1 - sx), (1 - sc.pos[1]) * (1 - sy)];
  };
  // cam: [x, y, z] with x/y in -1..1 (sideways/up), z the push-in.
  Stage.prototype.draw = function (a, camA, b, camB, mixv) {
    var gl = this.gl, u = this.u;
    this.resize();
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, a.img);
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, a.dep);
    gl.uniform4fv(u.f0, this.fit(a));
    gl.uniform4f(u.c0, camA[0] * AMP, camA[1] * AMP, camA[2], FOCUS);
    var m = b && b.ready ? mixv : 0;
    if (m > 0) {
      gl.activeTexture(gl.TEXTURE2); gl.bindTexture(gl.TEXTURE_2D, b.img);
      gl.activeTexture(gl.TEXTURE3); gl.bindTexture(gl.TEXTURE_2D, b.dep);
      gl.uniform4fv(u.f1, this.fit(b));
      gl.uniform4f(u.c1, camB[0] * AMP, camB[1] * AMP, camB[2], FOCUS);
    }
    gl.uniform1f(u.mixv, m);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };
  // Called once per animation frame: render smaller on slow devices, give up on very slow ones.
  Stage.prototype.frame = function (t) {
    var dt = this.last ? t - this.last : 0;
    this.last = t;
    if (dt <= 0 || dt > 1000) return;
    this.times.push(dt);
    if (this.times.length < 24) return;
    var med = this.times.sort(function (x, y) { return x - y; })[12];
    this.times.length = 0;
    if (med > 45 && this.scale > 0.45) this.scale = Math.max(0.45, this.scale * 0.75);
    else if (med > 110) this.failed = true;
  };

  Stage.AMP = AMP; Stage.FOCUS = FOCUS; Stage.OVER = OVER;
  SH.Stage = Stage; // used by explore.js

  function makeCanvas(parent, cls) {
    var c = doc.createElement('canvas');
    c.className = 'motion-canvas' + (cls ? ' ' + cls : '');
    c.setAttribute('aria-hidden', 'true');
    parent.insertBefore(c, parent.firstChild);
    return c;
  }

  // Run fn every frame while el is on screen and the tab is visible.
  function whileVisible(el, fn) {
    var on = false, raf = 0;
    function loop(t) { raf = 0; if (!on || doc.hidden) return; fn(t); raf = requestAnimationFrame(loop); }
    function kick() { if (on && !raf && !doc.hidden) raf = requestAnimationFrame(loop); }
    new IntersectionObserver(function (es) { on = es[0].isIntersecting; kick(); }, { rootMargin: '80px' }).observe(el);
    doc.addEventListener('visibilitychange', kick);
    return kick;
  }

  // Pointer position, smoothed, in -1..1.
  var ptr = { x: 0, y: 0, tx: 0, ty: 0 };
  if (fineHover) {
    window.addEventListener('pointermove', function (e) {
      ptr.tx = (e.clientX / window.innerWidth) * 2 - 1; ptr.ty = (e.clientY / window.innerHeight) * 2 - 1;
    }, { passive: true });
  }
  function stepPointer() { ptr.x += (ptr.tx - ptr.x) * 0.06; ptr.y += (ptr.ty - ptr.y) * 0.06; }

  // ---------------------------------------------------------------- single photos in 3D
  doc.querySelectorAll('[data-motion][data-depth]').forEach(function (el) {
    var stage;
    try { stage = new Stage(makeCanvas(el)); } catch (e) { return; }
    var hero = el.getAttribute('data-motion') === 'hero';
    var sc = stage.scene(el, function () { if (sc.ready) { draw(performance.now()); el.classList.add('is-live'); kick(); } });
    var section = el.parentNode;
    function draw(t) {
      if (!sc.ready || stage.failed) return;
      stepPointer();
      var r = section.getBoundingClientRect();
      var out = clamp(-r.top / Math.max(1, r.height), 0, 1); // how far the section has scrolled away
      var s = t * 0.001;
      var idle = stage.soft ? 0 : 1;
      var x = idle * 0.45 * Math.sin(s * 0.23) + ptr.x * 0.5;
      var y = idle * 0.2 * Math.sin(s * 0.17 + 1.3) - ptr.y * 0.3 - out * 0.4;
      var z = 0.025 + idle * 0.015 * Math.sin(s * 0.11) + out * (hero ? 0.16 : 0.1);
      stage.draw(sc, [x, y, z]);
      if (stage.failed) { el.classList.remove('is-live'); }
    }
    var kick = whileVisible(el, function (t) { if (stage.soft) return; stage.frame(t); draw(t); });
    SH.scenes.push(function () { if (stage.soft) draw(performance.now()); });
    window.addEventListener('resize', function () { draw(performance.now()); });
  });

  // ---------------------------------------------------------------- the home tour
  doc.querySelectorAll('[data-tour]').forEach(function (sec) {
    var track = sec.querySelector('.tour__track');
    var stage3d = sec.querySelector('.tour__stage');
    var stops = Array.prototype.slice.call(sec.querySelectorAll('.tour__stop'));
    var links = Array.prototype.slice.call(sec.querySelectorAll('[data-goto]'));
    if (!track || stops.length < 2) return;
    var n = stops.length;
    sec.classList.add('is-live');

    var cams = stops.map(function (li) {
      var v = (li.getAttribute('data-cam') || '0,0,0,0,0,0.1').split(',').map(Number);
      return { a: v.slice(0, 3), b: v.slice(3, 6) };
    });

    var stage = null, scenes = [];
    if (stops[0].hasAttribute('data-depth')) {
      try { stage = new Stage(makeCanvas(stage3d, 'tour__canvas')); } catch (e) { stage = null; }
    }
    function want(i) {
      if (!stage || i < 0 || i >= n || scenes[i]) return;
      scenes[i] = stage.scene(stops[i], function () { render(performance.now()); });
    }

    var current = -1;
    function show(i) {
      if (i === current) return;
      current = i;
      stops.forEach(function (li, k) { li.classList.toggle('is-on', k === i); });
      links.forEach(function (a, k) { if (k === i) a.setAttribute('aria-current', 'step'); else a.removeAttribute('aria-current'); });
      if (stage) { want(i); want(i + 1); want(i + 2); } else {
        var next = stops[i + 1] && stops[i + 1].querySelector('img');
        if (next && next.loading === 'lazy') next.loading = 'eager';
      }
    }

    function render(t) {
      var p = SH.progress(track) * n;
      var i = Math.min(n - 1, Math.floor(p)), uu = clamp(p - i, 0, 1);
      if (i === n - 1) uu = clamp(uu, 0, 1);
      var mixv = i < n - 1 ? smooth(0.74, 1, uu) : 0;
      show(mixv > 0.5 ? i + 1 : i);
      var live = !!(stage && !stage.failed && scenes[i] && scenes[i].ready);
      sec.classList.toggle('is-3d', live);
      if (!live) return;
      var c = cams[i], e = ease(clamp(uu / 0.9, 0, 1));
      var s = t * 0.001, idle = stage.soft ? 0 : 1;
      stepPointer();
      var camA = [lerp(c.a[0], c.b[0], e) + idle * 0.08 * Math.sin(s * 0.4) + ptr.x * 0.25,
        lerp(c.a[1], c.b[1], e) - ptr.y * 0.15,
        lerp(c.a[2], c.b[2], e) + mixv * 0.32];
      var camB = null, nb = null;
      if (mixv > 0 && scenes[i + 1]) {
        var c2 = cams[i + 1];
        nb = scenes[i + 1];
        camB = [c2.a[0], c2.a[1], c2.a[2] - (1 - mixv) * 0.08];
      }
      stage.draw(scenes[i], camA, nb, camB, mixv);
    }

    links.forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var i = Number(a.getAttribute('data-goto'));
        var span = track.offsetHeight - window.innerHeight;
        var top = track.getBoundingClientRect().top + window.scrollY + span * (i + 0.3) / n;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });

    // Start loading just before the tour comes into view.
    new IntersectionObserver(function (es, obs) {
      if (es[0].isIntersecting) { want(0); want(1); obs.disconnect(); }
    }, { rootMargin: '100% 0px' }).observe(sec);

    SH.scenes.push(function () { render(performance.now()); });
    if (stage) {
      var kick = whileVisible(stage3d, function (t) { if (!stage.soft) { stage.frame(t); render(t); } });
      kick();
    }
    render(performance.now());
  });

  // ---------------------------------------------------------------- room photos: 3D carousel
  doc.querySelectorAll('[data-strip]').forEach(function (sec) {
    var track = sec.querySelector('.strip__track');
    var row = sec.querySelector('.strip__row');
    var items = Array.prototype.slice.call(sec.querySelectorAll('.strip__item'));
    if (!track || !row || items.length < 2) return;
    var n = items.length;
    sec.classList.add('is-flow');
    row.removeAttribute('tabindex'); // the page scroll turns it now
    var current = -1;

    // Photos keep their own shapes, so neighbours are spaced by their actual widths.
    var centres = [];
    function measure() {
      track.style.height = (window.innerHeight * (1 + (n - 1) * 0.5)) + 'px';
      var narrow = row.clientWidth < 700, f = narrow ? 0.78 : 0.62, x = 0;
      centres = items.map(function (li, k) {
        if (k > 0) x += (items[k - 1].offsetWidth + li.offsetWidth) / 2 * f;
        return x;
      });
      update();
    }
    function update() {
      var r = track.getBoundingClientRect();
      if (r.bottom < -50 || r.top > window.innerHeight + 50 || !centres.length) return;
      var P = SH.progress(track) * (n - 1);
      var narrow = row.clientWidth < 700;
      var k0 = Math.min(n - 2, Math.floor(P)), here = lerp(centres[k0], centres[k0 + 1], P - k0);
      items.forEach(function (li, k) {
        var d = k - P, ad = Math.abs(d);
        var x = centres[k] - here;
        var ry = clamp(-d * 40, -62, 62);
        var z = -Math.min(ad, 4) * (narrow ? 150 : 230);
        li.style.transform = 'translate(-50%,-50%) translate3d(' + x.toFixed(1) + 'px,0,' + z.toFixed(1) + 'px) rotateY(' + ry.toFixed(2) + 'deg)';
        li.style.zIndex = String(100 - Math.round(ad * 10));
        li.style.opacity = ad > 3.4 ? '0' : '1';
        li.style.setProperty('--dim', Math.min(ad, 2.2) * 0.2);
      });
      var c = Math.round(P);
      if (c !== current) {
        current = c;
        items.forEach(function (li, k) { li.classList.toggle('is-current', k === c); });
      }
      row.parentNode.style.setProperty('--p', (P / (n - 1)).toFixed(3));
    }
    function centre(k, smoothly) {
      var span = track.offsetHeight - window.innerHeight;
      var top = track.getBoundingClientRect().top + window.scrollY + span * k / (n - 1);
      window.scrollTo({ top: top, behavior: smoothly ? 'smooth' : 'auto' });
    }
    // A photo at the side turns to the front first; the front one opens larger (site.js).
    row.addEventListener('click', function (e) {
      var li = e.target.closest('.strip__item');
      if (!li || li.classList.contains('is-current')) return;
      e.preventDefault(); e.stopPropagation();
      centre(items.indexOf(li), true);
    }, true);
    row.addEventListener('focusin', function (e) {
      var li = e.target.closest('.strip__item');
      if (li && !li.classList.contains('is-current')) centre(items.indexOf(li), false);
    });
    SH.scenes.push(update);
    window.addEventListener('resize', measure);
    measure();
  });

  // ---------------------------------------------------------------- headings rise into place
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
  }, { threshold: 0.15 }) : null;
  if (io) {
    doc.querySelectorAll('.section-title, .page-head__title, .hero__title, .room-hero__title, .aside-title').forEach(function (h) {
      if (h.querySelector('.kw') || h.closest('.tour__stop')) return;
      var text = h.textContent.trim();
      if (!text || h.children.length) return;
      h.textContent = '';
      text.split(/\s+/).forEach(function (w, i) {
        var o = doc.createElement('span'), s = doc.createElement('span');
        o.className = 'kw'; o.style.setProperty('--i', i); s.textContent = w;
        o.appendChild(s); h.appendChild(o); h.appendChild(doc.createTextNode(' '));
      });
      h.classList.add('kinetic');
      io.observe(h);
    });
    // Photos in grids come up and settle as they scroll into view.
    doc.querySelectorAll('.gallery__item, .steps__list li, .places li').forEach(function (el, i) {
      el.classList.add('reveal'); el.style.setProperty('--i', i % 4); io.observe(el);
    });
  }

  // ---------------------------------------------------------------- cards tilt toward the pointer
  if (fineHover) {
    doc.querySelectorAll('.stay__media, .other__card, .ledger__figure, .kitchen__figure, .gallery__item a').forEach(function (el) {
      el.classList.add('tilt');
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty('--rx', (-y * 7).toFixed(2) + 'deg');
        el.style.setProperty('--ry', (x * 9).toFixed(2) + 'deg');
        el.style.setProperty('--mx', (x * -14).toFixed(1) + 'px');
        el.style.setProperty('--my', (y * -10).toFixed(1) + 'px');
      });
      el.addEventListener('pointerleave', function () {
        ['--rx', '--ry', '--mx', '--my'].forEach(function (k) { el.style.removeProperty(k); });
      });
    });
  }

  // ---------------------------------------------------------------- framed photos drift with the scroll
  var framed = Array.prototype.slice.call(doc.querySelectorAll('.frame > img'));
  framed.forEach(function (img) { img.classList.add('drift'); });
  SH.scenes.push(function () {
    var vh = window.innerHeight;
    framed.forEach(function (img) {
      var r = img.parentNode.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      var t = (r.top + r.height / 2 - vh / 2) / vh; // -1..1 across the screen
      img.style.setProperty('--dy', (t * -6).toFixed(2) + '%');
    });
  });
})();
