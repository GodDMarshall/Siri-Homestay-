'use strict';
const { html, raw, jsonForScript } = require('../lib/html');
const { layout, contactList, waLink, ICON } = require('./layout');
const A = require('../web/assets');
const { fmtDate, today, addDays, diffDays } = require('../lib/dates');
const { formatPhone } = require('../domain/catalog');

// ---------------------------------------------------------------------------
// Explore scenes: each is a viewpoint in the 3D estate (src/world/views.js). Hotspots are
// pinned to named 3D anchors; on the rendered stills they sit where the render placed them.
// ---------------------------------------------------------------------------
const SCENES = [
  { id: 'lawn', view: 'lawn-stepping-stones', title: 'The lawn',
    text: 'The main lawn, with stepping stones, umbrella tables and the volleyball net, ringed by bamboo and tall trees.',
    spots: [
      { anchor: 'umbrellaP5', label: 'Umbrella tables', to: 'umbrellas' },
      { anchor: 'net', label: 'Volleyball net', to: 'dining' },
      { anchor: 'stones', label: 'Stepping stones across the grass' },
    ] },
  { id: 'umbrellas', view: 'lawn-table-villa', title: 'Umbrella tables',
    text: 'Round tables under big white umbrellas, each on its own concrete circle, with a villa behind the bamboo.',
    spots: [
      { anchor: 'villa', label: 'Walk to a villa', to: 'villa' },
      { anchor: 'tableP3', label: 'Seats for six under each umbrella' },
    ] },
  { id: 'dining', view: 'estate-lawn-dining', title: 'Dining hall and lawn',
    text: 'The dining hall is the open building on the left. Firewood is stacked for the evening campfire.',
    spots: [
      { anchor: 'diningHall', label: 'The dining hall' },
      { anchor: 'courtyard', label: 'Across to the courtyard', to: 'courtyard' },
      { anchor: 'net', label: 'Volleyball net' },
      { anchor: 'firewood', label: 'Firewood for the campfire' },
    ] },
  { id: 'villa', view: 'villa-patio', title: 'A villa patio',
    text: 'Sliding glass doors open onto a patio with root-wood chairs, behind tall golden bamboo.',
    spots: [
      { anchor: 'door', label: 'Go inside', to: 'bedroom' },
      { anchor: 'patioChairs', label: 'Root-wood chairs and table' },
      { anchor: 'pool', label: 'The pool by the villa', to: 'pool' },
    ] },
  { id: 'bedroom', view: 'villa-bedroom', title: 'Inside a villa',
    text: 'A king-size bed with a single bed alongside, and glass that opens straight onto the garden.',
    spots: [
      { anchor: 'bed', label: 'King-size bed' },
      { anchor: 'glass', label: 'Back out to the lawn', to: 'lawn' },
      { anchor: 'dayBed', label: 'Day bed by the glass' },
    ] },
  { id: 'pool', view: 'villa-window-pool', title: 'The pool by the window',
    text: 'In some villas the bedroom glass looks onto a small blue-lined pool and a grove of bamboo.',
    spots: [
      { anchor: 'pool', label: 'Blue-lined pool' },
      { anchor: 'sideTable', label: 'Glass and root-wood side table' },
      { anchor: 'glass', label: 'Back to the bedroom', to: 'bedroom' },
    ] },
  { id: 'courtyard', view: 'courtyard-villas', title: 'The courtyard',
    text: 'A paved courtyard between cottages, lined with potted plants under a spreading tree.',
    spots: [
      { anchor: 'cottage', label: 'Cottage' },
      { anchor: 'potRow', label: 'Potted plants along the grass' },
      { anchor: 'cottageV5', label: 'Cottage' },
    ] },
  { id: 'night', view: 'night-garden', title: 'After dark',
    text: 'Floodlights come on over the lawn and low lamps glow along the beds.',
    spots: [
      { anchor: 'tableP5', label: 'Umbrella table under the lights' },
      { anchor: 'gardenLamp', label: 'Garden lamps' },
      { anchor: 'net', label: 'Back to the lawn', to: 'lawn' },
    ] },
];

const ACTIVITIES = [
  'Volleyball on the lawn',
  'Cricket',
  'Campfire evenings',
  'Barbecue, on request',
  'Chess, carrom and ludo',
  'Walks through the coffee and pepper plantations around the estate',
];

const PLACES = [
  { name: 'Mullayanagiri', text: 'Karnataka’s highest peak, about 1,930 m, in the Chandra Drona hills of the Western Ghats.' },
  { name: 'Baba Budangiri (Datta Peetha)', text: 'A hill shrine revered by both Hindus and Muslims, with a cave linked to Guru Dattatreya and the saint Dada Hayath.' },
  { name: 'Bhadra Wildlife Sanctuary', text: 'A tiger reserve around the Bhadra backwaters, home to gaur, elephants and chital. About 30 km from the homestay.' },
  { name: 'Kemmangundi', text: 'A forested hill station on the Baba Budan range, at about 1,434 m.' },
  { name: 'Kallathigiri Falls', text: 'A tall waterfall with an old Veerabhadra temple in the rocks behind it, about 10 km from Kemmangundi.' },
];

function stayCardData(rt) {
  const t = Array.isArray(rt.transition) ? { world: [], stills: rt.transition.filter((s) => s.type === 'image') } : (rt.transition || {});
  return {
    slug: rt.slug, name: rt.name, href: `/stay/${rt.slug}`,
    world: t.world || [],
    stills: (t.stills || []).map((s) => ({ ...s, m: A.clientMedia(s.media) })).filter((s) => s.m),
  };
}

// Guided 3D walk-throughs, one per stay (played by cinema.js).
const TOURS = {
  'garden-villa': { title: 'Walk through a garden villa', steps: [
    { view: 'villa-patio', caption: 'The patio, behind golden bamboo' },
    { view: 'walk-door', caption: 'The sliding door, with the welcome mat' },
    { view: 'villa-bedroom', caption: 'The bedroom' },
    { view: 'room-beds', caption: 'A king-size bed and a single bed' },
    { view: 'villa-window-pool', caption: 'The pool, just beyond the glass' },
    { view: 'bath-basin', caption: 'The attached bathroom' },
  ] },
  'whole-estate': { title: 'Walk through the estate', steps: [
    { view: 'aerial', caption: 'Five villas on 4.28 acres' },
    { view: 'lawn-stepping-stones', caption: 'Stepping stones across the lawn', fly: 3.2 },
    { view: 'estate-lawn-dining', caption: 'The dining hall across the lawn' },
    { view: 'courtyard-villas', caption: 'Cottages around the courtyard', fly: 3 },
    { view: 'pond', caption: 'The pond, about 15,000 sq ft', fly: 3 },
    { view: 'night-garden', caption: 'The lawn after dark', fly: 3 },
  ] },
};
const tourData = (slug) => html`<script type="application/json" id="tour-data">${jsonForScript({ [slug]: TOURS[slug] })}</script>`;

