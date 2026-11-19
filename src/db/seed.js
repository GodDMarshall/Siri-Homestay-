'use strict';
/**
 * Seeds the property with verified information only.
 *
 * Sources:
 *  [C] Client brief via Dilip (WhatsApp, 12 & 17 Nov 2026): acreage, villas, facilities, power backup,
 *      licence, location, enquiry contacts and their order.
 *  [P] Client photos and videos (Nov 2026): what rooms and grounds contain. The site shows 3D renders
 *      modelled on them (src/world/); the photos and videos themselves are not published.
 *  [W] Existing sirihomestay.in: meals, activities, TV/DTH, nearby places, Facebook page.
 *  [L] Current online listing for the property: check-in/out times, 4 guests per room.
 * Anything marked CONFIRM in docs/CONTENT-SOURCES.md should be checked with the owner.
 */
const fs = require('node:fs');
const path = require('node:path');
const { hashPassword, token } = require('../lib/security');

const GARDEN_VILLA = {
  slug: 'garden-villa',
  name: 'Garden Villa',
  kind: 'unit',
  summary: 'A whitewashed villa with glass doors onto the garden, a patio among the bamboo and an attached bathroom.',
  description:
    'The villas sit in the garden behind screens of golden bamboo. Inside there is a king-size bed with one or two ' +
    'single beds, a wardrobe and a dressing table, and floor-to-ceiling sliding glass that opens onto a patio and the lawn. ' +
    'Some villas look out on a small blue-lined pool beside the bedroom glass. Every villa has its own bathroom.',
  bed_config: 'A king-size bed with one or two single beds',
  max_guests: 4, // [L] listing: sleeps 4 per room; [P] beds seen in footage
  features: [
    'King-size bed with one or two single beds',
    'Attached bathroom with shower',
    'Sliding glass doors onto a patio and the lawn',
    'Wardrobe and dressing table with mirror',
    'LCD TV with satellite (DTH) channels',
    'No smoking inside the villa',
  ],
  media: {
    hero: 'villa-bedroom',
    card: 'villa-patio',
    gallery: ['doorway-bedroom', 'villa-bedroom', 'room-beds', 'villa-window-pool', 'villa-patio', 'patio-chairs', 'walk-door', 'villa-pool',
      'bath-basin', 'bath-wc', 'room-pool-view'],
    tour: 'garden-villa',
  },
  // Room entry: a camera flight through the 3D estate (see src/world/views.js), with
  // rendered stills of the same walk for devices without 3D.
  transition: {
    world: [
      { path: 'arrival', from: 0.38, to: 1, ms: 2600, caption: 'Across the lawn to a villa' },
      { path: 'enter', from: 0, to: 1, ms: 3000, door: [0, 0.35], caption: 'The glass door slides open' },
      { ms: 500, caption: 'Your room' },
    ],
    stills: [
      { media: 'villa-patio', from: { x: 0.5, y: 0.5, s: 1.0 }, to: { x: 0.56, y: 0.55, s: 1.6 }, ms: 1100, caption: 'A villa in the bamboo' },
      { media: 'walk-door', from: { x: 0.5, y: 0.6, s: 1.0 }, to: { x: 0.52, y: 0.5, s: 1.35 }, ms: 1000, caption: 'The glass door slides open' },
      { media: 'walk-bed', from: { x: 0.5, y: 0.6, s: 1.2 }, to: { x: 0.5, y: 0.55, s: 1.04 }, ms: 1000, caption: 'Your room' },
    ],
  },
  sort_order: 1,
};

const WHOLE_ESTATE = {
  slug: 'whole-estate',
  name: 'The whole estate',
  kind: 'whole_property',
  summary: 'All five villas, the dining hall and the lawn to yourselves, for family gatherings and group trips.',
  description:
    'Take every villa and have the estate to your group: the separate dining hall, the lawn with its volleyball net and ' +
    'umbrella tables, the campfire corner and the paths through the bamboo. Meals are cooked in the estate kitchen. ' +
    'Tell the hosts about your group and the occasion, and they will reply with what is possible.',
  bed_config: 'Five villas, each with a king-size bed and one or two single beds',
  max_guests: 20,
  features: [
    'All five villas',
    'Separate dining hall and kitchen',
    'Lawn with volleyball net and umbrella tables',
    'Campfire corner',
    'Pond of about 15,000 sq ft',
    '7.5 kW generator and 4 kW UPS backup',
  ],
  media: {
    hero: 'estate-lawn-dining',
    card: 'lawn-umbrellas',
    gallery: ['aerial', 'estate-lawn-dining', 'lawn-stepping-stones', 'lawn-umbrellas', 'courtyard-villas', 'lawn-table-villa',
      'night-garden', 'night-lawn', 'courtyard-villa', 'courtyard-garden', 'bamboo-view-lawn', 'pond'],
    tour: 'whole-estate',
  },
  transition: {
    world: [
      { view: 'aerial', ms: 700, caption: 'Five villas on 4.28 acres' },
      { fly: 'lawn-stepping-stones', ms: 3200, caption: 'Down to the lawn' },
      { fly: 'estate-lawn-dining', ms: 2400, caption: 'The lawn and the dining hall' },
    ],
    stills: [
      { media: 'aerial', from: { x: 0.5, y: 0.5, s: 1.0 }, to: { x: 0.45, y: 0.55, s: 1.5 }, ms: 1100, caption: 'Five villas on 4.28 acres' },
      { media: 'lawn-stepping-stones', from: { x: 0.5, y: 0.6, s: 1.25 }, to: { x: 0.5, y: 0.5, s: 1.0 }, ms: 1000, caption: 'Down to the lawn' },
      { media: 'estate-lawn-dining', from: { x: 0.45, y: 0.55, s: 1.3 }, to: { x: 0.5, y: 0.5, s: 1.04 }, ms: 1000, caption: 'The lawn and the dining hall' },
    ],
  },
  sort_order: 2,
};

