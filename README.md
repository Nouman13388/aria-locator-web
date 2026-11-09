# Kee Nest apartment-locating demo

TanStack Start, React, TypeScript, Tailwind v4, and the Cloudflare Vite plugin.

```sh
npm ci
npm run dev
npm run typecheck
npm test
npm run build
npm run preview
```

To deploy when ready:

```sh
npm run deploy
```

Worker name: `kee-nest-web`. No deployment has been run.

## Editing the demo

- `src/data/`: neutral service, FAQ, contact, and page content.
- `src/styles/app.css`: the two semantic palettes and responsive styling. Tailwind scans source only, excluding reference exports.
- `src/features/theme/`: accessible theme control and blocking head script. Default is Client Preference. Only the theme is saved in localStorage.
- `src/features/questionnaire/`: steps, schemas, pure validation, reducer/context, review, and submission adapter.
- `src/features/questionnaire/submitLead.ts`: the one function to replace for future API integration. It currently resolves locally without network calls.
- `public/images/`: locally saved Stitch interior images. These are inspiration, not available listings.
- `design/`: original HTML recovered from the connected Stitch project. Reference copy is not used as live service claims.

The root `logo.jpeg` supplies the favicon and Open Graph assets. Header and footer render a thin, currentColor Kee Nest wordmark. Run `node scripts/make-favicons.mjs` to regenerate icons with Python/Pillow.

## Demo data boundaries

Contact and questionnaire forms send nothing. The questionnaire saves only non-contact preferences in sessionStorage for this tab. Name, email, and phone stay in React memory and are never included in saved preferences. Refresh or leaving the questionnaire clears contact fields; completing the demo clears all answers and saved preferences. Contact form values remain only in memory and are cleared on success.

There are no live listings, matching, messaging, analytics, bookings, or backend storage. Contact information is explicitly placeholder data. A real integration would need its own consent, privacy, security, and operational review.

## Assets

Images were exported from the user's connected Stitch project `14975129665267422418`, with the corresponding HTML references in `design/`. Fonts are bundled locally from Fontsource (Manrope and EB Garamond, SIL Open Font License), avoiding external font requests.

All six themes are always selectable. On phones, the theme button opens a compact 2×3 popover that closes on selection, Escape, or an outside click. The display name and wordmark parts are configured in `src/data/site.ts`.
