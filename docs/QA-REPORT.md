# QA report: Phase 1

**Date:** 19 November 2026  
**Build:** Phase 1, version 1.0.0  
**Environment:** Node.js 22, SQLite 3.54, Google Chrome 153 (headless), Linux  
**Result:** 14/14 booking-engine tests and 34/34 end-to-end checks pass, with no accessibility violations (axe-core, WCAG 2.1 A/AA) on 13 pages and no browser errors.

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
| Console | No JavaScript errors and no missing files | Pass |

## 3. Visual and motion review (screenshots at 1440×900 and 390×844)

| Item | Desktop | Mobile |
|---|---|---|
| Hero with WebGL depth parallax and slat reveal | Pass | Pass |
| Arrival: scroll-scrubbed footage, beats, bamboo progress line | Pass (framed with blurred backdrop) | Pass (full screen) |
| Room entry: exterior push-in → walk-in film through the doorway → bed → stay page settles | Pass (~10 s, skippable) | Pass (full-screen portrait film) |
| Explore: depth scenes, hotspots on real objects, fly-through, map strip, swipe | Pass | Pass |
| Day-to-night scroll | Pass | Pass |
| Reduced motion / data saver: static frames, all text visible, no films or WebGL | Pass | Pass |
| Admin: overview, booking, calendar, channels | Pass | Pass (collapsible menu) |

## 4. Performance (local, unthrottled; real-world times will be longer)

| Page | Initial transfer | Requests | LCP | CLS |
|---|---|---|---|---|
| Home, desktop | 884 KB | 13 | 152 ms | 0 |
| Home, mobile | 603 KB | 13 | 196 ms | 0 |
| Garden Villa, mobile | 361 KB | 10 | 152 ms | 0 |
| Explore, mobile | 639 KB | 16 | 132 ms | 0 |
| Enquire | 297 KB | 8 | 108–124 ms | 0 |

The arrival film frames (3.4 MB desktop, about 1.7 MB on phones, which load every second frame) download only after the visitor starts scrolling. Room-entry films (1.1–1.4 MB) preload when a stay card comes into view or is hovered. Media files are served with a 30-day immutable cache; CSS and JS carry content hashes.

## 5. Defects found and fixed during QA

| Defect | Fix |
|---|---|
| Hero text pushed below the fold (CSS specificity made the photo container `position: relative`) | Removed the conflicting rule |
| Room-entry film: previous shot visible at the screen edge on desktop | Layers below are removed once the new shot has faded in; blurred backdrop now covers the frame |
| 500 error opening a booking after a status change (history formatter assumed a date range) | Formatter builds each description only for its own event type |
| Past dates in the availability calendar and today's header in the admin calendar failed contrast | Re-coloured to pass WCAG AA |
| Explorer counter unreadable over bright grass; edge hotspots cut off on phones | Stronger scrim and text shadow; scene links pinned inside the screen and anchored on their dot |
| No `/favicon.ico` (browsers request it) | Added |
| Home page downloaded all 96 film frames before any scroll | Frames load on first scroll; phones load half |

## 6. Known limitations and open items

- **Not tested on real devices** (iOS Safari, low-end Android). Headless Chrome only. Test on an iPhone and an Android phone after deployment, especially the room-entry film and the explorer.
- **Email delivery** is untested until SMTP credentials are added.
- **Client confirmations** are listed in `docs/CONTENT-SOURCES.md`: check-in/out times, capacity, meals, rates, PIN code, map pin, licence number, WhatsApp availability, lawn area.
- The rate limiter is in memory (fine for one server process).
- Airbnb and MakeMyTrip are not connected (Phase 2 by design).