const CONTACTS = [
  // Order as instructed by the client: Swetha first, Ganesh second, Dilip last.
  { name: 'Swetha Iyappa', phone: '+919845451273', email: 'sirihomestayjoldhal@gmail.com', whatsapp: 1, notify: 1 },
  { name: 'Ganesh UT', phone: '+919901769567', email: 'utganeshuluvagilu@gmail.com', whatsapp: 1, notify: 1 },
  { name: 'Dilip', phone: '+917795378068', email: null, whatsapp: 1, notify: 0 },
];

function seed(db, { log = console.log, createAdmin = true, dataDir = null } = {}) {
  const exists = db.prepare('SELECT COUNT(*) AS n FROM property').get().n > 0;
  if (!exists) {
    db.transaction(() => {
      const pid = Number(db.prepare(`INSERT INTO property (slug, name, summary, address_locality, address_district, address_region,
          land_area_acres, converted_land_acres, villa_count, pond_area_sqft, lawn_area_sqft, generator_kw, ups_kw,
          homestay_licensed, has_dining_hall, has_staff_quarters, has_kitchen, check_in_time, check_in_until, check_out_time, facebook_url)
          VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).run(
        'siri-homestay', 'Siri Homestay',
        'Five villas on a 4.28-acre estate at Joldal, outside Chikmagalur town.',
        'Joldal', 'Chikkamagaluru', 'Karnataka',
        4.28, 1.12, 5, 15000, 1000, 7.5, 4, 1, 1, 1, 1, '12:00', '21:30', '11:00', 'https://www.facebook.com/sirihomestay',
      ).lastInsertRowid);

      const insType = db.prepare(`INSERT INTO room_types (property_id, slug, name, kind, summary, description, bed_config, max_guests,
          features_json, media_json, transition_json, sort_order) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`);
      const ids = {};
      for (const t of [GARDEN_VILLA, WHOLE_ESTATE]) {
        ids[t.slug] = Number(insType.run(pid, t.slug, t.name, t.kind, t.summary, t.description, t.bed_config, t.max_guests,
          JSON.stringify(t.features), JSON.stringify(t.media), JSON.stringify(t.transition), t.sort_order).lastInsertRowid);
      }
      const insUnit = db.prepare('INSERT INTO units (property_id, room_type_id, code, name, sort_order) VALUES (?,?,?,?,?)');
      for (let i = 1; i <= 5; i++) insUnit.run(pid, ids['garden-villa'], `V${i}`, `Villa ${i}`, i);

      const insContact = db.prepare(`INSERT INTO contacts (property_id, name, phone_e164, email, whatsapp, notify_on_enquiry, sort_order)
          VALUES (?,?,?,?,?,?,?)`);
      CONTACTS.forEach((c, i) => insContact.run(pid, c.name, c.phone, c.email, c.whatsapp, c.notify, i + 1));

      const insSetting = db.prepare('INSERT OR IGNORE INTO settings (key, value) VALUES (?,?)');
      for (const [k, v] of Object.entries({ publish_availability: '0', hold_hours: '48', guest_ack_email: '1' })) insSetting.run(k, v);
    })();
    log('Seeded property, 2 stay types, 5 villas and 3 contacts.');
  }

  if (createAdmin && db.prepare('SELECT COUNT(*) AS n FROM admin_users').get().n === 0) {
    const email = process.env.ADMIN_EMAIL || 'owner@sirihomestay.in';
    const password = process.env.ADMIN_PASSWORD || token(12);
    db.prepare('INSERT INTO admin_users (email, name, password_hash, must_change_password) VALUES (?,?,?,1)')
      .run(email, 'Owner', hashPassword(password));
    if (dataDir) {
      fs.mkdirSync(dataDir, { recursive: true });
      fs.writeFileSync(path.join(dataDir, 'INITIAL-ADMIN-LOGIN.txt'),
        `Admin login for Siri Homestay\nURL: /admin\nEmail: ${email}\nPassword: ${password}\n\nYou will be asked to change it on first sign-in. Delete this file afterwards.\n`,
        { mode: 0o600 });
    }
    log(`Created admin ${email}. Temporary password: ${password}`);
  }
}

module.exports = { seed, GARDEN_VILLA, WHOLE_ESTATE, CONTACTS };

if (require.main === module) {
  const config = require('../config');
  const { get } = require('./index');
  seed(get(), { dataDir: config.dataDir });
}
