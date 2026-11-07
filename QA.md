# Demo verification

Verified locally on 2026-11-08. No deployment was run.

- `npm run build`: passed, client and Cloudflare Worker SSR bundles generated.
- `npm run typecheck`: passed.
- `npm test`: 5 tests passed, covering required fields, complete briefs, reversed budgets, invalid dates/email/phone, contact exclusion from stored preferences, local submission, and state cleanup.
- `git diff --check`: passed.
- `npm run preview`: tested with the local Worker runtime.
- All six routes: HTTP 200 on direct and repeated requests, with their own titles. Unknown route: HTTP 404 with shared layout.
- Chrome: questionnaire completed through all six steps; missing location, reversed budget, and invalid contact fields blocked with inline errors. Step changes moved focus. Review Edit links retained answers.
- Browser sessionStorage: sample contact details absent while contact inputs were populated. Saved preferences removed after success.
- Contact: empty form blocked; valid name/email/message with optional phone omitted reached demo success and cleared values.
- FAQ: native disclosure expanded and revealed the answer.
- Both themes: instant switching, arrow-key radio navigation, navigation and refresh persistence verified. Blocking inline head script selects the stored theme before body paint.
- All six pages: rendered at 390px and 768px in both themes; document scroll width matched viewport width. Questionnaire review and success also checked at 390px.
- Final Chrome console: no application runtime errors or hydration warnings observed.
- Source check: all 13 semantic tokens mapped into Tailwind; no hardcoded component color values or outbound form API calls.

## Boundaries

This is a local demonstration, not a production service. There are no live listings, real matching, emails, inquiries, or backend data storage. Mobile checks used Chrome emulation, not physical devices. Browser checks were interactive and console-assisted, not a committed end-to-end automation suite.

The supplied `logo.jpeg` says KEE·NEST. The source image is preserved unchanged; the site uses the requested ARIA wordmark and ARIA favicon.

## Refactor verification

Verified with an isolated Playwright/Chromium session against `npm run preview` on 2026-11-08. The browser check script remained temporary; no browser dependency was added to this project.

- Each of Tasks 1–7 passed `npm run typecheck && npm test && npm run build`. The final suite contains 21 passing node:test tests, discovered across `src/**/*.test.ts`.
- Empty-storage `/get-started?step=4` replaced the URL with `?step=1`. Valid restored answers allowed a step-4 refresh; a step-5 deep link with an unfinished budget returned to step 4.
- Next/Back, review Edit, and browser Back/Forward updated URL steps and retained in-memory answers. Budget validation focused its invalid field.
- Refresh on review preserved non-contact preferences and cleared name/email/phone. Saved preferences never contained contact keys. Demo completion removed saved preferences, and a step-6 URL could not open success.
- Both themes persisted across navigation and refresh, with keyboard radio behavior intact. Frame sampling during recommended-theme hydration found no incorrect selected-pill paint; the hydrated recommended radio was checked.
- All six routes loaded directly and on refresh. The extracted Contact form retained validation, error focus, and local success. Shared 404 UI rendered correctly.
- All six pages fit at 390px in both themes, including the expanded mobile theme selector. No application runtime errors or hydration errors were observed; the intentional 404 produced only its expected resource error.
- No form POST requests, server functions, new runtime dependencies, deployment, or Wrangler configuration changes. Existing image formats were retained to keep assets identical.

## Final pre-deploy verification

Verified locally on 2026-11-08 using isolated Playwright/Chromium against the production preview. No deployment or Wrangler configuration change was made.

- Task 1: `siteName` and `wordmarkParts` now drive runtime branding, page-title suffixes, root metadata, footer, accessible brand labels, and the favicon template. The only literal brand name under `src/` is its declaration in `src/data/site.ts`; remaining case-insensitive matches are accessibility attributes, intentionally unchanged storage/event prefixes, or ordinary substrings such as “variable.” Original design exports and historical documentation remain reference material.
- Task 2: the registry supplies all theme ids, labels, swatches, validation, selector options, default id, and the blocking script. `?themes=all` enables and saves the four extras; `?themes=off` clears the flag. Disabled extras and unknown saved ids fall back to the core default. Both original core token blocks were compared with the previous source and are unchanged.
- Typecheck, tests, and build passed after each task and the separate contrast fix. Final node:test output: **25 tests, 25 pass, 0 fail**. Vite completed both client and Worker SSR builds. `git diff --check` passed.
- The six themes were checked on all six routes plus the 404, directly and after refresh. Theme changes applied instantly and persisted through navigation/refresh. Frame sampling found no incorrect selected-pill paint; hydrated radio selections matched the stored theme. With the flag off only the original two options were visible. Arrow keys, wraparound, Home/End, and the single roving tab stop worked across all six options.
- All six routes fit at **390px and 768px in all six themes**, including the expanded selector. Theme radio targets measured at least 44px. A keyboard-only run completed all six questionnaire steps with visible focus and reached the demo success screen.
- Questionnaire regression checks passed: empty-storage step-4 link replaced the URL with step 1; valid restored preferences were checked before guarding; Back/Forward and review Edit changed steps without dropping in-memory answers. Refresh retained preferences and cleared every contact field. Contact keys were absent from saved preferences. Completion cleared saved preferences, and success was not reachable by URL.
- Request listeners measured **zero requests of any method during each questionnaire and Contact submit**. Both success notices and the footer demo disclosure were present. Rendered and source-copy audits found no pricing/free-service, guarantee, statistics, testimonial, rating, or licensing claims. “Step-free access” remains an accessibility preference, not a pricing claim; questionnaire counts and entered budgets are form UI rather than service statistics/prices.
- No application console errors, JavaScript exceptions, or hydration warnings were observed. The intentional 404 returned HTTP 404 and only its expected browser resource-status message. Other routes returned HTTP 200 directly and on refresh.
- Indigo was visually reviewed with its dark canvas/cards, gold primary buttons, light hero copy, readable errors/success, input borders/placeholders, image captions, theme controls, and native dark date/radio/checkbox controls. Physical-device and cross-browser testing were not performed.

### Contrast adjustments and bug fix

WCAG contrast calculations use sRGB relative luminance. Small text meets 4.5:1; large step numbers and focus indicators meet 3:1.

- Sage accent changed from the requested `#A38B5C` to **`#958052`**: large accent text on its worst supporting surface is **3.19:1**, and the existing mixed eyebrow treatment reaches **4.86:1**. Sage button/hero text is **6.95:1**.
- Indigo retains its requested palette and adds semantic error **`#FFB4AB`** and success **`#93D9A6`**, measuring **9.82:1** and **10.09:1** against cards. Hero copy uses ink **`#EEF0F8`**, giving **14.93:1** on the hero. Primary button text is **8.85:1**. Focus uses the primary gold, at least **7.36:1** against ordinary surfaces; CTA/hero focus rings adapt to their backgrounds using existing tokens.
- Clay and Blue requested shades were retained. Their button/hero text measures **7.16:1** and **8.57:1** respectively; their worst mixed eyebrow contrast is **4.80:1** and **6.13:1**.
- **Bug found/fixed in a separate commit:** existing Recommended accent labels and large step numbers on sand bands were below AA (**4.10:1** and **2.73:1**). The token palette is unchanged. Only those band text roles mix more ink into the existing accent: 60% accent for labels and 90% for large numbers. Chromium measurements now give **4.56:1** and **3.09:1**. This is the only verification code fix.
