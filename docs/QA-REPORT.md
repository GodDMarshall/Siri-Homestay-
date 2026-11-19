# QA report: Phase 1

**Date:** 19 November 2026  
**Build:** Phase 1, version 1.0.0  
**Environment:** Node.js 22, SQLite 3.54, Google Chrome 153 (headless), Linux  
**Result:** 18/18 tests (booking engine, temporary-storage mode, Vercel entry point) and 40/40 end-to-end checks pass, with no accessibility violations (axe-core, WCAG 2.1 A/AA) on 13 pages and no browser errors.

**Update (real photos):** the owner rejected the code-built 3D estate, so the site is back on the owners' own photographs. The 3D checks were replaced by checks for the photos, the scroll tour and the side-by-side room photos (section 2), and the review and performance notes below are for this version.

**Update (3D motion):** the owner asked for a 3D motion-graphics site, still on the real photos. Each photo now has a depth map estimated from the photo itself, and the hero, the tour and the page headers move a camera through the photo in WebGL; the room photos sit on a 3D carousel turned by scrolling; headings rise in word by word. Checks for the depth maps, the WebGL layer and the carousel were added (section 2), and sections 3 to 6 describe this version.

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
| Pages | 10 public pages return 200, one `h1` each, correct titles; 404 page; old WordPress URLs redirect (301) | Pass |
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
| Photos | All 20 pictures are the owners' photos (two bathroom stills from their video); the earlier code-built 3D estate (models, renders, studio) is not served; `/explore` redirects to the tour; every `<img>` on the main pages is a photo | Pass |
| Tour | Scrolling the home page shows one photo at a time and moves through all 8 stops; the stop list jumps to a stop | Pass |
| 3D motion | 18 depth maps are served; the hero and the tour draw the photos with WebGL; the hero title rises in | Pass |
| Rooms | The Garden Villa's photos sit on a 3D carousel turned by scrolling; choosing a side photo brings it to the front, choosing the front photo opens it larger | Pass |
| Reduced motion | No WebGL layer and no carousel: the tour is a plain list of photos and the room photos scroll sideways on their own | Pass |
| Gallery | All 20 photos, each opening larger (2400 px) | Pass |
| Console | No JavaScript errors and no missing files | Pass |

## 3. Visual and motion review

| Item | Result |
|---|---|
| Photo clean-up compared side by side with the originals (levels, colour, fill light for backlit rooms, sharpening) | Natural: brighter rooms, crisper bamboo, no redrawn or invented detail |
| Home hero: a villa among the golden bamboo (photo), with the title and two actions | Pass |
| Home hero: the photo drifts in depth (bamboo in front moves against the villa behind) and follows the pointer | Pass |
| Tour, desktop: full-screen photo per stop; the camera moves into the photo as you scroll and the next photo dissolves in from the nearest objects back; caption and stop list | Pass |
| Tour, phone: full-screen photo cropped to fill, caption over a shade, no stop list | Pass |
| Recorded previews reviewed frame by frame (home tour, room carousel): the parallax reads as depth, with no torn or smeared edges at the motion range used | Pass |
| Room page: 3D carousel turned by the scroll, the front photo lit and captioned, progress line | Pass |
| Reduced motion: no WebGL, carousel, dissolves or word reveals; all photos and text visible | Pass |
| Bathroom still checked for reflections of people in the mirror: none | Pass |

## 4. Performance

- No 3D models and no animation library. All motion is one script (`motion.js`, 21 KB, 7 KB gzipped) with a small WebGL shader, driven by the page scroll. Depth maps are small greyscale WebP files (18 files, 169 KB in all).
- The WebGL layer draws only while it is on screen. A frame-time governor lowers the resolution when frames run slow and switches to the plain photos if they stay slow; software renderers (no graphics chip) draw at 45% size and only while the page scrolls. Device pixel ratio is capped at 1.75.
- Photos are WebP at 640/1024/1600 px (portrait 480/768/1200) plus a 1.5x enlargement for large screens, with blurred placeholders, served from the CDN with a 30-day immutable cache. The tour loads its first two photos straight away and each next photo one stop ahead.

## 5. Defects found and fixed during QA

| Defect | Fix |
|---|---|
| Hero text pushed below the fold (CSS specificity made the photo container `position: relative`) | Removed the conflicting rule |
| Room-entry film: previous shot visible at the screen edge on desktop | Layers below are removed once the new shot has faded in; blurred backdrop now covers the frame |
| 500 error opening a booking after a status change (history formatter assumed a date range) | Formatter builds each description only for its own event type |
| Past dates in the availability calendar and today's header in the admin calendar failed contrast | Re-coloured to pass WCAG AA |
| Explorer counter unreadable over bright grass; edge hotspots cut off on phones | Stronger scrim and text shadow; scene links pinned inside the screen and anchored on their dot |
| No `/favicon.ico` (browsers request it) | Added |
| Home page downloaded all 96 film frames before any scroll | Frames load on first scroll; phones load half (that version has since been replaced) |
| Tour stop names were hard to read over bright photos (the courtyard, the bedroom window) | A soft shade along the right edge on wide screens |
| Admin sign-in card squeezed into the 250 px sidebar column | `admin.css` gives the sign-in page a single column |
| First depth maps were soft at edges, so bamboo and door frames smeared when moved | Depth estimated in overlapping tiles, aligned to a whole-photo pass and edge-snapped to the photo with a guided filter |
| Carousel: photos of different shapes overlapped or left gaps | Spacing follows each photo's width |
| Carousel: two captions overlapped while turning | Only the front photo shows its caption |
| Word-by-word reveal started text invisible and failed the contrast scan | Reveals move text into place but never fade it |

## 6. Known limitations and open items

- **Not tested on real devices** (iOS Safari, low-end Android). Headless Chrome only, with WebGL in software. Test the 3D tour and the room carousel on an iPhone and an Android phone after deployment; WebGL speed varies most there, and the governor falls back to plain photos if a phone can't keep up.
- **Photo quality is limited by the source:** WhatsApp copies at 1600 x 1200. The original camera files would be sharper; see `docs/CONTENT-SOURCES.md`.
- **Email delivery** is untested until SMTP credentials are added.
- **Client confirmations** are listed in `docs/CONTENT-SOURCES.md`: check-in/out times, capacity, meals, rates, PIN code, map pin, licence number, WhatsApp availability, lawn area.
- The rate limiter is in memory (fine for one server process).
- Airbnb and MakeMyTrip are not connected (Phase 2 by design).