function cinemaData(stays) {
  return html`<script type="application/json" id="cinema-data">${jsonForScript({ stays: Object.fromEntries(stays.map((rt) => [rt.slug, stayCardData(rt)])) })}</script>`;
}

function sleeps(rt) {
  return rt.kind === 'whole_property' ? `Up to ${rt.max_guests} guests across all five villas` : `Sleeps up to ${rt.max_guests}`;
}

// ---------------------------------------------------------------------------
// Home
// ---------------------------------------------------------------------------
function home(ctx) {
  const { property: p, stays, contacts } = ctx;
  const hero = A.clientMedia('lawn-stepping-stones');
  const walkStills = [['arrival-start', 0, 0.3], ['villa-patio', 0.3, 0.56], ['walk-door', 0.56, 0.8], ['walk-bed', 0.8, 1.01]];
  const body = html`
<section class="hero" aria-labelledby="hero-title">
  <div class="hero__media" data-hero3d="lawn-stepping-stones">
    ${A.img('lawn-stepping-stones', { cls: 'hero__still', loading: 'eager', fetchpriority: 'high', sizes: '100vw', pos: '58% 50%' })}
  </div>
  <div class="slats" aria-hidden="true">${raw('<i></i>'.repeat(9))}</div>
  <div class="hero__copy">
    <h1 id="hero-title" class="display hero__title">Five villas among the golden bamboo</h1>
    <p class="hero__lede">Siri Homestay is a 4.28-acre estate at Joldal, about 10 km from Chikmagalur town, with a wide lawn, a separate dining hall and Malnad meals from its own kitchen.</p>
    <div class="hero__actions">
      <a class="btn" href="/enquire">Send an enquiry</a>
      <a class="btn btn--ghost" href="#arrive">Walk in</a>
    </div>
  </div>
  <p class="hero__caption">The lawn, rebuilt in 3D</p>
</section>

<section class="walk" id="arrive" data-walk3d aria-labelledby="arrive-title">
  <h2 id="arrive-title" class="visually-hidden">Walk to a villa</h2>
  <div class="walk__stage">
    <div class="walk__frame">
      ${walkStills.map(([k, from, to], i) => html`<div class="walk__still${i === 0 ? ' is-on' : ''}" data-from="${from}" data-to="${to}">${A.img(k, { sizes: '100vw', alt: '' })}</div>`)}
    </div>
    <ol class="walk__beats">
      <li class="beat is-on" data-from="0" data-to="0.3"><p>A stone path crosses the lawn.</p></li>
      <li class="beat" data-from="0.3" data-to="0.56"><p>The villas sit behind screens of golden bamboo.</p></li>
      <li class="beat" data-from="0.56" data-to="0.8"><p>The glass door slides open.</p></li>
      <li class="beat beat--last" data-from="0.78" data-to="1.01"><p>And you’re in.</p>
        <a class="btn" href="/stay/garden-villa" data-enter="garden-villa">Step inside a villa</a></li>
    </ol>
    <div class="culm" aria-hidden="true"><span class="culm__fill"></span><i style="--at:.3"></i><i style="--at:.56"></i><i style="--at:.8"></i></div>
    <p class="walk__note">The estate rebuilt in 3D from the owners’ photographs</p>
  </div>
</section>

<section class="ledger" aria-labelledby="estate-title">
  <div class="ledger__inner">
    <h2 id="estate-title" class="ledger__title">The estate</h2>
    <p class="ledger__text"><b>4.28 acres</b> of lawn, bamboo and trees. <b>Five villas.</b> A separate dining hall and kitchen, with staff quarters on the estate. A pond of about <b>15,000 sq ft</b>. A lawn for volleyball, cricket and campfires. A <b>7.5 kW</b> generator and a <b>4 kW</b> UPS, so a power cut doesn’t end the evening. And a homestay licence, so everything is above board.</p>
    <a class="link" href="/estate">Read about the estate</a>
  </div>
  <figure class="ledger__figure">
    ${A.img('courtyard-villas', { sizes: '(min-width: 900px) 40vw, 100vw' })}
    <figcaption>Villas around the courtyard</figcaption>
  </figure>
</section>

<section class="stays" aria-labelledby="stays-title">
  <div class="stays__head">
    <h2 id="stays-title" class="section-title">Where you’ll sleep</h2>
    <p>Take a villa, or the whole estate for your group. Choose one to step inside.</p>
  </div>
  <div class="stays__grid">
    ${stays.map((rt, i) => html`
    <article class="stay${i === 0 ? ' stay--lead' : ''}">
      <a class="stay__media" href="/stay/${rt.slug}" data-enter="${rt.slug}" aria-label="Step inside: ${rt.name}">
        ${A.img(rt.media.card, { sizes: i === 0 ? '(min-width: 900px) 58vw, 100vw' : '(min-width: 900px) 38vw, 100vw' })}
        <span class="stay__play">${ICON.play}<span>Step inside</span></span>
      </a>
      <div class="stay__body">
        <h3 class="stay__name">${rt.name}</h3>
        <p>${rt.summary}</p>
        <p class="stay__meta">${sleeps(rt)}</p>
        <div class="stay__actions">
          <a class="btn btn--light" href="/stay/${rt.slug}" data-enter="${rt.slug}">Step inside</a>
          <a class="link link--light" href="/enquire?stay=${rt.slug}">Enquire about dates</a>
        </div>
      </div>
    </article>`)}
  </div>
</section>

<section class="peek" aria-labelledby="peek-title">
  <a class="peek__media" href="/explore" tabindex="-1" aria-hidden="true">
    ${A.img('bamboo-view-lawn', { sizes: '(min-width: 900px) 45vw, 100vw', alt: '' })}
    <span class="peek__slats">${raw('<i></i>'.repeat(7))}</span>
  </a>
  <div class="peek__copy">
    <h2 id="peek-title" class="section-title">Walk the grounds</h2>
    <p>Move from the lawn to a villa patio, inside to the bedroom, across to the courtyard and out into the garden after dark, through the estate rebuilt in 3D.</p>
    <a class="btn" href="/explore">Explore the estate</a>
  </div>
</section>

<section class="kitchen" aria-labelledby="kitchen-title">
  <figure class="kitchen__figure">
    ${A.img('estate-lawn-dining', { sizes: '(min-width: 900px) 50vw, 100vw', pos: '12% 40%' })}
    <figcaption>The dining hall, left, across the lawn</figcaption>
  </figure>
  <div class="kitchen__copy">
    <h2 id="kitchen-title" class="section-title">Meals from the estate kitchen</h2>
    <p>Breakfast is South Indian or continental. Lunch and dinner are Malnad cooking, vegetarian and non-vegetarian, served in the separate dining hall. Ask the hosts what’s included in your stay when you enquire.</p>
    <h3 class="kitchen__sub">Things to do here</h3>
    <ul class="ticks">${ACTIVITIES.map((a) => html`<li>${a}</li>`)}</ul>
  </div>
</section>

<section class="dusk" data-dusk aria-labelledby="dusk-title">
  <div class="dusk__stage">
    ${A.img('lawn-umbrellas', { cls: 'dusk__day', sizes: '100vw', alt: '' })}
    ${A.img('night-garden', { cls: 'dusk__night', sizes: '100vw' })}
    <div class="dusk__copy">
      <h2 id="dusk-title" class="section-title">When the lights come on</h2>
      <p>After dark, floodlights light the lawn and low lamps glow along the beds. The volleyball net stays up, and the firewood is stacked for a campfire.</p>
    </div>
  </div>
</section>

<section class="around" aria-labelledby="around-title">
  <div class="around__head">
    <h2 id="around-title" class="section-title">Around Joldal</h2>
    <p>Joldal is about 10 km from Chikmagalur town, in the district where coffee was first grown in India.</p>
    <a class="link" href="/around">Directions and nearby places</a>
  </div>
  <ul class="places">${PLACES.map((pl) => html`<li><h3>${pl.name}</h3><p>${pl.text}</p></li>`)}</ul>
</section>

<section class="plan" id="plan" aria-labelledby="plan-title">
  <div class="plan__copy">
    <h2 id="plan-title" class="section-title">Plan your stay</h2>
    <p>Call or WhatsApp the hosts, or send your dates and they’ll reply. Nothing is booked or charged until they confirm with you.</p>
    ${contactList(contacts)}
  </div>
  ${quickForm(ctx)}
</section>
${cinemaData(stays)}`;
  return layout(ctx, {
    theme: 'over-image', bodyClass: 'page-home',
    description: 'Siri Homestay: five villas on a 4.28-acre estate at Joldal near Chikmagalur, with a lawn, golden bamboo, a separate dining hall and Malnad meals. Send an enquiry or call the hosts.',
    preload: html`<link rel="preload" as="image" href="${hero.src}" imagesrcset="${A.srcset(A.media('lawn-stepping-stones'))}" imagesizes="100vw">`,
    scripts: ['/js/cinema.js'], modules: ['/js/estate3d.js'], image: 'lawn-stepping-stones', body,
  });
}

