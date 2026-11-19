# Architecture

Siri Homestay is one small Node.js application with an embedded SQLite database. There is no build step, no front-end framework and no external service it depends on to run. That keeps hosting cheap and the system easy to hand over.

```
Browser ──► Express (server.js)
             ├── Public pages      src/web/public-routes.js  → src/views/public.js
             ├── Enquiry API       POST /enquire, GET /api/availability
             ├── Owner admin       src/web/admin-routes.js   → src/views/admin.js
             └── Static files      public/ (CSS, JS, fonts, media)
                   │
             Domain layer          src/domain/   (reservations, inventory, notifications, catalog)
             Channel boundary      src/channels/ (adapter contract, registry, sync services)
                   │
             SQLite (WAL)          data/siri-homestay.db   ← back this file up
```

## Stack

| Part | Choice | Why |
|---|---|---|
| Runtime | Node.js 22+ | Runs on any VPS or Node host; no compiler needed |
| Web | Express 5, Helmet, compression | Familiar, few moving parts |
| Database | SQLite via better-sqlite3, WAL mode | One file, transactional, fast for a 5-villa property |
| Templates | Tagged template literals with escaping by default (`src/lib/html.js`) | No template engine; XSS-safe by default |
| Front end | Vanilla JS, CSS, WebGL | No framework or bundler to maintain |
| Email | Nodemailer over SMTP (optional) | Works with Gmail or any provider |
| Fonts | Anek Kannada (Latin, variable width) and Newsreader, self-hosted | No third-party requests |

## The booking model

```
property ─┬─ room_types (what guests choose: "Garden Villa", "The whole estate")
          │     └─ units (the five physical villas, V1–V5)
          ├─ contacts (enquiry people, in display order)
          └─ reservations ── guests
                 ├─ reservation_units (which villas a stay uses)
                 └─ inventory_nights  (one row per villa per night)
blocks ── inventory_nights               (owner closures, Phase 2 channel imports)
channel_listings ── channel_sync_runs    (Phase 2)
audit_log, notifications, settings, admin_users, sessions
```

### Why double-booking is impossible

`inventory_nights` has the primary key `(unit_id, night)`. Every held or confirmed stay and every owner block writes one row per villa per night, inside an `IMMEDIATE` transaction. If two requests race for the same villa and night, the second insert fails at the database level and its whole transaction rolls back. The application also checks first so it can explain the clash in plain words ("Villa 1 is already booked on the night of 20 Dec").

A stay occupies the nights `[check_in, check_out)`. The departure date is free for the next arrival.

### Status workflow

```
enquiry ──► hold ──► confirmed ──► checked_in ──► checked_out
   │          │          │
   │          │          ├──► cancelled
   │          │          └──► no_show
   │          ├──► expired (automatic, after hold_hours)
   │          ├──► enquiry (release)
   │          └──► cancelled
   ├──► declined
   └──► cancelled
```

Only `hold`, `confirmed`, `checked_in` and `checked_out` occupy villas. Moving out of them releases the nights. Website enquiries arrive as `enquiry` and never occupy anything until the owner acts.

### Availability is never invented

- By default the website says "The hosts check availability for every enquiry and reply personally" and `/api/availability` returns `{ "published": false }`.
- When the owner turns on **Show my calendar to guests** (Admin > Settings), the site shows full dates from the ledger and refuses enquiries for them. Open dates are worded as "Not booked on the hosts' calendar yet", never "available".
- No payment is collected.

## Phase 2: Airbnb and MakeMyTrip

Phase 1 ships the boundary only. Nothing connects to a platform, and nothing can be shown as connected.

### What already exists

