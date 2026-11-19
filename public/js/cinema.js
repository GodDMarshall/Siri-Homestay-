/* Room entry and 3D tours.
   - "Step inside" on a stay plays a short camera flight through the code-built estate:
     across the lawn, the sliding door opens, into the bedroom. Then the stay page opens.
     Without 3D it plays the rendered stills of the same walk instead.
   - "Walk through in 3D" on a stay page flies between the rendered viewpoints. */
(function () {
  'use strict';
  var doc = document, body = doc.body;
  var reduce = doc.documentElement.classList.contains('reduce-motion');
  window.SH = window.SH || {};
  var dataEl = doc.getElementById('cinema-data');
  var stays = dataEl ? JSON.parse(dataEl.textContent).stays : {};

  function el(tag, cls, html) { var n = doc.createElement(tag); if (cls) n.className = cls; if (html) n.innerHTML = html; return n; }
  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function world3d() { return window.SH.world && SH.world.able ? SH.world : null; }
  // The 3D estate if it is (or becomes) ready within `ms`; otherwise null.
  function worldWithin(ms) {
    var W = world3d();
    if (!W) return Promise.resolve(null);
    return Promise.race([W.load().catch(function () { return null; }), wait(ms).then(function () { return null; })]);
  }

  // Warm up. The rendered stills are fetched when a stay link comes near; the 3D estate
  // (a second or two of work for the browser) only when the visitor shows intent.
  var stillsDone = {};
  function preloadStills(slug) {
    var s = stays[slug];
    if (!s || stillsDone[slug]) return;
    stillsDone[slug] = true;
    s.stills.forEach(function (shot) { if (shot.m) { var i = new Image(); i.src = shot.m.src; } });
  }
  function preload(slug) {
    preloadStills(slug);
    if (world3d()) SH.world.load().catch(function () {});
  }
  doc.querySelectorAll('[data-enter]').forEach(function (a) {
    var slug = a.getAttribute('data-enter');
    ['pointerenter', 'focus', 'touchstart'].forEach(function (ev) { a.addEventListener(ev, function () { preload(slug); }, { passive: true, once: true }); });
  });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (e) { if (e.isIntersecting) { preloadStills(e.target.getAttribute('data-enter')); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px 200px 0px' });
    doc.querySelectorAll('[data-enter]').forEach(function (a) { io.observe(a); });
  }

  doc.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-enter]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var s = stays[a.getAttribute('data-enter')];
    if (!s || reduce) return; // ordinary navigation
    e.preventDefault();
    enter(s, a.getAttribute('href') || s.href);
  });

  // ------------------------------------------------------------------ the overlay
  var active = null;
  function overlay(label, opts) {
    var o = el('div', 'cinema' + (opts.tour ? ' cinema--tour' : ''));
    o.setAttribute('role', 'dialog'); o.setAttribute('aria-modal', 'true'); o.setAttribute('aria-label', label);
    var title = el('p', 'cinema__title'); title.textContent = opts.title || '';
    var cap = el('p', 'cinema__cap'); cap.setAttribute('aria-live', 'polite');
    var bars = el('div', 'cinema__bars'); bars.setAttribute('aria-hidden', 'true');
    var prog = el('div', 'cinema__progress');
    var stage = el('div', 'cinema__layer cinema__layer--3d');
    o.appendChild(stage); o.appendChild(bars); o.appendChild(title); o.appendChild(cap); o.appendChild(prog);
    var controls = el('div', 'cinema__controls');
    o.appendChild(controls);
    body.appendChild(o);
    var prevOverflow = body.style.overflow; body.style.overflow = 'hidden';
    var lastFocus = doc.activeElement;
    var api = {
      el: o, stage: stage, bars: bars, cap: cap, prog: prog, controls: controls, cancelled: false,
      setCap: function (text) { cap.classList.remove('is-on'); setTimeout(function () { cap.textContent = text || ''; if (text) cap.classList.add('is-on'); }, 180); },
      close: function () {
        doc.removeEventListener('keydown', onKey);
        if (o.parentNode) o.parentNode.removeChild(o);
        body.style.overflow = prevOverflow; active = null;
        if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
      },
    };
    function onKey(e) {
      if (e.key === 'Escape') { api.cancelled = true; if (api.onEscape) api.onEscape(); }
      if (e.key === 'Tab') { // keep focus inside the dialog
        var f = controls.querySelectorAll('a, button'); if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
        else if (!o.contains(doc.activeElement)) { e.preventDefault(); first.focus(); }
      }
    }
    doc.addEventListener('keydown', onKey);
    o.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, fill: 'forwards' });
    active = api;
    return api;
  }

  // Runs fn(t) for t 0..1 over ms on the animation clock; resolves early if cancelled.
  function timeline(ms, fn, ov) {
    return new Promise(function (resolve) {
      var t0 = performance.now();
      (function tick(now) {
        if (ov.cancelled) return resolve();
        var t = Math.min(1, (now - t0) / ms);
        fn(t);
        if (t < 1) requestAnimationFrame(tick); else resolve();
      })(t0);
    });
  }

  // ------------------------------------------------------------------ "Step inside"
  function enter(s, href) {
    if (active) return;
    preload(s.slug);
    var ov = overlay('Entering ' + s.name, { title: s.name });
    var skip = el('a', 'btn btn--ghost btn--small cinema__skip'); skip.href = href; skip.textContent = 'Skip to the room';
    ov.controls.appendChild(skip);
    skip.focus({ preventScroll: true });
    var done = false;
    function go() {
      if (done) return; done = true;
      try { sessionStorage.setItem('sh-entered', s.slug); } catch (e) {}
      location.href = href;
    }
    ov.onEscape = go;
    skip.addEventListener('click', function () { ov.cancelled = true; try { sessionStorage.setItem('sh-entered', s.slug); } catch (e) {} });

    worldWithin(2500).then(function (w) {
      if (ov.cancelled) return;
      return w ? fly3d(w, s.world, ov) : playStills(s.stills, ov);
    }).then(function () { if (!ov.cancelled) go(); });
  }

  function fly3d(w, shots, ov) {
    var who = { release: function () {} };
    SH.world.mount(ov.stage, who);
    ov.el.classList.add('is-3d');
    var total = shots.reduce(function (t, sh) { return t + (sh.ms || 0); }, 0), spent = 0;
    var chain = Promise.resolve();
    shots.forEach(function (shot) {
      chain = chain.then(function () {
        if (ov.cancelled) return;
        if (shot.caption) ov.setCap(shot.caption);
        if (shot.view) { w.setView(shot.view); w.invalidate(); }
        var startSpent = spent; spent += shot.ms || 0;
        var step = function (t) { ov.prog.style.width = Math.min(100, (startSpent + t * (shot.ms || 0)) / total * 100) + '%'; };
        if (shot.path) {
          var a = shot.from || 0, b = shot.to == null ? 1 : shot.to;
          return timeline(shot.ms, function (t) {
            var k = a + (b - a) * ease(t), opts = {};
            if (shot.door) opts.door = Math.min(1, Math.max(0, (t - shot.door[0]) / (shot.door[1] - shot.door[0])));
            w.setPathProgress(shot.path, k, opts); w.invalidate(); step(t);
          }, ov);
        }
        if (shot.fly) return Promise.all([w.flyTo(shot.fly, { duration: shot.ms / 1000 }), timeline(shot.ms, step, ov)]);
        return timeline(shot.ms || 600, step, ov);
      });
    });
    return chain.then(function () { if (!ov.cancelled) return wait(250); });
  }

  function playStills(shots, ov) {
    var chain = wait(150), total = shots.reduce(function (t, sh) { return t + sh.ms; }, 0), spent = 0;
    function clearBelow(layer) {
      var n = layer.previousElementSibling;
      while (n) { var prev = n.previousElementSibling; if (n.classList.contains('cinema__layer') && !n.classList.contains('cinema__layer--3d')) n.parentNode.removeChild(n); n = prev; }
    }
    shots.forEach(function (shot) {
      chain = chain.then(function () {
        if (ov.cancelled || !shot.m) return;
        return new Promise(function (resolve) {
          var layer = el('div', 'cinema__layer');
          var img = el('img'); img.alt = ''; img.src = shot.m.src;
          layer.appendChild(img); layer.style.opacity = '0';
          ov.el.insertBefore(layer, ov.bars);
          var ready = img.decode ? img.decode().catch(function () {}) : Promise.resolve();
          Promise.race([ready, wait(1500)]).then(function () {
            if (ov.cancelled) return resolve();
            ov.setCap(shot.caption);
            var f = shot.from, t = shot.to;
            img.animate([
              { transformOrigin: (f.x * 100) + '% ' + (f.y * 100) + '%', transform: 'scale(' + f.s + ')' },
              { transformOrigin: (t.x * 100) + '% ' + (t.y * 100) + '%', transform: 'scale(' + t.s + ')' },
            ], { duration: shot.ms + 500, easing: 'cubic-bezier(.45,.05,.35,1)', fill: 'forwards' });
            layer.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 450, fill: 'forwards' }).finished.then(function () { clearBelow(layer); });
            var s0 = spent; spent += shot.ms;
            timeline(shot.ms, function (k) { ov.prog.style.width = Math.min(100, (s0 + k * shot.ms) / total * 100) + '%'; }, ov).then(function () { resolve(); });
          });
        });
      });
    });
    return chain;
  }

  // ------------------------------------------------------------------ "Walk through in 3D"
  var tourEl = doc.getElementById('tour-data');
  var tours = tourEl ? JSON.parse(tourEl.textContent) : {};
  doc.querySelectorAll('[data-tour]').forEach(function (btn) {
    var t = tours[btn.getAttribute('data-tour')];
    if (!t || !world3d()) return;
    btn.hidden = false;
    btn.addEventListener('click', function () { tour(t); });
    btn.addEventListener('pointerenter', function () { SH.world.load().catch(function () {}); }, { once: true });
  });

  function tour(t) {
    if (active) return;
    var ov = overlay(t.title, { title: t.title, tour: true });
    var pause = el('button', 'btn btn--ghost btn--small'); pause.type = 'button'; pause.textContent = 'Pause';
    var next = el('button', 'btn btn--ghost btn--small'); next.type = 'button'; next.textContent = 'Next view';
    var close = el('button', 'btn btn--small'); close.type = 'button'; close.textContent = 'Close';
    ov.controls.appendChild(pause); ov.controls.appendChild(next); ov.controls.appendChild(close);
    var paused = false, i = 0, timer = null, w = null, who = { release: function () {} };
    function finish() { clearTimeout(timer); ov.cancelled = true; SH.world.release(who); ov.close(); }
    ov.onEscape = finish;
    close.addEventListener('click', finish);
    pause.addEventListener('click', function () {
      paused = !paused; pause.textContent = paused ? 'Play' : 'Pause';
      if (!paused) schedule(600);
    });
    next.addEventListener('click', function () { clearTimeout(timer); show(i + 1); });
    function schedule(ms) { clearTimeout(timer); if (!paused) timer = setTimeout(function () { show(i + 1); }, ms); }
    function show(k) {
      if (ov.cancelled || !w) return;
      if (k >= t.steps.length) { paused = true; pause.textContent = 'Play'; i = -1; ov.setCap('End of the walk-through'); close.focus(); return; }
      i = k;
      var s = t.steps[i];
      ov.setCap(s.caption);
      ov.prog.style.width = ((i + 1) / t.steps.length * 100) + '%';
      var moving = i === 0 ? Promise.resolve(w.setView(s.view)) : w.flyTo(s.view, { duration: s.fly || 2.6 });
      moving.then(function () { w.invalidate(); schedule(s.hold || 2200); });
    }
    pause.focus({ preventScroll: true });
    ov.setCap('Loading the estate…');
    SH.world.load().then(function (world) {
      if (ov.cancelled) return;
      w = world;
      SH.world.mount(ov.stage, who);
      ov.el.classList.add('is-3d');
      show(0);
    }).catch(function () { ov.setCap('The 3D walk-through could not start on this device.'); });
  }

  // Back/forward cache: never restore a page with the overlay still up.
  window.addEventListener('pageshow', function (e) { if (e.persisted && active) active.close(); });

  // Arriving on a stay page after the entry: settle the hero from the last frame.
  var hero = doc.querySelector('[data-room-hero]');
  if (hero) {
    try {
      if (sessionStorage.getItem('sh-entered') === hero.getAttribute('data-room-hero')) {
        sessionStorage.removeItem('sh-entered');
        if (!reduce) hero.classList.add('is-arriving');
      }
    } catch (e) {}
  }
})();
