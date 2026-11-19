# QA report: Phase 1

**Date:** 19 November 2026  
**Build:** Phase 1, version 1.0.0  
**Environment:** Node.js 22, SQLite 3.54, Google Chrome 153 (headless), Linux  
**Result:** 18/18 tests (booking engine, temporary-storage mode, Vercel entry point) and 41/41 end-to-end checks pass, with no accessibility violations (axe-core, WCAG 2.1 A/AA) on 13 pages and no browser errors.

**Update (3D estate):** the site's pictures and films were replaced by a 3D estate generated in code. Seven checks were added for it (section 2), and the motion review and performance figures below are for the 3D version.

**Update (Vercel):** the production build was made locally with the Vercel CLI (66.2) and the built function was run on its own, without the project's `node_modules`, as Vercel runs it: all 18 public and admin addresses answer as expected, every one of the 93 CSS, script, font and picture references on those pages exists in the static output, the enquiry form hands over to WhatsApp without saving anything, cross-site posts are refused, cookies are `Secure`, and the admin signs in with `ADMIN_PASSWORD`. Defects found and fixed: Vercel picked Node 26 from `"node": ">=22"` (now pinned to 22.x, the tested version); Vercel's request helpers would have replaced Express's `res.send` and `res.redirect` (the entry now exports the Express app, which Vercel leaves alone); the function bundle carried all 16 MB of pictures (now 8 MB, pictures come from the CDN); the admin sign-in card was squeezed into the 250 px sidebar column (fixed in `admin.css`).

Re-run any time with `npm test` and `npm run test:e2e`. The end-to-end run writes `tests/e2e-report.json`.

## 1. Booking engine (unit tests, `tests/booking.test.js`)

| # | Check | Result |
|---|---|---|
| 1 | Seed: 5 villas, 2 stay types, contacts in client order, phone formatting | Pass |
| 2 | Website enquiry is stored and does not occupy any villa; 3 notifications queued | Pass |
| 3 | Validation: past dates, reversed dates, over capacity, missing consent, unknown stay; 2 villas sleep 8 | Pass |
| 4 | Confirming allocates villas; a 4th overlapping booking is refused and rolled back; back-to-back stays allowed | Pass |
| 5 | Choosing a specific taken villa explains the clash ("Villa 1 is already booked…") | Pass |
| 6 | The database rejects a second booking of the same villa-night even if the application check is bypassed | Pass |
| 7 | Cancelling releases nights; the whole estate needs every villa free | Pass |
| 8 | Illegal status moves are refused | Pass |
| 9 | Holds expire automatically and release villas | Pass |
| 10 | Owner blocks occupy nights and clash with bookings; removing a block frees them | Pass |
| 11 | Availability counts come only from the ledger | Pass |
| 12 | With the calendar published, enquiries for full dates are refused; unpublished, they are accepted | Pass |
| 13 | Changing dates re-checks the ledger and rolls back on conflict | Pass |
| 14 | OTA boundary: no provider can connect; sync runs are recorded as skipped; platform imports are idempotent and handle cancellation; iCal export format | Pass |

## 2. End to end (`tests/e2e.mjs`, real browser, fresh server and database)

| Area | Check | Result |
|---|---|---|
| Pages | 11 public pages return 200, one `h1` each, correct titles; 404 page; old WordPress URLs redirect (301) | Pass |
| Content | Contacts appear Swetha, Ganesh, Dilip (last) with correct `tel:` numbers | Pass |
| Content | No Airbnb or MakeMyTrip mention anywhere public | Pass |
| SEO | JSON-LD `LodgingBusiness` with 5 rooms and no invented ratings | Pass |
| Security | CSP with `frame-ancestors 'none'`, `nosniff`, referrer policy, no `X-Powered-By` | Pass |
| Enquiry | Empty form shows a linked error summary and marks fields invalid | Pass |
| Enquiry | Guest sends an enquiry, gets a reference and a WhatsApp hand-off to Swetha | Pass |
| Privacy | Confirmation details are visible only to the browser that sent them | Pass |
| Spam | Honeypot and instant posts are dropped without being stored | Pass |
| Security | Cross-site form posts refused (403) | Pass |
| Availability | API says "not published" by default and returns no dates | Pass |
| Admin | Sign-in required; wrong password refused; first sign-in forces a password change; server refuses a short password | Pass |
| Admin | Overview lists the enquiry and the setup checklist | Pass |
| Booking | Owner confirms the enquiry into Villa 1 and emails the guest | Pass |
| Booking | Overlapping booking for Villa 1 refused; same dates in Villa 2 accepted; whole estate refused while any villa is taken | Pass |
| Calendar | Block added; overlapping block refused; grid shows confirmed nights; .ics export | Pass |
| Security | Admin POST without CSRF token refused (403) | Pass |
| Availability | Published calendar returns real counts only; whole estate shown as unavailable when any villa is taken | Pass |
| Availability | Published calendar: the form warns live and the server refuses an enquiry for full dates | Pass |
| Channels | Listing reference saved and shown as "Not connected"; sync history empty | Pass |
| Email | Without SMTP, 4 emails recorded as "not sent, email isn't set up" | Pass |
| Admin | Rate edited to "From ₹4,500 per villa per night" shows on the stay page, then reverted | Pass |
| Audit | Booking history records the enquiry and confirmation | Pass |
| Accessibility | axe-core WCAG 2.1 A/AA on 13 public and admin pages: no violations | Pass |
| Security | Enquiry endpoint rate-limited (429) | Pass |
| 3D estate | No photographs or films are published (manifest holds 28 renders; old photo, film and frame URLs return 404; no `<video>` on any page) | Pass |
| 3D estate | Footer says every picture is a 3D recreation and the layout is illustrative | Pass |
| 3D estate | Home hero starts the code-built estate in WebGL | Pass |
| 3D estate | Scrolling the walk moves the camera along the stones, opens the sliding door and ends inside the bedroom | Pass |
| 3D estate | Explorer flies between viewpoints; hotspots follow their 3D anchors | Pass |
| 3D estate | "Step inside" plays the entry and lands on the Garden Villa page | Pass |
| 3D estate | With reduced motion: no WebGL; rendered stills, with explorer hotspots placed from the render data | Pass |
| Console | No JavaScript errors and no missing files | Pass |

