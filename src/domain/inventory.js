'use strict';
// The occupancy ledger. Every confirmed/held stay and every owner block writes one
// inventory_nights row per villa per night; the (unit_id, night) primary key makes
// overlapping bookings impossible even if two requests race.
const { nights, addDays, isValidDate, fmtDate } = require('../lib/dates');
const { ConflictError, DomainError, audit } = require('./core');
const catalog = require('./catalog');

function occupancy(db, unitIds, from, to) {
  // Map unitId -> Map night -> {reservation_id, block_id}
  const out = new Map(unitIds.map((id) => [id, new Map()]));
  if (!unitIds.length) return out;
  const rows = db.prepare(`SELECT unit_id, night, reservation_id, block_id FROM inventory_nights
                           WHERE night >= ? AND night < ? AND unit_id IN (${unitIds.map(() => '?').join(',')})`)
    .all(from, to, ...unitIds);
  for (const r of rows) out.get(r.unit_id).set(r.night, r);
  return out;
}

// Units of a room type with no occupied night in [checkIn, checkOut).
function freeUnits(db, rt, checkIn, checkOut, { ignoreReservationId = null } = {}) {
  const us = catalog.unitsForRoomType(db, rt);
  const occ = occupancy(db, us.map((u) => u.id), checkIn, checkOut);
  return us.filter((u) => {
    for (const row of occ.get(u.id).values()) {
      if (ignoreReservationId && row.reservation_id === ignoreReservationId) continue;
      return false;
    }
    return true;
  });
}

// Per-night counts for a room type, from real ledger data only.
function availability(db, rt, from, to) {
  const us = catalog.unitsForRoomType(db, rt);
  const occ = occupancy(db, us.map((u) => u.id), from, to);
  const days = {};
  for (const n of nights(from, to)) {
    let taken = 0;
    for (const u of us) if (occ.get(u.id).has(n)) taken++;
    const free = us.length - taken;
    days[n] = rt.kind === 'whole_property' ? { free: taken === 0 ? 1 : 0, total: 1 } : { free, total: us.length };
  }
  return days;
}

function describeConflicts(db, unitIds, checkIn, checkOut, ignoreReservationId) {
  const occ = occupancy(db, unitIds, checkIn, checkOut);
  const names = new Map(db.prepare(`SELECT id, name FROM units WHERE id IN (${unitIds.map(() => '?').join(',')})`)
    .all(...unitIds).map((u) => [u.id, u.name]));
  const conflicts = [];
  for (const [unitId, m] of occ) {
    for (const [night, row] of m) {
      if (ignoreReservationId && row.reservation_id === ignoreReservationId) continue;
      conflicts.push({ unitId, unit: names.get(unitId), night, reservationId: row.reservation_id, blockId: row.block_id });
    }
  }
  conflicts.sort((a, b) => (a.night < b.night ? -1 : 1));
  return conflicts;
}

function conflictMessage(conflicts) {
  const first = conflicts[0];
  const what = first.blockId ? 'blocked' : 'already booked';
  const more = conflicts.length > 1 ? ` (and ${conflicts.length - 1} more night${conflicts.length > 2 ? 's' : ''})` : '';
  return `${first.unit} is ${what} on the night of ${fmtDate(first.night)}${more}.`;
}

// Must run inside a transaction. Throws ConflictError if any night is taken.
function allocate(db, reservationId, unitIds, checkIn, checkOut) {
  if (!unitIds.length) throw new DomainError('Choose at least one villa.');
  const conflicts = describeConflicts(db, unitIds, checkIn, checkOut, reservationId);
  if (conflicts.length) throw new ConflictError(conflictMessage(conflicts), conflicts);
  const insUnit = db.prepare('INSERT OR IGNORE INTO reservation_units (reservation_id, unit_id) VALUES (?,?)');
  const insNight = db.prepare('INSERT INTO inventory_nights (unit_id, night, reservation_id) VALUES (?,?,?)');
  try {
    for (const u of unitIds) {
      insUnit.run(reservationId, u);
      for (const n of nights(checkIn, checkOut)) insNight.run(u, n, reservationId);
    }
  } catch (e) {
    if (String(e.code).startsWith('SQLITE_CONSTRAINT')) {
      throw new ConflictError('Those dates were just taken by another booking. Refresh and try again.', null);
    }
    throw e;
  }
}

function release(db, reservationId) {
  return db.prepare('DELETE FROM inventory_nights WHERE reservation_id = ?').run(reservationId).changes;
}

function createBlock(db, { unitId, startDate, endDate, reason = null, source = 'owner', adminId = null }) {
  if (!isValidDate(startDate) || !isValidDate(endDate) || endDate <= startDate) {
    throw new DomainError('Choose a start date and an end date after it.', { field: 'end_date' });
  }
  const unit = db.prepare('SELECT * FROM units WHERE id = ?').get(unitId);
  if (!unit) throw new DomainError('Choose a villa to block.', { field: 'unit_id' });
  return db.transaction(() => {
    const conflicts = describeConflicts(db, [unitId], startDate, endDate, null);
    if (conflicts.length) throw new ConflictError(conflictMessage(conflicts), conflicts);
    const id = db.prepare(`INSERT INTO blocks (unit_id, start_date, end_date, reason, source, created_by)
                           VALUES (?,?,?,?,?,?)`).run(unitId, startDate, endDate, reason, source, adminId).lastInsertRowid;
    const ins = db.prepare('INSERT INTO inventory_nights (unit_id, night, block_id) VALUES (?,?,?)');
    for (const n of nights(startDate, endDate)) ins.run(unitId, n, id);
    audit(db, { actorType: adminId ? 'admin' : 'system', actorId: adminId, action: 'block.created', entityType: 'block',
      entityId: Number(id), details: { unit: unit.name, startDate, endDate, reason } });
    return Number(id);
  }).immediate();
}

function deleteBlock(db, blockId, adminId = null) {
  return db.transaction(() => {
    const b = db.prepare('SELECT b.*, u.name AS unit_name FROM blocks b JOIN units u ON u.id = b.unit_id WHERE b.id = ?').get(blockId);
    if (!b) return false;
    db.prepare('DELETE FROM blocks WHERE id = ?').run(blockId); // nights cascade
    audit(db, { actorType: 'admin', actorId: adminId, action: 'block.deleted', entityType: 'block', entityId: blockId,
      details: { unit: b.unit_name, startDate: b.start_date, endDate: b.end_date } });
    return true;
  }).immediate();
}

// Calendar grid for the admin: units x days.
function grid(db, from, days) {
  const to = addDays(from, days);
  const us = catalog.units(db);
  const rows = db.prepare(`SELECT i.unit_id, i.night, i.reservation_id, i.block_id, r.ref, r.status, g.full_name, b.reason
      FROM inventory_nights i
      LEFT JOIN reservations r ON r.id = i.reservation_id
      LEFT JOIN guests g ON g.id = r.guest_id
      LEFT JOIN blocks b ON b.id = i.block_id
      WHERE i.night >= ? AND i.night < ?`).all(from, to);
  const cell = new Map();
  for (const r of rows) cell.set(r.unit_id + '|' + r.night, r);
  return { from, to, units: us, dates: nights(from, to), cell: (u, d) => cell.get(u + '|' + d) || null };
}

module.exports = { occupancy, freeUnits, availability, allocate, release, createBlock, deleteBlock, grid, describeConflicts };
