/* Explore the estate: one real photograph per scene, rendered with depth, with
   hotspots placed on what is actually in the frame. Choosing a "go" hotspot flies
   the camera into that point and lands in the next scene. */
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
  var cur = { scene: scenes[0], el: stage.querySelector('[data-scene-el]'), view: null };
  var busy = false;

  function el(tag, cls) { var n = doc.createElement(tag); if (cls) n.className = cls; return n; }

  // Where a point of the photo (0..1) lands on screen, matching how it's drawn.
  function project(scene, x, y, live) {
    var r = stage.getBoundingClientRect();
    var boxA = r.width / r.height, imgA = scene.m.w / scene.m.h, sx = 1, sy = 1;
    if (boxA > imgA) sy = imgA / boxA; else sx = boxA / imgA;
    var shx = 0, shy = 0, k = 1;
    if (live) { var f = scene.focus || [0.5, 0.5]; shx = (f[0] - 0.5) * (1 - sx); shy = (f[1] - 0.5) * (1 - sy); k = 0.94; }
    return { x: ((x - 0.5 - shx) / (sx * k) + 0.5) * r.width, y: ((y - 0.5 - shy) / (sy * k) + 0.5) * r.height, w: r.width, h: r.height };
  }

  function renderSpots() {
    spotsEl.innerHTML = '';
    var s = cur.scene, live = !!(cur.view && cur.el.querySelector('.depth.is-live'));
    s.spots.forEach(function (sp) {
      var pt = project(s, sp.x, sp.y, live);
      var outside = pt.x < 24 || pt.y < 80 || pt.x > pt.w - 24 || pt.y > pt.h - 130;
      if (outside && !sp.to) return; // cropped out on this screen
      if (outside) { // keep scene links reachable: pin them to the nearest edge
        pt.x = Math.min(pt.w - 28, Math.max(28, pt.x)); pt.y = Math.min(pt.h - 140, Math.max(90, pt.y));
      }
      var b = el('button', 'spot' + (sp.to ? ' spot--go' : ''));
      b.type = 'button';
      b.style.left = pt.x + 'px'; b.style.top = pt.y + 'px';
      if (pt.x > pt.w * 0.62) b.classList.add('is-left');
      var dot = el('span', 'spot__dot'); dot.setAttribute('aria-hidden', 'true');
      var label = el('span', 'spot__label'); label.textContent = sp.label;
      b.appendChild(dot); b.appendChild(label);
      if (sp.to && byId[sp.to]) {
        b.setAttribute('aria-label', sp.label + ': go to ' + byId[sp.to].title);
        b.addEventListener('click', function () { go(sp.to, pt); });
      } else {
        b.setAttribute('aria-label', sp.label);
        b.setAttribute('aria-pressed', 'false');
        b.addEventListener('click', function () {
          var open = !b.classList.contains('is-open');
          spotsEl.querySelectorAll('.spot.is-open').forEach(function (o) { o.classList.remove('is-open'); o.setAttribute('aria-pressed', 'false'); });
          b.classList.toggle('is-open', open); b.setAttribute('aria-pressed', String(open));
        });
      }
      spotsEl.appendChild(b);
    });
  }

  function attachDepth(entry) {
    if (!window.SH || !SH.depthAvailable || !entry.scene.m.depth) return;
    var host = el('div', 'depth-host depth');
    entry.el.appendChild(host);
    var view = new SH.DepthView(host, { src: entry.scene.m.src, small: entry.scene.m.srcSmall, depth: entry.scene.m.depth, focus: entry.scene.focus, strength: 0.85 });
    entry.view = view;
    view.init().then(function () { setTimeout(function () { if (cur === entry) renderSpots(); }, 850); }).catch(function () {});
  }

  function makeEntry(scene) {
    var wrap = el('div', 'explorer__scene');
    var img = new Image();
    img.className = 'explorer__img'; img.alt = scene.m.alt; img.decoding = 'async';
    img.style.backgroundImage = 'url(' + scene.m.lqip + ')'; img.src = scene.m.src;
    wrap.appendChild(img);
    return { scene: scene, el: wrap, view: null, img: img };
  }

  function updatePanel(scene) {
    titleEl.textContent = scene.title;
    textEl.textContent = scene.text;
    countEl.textContent = (scene.index + 1) + ' of ' + scenes.length;
    mapBtns.forEach(function (b) { if (b.getAttribute('data-goto') === scene.id) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); });
    var active = root.querySelector('[data-goto="' + scene.id + '"]');
    if (active && active.scrollIntoView) active.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduce ? 'auto' : 'smooth' });
    try { history.replaceState(null, '', '#' + scene.id); } catch (e) {}
  }

  function go(id, from) {
    var next = byId[id];
    if (!next || busy || next === cur.scene) return;
    busy = true;
    var old = cur, entry = makeEntry(next);
    stage.insertBefore(entry.el, spotsEl);
    spotsEl.innerHTML = '';
    var ready = entry.img.decode ? entry.img.decode().catch(function () {}) : Promise.resolve();
    Promise.race([ready, new Promise(function (r) { setTimeout(r, 1200); })]).then(function () {
      cur = entry;
      updatePanel(next);
      if (reduce) {
        old.el.remove(); if (old.view) old.view.destroy();
        attachDepth(entry); renderSpots(); busy = false; return;
      }
      old.el.classList.add('is-leaving');
      var origin = from ? (from.x + 'px ' + from.y + 'px') : '50% 50%';
      var dir = from ? 0 : (next.index > old.scene.index ? -1 : 1);
      old.el.animate(from
        ? [{ transformOrigin: origin, transform: 'scale(1)', opacity: 1, filter: 'blur(0)' }, { transformOrigin: origin, transform: 'scale(2.2)', opacity: 0, filter: 'blur(6px)' }]
        : [{ transform: 'translateX(0)', opacity: 1 }, { transform: 'translateX(' + (dir * 6) + '%)', opacity: 0 }],
        { duration: from ? 850 : 650, easing: 'cubic-bezier(.55,0,.6,1)', fill: 'forwards' });
      entry.el.animate(from
        ? [{ transform: 'scale(1.18)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }]
        : [{ transform: 'translateX(' + (-dir * 6) + '%) scale(1.04)', opacity: 0 }, { transform: 'none', opacity: 1 }],
        { duration: from ? 1100 : 750, delay: from ? 250 : 80, easing: 'cubic-bezier(.2,.7,.3,1)', fill: 'backwards' })
        .finished.then(function () {
          old.el.remove(); if (old.view) old.view.destroy();
          attachDepth(entry); renderSpots(); busy = false;
        });
    });
    // warm the cache for the following scene
    var after = scenes[(next.index + 1) % scenes.length]; var pre = new Image(); pre.src = after.m.src;
  }

  root.querySelector('[data-next]').addEventListener('click', function () { go(scenes[(cur.scene.index + 1) % scenes.length].id); });
  root.querySelector('[data-prev]').addEventListener('click', function () { go(scenes[(cur.scene.index - 1 + scenes.length) % scenes.length].id); });
  mapBtns.forEach(function (b) { b.addEventListener('click', function () { go(b.getAttribute('data-goto')); }); });
  doc.addEventListener('keydown', function (e) {
    if (e.target.closest && e.target.closest('input, textarea, select')) return;
    if (e.key === 'ArrowRight') go(scenes[(cur.scene.index + 1) % scenes.length].id);
    if (e.key === 'ArrowLeft') go(scenes[(cur.scene.index - 1 + scenes.length) % scenes.length].id);
  });
  // Swipe between scenes on touch screens.
  var sx0 = null, sy0 = 0;
  stage.addEventListener('touchstart', function (e) { if (e.touches.length === 1) { sx0 = e.touches[0].clientX; sy0 = e.touches[0].clientY; } }, { passive: true });
  stage.addEventListener('touchend', function (e) {
    if (sx0 === null) return;
    var dx = e.changedTouches[0].clientX - sx0, dy = e.changedTouches[0].clientY - sy0; sx0 = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) go(scenes[(cur.scene.index + (dx < 0 ? 1 : scenes.length - 1)) % scenes.length].id);
  }, { passive: true });
  var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(renderSpots, 120); });

  // Start: the first scene is already in the HTML; honour a #scene in the address.
  cur.el.querySelector('img') && (cur.img = cur.el.querySelector('img'));
  attachDepth(cur);
  renderSpots();
  var wanted = location.hash.slice(1);
  if (wanted && byId[wanted] && wanted !== cur.scene.id) { setTimeout(function () { go(wanted); }, 50); }
})();
