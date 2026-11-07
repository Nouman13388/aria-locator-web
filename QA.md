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
