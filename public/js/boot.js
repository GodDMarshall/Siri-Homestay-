/* Runs before first paint (blocking, tiny). Sets feature classes used by the CSS. */
(function () {
  var d = document.documentElement;
  d.classList.add('js');
  try {
    var c = navigator.connection;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || (c && c.saveData)) d.classList.add('reduce-motion');
  } catch (e) {}
})();
