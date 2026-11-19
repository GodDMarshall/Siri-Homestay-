# Siri Homestay website: Phase 1

The website, booking-enquiry system and owner admin for **Siri Homestay**, Joldal, Chikmagalur: five villas on a 4.28-acre estate.

- **Public site:** a cinematic home page built from the estate's own footage, a scene-by-scene explorer of the grounds, a room-entry film for each stay, stay pages, estate information, location, gallery, contact and enquiry form.
- **Booking engine:** enquiries, holds, confirmations, villa allocation, owner date blocks and an availability calendar. Double-booking is prevented by the database itself.
- **Owner admin** at `/admin`: bookings, calendar, blocks, stays and villas, property and contacts, email log, activity log, settings.
- **Ready for Phase 2:** Airbnb and MakeMyTrip listing references, provider-independent channel adapters, sync records and idempotent import. **Nothing is connected in Phase 1, and nothing is shown as connected.**
- **No online payment** is collected.

Docs: [Architecture and Phase 2 plan](docs/ARCHITECTURE.md) · [Admin guide](docs/ADMIN-GUIDE.md) · [QA report](docs/QA-REPORT.md) · [Content sources and items to confirm](docs/CONTENT-SOURCES.md)

## Run it locally

Requirements: Node.js 20 or newer.

```bash
npm install
npm run dev            # http://localhost:3000
```

On first start the app creates `data/siri-homestay.db`, seeds the property, five villas and the three enquiry contacts, and creates the owner account. The temporary password is printed in the console and saved to `data/INITIAL-ADMIN-LOGIN.txt`. Sign in at `/admin`; you'll be asked to choose a new password. Delete that file afterwards.

## Tests

```bash
npm test               # 14 booking-engine tests (Node test runner, in-memory database)
npm run test:e2e       # 34 browser checks on a fresh server: guest and owner flows, security, accessibility
```

`test:e2e` uses Google Chrome. Set `CHROME_PATH` if it isn't at `/usr/bin/google-chrome`.

## Deploy

Any host that runs a long-lived Node process with a writable disk works: a small VPS (Hostinger, DigitalOcean, Lightsail), Render or Railway with a persistent disk, or similar. Serverless platforms without a persistent disk are not suitable for SQLite.

1. Copy `.env.example` to `.env` and fill in `SITE_URL`, `APP_SECRET`, `ADMIN_EMAIL` and, for email, the `SMTP_*` settings.
2. `npm ci --omit=dev`
3. `npm start` (or run `server.js` under systemd or pm2), behind Nginx or Caddy with HTTPS, and set `TRUST_PROXY=1`.
4. Point `sirihomestay.in` at the server. Old WordPress addresses (`/resort/chickmagalore-homestay/`, `/features/media-gallery/` and so on) redirect to the new pages automatically.
5. **Back up `DATA_DIR`** daily. The whole booking history is the one SQLite file there (copy it while the app runs; WAL mode keeps the copy consistent if you use `sqlite3 data/siri-homestay.db ".backup backup.db"`).

Example systemd unit:

```ini
[Service]
WorkingDirectory=/srv/siri-homestay
EnvironmentFile=/srv/siri-homestay/.env
ExecStart=/usr/bin/node server.js
Restart=always
User=siri
```

### Email

Without SMTP the site works fully: enquiries are saved and visible in the admin, and the Emails page shows them as "not sent, email isn't set up". To send them, fill in `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` and `MAIL_FROM`. With Gmail, use an App Password, port 465 and `SMTP_SECURE=1`. New enquiries go to every contact ticked "Gets emails" (Swetha and Ganesh by default), and guests get an acknowledgement.

### Admin password reset

```bash
npm run admin:reset-password -- owner@sirihomestay.in
```

## Media

Everything under `public/media/` was generated from the client's originals by `scripts/build-media.py` (WebP renditions, blur placeholders, depth maps, trimmed silent films, the arrival frame sequence). To regenerate after adding photos:

```bash
pip install pillow numpy opencv-python onnxruntime
# put originals in ./originals and MiDaS model-small.onnx (github.com/isl-org/MiDaS releases v2_1) in ./models
npm run media
```

## Project layout

```
server.js                 entry point: migrate, seed, serve, housekeeping timer
src/config.js             settings from environment / .env
src/db/                   SQLite connection, migrations, seed data
src/domain/               reservations, inventory ledger, notifications, catalogue
src/channels/             Phase 2 boundary: adapter contract, registry, sync services
src/web/                  Express app, public and admin routes, auth, assets
src/views/                HTML templates (escaped by default)
public/                   CSS, JS, fonts, media
scripts/                  media pipeline, admin password reset
tests/                    unit tests, end-to-end suite, screenshot helpers
docs/                     architecture, admin guide, QA report, content sources
```
