# Kee Nest apartment-locating demo

TanStack Start, React, TypeScript, Tailwind v4, and Cloudflare Vite. Brand content is configured in `src/data/site.ts`. Worker/package name: `kee-nest-web`. Nothing has been deployed.

```sh
npm ci
npm run dev
npm run typecheck
npm test
npm run build
npm run preview
```

All three themes share the same typography, layout, spacing, and interactions. Only colors change. The default is Kee Nest Grey & White; Fresh Teal and Navy & Sun are always selectable. The registry is `src/features/theme/themes.ts`. A blocking head script prevents a wrong-theme paint. Theme state uses `useSyncExternalStore` and `keenest-theme` in localStorage.

The six-step questionnaire remains URL-driven, validates every step, and saves only non-contact preferences in tab sessionStorage (`keenest-demo-preferences`). Name, email, and phone stay in memory and are never persisted or logged. Contact and questionnaire submissions send nothing. `submitLead.ts` is the single future integration seam.

Media originals are retained locally in `design/media/` and ignored by Git; optimized web renditions live in `public/images/` and `public/videos/`. The user supplied the logo and video and cleared the original project images for this demo. No stock-site or reference-site media is used.

The root `logo.jpeg` supplies generated icons and the share image. Header/footer use a thin, wide-tracked, currentColor text wordmark. Regenerate icon assets with `node scripts/make-favicons.mjs` (pinned Sharp development dependency).

Locally hosted Poppins and Open Sans include their OFL notices. The restrained Motion integration is pinned and uses lazy `domAnimation`, `m` components, and the user's reduced-motion preference. No animation is applied to questionnaire fields. There are no live listings, matching, inquiries, bookings, analytics, or backend storage. Samples have placeholder prices and dimensions. Contact is `hello@example.com`, labelled demo.

See `design/media/INVENTORY.md` for source-to-slot mapping and unused media. Home has four content blocks: an inset centered photo/video hero, a soft feature card, an overlapping image-circle band, and a dark footer with non-linked social/legal placeholders. The floating sticky header has a keyboard-accessible drawer and the shared city picker; the demo announcement dismisses for the tab session. Demo cities are defined once in `src/data/cities.ts`; selection opens that city's landing page and saves the last choice under `keenest-city`. `/explore` holds the former example searches, process, sample listing carousels, principles, and closing CTA. `/listings` retains the filterable sample grid. Images have 224px, 640px, and full-size WebP sources plus JPEG fallbacks. Hero video is suppressed on small viewports, reduced motion, and Save-Data, with accessible pause/play elsewhere. The optional audio player is intentionally omitted.

Final browser, contrast, Lighthouse, and bundle results are in `QA.md`; comparison captures and a compact results file are in `qa/`. Deployment remains a separate user action.

## City landing pages

Each demo city has a page at `/{slug}-apartments` (route file `src/routes/{$city}-apartments.tsx`, which uses TanStack Router's suffix param syntax). Unknown slugs return a 404 with the city picker. Head tags (title, description, canonical, og) are per city. Canonical URLs are path-relative until `siteUrl` in `src/data/site.ts` is set to the production origin.

`src/data/cities.ts` is the single source of truth: slug, name, tagline, hero image/alt/position, neighborhoods and sample listings. **The eight cities, neighborhood names and sample listings are demo placeholders** for the client's real markets; replace them there. Page copy lives in `src/data/cityPage.ts`. Header, footer and announcement bar are shared by every page; the header pill shows the current city, or "Choose a city" elsewhere. `/neighborhoods`, `/moving-concierge` and `/sitemap` support the navigation. Privacy, Accessibility and the social icons are non-functional placeholders.