| Piece | Location | Purpose |
|---|---|---|
| `channel_listings` | schema | Listing ID and URL per platform, per stay type or per villa. `connection_status` defaults to `not_connected`. |
| `channel_sync_runs` | schema | One row per import/export attempt: status, counts, error. |
| `reservations.source`, `external_reservation_id`, `channel_listing_id` | schema | Where a booking came from. `UNIQUE(source, external_reservation_id)` makes imports idempotent. |
| `blocks.source = 'channel_import'`, `external_uid` | schema | For platform blocks imported from calendars. |
| `ChannelAdapter` contract | `src/channels/adapter.js` | `verifyListing`, `fetchReservations`, `fetchBlocks`, `pushAvailability`, `capabilities()` with normalised shapes. |
| Registry | `src/channels/registry.js` | Every provider resolves to `NotConfiguredAdapter`. `canConnect()` is false, so the admin refuses to mark a listing connected. |
| `runSync()` | `src/channels/sync.js` | Records a run; today it records `skipped: Not connected (Phase 2)`. |
| `importReservation()` | `src/channels/sync.js` | Applies one normalised platform booking to the ledger, idempotently, including cancellations. Covered by tests. |
| `occupiedRanges()`, `toICal()` | `src/channels/sync.js` | Provider-independent export of a villa's booked/blocked nights. Used today for the owner's .ics download. |

### What Phase 2 adds

1. Choose the connection route per platform: official API or channel manager (needs partner approval and credentials), or iCal calendar sync (no approval; Airbnb supports it; MakeMyTrip support depends on the account).
2. Write `AirbnbAdapter` / `MakeMyTripAdapter` implementing `ChannelAdapter`, return real `capabilities()`, and register them in `registry.js`.
3. Add credential storage (environment variables or an encrypted settings table) and a connect flow in Admin > Airbnb and MakeMyTrip.
4. Schedule `runSync` for each connected listing (the server already runs a 5-minute housekeeping timer).
5. If iCal is used: expose a token-protected `GET /calendar/<unit>/<token>.ics` built from `occupiedRanges()`, and import the platform's feed as `blocks` with `source='channel_import'`.
6. Decide conflict policy (for example, a platform booking arriving for nights already taken directly) and surface conflicts in the admin.

No schema change or front-end rebuild is needed for these steps.

## Media pipeline

`scripts/build-media.py` turns the client's originals into web assets and is re-runnable:

- WebP renditions at 640/1024/1600 px (480/800/1200 for portrait) plus a JPEG for social sharing, and a tiny blurred placeholder embedded in `public/media/manifest.json`.
- Depth maps from MiDaS small (ONNX, run locally) for the WebGL parallax.
- The room-entry montage (`walk-in.mp4`), the estate arrival clip, two full walk-through films (sound removed, a mirror reflection cut), and a 96-frame WebP sequence for the scroll-scrubbed homepage arrival.

## Front-end motion

| Moment | File | Technique | Fallback |
|---|---|---|---|
| Hero | `depth.js` | WebGL: photo + depth map, pointer parallax, scroll dolly | Plain photo |
| Arrival | `cinema.js` | Scroll-scrubbed frames of the real walk on a canvas | Poster frame and text |
| Room entry | `cinema.js` | Shot list from `room_types.transition_json`: exterior push-in, walk-in film, bedroom settle; cross-document view transition | Normal link |
| Explore | `explore.js` | Depth scenes, hotspots on real objects, fly-through on "go" hotspots, swipe | Crossfade; gallery link without JS |
| Day to night | `site.js` | Scroll crossfade of real day and night photos | Night photo |

`prefers-reduced-motion` and the browser's data-saver flag switch every moment to its fallback (`public/js/boot.js` sets `.reduce-motion`). The room-entry film is portrait, so on phones it fills the screen; on desktops it is framed against a blurred backdrop.

Each stay's shot list lives in the database (`transition_json`), so a new room type gets its own entry sequence by adding a row, not code.

## Security

- Content-Security-Policy with no inline scripts, `frame-ancestors 'none'`, HSTS in production, `nosniff`, strict referrer policy, Permissions-Policy.
- Cross-site POSTs refused by Origin check; admin forms carry a per-session CSRF token; the login form uses a double-submit token.
- Passwords hashed with scrypt; sessions are random tokens stored as SHA-256 hashes; HttpOnly, SameSite=Lax, Secure in production; 7-day expiry; "sign out everywhere".
- Login rate limit per IP and account lockout after 8 failures. Enquiry rate limit (6 per 15 minutes per IP), honeypot field and signed time-trap.
- All SQL is parameterised. All HTML output is escaped by default.
- Enquiry confirmation pages show guest details only to the browser that sent them (signed cookie).
- The admin is `noindex`, `no-store`, and excluded in robots.txt.
