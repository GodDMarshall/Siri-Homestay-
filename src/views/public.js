'use strict';
const { html, raw, jsonForScript } = require('../lib/html');
const { layout, contactList, waLink, ICON } = require('./layout');
const A = require('../web/assets');
const { fmtDate, today, addDays, diffDays } = require('../lib/dates');
const { formatPhone } = require('../domain/catalog');

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

function sleeps(rt) {
  return rt.kind === 'whole_property' ? `Up to ${rt.max_guests} guests across all five villas` : `Sleeps up to ${rt.max_guests}`;
}

// ---------------------------------------------------------------------------
// The home-page tour: one photo at a time, changing as you scroll. public/js/motion.js moves a
// camera through each photo along its depth map (cam: start x,y,z then end x,y,z) and dissolves
// to the next stop. Landscape photos only, so little is cropped away on wide screens.
// ---------------------------------------------------------------------------
const TOUR = [
  { key: 'courtyard-villas', title: 'Arrive', text: 'Tiled-roof villas and a row of potted plants around the paved courtyard.', pos: '50% 62%', cam: '-0.8,0.1,0, 0.7,-0.1,0.1' },
  { key: 'lawn-stepping-stones', title: 'The lawn', text: 'Stepping stones cross the grass to the umbrella tables and the volleyball net.', pos: '50% 60%', cam: '0.1,0.4,0, -0.1,-0.2,0.16' },
  { key: 'lawn-table-villa', title: 'Under the umbrellas', text: 'Blue chairs round a table in front of a villa, with golden bamboo behind.', pos: '55% 55%', cam: '0.8,0,0.02, -0.7,0.1,0.1' },
  { key: 'estate-lawn-dining', title: 'The dining hall', text: 'Meals from the estate kitchen are served in the separate dining hall, on the left across the lawn.', pos: '30% 45%', cam: '-0.5,0.2,0, 0.7,0,0.08' },
  { key: 'villa-pool', title: 'A villa', text: 'A blue-lined pool under a glass-roofed pergola, with bamboo in front of the bedroom window.', pos: '45% 60%', cam: '0.7,-0.2,0, -0.6,0.1,0.12' },
  { key: 'villa-bedroom', title: 'Inside', text: 'A king-size bed and two singles, with sliding glass doors open to the lawn.', pos: '50% 62%', cam: '-0.6,0.1,0, 0.5,-0.1,0.12' },
  { key: 'villa-window-pool', title: 'From the bed', text: 'Floor-to-ceiling glass, the pool and a grove of bamboo.', pos: '50% 55%', cam: '0,0.3,0, 0,-0.05,0.15' },
  { key: 'night-garden', title: 'After dark', text: 'Floodlights and low lamps come on across the garden.', pos: '50% 50%', cam: '-0.7,0,0.02, 0.7,0,0.09' },
];

// Words wrapped one by one so headings can rise into place (public/js/motion.js, CSS .kw).
const words = (text) => raw(String(text).split(' ').map((w, i) => html`<span class="kw" style="--i:${i}"><span>${w}</span></span>`).map(String).join(' '));

function tour() {
  return html`<section class="tour" id="tour" data-tour aria-labelledby="tour-title">
  <div class="tour__intro">
    <h2 id="tour-title" class="section-title">A tour of the homestay</h2>
    <p>Scroll to go round the estate: the courtyard, the lawn, a villa and its pool, and the garden after dark.</p>
  </div>
  <div class="tour__track" style="--n: ${TOUR.length}">
    <div class="tour__stage">
      <ol class="tour__stops">
        ${TOUR.map((st, i) => html`<li class="tour__stop${i === 0 ? ' is-on' : ''}" data-stop="${i}"${A.motion(st.key)} data-cam="${st.cam}" data-pos="${st.pos}">
          <figure class="tour__frame">
            ${A.img(st.key, { sizes: '100vw', pos: st.pos, cls: 'tour__img', loading: i < 2 ? 'eager' : 'lazy' })}
            <figcaption class="tour__cap">
              <span class="tour__count">${i + 1} of ${TOUR.length}</span>
              <span class="tour__title">${words(st.title)}</span>
              <span class="tour__text">${st.text}</span>
            </figcaption>
          </figure>
        </li>`)}
      </ol>
      <nav class="tour__rail" aria-label="Tour stops">
        <ol>${TOUR.map((st, i) => html`<li><a href="#tour" data-goto="${i}"${i === 0 ? raw(' aria-current="step"') : ''}>${st.title}</a></li>`)}</ol>
      </nav>
    </div>
  </div>
  <div class="tour__end">
    <a class="btn" href="/explore">Explore the estate in 3D</a>
    <a class="link" href="/stay/garden-villa">See inside a villa</a>
    <a class="link" href="/gallery">All the photos</a>
  </div>
</section>`;
}

