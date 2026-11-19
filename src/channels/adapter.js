'use strict';
/**
 * Channel adapter contract (Phase 2 integration boundary).
 *
 * Each external platform (Airbnb, MakeMyTrip, ...) gets one adapter class that
 * implements these methods and speaks only in the normalised shapes below. The
 * booking engine never talks to a platform directly: it talks to an adapter
 * through src/channels/sync.js, which records every run in channel_sync_runs.
 *
 * NormalisedReservation {
 *   externalId: string,           // platform booking id (unique per provider)
 *   status: 'confirmed'|'cancelled',
 *   checkIn: 'YYYY-MM-DD', checkOut: 'YYYY-MM-DD',
 *   guest: { name, email?, phone? },
 *   adults: number, children?: number,
 *   totalInr?: number, notes?: string
 * }
 * NormalisedBlock { externalUid: string, start: 'YYYY-MM-DD', end: 'YYYY-MM-DD', summary?: string }
 * OccupiedRange   { start: 'YYYY-MM-DD', end: 'YYYY-MM-DD', kind: 'reservation'|'block', ref?: string }
 *
 * Phase 1 ships no working adapter. Every provider resolves to
 * NotConfiguredAdapter, so nothing can be shown or treated as connected.
 */

class ChannelNotConfiguredError extends Error {
  constructor(provider) {
    super(`${provider} integration is not part of Phase 1 and is not connected.`);
    this.code = 'channel_not_configured';
  }
}

class ChannelAdapter {
  constructor(provider) { this.provider = provider; }
  /** @returns {{importReservations:boolean, importBlocks:boolean, exportAvailability:boolean}} */
  capabilities() { return { importReservations: false, importBlocks: false, exportAvailability: false }; }
  /** Check a listing reference is usable (credentials, ids). */
  async verifyListing(/* listing */) { throw new ChannelNotConfiguredError(this.provider); }
  /** @returns {Promise<NormalisedReservation[]>} */
  async fetchReservations(/* listing, { since } */) { throw new ChannelNotConfiguredError(this.provider); }
  /** @returns {Promise<NormalisedBlock[]>} */
  async fetchBlocks(/* listing, { from, to } */) { throw new ChannelNotConfiguredError(this.provider); }
  /** Push our occupied ranges for the listing's unit(s). */
  async pushAvailability(/* listing, OccupiedRange[] */) { throw new ChannelNotConfiguredError(this.provider); }
}

class NotConfiguredAdapter extends ChannelAdapter {}

module.exports = { ChannelAdapter, NotConfiguredAdapter, ChannelNotConfiguredError };
