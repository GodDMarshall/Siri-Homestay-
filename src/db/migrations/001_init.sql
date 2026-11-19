-- Siri Homestay — initial schema.
-- Dates are ISO strings: 'YYYY-MM-DD' for calendar dates, 'YYYY-MM-DDTHH:MM:SSZ' for instants (UTC).
-- A stay occupies the nights [check_in, check_out): the check-out date itself is free.

CREATE TABLE property (
  id                    INTEGER PRIMARY KEY,
  slug                  TEXT NOT NULL UNIQUE,
  name                  TEXT NOT NULL,
  summary               TEXT,
  address_locality      TEXT,
  address_district      TEXT,
  address_region        TEXT,
  postal_code           TEXT,
  country               TEXT NOT NULL DEFAULT 'IN',
  latitude              REAL CHECK (latitude IS NULL OR latitude BETWEEN -90 AND 90),
  longitude             REAL CHECK (longitude IS NULL OR longitude BETWEEN -180 AND 180),
  map_url               TEXT,
  land_area_acres       REAL,
  converted_land_acres  REAL,      -- "alienation" (converted from agricultural use); internal record
  villa_count           INTEGER,
  pond_area_sqft        INTEGER,
  lawn_area_sqft        INTEGER,
  generator_kw          REAL,
  ups_kw                REAL,
  homestay_licensed     INTEGER NOT NULL DEFAULT 0 CHECK (homestay_licensed IN (0,1)),
  licence_number        TEXT,
  has_dining_hall       INTEGER NOT NULL DEFAULT 0 CHECK (has_dining_hall IN (0,1)),
  has_staff_quarters    INTEGER NOT NULL DEFAULT 0 CHECK (has_staff_quarters IN (0,1)),
  has_kitchen           INTEGER NOT NULL DEFAULT 0 CHECK (has_kitchen IN (0,1)),
  check_in_time         TEXT CHECK (check_in_time IS NULL OR check_in_time GLOB '[0-2][0-9]:[0-5][0-9]'),
  check_in_until        TEXT CHECK (check_in_until IS NULL OR check_in_until GLOB '[0-2][0-9]:[0-5][0-9]'),
  check_out_time        TEXT CHECK (check_out_time IS NULL OR check_out_time GLOB '[0-2][0-9]:[0-5][0-9]'),
  timezone              TEXT NOT NULL DEFAULT 'Asia/Kolkata',
  currency              TEXT NOT NULL DEFAULT 'INR',
  facebook_url          TEXT,
  created_at            TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')),
  updated_at            TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now'))
);

CREATE TABLE contacts (
  id                 INTEGER PRIMARY KEY,
  property_id        INTEGER NOT NULL REFERENCES property(id) ON DELETE CASCADE,
  name               TEXT NOT NULL,
  role               TEXT,
  phone_e164         TEXT CHECK (phone_e164 IS NULL OR phone_e164 GLOB '+[1-9][0-9]*'),
  email              TEXT CHECK (email IS NULL OR email LIKE '%_@_%._%'),
  whatsapp           INTEGER NOT NULL DEFAULT 0 CHECK (whatsapp IN (0,1)),
  is_public          INTEGER NOT NULL DEFAULT 1 CHECK (is_public IN (0,1)),
  notify_on_enquiry  INTEGER NOT NULL DEFAULT 0 CHECK (notify_on_enquiry IN (0,1)),
  sort_order         INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX ix_contacts_property ON contacts(property_id, sort_order);

-- A room type is what a guest chooses. kind='whole_property' means "every active unit".
CREATE TABLE room_types (
  id               INTEGER PRIMARY KEY,
  property_id      INTEGER NOT NULL REFERENCES property(id) ON DELETE CASCADE,
  slug             TEXT NOT NULL UNIQUE CHECK (slug GLOB '[a-z0-9]*' AND slug NOT GLOB '*[^a-z0-9-]*'),
  name             TEXT NOT NULL,
  kind             TEXT NOT NULL CHECK (kind IN ('unit','whole_property')),
  summary          TEXT,
  description      TEXT,
  bed_config       TEXT,
  max_guests       INTEGER NOT NULL CHECK (max_guests > 0),
  size_sqm         REAL CHECK (size_sqm IS NULL OR size_sqm > 0),
  features_json    TEXT NOT NULL DEFAULT '[]' CHECK (json_valid(features_json)),
  media_json       TEXT NOT NULL DEFAULT '{}' CHECK (json_valid(media_json)),
  transition_json  TEXT NOT NULL DEFAULT '[]' CHECK (json_valid(transition_json)),
  rate_mode        TEXT NOT NULL DEFAULT 'on_request' CHECK (rate_mode IN ('on_request','from')),
  rate_from_inr    INTEGER CHECK (rate_from_inr IS NULL OR rate_from_inr > 0),
  rate_basis       TEXT,
  is_active        INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0,1)),
  sort_order       INTEGER NOT NULL DEFAULT 0,
  updated_at       TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')),
  CHECK (rate_mode = 'on_request' OR rate_from_inr IS NOT NULL)
);