// ---------------------------------------------------------------------------
// Explore the estate in 3D (/explore). Every spot is one of the owners' photos, which
// public/js/explore.js shows in 3D from its depth map: drag to look around. Marks sit on things
// you can see in the photo and lead to the spot that shows that thing (x/y: fractions of the
// photo from its top-left corner); `info` marks only name what they sit on. Without JavaScript
// each spot is its own page, /explore?spot=<key>, with the marks as links.
// ---------------------------------------------------------------------------
const EXPLORE = [
  { area: 'The courtyard', spots: [
    { key: 'courtyard-villas', title: 'Arrive', pos: '50% 55%',
      text: 'Tiled-roof villas and a row of potted plants around the paved courtyard.',
      marks: [{ to: 'courtyard-garden', x: 0.70, y: 0.34 }, { to: 'courtyard-villa', x: 0.24, y: 0.37 }] },
    { key: 'courtyard-garden', title: 'The table under the tree', pos: '45% 55%',
      text: 'An umbrella table under a tree, beside potted plants and the paved courtyard.',
      marks: [{ to: 'courtyard-villas', x: 0.76, y: 0.56, label: 'The courtyard' }] },
    { key: 'courtyard-villa', title: 'The courtyard and the hills', pos: '50% 50%',
      text: 'The paved courtyard beside a tiled-roof villa, backed by forested hills.', marks: [] },
  ] },
  { area: 'The lawn', spots: [
    { key: 'lawn-stepping-stones', title: 'The lawn', pos: '60% 55%',
      text: 'Stepping stones curve across the grass towards umbrella seating and the volleyball net.',
      marks: [{ to: 'lawn-umbrellas', x: 0.84, y: 0.40 }] },
    { key: 'estate-lawn-dining', title: 'The lawn and the dining hall', pos: '35% 45%',
      text: 'Umbrella seating in front, the open dining hall with its yellow chairs on the left, and the volleyball net on the right.',
      marks: [{ to: 'lawn-table-villa', x: 0.48, y: 0.36 }], info: [{ label: 'The dining hall', x: 0.12, y: 0.31 }] },
    { key: 'lawn-umbrellas', title: 'Umbrella seating', pos: '50% 50%',
      text: 'Blue chairs under a white umbrella, with firewood stacked for a campfire.',
      marks: [{ to: 'lawn-stepping-stones', x: 0.33, y: 0.42 }], info: [{ label: 'Firewood for the campfire', x: 0.86, y: 0.62 }] },
    { key: 'lawn-table-villa', title: 'Under the umbrella', pos: '50% 38%',
      text: 'Six blue chairs round a table, in front of a villa screened by golden bamboo.',
      marks: [{ to: 'lawn-table-closeup', x: 0.53, y: 0.52 }, { to: 'villa-patio', x: 0.31, y: 0.30 }] },
    { key: 'lawn-table-closeup', title: 'Take a seat', pos: '50% 50%',
      text: 'Blue chairs round a dark table beneath the white umbrella, with a villa and bamboo behind.',
      marks: [{ to: 'villa-patio', x: 0.60, y: 0.22 }] },
    { key: 'bamboo-view-lawn', title: 'Through the bamboo', pos: '50% 40%',
      text: 'The lawn and umbrella seating, seen between bamboo culms from a villa patio.',
      marks: [{ to: 'lawn-table-villa', x: 0.47, y: 0.38 }] },
  ] },
  { area: 'A villa', spots: [
    { key: 'villa-patio', title: 'A villa', pos: '40% 55%',
      text: 'A whitewashed villa with sliding glass doors and root-wood chairs on its patio, behind golden bamboo.',
      marks: [{ to: 'villa-bedroom', x: 0.40, y: 0.47 }, { to: 'patio-chairs', x: 0.30, y: 0.71 }, { to: 'villa-pool', x: 0.17, y: 0.63 }] },
    { key: 'patio-chairs', title: 'On the patio', pos: '40% 50%',
      text: 'Root-wood chairs and a glass table on the patio, beside a bamboo grove.',
      marks: [{ to: 'doorway-bedroom', x: 0.88, y: 0.42 }, { to: 'bamboo-view-lawn', x: 0.20, y: 0.27 }] },
    { key: 'doorway-bedroom', title: 'The sliding door', pos: '45% 50%',
      text: 'Through the sliding door: a king-size bed with a red throw, a single bed, the wardrobe and the bathroom door.',
      marks: [{ to: 'villa-bedroom', x: 0.43, y: 0.52 }] },
    { key: 'villa-bedroom', title: 'Inside', pos: '50% 55%',
      text: 'A king-size bed and two singles, with sliding glass doors open to the lawn.',
      marks: [{ to: 'lawn-table-villa', x: 0.57, y: 0.40 }] },
    { key: 'villa-window-pool', title: 'From the bed', pos: '45% 50%',
      text: 'Floor-to-ceiling glass, the pool and a grove of bamboo.',
      marks: [{ to: 'villa-pool', x: 0.45, y: 0.50 }] },
    { key: 'villa-pool', title: 'The pool', pos: '50% 60%',
      text: 'A blue-lined pool under a glass-roofed pergola, with bamboo in front of the bedroom window.',
      marks: [{ to: 'villa-window-pool', x: 0.56, y: 0.55 }] },
  ] },
  { area: 'After dark', spots: [
    { key: 'night-garden', title: 'After dark', pos: '50% 50%',
      text: 'Floodlights and low lamps come on across the garden.',
      marks: [{ to: 'night-lawn', x: 0.88, y: 0.43 }] },
    { key: 'night-lawn', title: 'The floodlit lawn', pos: '40% 50%',
      text: 'The lawn under a floodlight, with the volleyball net and a lit umbrella table near the villas.', marks: [] },
    { key: 'night-path', title: 'A lit path', pos: '35% 50%',
      text: 'A floodlit path between bamboo and garden plants.', marks: [] },
  ] },
];
const SPOTS = EXPLORE.flatMap((a) => a.spots.map((s) => ({ ...s, area: a.area })));
const SPOT = new Map(SPOTS.map((s, i) => [s.key, { ...s, index: i }]));
const markLabel = (mk) => mk.label || SPOT.get(mk.to).title;
const pct = (f) => `${Math.round(f * 1000) / 10}%`;

