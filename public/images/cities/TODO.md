# City hero images to generate

No stock or downloaded images are used. Until these exist, each city falls back to the exterior/living crop with its own `heroPosition` (see `src/data/cities.ts`).

Create 8 original images, 4:5 portrait (for example 1200x1500), WebP, original skyline or building scenes with no logos, signs, real brand marks or recognisable people:

- `houston-hero.webp`
- `dallas-hero.webp`
- `austin-hero.webp`
- `san-antonio-hero.webp`
- `fort-worth-hero.webp`
- `el-paso-hero.webp`
- `plano-hero.webp`
- `arlington-hero.webp`

Then add the slugs to `generatedHeroes` in `src/data/cities.ts`. Provide descriptive alt text per city (the current `heroAlt` is generic).
