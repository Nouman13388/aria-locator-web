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

Locally hosted Inter and Plus Jakarta Sans include their OFL notices. The restrained Motion integration is pinned and uses lazy `domAnimation`, `m` components, and the user's reduced-motion preference. No animation is applied to questionnaire fields. There are no live listings, matching, inquiries, bookings, analytics, or backend storage. Samples have placeholder prices and dimensions. Contact is `hello@example.com`, labelled demo.