// What public/js/explore.js needs for every spot.
function exploreData() {
  return {
    spots: SPOTS.map((s) => {
      const m = A.media(s.key);
      const [px, py] = s.pos.split(' ').map((v) => parseFloat(v) / 100);
      return {
        id: s.key, area: s.area, title: s.title, text: s.text, alt: m.alt, pos: [px, py], w: m.w, h: m.h,
        src: A.src(s.key, 1024), srcset: A.srcset(m), lqip: m.lqip, depth: m.depth ? `/media/depth/${m.depth}` : null,
        photo: `/media/photos/${(m.files.find((f) => f.w === m.w) || m.files[m.files.length - 1]).src}`, photoLg: A.largest(m),
        marks: s.marks.map((mk) => ({ to: mk.to, x: mk.x, y: mk.y, label: markLabel(mk) })),
        info: (s.info || []).map((inf) => ({ x: inf.x, y: inf.y, label: inf.label })),
      };
    }),
  };
}

function explore(ctx, key) {
  const spot = SPOT.get(key) || SPOT.get(SPOTS[0].key);
  const n = SPOTS.length, i = spot.index;
  const prev = SPOTS[(i - 1 + n) % n], next = SPOTS[(i + 1) % n];
  const m = A.media(spot.key);
  const body = html`
<section class="explorer" data-explorer aria-labelledby="explore-title">
  <h1 id="explore-title" class="visually-hidden">Explore the estate in 3D</h1>
  <div class="explorer__stage" data-stage>
    <div class="explorer__frame" data-frame style="--ar: ${(m.w / m.h).toFixed(4)}">
      ${A.img(spot.key, { sizes: '100vw', cls: 'explorer__img', loading: 'eager', fetchpriority: 'high', pos: spot.pos })}
      <div class="explorer__marks" data-marks>
        ${spot.marks.map((mk) => html`<a class="mark" href="/explore?spot=${mk.to}" style="left:${pct(mk.x)};top:${pct(mk.y)}"><span class="mark__dot" aria-hidden="true"></span><span class="mark__label">${markLabel(mk)}</span></a>`)}
        ${(spot.info || []).map((inf) => html`<span class="mark mark--info" style="left:${pct(inf.x)};top:${pct(inf.y)}"><span class="mark__dot" aria-hidden="true"></span><span class="mark__label">${inf.label}</span></span>`)}
      </div>
    </div>
  </div>
  <div class="explorer__panel">
    <div class="explorer__caption">
      <p class="explorer__count"><span data-area>${spot.area}</span>, <span data-count>${i + 1} of ${n}</span></p>
      <h2 class="explorer__title" data-title aria-live="polite">${spot.title}</h2>
      <p class="explorer__text" data-text>${spot.text}</p>
    </div>
    <nav class="explorer__steps" aria-label="Spots in order">
      <a class="explorer__step" href="/explore?spot=${prev.key}" rel="prev" data-prev>Previous<span class="visually-hidden">: <span data-prev-title>${prev.title}</span></span></a>
      <a class="explorer__step" href="/explore?spot=${next.key}" rel="next" data-next>Next<span class="visually-hidden">: <span data-next-title>${next.title}</span></span></a>
    </nav>
  </div>
  <p class="explorer__hint" data-hint hidden>Drag to look around</p>
</section>
<section class="spots" aria-labelledby="spots-title">
  <div class="spots__head">
    <h2 id="spots-title" class="section-title">Every spot</h2>
    <p>Eighteen of the owners’ photos, each one in 3D. Markers on a photo lead to the places you can see in it.</p>
  </div>
  ${EXPLORE.map((a) => html`<div class="spots__area">
    <h3 class="spots__area-title">${a.area}</h3>
    <ul class="spots__list">${a.spots.map((s) => html`<li><a class="spots__card" href="/explore?spot=${s.key}" data-goto="${s.key}"${s.key === spot.key ? raw(' aria-current="true"') : ''}>${A.img(s.key, { sizes: '(min-width: 1100px) 16vw, (min-width: 700px) 30vw, 45vw', cls: 'spots__img', alt: '' })}<span class="spots__title">${s.title}</span></a></li>`)}</ul>
  </div>`)}
</section>
<script type="application/json" id="explore-data">${jsonForScript(exploreData())}</script>`;
  return layout(ctx, {
    title: i === 0 ? 'Explore the estate in 3D' : `${spot.title}: explore the estate in 3D`,
    description: 'Look around Siri Homestay in 3D, made from the owners’ own photos: the courtyard, the lawn, a villa and its pool, and the garden after dark.',
    theme: 'over-image', image: spot.key, canonical: '/explore', bodyClass: 'page-explore', scripts: ['/js/explore.js'], body,
  });
}

