/* Siri Homestay: scroll-driven photo tours. No dependencies.
   [data-tour]  home page: one full-screen photo at a time; scrolling moves to the next stop.
   [data-strip] stay pages: photos side by side in a row that moves sideways as you scroll.
   Without JavaScript, or with reduced motion, both stay as plain photo lists (the strip
   scrolls sideways on its own). */
(function () {
  'use strict';
  var doc = document;
  var SH = window.SH || { scenes: [], reduce: false };
  if (SH.reduce || !SH.progress) return;

  // ---- Tour: crossfade between photos as the visitor scrolls --------------------------
  doc.querySelectorAll('[data-tour]').forEach(function (sec) {
    var track = sec.querySelector('.tour__track');
    var stops = Array.prototype.slice.call(sec.querySelectorAll('.tour__stop'));
    var links = Array.prototype.slice.call(sec.querySelectorAll('[data-goto]'));
    if (!track || stops.length < 2) return;
    sec.classList.add('is-live');
    var current = -1;

    function show(i) {
      if (i === current) return;
      current = i;
      stops.forEach(function (li, k) {
        li.classList.toggle('is-on', k === i);
        li.classList.toggle('is-near', Math.abs(k - i) === 1);
      });
      links.forEach(function (a, k) {
        if (k === i) a.setAttribute('aria-current', 'step'); else a.removeAttribute('aria-current');
      });
      // Load the next photo early so the change never shows a blank frame.
      var next = stops[i + 1] && stops[i + 1].querySelector('img');
      if (next && next.loading === 'lazy') next.loading = 'eager';
    }

    function update() {
      var r = track.getBoundingClientRect();
      if (r.bottom < -50 || r.top > window.innerHeight + 50) return;
      var p = SH.progress(track);
      show(Math.min(stops.length - 1, Math.floor(p * stops.length)));
    }

    links.forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var i = Number(a.getAttribute('data-goto'));
        var span = track.offsetHeight - window.innerHeight;
        var top = track.getBoundingClientRect().top + window.scrollY + span * (i + 0.5) / stops.length;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });

    SH.scenes.push(update);
    update();
  });

  // ---- Strip: a row of photos side by side, moved sideways by vertical scrolling ------
  doc.querySelectorAll('[data-strip]').forEach(function (sec) {
    var track = sec.querySelector('.strip__track');
    var row = sec.querySelector('.strip__row');
    if (!track || !row) return;
    sec.classList.add('is-live');
    row.removeAttribute('tabindex'); // the page scroll moves it now
    var travel = 0;

    function measure() {
      var stage = row.parentNode;
      travel = Math.max(0, row.scrollWidth - stage.clientWidth);
      // Scrolling down by `travel` pixels moves the row by the same distance.
      track.style.height = (window.innerHeight + travel) + 'px';
      update();
    }

    function update() {
      var r = track.getBoundingClientRect();
      if (r.bottom < -50 || r.top > window.innerHeight + 50) return;
      var p = SH.progress(track);
      row.style.transform = 'translate3d(' + (-p * travel).toFixed(1) + 'px,0,0)';
      row.parentNode.style.setProperty('--p', p.toFixed(3));
    }

    // Keyboard users who tab to a photo get it scrolled into the visible part of the row.
    row.addEventListener('focusin', function (e) {
      var item = e.target.closest('.strip__item');
      if (!item || !travel) return;
      var x = item.offsetLeft - (row.parentNode.clientWidth - item.offsetWidth) / 2;
      var p = Math.min(1, Math.max(0, x / travel));
      var top = track.getBoundingClientRect().top + window.scrollY + p * (track.offsetHeight - window.innerHeight);
      window.scrollTo({ top: top });
    });

    SH.scenes.push(update);
    window.addEventListener('resize', measure);
    Array.prototype.forEach.call(row.querySelectorAll('img'), function (img) {
      if (!img.complete) img.addEventListener('load', measure, { once: true });
    });
    measure();
  });
})();
