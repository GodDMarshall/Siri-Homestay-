/* Enquiry form: keeps dates sensible, shows the number of nights, and checks the
   hosts' calendar when (and only when) the owner has chosen to publish it. */
(function () {
  'use strict';
  var form = document.querySelector('[data-enquiry]');
  if (!form) return;
  var cin = form.querySelector('[name="check_in"]'), cout = form.querySelector('[name="check_out"]');
  var nightsEl = form.querySelector('[data-nights]'), availEl = form.querySelector('[data-avail]');
  var unitsField = form.querySelector('[data-units-field]'), units = form.querySelector('[name="units"]');
  var published = form.getAttribute('data-published') === '1';

  function addDays(s, n) { var d = new Date(s + 'T00:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); }
  function stay() { var r = form.querySelector('[name="room_type"]:checked'); return r ? { slug: r.value, kind: r.getAttribute('data-kind'), max: +r.getAttribute('data-max') } : null; }

  function sync() {
    var s = stay();
    if (unitsField) unitsField.hidden = !s || s.kind === 'whole_property';
    if (cin.value) {
      var min = addDays(cin.value, 1);
      cout.min = min;
      if (cout.value && cout.value <= cin.value) cout.value = min;
    }
    if (cin.value && cout.value && cout.value > cin.value) {
      var n = Math.round((Date.parse(cout.value) - Date.parse(cin.value)) / 86400000);
      nightsEl.textContent = n + (n === 1 ? ' night' : ' nights');
    } else nightsEl.textContent = '';
    check();
  }

  var seq = 0;
  function check() {
    if (!published || !availEl) return;
    var s = stay();
    if (!s || !cin.value || !cout.value || cout.value <= cin.value) { availEl.textContent = ''; availEl.className = 'avail-note'; return; }
    var my = ++seq, need = s.kind === 'whole_property' ? 1 : +(units && units.value || 1);
    availEl.className = 'avail-note'; availEl.textContent = 'Checking the hosts’ calendar…';
    fetch('/api/availability?stay=' + encodeURIComponent(s.slug) + '&from=' + cin.value + '&to=' + cout.value, { headers: { accept: 'application/json' } })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (my !== seq) return;
        if (!d || !d.published) { availEl.textContent = 'The hosts check availability for every enquiry and reply personally.'; return; }
        if (d.minFree >= need) {
          availEl.className = 'avail-note is-open';
          availEl.textContent = 'Not booked on the hosts’ calendar yet. Send your enquiry and they’ll confirm.';
        } else {
          availEl.className = 'avail-note is-full';
          availEl.textContent = s.kind === 'whole_property'
            ? 'Some villas are taken on these dates, so the whole estate isn’t free. Try other dates or call the hosts.'
            : (d.minFree === 0 ? 'The hosts’ calendar shows these dates as full.' : 'Only ' + d.minFree + ' villa' + (d.minFree > 1 ? 's are' : ' is') + ' free for every night of these dates.') + ' Try other dates or call the hosts.';
        }
      }).catch(function () { availEl.textContent = ''; });
  }

  form.addEventListener('change', sync);
  cin.addEventListener('input', sync); cout.addEventListener('input', sync);
  sync();

  var summary = form.querySelector('[data-error-summary]');
  if (summary) { summary.focus(); }

  form.addEventListener('submit', function () {
    var b = form.querySelector('button[type="submit"]');
    if (b) { setTimeout(function () { b.disabled = true; b.textContent = 'Sending…'; }, 0); }
  });
})();
