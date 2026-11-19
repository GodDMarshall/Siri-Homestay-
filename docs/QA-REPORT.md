# QA report: Phase 1

**Date:** 19 November 2026  
**Build:** Phase 1, version 1.0.0  
**Environment:** Node.js 22, SQLite 3.54, Google Chrome 153 (headless), Linux  
**Result:** 18/18 tests (booking engine, temporary-storage mode, Vercel entry point) and 39/39 end-to-end checks pass, with no accessibility violations (axe-core, WCAG 2.1 A/AA) on 13 pages and no browser errors.

**Update (real photos):** the owner rejected the code-built 3D estate, so the site is back on the owners' own photographs. The 3D checks were replaced by checks for the photos, the scroll tour and the side-by-side room photos (section 2), and the review and performance notes below are for this version.

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
| Photos | All 20 pictures are the owners' photos (two bathroom stills from their video); no 3D code, renders or studio are served; `/explore` redirects to the tour; every `<img>` on the main pages is a photo | Pass |
| Tour | Scrolling the home page shows one photo at a time and moves through all 8 stops; the stop list jumps to a stop | Pass |
| Rooms | The Garden Villa's photos sit side by side and the row moves sideways as you scroll; a photo opens larger | Pass |
| Reduced motion | The tour is a plain list of photos; the room photos scroll sideways on their own | Pass |
| Gallery | All 20 photos, each opening larger (2400 px) | Pass |
| Console | No JavaScript errors and no missing files | Pass |

## 3. Visual and motion review

| Item | Result |
|---|---|
| Photo clean-up compared side by side with the originals (levels, colour, fill light for backlit rooms, sharpening) | Natural: brighter rooms, crisper bamboo, no redrawn or invented detail |
| Home hero: a villa among the golden bamboo (photo), with the title and two actions | Pass |
| Tour, desktop: full-screen photo per stop, cross-fade on scroll, caption and stop list | Pass |
| Tour, phone: the whole photo on its own blurred colours, caption below, no stop list | Pass |
| Room page: photos side by side in a row that moves sideways with the scroll, progress line, captions | Pass |
| Reduced motion: no cross-fades or moving rows; all photos and text visible | Pass |
| Bathroom still checked for reflections of people in the mirror: none | Pass |

## 4. Performance

- No 3D, no WebGL and no animation library. The tour and the room row are one small script (`tour.js`, under 5 KB) driven by the page scroll.
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

## 6. Known limitations and open items

- **Not tested on real devices** (iOS Safari, low-end Android). Headless Chrome only. Test the tour and the room photo row on an iPhone and an Android phone after deployment.
- **Photo quality is limited by the source:** WhatsApp copies at 1600 x 1200. The original camera files would be sharper; see `docs/CONTENT-SOURCES.md`.
- **Email delivery** is untested until SMTP credentials are added.
- **Client confirmations** are listed in `docs/CONTENT-SOURCES.md`: check-in/out times, capacity, meals, rates, PIN code, map pin, licence number, WhatsApp availability, lawn area.
- The rate limiter is in memory (fine for one server process).
- Airbnb and MakeMyTrip are not connected (Phase 2 by design).
