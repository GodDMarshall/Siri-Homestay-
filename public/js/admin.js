(function () {
  'use strict';
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-confirm]');
    if (b && !window.confirm(b.getAttribute('data-confirm'))) { e.preventDefault(); }
  });
  var t = document.querySelector('[data-side-toggle]'), nav = document.getElementById('side-nav');
  if (t && nav) t.addEventListener('click', function () {
    var open = t.getAttribute('aria-expanded') !== 'true';
    t.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open);
  });
  // Calendar: keep today's column in view.
  var wrap = document.querySelector('.cal-wrap'), today = wrap && wrap.querySelector('th.today');
  if (today) wrap.scrollLeft = Math.max(0, today.offsetLeft - 160);
})();
