# Kee Nest Home layout verification

Verified locally on 2026-11-10 against `npm run preview`, using isolated Playwright/Chromium. Nothing was deployed. Wrangler configuration was not changed in this revision.

## Layout comparison at 894px

The supplied comparison table guided the overall composition. The subsequently attached header/hero screenshots guided the city-picker refinement below; the complete reference page is not available for an exact full-page comparison.

| Element           | Implemented and measured                                                                                                                                          |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Announcement      | Soft palette strip, demo link, 44px dismiss target. Visible with fresh session storage; dismissal survives refresh in the same tab.                               |
| Header            | Floating inset card, 24px corners, hamburger + wordmark left, one city picker right. No desktop nav row. 100px card inside a 155px sticky slot including margins. |
| Hero              | Inset rounded photo/video card, 740px high, centered copy, 63px Poppins H1, city-picker CTA. No badge or example-search cards.                                    |
| Feature           | Rounded soft-accent card, 540px high, large heading left, concise copy and dark pill right.                                                                       |
| Image-circle band | Overlapping owned project images, centered heading and CTA in a 500px soft band.                                                                                  |
| Footer            | Dark rounded block, demo contact/legal placeholders left and non-linked social placeholders right.                                                                |
| Page length       | 2,527px with notice visible: +27px / +1.08% from the approximate 2,500px reference target.                                                                        |
| Type and corners  | Self-hosted Poppins + Open Sans. Main block/card corners are 24px; buttons remain pills.                                                                          |

Home now has four content blocks including the footer. The example searches, process, sample listings, principles, and closing CTA moved to `/explore`, available from the drawer, announcement link, and footer.

Screenshots: [894px](qa/home-894.jpg), [390px](qa/home-390.jpg), [1440px](qa/home-1440.jpg). These show the default palette; all three palettes were measured separately. Raw bounds and other results are in [verification.json](qa/verification.json).

## Deliberate deviations

- Existing client palettes remain grey/white, teal, and navy/amber. Reference blue/periwinkle colors are not copied. All three palettes retain identical layout and type.
- Copy, wordmark, iconography, project images, and client-supplied video are our own. No reference-site copy, branding, images, code, legal details, addresses, phone numbers, or brokerage notices were used.
- “Choose a city” uses the four demo entries in `src/data/cities.ts`. The city groups do not represent available properties or service locations.
- The overlapping circles show cleared interior/exterior images. They do not imply people, a team, clients, reviews, or endorsements.
- Footer email is `hello@example.com`, labelled demo. Social and legal items are explicit non-linked placeholders.
- Hero overlay stays lighter than the prior composition while retaining AA white-text contrast. No price/service-cost, quality, statistics, rating, license, or guarantee claims were added. No token-reference band is shown.

## Browser and interaction results

- All eight routes (`/`, `/explore`, `/listings`, `/how-it-works`, `/about`, `/faq`, `/contact`, `/get-started`) load directly and on refresh at 390/768/1440px in all three palettes. Shared 404 also loads directly and on refresh.
- Zero horizontal overflow. Home also checked at 894px in all palettes. Height is 2,527px at 768/894/1440 and 2,502px at 390. Card geometry remains identical across themes.
- First-render frame sampling found the persisted theme and correct selected radio, with no wrong-theme paint. Color switching produces zero added layout shift after fonts are ready. Theme persists across route navigation and refresh.
- Drawer opens with keyboard Enter, contains focus including first/last Tab boundaries, closes with Escape, returns focus to the trigger, and closes on navigation. An explicit boundary trap was added after a keyboard check exposed a native-dialog boundary gap.
- Header city picker supports Enter, arrows, Home/End, Tab, Escape/focus return, outside click, and city-filtered Explore links. Hero and drawer reuse the same component.
- Announcement is visible on a fresh session; dismissal remains hidden on refresh. The header compacts while its outer slot preserves document flow.
- Desktop video loads muted; Space/Enter pause and resume. Fresh mobile, reduced-motion, and Save-Data contexts make zero video-file requests and use the poster. Public videos remain silent and below 3 MB. Media sources and fallback logic are unchanged.
- Sample carousel buttons and arrow keys still work on Listings and Explore. No carousel autoplay. Section reveals and menu motion respect reduced motion. Questionnaire fields have no animation.
- `/get-started?step=4` with empty storage redirects to step 1. Next/Back, browser Back/Forward, and Review Edit preserve answers. Refresh keeps preferences and clears name/email/phone. Contact details never enter browser storage. Demo completion clears preferences; the success state cannot be reached via URL.
- The complete questionnaire passes a keyboard-only run with visible focus. Contact and questionnaire submissions cause zero requests across all HTTP methods.
- Zero application console errors, runtime errors, or hydration warnings. The intentional 404 response may emit the browser's expected missing-resource message.

## Contrast and performance

Semantic text, button, error, success, and focus pairs pass the existing automated contrast tests in every palette. Rendered poster contrast was sampled with the copy hidden while preserving its layout, including the lightest background pixel in the whole copy box at 390/768/894/1440.

