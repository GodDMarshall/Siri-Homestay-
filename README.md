# Siri Homestay website: Phase 1

The website, booking-enquiry system and owner admin for **Siri Homestay**, Joldal, Chikmagalur: five villas on a 4.28-acre estate.

- **Public site, built on the owners' photos, in 3D motion:** the home page opens on a villa among the golden bamboo, and the photo itself moves in depth (the bamboo in front shifts against the villa behind). Scrolling takes a tour of the homestay one full-screen photo at a time, with the camera drifting into each photo and the next one dissolving in from the nearest objects back: the courtyard, the lawn, the umbrella tables, the dining hall, a villa and its pool, the bedroom and the garden after dark. Each stay's page shows its photos side by side on a 3D carousel that turns as you scroll. **Explore** (`/explore`) lets you look around 18 spots in 3D, the courtyard, the lawn, a villa and after dark: drag to look around a photo, and select a marker on something you can see (the umbrella, the villa's glass doors, the pool) to move to the spot that shows it. Plus stay pages, estate information, location, a gallery of all the photos, contact and the enquiry form.
- **Booking engine:** enquiries, holds, confirmations, villa allocation, owner date blocks and an availability calendar. Double-booking is prevented by the database itself.
- **Owner admin** at `/admin`: bookings, calendar, blocks, stays and villas, property and contacts, email log, activity log, settings.
- **Ready for Phase 2:** Airbnb and MakeMyTrip listing references, provider-independent channel adapters, sync records and idempotent import. **Nothing is connected in Phase 1, and nothing is shown as connected.**
- **No online payment** is collected.

Docs: [Architecture and Phase 2 plan](docs/ARCHITECTURE.md) · [Admin guide](docs/ADMIN-GUIDE.md) · [QA report](docs/QA-REPORT.md) · [Content sources and items to confirm](docs/CONTENT-SOURCES.md)

## Run it locally

Requirements: Node.js 22 (pinned in `package.json`; Vercel uses the same). No compiler is needed: SQLite comes as a prebuilt binary, and `.npmrc` turns off install scripts.

```bash
npm install
npm run dev            # http://localhost:3000
```

On first start the app creates `data/siri-homestay.db`, seeds the property, five villas and the three enquiry contacts, and creates the owner account. The temporary password is printed in the console and saved to `data/INITIAL-ADMIN-LOGIN.txt` (if you set `ADMIN_PASSWORD` instead, it is used and never printed). Sign in at `/admin`; you'll be asked to choose a new password. Delete that file afterwards.

## Tests

```bash
npm test               # 18 tests: booking engine, temporary-storage mode, the Vercel entry point
npm run test:e2e       # 41 browser checks on a fresh server: guest and owner flows, security, accessibility, 3D photo tour, carousel and explorer
```

`test:e2e` uses Google Chrome. Set `CHROME_PATH` if it isn't at `/usr/bin/google-chrome`.

## Deploy

### On a server (for live bookings)

Any host that runs a long-lived Node process with a writable disk works: a small VPS (Hostinger, DigitalOcean, Lightsail), Render or Railway with a persistent disk, or similar.

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

### Vercel

The Vercel project `sirihomestay` deploys from `main`: every push goes live at https://sirihomestay.vercel.app. `vercel.json` serves everything in `public/` from Vercel's CDN and sends the rest to one function, `api/index.js` (the Express app), running in Mumbai (`bom1`) on Node 22.

Environment variables (Settings > Environment Variables, then redeploy): `APP_SECRET` (any long random value), `ADMIN_EMAIL` and `ADMIN_PASSWORD`. Without `APP_SECRET` the function doesn't start and the page says which setting is missing.

**Vercel has no lasting disk.** The SQLite database sits in `/tmp` and starts empty whenever Vercel starts a fresh copy of the function, so on Vercel the site runs in temporary-storage mode (`TEMPORARY_STORAGE`, on by default there):

- The enquiry form checks the guest's details, then gives them a ready-written WhatsApp message to send Swetha (or Ganesh) instead of saving the enquiry. Nothing says an enquiry was received.
- The availability calendar is never shown as live, whatever the admin setting.
- Every admin page warns that changes there can disappear. The admin password comes from `ADMIN_PASSWORD` and isn't asked to be changed, because a new one couldn't be kept.

To take enquiries and bookings through the site itself, connect a hosted database or run the site on a server with a disk; the normal enquiry flow then returns. Node 22 reaches end of life in April 2027: before then, run the tests on Node 24 and change `engines.node` in `package.json` to `24.x`.

### Email

Without SMTP the site works fully: enquiries are saved and visible in the admin, and the Emails page shows them as "not sent, email isn't set up". To send them, fill in `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` and `MAIL_FROM`. With Gmail, use an App Password, port 465 and `SMTP_SECURE=1`. New enquiries go to every contact ticked "Gets emails" (Swetha and Ganesh by default), and guests get an acknowledgement.

### Admin password reset

```bash
npm run admin:reset-password -- owner@sirihomestay.in
```

## Photos

Every picture on the site is one of the owners' photographs of Siri Homestay. No photo shows the bathroom, so two stills come from their walk-through video, and the gallery says so.

- `npm run photos` runs `scripts/build-photos.py` on the originals in `originals/` (not committed; needs Python with Pillow, NumPy and OpenCV, plus ffmpeg for the video stills). It writes the WebP sizes, a JPEG for sharing, blurred placeholders and `public/media/manifest.json` with each photo's caption and alt text.
- The clean-up is photographic only: levels, a little contrast and colour, fill light for rooms lit from a bright window, light noise reduction and sharpening. Nothing is added, removed or redrawn.
- The photos arrived through WhatsApp at 1600 x 1200, so the largest size (2400 px wide) is an enlargement. For sharper pictures, ask the owners for the original camera files (sent as a WhatsApp "Document" or through Google Drive), put them in `originals/` under the same names and run `npm run photos` again.
- To add a photo, add a line to `PHOTOS` in the script (key, file, area, look, caption, alt text describing only what is visible), run it, then use the key in `src/views/public.js` or a stay's `strip` list.

### AI enhancement

`npm run enhance` (`scripts/enhance-ai.py`) rebuilds every photo with an AI super-resolution model (Real-ESRGAN `realesr-general-x4v3`, run with onnxruntime; download the `.pth` from the [Real-ESRGAN v0.2.5.0 release](https://github.com/xinntao/Real-ESRGAN/releases/tag/v0.2.5.0) into `models/`) and grades it for a clean, vivid "AI" finish. It keeps what is in each photo, writes `<key>-ai-<width>.webp` files and updates the manifest. Run `npm run depth` after it.

### 3D motion

The depth comes from the photos themselves, not from a 3D model: nothing is drawn.

- `npm run depth` runs `scripts/build-depth.py`, which estimates how far away each part of a photo is (MiDaS v2.1 small, run tiled and edge-aligned to the photo) and writes a greyscale depth map per photo to `public/media/depth/`, plus a `depth` entry in the manifest. It needs Python with onnxruntime, OpenCV and NumPy, and the model file `models/model-small.onnx` (not committed, 66 MB) from the [MiDaS v2.1 release](https://github.com/isl-org/MiDaS/releases/tag/v2_1). Run it after `npm run photos`.
- `public/js/motion.js` draws each photo with WebGL and moves a camera through it using its depth map (parallax occlusion mapping), so nearer things move more than farther ones. It drives the home hero, the tour and the page headers, turns the room carousel, and reveals headings word by word.
- It watches the frame rate and lowers the resolution on slow devices; on a device without a graphics chip it renders smaller and only while you scroll. For testing, `localStorage.setItem('sh-motion', 'full')` in the browser console treats any device as fast, `'still'` renders full size but only on scroll (used for the screen recordings), and removing the key restores the default.
- `public/js/explore.js` runs the explorer on the same WebGL stage: dragging pans across the photo and tilts the camera for parallax, marks are placed using the depth under them so they stay on their objects, and selecting one moves into the photo towards it before the next spot arrives near-first. The spots, their captions and their marks are in `EXPLORE` in `src/views/public.js`; a mark's `x`/`y` is where the thing it names appears in the photo (fractions from the top-left), and it should only point at something actually visible there. Each spot is also its own page, `/explore?spot=<photo key>`, which works without JavaScript.
- Without WebGL the photos stay still but the tour, the carousel and the explorer still work. With reduced motion, or without JavaScript, the tour is a plain list of photos and the room photos scroll sideways on their own.

## Project layout

```
server.js                 entry point: migrate, seed, serve, housekeeping timer
src/config.js             settings from environment / .env
src/db/                   SQLite connection, migrations, seed data
src/domain/               reservations, inventory ledger, notifications, catalogue
src/channels/             Phase 2 boundary: adapter contract, registry, sync services
src/web/                  Express app, public and admin routes, auth, assets
src/views/                HTML templates (escaped by default)
public/                   CSS, JS, fonts, photos (public/media/photos), depth maps (public/media/depth)
scripts/                  photo and depth-map pipelines, admin password reset
tests/                    unit tests, end-to-end suite, screenshot helpers
docs/                     architecture, admin guide, QA report, content sources
```
