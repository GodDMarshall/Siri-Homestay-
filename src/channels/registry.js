'use strict';
const { NotConfiguredAdapter } = require('./adapter');

// Phase 2: register real adapters here, e.g. { airbnb: new AirbnbAdapter(creds) }.
const PROVIDERS = {
  airbnb: { label: 'Airbnb', adapter: new NotConfiguredAdapter('Airbnb') },
  makemytrip: { label: 'MakeMyTrip', adapter: new NotConfiguredAdapter('MakeMyTrip') },
  other: { label: 'Other platform', adapter: new NotConfiguredAdapter('Other platform') },
};

function adapterFor(provider) {
  const p = PROVIDERS[provider];
  if (!p) throw new Error(`Unknown channel provider: ${provider}`);
  return p.adapter;
}

// A listing can only be marked connected when its provider has a working adapter.
function canConnect(provider) {
  const caps = adapterFor(provider).capabilities();
  return Object.values(caps).some(Boolean);
}

module.exports = { PROVIDERS, adapterFor, canConnect };