## 3. Visual and motion review

| Item | Result |
|---|---|
| Each render compared side by side with the owner's photograph of the same spot (18 pairs) | Same composition and contents: lawn, stones, umbrella tables, net, brush heap, villa patio and pool, bedroom, bathroom, courtyard cottages, night lighting. Differences: the arrangement of the grounds is illustrative, the forest is stylised, and close-up foliage is less detailed than a photograph |
| Hero: live 3D lawn with wind in the bamboo and a slow camera drift, fading in over the rendered still | Pass |
| Walk: camera from above the pond, over the lawn, along the stepping stones; the door slides open; settles at the bed | Pass |
| Room entry: 3D flight, then the stay page; stills fallback when 3D is unavailable or not ready within 2.5 s | Pass |
| Explore: 3D flights between 8 viewpoints, hotspots pinned to objects, door routing in and out of the bedroom | Pass |
| Walk-throughs on stay pages and in the gallery (pause, next, close, Escape) | Pass |
| Reduced motion or data saver: rendered stills, all text visible, no WebGL | Pass |
| Software-only WebGL (no graphics card): stills, no 3D | Pass |

## 4. Performance

- The 3D bundle (`public/js/world.js`, 680 KB, about 175 KB compressed) is fetched only after the page has loaded, or on intent (hovering a stay, the walk-through button), never with reduced motion or data saver.
- Building the estate takes about 1–2 s of main-thread work on a recent laptop and is split into steps that yield to the browser. Until then the rendered still is shown, so the largest paint is an ordinary image.
- Quality is chosen per device (shadow map size, texture resolution, plant density, grass blades, floor reflections). The hero renders at most 40 frames a second, only while it is on screen and the tab is visible, and stops by itself if frames take more than about 110 ms.
- Pictures are WebP renditions at 640/1024/1600 px (portrait 480/768/1200) with blurred placeholders, served with a 30-day immutable cache.

## 5. Defects found and fixed during QA

| Defect | Fix |
|---|---|
| Hero text pushed below the fold (CSS specificity made the photo container `position: relative`) | Removed the conflicting rule |
| Room-entry film: previous shot visible at the screen edge on desktop | Layers below are removed once the new shot has faded in; blurred backdrop now covers the frame |
| 500 error opening a booking after a status change (history formatter assumed a date range) | Formatter builds each description only for its own event type |
| Past dates in the availability calendar and today's header in the admin calendar failed contrast | Re-coloured to pass WCAG AA |
| Explorer counter unreadable over bright grass; edge hotspots cut off on phones | Stronger scrim and text shadow; scene links pinned inside the screen and anchored on their dot |
| No `/favicon.ico` (browsers request it) | Added |
| Home page downloaded all 96 film frames before any scroll | Frames load on first scroll; phones load half (since replaced by the 3D walk) |
| 3D: the lawn vanished on some GPUs (flat ground layers fighting in the depth buffer) | Ground layers are drawn first in a fixed order and simply cover each other |
| 3D: a bamboo leaf card passed through the camera in the hero view | Plants are kept clear of every camera position and path; foliage is kept out of buildings |
| 3D: the bedroom ceiling looked olive (it picked up the lawn's colour from the sky light) | Interior surfaces take little outdoor light; the ceiling gets a soft bounce |
| 3D: in headless Chrome (software WebGL) the live hero made the page unresponsive | Software renderers get the stills; a frame-time guard stops the hero on slow devices |

## 6. Known limitations and open items

- **Not tested on real devices** (iOS Safari, low-end Android). Headless Chrome only, with software WebGL. Test on an iPhone and an Android phone after deployment, especially the 3D hero, the walk and the explorer, and check that phones get the low quality tier.
- **The 3D layout is illustrative.** No site plan was supplied; see `docs/CONTENT-SOURCES.md`.
- **Email delivery** is untested until SMTP credentials are added.
- **Client confirmations** are listed in `docs/CONTENT-SOURCES.md`: check-in/out times, capacity, meals, rates, PIN code, map pin, licence number, WhatsApp availability, lawn area.
- The rate limiter is in memory (fine for one server process).
- Airbnb and MakeMyTrip are not connected (Phase 2 by design).