function quickForm(ctx) {
  const t = today();
  return html`<form class="quick" action="/enquire" method="get" aria-labelledby="quick-title">
    <h3 id="quick-title" class="quick__title">Check your dates with the hosts</h3>
    <div class="field"><label for="q-stay">Stay</label>
      <select id="q-stay" name="stay">${ctx.stays.map((rt) => html`<option value="${rt.slug}">${rt.name}</option>`)}</select></div>
    <div class="row">
      <div class="field"><label for="q-in">Arrive</label><input id="q-in" type="date" name="in" min="${t}"></div>
      <div class="field"><label for="q-out">Leave</label><input id="q-out" type="date" name="out" min="${addDays(t, 1)}"></div>
    </div>
    <div class="field"><label for="q-adults">Adults</label><input id="q-adults" type="number" name="adults" min="1" max="20" value="2" inputmode="numeric"></div>
    <button class="btn" type="submit">Continue to your enquiry</button>
  </form>`;
}

// ---------------------------------------------------------------------------
// Stays
// ---------------------------------------------------------------------------
function stayIndex(ctx) {
  const body = html`
<section class="page-head">
  <h1 class="display page-head__title">Stay</h1>
  <p class="page-head__lede">There are five villas on the estate. Book one or more, or take them all with the dining hall and the lawn for your group.</p>
</section>
<section class="stays stays--page" aria-label="Stay options">
  <div class="stays__grid">
    ${ctx.stays.map((rt, i) => html`
    <article class="stay${i === 0 ? ' stay--lead' : ''}">
      <a class="stay__media" href="/stay/${rt.slug}" data-enter="${rt.slug}" aria-label="Step inside: ${rt.name}">
        ${A.img(rt.media.card, { sizes: '(min-width: 900px) 50vw, 100vw' })}
        <span class="stay__play">${ICON.play}<span>Step inside</span></span>
      </a>
      <div class="stay__body">
        <h2 class="stay__name">${rt.name}</h2>
        <p>${rt.summary}</p>
        <p class="stay__meta">${sleeps(rt)}</p>
        <div class="stay__actions">
          <a class="btn btn--light" href="/stay/${rt.slug}" data-enter="${rt.slug}">Step inside</a>
          <a class="link link--light" href="/enquire?stay=${rt.slug}">Enquire about dates</a>
        </div>
      </div>
    </article>`)}
  </div>
</section>
${howBooking(ctx)}
${cinemaData(ctx.stays)}`;
  return layout(ctx, { title: 'Stay', description: 'Garden villas with attached bathrooms and patios, or the whole five-villa estate for groups, at Siri Homestay, Joldal, Chikmagalur.',
    scripts: ['/js/cinema.js'], modules: ['/js/estate3d.js'], image: 'villa-patio', body });
}

function howBooking(ctx) {
  return html`<section class="steps" aria-labelledby="steps-title">
  <h2 id="steps-title" class="section-title">How booking works</h2>
  <ol class="steps__list">
    <li><h3>Send your dates</h3><p>Use the enquiry form, call or WhatsApp. Tell the hosts who’s coming.</p></li>
    <li><h3>The hosts reply</h3><p>They check the villas for your dates and come back with the rate and what’s included.</p></li>
    <li><h3>Confirm with them</h3><p>Your stay is booked when the hosts confirm it. Nothing is charged on this website.</p></li>
  </ol>
</section>`;
}

