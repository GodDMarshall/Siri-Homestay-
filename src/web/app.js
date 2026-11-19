'use strict';
const path = require('node:path');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const config = require('../config');
const publicRoutes = require('./public-routes');
const adminRoutes = require('./admin-routes');
const { loadSession } = require('./auth');
const V = require('../views/public');
const { DomainError } = require('../domain/core');

function createApp(db, { before = [] } = {}) {
  const app = express();
  app.disable('x-powered-by');
  if (config.trustProxy) app.set('trust proxy', 1);
  for (const mw of before) app.use(mw);

  app.use(helmet({
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:'],
        mediaSrc: ["'self'"],
        fontSrc: ["'self'"],
        connectSrc: ["'self'"],
        frameSrc: ['https://maps.google.com', 'https://www.google.com'],
        formAction: ["'self'"],
        frameAncestors: ["'none'"],
        baseUri: ["'self'"],
        objectSrc: ["'none'"],
        ...(config.isProd ? { upgradeInsecureRequests: [] } : {}),
      },
    },
    crossOriginEmbedderPolicy: false,
    strictTransportSecurity: config.isProd ? { maxAge: 31536000, includeSubDomains: true } : false,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  }));
  app.use((req, res, next) => { res.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()'); next(); });
  app.use(compression());

  const pub = path.join(__dirname, '..', '..', 'public');
  app.use(express.static(pub, {
    index: false, etag: true,
    setHeaders(res, file) {
      if (/[\\/](media|fonts)[\\/]/.test(file)) res.set('Cache-Control', 'public, max-age=2592000, immutable');
      else if (/\.(css|js)$/.test(file)) res.set('Cache-Control', 'public, max-age=31536000, immutable'); // URLs carry ?v=hash
      else res.set('Cache-Control', 'public, max-age=86400');
    },
  }));

  app.use(express.urlencoded({ extended: false, limit: '32kb', parameterLimit: 200 }));
  app.use(express.json({ limit: '32kb' }));
  app.use(cookieParser());

  // Cross-site POST protection: browsers send Origin on form posts; reject foreign ones.
  app.use((req, res, next) => {
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();
    const origin = req.get('origin');
    if (origin && origin !== 'null') {
      const host = req.get('x-forwarded-host') && config.trustProxy ? req.get('x-forwarded-host') : req.get('host');
      try { if (new URL(origin).host !== host) return res.status(403).send('Cross-site request refused.'); } catch { return res.status(403).send('Bad origin.'); }
    }
    next();
  });

  app.use(loadSession(db));
  app.use('/admin', adminRoutes(db));
  app.use(publicRoutes(db));

  app.use((req, res) => {
    res.status(404).send(V.notFound(publicRoutes.context(db, req)));
  });
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    if (err instanceof DomainError) return res.status(err.status).send(err.message);
    if (err.type === 'entity.too.large') return res.status(413).send('That was too much text to send.');
    console.error(err);
    try { res.status(500).send(V.serverError(publicRoutes.context(db, req))); } catch { res.status(500).send('Server error'); }
  });
  return app;
}

module.exports = { createApp };
