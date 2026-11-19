'use strict';
/**
 * Seeds the property with verified information only.
 *
 * Sources:
 *  [C] Client brief via Dilip (WhatsApp, 12 & 17 Nov 2026): acreage, villas, facilities, power backup,
 *      licence, location, enquiry contacts and their order.
 *  [P] Client photos and videos (Nov 2026): what rooms and grounds contain. The site shows the photos
 *      (scripts/build-photos.py), plus two bathroom stills from a video.
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
  // hero/card: one photo each; strip: the room's photos shown side by side on its page.
  media: {
    hero: 'villa-bedroom',
    card: 'villa-bedroom',
    strip: ['doorway-bedroom', 'villa-window-pool', 'villa-pool', 'bath-basin', 'bath-wc', 'villa-patio', 'patio-chairs', 'lawn-table-villa'],
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
    hero: 'lawn-stepping-stones',
    card: 'courtyard-villas',
    strip: ['courtyard-villas', 'courtyard-villa', 'estate-lawn-dining', 'lawn-umbrellas', 'lawn-table-closeup', 'courtyard-garden',
      'bamboo-view-lawn', 'night-garden', 'night-lawn', 'night-path'],
  },
  sort_order: 2,
};

const CONTACTS = [
  // Order as instructed by the client: Swetha first, Ganesh second, Dilip last.
  { name: 'Swetha Iyappa', phone: '+919845451273', email: 'sirihomestayjoldhal@gmail.com', whatsapp: 1, notify: 1 },
  { name: 'Ganesh UT', phone: '+919901769567', email: 'utganeshuluvagilu@gmail.com', whatsapp: 1, notify: 1 },
  { name: 'Dilip', phone: '+917795378068', email: null, whatsapp: 1, notify: 0 },
];

function seed(db, { log = console.log, createAdmin = true, dataDir = null, temporaryStorage = false } = {}) {
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
          JSON.stringify(t.features), JSON.stringify(t.media), '[]', t.sort_order).lastInsertRowid);
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
    const given = process.env.ADMIN_PASSWORD || '';
    if (temporaryStorage && !given) {
      // A generated password would differ on every fresh copy of the site and vanish with it.
      log('No admin account yet: set ADMIN_PASSWORD (and ADMIN_EMAIL) in the hosting settings to use /admin.');
    } else {
      const password = given || token(12);
      // Without lasting storage a new password would soon be forgotten, so don't ask for one.
      db.prepare('INSERT INTO admin_users (email, name, password_hash, must_change_password) VALUES (?,?,?,?)')
        .run(email, 'Owner', hashPassword(password), temporaryStorage ? 0 : 1);
      if (given) {
        log(`Created admin ${email} with the password from ADMIN_PASSWORD.`); // never echo a supplied secret
      } else {
        if (dataDir) {
          fs.mkdirSync(dataDir, { recursive: true });
          fs.writeFileSync(path.join(dataDir, 'INITIAL-ADMIN-LOGIN.txt'),
            `Admin login for Siri Homestay\nURL: /admin\nEmail: ${email}\nPassword: ${password}\n\nYou will be asked to change it on first sign-in. Delete this file afterwards.\n`,
            { mode: 0o600 });
        }
        log(`Created admin ${email}. Temporary password: ${password}`);
      }
    }
  }
}

module.exports = { seed, GARDEN_VILLA, WHOLE_ESTATE, CONTACTS };

if (require.main === module) {
  const config = require('../config');
  const { get } = require('./index');
  seed(get(), { dataDir: config.dataDir, temporaryStorage: config.temporaryStorage });
}