-- Physical inventory: one row per villa.
CREATE TABLE units (
  id            INTEGER PRIMARY KEY,
  property_id   INTEGER NOT NULL REFERENCES property(id) ON DELETE CASCADE,
  room_type_id  INTEGER NOT NULL REFERENCES room_types(id),
  code          TEXT NOT NULL UNIQUE,
  name          TEXT NOT NULL,
  notes         TEXT,
  is_active     INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0,1)),
  sort_order    INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX ix_units_type ON units(room_type_id);

CREATE TABLE guests (
  id          INTEGER PRIMARY KEY,
  full_name   TEXT NOT NULL,
  email       TEXT,
  phone       TEXT,
  city        TEXT,
  created_at  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now'))
);
CREATE INDEX ix_guests_email ON guests(email);
CREATE INDEX ix_guests_phone ON guests(phone);

-- Channel listings: references to the same rooms on external platforms (Phase 2).
CREATE TABLE channel_listings (
  id                   INTEGER PRIMARY KEY,
  provider             TEXT NOT NULL CHECK (provider IN ('airbnb','makemytrip','other')),
  room_type_id         INTEGER REFERENCES room_types(id) ON DELETE SET NULL,
  unit_id              INTEGER REFERENCES units(id) ON DELETE SET NULL,
  external_listing_id  TEXT,
  external_url         TEXT,
  connection_status    TEXT NOT NULL DEFAULT 'not_connected'
                         CHECK (connection_status IN ('not_connected','pending','connected','error','disabled')),
  sync_enabled         INTEGER NOT NULL DEFAULT 0 CHECK (sync_enabled IN (0,1)),
  last_synced_at       TEXT,
  notes                TEXT,
  created_at           TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')),
  updated_at           TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')),
  CHECK (room_type_id IS NOT NULL OR unit_id IS NOT NULL),
  UNIQUE (provider, external_listing_id)
);

CREATE TABLE reservations (
  id                       INTEGER PRIMARY KEY,
  ref                      TEXT NOT NULL UNIQUE,
  property_id              INTEGER NOT NULL REFERENCES property(id),
  room_type_id             INTEGER NOT NULL REFERENCES room_types(id),
  guest_id                 INTEGER NOT NULL REFERENCES guests(id),
  check_in                 TEXT NOT NULL CHECK (check_in GLOB '[0-9][0-9][0-9][0-9]-[0-1][0-9]-[0-3][0-9]'),
  check_out                TEXT NOT NULL CHECK (check_out GLOB '[0-9][0-9][0-9][0-9]-[0-1][0-9]-[0-3][0-9]'),
  units_requested          INTEGER NOT NULL DEFAULT 1 CHECK (units_requested >= 1),
  adults                   INTEGER NOT NULL CHECK (adults >= 1),
  children                 INTEGER NOT NULL DEFAULT 0 CHECK (children >= 0),
  status                   TEXT NOT NULL CHECK (status IN
                             ('enquiry','hold','confirmed','checked_in','checked_out','cancelled','declined','expired','no_show')),
  source                   TEXT NOT NULL DEFAULT 'direct_web' CHECK (source IN
                             ('direct_web','direct_phone','direct_whatsapp','walk_in','owner','airbnb','makemytrip','other_channel')),
  channel_listing_id       INTEGER REFERENCES channel_listings(id) ON DELETE SET NULL,
  external_reservation_id  TEXT,
  hold_expires_at          TEXT,
  quoted_total_inr         INTEGER CHECK (quoted_total_inr IS NULL OR quoted_total_inr >= 0),
  guest_message            TEXT,
  internal_notes           TEXT,
  consent_at               TEXT,
  created_at               TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')),
  updated_at               TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')),
  confirmed_at             TEXT,
  cancelled_at             TEXT,
  CHECK (check_out > check_in),
  CHECK (status <> 'hold' OR hold_expires_at IS NOT NULL),
  UNIQUE (source, external_reservation_id)
);
CREATE INDEX ix_res_status ON reservations(status, check_in);
CREATE INDEX ix_res_dates ON reservations(check_in, check_out);
CREATE INDEX ix_res_guest ON reservations(guest_id);

CREATE TABLE reservation_units (
  reservation_id  INTEGER NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
  unit_id         INTEGER NOT NULL REFERENCES units(id),
  PRIMARY KEY (reservation_id, unit_id)
) WITHOUT ROWID;
CREATE INDEX ix_resunits_unit ON reservation_units(unit_id);

