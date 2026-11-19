/* Explore the estate. With 3D available the camera flies through the code-built estate
   between viewpoints and the hotspots stay pinned to the things they point at. Otherwise
   each scene is a rendered still of the same viewpoint, with the hotspots placed where
   those things fall in the picture. */
(function () {
  'use strict';
  var doc = document;
  var root = doc.querySelector('[data-explorer]');
  var dataEl = doc.getElementById('explore-data');
  if (!root || !dataEl) return;
  var reduce = doc.documentElement.classList.contains('reduce-motion');
  var scenes = JSON.parse(dataEl.textContent).scenes;
  var byId = {}; scenes.forEach(function (s, i) { s.index = i; byId[s.id] = s; });
  var stage = root.querySelector('[data-stage]'), spotsEl = root.querySelector('[data-spots]');
  var titleEl = root.querySelector('[data-title]'), textEl = root.querySelector('[data-text]'), countEl = root.querySelector('[data-count]');
  var mapBtns = Array.prototype.slice.call(root.querySelectorAll('[data-goto]'));
  var cur = { scene: scenes[0], el: stage.querySelector('[data-scene-el]') };
  var busy = false, w = null, who = { release: function () { root.classList.remove('is-3d'); w = null; } };

  function el(tag, cls) { var n = doc.createElement(tag); if (cls) n.className = cls; return n; }

  // Screen position of a spot: from the live 3D view, or where it falls in the still.
  function place(sp) {
    var r = stage.getBoundingClientRect();
    if (w) {
      var p = w.project(sp.anchor);
      return p && p.visible ? { x: p.x, y: p.y, w: r.width, h: r.height } : null;
    }
    if (sp.x == null) return null;
    var m = cur.scene.m, boxA = r.width / r.height, imgA = m.w / m.h, sx = 1, sy = 1; // object-fit: cover
    if (boxA > imgA) sy = imgA / boxA; else sx = boxA / imgA;
    return { x: ((sp.x - 0.5) / sx + 0.5) * r.width, y: ((sp.y - 0.5) / sy + 0.5) * r.height, w: r.width, h: r.height };
  }

  var buttons = [];
  function renderSpots() {
    spotsEl.innerHTML = ''; buttons = [];
    cur.scene.spots.forEach(function (sp) {
      var b = el('button', 'spot' + (sp.to ? ' spot--go' : ''));
      b.type = 'button';
      var dot = el('span', 'spot__dot'); dot.setAttribute('aria-hidden', 'true');
      var label = el('span', 'spot__label'); label.textContent = sp.label;
      b.appendChild(dot); b.appendChild(label);
      if (sp.to && byId[sp.to]) {
        b.setAttribute('aria-label', sp.label + ': go to ' + byId[sp.to].title);
        b.addEventListener('click', function () { go(sp.to, b); });
      } else {
        b.setAttribute('aria-label', sp.label);
        b.setAttribute('aria-pressed', 'false');
        b.addEventListener('click', function () {
          var open = !b.classList.contains('is-open');
          spotsEl.querySelectorAll('.spot.is-open').forEach(function (o) { o.classList.remove('is-open'); o.setAttribute('aria-pressed', 'false'); });
          b.classList.toggle('is-open', open); b.setAttribute('aria-pressed', String(open));
        });
      }
      buttons.push({ b: b, sp: sp });
      spotsEl.appendChild(b);
    });
    positionSpots();
  }
  function positionSpots() {
    buttons.forEach(function (o) {
      var pt = place(o.sp);
      var outside = !pt || pt.x < 24 || pt.y < 80 || pt.x > pt.w - 24 || pt.y > pt.h - 130;
      if (outside && !o.sp.to) { o.b.hidden = true; return; }
      if (!pt) { var r = stage.getBoundingClientRect(); pt = { x: r.width - 40, y: r.height * 0.4, w: r.width, h: r.height }; }
      if (outside) { pt.x = Math.min(pt.w - 28, Math.max(28, pt.x)); pt.y = Math.min(pt.h - 140, Math.max(90, pt.y)); }
      o.b.hidden = false;
      o.b.style.left = pt.x + 'px'; o.b.style.top = pt.y + 'px';
      o.b.classList.toggle('is-left', pt.x > pt.w * 0.62);
    });
  }

  function updatePanel(scene) {
    titleEl.textContent = scene.title;
    textEl.textContent = scene.text;
    countEl.textContent = (scene.index + 1) + ' of ' + scenes.length;
    mapBtns.forEach(function (b) { if (b.getAttribute('data-goto') === scene.id) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); });
    var activeBtn = root.querySelector('[data-goto="' + scene.id + '"]');
    if (activeBtn && activeBtn.scrollIntoView) activeBtn.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduce ? 'auto' : 'smooth' });
    try { history.replaceState(null, '', '#' + scene.id); } catch (e) {}
  }

  // ---- 3D: fly the camera
  function go3d(next) {
    busy = true;
    cur = { scene: next, el: cur.el };
    updatePanel(next);
    spotsEl.classList.add('is-moving');
    w.flyTo(next.view, { duration: 2.2 }).then(function () {
      busy = false;
      // the still behind the canvas follows, so nothing jumps if 3D is lost
      var img = cur.el.querySelector('img'); if (img && next.m) { img.src = next.m.src; img.alt = next.m.alt; }
      renderSpots();
      spotsEl.classList.remove('is-moving');
    });
  }

  // ---- stills: cross-fade (or zoom through a hotspot) to the next rendered view
  function makeEntry(scene) {
    var wrap = el('div', 'explorer__scene');
    var img = new Image();
    img.className = 'explorer__img'; img.alt = scene.m.alt; img.decoding = 'async';
    img.style.backgroundImage = 'url(' + scene.m.lqip + ')'; img.src = scene.m.src;
    wrap.appendChild(img);
    return { scene: scene, el: wrap, img: img };
  }
  function goStill(next, fromBtn) {
    busy = true;
    var old = cur, entry = makeEntry(next);
    stage.insertBefore(entry.el, spotsEl);
    spotsEl.innerHTML = '';
    var from = null;
    if (fromBtn) { var r = fromBtn.getBoundingClientRect(), s = stage.getBoundingClientRect(); from = { x: r.left - s.left, y: r.top - s.top }; }
    var ready = entry.img.decode ? entry.img.decode().catch(function () {}) : Promise.resolve();
    Promise.race([ready, new Promise(function (res) { setTimeout(res, 1200); })]).then(function () {
      cur = entry;
      updatePanel(next);
      if (reduce) { old.el.remove(); renderSpots(); busy = false; return; }
      old.el.classList.add('is-leaving');
      var origin = from ? (from.x + 'px ' + from.y + 'px') : '50% 50%';
      var dir = from ? 0 : (next.index > old.scene.index ? -1 : 1);
      old.el.animate(from
        ? [{ transformOrigin: origin, transform: 'scale(1)', opacity: 1 }, { transformOrigin: origin, transform: 'scale(2.2)', opacity: 0 }]
        : [{ transform: 'translateX(0)', opacity: 1 }, { transform: 'translateX(' + (dir * 6) + '%)', opacity: 0 }],
        { duration: from ? 850 : 650, easing: 'cubic-bezier(.55,0,.6,1)', fill: 'forwards' });
      entry.el.animate(from
        ? [{ transform: 'scale(1.18)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }]
        : [{ transform: 'translateX(' + (-dir * 6) + '%) scale(1.04)', opacity: 0 }, { transform: 'none', opacity: 1 }],
        { duration: from ? 1100 : 750, delay: from ? 250 : 80, easing: 'cubic-bezier(.2,.7,.3,1)', fill: 'backwards' })
        .finished.then(function () { old.el.remove(); renderSpots(); busy = false; });
    });
    var after = scenes[(next.index + 1) % scenes.length]; var pre = new Image(); pre.src = after.m.src;
  }

  function go(id, fromBtn) {
    var next = byId[id];
    if (!next || busy || next === cur.scene) return;
    if (w) go3d(next); else goStill(next, fromBtn);
  }

  root.querySelector('[data-next]').addEventListener('click', function () { go(scenes[(cur.scene.index + 1) % scenes.length].id); });
  root.querySelector('[data-prev]').addEventListener('click', function () { go(scenes[(cur.scene.index - 1 + scenes.length) % scenes.length].id); });
  mapBtns.forEach(function (b) { b.addEventListener('click', function () { go(b.getAttribute('data-goto')); }); });
  doc.addEventListener('keydown', function (e) {
    if (e.target.closest && e.target.closest('input, textarea, select')) return;
    if (e.key === 'ArrowRight') go(scenes[(cur.scene.index + 1) % scenes.length].id);
    if (e.key === 'ArrowLeft') go(scenes[(cur.scene.index - 1 + scenes.length) % scenes.length].id);
  });
  var sx0 = null, sy0 = 0;
  stage.addEventListener('touchstart', function (e) { if (e.touches.length === 1) { sx0 = e.touches[0].clientX; sy0 = e.touches[0].clientY; } }, { passive: true });
  stage.addEventListener('touchend', function (e) {
    if (sx0 === null) return;
    var dx = e.changedTouches[0].clientX - sx0, dy = e.changedTouches[0].clientY - sy0; sx0 = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) go(scenes[(cur.scene.index + (dx < 0 ? 1 : scenes.length - 1)) % scenes.length].id);
  }, { passive: true });
  var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(positionSpots, 120); });

  // Start on the still that is already in the page; honour a #scene in the address.
  renderSpots();
  var wanted = location.hash.slice(1);
  if (wanted && byId[wanted] && wanted !== cur.scene.id) setTimeout(function () { goStill(byId[wanted]); }, 50);

  // Then bring in the 3D estate behind the hotspots, from the current viewpoint.
  if (window.SH && SH.world && SH.world.able) {
    SH.world.load().then(function (world) {
      var host = el('div', 'explorer__3d');
      stage.insertBefore(host, spotsEl);
      var waitIdle = function () { if (busy) return setTimeout(waitIdle, 200); start(); };
      function start() {
        SH.world.mount(host, who);
        w = world;
        w.setView(cur.scene.view);
        w.onFrame = function () { positionSpots(); };
        w.invalidate();
        root.classList.add('is-3d');
        positionSpots();
      }
      waitIdle();
    }).catch(function () {});
  }
})();
