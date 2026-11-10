# Kee Nest final verification

Verified locally on 2026-11-10. No deployment was run.

## Checks

- `npm run typecheck`: passed. `npm test`: 34 passed, 0 failed. `npm run build`: client and Worker builds passed. `git diff --check`: passed.
- The requested brand audit produces no output: `grep -rniE "aria|keynest" src public README.md QA.md package.json wrangler.jsonc | grep -vE "aria-"`.
- `siteName` is the runtime brand source. The wordmark is thin, wide-tracked, currentColor text with a small filled diamond between the two parts. The root client logo supplies the generated favicon, touch icons, and share image. The tab icon uses a strengthened source K for small-size legibility.
- Package and Worker name: `kee-nest-web`. Only the Worker name changed; its other configuration fields remain unchanged.

## Browser verification

Isolated Playwright/Chromium against `npm run preview`:

- All seven routes and the shared 404 load directly and on refresh. All three colors were checked at 390, 768, and 1440px. No horizontal overflow, app console errors, runtime errors, or hydration warnings.
- Home order: dismissible announcement, sticky header, photo/video hero with two overlapping example-search cards, three-step process, sample listings, principles, closing CTA, rich footer. No phone, city switcher, statistics band, or token-reference band.
- Exact element bounds, font family/size, and card radii match across all three colors at every requested viewport. Themes change colors only. Hero heights are 852px at 390 and 772px at 768/1440. First-paint frame sampling found no wrong-theme or selected-pill flash. Refresh/navigation preserve the selected theme.
- The mobile selector is contained within the viewport, has three 44px options, roving tabindex, Arrow/Home/End selection, and Escape/outside-click dismissal. More supports keyboard entry, Arrow/Home/End, Escape and focus return. Mobile navigation works with Enter/Escape.
- Announcement dismissal persists in tab sessionStorage and is applied by the blocking head script before paint. The header compacts to 64px after scrolling while its outer slot preserves document flow.
- Carousel prev/next, arrow keys, and real touch swipes work; slide count is announced. No carousel autoplay. Listing hover lift and one-time section/card reveals respect reduced motion. Menus use 180ms motion; color feedback uses 200ms and does not run on first paint. Questionnaire fields have no animation.
- Video autoplays muted on eligible desktop/tablet viewports. Keyboard Space/Enter pause and resume it. Fresh mobile, reduced-motion, and Save-Data contexts issue **zero video-file requests** and show the poster. Both missing video sources fall back to the poster. Neither public video has an audio track.
- Responsive image sources, descriptive alt text, dimensions, and below-fold lazy loading are present. Footer social and legal placeholders are not links.
- Empty storage plus `/get-started?step=4` redirects to step 1. Next/Back/browser history/Review Edit retain answers. Refresh preserves preferences but clears name/email/phone. Completing the demo clears answers; success is not reachable by URL.
- The entire six-step questionnaire completed using only Tab, arrows, native date entry, typing, Space, and Enter, with visible focus. Contact and questionnaire submits generated **zero requests across all HTTP methods**. Contact fields were never persisted.

Screenshots: [1440px color comparison](qa/home-1440.jpg), [390px color comparison](qa/home-390.jpg). Machine-readable results: [verification.json](qa/verification.json).

## Contrast

An automated test checks semantic text/focus pairs in every palette. The final rendered hero was also captured with its copy hidden, preserving layout, and the lightest backdrop pixel throughout the copy box was compared with white text. The overlay is above the poster/video; correcting that layer order resolved a visual-review finding.

| Palette               | Lowest measured hero contrast across 390/768/1440 |
| --------------------- | ------------------------------------------------- |
| Kee Nest Grey & White | 5.74:1                                            |
| Fresh Teal            | 12.75:1                                           |
| Navy & Sun            | 11.25:1                                           |

The grey overlay mixes the supplied logo grey with the ink token to keep white copy readable over bright video frames. Fresh Teal uses dark button text instead of white to meet AA at its exact primary shade. Navy & Sun uses a dark focus token on white surfaces; amber remains an accent. Narrow layouts use a uniform overlay behind the entire copy area.

## Lighthouse and bundle

Lighthouse 13.0.3, the same local Chromium executable, simulated mobile/desktop settings, cold network caches, one serial final run per palette/profile. These are lab measurements, not field data; small score changes between runs are expected.

| Palette               | Mobile performance | Desktop performance | Mobile / desktop LCP | Largest CLS |
| --------------------- | ------------------ | ------------------- | -------------------- | ----------- |
| Kee Nest Grey & White | 79                 | 99                  | 5.00s / 1.03s        | 0.000005    |
| Fresh Teal            | 83                 | 99                  | 4.67s / 1.03s        | 0.000005    |
| Navy & Sun            | 79                 | 98                  | 4.97s / 1.07s        | 0.000005    |

Total blocking time was 0ms in these runs. CLS is below the requested 0.02. The poster is the recorded LCP element. The starting pre-motion default measured 79 mobile / 98 desktop; mobile LCP remains an area for further optimization on a production version.

Across this Home work, aggregate client JavaScript changed from 480,569 raw / 154,749 gzip bytes to 577,329 raw / 190,738 gzip bytes: **+96,760 raw / +35,989 gzip bytes** (about 35.1 KiB gzip). This includes Motion and the added Home behavior, measured consistently across all client JS chunks. The deferred `domAnimation` chunk is about 18.3 KiB gzip. Only `m` and `domAnimation` are used inside strict LazyMotion; the optional feature download starts after the first paint.

## Media and deliberate limits

- Original source inventory and slot map: [design/media/INVENTORY.md](design/media/INVENTORY.md). The user confirmed using the existing cleared project images and supplied video. Original binaries are retained locally and ignored; optimized public files are tracked. Every source image is used. The master's audio track is unused. No stock or reference-site assets/code are copied.
- MP4 is about 2.3 MB, WebM about 2.2 MB. Both are silent, 24fps, and below 3 MB. H.264 uses CRF 28/veryfast/faststart at 1920px; VP9 uses CRF 36/zero target bitrate at the source 1280px width to avoid an unnecessary upscale. JPEG and responsive WebP posters derive from frame zero.
- The optional audio player is omitted. No sound autoplays.
- Original neutral copy and explicit sample/demo labels replace real property, service-price, quality, rating, review, license, and guarantee claims. Prices and dimensions are placeholders; neighborhood labels are explicitly samples. Contact is `hello@example.com`, labelled demo.
- Neighborhoods opens the sample surroundings filter. Social/legal items are clearly non-linked placeholders. There are no invented real city pages, live matching, bookings, or submissions.
- The layout follows the requested section and interaction pattern with original implementation, copy, icons, and media; distinctive reference details are not reproduced. Themes use the same composition and typography throughout.

Physical devices, Safari/Firefox, assistive-technology sessions, and a deployed environment were not tested.