// A room's photos side by side. public/js/motion.js turns them into a 3D carousel driven by the
// scroll; without JavaScript, or with reduced motion, the row scrolls sideways on its own.
function strip(keys, { title, lede, id = 'strip' } = {}) {
  const items = keys.map((k) => A.media(k)).filter(Boolean);
  if (!items.length) return '';
  return html`<section class="strip" data-strip aria-labelledby="${id}-title">
  <div class="strip__head">
    <h2 id="${id}-title" class="section-title">${title}</h2>
    ${lede ? html`<p>${lede}</p>` : ''}
  </div>
  <div class="strip__track">
    <div class="strip__stage">
      <ul class="strip__row" tabindex="0" aria-label="${title}, photos" data-lightbox>
        ${items.map((m) => html`<li class="strip__item" style="--ar: ${(m.w / m.h).toFixed(4)}">
          <figure>
            <a href="${A.largest(m)}" data-full="${A.largest(m)}">
              ${A.img(m.key, { sizes: `${Math.round(70 * m.w / m.h)}vh`, cls: 'strip__img' })}
              <span class="visually-hidden">Open a larger photo</span>
            </a>
            <figcaption>${m.caption}${m.source === 'video' ? html` <span class="strip__src">(from the owners’ video)</span>` : ''}</figcaption>
          </figure>
        </li>`)}
      </ul>
    </div>
  </div>
</section>`;
}

