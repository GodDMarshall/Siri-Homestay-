'use strict';
// Read models for the property, its rooms, units and contacts.

function parseRoomType(r) {
  if (!r) return r;
  return {
    ...r,
    features: JSON.parse(r.features_json || '[]'),
    media: JSON.parse(r.media_json || '{}'),
  };
}

function property(db) {
  return db.prepare('SELECT * FROM property ORDER BY id LIMIT 1').get();
}

function contacts(db, { publicOnly = true } = {}) {
  const p = property(db);
  if (!p) return [];
  return db.prepare(`SELECT * FROM contacts WHERE property_id = ? ${publicOnly ? 'AND is_public = 1' : ''}
                     ORDER BY sort_order, id`).all(p.id);
}

function roomTypes(db, { activeOnly = true } = {}) {
  return db.prepare(`SELECT * FROM room_types ${activeOnly ? 'WHERE is_active = 1' : ''} ORDER BY sort_order, id`)
    .all().map(parseRoomType);
}

function roomTypeBySlug(db, slug, { activeOnly = true } = {}) {
  return parseRoomType(db.prepare(`SELECT * FROM room_types WHERE slug = ? ${activeOnly ? 'AND is_active = 1' : ''}`).get(slug));
}

function roomTypeById(db, id) {
  return parseRoomType(db.prepare('SELECT * FROM room_types WHERE id = ?').get(id));
}

function units(db, { activeOnly = true } = {}) {
  return db.prepare(`SELECT u.*, rt.name AS room_type_name FROM units u JOIN room_types rt ON rt.id = u.room_type_id
                     ${activeOnly ? 'WHERE u.is_active = 1' : ''} ORDER BY u.sort_order, u.id`).all();
}

// Units a room type draws on. A whole-property type uses every active unit.
function unitsForRoomType(db, rt) {
  if (rt.kind === 'whole_property') {
    return db.prepare('SELECT * FROM units WHERE property_id = ? AND is_active = 1 ORDER BY sort_order, id').all(rt.property_id);
  }
  return db.prepare('SELECT * FROM units WHERE room_type_id = ? AND is_active = 1 ORDER BY sort_order, id').all(rt.id);
}

function formatPhone(e164) {
  if (!e164) return '';
  const m = /^\+91(\d{5})(\d{5})$/.exec(e164);
  return m ? `+91 ${m[1]} ${m[2]}` : e164;
}

module.exports = { property, contacts, roomTypes, roomTypeBySlug, roomTypeById, units, unitsForRoomType, formatPhone, parseRoomType };
