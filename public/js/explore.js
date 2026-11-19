/* Explore the estate in 3D (/explore).
   Every spot is one of the owners' photos. With WebGL its depth map (scripts/build-depth.py)
   lets you drag to look around it in 3D, and the marks stay on the things they point at.
   Selecting a mark moves into the photo towards it while the next spot arrives near-first.
   With reduced motion, without WebGL, or if the device can't keep up, the photos are shown as
   they are and the marks still lead from spot to spot. Each spot is also its own page
   (/explore?spot=<key>), which works without JavaScript. Uses the WebGL stage from motion.js. */
(function () {
  'use strict';
  var doc = document, win = window, SH = win.SH || {};
  var root = doc.querySelector('[data-explorer]');
  var dataEl = doc.getElementById('explore-data');
  if (!root || !dataEl) return;
  var spots = JSON.parse(dataEl.textContent).spots;
  if (!spots.length) return;
  var byId = {};
  spots.forEach(function (s, i) { s.index = i; byId[s.id] = s; });

  var reduce = !!SH.reduce || doc.documentElement.classList.contains('reduce-motion');
  var fine = win.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var clamp = function (x, a, b) { return x < a ? a : x > b ? b : x; };
  var lerp = function (a, b, t) { return a + (b - a) * t; };
  var smooth = function (a, b, x) { var t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  var easeIn = function (t) { return t * t; };
  var easeOut = function (t) { return 1 - (1 - t) * (1 - t); };
  var easeInOut = function (t) { return t * t * (3 - 2 * t); };

  var frameEl = root.querySelector('[data-frame]');
  var marksEl = root.querySelector('[data-marks]');
  var panelEl = root.querySelector('.explorer__panel');
  var imgEl = frameEl.querySelector('img');
  var titleEl = root.querySelector('[data-title]'), textEl = root.querySelector('[data-text]');
  var areaEl = root.querySelector('[data-area]'), countEl = root.querySelector('[data-count]');
  var prevEl = root.querySelector('[data-prev]'), nextEl = root.querySelector('[data-next]');
  var prevTitle = root.querySelector('[data-prev-title]'), nextTitle = root.querySelector('[data-next-title]');
  var hintEl = root.querySelector('[data-hint]');
  var cards = Array.prototype.slice.call(doc.querySelectorAll('[data-goto]'));

  var query = /[?&]spot=([^&#]+)/.exec(win.location.search);
  var cur = (query && byId[decodeURIComponent(query[1])]) || spots[0];

  // ------------------------------------------------------------------------- WebGL stage
  var gl = null, canvas = null;
  if (!reduce && SH.Stage) {
    canvas = doc.createElement('canvas');
    canvas.className = 'explorer__canvas';
    canvas.setAttribute('aria-hidden', 'true');
    frameEl.insertBefore(canvas, marksEl);
    try { gl = new SH.Stage(canvas, { steps: 32 }); } catch (e) { gl = null; canvas.parentNode.removeChild(canvas); canvas = null; }
  }
  var AMP = gl ? SH.Stage.AMP : 0.026, FOCUS = gl ? SH.Stage.FOCUS : 0.35, OVER3D = gl ? SH.Stage.OVER : 1;
  var live = false; // the WebGL picture is showing

  var scenes = {}, recent = [];
  function load(s) {
    var sc = scenes[s.id];
    if (!sc) {
      sc = gl.load({ photo: s.photo, photoLg: s.photoLg, depth: s.depth, pos: s.pos.slice() }, function () {
        sc.done = true;
        var w = sc.waiting; sc.waiting = [];
        w.forEach(function (f) { f(sc); });
        kick();
      });
      sc.waiting = [];
      scenes[s.id] = sc;
    }
    recent = recent.filter(function (id) { return id !== s.id; });
    recent.push(s.id);
    // keep a few photos on the graphics card; phones have little memory
    while (recent.length > 5) {
      var old = recent.shift();
      if (old === cur.id || (flight && old === flight.b.id)) { recent.push(old); if (recent.length <= 5) break; continue; }
      gl.release(scenes[old]); delete scenes[old];
    }
    return sc;
  }
  function whenLoaded(sc, f) { if (sc.done) f(sc); else sc.waiting.push(f); }

  // Depth under each mark, read from a small copy of the depth map, so marks move with the scene.
  var depths = {};
  function readDepth(s) {
    if (!gl || !s.depth || depths[s.id]) return;
    depths[s.id] = { pending: true };
    var im = new Image();
    im.onload = function () {
      var w = 128, h = Math.max(1, Math.round(128 * im.naturalHeight / im.naturalWidth));
      var c = doc.createElement('canvas'); c.width = w; c.height = h;
      var x = c.getContext('2d');
      x.drawImage(im, 0, 0, w, h);
      var px = x.getImageData(0, 0, w, h).data, a = new Uint8Array(w * h);
      for (var i = 0; i < a.length; i++) a[i] = px[i * 4];
      depths[s.id] = { w: w, h: h, a: a };
      kick();
    };
    im.src = s.depth;
  }
  function nearness(s, u, v) {
    var d = depths[s.id];
    if (!d || !d.a) return FOCUS;
    var cx = Math.round(u * (d.w - 1)), cy = Math.round(v * (d.h - 1)), vals = [];
    for (var y = -1; y <= 1; y++) for (var x = -1; x <= 1; x++) {
      vals.push(d.a[clamp(cy + y, 0, d.h - 1) * d.w + clamp(cx + x, 0, d.w - 1)]);
    }
    vals.sort(function (p, q) { return p - q; });
    return vals[4] / 255;
  }

  // ------------------------------------------------------------------------- view
  var box = { W: 1, H: 1, top: 70, bottom: 1, blocks: [] };
  // The frame's size, and the parts of it the caption and the step links cover.
  function measure() {
    box.W = frameEl.clientWidth || 1; box.H = frameEl.clientHeight || 1;
    box.top = box.W < 700 ? 78 : 96;
    box.bottom = box.H - 26;
    var fr = frameEl.getBoundingClientRect();
    box.blocks = Array.prototype.map.call(panelEl.children, function (c) {
      var r = c.getBoundingClientRect();
      return { l: r.left - fr.left - 16, r: r.right - fr.left + 16, t: r.top - fr.top - 14 };
    }).filter(function (b) { return b.r > b.l + 32; });
  }
  // Which part of the photo fills the frame (like object-fit: cover), in photo units from the
  // bottom-left as the shader counts: sx/sy the share shown, ox/oy where it starts.
  function fitOf(s, pan, zoom) {
    var ra = box.W / box.H, ri = s.w / s.h, sx = 1, sy = 1;
    if (ra > ri) sy = ri / ra; else sx = ra / ri;
    var z = (live ? OVER3D : 1) * (zoom || 1);
    sx /= z; sy /= z;
    return { sx: sx, sy: sy, ox: pan[0] * (1 - sx), oy: (1 - pan[1]) * (1 - sy) };
  }
  // In 3D on a screen wider than the photo, magnify a little so there is room to look sideways.
  function baseZoom(s) { return live && box.W / box.H > (s.w / s.h) * 1.02 ? 1.12 : 1; }
  // Screen position of a point of the photo (u, v from the top-left) for camera cam.
  function project(s, f, cam, u, v) {
    var d = live ? nearness(s, u, v) : FOCUS;
    var cx = cam[0] * AMP, cy = cam[1] * AMP, cz = cam[2];
    var mx = 0.5 * f.sx + f.ox, my = 0.5 * f.sy + f.oy;
    var qx = mx + (u - mx) * (1 + cz * d) + cx * (d - FOCUS);
    var qy = my + (1 - v - my) * (1 + cz * d) + cy * (d - FOCUS);
    return { x: (qx - f.ox) / f.sx * box.W, y: (1 - (qy - f.oy) / f.sy) * box.H };
  }

  var view = { pan: cur.pos.slice(), tilt: [0, 0], vel: [0, 0] };
  var hover = { x: 0, y: 0, tx: 0, ty: 0 };
  var lastInput = -1e9, idleW = 0;
  function camNow(t) {
    var s = t * 0.001, idle = live && !gl.soft ? idleW : 0;
    return [view.tilt[0] * 1.9 + idle * 0.35 * Math.sin(s * 0.23) + hover.x * 0.5,
      view.tilt[1] * 1.2 + idle * 0.16 * Math.sin(s * 0.17 + 1.3) - hover.y * 0.3,
      0.02 + idle * 0.014 * Math.sin(s * 0.11)];
  }

  // ------------------------------------------------------------------------- marks
  var marks = [];
  function el(tag, cls) { var n = doc.createElement(tag); if (cls) n.className = cls; return n; }
  function buildMarks(s) {
    marksEl.textContent = '';
    marks = [];
    s.marks.forEach(function (mk) {
      var a = el('a', 'mark');
      a.href = '/explore?spot=' + encodeURIComponent(mk.to);
      a.setAttribute('data-to', mk.to);
      var dot = el('span', 'mark__dot'); dot.setAttribute('aria-hidden', 'true');
      var label = el('span', 'mark__label'); label.textContent = mk.label;
      a.appendChild(dot); a.appendChild(label);
      marksEl.appendChild(a);
      marks.push({ el: a, mk: mk });
    });
    (s.info || []).forEach(function (inf) {
      var b = el('span', 'mark mark--info');
      b.setAttribute('aria-hidden', 'true');
      var dot = el('span', 'mark__dot'), label = el('span', 'mark__label');
      label.textContent = inf.label;
      b.appendChild(dot); b.appendChild(label);
      marksEl.appendChild(b);
      marks.push({ el: b, mk: inf, info: true });
    });
  }
  function placeMarks(s, f, cam) {
    for (var i = 0; i < marks.length; i++) {
      var m = marks[i], p = project(s, f, cam, m.mk.x, m.mk.y);
      var off = p.x < 18 || p.x > box.W - 18 || p.y < box.top || p.y > box.bottom;
      var x = clamp(p.x, 22, box.W - 22), bottom = box.bottom;
      box.blocks.forEach(function (b) { if (x > b.l && x < b.r) bottom = Math.min(bottom, b.t); });
      if ((off || p.y > bottom) && m.info) { m.el.hidden = true; continue; }
      m.el.hidden = false;
      var y = clamp(p.y, box.top, Math.max(box.top, bottom));
      m.el.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
      m.el.classList.toggle('is-edge', off);
      m.el.classList.toggle('is-left', off && p.x < 18);
      m.el.classList.toggle('is-right', off && p.x > box.W - 18);
      m.el.classList.toggle('is-flip', x > box.W * 0.62);
    }
  }

  // ------------------------------------------------------------------------- the panel
  function showText(s) {
    titleEl.textContent = s.title;
    textEl.textContent = s.text;
    areaEl.textContent = s.area;
    countEl.textContent = (s.index + 1) + ' of ' + spots.length;
    var n = spots.length, p = spots[(s.index - 1 + n) % n], q = spots[(s.index + 1) % n];
    prevEl.href = '/explore?spot=' + p.id; prevTitle.textContent = p.title;
    nextEl.href = '/explore?spot=' + q.id; nextTitle.textContent = q.title;
    cards.forEach(function (c) {
      if (c.getAttribute('data-goto') === s.id) c.setAttribute('aria-current', 'true'); else c.removeAttribute('aria-current');
    });
  }
  function arrived(s) {
    try { win.history.replaceState(null, '', '/explore' + (s.index ? '?spot=' + s.id : '')); } catch (e) {}
    doc.title = (s.index ? s.title + ': explore the estate in 3D' : 'Explore the estate in 3D') + ' | Siri Homestay';
    imgEl.alt = s.alt;
  }
  // The plain photo under the canvas: shown when there's no WebGL, and kept for screen readers.
  function setImg(img, s) {
    img.removeAttribute('srcset');
    img.src = s.src;
    img.srcset = s.srcset;
    img.alt = s.alt;
    img.style.backgroundImage = 'url(' + s.lqip + ')';
    img.style.objectPosition = (view.pan[0] * 100) + '% ' + (view.pan[1] * 100) + '%';
    img.setAttribute('data-spot', s.id);
  }

  // ------------------------------------------------------------------------- moving between spots
  var flight = null;
  function go(id, fromMark) {
    var b = byId[id];
    if (!b || b === cur || flight) return;
    var focusAfter = fromMark && marksEl.contains(doc.activeElement);
    hideHint();
    if (live) return fly(b, fromMark, focusAfter);
    swapStill(b, focusAfter);
  }
  function settle(b, focusAfter) {
    cur = b;
    view.pan = b.pos.slice(); view.tilt = [0, 0]; view.vel = [0, 0];
    showText(b);
    buildMarks(b);
    arrived(b);
    readDepth(b);
    if (live) preload(b);
    marksEl.classList.remove('is-moving');
    if (focusAfter) frameEl.focus({ preventScroll: true });
    kick();
  }
  function swapStill(b, focusAfter) {
    if (reduce) { view.pan = b.pos.slice(); setImg(imgEl, b); settle(b, focusAfter); return; }
    marksEl.classList.add('is-moving');
    var old = imgEl, next = old.cloneNode(false);
    view.pan = b.pos.slice();
    setImg(next, b);
    next.classList.add('is-entering');
    frameEl.insertBefore(next, old.nextSibling);
    var ready = next.decode ? next.decode().catch(function () {}) : Promise.resolve();
    flight = { still: true, b: b };
    Promise.race([ready, new Promise(function (r) { setTimeout(r, 2500); })]).then(function () {
      next.getBoundingClientRect();
      next.classList.add('is-in');
      setTimeout(function () {
        if (old.parentNode) old.parentNode.removeChild(old);
        next.classList.remove('is-entering', 'is-in');
        imgEl = next;
        flight = null;
        settle(b, focusAfter);
      }, 650);
    });
  }
  function fly(b, mk, focusAfter) {
    var scA = scenes[cur.id], scB = load(b);
    var f = fitOf(cur, view.pan, baseZoom(cur));
    // where the window must move to put the mark in the middle
    var target = view.pan.slice();
    if (mk) {
      target = [f.sx < 0.999 ? clamp((mk.x - f.sx / 2) / (1 - f.sx), 0, 1) : view.pan[0],
        f.sy < 0.999 ? clamp((mk.y - f.sy / 2) / (1 - f.sy), 0, 1) : view.pan[1]];
    }
    flight = { a: cur, b: b, scA: scA, scB: scB, t0: -1, u: 0, pan0: view.pan.slice(), pan1: target, tilt0: view.tilt.slice(),
      dur: gl.soft ? 1300 : 1900, focusAfter: focusAfter, text: false, toward: mk ? [mk.x - 0.5, mk.y - 0.5] : [0, 0] };
    marksEl.classList.add('is-moving');
    whenLoaded(scB, function () {
      if (!scB.ready && flight && flight.b === b) { // the next photo didn't load: carry on without 3D
        flight = null; marksEl.classList.remove('is-moving'); dropTo3dless(); swapStill(b, focusAfter);
      }
    });
    kick();
  }
  // One frame of a flight. Returns the picture to draw.
  function flightFrame(t) {
    var fl = flight;
    if (fl.t0 < 0) fl.t0 = t;
    var u = clamp((t - fl.t0) / fl.dur, 0, 1);
    // wait just before the hand-over until the next photo has arrived
    if (u > 0.42 && !fl.scB.ready) { fl.t0 += t - fl.t0 - 0.42 * fl.dur; u = 0.42; }
    fl.u = u;
    var a = fl.scA, b = fl.scB, cam = camNow(t);
    var g = easeInOut(clamp(u / 0.75, 0, 1));
    a.pos = [lerp(fl.pan0[0], fl.pan1[0], g), lerp(fl.pan0[1], fl.pan1[1], g)];
    a.zoom = baseZoom(fl.a) * (1 + 0.42 * easeIn(clamp(u / 0.9, 0, 1)));
    var camA = [lerp(fl.tilt0[0] * 1.9, fl.toward[0] * 1.2, g) + cam[0] * 0.3, lerp(fl.tilt0[1] * 1.2, -fl.toward[1] * 0.8, g), 0.02 + 0.34 * easeIn(u)];
    var mixv = smooth(0.42, 0.97, u);
    var camB = null;
    if (b.ready) {
      var arrive = easeOut(clamp((u - 0.42) / 0.58, 0, 1));
      b.pos = fl.b.pos.slice();
      b.zoom = baseZoom(fl.b) * lerp(1.24, 1, arrive);
      camB = [lerp(-fl.toward[0] * 1.4, 0, arrive) + cam[0] * arrive, lerp(fl.toward[1] * 0.8, 0, arrive) + cam[1] * arrive, lerp(0.16, cam[2], arrive)];
    }
    if (!fl.text && mixv > 0.5) { fl.text = true; showText(fl.b); }
    return { a: a, camA: camA, b: b.ready ? b : null, camB: camB, mixv: mixv, done: u >= 1 };
  }

  function preload(s) {
    if (!live) return;
    s.marks.forEach(function (mk) { if (byId[mk.to]) load(byId[mk.to]); });
    load(spots[(s.index + 1) % spots.length]);
    load(s); // keep the current one most recent
  }
  function dropTo3dless() {
    live = false;
    root.classList.remove('is-3d');
    view.pan = cur.pos.slice();
    setImg(imgEl, cur);
    kick();
  }

  // ------------------------------------------------------------------------- drawing
  var raf = 0, visible = true, lastT = 0, dragging = null;
  function kick() { if (!raf && visible && !doc.hidden) raf = win.requestAnimationFrame(frame); }
  function frame(t) {
    raf = 0;
    var dt = lastT ? Math.min(64, t - lastT) : 16;
    lastT = t;
    var moving = physics(dt, t);
    if (live) {
      if (!gl.soft) gl.frame(t);
      if (gl.failed) { flight = null; dropTo3dless(); settle(cur, false); }
    }
    if (live) draw3d(t); else drawStill();
    var continuous = live && !gl.soft;
    if (flight || moving || dragging || continuous) kick();
  }
  function draw3d(t) {
    if (flight && !flight.still) {
      var fr = flightFrame(t);
      gl.draw(fr.a, fr.camA, fr.b, fr.camB, fr.mixv);
      if (fr.done) {
        var b = flight.b, focusAfter = flight.focusAfter;
        fr.a.zoom = 1; fr.a.pos = flight.a.pos.slice();
        if (fr.b) fr.b.zoom = 1;
        flight = null;
        settle(b, focusAfter);
      }
      return;
    }
    var sc = scenes[cur.id];
    if (!sc || !sc.ready) return;
    var cam = camNow(t);
    sc.pos = view.pan; sc.zoom = baseZoom(cur);
    gl.draw(sc, cam);
    placeMarks(cur, fitOf(cur, view.pan, sc.zoom), cam);
  }
  function drawStill() {
    if (flight) return;
    imgEl.style.objectPosition = (view.pan[0] * 100) + '% ' + (view.pan[1] * 100) + '%';
    placeMarks(cur, fitOf(cur, view.pan, 1), [0, 0, 0]);
  }

  // Drag inertia, the parallax from a drag easing back, idle drift, pointer.
  function physics(dt, t) {
    var k = dt / 16, moving = false;
    if (!dragging) {
      if (Math.abs(view.vel[0]) + Math.abs(view.vel[1]) > 0.00002) {
        pan(view.vel[0] * dt, view.vel[1] * dt);
        var fr = Math.pow(reduce ? 0 : 0.9, k);
        view.vel[0] *= fr; view.vel[1] *= fr;
        moving = true;
      } else view.vel = [0, 0];
      if (Math.abs(view.tilt[0]) + Math.abs(view.tilt[1]) > 0.002) {
        var back = Math.pow(0.965, k);
        view.tilt[0] *= back; view.tilt[1] *= back;
        moving = true;
      } else view.tilt = [0, 0];
    }
    idleW = t - lastInput > 2500 ? Math.min(1, idleW + dt / 2000) : Math.max(0, idleW - dt / 300);
    if (fine) {
      hover.x += (hover.tx - hover.x) * Math.min(1, 0.06 * k);
      hover.y += (hover.ty - hover.y) * Math.min(1, 0.06 * k);
      if (Math.abs(hover.tx - hover.x) + Math.abs(hover.ty - hover.y) > 0.002) moving = true;
    }
    return moving;
  }
  // Move the window over the photo by a share of the photo (only where there's room).
  function pan(du, dv) {
    view.pan[0] = clamp(view.pan[0] + du, 0, 1);
    view.pan[1] = clamp(view.pan[1] + dv, 0, 1);
  }
  // Pixels dragged -> share of the photo, so the photo follows the finger.
  function dragToPan(dx, dy) {
    var f = fitOf(cur, view.pan, baseZoom(cur));
    return [f.sx < 0.985 ? -dx / box.W * f.sx / (1 - f.sx) : 0, f.sy < 0.985 ? -dy / box.H * f.sy / (1 - f.sy) : 0];
  }

  // ------------------------------------------------------------------------- input
  var moved = false;
  frameEl.addEventListener('pointerdown', function (e) {
    if (flight || (e.pointerType === 'mouse' && e.button !== 0)) return;
    dragging = { id: e.pointerId, x: e.clientX, y: e.clientY, x0: e.clientX, y0: e.clientY, t: e.timeStamp, captured: false };
    moved = false;
    view.vel = [0, 0];
    lastInput = performance.now();
  });
  frameEl.addEventListener('pointermove', function (e) {
    if (fine && e.pointerType === 'mouse') {
      hover.tx = clamp((e.clientX / box.W) * 2 - 1, -1, 1); hover.ty = clamp((e.clientY / win.innerHeight) * 2 - 1, -1, 1);
      if (!dragging) kick();
    }
    if (!dragging || e.pointerId !== dragging.id) return;
    var dx = e.clientX - dragging.x, dy = e.clientY - dragging.y;
    if (!moved && Math.abs(e.clientX - dragging.x0) + Math.abs(e.clientY - dragging.y0) < 6) return;
    if (!dragging.captured) { try { frameEl.setPointerCapture(e.pointerId); } catch (err) {} dragging.captured = true; root.classList.add('is-dragging'); hideHint(); }
    moved = true;
    var d = dragToPan(dx, dy), dtm = Math.max(1, e.timeStamp - dragging.t);
    pan(d[0], d[1]);
    view.vel = [lerp(view.vel[0], d[0] / dtm, 0.5), lerp(view.vel[1], d[1] / dtm, 0.5)];
    view.tilt[0] = clamp(view.tilt[0] + dx / box.W * 2.4, -1, 1);
    view.tilt[1] = clamp(view.tilt[1] - dy / box.H * 1.6, -1, 1);
    dragging.x = e.clientX; dragging.y = e.clientY; dragging.t = e.timeStamp;
    lastInput = performance.now();
    kick();
  });
  function endDrag(e) {
    if (!dragging || (e && e.pointerId !== dragging.id)) return;
    if (e && e.timeStamp - dragging.t > 80) view.vel = [0, 0]; // stopped before letting go
    dragging = null;
    // the click that may follow this drag is swallowed below; after that, clicks count again
    if (moved) setTimeout(function () { moved = false; }, 0);
    root.classList.remove('is-dragging');
    lastInput = performance.now();
    kick();
  }
  frameEl.addEventListener('pointerup', endDrag);
  frameEl.addEventListener('pointercancel', endDrag);
  frameEl.addEventListener('pointerleave', function () { hover.tx = 0; hover.ty = 0; kick(); });
  // A drag that ends on a mark is not a click on it.
  frameEl.addEventListener('click', function (e) {
    if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; return; }
    var a = e.target.closest ? e.target.closest('a.mark') : null;
    if (!a || e.ctrlKey || e.metaKey || e.shiftKey || e.button > 0) return;
    e.preventDefault();
    var to = a.getAttribute('data-to'), mk = null;
    cur.marks.forEach(function (m) { if (m.to === to) mk = m; });
    go(to, mk);
  }, true);
  frameEl.addEventListener('keydown', function (e) {
    if (e.target !== frameEl) return;
    var step = 48, dx = 0, dy = 0;
    if (e.key === 'ArrowLeft') dx = step; else if (e.key === 'ArrowRight') dx = -step;
    else if (e.key === 'ArrowUp') dy = step; else if (e.key === 'ArrowDown') dy = -step;
    else return;
    e.preventDefault();
    var d = dragToPan(dx, dy);
    pan(d[0], d[1]);
    view.tilt[0] = clamp(view.tilt[0] + dx / box.W * 2.4, -1, 1);
    view.tilt[1] = clamp(view.tilt[1] - dy / box.H * 1.6, -1, 1);
    lastInput = performance.now();
    hideHint();
    kick();
  });
  function stepTo(link, delta) {
    link.addEventListener('click', function (e) {
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.button > 0) return;
      e.preventDefault();
      go(spots[(cur.index + delta + spots.length) % spots.length].id, null);
    });
  }
  stepTo(prevEl, -1);
  stepTo(nextEl, 1);
  cards.forEach(function (c) {
    c.addEventListener('click', function (e) {
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.button > 0) return;
      e.preventDefault();
      var id = c.getAttribute('data-goto');
      var top = root.getBoundingClientRect().top + win.scrollY;
      win.scrollTo({ top: top, behavior: reduce ? 'auto' : 'smooth' });
      go(id, null);
    });
  });

  function hideHint() { hinted = true; if (hintEl && !hintEl.hidden) { hintEl.classList.add('is-gone'); setTimeout(function () { hintEl.hidden = true; }, 400); } }

  // ------------------------------------------------------------------------- start
  root.classList.add('is-live');
  frameEl.tabIndex = 0;
  frameEl.setAttribute('role', 'group');
  frameEl.setAttribute('aria-label', 'The photo. Drag, or use the arrow keys, to look around.');
  if (cur.id !== imgEl.getAttribute('data-spot')) setImg(imgEl, cur);
  showText(cur);
  buildMarks(cur);
  measure();
  win.addEventListener('resize', function () { measure(); kick(); });
  if ('IntersectionObserver' in win) {
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (visible) kick(); }).observe(frameEl);
  }
  doc.addEventListener('visibilitychange', kick);
  var hinted = false;
  function showHint() {
    if (!hintEl || hinted) return;
    var f = fitOf(cur, view.pan, 1);
    if (!live && f.sx > 0.95 && f.sy > 0.95) return; // nothing to drag on a plain photo that fits
    hinted = true;
    hintEl.hidden = false;
    setTimeout(hideHint, 6000);
  }
  if (gl) {
    var first = load(cur);
    readDepth(cur);
    whenLoaded(first, function (sc) {
      if (!sc.ready) { gl = null; return; }
      live = true;
      root.classList.add('is-3d');
      preload(cur);
      showHint();
      kick();
    });
  } else showHint();
  kick();
})();
