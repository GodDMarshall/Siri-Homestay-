'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { html, raw, jsonForScript } = require('../lib/html');
const { asset, ogImage } = require('../web/assets');
const config = require('../config');
const { formatPhone } = require('../domain/catalog');

const MARK = raw(fs.readFileSync(path.join(__dirname, '..', '..', 'public', 'img', 'siri-kannada.svg'), 'utf8')
  .replace('<svg ', '<svg class="mark-kn" aria-hidden="true" focusable="false" ').replace(/ role="img" aria-label="[^"]*"/, ''));

const NAV = [
  ['/stay', 'Stay'],
  ['/explore', 'Explore'],
  ['/estate', 'The estate'],
  ['/around', 'Around Joldal'],
  ['/gallery', 'Gallery'],
  ['/contact', 'Contact'],
];

const ICON = {
  phone: raw('<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6.6 3.5h3l1.4 4.2-2 1.3a12 12 0 0 0 6 6l1.3-2 4.2 1.4v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>'),
  chat: raw('<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 19.5l1.3-3.8A8 8 0 1 1 8.6 19z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>'),
  mail: raw('<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3.5" y="5.5" width="17" height="13" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>'),
  play: raw('<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/></svg>'),
};

function waLink(e164, text) {
  return `https://wa.me/${e164.replace(/\D/g, '')}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
}

function contactList(contacts, { compact = false, waText = null } = {}) {
  return html`<ul class="contacts${compact ? ' contacts--compact' : ''}">
    ${contacts.map((c) => html`<li class="contact">
      <span class="contact__name">${c.name}</span>
      ${c.phone_e164 ? html`<a class="contact__line" href="tel:${c.phone_e164}">${ICON.phone}<span>${formatPhone(c.phone_e164)}</span></a>` : ''}
      ${c.phone_e164 && c.whatsapp ? html`<a class="contact__line" href="${waLink(c.phone_e164, waText)}" rel="noopener" target="_blank">${ICON.chat}<span>WhatsApp</span></a>` : ''}
      ${c.email && !compact ? html`<a class="contact__line" href="mailto:${c.email}">${ICON.mail}<span>${c.email}</span></a>` : ''}
    </li>`)}
  </ul>`;
}

function lodgingJsonLd(ctx) {
  const p = ctx.property;
  const first = ctx.contacts[0];
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': `${config.siteUrl}/#lodging`,
    name: p.name,
    description: p.summary,
    url: config.siteUrl + '/',
    image: [`${config.siteUrl}${ogImage('lawn-stepping-stones')}`, `${config.siteUrl}${ogImage('villa-bedroom')}`, `${config.siteUrl}${ogImage('night-garden')}`],
    address: { '@type': 'PostalAddress', addressLocality: p.address_locality, addressRegion: p.address_region, addressCountry: 'IN',
      ...(p.postal_code ? { postalCode: p.postal_code } : {}) },
    ...(p.latitude != null ? { geo: { '@type': 'GeoCoordinates', latitude: p.latitude, longitude: p.longitude } } : {}),
    ...(first?.phone_e164 ? { telephone: first.phone_e164 } : {}),
    ...(first?.email ? { email: first.email } : {}),
    ...(p.check_in_time ? { checkinTime: p.check_in_time } : {}),
    ...(p.check_out_time ? { checkoutTime: p.check_out_time } : {}),
    numberOfRooms: p.villa_count,
    amenityFeature: ['Lawn with volleyball net', 'Separate dining hall', 'Campfire area', 'Power backup (generator and UPS)', 'Attached bathrooms', 'Satellite TV in rooms']
      .map((name) => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
    ...(p.facebook_url ? { sameAs: [p.facebook_url] } : {}),
  };
  return html`<script type="application/ld+json">${jsonForScript(data)}</script>`;
}

/**
 * ctx: { property, contacts, path }
 * page: { title, description, body, theme: 'over-image'|'solid', image, scripts: [], bodyClass, jsonLd, noindex }
 */
function layout(ctx, page) {
  const p = ctx.property;
  const title = page.title ? `${page.title} | ${p.name}` : `${p.name}, Joldal, Chikmagalur`;
  const canonical = config.siteUrl + (page.canonical || ctx.path);
  const ogImg = config.siteUrl + (page.image ? ogImage(page.image) : ogImage('lawn-stepping-stones'));
  const theme = page.theme || 'solid';
  return '<!doctype html>' + html`
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title}</title>
<meta name="description" content="${page.description || p.summary}">
<link rel="canonical" href="${canonical}">
${page.noindex ? raw('<meta name="robots" content="noindex">') : ''}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${p.name}">
<meta property="og:title" content="${page.title || p.name}">
<meta property="og:description" content="${page.description || p.summary}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImg}">
<meta property="og:locale" content="en_IN">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#17302A">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/fonts/anek-latin-wdth.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/newsreader-latin-opsz.woff2" as="font" type="font/woff2" crossorigin>
${page.preload || ''}
<link rel="stylesheet" href="${asset('/css/site.css')}">
${lodgingJsonLd(ctx)}
${page.jsonLd || ''}
<script src="${asset('/js/boot.js')}"></script>
<script src="${asset('/js/site.js')}" defer></script>
<script src="${asset('/js/motion.js')}" defer></script>
${(page.scripts || []).map((s) => html`<script src="${asset(s)}" defer></script>`)}
</head>
<body class="${page.bodyClass || ''}" data-header="${theme}">
<a class="skip" href="#main">Skip to content</a>
<header class="masthead" data-masthead>
  <a class="brand" href="/" aria-label="${p.name}, home">${MARK}<span class="brand__name">Siri Homestay</span></a>
  <nav class="nav" aria-label="Main">
    <ul class="nav__list">
      ${NAV.map(([href, label]) => html`<li><a href="${href}"${ctx.path === href || ctx.path.startsWith(href + '/') ? raw(' aria-current="page"') : ''}>${label}</a></li>`)}
    </ul>
  </nav>
  <a class="btn btn--small masthead__cta" href="/enquire">Send an enquiry</a>
  <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="menu" data-menu-toggle><span class="menu-toggle__bars" aria-hidden="true"></span><span class="visually-hidden">Menu</span></button>
</header>
<div class="menu" id="menu" hidden data-menu>
  <nav aria-label="Mobile">
    <ul>${NAV.map(([href, label]) => html`<li><a href="${href}">${label}</a></li>`)}<li><a href="/enquire">Send an enquiry</a></li></ul>
  </nav>
  ${contactList(ctx.contacts, { compact: true })}
</div>
<main id="main" tabindex="-1">
${page.body}
</main>
<footer class="footer">
  <div class="footer__brand">
    <span class="footer__mark">${MARK}</span>
    <p class="footer__address">${p.name}<br>${p.address_locality}, ${p.address_district}<br>${p.address_region}${p.postal_code ? ` ${p.postal_code}` : ''}</p>
    ${p.homestay_licensed ? html`<p class="footer__note">Licensed homestay${p.licence_number ? `, licence ${p.licence_number}` : ''}</p>` : ''}
  </div>
  <div class="footer__contacts">
    <h2 class="footer__title">Enquiries</h2>
    ${contactList(ctx.contacts, { compact: true })}
  </div>
  <nav class="footer__nav" aria-label="Footer">
    <ul>
      ${NAV.map(([href, label]) => html`<li><a href="${href}">${label}</a></li>`)}
      <li><a href="/privacy">Privacy</a></li>
      ${p.facebook_url ? html`<li><a href="${p.facebook_url}" rel="noopener" target="_blank">Facebook</a></li>` : ''}
    </ul>
  </nav>
  <p class="footer__legal">The photos on this site were taken at Siri Homestay by its owners. © ${new Date().getFullYear()} ${p.name}.</p>
</footer>
</body>
</html>`;
}

module.exports = { layout, contactList, waLink, ICON, MARK, NAV };