| Palette               | Lowest measured white hero text contrast |
| --------------------- | ---------------------------------------- |
| Kee Nest Grey & White | 5.16:1                                   |
| Fresh Teal            | 11.13:1                                  |
| Navy & Sun            | 9.91:1                                   |

The centered hero uses a uniform token-derived overlay. The circles use 224px responsive renditions instead of downloading larger listing images. Poppins and Open Sans replace the old font files and retain their OFL notices; the display and body faces are preloaded locally.

Before the city-picker addendum, Lighthouse 13.0.3 was rerun for the revised default palette with the same local Chromium, cold network cache, and previous mobile/desktop profiles. One serial lab run per profile:

| Profile | Performance | LCP   | TBT | CLS      |
| ------- | ----------- | ----- | --- | -------- |
| Mobile  | 80          | 4.82s | 0ms | 0        |
| Desktop | 99          | 1.00s | 0ms | 0.000035 |

The prior default layout scored 79 mobile / 99 desktop; the earlier pre-motion baseline was 79 / 98. Other palette Lighthouse scores were not rerun after this layout change. Mobile LCP still has room for production optimization. These are lab results, not field measurements.

Before the city-picker addendum, aggregate client JS was 580,492 raw / 192,139 gzip bytes, +3,163 raw / +1,401 gzip bytes from the preceding build. No dependency was added. Motion remains lazy `domAnimation` with `m` components and user reduced-motion support.

## Commands and limits

`npm run typecheck && npm test && npm run build` passes for each logical chunk: 37 tests passed, 0 failed; client and Worker builds succeeded. `git diff --check` passes. A word-boundary brand audit finds no obsolete brand names (accessibility attributes are excluded). No network submission integration, deployment, or Wrangler change was made.

Source inventory: [design/media/INVENTORY.md](design/media/INVENTORY.md). Only the user-cleared project images and supplied silent video are used. Decorative circles are hidden from assistive technology.

Not verified: exact pixel comparison without the reference screenshot, physical devices, Safari/Firefox, assistive-technology sessions, and a deployed environment. Social/legal items remain demo placeholders.

## City-picker addendum verification

- Shared `CityPicker` has header/hero sizes, a rotating chevron, semantic menu links, scroll-limited 16px panel corners, and fade/scale-only motion. At 390px it becomes a viewport-contained bottom sheet; inside the drawer it remains inline. The hero does not clip its panel.
- Playwright checked header and hero at 390/768/1440px in all three palettes: no horizontal overflow, four links with at least 44px height, arrow/Home/End and Tab navigation, Escape/focus return, and outside-click dismissal. Mobile drawer selection closes the drawer; Escape closes its picker before closing the drawer.
- Every registry city loads directly and on refresh at `/explore?city=<slug>`, with the expected heading and only its fictional sample homes. Current groups contain 3/2/2/2 homes. Sample labels and placeholder-price disclosures remain. An empty-state branch is provided; all currently configured cities have samples.
- `keenest-city` restores the last selected item across refresh and synchronizes picker instances. Storage failure is caught; navigation still succeeds with blocked localStorage. No personal information is stored.
- The reported hydration warning was reproduced in React's development build. `Function.toString()` generated different inline script text between server and client. The script now uses stable literal text with ids derived from the registry. Development reloads in all three stored themes show zero hydration warnings or app errors. Existing blocking-script fallback and notice tests still pass.
- Normal-motion and reduced-motion menus both pass interaction checks. No runtime dependency, deployment, or Wrangler change was introduced.
- Typecheck, 37 node tests, and build pass after each implementation/fix chunk. Tests cover unique city slugs, accepted/rejected city search input, and city filtering. Lighthouse was not rerun for this addendum; scores above describe the preceding layout revision.

Evidence: [390px city sheet](qa/city-picker-390.jpg), [picker matrix](qa/city-picker-verification.json). Home captures above were refreshed with the city picker. Physical devices, Safari/Firefox, and screen-reader sessions were not tested.

## Dropdown reference refinement

The attached open-menu screenshots show a plain two-column city list. The picker now uses city names only, with no visible blurb, notice, selected tick, or selected background. Demo guidance and saved-selection information remain available to assistive technology; city blurbs remain on Explore.

At 1440px the panel is 340px wide and 122px tall for our four demo entries. It opens directly below the button without a gap. The header panel's right edge matches the trigger's right edge; the hero panel's left edge matches the trigger's left edge. Buttons use the pill token with a solid theme fill. Header and hero retain Kee Nest copy, media, and the client's three palettes.

Playwright verified both exact edge alignments, two columns, keyboard/Tab/Escape and outside dismissal, city routing/restoration, and 390/768/1440px containment across all palettes. Mobile keeps the compact two-column bottom sheet and inline drawer menu. Typecheck, 37 tests, and build pass. No deploy or Wrangler changes.

Captures: [header at 1440px](qa/city-picker-header-1440.jpg), [hero at 1440px](qa/city-picker-hero-1440.jpg), [390px sheet](qa/city-picker-390.jpg). Only the four requested demo cities are included; reference copy, imagery, brand, city inventory, and blue palette were not imported.
