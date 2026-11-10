# Aria apartment-locating demo

TanStack Start, React, TypeScript, Tailwind v4, and Cloudflare Vite. `Aria` is a placeholder brand configured in `src/data/site.ts`.

```sh
npm ci
npm run dev
npm run typecheck
npm test
npm run build
npm run preview
```

No deployment has been run. Worker name: `aria-locator-web`. Deploy only when ready with `npm run deploy`.

## Editing

- `src/data/`: original neutral copy, fictional listing data, and URL filter schema.
- `src/styles/app.css`: semantic theme tokens, shared components, responsive layout.
- `src/features/theme/`: single three-theme registry, blocking head script, accessible selector using `useSyncExternalStore`. Clean Grey is the default; Fresh Teal and Navy & Sun are always available. Only `aria-theme` is saved in localStorage.
- `src/features/listings/`: shared listing card with manual, keyboard-accessible image carousel; no autoplay.
- `src/features/questionnaire/`: six URL-driven steps, validation, reducer/context, review, local submission. `submitLead.ts` remains the single future integration seam.
- `/listings`: nine fictional samples with layout and surroundings filters validated in router search parameters. Neighborhoods navigation opens the green-spaces filter; it does not invent real locations.

## Demo privacy

No submissions make network requests. Contact details stay in memory and are never persisted or logged. Only questionnaire preferences survive refresh in tab sessionStorage (`aria-demo-preferences`). Completing the demo clears the saved answers. All properties, prices, and features are placeholders; no live matching, inquiries, or bookings take place. Contact uses `hello@example.com`, explicitly labelled demo.

## Design and assets

Reference: Stitch Home screen `98fbf13471ad4e31bfdde3845c3f6f4f` and the **Aria Living** design-system frame in project `14975129665267422418`. Exports in `design/` are reference artifacts, not runtime content. The design-token reference band is deliberately excluded from the website.

The four new original project images are cleared for this demo by the user and served locally as WebP; provenance is in `public/images/ASSETS.md`. No third-party site copy, imagery, or branding is reused. Plus Jakarta Sans and Inter are locally hosted Google Fonts under the SIL Open Font License (see `public/fonts/`). Manrope remains an installed fallback. No runtime dependencies were added.

Header/footer use a currentColor text wordmark and small diamond mark. Favicons use an original A monogram; the share image uses the placeholder wordmark. Regenerate with `node scripts/make-favicons.mjs` (Python/Pillow and the macOS Arial Bold system font required).

The floating three-option theme pill becomes a button/popover at 640px and below. Arrow/Home/End keys move selection, Escape/outside click close the popover. The More navigation uses a keyboard-accessible disclosure; Escape returns focus to its trigger.