function stayPage(ctx, rt, availability) {
  const p = ctx.property;
  const tour = TOURS[rt.media.tour || rt.slug];
  const other = ctx.stays.filter((s) => s.slug !== rt.slug);
  const heroM = A.clientMedia(rt.media.hero);
  const body = html`
<section class="room-hero" data-room-hero="${rt.slug}">
  <div class="room-hero__media" style="view-transition-name: room-hero">
    ${A.img(rt.media.hero, { loading: 'eager', fetchpriority: 'high', sizes: '100vw' })}
  </div>
  <div class="room-hero__copy">
    <p class="crumbs"><a href="/stay">Stay</a></p>
    <h1 class="display room-hero__title">${rt.name}</h1>
    <p class="room-hero__lede">${rt.summary}</p>
  </div>
</section>

<section class="room-intro">
  <div class="room-intro__text">
    <p class="room-intro__desc">${rt.description}</p>
    <dl class="facts">
      <div><dt>Sleeps</dt><dd>${rt.kind === 'whole_property' ? `Up to ${rt.max_guests} guests` : `Up to ${rt.max_guests} guests`}</dd></div>
      <div><dt>Beds</dt><dd>${rt.bed_config}</dd></div>
      ${rt.kind === 'unit' ? html`<div><dt>On the estate</dt><dd>${ctx.unitCount} villas of this kind</dd></div>` : html`<div><dt>Villas</dt><dd>All ${ctx.unitCount}</dd></div>`}
      ${p.check_in_time ? html`<div><dt>Check-in</dt><dd>From ${time12(p.check_in_time)}${p.check_in_until ? ` to ${time12(p.check_in_until)}` : ''}</dd></div>` : ''}
      ${p.check_out_time ? html`<div><dt>Check-out</dt><dd>By ${time12(p.check_out_time)}</dd></div>` : ''}
      <div><dt>Rate</dt><dd>${rt.rate_mode === 'from' && rt.rate_from_inr ? `From ₹${rt.rate_from_inr.toLocaleString('en-IN')}${rt.rate_basis ? ` ${rt.rate_basis}` : ''}` : 'Quoted by the hosts for your dates'}</dd></div>
    </dl>
  </div>
  <aside class="room-intro__aside" aria-labelledby="ask-title">
    <h2 id="ask-title" class="aside-title">Ask about dates</h2>
    <p>Send your dates and the hosts will reply with availability and the rate.</p>
    <a class="btn" href="/enquire?stay=${rt.slug}">Send an enquiry</a>
    ${contactList(ctx.contacts, { compact: true, waText: `Hello, I'd like to ask about the ${rt.name} at Siri Homestay.` })}
  </aside>
</section>

<section class="features" aria-labelledby="features-title">
  <h2 id="features-title" class="section-title">${rt.kind === 'whole_property' ? 'What’s yours' : 'In the villa'}</h2>
  <ul class="ticks ticks--cols">${rt.features.map((f) => html`<li>${f}</li>`)}</ul>
</section>

${tour ? html`<section class="film" aria-labelledby="film-title">
  <div class="film__copy">
    <h2 id="film-title" class="section-title">${tour.title}</h2>
    <p>A camera flight through the estate as rebuilt in 3D: ${tour.steps.map((st) => st.caption.charAt(0).toLowerCase() + st.caption.slice(1)).join(', ')}.</p>
    <button class="btn" type="button" data-tour="${rt.media.tour || rt.slug}" hidden>Start the walk-through</button>
    <p class="film__note">The walk-through needs a device with 3D graphics. The pictures below show the same views.</p>
  </div>
  <div class="film__player">${A.img(tour.steps[0].view, { sizes: '(min-width: 900px) 45vw, 100vw', alt: '' })}</div>
</section>
${tourData(rt.media.tour || rt.slug)}` : ''}

<section class="gallery" aria-labelledby="gallery-title">
  <h2 id="gallery-title" class="section-title">Pictures</h2>
  <ul class="gallery__grid" data-lightbox>
    ${rt.media.gallery.map((k) => galleryItem(k))}
  </ul>
</section>

${availability ? availabilityBlock(rt, availability) : ''}

${other.length ? html`<section class="other" aria-labelledby="other-title">
  <h2 id="other-title" class="section-title">Also at the estate</h2>
  ${other.map((o) => html`<a class="other__card" href="/stay/${o.slug}" data-enter="${o.slug}">
    ${A.img(o.media.card, { sizes: '(min-width: 900px) 40vw, 100vw' })}
    <span class="other__name">${o.name}</span><span class="other__meta">${sleeps(o)}</span></a>`)}
</section>` : ''}
${cinemaData(ctx.stays)}`;
  return layout(ctx, {
    title: rt.name, theme: 'over-image', bodyClass: 'page-room',
    description: `${rt.name} at Siri Homestay, Joldal, Chikmagalur. ${rt.summary} ${sleeps(rt)}.`,
    preload: html`<link rel="preload" as="image" href="${heroM.src}" imagesrcset="${A.srcset(A.media(rt.media.hero))}" imagesizes="100vw">`,
    scripts: ['/js/cinema.js'], modules: ['/js/estate3d.js'], image: rt.media.hero, body,
    jsonLd: html`<script type="application/ld+json">${jsonForScript({
      '@context': 'https://schema.org', '@type': rt.kind === 'whole_property' ? 'Accommodation' : 'HotelRoom', name: `${rt.name}, ${p.name}`,
      description: rt.description, occupancy: { '@type': 'QuantitativeValue', maxValue: rt.max_guests }, bed: rt.bed_config,
      containedInPlace: { '@id': `${require('../config').siteUrl}/#lodging` },
      amenityFeature: rt.features.map((name) => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
    })}</script>`,
  });
}

function time12(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  const s = `${((h + 11) % 12) + 1}${m ? ':' + String(m).padStart(2, '0') : ''} ${h < 12 ? 'am' : 'pm'}`;
  return h === 12 && m === 0 ? 'noon' : s;
}

function galleryItem(k, { sizes = '(min-width: 900px) 33vw, 50vw' } = {}) {
  const m = A.media(k);
  if (!m) return '';
  return html`<li class="gallery__item gallery__item--${m.orientation}">
    <a href="${A.largest(m)}" data-full="${A.largest(m)}" data-w="${m.files[m.files.length - 1].w}" data-h="${m.files[m.files.length - 1].h}">
      ${A.img(k, { sizes })}<span class="visually-hidden">Open a larger picture</span>
    </a>
  </li>`;
}

function availabilityBlock(rt, av) {
  // av: { from, months: [{ label, days: [{date, free, total} | null]}] }
  return html`<section class="avail-cal" aria-labelledby="avail-title">
  <h2 id="avail-title" class="section-title">The hosts’ calendar</h2>
  <p>Dates marked full are booked or closed on the hosts’ calendar. Everything else still needs the hosts to confirm.</p>
  <div class="avail-cal__months">
    ${av.months.map((mo) => html`<div class="month">
      <h3 class="month__title">${mo.label}</h3>
      <div class="month__grid" role="list">
        ${['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d) => html`<span class="month__dow" aria-hidden="true">${d}</span>`)}
        ${mo.days.map((d) => (d ? html`<span role="listitem" class="day${d.free === 0 ? ' day--full' : ''}${d.past ? ' day--past' : ''}" title="${fmtDate(d.date)}${d.free === 0 ? ': full' : ''}"><span class="visually-hidden">${fmtDate(d.date)}${d.free === 0 ? ', full' : ', not booked yet'}</span><span aria-hidden="true">${Number(d.date.slice(8))}</span></span>` : html`<span class="day day--blank" aria-hidden="true"></span>`))}
      </div>
    </div>`)}
  </div>
  <p class="legend"><span class="day day--full" aria-hidden="true">8</span> Full on the hosts’ calendar</p>
</section>`;
}

// ---------------------------------------------------------------------------
// Explore
// ---------------------------------------------------------------------------
function explore(ctx) {
  const scenes = SCENES.map((s) => ({ ...s, media: s.view, m: A.clientMedia(s.view),
    spots: s.spots.map((sp) => { const at = A.anchorAt(s.view, sp.anchor); return { ...sp, x: at ? at[0] : null, y: at ? at[1] : null }; }) }));
  const first = scenes[0];
  const body = html`
<section class="explorer" data-explorer aria-labelledby="explore-title" aria-roledescription="scene viewer">
  <h1 id="explore-title" class="visually-hidden">Explore the estate</h1>
  <div class="explorer__stage" data-stage>
    <div class="explorer__scene is-current" data-scene-el>
      ${A.img(first.media, { cls: 'explorer__img', loading: 'eager', fetchpriority: 'high', sizes: '100vw' })}
    </div>
    <div class="explorer__spots" data-spots></div>
  </div>
  <div class="explorer__panel">
    <p class="explorer__count" data-count aria-hidden="true">1 of ${scenes.length}</p>
    <h2 class="explorer__title" data-title aria-live="polite">${first.title}</h2>
    <p class="explorer__text" data-text>${first.text}</p>
    <div class="explorer__nav">
      <button class="btn btn--ghost btn--small" type="button" data-prev>Previous scene</button>
      <button class="btn btn--small" type="button" data-next>Next scene</button>
    </div>
  </div>
  <nav class="explorer__map" aria-label="Scenes">
    <ol>${scenes.map((s, i) => html`<li><button type="button" data-goto="${s.id}"${i === 0 ? raw(' aria-current="true"') : ''}>
      ${A.img(s.media, { sizes: '120px', alt: '' })}<span>${s.title}</span></button></li>`)}</ol>
  </nav>
  <noscript><p class="explorer__noscript">The scene viewer needs JavaScript. All the pictures are in the <a href="/gallery">gallery</a>.</p></noscript>
</section>
<script type="application/json" id="explore-data">${jsonForScript({ scenes: scenes.map(({ id, view, title, text, spots, m }) => ({ id, view, title, text, spots, m })) })}</script>`;
  return layout(ctx, { title: 'Explore the estate', theme: 'over-image', bodyClass: 'page-explore',
    description: 'Walk through Siri Homestay in 3D, scene by scene: the lawn, umbrella tables, dining hall, a villa patio and bedroom, the courtyard and the garden at night.',
    scripts: ['/js/explore.js'], modules: ['/js/estate3d.js'], image: 'villa-patio', body });
}

// ---------------------------------------------------------------------------
// Estate (property information and amenities)
// ---------------------------------------------------------------------------
function estate(ctx) {
  const p = ctx.property;
  const garden = ctx.stays.find((s) => s.kind === 'unit');
  const body = html`
<section class="page-head page-head--image">
  <div class="page-head__media">${A.img('estate-lawn-dining', { loading: 'eager', fetchpriority: 'high', sizes: '100vw' })}</div>
  <div class="page-head__copy">
    <h1 class="display page-head__title">The estate</h1>
    <p class="page-head__lede">${p.land_area_acres} acres at Joldal, outside Chikmagalur town, with five villas, a dining hall and a lawn among bamboo and tall trees.</p>
  </div>
</section>

<section class="estate-facts" aria-labelledby="facts-title">
  <h2 id="facts-title" class="section-title">At a glance</h2>
  <dl class="facts facts--grid">
    <div><dt>Land</dt><dd>${p.land_area_acres} acres</dd></div>
    <div><dt>Villas</dt><dd>${p.villa_count}, each with an attached bathroom</dd></div>
    ${p.has_dining_hall ? html`<div><dt>Dining</dt><dd>A separate dining hall${p.has_kitchen ? ' and kitchen' : ''}</dd></div>` : ''}
    ${p.pond_area_sqft ? html`<div><dt>Pond</dt><dd>About ${p.pond_area_sqft.toLocaleString('en-IN')} sq ft</dd></div>` : ''}
    <div><dt>Outdoors</dt><dd>Lawn with volleyball net, umbrella tables and a campfire corner</dd></div>
    ${p.generator_kw || p.ups_kw ? html`<div><dt>Power backup</dt><dd>${[p.generator_kw ? `${p.generator_kw} kW generator` : null, p.ups_kw ? `${p.ups_kw} kW UPS` : null].filter(Boolean).join(' and ')}</dd></div>` : ''}
    ${p.has_staff_quarters ? html`<div><dt>Staff</dt><dd>Staff quarters on the estate</dd></div>` : ''}
    ${p.homestay_licensed ? html`<div><dt>Licence</dt><dd>Licensed homestay${p.licence_number ? ` (${p.licence_number})` : ''}</dd></div>` : ''}
  </dl>
</section>

<section class="estate-grounds" aria-labelledby="grounds-title">
  <h2 id="grounds-title" class="section-title">The grounds</h2>
  <div class="mosaic">
    <figure class="mosaic__a">${A.img('lawn-stepping-stones', { sizes: '(min-width: 900px) 60vw, 100vw' })}<figcaption>Stepping stones across the lawn</figcaption></figure>
    <figure class="mosaic__b">${A.img('bamboo-view-lawn', { sizes: '(min-width: 900px) 30vw, 100vw' })}<figcaption>The lawn through the bamboo</figcaption></figure>
    <figure class="mosaic__c">${A.img('courtyard-garden', { sizes: '(min-width: 900px) 45vw, 100vw' })}<figcaption>Potted plants by the courtyard</figcaption></figure>
    <figure class="mosaic__d">${A.img('night-lawn', { sizes: '(min-width: 900px) 45vw, 100vw' })}<figcaption>The lawn under the floodlight</figcaption></figure>
  </div>
</section>

<section class="kitchen kitchen--flat" aria-labelledby="meals-title">
  <div class="kitchen__copy">
    <h2 id="meals-title" class="section-title">Meals</h2>
    <p>Breakfast is South Indian or continental. Lunch and dinner are traditional Malnad cooking, vegetarian and non-vegetarian, made in the estate kitchen and served in the dining hall. Tell the hosts about food preferences when you enquire, and ask what’s included in your stay.</p>
  </div>
  <div class="kitchen__copy">
    <h2 class="section-title">Things to do</h2>
    <ul class="ticks">${ACTIVITIES.map((a) => html`<li>${a}</li>`)}</ul>
  </div>
</section>

${garden ? html`<section class="features" aria-labelledby="villa-title">
  <h2 id="villa-title" class="section-title">In every villa</h2>
  <ul class="ticks ticks--cols">${garden.features.map((f) => html`<li>${f}</li>`)}</ul>
  <p><a class="link" href="/stay/${garden.slug}">See the ${garden.name}</a></p>
</section>` : ''}

<section class="notes" aria-labelledby="notes-title">
  <h2 id="notes-title" class="section-title">House notes</h2>
  <ul class="notes__list">
    ${p.check_in_time ? html`<li>Check-in is from ${time12(p.check_in_time)}${p.check_in_until ? ` until ${time12(p.check_in_until)}` : ''}. Check-out is by ${time12(p.check_out_time)}.</li>` : ''}
    <li>Smoking isn’t allowed inside the villas.</li>
    <li>No payment is taken on this website. The hosts confirm your dates and rate directly.</li>
    <li>Tell the hosts about late arrivals, pets, celebrations or anything else when you enquire.</li>
  </ul>
</section>`;
  return layout(ctx, { title: 'The estate', theme: 'over-image',
    description: '4.28 acres at Joldal near Chikmagalur: five villas with attached bathrooms, a separate dining hall, a lawn with volleyball and campfire, a pond and generator backup.',
    image: 'estate-lawn-dining', body });
}

// ---------------------------------------------------------------------------
// Around (location)
// ---------------------------------------------------------------------------
function around(ctx) {
  const p = ctx.property;
  const query = p.latitude != null ? `${p.latitude},${p.longitude}` : `Siri Homestay, Joldal, Chikmagalur, Karnataka`;
  const mapsLink = p.map_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  const embed = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=${p.latitude != null ? 14 : 12}&output=embed`;
  const body = html`
<section class="page-head">
  <h1 class="display page-head__title">Around Joldal</h1>
  <p class="page-head__lede">Joldal is a village about 10 km from Chikmagalur town in Karnataka’s Malnad hills, the district where coffee was first grown in India.</p>
</section>

<section class="reach" aria-labelledby="reach-title">
  <div class="reach__copy">
    <h2 id="reach-title" class="section-title">Getting here</h2>
    <ul class="notes__list">
      <li>From Bengaluru, Chikmagalur is about 245 km by road via Hassan, usually five to five and a half hours.</li>
      <li>From Chikmagalur town, Joldal is about 10 km.</li>
      <li>Call the hosts before you set out and they’ll send the exact location pin and directions for the last stretch.</li>
    </ul>
    ${contactList(ctx.contacts, { compact: true, waText: 'Hello, could you send me the location pin for Siri Homestay?' })}
    <p><a class="btn btn--ghost" href="${mapsLink}" rel="noopener" target="_blank">Open in Google Maps</a></p>
  </div>
  <div class="map" data-map data-src="${embed}">
    ${A.img('courtyard-villa', { sizes: '(min-width: 900px) 50vw, 100vw', alt: '' })}
    <div class="map__consent">
      <p>The map is loaded from Google when you ask for it.</p>
      <button class="btn btn--small" type="button" data-map-load>Show the map</button>
      ${p.latitude == null ? html`<p class="map__note">The pin shows Google’s result for “Siri Homestay, Joldal”. Confirm the exact spot with the hosts.</p>` : ''}
    </div>
  </div>
</section>

<section class="around around--page" aria-labelledby="places-title">
  <div class="around__head"><h2 id="places-title" class="section-title">Places nearby</h2>
  <p>Ask the hosts about road conditions and the best time to set out; several of these are hill roads.</p></div>
  <ul class="places">${PLACES.map((pl) => html`<li><h3>${pl.name}</h3><p>${pl.text}</p></li>`)}</ul>
</section>`;
  return layout(ctx, { title: 'Around Joldal and how to get here',
    description: 'Siri Homestay is at Joldal, about 10 km from Chikmagalur town. Directions from Bengaluru, a map, and nearby places: Mullayanagiri, Baba Budangiri, Bhadra, Kemmangundi.',
    image: 'courtyard-villa', body });
}

// ---------------------------------------------------------------------------
// Gallery
// ---------------------------------------------------------------------------
function gallery(ctx) {
  const groups = [
    ['The lawn', ['lawn-stepping-stones', 'estate-lawn-dining', 'lawn-umbrellas', 'lawn-table-villa', 'lawn-table-closeup', 'bamboo-view-lawn']],
    ['The villas', ['villa-patio', 'patio-chairs', 'walk-door', 'doorway-bedroom', 'villa-bedroom', 'room-beds', 'villa-window-pool', 'villa-pool', 'bath-basin', 'bath-wc']],
    ['The courtyard', ['courtyard-villas', 'courtyard-villa', 'courtyard-garden']],
    ['After dark', ['night-garden', 'night-lawn', 'night-path']],
    ['From above', ['aerial', 'pond']],
  ];
  const body = html`
<section class="page-head">
  <h1 class="display page-head__title">Gallery</h1>
  <p class="page-head__lede">Views of the estate, rebuilt in 3D from the owners’ photographs. Select a picture to see it larger.</p>
</section>
${groups.map(([title, keys]) => html`<section class="gallery" aria-label="${title}">
  <h2 class="section-title">${title}</h2>
  <ul class="gallery__grid" data-lightbox>${keys.map((k) => galleryItem(k))}</ul>
</section>`)}
<section class="films" aria-labelledby="films-title">
  <h2 id="films-title" class="section-title">Walk-throughs</h2>
  <p class="films__note">Camera flights through the 3D estate. They need a device with 3D graphics.</p>
  <div class="films__grid">
    ${Object.entries(TOURS).map(([k, t]) => html`<figure class="film-card">
      ${A.img(t.steps[0].view, { sizes: '(min-width: 900px) 40vw, 100vw', alt: '' })}
      <figcaption>${t.title}. <button class="btn btn--small" type="button" data-tour="${k}" hidden>Play</button></figcaption></figure>`)}
  </div>
</section>
<script type="application/json" id="tour-data">${jsonForScript(TOURS)}</script>`;
  return layout(ctx, { title: 'Gallery', description: 'Siri Homestay rebuilt in 3D: the lawn, villas, bedrooms, bathrooms, courtyard and the garden at night, with walk-throughs.',
    scripts: ['/js/cinema.js'], modules: ['/js/estate3d.js'], image: 'night-garden', body });
}

// ---------------------------------------------------------------------------
// Contact & enquiry
// ---------------------------------------------------------------------------
function contact(ctx, form) {
  const p = ctx.property;
  const body = html`
<section class="page-head">
  <h1 class="display page-head__title">Contact</h1>
  <p class="page-head__lede">Call or WhatsApp any of the numbers below, or send an enquiry and the hosts will reply.</p>
</section>
<section class="contact-page">
  <div class="contact-page__people">
    ${contactList(ctx.contacts)}
    <p class="contact-page__address">${p.name}<br>${p.address_locality}, ${p.address_district}, ${p.address_region}${p.postal_code ? ` ${p.postal_code}` : ''}</p>
    <p><a class="link" href="/around">Directions and map</a></p>
  </div>
  <div class="contact-page__form">
    <h2 class="section-title">Send an enquiry</h2>
    ${enquiryForm(ctx, form)}
  </div>
</section>`;
  return layout(ctx, { title: 'Contact', description: 'Call or WhatsApp Siri Homestay, Joldal, Chikmagalur, or send an enquiry for your dates.', scripts: ['/js/enquiry.js'], body });
}

function enquirePage(ctx, form) {
  const body = html`
<section class="page-head page-head--slim">
  <h1 class="display page-head__title">Send an enquiry</h1>
  <p class="page-head__lede">Tell the hosts your dates and who’s coming. They’ll reply by phone or email. Nothing is booked or charged until they confirm.</p>
</section>
<section class="enquire-page">
  ${enquiryForm(ctx, form)}
  <aside class="enquire-page__aside" aria-labelledby="call-title">
    <h2 id="call-title" class="aside-title">Prefer to call?</h2>
    ${contactList(ctx.contacts, { compact: true })}
  </aside>
</section>`;
  return layout(ctx, { title: 'Send an enquiry', description: 'Ask Siri Homestay about dates for a garden villa or the whole estate. The hosts reply by phone or email.',
    scripts: ['/js/enquiry.js'], body, noindex: false });
}

function fieldErr(errors, name) {
  return errors && errors[name] ? html`<p class="field__error" id="err-${name}">${errors[name]}</p>` : '';
}
function invalid(errors, name) {
  return errors && errors[name] ? raw(` aria-invalid="true" aria-describedby="err-${name}"`) : '';
}

const FIELD_ORDER = ['room_type', 'units', 'check_in', 'check_out', 'adults', 'children', 'full_name', 'phone', 'email', 'consent'];

function enquiryForm(ctx, form) {
  const v = form.values || {};
  const e = form.errors || null;
  const t = today();
  const selected = v.room_type || ctx.stays[0].slug;
  const unitMax = ctx.unitCount;
  const published = ctx.settings.publish_availability === '1';
  return html`<form class="enquiry" method="post" action="/enquire" novalidate data-enquiry data-published="${published ? '1' : '0'}">
  ${e ? html`<div class="form-errors" role="alert" tabindex="-1" data-error-summary>
    <h2>${form.message || 'Please check these details'}</h2>
    <ul>${FIELD_ORDER.filter((k) => e[k]).map((k) => html`<li><a href="#f-${k}">${e[k]}</a></li>`)}</ul>
  </div>` : ''}
  ${form.conflict ? html`<div class="form-errors" role="alert"><h2>Those dates look full</h2><p>${form.conflict}</p></div>` : ''}
  <input type="hidden" name="_stamp" value="${form.stamp}">
  <div class="hp" aria-hidden="true"><label>Leave this empty<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>

  <fieldset class="field field--choice" id="f-room_type">
    <legend>Where would you like to stay?</legend>
    <div class="choices">
    ${ctx.stays.map((rt) => html`<label class="choice">
      <input type="radio" name="room_type" value="${rt.slug}"${selected === rt.slug ? raw(' checked') : ''} data-kind="${rt.kind}" data-max="${rt.max_guests}">
      <span class="choice__name">${rt.name}</span><span class="choice__meta">${sleeps(rt)}</span></label>`)}
    </div>
    ${fieldErr(e, 'room_type')}
  </fieldset>

  <div class="field" data-units-field>
    <label for="f-units">Number of villas</label>
    <select id="f-units" name="units"${invalid(e, 'units')}>${Array.from({ length: unitMax }, (_, i) => i + 1).map((n) => html`<option value="${n}"${String(v.units || 1) === String(n) ? raw(' selected') : ''}>${n}</option>`)}</select>
    ${fieldErr(e, 'units')}
  </div>

  <div class="row">
    <div class="field"><label for="f-check_in">Arrive</label>
      <input id="f-check_in" type="date" name="check_in" min="${t}" value="${v.check_in || ''}" required${invalid(e, 'check_in')}>${fieldErr(e, 'check_in')}</div>
    <div class="field"><label for="f-check_out">Leave</label>
      <input id="f-check_out" type="date" name="check_out" min="${addDays(t, 1)}" value="${v.check_out || ''}" required${invalid(e, 'check_out')}>${fieldErr(e, 'check_out')}</div>
  </div>
  <p class="form-hint" data-nights aria-live="polite"></p>
  <p class="avail-note" data-avail aria-live="polite">${published ? '' : 'The hosts check availability for every enquiry and reply personally.'}</p>

  <div class="row">
    <div class="field"><label for="f-adults">Adults</label>
      <input id="f-adults" type="number" name="adults" min="1" max="40" inputmode="numeric" value="${v.adults || 2}" required${invalid(e, 'adults')}>${fieldErr(e, 'adults')}</div>
    <div class="field"><label for="f-children">Children</label>
      <input id="f-children" type="number" name="children" min="0" max="30" inputmode="numeric" value="${v.children || 0}"${invalid(e, 'children')}>${fieldErr(e, 'children')}</div>
  </div>

  <div class="row">
    <div class="field"><label for="f-full_name">Your name</label>
      <input id="f-full_name" type="text" name="full_name" autocomplete="name" maxlength="100" value="${v.full_name || ''}" required${invalid(e, 'full_name')}>${fieldErr(e, 'full_name')}</div>
    <div class="field"><label for="f-phone">Phone</label>
      <input id="f-phone" type="tel" name="phone" autocomplete="tel" maxlength="40" value="${v.phone || ''}" required${invalid(e, 'phone')}>${fieldErr(e, 'phone')}</div>
  </div>
  <div class="row">
    <div class="field"><label for="f-email">Email <span class="optional">(optional)</span></label>
      <input id="f-email" type="email" name="email" autocomplete="email" maxlength="160" value="${v.email || ''}"${invalid(e, 'email')}>${fieldErr(e, 'email')}</div>
    <div class="field"><label for="f-city">Travelling from <span class="optional">(optional)</span></label>
      <input id="f-city" type="text" name="city" autocomplete="address-level2" maxlength="80" value="${v.city || ''}"></div>
  </div>
  <div class="field"><label for="f-message">Anything the hosts should know? <span class="optional">(optional)</span></label>
    <textarea id="f-message" name="message" rows="4" maxlength="1500" placeholder="Arrival time, food preferences, an occasion">${v.message || ''}</textarea></div>

  <div class="field field--check" id="f-consent">
    <input id="f-consent-box" type="checkbox" name="consent" value="1"${v.consent ? raw(' checked') : ''}${invalid(e, 'consent')}>
    <label for="f-consent-box">Siri Homestay may use these details to reply to my enquiry. <a href="/privacy">How your details are used</a></label>
    ${fieldErr(e, 'consent')}
  </div>
  <button class="btn btn--wide" type="submit">Send enquiry</button>
  <p class="form-note">This sends a request to the hosts. Nothing is booked or charged until they confirm with you.</p>
</form>`;
}

function enquirySent(ctx, r) {
  if (!r) {
    return layout(ctx, { title: 'Enquiry sent', noindex: true, body: html`<section class="sent">
  <h1 class="display sent__title">Enquiry sent</h1>
  <p class="sent__lede">Thank you. The hosts will reply by phone or email. Your dates aren’t booked until they confirm.</p>
  <h2 class="aside-title">Want to talk now?</h2>${contactList(ctx.contacts, { compact: true })}</section>` });
  }
  const first = ctx.contacts.find((c) => c.whatsapp && c.phone_e164);
  const text = `Hello, I've sent an enquiry on the Siri Homestay website. Reference ${r.ref}: ${r.room_type_name}, ${fmtDate(r.check_in)} to ${fmtDate(r.check_out)}, ${r.adults} adult(s)${r.children ? `, ${r.children} child(ren)` : ''}. Name: ${r.full_name}.`;
  const body = html`
<section class="sent">
  <h1 class="display sent__title">Enquiry sent</h1>
  <p class="sent__lede">Thank you, ${r.full_name}. The hosts have your request and will reply by phone${r.email ? ' or email' : ''}. Your dates aren’t booked until they confirm.</p>
  <dl class="facts facts--receipt">
    <div><dt>Reference</dt><dd class="ref">${r.ref}</dd></div>
    <div><dt>Stay</dt><dd>${r.room_type_name}${r.room_type_kind === 'unit' ? `, ${r.units_requested} villa${r.units_requested > 1 ? 's' : ''}` : ''}</dd></div>
    <div><dt>Dates</dt><dd>${fmtDate(r.check_in, { weekday: 'short', day: 'numeric', month: 'short' })} to ${fmtDate(r.check_out, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}, ${r.nights} night${r.nights > 1 ? 's' : ''}</dd></div>
    <div><dt>Guests</dt><dd>${r.adults} adult${r.adults > 1 ? 's' : ''}${r.children ? `, ${r.children} child${r.children > 1 ? 'ren' : ''}` : ''}</dd></div>
  </dl>
  <div class="sent__actions">
    ${first ? html`<a class="btn" href="${waLink(first.phone_e164, text)}" rel="noopener" target="_blank">Send it on WhatsApp too</a>` : ''}
    <a class="btn btn--ghost" href="/explore">Explore the estate</a>
  </div>
  <h2 class="aside-title">Want to talk now?</h2>
  ${contactList(ctx.contacts, { compact: true })}
</section>`;
  return layout(ctx, { title: 'Enquiry sent', noindex: true, body });
}

function privacy(ctx) {
  const p = ctx.property;
  const first = ctx.contacts.find((c) => c.email);
  const body = html`
<section class="page-head page-head--slim"><h1 class="display page-head__title">Privacy</h1>
<p class="page-head__lede">What happens to the details you send through this website.</p></section>
<section class="prose">
  <h2>What we collect</h2>
  <p>When you send an enquiry we store your name, phone number, the email address and town if you give them, your dates, the number of guests and your message. We also record when you agreed to us using these details.</p>
  <h2>Why</h2>
  <p>Only to reply to your enquiry, arrange your stay and keep a record of bookings. We don’t sell or share your details with anyone for marketing.</p>
  <h2>Who sees them</h2>
  <p>The hosts of ${p.name}, through a password-protected admin area. If email is set up, a copy of your enquiry is emailed to the hosts and an acknowledgement to you.</p>
  <h2>How long we keep them</h2>
  <p>For as long as needed to handle your stay and keep business and tax records, after which they are deleted.</p>
  <h2>Your choices</h2>
  <p>You can ask to see, correct or delete your details, or withdraw your consent, at any time${first ? html` by writing to <a href="mailto:${first.email}">${first.email}</a>` : ''} or calling the hosts. This follows India’s Digital Personal Data Protection Act, 2023.</p>
  <h2>Cookies and maps</h2>
  <p>The public site sets no tracking cookies. The map on the Around Joldal page loads from Google only when you choose to show it, and Google’s own privacy policy then applies.</p>
</section>`;
  return layout(ctx, { title: 'Privacy', description: 'How Siri Homestay uses the details you send through its website.', body });
}

function notFound(ctx) {
  const body = html`<section class="sent"><h1 class="display sent__title">Page not found</h1>
  <p class="sent__lede">There’s no page at this address. It may have moved when the site was rebuilt.</p>
  <div class="sent__actions"><a class="btn" href="/">Go to the home page</a><a class="btn btn--ghost" href="/stay">See where to stay</a></div></section>`;
  return layout(ctx, { title: 'Page not found', noindex: true, body });
}

function serverError(ctx) {
  const body = html`<section class="sent"><h1 class="display sent__title">Something went wrong</h1>
  <p class="sent__lede">The page couldn’t load. Try again in a moment, or call the hosts directly.</p>
  ${contactList(ctx.contacts, { compact: true })}</section>`;
  return layout(ctx, { title: 'Error', noindex: true, body });
}

module.exports = {
  home, stayIndex, stayPage, explore, estate, around, gallery, contact, enquirePage, enquirySent, privacy, notFound, serverError,
  SCENES, PLACES, ACTIVITIES, time12,
};
