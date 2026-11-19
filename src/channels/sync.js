'use strict';
/**
 * Provider-independent sync services. Phase 2 adapters plug in here; Phase 1
 * uses occupiedRanges() for the owner's calendar export only.
 */
const { nowIso, isValidDate } = require('../lib/dates');
const { audit, DomainError } = require('../domain/core');
const inventory = require('../domain/inventory');
const { adapterFor, canConnect } = require('./registry');

// Collapse a unit's ledger nights into contiguous ranges.
function occupiedRanges(db, unitId, from, to) {
  const rows = db.prepare(`SELECT i.night, i.reservation_id, i.block_id, r.ref, b.reason
      FROM inventory_nights i LEFT JOIN reservations r ON r.id = i.reservation_id LEFT JOIN blocks b ON b.id = i.block_id
      WHERE i.unit_id = ? AND i.night >= ? AND i.night < ? ORDER BY i.night`).all(unitId, from, to);
  const ranges = [];
  for (const r of rows) {
    const key = r.reservation_id ? 'r' + r.reservation_id : 'b' + r.block_id;
    const last = ranges[ranges.length - 1];
    const next = new Date(r.night + 'T00:00:00Z'); next.setUTCDate(next.getUTCDate() + 1);
    const end = next.toISOString().slice(0, 10);
    if (last && last.key === key && last.end === r.night) last.end = end;
    else ranges.push({ key, start: r.night, end, kind: r.reservation_id ? 'reservation' : 'block', ref: r.ref || null, summary: r.reason || null });
  }
  return ranges.map(({ key, ...x }) => x);
}

function icsEscape(s) { return String(s).replace(/[\\;,]/g, (c) => '\\' + c).replace(/\n/g, '\\n'); }

// iCalendar export of one villa's occupied dates (owner's backup / Phase 2 feeds).
function toICal({ calName, unitCode, ranges, host = 'sirihomestay.in' }) {
  const stamp = nowIso().replace(/[-:]/g, '');
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Siri Homestay//Booking engine//EN', 'CALSCALE:GREGORIAN',
    `X-WR-CALNAME:${icsEscape(calName)}`];
  for (const r of ranges) {
    lines.push('BEGIN:VEVENT', `UID:${unitCode}-${r.start}-${r.kind}@${host}`, `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${r.start.replace(/-/g, '')}`, `DTEND;VALUE=DATE:${r.end.replace(/-/g, '')}`,
      `SUMMARY:${icsEscape(r.kind === 'block' ? 'Not available' : 'Booked')}`, 'END:VEVENT');
  }
  lines.push('END:VCALENDAR');
  return lines.join('\r\n') + '\r\n';
}

// Records a sync attempt. Phase 1: always "skipped" because no adapter is connected.
async function runSync(db, listingId, direction) {
  const listing = db.prepare('SELECT * FROM channel_listings WHERE id = ?').get(listingId);
  if (!listing) throw new DomainError('Listing not found.');
  const runId = Number(db.prepare(`INSERT INTO channel_sync_runs (channel_listing_id, direction, status) VALUES (?,?, 'running')`)
    .run(listingId, direction).lastInsertRowid);
  if (!canConnect(listing.provider) || !listing.sync_enabled || listing.connection_status !== 'connected') {
    db.prepare(`UPDATE channel_sync_runs SET status = 'skipped', finished_at = ?, error_message = ? WHERE id = ?`)
      .run(nowIso(), 'Not connected (Phase 2).', runId);
    return { runId, status: 'skipped' };
  }
  const adapter = adapterFor(listing.provider);
  try {
    let seen = 0, changed = 0;
    if (direction === 'import') {
      const items = await adapter.fetchReservations(listing, { since: listing.last_synced_at });
      for (const item of items) { seen++; if (importReservation(db, listing, item).changed) changed++; }
    } else {
      const ranges = listing.unit_id ? occupiedRanges(db, listing.unit_id, '0000-01-01', '9999-12-31') : [];
      await adapter.pushAvailability(listing, ranges); seen = ranges.length;
    }
    db.prepare(`UPDATE channel_sync_runs SET status='succeeded', finished_at=?, items_seen=?, items_changed=? WHERE id=?`)
      .run(nowIso(), seen, changed, runId);
    db.prepare('UPDATE channel_listings SET last_synced_at = ? WHERE id = ?').run(nowIso(), listingId);
    return { runId, status: 'succeeded', seen, changed };
  } catch (e) {
    db.prepare(`UPDATE channel_sync_runs SET status='failed', finished_at=?, error_message=? WHERE id=?`)
      .run(nowIso(), String(e.message).slice(0, 500), runId);
    return { runId, status: 'failed', error: e.message };
  }
}

/**
 * Idempotently applies one normalised platform reservation to the ledger.
 * Used by Phase 2 adapters; covered by tests so the database contract is proven now.
 */
function importReservation(db, listing, item) {
  if (!item || !item.externalId || !isValidDate(item.checkIn) || !isValidDate(item.checkOut) || item.checkOut <= item.checkIn) {
    throw new DomainError('Invalid channel reservation payload.');
  }
  const source = ['airbnb', 'makemytrip'].includes(listing.provider) ? listing.provider : 'other_channel';
  return db.transaction(() => {
    const existing = db.prepare('SELECT * FROM reservations WHERE source = ? AND external_reservation_id = ?').get(source, item.externalId);
    const unitId = listing.unit_id || db.prepare('SELECT id FROM units WHERE room_type_id = ? AND is_active = 1 ORDER BY sort_order LIMIT 1').get(listing.room_type_id)?.id;
    if (!unitId) throw new DomainError('Listing has no villa to book.');
    const unit = db.prepare('SELECT * FROM units WHERE id = ?').get(unitId);
    if (existing) {
      if (item.status === 'cancelled' && existing.status !== 'cancelled') {
        inventory.release(db, existing.id);
        db.prepare("UPDATE reservations SET status='cancelled', cancelled_at=?, updated_at=? WHERE id=?").run(nowIso(), nowIso(), existing.id);
        audit(db, { actorType: 'channel', action: 'reservation.cancelled', entityType: 'reservation', entityId: existing.id, details: { source } });
        return { id: existing.id, changed: true };
      }
      return { id: existing.id, changed: false };
    }
    if (item.status === 'cancelled') return { id: null, changed: false };
    const guestId = Number(db.prepare('INSERT INTO guests (full_name, email, phone) VALUES (?,?,?)')
      .run(item.guest?.name || 'Channel guest', item.guest?.email || null, item.guest?.phone || null).lastInsertRowid);
    const { bookingRef } = require('../lib/security');
    const id = Number(db.prepare(`INSERT INTO reservations (ref, property_id, room_type_id, guest_id, check_in, check_out, units_requested,
        adults, children, status, source, channel_listing_id, external_reservation_id, quoted_total_inr, confirmed_at)
        VALUES (?,?,?,?,?,?,1,?,?,'confirmed',?,?,?,?,?)`)
      .run(bookingRef(), unit.property_id, unit.room_type_id, guestId, item.checkIn, item.checkOut, Math.max(1, item.adults || 1),
        item.children || 0, source, listing.id, item.externalId, item.totalInr ?? null, nowIso()).lastInsertRowid);
    inventory.allocate(db, id, [unitId], item.checkIn, item.checkOut);
    audit(db, { actorType: 'channel', action: 'reservation.imported', entityType: 'reservation', entityId: id, details: { source, externalId: item.externalId } });
    return { id, changed: true };
  }).immediate();
}

module.exports = { occupiedRanges, toICal, runSync, importReservation };
