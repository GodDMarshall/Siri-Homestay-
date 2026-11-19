/* Siri Homestay: shared behaviour for every public page. No dependencies. */
(function () {
  'use strict';
  var doc = document, root = doc.documentElement, body = doc.body;
  var reduce = root.classList.contains('reduce-motion');
  window.SH = window.SH || {};
  SH.reduce = reduce;

  // ---- Masthead: solid once past the hero, hides on scroll down -------------
  var head = doc.querySelector('[data-masthead]');
  var overImage = body.getAttribute('data-header') === 'over-image';
  var lastY = window.scrollY, ticking = false;
  function onScroll() {
    var y = window.scrollY;
    if (head) {
      var solidAt = overImage ? Math.max(80, window.innerHeight * 0.55) : 10;
      head.classList.toggle('is-solid', y > solidAt || !overImage);
      var hide = y > window.innerHeight && y > lastY + 4 && !body.classList.contains('menu-open');
      if (y < lastY - 4 || y < window.innerHeight) head.classList.remove('is-hidden');
      else if (hide) head.classList.add('is-hidden');
    }
    lastY = y;
    SH.scenes.forEach(function (fn) { fn(); });
    ticking = false;
  }
  SH.scenes = [];
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener('resize', function () { requestAnimationFrame(onScroll); });
  if (head) head.addEventListener('focusin', function () { head.classList.remove('is-hidden'); });

  // Progress of a tall "scene" section: 0 when its top hits the viewport top, 1 at its end.
  SH.progress = function (el) {
    var r = el.getBoundingClientRect();
    var span = r.height - window.innerHeight;
    if (span <= 0) return r.top <= 0 ? 1 : 0;
    return Math.min(1, Math.max(0, -r.top / span));
  };

  // ---- Mobile menu -----------------------------------------------------------
  var toggle = doc.querySelector('[data-menu-toggle]'), menu = doc.querySelector('[data-menu]');
  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
    body.classList.toggle('menu-open', open);
    if (open) { var a = menu.querySelector('a'); if (a) a.focus(); }
  }
  if (toggle && menu) {
    toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true'); });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); toggle.focus(); } });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  }

  // ---- Lightbox ----------------------------------------------------------------
  var dlg;
  function lightbox(list, index) {
    if (!dlg) {
      dlg = doc.createElement('dialog');
      dlg.className = 'lightbox';
      dlg.setAttribute('aria-label', 'Photo');
      dlg.innerHTML = '<img class="lightbox__img" alt=""><p class="lightbox__cap"></p>' +
        '<button type="button" class="lightbox__btn lightbox__prev">Previous</button>' +
        '<button type="button" class="lightbox__btn lightbox__next">Next</button>' +
        '<button type="button" class="lightbox__btn lightbox__close">Close</button>';
      body.appendChild(dlg);
      dlg.querySelector('.lightbox__close').addEventListener('click', function () { dlg.close(); });
      dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    }
    var img = dlg.querySelector('img'), cap = dlg.querySelector('.lightbox__cap');
    function show(i) {
      index = (i + list.length) % list.length;
      var a = list[index], thumb = a.querySelector('img');
      img.src = a.getAttribute('data-full');
      img.alt = thumb ? thumb.alt : '';
      cap.textContent = thumb ? thumb.alt : '';
    }
    dlg.querySelector('.lightbox__prev').onclick = function () { show(index - 1); };
    dlg.querySelector('.lightbox__next').onclick = function () { show(index + 1); };
    dlg.onkeydown = function (e) { if (e.key === 'ArrowLeft') show(index - 1); if (e.key === 'ArrowRight') show(index + 1); };
    show(index);
    if (!dlg.open) dlg.showModal();
  }
  doc.querySelectorAll('[data-lightbox]').forEach(function (ul) {
    var links = Array.prototype.slice.call(ul.querySelectorAll('a[data-full]'));
    links.forEach(function (a, i) {
      a.addEventListener('click', function (e) {
        if (e.metaKey || e.ctrlKey || typeof HTMLDialogElement === 'undefined') return;
        e.preventDefault(); lightbox(links, i);
      });
    });
  });

  // ---- Map: loaded from Google only when asked -------------------------------
  doc.querySelectorAll('[data-map]').forEach(function (box) {
    var btn = box.querySelector('[data-map-load]');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var f = doc.createElement('iframe');
      f.src = box.getAttribute('data-src');
      f.title = 'Map showing Siri Homestay at Joldal';
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      box.appendChild(f);
      btn.disabled = true;
    });
  });

  onScroll();
})();
