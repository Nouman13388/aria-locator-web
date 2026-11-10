import { z } from "zod";
// Demo placeholders: replace with the client's real markets (see README).
const slugify = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const markets = [
  { slug: "houston", name: "Houston", tagline: "A sample market for wide-open layouts and easy weekends.", hero: "keenest-exterior", heroPos: [30, 50], areas: ["Cedar Row", "Harbor Park", "Lantern Hill", "Bayou Walk", "Magnolia Court", "Foundry Square", "Willet Gardens", "Sable Crossing"] },
  { slug: "dallas", name: "Dallas", tagline: "A sample market for skyline views and bright open plans.", hero: "keenest-living", heroPos: [60, 40], areas: ["Brickyard", "Aster Square", "Copper Lane", "Trinity Mews", "Oakline", "Signal Hill", "Parkgate", "Ember Court"] },
  { slug: "austin", name: "Austin", tagline: "A sample market for green outlooks and creative routines.", hero: "keenest-exterior", heroPos: [70, 50], areas: ["Willow Bend", "Mill Common", "Sparrow Hill", "Creekside Row", "Juniper Green", "Studio Lane", "Pecan Walk", "Hollis Park"] },
  { slug: "san-antonio", name: "San Antonio", tagline: "A sample market for courtyards, calm streets and room to host.", hero: "keenest-living", heroPos: [35, 55], areas: ["Plaza Grove", "Tilework Quarter", "Juniper Walk", "Mission Row", "Riverbend Court", "Alder Yard", "Lantern Square", "Cobble Hill"] },
  { slug: "fort-worth", name: "Fort Worth", tagline: "A sample market for quiet corners with space to spread out.", hero: "keenest-exterior", heroPos: [50, 50], areas: ["Stockyard Mews", "Heron Park", "Granite Row", "Prairie Gate", "Clearfork Court", "Weaver Lane", "Linden Yard", "Bridle Square"] },
  { slug: "el-paso", name: "El Paso", tagline: "A sample market for mountain light and unhurried evenings.", hero: "keenest-living", heroPos: [50, 30], areas: ["Sunset Terrace", "Adobe Court", "Ridgeline", "Mesa Row", "Canyon Walk", "Copperfield", "Sol Gardens", "Vista Lane"] },
  { slug: "plano", name: "Plano", tagline: "A sample market for tidy streets and practical routines.", hero: "keenest-exterior", heroPos: [20, 50], areas: ["Linden Gate", "Orchard Row", "Cobalt Commons", "Maple Terrace", "Station Green", "Quill Park", "Harvest Lane", "Beacon Court"] },
  { slug: "arlington", name: "Arlington", tagline: "A sample market for lively surroundings and flexible spaces.", hero: "keenest-living", heroPos: [80, 50], areas: ["Lakeside Mews", "Foundry Lane", "Briar Commons", "Garden Row", "Ballpark Green", "Kiln Court", "Sycamore Walk", "Echo Square"] },
] as const;
const traits = [
  "Tree-lined streets and a nearby green space.",
  "A short walk to everyday errands and cafés.",
  "Quiet evenings with easy access to main routes.",
  "Courtyard buildings with room to gather.",
  "Bright mid-rise homes with generous windows.",
  "A creative corner with studios and small shops.",
  "Calm blocks that suit a slower routine.",
  "Lively surroundings with plenty within reach.",
];
const baseGallery = ["keenest-exterior", "keenest-living", "keenest-kitchen", "keenest-bedroom"];
// Cities whose generated files exist in public/images/cities/{slug}-hero.webp (see TODO.md there).
const generatedHeroes: readonly string[] = [];
export const CITIES = markets.map((market, index) => ({
  slug: market.slug,
  name: market.name,
  tagline: market.tagline,
  heroAlt: market.hero === "keenest-exterior"
    ? "Daytime apartment building with broad balconies and leafy surroundings"
    : "Sunlit living room with oak finishes and windows facing trees",
  hero: market.hero,
  heroPosition: `${market.heroPos[0]}% ${market.heroPos[1]}%`,
  heroImage: generatedHeroes.includes(market.slug)
    ? `/images/cities/${market.slug}-hero.webp`
    : undefined,
  gallery: baseGallery.map((_, i) => baseGallery[(i + index) % baseGallery.length]),
  neighborhoods: market.areas.map((name, i) => ({
    slug: `${market.slug}-${slugify(name)}`,
    name,
    blurb: traits[(i + index) % traits.length],
  })),
}));
export type City = (typeof CITIES)[number];
export type CitySlug = (typeof markets)[number]["slug"];
export const citySchema = z.enum(markets.map((city) => city.slug));
export const findCity = (slug: unknown) =>
  CITIES.find((city) => city.slug === slug);
export const cityPickerCopy = {
  trigger: "Choose a city",
  panel: "Demo cities",
  note: "Choose a demo city. These fictional homes do not represent available properties or service locations.",
  selected: "Last selected city",
};
