'use strict';
const express = require('express');
const V = require('../views/public');
const catalog = require('../domain/catalog');
const inventory = require('../domain/inventory');
const reservations = require('../domain/reservations');
const { allSettings, ValidationError, ConflictError } = require('../domain/core');
const { formStamp, checkFormStamp, rateLimit, ipKey, hmac, safeEqual } = require('../lib/security');
const { today, addDays, isValidDate, addMonths, monthStart } = require('../lib/dates');
const config = require('../config');

const LAST_REF = 'sh_ref';

// Settings as the public site sees them. Without lasting storage the owner's calendar can't
// be trusted (it resets with every fresh copy of the site), so it is never shown as live.
function publicSettings(db) {
  const s = allSettings(db);
  if (config.temporaryStorage) s.publish_availability = '0';
  return s;
}

function context(db, req) {
  const stays = catalog.roomTypes(db);
  return {
    property: catalog.property(db),
    contacts: catalog.contacts(db),
    stays,
    unitCount: catalog.units(db).length,
    settings: publicSettings(db),
    // Enquiries go to the hosts on WhatsApp instead of being saved (see config.temporaryStorage).
    handoff: config.temporaryStorage,
    path: req.path.replace(/\/$/, '') || '/',
  };
}

function calendarMonths(db, rt, months = 2) {
  const start = monthStart(today());
  const end = addMonths(start, months);
  const days = inventory.availability(db, rt, start, end);
  const t = today();
  const out = [];
  for (let i = 0; i < months; i++) {
    const m0 = addMonths(start, i);
    const label = new Date(m0 + 'T00:00:00Z').toLocaleDateString('en-IN', { month: 'long', year: 'numeric', timeZone: 'UTC' });
    const lead = (new Date(m0 + 'T00:00:00Z').getUTCDay() + 6) % 7; // Monday first
    const cells = Array(lead).fill(null);
    for (let d = m0; d < addMonths(m0, 1); d = addDays(d, 1)) cells.push({ date: d, ...days[d], past: d < t });
    out.push({ label, days: cells });
  }
  return { months: out };
}

