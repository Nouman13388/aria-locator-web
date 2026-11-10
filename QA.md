# Aria Living redesign verification

Verified locally on 2026-11-10. No deployment was run. Aria is a placeholder brand.

## Automated checks

- `npm run typecheck`: passed.
- `npm test`: 29 tests passed, 0 failed. Covers step validation, reducer, strict preferences restore/PII stripping, step guard, contact schema, three-theme registry/fallback/head script, semantic contrast, listing filter defaults/numeric URL values, combined filtering, and image metadata.
- `npm run build`: client and Worker builds passed.
- `git diff --check`: passed.

## Real browser checks

Isolated Playwright/Chromium against `npm run preview`, with the build finished before starting the final preview:

- All seven routes (`/`, `/listings`, `/how-it-works`, `/about`, `/faq`, `/contact`, `/get-started`) load directly and on refresh in all three themes at 390, 768, and 1440px. No horizontal overflow. Shared 404 loads directly and on refresh.
- Theme switching is instant, persists across navigation/refresh, and has the correct selected radio after hydration. Animation-frame sampling on each route/theme/viewport found no wrong selected-pill first paint. The blocking head script initializes the stored palette. Retired/unknown theme ids fall back to Clean Grey.
- All three themes are always visible on desktop. At ≤640px, a button opens the compact popover. Selection, Escape, and outside click close it. Roving tab stop and Arrow/Home/End behavior work; options have 44px targets.
- Announcement dismisses. Sticky header, keyboard More disclosure (ArrowUp/Down, Home/End, Escape and focus return), mobile menu, and manual listing carousel controls work. No carousel autoplay.
- Listing URL filters combine correctly, survive refresh, support history navigation, and fall back safely for invalid values. Carousel wraps in either direction and works using Enter/Space; slide count is announced.
- `/get-started?step=4` with empty sessionStorage redirects to step 1. Next/Back/browser Back/Forward and Review Edit preserve answers. Deep links wait for preference restoration and return to the first invalid earlier step.
- Inline questionnaire validation focuses the erroneous field. Review refresh preserves preferences but clears name/email/phone. Completing the demo clears saved answers. Success cannot be reached via URL.
- Contact validation and local success work. Both contact and questionnaire submissions generated **zero requests across all HTTP methods** during the observed submit/success interval. Contact fields were absent from sessionStorage.
- No application console errors, runtime errors, or hydration warnings in the final stable-preview runs. The deliberate 404 resource error is expected.
- Home screenshots were captured and visually reviewed at 390, 768, and 1440px. Photo hero uses a lighter overlay; example-search cards are solid white. Tablet/mobile text areas use an 88% white overlay to retain contrast without a dark nighttime treatment.

## Contrast decisions

Palette values match the Aria Living frame's three theme architectures. Semantic text tokens meet 4.5:1 on canvas/cards/bands; focus rings meet 3:1. An automated test enforces these pairs.

| Theme      | Button text | Focus on white / band |
| ---------- | ----------- | --------------------- |
| Clean Grey | 6.70:1      | 6.70 / 6.09:1         |
| Fresh Teal | 4.68:1      | 6.17 / 5.64:1         |
| Navy & Sun | 14.98:1     | 10.75 / 10.00:1       |

Fresh Teal retains primary `#0E8F8A`; white text would be 3.95:1, so `--on-primary` is `#03161C`. Its focus token uses the frame's darker teal `#0A6D69`. Navy & Sun retains accent `#F5A524` for decorative tint/swatches; gold focus on white would be 2.04:1, so focus uses the frame's navy hover shade `#1A3E6D`. Accent-colored text is avoided. All closing CTA bands use white on navy (14.98:1).

## Content, brand, assets, and fixes

- All live copy is original and geographically neutral. No statistics, ratings, testimonials, guarantees, real addresses/phone numbers, license claims, or service pricing claims. Dollar amounts are explicitly labelled placeholder sample prices. “Step-free access” is an accessibility preference, not a pricing claim.
- Demo disclosures remain in the announcement, contact form, questionnaire/success, listing samples, and footer. Contact is `hello@example.com`, labelled demo.
- `siteName = "Aria"` drives branding. Original A-monogram favicons and a new wordmark share image replace the rejected brand assets. Storage uses `aria-theme` and `aria-demo-preferences`; prior brand references are removed from source, docs, package, and assets. Only the Worker **name** changed to `aria-locator-web`; no other Wrangler fields changed.
- Four original Stitch generated images were exported from the owned project and explicitly cleared for this demo by the user. They are local optimized WebP. Old imagery/logo removed. Local fonts include their OFL licenses. No runtime dependencies added.
- Design references: Home `98fbf13471ad4e31bfdde3845c3f6f4f`, Aria Living palette `175656f6066244f994ed8559a5db9510`. Reference exports are not served as site content; the design-token reference band is excluded.
- Fixed numeric bedroom filters after discovering TanStack's search decoding, a mobile navigation cascade issue during CSS consolidation, and ArrowUp entry into the closed More disclosure. Added a numeric-filter regression and semantic contrast coverage.

Physical devices, Safari/Firefox, assistive-technology sessions, and a deployed environment were not verified. The original questionnaire/contact logic remains client-side; this is not a live locating service.
