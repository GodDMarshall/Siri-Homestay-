'use strict';
// Vercel entry point. Files in public/ are served by Vercel's CDN; everything else
// (pages, the enquiry form, the admin) is handled here by the Express app.
let app;
try {
  app = require('../src/serverless');
} catch (e) {
  // Without this, a missing setting shows only Vercel's generic FUNCTION_INVOCATION_FAILED.
  console.error(e);
  const missing = /Missing required setting (\w+)/.exec(e.message);
  app = (req, res) => {
    res.statusCode = 500;
    res.setHeader('content-type', 'text/plain; charset=utf-8');
    res.setHeader('cache-control', 'no-store');
    res.end(missing
      ? `The site can’t start because ${missing[1]} isn’t set. Add it in the Vercel project under Settings > Environment Variables, then redeploy.\n`
      : 'The site couldn’t start. The details are in the Vercel function logs.\n');
  };
}
module.exports = app;
