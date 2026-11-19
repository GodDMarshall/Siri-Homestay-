# Content sources and items to confirm with the owner

Every fact on the website comes from one of four sources. Nothing was invented.

| Code | Source |
|---|---|
| **C** | Client brief from Dilip (WhatsApp, 12 and 17 Nov 2026) |
| **P** | Client photos (18) and videos (2), Nov 2026. Used as the reference for the 3D estate; not published |
| **W** | Existing sirihomestay.in (WordPress, last updated around 2020) |
| **L** | The property's current online travel listing (Expedia/Hotels.com group) |

## Facts used, by source

| Fact | Source | Where it appears |
|---|---|---|
| 4.28 acres, 5 villas, separate dining hall, kitchen, staff quarters | C | Home, Estate, structured data |
| Pond about 15,000 sq ft | C | Home, Estate, Whole estate page |
| 7.5 kW generator, 4 kW UPS | C | Home, Estate, Whole estate page |
| Licensed homestay | C | Home, Estate, footer |
| Joldal, Chikmagalur | C | Everywhere |
| Enquiry contacts and their order: Swetha Iyappa, Ganesh UT, Dilip last | C | Header menu, footer, Contact, stay pages, emails |
| King-size bed with one or two single beds, wardrobe, dressing table, sliding glass doors, patio, attached bathroom with shower, no-smoking sign | P | Garden Villa page |
| Blue-lined pool beside some villas, umbrella tables, volleyball net, floodlights, firewood, courtyard | P | Explore, Home, Gallery |
| Meals: South Indian or continental breakfast; Malnad lunch and dinner, veg and non-veg | W | Home, Estate |
| Activities: campfire, barbecue on request, volleyball, cricket, chess/carrom/ludo, plantation walks | W | Home, Estate |
| LCD TV with DTH in every room; generator backup | W | Garden Villa features |
| Nearby places and their descriptions; Bhadra "about 30 km from the homestay" | W | Home, Around Joldal |
| Facebook page facebook.com/sirihomestay | W | Footer |
| Check-in noon to 9:30 pm, check-out 11 am; sleeps 4 per room | L | Stay pages, Estate, admin defaults |
| Joldal about 10 km from Chikmagalur town | L and census village data | Home, Around Joldal |
| Bengaluru to Chikmagalur about 245 km via Hassan, 5–5.5 hours | Published road guide | Around Joldal |

## Please confirm with the owner (all editable in the admin)

1. **Check-in and check-out times** (taken from the online listing). Admin > Property and contacts.
2. **Sleeps up to 4 per villa**, and up to 20 for the whole estate. Admin > Stays and villas.
3. **Meals and activities** are from the old website (around 2020). Are they all still offered? Is food included in the tariff?
4. **The blue-lined pool** beside some villas: is it for guests to use (a plunge pool) or ornamental? The site currently calls it "a small blue-lined pool" and makes no claim about swimming.
5. **Rates.** The old site listed weekend prices (₹6,000 twin sharing, ₹2,500 per person for groups). These are years old and are **not** shown. The site says rates are quoted by the hosts until the owner sets "From ₹…" in Admin > Stays and villas.
6. **PIN code.** The old site says 577101; the online listing says 577130. Neither is shown until the owner confirms.
7. **Exact map pin.** The map currently searches Google for "Siri Homestay, Joldal". Add the coordinates in Admin > Property and contacts so directions go to the gate.
8. **Homestay licence number**, if the owner wants it shown in the footer.
9. **WhatsApp.** All three numbers are shown with WhatsApp links. Untick "WhatsApp" for any number that isn't on WhatsApp.
10. **Lawn area.** The brief says 1,000 sq ft, but the lawn in the photos (with a full volleyball court) looks larger. The figure is stored in the admin but **not shown** on the site until confirmed.
11. **Converted (alienated) land, 1.12 acres** is stored in the admin for the record and not shown to guests.
12. **Bhadra distance.** The old site gives two different figures (10 km from Chikmagalur and 30 km from the homestay). The site uses "about 30 km from the homestay".
13. **Old phone number +91 94830 29603** appears on the old site's booking section but not in the brief, so it isn't used.
14. **Old photographs** on sirihomestay.in (2014) show an earlier layout ("main bungalow and cottage") and were not reused.
15. **The 3D estate's site plan.** No plan of the grounds was supplied, so where the villas, lawn, courtyard, dining hall and pond sit relative to each other is illustrative. The buildings, rooms and furniture follow the photographs. If the owner can share a rough sketch of the grounds, `src/world/layout.js` is the one file to change, then re-render (`npm run render`).
16. **Details the photographs don't show** were kept neutral rather than invented: the inside of the cottages (their windows show only curtains), the kitchen and staff quarters (plain blocks), and the bathroom beyond what the walk-through video shows.

## Pictures

Every picture on the site is a 3D render of the estate generated in code (`src/world/`), framed to match the owner's photograph of the same spot. The photographs and videos themselves are not published. The footer says so on every page: “Every picture on this site is a 3D recreation of Siri Homestay, built in code from the owners’ photographs. The buildings, rooms and furniture follow those photographs; the arrangement of the grounds is illustrative.”

## Privacy

- No photographs or footage of the estate are published, so nothing from the source material (for example the person reflected in the bathroom mirror in the second video) can appear on the site.
- No people are modelled in the 3D estate.