-- Owner date blocks (maintenance, personal use) and, in Phase 2, imported channel blocks.
CREATE TABLE blocks (
  id                  INTEGER PRIMARY KEY,
  unit_id             INTEGER NOT NULL REFERENCES units(id),
  start_date          TEXT NOT NULL,
  end_date            TEXT NOT NULL,
  reason              TEXT,
  source              TEXT NOT NULL DEFAULT 'owner' CHECK (source IN ('owner','maintenance','channel_import')),
  channel_listing_id  INTEGER REFERENCES channel_listings(id) ON DELETE SET NULL,
  external_uid        TEXT,
  created_by          INTEGER REFERENCES admin_users(id) ON DELETE SET NULL,
  created_at          TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')),
  CHECK (end_date > start_date),
  UNIQUE (channel_listing_id, external_uid)
);
CREATE INDEX ix_blocks_unit ON blocks(unit_id, start_date);

-- The occupancy ledger. One row per villa per night. The primary key makes
-- double-booking impossible at the database level, whatever writes it.
CREATE TABLE inventory_nights (
  unit_id         INTEGER NOT NULL REFERENCES units(id),
  night           TEXT NOT NULL,
  reservation_id  INTEGER REFERENCES reservations(id) ON DELETE CASCADE,
  block_id        INTEGER REFERENCES blocks(id) ON DELETE CASCADE,
  PRIMARY KEY (unit_id, night),
  CHECK ((reservation_id IS NULL) <> (block_id IS NULL))
) WITHOUT ROWID;
CREATE INDEX ix_inv_res ON inventory_nights(reservation_id);
CREATE INDEX ix_inv_block ON inventory_nights(block_id);
CREATE INDEX ix_inv_night ON inventory_nights(night);

CREATE TABLE channel_sync_runs (
  id                  INTEGER PRIMARY KEY,
  channel_listing_id  INTEGER NOT NULL REFERENCES channel_listings(id) ON DELETE CASCADE,
  direction           TEXT NOT NULL CHECK (direction IN ('import','export')),
  status              TEXT NOT NULL CHECK (status IN ('queued','running','succeeded','failed','skipped')),
  started_at          TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')),
  finished_at         TEXT,
  items_seen          INTEGER NOT NULL DEFAULT 0,
  items_changed       INTEGER NOT NULL DEFAULT 0,
  error_message       TEXT,
  details_json        TEXT CHECK (details_json IS NULL OR json_valid(details_json))
);
CREATE INDEX ix_sync_listing ON channel_sync_runs(channel_listing_id, started_at);

CREATE TABLE admin_users (
  id                    INTEGER PRIMARY KEY,
  email                 TEXT NOT NULL UNIQUE COLLATE NOCASE,
  name                  TEXT NOT NULL,
  password_hash         TEXT NOT NULL,
  must_change_password  INTEGER NOT NULL DEFAULT 1 CHECK (must_change_password IN (0,1)),
  failed_attempts       INTEGER NOT NULL DEFAULT 0,
  locked_until          TEXT,
  created_at            TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')),
  last_login_at         TEXT
);

CREATE TABLE sessions (
  id          TEXT PRIMARY KEY,          -- sha256 of the cookie token; the token itself is never stored
  user_id     INTEGER NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  csrf_token  TEXT NOT NULL,
  created_at  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')),
  expires_at  TEXT NOT NULL,
  user_agent  TEXT
);
CREATE INDEX ix_sessions_expiry ON sessions(expires_at);

CREATE TABLE notifications (
  id              INTEGER PRIMARY KEY,
  reservation_id  INTEGER REFERENCES reservations(id) ON DELETE CASCADE,
  kind            TEXT NOT NULL,
  channel         TEXT NOT NULL DEFAULT 'email' CHECK (channel IN ('email')),
  recipient       TEXT NOT NULL,
  subject         TEXT NOT NULL,
  body_text       TEXT NOT NULL,
  status          TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','sent','failed','not_configured')),
  attempts        INTEGER NOT NULL DEFAULT 0,
  last_error      TEXT,
  created_at      TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')),
  sent_at         TEXT
);
CREATE INDEX ix_notifications_status ON notifications(status, created_at);

CREATE TABLE audit_log (
  id           INTEGER PRIMARY KEY,
  at           TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')),
  actor_type   TEXT NOT NULL CHECK (actor_type IN ('admin','guest','system','channel')),
  actor_id     INTEGER,
  action       TEXT NOT NULL,
  entity_type  TEXT NOT NULL,
  entity_id    INTEGER,
  details_json TEXT CHECK (details_json IS NULL OR json_valid(details_json))
);
CREATE INDEX ix_audit_entity ON audit_log(entity_type, entity_id, at);
CREATE INDEX ix_audit_at ON audit_log(at);

CREATE TABLE settings (
  key    TEXT PRIMARY KEY,
  value  TEXT NOT NULL
);