// ---------------------------------------------------------------------------
// Home
// ---------------------------------------------------------------------------
// The home page is a journey through the estate: public/js/fly.js flies a camera through these
// chapters' pictures in 3D as you scroll. Without it, each chapter is a picture with its words.
const JOURNEY = [
  { key: 'villa-patio', id: 'arrive', title: 'Siri Homestay', text: 'Five villas among golden bamboo, on a 4.28-acre estate at Joldal, 10 km from Chikmagalur.' },
  { key: 'courtyard-villas', id: 'courtyard', title: 'The courtyard', text: 'Tiled-roof villas and rows of potted plants around a paved courtyard.' },
  { key: 'lawn-stepping-stones', id: 'lawn', title: 'Across the lawn', text: 'Stepping stones over the grass to the umbrella tables and the volleyball net.' },
  { key: 'estate-lawn-dining', id: 'dining', title: 'The dining hall', text: 'Malnad meals from the estate kitchen, served in the separate dining hall.' },
  { key: 'lawn-table-villa', id: 'umbrella', title: 'Under the umbrella', text: 'Blue chairs round a table in front of the villas, screened by golden bamboo.' },
  { key: 'villa-bedroom', id: 'villa', title: 'Inside a villa', text: 'A king-size bed and two singles, with sliding glass doors open to the lawn.' },
  { key: 'villa-pool', id: 'pool', title: 'The pool', text: 'Blue-lined water under a glass-roofed pergola, with bamboo all around.' },
  { key: 'night-garden', id: 'night', title: 'After dark', text: 'Floodlights and low lamps over the garden, and campfire evenings on the lawn.', night: true },
  { key: 'night-lawn', id: 'stay', title: 'Stay with us', night: true },
];

function home(ctx) {
  const { stays, contacts } = ctx;
  const first = contacts[0];
  const chapter = (c, i) => {
    const m = A.media(c.key);
    const Title = i === 0 ? 'h1' : 'h2';
    return html`<section class="chapter${i === 0 ? ' chapter--first' : ''}${c.id === 'stay' ? ' chapter--last' : ''}" id="${c.id}" data-chapter${A.motion(c.key)} data-ar="${(m.w / m.h).toFixed(4)}"${c.night ? raw(' data-night') : ''} aria-labelledby="${c.id}-title">
  <figure class="chapter__media">${A.img(c.key, { sizes: '100vw', loading: i === 0 ? 'eager' : 'lazy', fetchpriority: i === 0 ? 'high' : undefined })}</figure>
  <div class="chapter__copy">
    ${raw(`<${Title} id="${c.id}-title" class="chapter__title">`)}${c.title}${raw(`</${Title}>`)}
    ${c.text ? html`<p class="chapter__text">${c.text}</p>` : ''}
    ${i === 0 ? html`<a class="chapter__cue" href="#courtyard">Scroll to step inside</a>` : ''}
    ${c.id === 'stay' ? html`<p class="chapter__text">Call or WhatsApp the hosts, or send your dates. Nothing is booked or charged until they confirm.</p>
    <div class="chapter__actions"><a class="btn" href="/enquire">Send an enquiry</a><a class="btn btn--ghost" href="/explore">Explore in 3D</a>${first ? html`<a class="btn btn--ghost" href="tel:${first.phone}">Call ${first.name.split(' ')[0]}</a>` : ''}</div>` : ''}
  </div>
</section>`;
  };
  const body = html`
<div class="fly" data-fly style="--chapters: ${JOURNEY.length}">
  ${JOURNEY.map(chapter)}
  <nav class="fly__rail" data-rail aria-label="The journey">
    <ol>${JOURNEY.map((c) => html`<li><a href="#${c.id}"><span>${c.title === 'Siri Homestay' ? 'Arrive' : c.title}</span></a></li>`)}</ol>
  </nav>
</div>

<section class="stays" aria-labelledby="stays-title">
  <div class="stays__head">
    <h2 id="stays-title" class="section-title">Where you’ll sleep</h2>
    <p>Take a villa, or the whole estate for your group.</p>
  </div>
  <div class="stays__grid">
    ${stays.map((rt, i) => stayCard(rt, i, { heading: 'h3', sizes: i === 0 ? '(min-width: 900px) 58vw, 100vw' : '(min-width: 900px) 38vw, 100vw' }))}
  </div>
</section>

<section class="plan" id="plan" aria-labelledby="plan-title">
  <div class="plan__copy">
    <h2 id="plan-title" class="section-title">Plan your stay</h2>
    <p>Call or WhatsApp the hosts, or send your dates and they’ll reply. Nothing is booked or charged until they confirm with you.</p>
    ${contactList(contacts)}
  </div>
  ${quickForm(ctx)}
</section>`;
  return layout(ctx, {
    theme: 'over-image', bodyClass: 'page-home', scripts: ['/js/fly.js'],
    description: 'Siri Homestay: five villas on a 4.28-acre estate at Joldal near Chikmagalur, with a lawn, golden bamboo, a separate dining hall and Malnad meals. Send an enquiry or call the hosts.',
    image: 'villa-patio', body,
  });
}

