/* Cinematic moments built from the estate's real footage:
   1. The homepage arrival: a phone film of walking across the lawn to a villa door,
      scrubbed frame by frame with the scroll.
   2. Room entry: selecting a stay plays a short shot list (exterior push-in, the
      real walk-in film, then the bedroom) and lands on that stay's page. */
(function () {
  'use strict';
  var doc = document, body = doc.body;
  var reduce = doc.documentElement.classList.contains('reduce-motion');
  window.SH = window.SH || {}; SH.scenes = SH.scenes || [];

  // ---------------------------------------------------------------------------
  // 1. Arrival scrub
  // ---------------------------------------------------------------------------
  var sec = doc.querySelector('[data-arrival]');
  if (sec && !reduce) (function () {
    var cfg = JSON.parse(sec.getAttribute('data-arrival'));
    var canvas = sec.querySelector('.arrival__canvas'), ctx = canvas.getContext('2d');
    var bd = sec.querySelector('.arrival__backdrop canvas'), bctx = bd && bd.getContext('2d');
    var beats = Array.prototype.slice.call(sec.querySelectorAll('.beat'));
    var stage = sec.querySelector('.arrival__stage');
    var frames = new Array(cfg.count), started = false, current = -1, ready = false;

    function url(i) { return cfg.base + String(i).padStart(3, '0') + '.webp'; }
    function load(i) {
      if (frames[i]) return;
      var im = new Image(); im.decoding = 'async';
      frames[i] = { img: im, ok: false };
      im.onload = function () { frames[i].ok = true; if (!ready && i === 0) { ready = true; sec.classList.add('is-ready'); draw(true); } };
      im.src = url(i);
    }
    function start() {
      if (started) return; started = true;
      // Coarse to fine so scrubbing works early on slow connections.
      // Phones and data-saver get every second frame: half the download, still smooth.
      var conn = navigator.connection, lite = window.innerWidth < 760 || (conn && (conn.saveData || /2g/.test(conn.effectiveType || '')));
      var finest = lite ? 2 : 1;
      var order = [], seen = {};
      [8, 4, 2, 1].filter(function (st) { return st >= finest; }).forEach(function (step) { for (var i = 0; i < cfg.count; i += step) if (!seen[i]) { seen[i] = 1; order.push(i); } });
      var k = 0;
      (function pump() {
        for (var n = 0; n < 6 && k < order.length; n++) load(order[k++]);
        if (k < order.length) setTimeout(pump, 60);
      })();
    }
    function nearest(i) {
      for (var d = 0; d < cfg.count; d++) {
        var a = frames[i - d], b = frames[i + d];
        if (a && a.ok) return a.img; if (b && b.ok) return b.img;
      }
      return null;
    }
    function draw(force) {
      var p = SH.progress(sec);
      var i = Math.min(cfg.count - 1, Math.round(Math.min(1, p / 0.84) * (cfg.count - 1)));
      if (i !== current || force) {
        var im = nearest(i);
        if (im) {
          ctx.drawImage(im, 0, 0, canvas.width, canvas.height);
          if (bctx) bctx.drawImage(im, 0, 0, bd.width, bd.height);
          current = i;
        }
      }
      beats.forEach(function (b) {
        var on = p >= parseFloat(b.getAttribute('data-from')) && p < parseFloat(b.getAttribute('data-to'));
        b.classList.toggle('is-on', on);
      });
      stage.style.setProperty('--p', p.toFixed(3));
    }
    // Don't spend the visitor's data until they start moving down the page.
    load(0);
    function arm() { window.removeEventListener('scroll', arm); start(); }
    window.addEventListener('scroll', arm, { passive: true });
    if (window.scrollY > 0) arm();
    SH.scenes.push(function () {
      var r = sec.getBoundingClientRect();
      if (r.bottom < -50 || r.top > window.innerHeight + 50) return;
      draw(false);
    });
    beats[0].classList.add('is-on');
  })();

  // ---------------------------------------------------------------------------
  // 2. Room entry
  // ---------------------------------------------------------------------------
  var dataEl = doc.getElementById('cinema-data');
  var stays = dataEl ? JSON.parse(dataEl.textContent).stays : {};
  var preloaded = {}, videos = {};

  function preload(slug) {
    var s = stays[slug];
    if (!s || preloaded[slug]) return;
    preloaded[slug] = true;
    s.shots.forEach(function (shot) {
      if (shot.type === 'image' && shot.m) { var i = new Image(); i.src = shot.m.src; }
      if (shot.type === 'video' && shot.v && !videos[shot.v.src]) {
        var v = doc.createElement('video');
        v.muted = true; v.playsInline = true; v.preload = 'auto'; v.src = shot.v.src;
        v.setAttribute('muted', ''); v.setAttribute('playsinline', '');
        videos[shot.v.src] = v;
        try { v.load(); } catch (e) {}
      }
    });
  }

  doc.querySelectorAll('[data-enter]').forEach(function (a) {
    var slug = a.getAttribute('data-enter');
    ['pointerenter', 'focus', 'touchstart'].forEach(function (ev) { a.addEventListener(ev, function () { preload(slug); }, { passive: true, once: true }); });
  });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (e) { if (e.isIntersecting) { preload(e.target.getAttribute('data-enter')); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px 200px 0px' });
    doc.querySelectorAll('[data-enter]').forEach(function (a) { io.observe(a); });
  }

  doc.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-enter]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var s = stays[a.getAttribute('data-enter')];
    if (!s || reduce) return; // ordinary navigation
    e.preventDefault();
    play(s, a.getAttribute('href') || s.href);
  });

  function el(tag, cls, html) { var n = doc.createElement(tag); if (cls) n.className = cls; if (html) n.innerHTML = html; return n; }
  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var active = null;
  function play(s, href) {
    if (active) return;
    preload(s.slug);
    var overlay = el('div', 'cinema');
    overlay.setAttribute('role', 'dialog'); overlay.setAttribute('aria-modal', 'true'); overlay.setAttribute('aria-label', 'Entering ' + s.name);
    var title = el('p', 'cinema__title'); title.textContent = s.name;
    var cap = el('p', 'cinema__cap'); cap.setAttribute('aria-live', 'polite');
    var skip = el('a', 'btn btn--ghost btn--small cinema__skip'); skip.href = href; skip.textContent = 'Skip to the room';
    var bars = el('div', 'cinema__bars'); bars.setAttribute('aria-hidden', 'true');
    var prog = el('div', 'cinema__progress');
    var slats = el('div', 'cinema__slats', new Array(10).join('<i></i>'));
    overlay.appendChild(bars); overlay.appendChild(title); overlay.appendChild(cap); overlay.appendChild(skip); overlay.appendChild(prog); overlay.appendChild(slats);
    body.appendChild(overlay);
    var prevOverflow = body.style.overflow; body.style.overflow = 'hidden';
    var lastFocus = doc.activeElement;
    skip.focus({ preventScroll: true });

    var cancelled = false, done = false;
    active = { overlay: overlay };
    function go() {
      if (done) return; done = true;
      try { sessionStorage.setItem('sh-entered', s.slug); } catch (e) {}
      location.href = href;
    }
    function onKey(e) { if (e.key === 'Escape') { cancelled = true; go(); } if (e.key === 'Tab') { e.preventDefault(); skip.focus(); } }
    doc.addEventListener('keydown', onKey);
    skip.addEventListener('click', function () { cancelled = true; try { sessionStorage.setItem('sh-entered', s.slug); } catch (e) {} });
    active.cleanup = function () {
      doc.removeEventListener('keydown', onKey);
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      body.style.overflow = prevOverflow; active = null;
      if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    };

    var total = s.shots.reduce(function (t, sh) { return t + (sh.type === 'video' ? (sh.v ? sh.v.duration * 1000 / (sh.rate || 1) : 0) : sh.ms); }, 0);
    var t0 = performance.now();
    (function tick() { if (!active || done) return; prog.style.width = Math.min(100, (performance.now() - t0) / total * 100) + '%'; requestAnimationFrame(tick); })();

    function clearBelow(layer) {
      var n = layer.previousElementSibling;
      while (n) { var prev = n.previousElementSibling; if (n.classList.contains('cinema__layer')) n.parentNode.removeChild(n); n = prev; }
    }
    function setCap(text) { cap.classList.remove('is-on'); setTimeout(function () { cap.textContent = text || ''; if (text) cap.classList.add('is-on'); }, 180); }

    function imageShot(shot, isLast) {
      return new Promise(function (resolve) {
        var layer = el('div', 'cinema__layer');
        var img = el('img'); img.alt = ''; img.src = shot.m.src;
        layer.appendChild(img); layer.style.opacity = '0';
        overlay.insertBefore(layer, bars);
        var ready = img.decode ? img.decode().catch(function () {}) : Promise.resolve();
        Promise.race([ready, wait(1500)]).then(function () {
          if (cancelled) return resolve();
          setCap(shot.caption);
          var f = shot.from, t = shot.to;
          img.animate([
            { transformOrigin: (f.x * 100) + '% ' + (f.y * 100) + '%', transform: 'scale(' + f.s + ')' },
            { transformOrigin: (t.x * 100) + '% ' + (t.y * 100) + '%', transform: 'scale(' + t.s + ')' },
          ], { duration: shot.ms + 500, easing: 'cubic-bezier(.45,.05,.35,1)', fill: 'forwards' });
          layer.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 450, fill: 'forwards' }).finished.then(function () { clearBelow(layer); });
          if (isLast) img.style.viewTransitionName = 'room-hero';
          setTimeout(function () { resolve(layer); }, shot.ms);
        });
      });
    }

    function videoShot(shot) {
      return new Promise(function (resolve) {
        if (!shot.v) return resolve();
        var layer = el('div', 'cinema__layer cinema__layer--video');
        var blur = el('img', 'cinema__blur'); blur.alt = ''; blur.src = shot.v.poster;
        var v = videos[shot.v.src] || el('video');
        v.className = 'cinema__main'; v.muted = true; v.playsInline = true; v.setAttribute('muted', ''); v.setAttribute('playsinline', '');
        if (!v.src) v.src = shot.v.src;
        v.playbackRate = shot.rate || 1;
        v.currentTime = 0;
        layer.appendChild(blur); layer.appendChild(v); layer.style.opacity = '0';
        overlay.insertBefore(layer, bars);
        var finished = false;
        function finish() { if (finished) return; finished = true; resolve(layer); }
        function begin() {
          if (cancelled) return finish();
          setCap(shot.caption);
          layer.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, fill: 'forwards' }).finished.then(function () { clearBelow(layer); });
          var pr = v.play(); if (pr && pr.catch) pr.catch(finish);
          v.addEventListener('ended', finish, { once: true });
          v.addEventListener('timeupdate', function () { if (v.duration && v.currentTime > v.duration - 0.35) finish(); });
          setTimeout(finish, (shot.v.duration / (shot.rate || 1)) * 1000 + 1500);
        }
        if (v.readyState >= 3) begin();
        else {
          var to = setTimeout(function () { finish(); }, 3000); // slow network: skip the film, keep the photos
          v.addEventListener('canplay', function () { clearTimeout(to); begin(); }, { once: true });
          try { v.load(); } catch (e) {}
        }
      });
    }

    overlay.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, fill: 'forwards' });
    var chain = wait(200);
    s.shots.forEach(function (shot, i) {
      chain = chain.then(function () {
        if (cancelled) return;
        return shot.type === 'video' ? videoShot(shot) : imageShot(shot, i === s.shots.length - 1);
      });
    });
    chain.then(function () { if (!cancelled) go(); });
  }

  // Back/forward cache: never restore a page with the overlay still up.
  window.addEventListener('pageshow', function (e) { if (e.persisted && active && active.cleanup) active.cleanup(); });

  // Arriving on a stay page after the film: settle the hero from the last frame.
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
