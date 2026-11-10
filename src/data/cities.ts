import { z } from "zod";
// Demo placeholders: replace with the client's real markets (see README).
const markets = [
  {
    slug: "houston",
    name: "Houston",
    tagline: "A sample market for wide-open layouts and easy weekends.",
    heroAlt: "Daytime apartment building with broad balconies and leafy surroundings",
    hero: "keenest-exterior",
    heroPosition: "30% 50%",
    neighborhoods: ["Cedar Row", "Harbor Park", "Lantern Hill"],
  },
  {
    slug: "dallas",
    name: "Dallas",
    tagline: "A sample market for skyline views and bright open plans.",
    heroAlt: "Sunlit living room with oak finishes and windows facing trees",
    hero: "keenest-living",
    heroPosition: "60% 40%",
    neighborhoods: ["Brickyard", "Aster Square", "Copper Lane"],
  },
  {
    slug: "austin",
    name: "Austin",
    tagline: "A sample market for green outlooks and creative routines.",
    heroAlt: "Daytime apartment building with broad balconies and leafy surroundings",
    hero: "keenest-exterior",
    heroPosition: "70% 50%",
    neighborhoods: ["Willow Bend", "Mill Common", "Sparrow Hill"],
  },
  {
    slug: "san-antonio",
    name: "San Antonio",
    tagline: "A sample market for courtyards, calm streets and room to host.",
    heroAlt: "Sunlit living room with oak finishes and windows facing trees",
    hero: "keenest-living",
    heroPosition: "35% 55%",
    neighborhoods: ["Plaza Grove", "Tilework Quarter", "Juniper Walk"],
  },
  {
    slug: "fort-worth",
    name: "Fort Worth",
    tagline: "A sample market for quiet corners with space to spread out.",
    heroAlt: "Daytime apartment building with broad balconies and leafy surroundings",
    hero: "keenest-exterior",
    heroPosition: "50% 50%",
    neighborhoods: ["Stockyard Mews", "Heron Park", "Granite Row"],
  },
  {
    slug: "el-paso",
    name: "El Paso",
    tagline: "A sample market for mountain light and unhurried evenings.",
    heroAlt: "Sunlit living room with oak finishes and windows facing trees",
    hero: "keenest-living",
    heroPosition: "50% 30%",
    neighborhoods: ["Sunset Terrace", "Adobe Court", "Ridgeline"],
  },
  {
    slug: "plano",
    name: "Plano",
    tagline: "A sample market for tidy streets and practical routines.",
    heroAlt: "Daytime apartment building with broad balconies and leafy surroundings",
    hero: "keenest-exterior",
    heroPosition: "20% 50%",
    neighborhoods: ["Linden Gate", "Orchard Row", "Cobalt Commons"],
  },
  {
    slug: "arlington",
    name: "Arlington",
    tagline: "A sample market for lively surroundings and flexible spaces.",
    heroAlt: "Sunlit living room with oak finishes and windows facing trees",
    hero: "keenest-living",
    heroPosition: "80% 50%",
    neighborhoods: ["Lakeside Mews", "Foundry Lane", "Briar Commons"],
  },
] as const;
const sampleTemplates = [
  { title: "The Daylight", beds: "1", baths: 1, size: 720 },
  { title: "The Open Plan", beds: "2", baths: 2, size: 1080 },
  { title: "The Quiet Corner", beds: "studio", baths: 1, size: 560 },
] as const;
const galleries = [
  ["keenest-living", "keenest-kitchen", "keenest-bedroom"],
  ["keenest-kitchen", "keenest-bedroom", "keenest-living"],
  ["keenest-bedroom", "keenest-living", "keenest-kitchen"],
] as const;
export const CITIES = markets.map((market) => ({
  ...market,
  sampleListings: sampleTemplates.map((template, i) => ({
    ...template,
    id: `${market.slug}-${i + 1}`,
    neighborhood: market.neighborhoods[i],
    images: galleries[i],
  })),
}));
export type City = (typeof CITIES)[number];
export type CitySlug = City["slug"];
export const citySchema = z.enum(markets.map((city) => city.slug));
export const findCity = (slug: unknown) =>
  CITIES.find((city) => city.slug === slug);
export const cityPath = (slug: CitySlug) => `/${slug}-apartments`;
export const cityPickerCopy = {
  trigger: "Choose a city",
  panel: "Demo cities",
  note: "Choose a demo city. These fictional homes do not represent available properties or service locations.",
  selected: "Last selected city",
};