function stayCard(rt, i, { heading = 'h2', sizes }) {
  const label = rt.kind === 'whole_property' ? 'See the estate' : 'See inside';
  return html`
    <article class="stay${i === 0 ? ' stay--lead' : ''}">
      <a class="stay__media" href="/stay/${rt.slug}" tabindex="-1" aria-hidden="true">
        ${A.img(rt.media.card, { sizes, alt: '' })}
      </a>
      <div class="stay__body">
        ${heading === 'h3' ? html`<h3 class="stay__name">${rt.name}</h3>` : html`<h2 class="stay__name">${rt.name}</h2>`}
        <p>${rt.summary}</p>
        <p class="stay__meta">${sleeps(rt)}</p>
        <div class="stay__actions">
          <a class="btn btn--light" href="/stay/${rt.slug}">${label}<span class="visually-hidden">: ${rt.name}</span></a>
          <a class="link link--light" href="/enquire?stay=${rt.slug}">Enquire about dates</a>
        </div>
      </div>
    </article>`;
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
    ${ctx.stays.map((rt, i) => stayCard(rt, i, { sizes: '(min-width: 900px) 50vw, 100vw' }))}
  </div>
</section>
${howBooking(ctx)}`;
  return layout(ctx, { title: 'Stay', description: 'Garden villas with attached bathrooms and patios, or the whole five-villa estate for groups, at Siri Homestay, Joldal, Chikmagalur.',
    image: 'villa-bedroom', body });
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
  const other = ctx.stays.filter((s) => s.slug !== rt.slug);
  const heroM = A.media(rt.media.hero);
  const unit = rt.kind === 'unit';
  const body = html`
<section class="room-hero">
  <div class="room-hero__media" data-motion="photo"${A.motion(rt.media.hero)}>
    ${A.img(rt.media.hero, { loading: 'eager', fetchpriority: 'high', sizes: '100vw' })}
  </div>
  <div class="room-hero__copy">
    <p class="crumbs"><a href="/stay">Stay</a></p>
    <h1 class="display room-hero__title">${rt.name}</h1>
    <p class="room-hero__lede">${rt.summary}</p>
  </div>
</section>

${strip(rt.media.strip || [], unit
    ? { title: 'Inside the villa', lede: 'The bedroom, the pool beside it, the bathroom and the patio. Scroll to turn through the photos; select one to see it larger.' }
    : { title: 'Around the estate', lede: 'The courtyard, the lawn, the tables under the umbrellas and the garden after dark. Scroll to turn through the photos; select one to see it larger.' })}

<section class="room-intro">
  <div class="room-intro__text">
    <p class="room-intro__desc">${rt.description}</p>
    <dl class="facts">
      <div><dt>Sleeps</dt><dd>Up to ${rt.max_guests} guests</dd></div>
      <div><dt>Beds</dt><dd>${rt.bed_config}</dd></div>
      ${unit ? html`<div><dt>On the estate</dt><dd>${ctx.unitCount} villas of this kind</dd></div>` : html`<div><dt>Villas</dt><dd>All ${ctx.unitCount}</dd></div>`}
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
  <h2 id="features-title" class="section-title">${unit ? 'In the villa' : 'What’s yours'}</h2>
  <ul class="ticks ticks--cols">${rt.features.map((f) => html`<li>${f}</li>`)}</ul>
</section>

${availability ? availabilityBlock(rt, availability) : ''}

${other.length ? html`<section class="other" aria-labelledby="other-title">
  <h2 id="other-title" class="section-title">Also at the estate</h2>
  ${other.map((o) => html`<a class="other__card" href="/stay/${o.slug}">
    ${A.img(o.media.card, { sizes: '(min-width: 900px) 40vw, 100vw', alt: '' })}
    <span class="other__name">${o.name}</span><span class="other__meta">${sleeps(o)}</span></a>`)}
</section>` : ''}`;
  return layout(ctx, {
    title: rt.name, theme: 'over-image', bodyClass: 'page-room',
    description: `${rt.name} at Siri Homestay, Joldal, Chikmagalur. ${rt.summary} ${sleeps(rt)}.`,
    preload: heroM ? html`<link rel="preload" as="image" href="${A.src(rt.media.hero, 1600)}" imagesrcset="${A.srcset(heroM)}" imagesizes="100vw" fetchpriority="high">` : '',
    image: rt.media.hero, body,
    jsonLd: html`<script type="application/ld+json">${jsonForScript({
      '@context': 'https://schema.org', '@type': unit ? 'HotelRoom' : 'Accommodation', name: `${rt.name}, ${p.name}`,
      description: rt.description, occupancy: { '@type': 'QuantitativeValue', maxValue: rt.max_guests }, bed: rt.bed_config,
      containedInPlace: { '@id': `${require('../config').siteUrl}/#lodging` },
      image: [rt.media.hero, ...(rt.media.strip || [])].map((k) => A.ogImage(k)).filter(Boolean).slice(0, 4).map((u) => `${require('../config').siteUrl}${u}`),
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
// Estate (property information and amenities)
// ---------------------------------------------------------------------------
function estate(ctx) {
  const p = ctx.property;
  const garden = ctx.stays.find((s) => s.kind === 'unit');
  const body = html`
<section class="page-head page-head--image">
  <div class="page-head__media" data-motion="photo"${A.motion('estate-lawn-dining')}>${A.img('estate-lawn-dining', { loading: 'eager', fetchpriority: 'high', sizes: '100vw' })}</div>
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
    ['The villas', ['villa-patio', 'patio-chairs', 'doorway-bedroom', 'villa-bedroom', 'villa-window-pool', 'villa-pool', 'bath-basin', 'bath-wc']],
    ['The lawn', ['lawn-stepping-stones', 'estate-lawn-dining', 'lawn-umbrellas', 'lawn-table-villa', 'lawn-table-closeup', 'bamboo-view-lawn']],
    ['The courtyard', ['courtyard-villas', 'courtyard-villa', 'courtyard-garden']],
    ['After dark', ['night-garden', 'night-lawn', 'night-path']],
  ];
  const body = html`
<section class="page-head">
  <h1 class="display page-head__title">Gallery</h1>
  <p class="page-head__lede">Photos of Siri Homestay taken by the owners. The two bathroom pictures are stills from their video. Select a photo to see it larger.</p>
</section>
${groups.map(([title, keys]) => html`<section class="gallery" aria-label="${title}">
  <h2 class="section-title">${title}</h2>
  <ul class="gallery__grid" data-lightbox>${keys.map((k) => galleryItem(k))}</ul>
</section>`)}`;
  return layout(ctx, { title: 'Gallery', description: 'Photos of Siri Homestay at Joldal, Chikmagalur: the villas, bedrooms, bathroom, pool, lawn, courtyard and the garden at night.',
    image: 'lawn-stepping-stones', body });
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
  <p class="page-head__lede">${ctx.handoff
    ? 'Tell the hosts your dates and who’s coming, then send it to them on WhatsApp. Nothing is booked or charged until they confirm.'
    : 'Tell the hosts your dates and who’s coming. They’ll reply by phone or email. Nothing is booked or charged until they confirm.'}</p>
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
  ${ctx.handoff
    ? html`<button class="btn btn--wide" type="submit" data-busy="Preparing…">Continue to WhatsApp</button>
  <p class="form-note">The next page writes this up as a WhatsApp message for you to send the hosts. Nothing is booked or charged until they confirm with you.</p>`
    : html`<button class="btn btn--wide" type="submit" data-busy="Sending…">Send enquiry</button>
  <p class="form-note">This sends a request to the hosts. Nothing is booked or charged until they confirm with you.</p>`}
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
    <a class="btn btn--ghost" href="/#tour">Take the tour</a>
  </div>
  <h2 class="aside-title">Want to talk now?</h2>
  ${contactList(ctx.contacts, { compact: true })}
</section>`;
  return layout(ctx, { title: 'Enquiry sent', noindex: true, body });
}

// Who a handed-off enquiry goes to: the hosts who take enquiries, in the client's order.
function handoffContacts(contacts) {
  const wa = contacts.filter((c) => c.whatsapp && c.phone_e164);
  const hosts = wa.filter((c) => c.notify_on_enquiry);
  return hosts.length ? hosts : wa.slice(0, 1);
}

const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;
const guestsText = (adults, children) => plural(adults, 'adult', 'adults') + (children ? `, ${plural(children, 'child', 'children')}` : '');
const villasText = (rt, units) => (rt.kind === 'unit' ? `, ${plural(units, 'villa', 'villas')}` : '');

// The WhatsApp message a guest sends when the site can't keep enquiries (config.temporaryStorage).
function handoffText(ctx, { stay, guest, nights }) {
  return [
    `Hello ${ctx.property.name}, I’d like to ask about a stay.`,
    `Stay: ${stay.rt.name}${villasText(stay.rt, stay.unitsRequested)}`,
    `Dates: ${fmtDate(stay.checkIn, { weekday: 'short', day: 'numeric', month: 'short' })} to ${fmtDate(stay.checkOut, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })} (${plural(nights, 'night', 'nights')})`,
    `Guests: ${guestsText(stay.adults, stay.children)}`,
    `Name: ${guest.name}`,
    `Phone: ${formatPhone(guest.phone)}`,
    guest.email && `Email: ${guest.email}`,
    guest.city && `Travelling from: ${guest.city}`,
    guest.message && `\n${guest.message}`,
  ].filter(Boolean).join('\n');
}

function enquiryHandoff(ctx, enquiry) {
  const { stay, nights } = enquiry;
  const text = handoffText(ctx, enquiry);
  const [first, ...others] = handoffContacts(ctx.contacts);
  const mail = ctx.contacts.find((c) => c.email);
  const firstName = (c) => c.name.split(' ')[0];
  const mailto = mail && `mailto:${mail.email}?subject=${encodeURIComponent(`Enquiry: ${stay.rt.name}, ${fmtDate(stay.checkIn)}`)}&body=${encodeURIComponent(text)}`;
  const body = html`
<section class="sent">
  <h1 class="display sent__title">Send your enquiry</h1>
  <p class="sent__lede">Your message to the hosts is ready. Send it on WhatsApp and they’ll reply there or by phone. Your dates aren’t booked until they confirm.</p>
  <dl class="facts facts--receipt">
    <div><dt>Stay</dt><dd>${stay.rt.name}${villasText(stay.rt, stay.unitsRequested)}</dd></div>
    <div><dt>Dates</dt><dd>${fmtDate(stay.checkIn, { weekday: 'short', day: 'numeric', month: 'short' })} to ${fmtDate(stay.checkOut, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}, ${plural(nights, 'night', 'nights')}</dd></div>
    <div><dt>Guests</dt><dd>${guestsText(stay.adults, stay.children)}</dd></div>
  </dl>
  <div class="sent__actions">
    ${first ? html`<a class="btn" href="${waLink(first.phone_e164, text)}" rel="noopener" target="_blank" data-handoff>Send to ${firstName(first)} on WhatsApp</a>` : ''}
    ${others.map((c) => html`<a class="btn btn--ghost" href="${waLink(c.phone_e164, text)}" rel="noopener" target="_blank">Send to ${firstName(c)} instead</a>`)}
  </div>
  <h2 class="aside-title">Your message</h2>
  <p class="handoff__text">${text}</p>
  <p class="handoff__alt">No WhatsApp? Send the same message by text${mail ? html`, <a href="${mailto}">email it to ${mail.email}</a>` : ''}, or call the hosts.</p>
  ${contactList(ctx.contacts, { compact: true })}
</section>`;
  return layout(ctx, { title: 'Send your enquiry', noindex: true, body });
}

function privacy(ctx) {
  const p = ctx.property;
  const first = ctx.contacts.find((c) => c.email);
  const body = html`
<section class="page-head page-head--slim"><h1 class="display page-head__title">Privacy</h1>
<p class="page-head__lede">What happens to the details you send through this website.</p></section>
<section class="prose">
  <h2>What we collect</h2>
  ${ctx.handoff
    ? html`<p>At the moment this website doesn’t store enquiries. The enquiry form turns your name, phone number, dates, number of guests and message into a WhatsApp message that you send to the hosts yourself, so WhatsApp’s own privacy policy also applies to it.</p>`
    : html`<p>When you send an enquiry we store your name, phone number, the email address and town if you give them, your dates, the number of guests and your message. We also record when you agreed to us using these details.</p>`}
  <h2>Why</h2>
  <p>Only to reply to your enquiry, arrange your stay and keep a record of bookings. We don’t sell or share your details with anyone for marketing.</p>
  <h2>Who sees them</h2>
  ${ctx.handoff
    ? html`<p>The hosts of ${p.name}, who receive the message you send them.</p>`
    : html`<p>The hosts of ${p.name}, through a password-protected admin area. If email is set up, a copy of your enquiry is emailed to the hosts and an acknowledgement to you.</p>`}
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
  home, stayIndex, stayPage, explore, estate, around, gallery, contact, enquirePage, enquirySent, enquiryHandoff, handoffText, privacy, notFound, serverError,
  TOUR, EXPLORE, PLACES, ACTIVITIES, time12,
};