module.exports = function publicRoutes(db) {
  const r = express.Router();

  r.get('/', (req, res) => res.send(V.home(context(db, req))));
  r.get('/stay', (req, res) => res.send(V.stayIndex(context(db, req))));
  r.get('/stay/:slug', (req, res, next) => {
    const ctx = context(db, req);
    const rt = catalog.roomTypeBySlug(db, req.params.slug);
    if (!rt) return next();
    const av = ctx.settings.publish_availability === '1' ? calendarMonths(db, rt) : null;
    res.send(V.stayPage(ctx, rt, av));
  });
  // The 3D explorer was replaced by the photo tour on the home page.
  r.get(['/explore', '/explore/'], (req, res) => res.redirect(301, '/#tour'));
  r.get('/estate', (req, res) => res.send(V.estate(context(db, req))));
  r.get('/around', (req, res) => res.send(V.around(context(db, req))));
  r.get('/gallery', (req, res) => res.send(V.gallery(context(db, req))));
  r.get('/privacy', (req, res) => res.send(V.privacy(context(db, req))));
  r.get('/contact', (req, res) => res.send(V.contact(context(db, req), { stamp: formStamp(), values: {} })));

  r.get('/enquire', (req, res) => {
    const ctx = context(db, req);
    const q = req.query;
    const values = {
      room_type: ctx.stays.some((s) => s.slug === q.stay) ? q.stay : undefined,
      check_in: isValidDate(q.in) && q.in >= today() ? q.in : '',
      check_out: isValidDate(q.out) ? q.out : '',
      adults: Number(q.adults) > 0 && Number(q.adults) <= 40 ? Number(q.adults) : 2,
    };
    res.send(V.enquirePage(ctx, { stamp: formStamp(), values }));
  });

  r.post('/enquire', (req, res, next) => {
    const ctx = context(db, req);
    const body = req.body || {};
    const values = { ...body };
    delete values._stamp; delete values.website;
    const rerender = (status, extra) => res.status(status).send(V.enquirePage(ctx, { stamp: formStamp(), values, ...extra }));

    const rl = rateLimit({ key: 'enquire:' + ipKey(req.ip), limit: 6, windowMs: 15 * 60e3 });
    if (!rl.allowed) {
      return rerender(429, { errors: {}, message: `Too many enquiries from this connection. Try again in ${Math.ceil(rl.retryAfterS / 60)} minutes, or call the hosts.` });
    }
    // Bots fill the hidden field or submit instantly. Pretend success without storing anything.
    const stamp = checkFormStamp(body._stamp);
    if (body.website || stamp === 'too_fast' || stamp === 'invalid') return res.redirect(303, '/enquire/sent/received');
    if (stamp === 'expired') return rerender(422, { errors: {}, message: 'This form was open for a long time. Check the details and send it again.' });

    // Nothing stored here would last, so check the details and give the guest a ready
    // WhatsApp message to send the hosts rather than saying the enquiry was received.
    if (ctx.handoff) {
      try {
        return res.set('Cache-Control', 'no-store').send(V.enquiryHandoff(ctx, reservations.checkEnquiry(db, body)));
      } catch (e) {
        if (e instanceof ValidationError) return rerender(422, { errors: e.errors });
        return next(e);
      }
    }

    try {
      const resv = reservations.createEnquiry(db, body);
      res.cookie(LAST_REF, `${resv.ref}.${hmac('ref:' + resv.ref)}`, { httpOnly: true, sameSite: 'lax', secure: config.isProd, maxAge: 24 * 3600e3, path: '/enquire' });
      return res.redirect(303, `/enquire/sent/${resv.ref}`);
    } catch (e) {
      if (e instanceof ValidationError) return rerender(422, { errors: e.errors });
      if (e instanceof ConflictError) return rerender(409, { conflict: e.message });
      return next(e);
    }
  });

  r.get('/enquire/sent/:ref', (req, res) => {
    const ctx = context(db, req);
    const [ref, sig] = String(req.cookies[LAST_REF] || '').split('.');
    // Details are shown only to the browser that sent the enquiry.
    if (ref === req.params.ref && safeEqual(sig, hmac('ref:' + ref))) {
      const resv = reservations.get(db, ref);
      if (resv) return res.set('Cache-Control', 'no-store').send(V.enquirySent(ctx, resv));
    }
    res.set('Cache-Control', 'no-store').send(V.enquirySent(ctx, null));
  });

  // Live availability from the owner's calendar. Never invents availability:
  // when the calendar isn't published it says so and returns no day data.
  r.get('/api/availability', (req, res) => {
    res.set('Cache-Control', 'no-store');
    const settings = publicSettings(db);
    const rt = catalog.roomTypeBySlug(db, String(req.query.stay || ''));
    const from = String(req.query.from || ''), to = String(req.query.to || '');
    if (!rt) return res.status(400).json({ error: 'Unknown stay.' });
    if (!isValidDate(from) || !isValidDate(to) || to <= from || addDays(from, 62) < to) {
      return res.status(400).json({ error: 'Give from/to dates, at most 62 days apart.' });
    }
    if (settings.publish_availability !== '1') return res.json({ published: false });
    const days = inventory.availability(db, rt, from, to);
    const minFree = Math.min(...Object.values(days).map((d) => d.free));
    res.json({ published: true, stay: rt.slug, kind: rt.kind, from, to, minFree, days });
  });

  // Old WordPress addresses -> new pages (keeps search rankings and old links).
  const legacy = {
    '/resort/chickmagalore-homestay': '/stay', '/recreation/attractions': '/estate', '/local-attractions-in-chikmagalur': '/around',
    '/features/media-gallery': '/gallery', '/features/how-to-reach': '/around', '/home': '/',
  };
  for (const [from, to] of Object.entries(legacy)) r.get([from, from + '/'], (req, res) => res.redirect(301, to));

  r.get('/robots.txt', (req, res) => res.type('text/plain').send(`User-agent: *\nDisallow: /admin\nDisallow: /enquire/sent/\nSitemap: ${config.siteUrl}/sitemap.xml\n`));
  r.get('/sitemap.xml', (req, res) => {
    const paths = ['/', '/stay', ...catalog.roomTypes(db).map((t) => `/stay/${t.slug}`), '/estate', '/around', '/gallery', '/contact', '/enquire', '/privacy'];
    res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((p) => `  <url><loc>${config.siteUrl}${p}</loc></url>`).join('\n')}\n</urlset>\n`);
  });
  r.get('/site.webmanifest', (req, res) => res.type('application/manifest+json').send(JSON.stringify({
    name: 'Siri Homestay', short_name: 'Siri', start_url: '/', display: 'standalone', background_color: '#EEF0EA', theme_color: '#17302A',
    icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }, { src: '/img/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  })));
  r.get('/healthz', (req, res) => { db.prepare('SELECT 1').get(); res.json({ ok: true }); });

  r.context = context;
  return r;
};

module.exports.context = context;
