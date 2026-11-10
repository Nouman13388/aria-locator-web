import { z } from "zod";
export const CITIES = [
  {
    slug: "houston",
    name: "Houston",
    blurb:
      "Try a Houston demo brief, starting with the everyday details you want in a home.",
  },
  {
    slug: "dallas",
    name: "Dallas",
    blurb:
      "Explore a Dallas demo brief with room for your routines and preferences.",
  },
  {
    slug: "austin",
    name: "Austin",
    blurb:
      "Begin an Austin demo brief and imagine the layout that fits your day.",
  },
  {
    slug: "san-antonio",
    name: "San Antonio",
    blurb:
      "Shape a San Antonio demo brief around the spaces that matter to you.",
  },
] as const;
export type CitySlug = (typeof CITIES)[number]["slug"];
export const citySchema = z.enum(CITIES.map((city) => city.slug));
export const exploreSearchSchema = z.object({ city: citySchema.optional() });
export const cityPickerCopy = {
  trigger: "Choose a city",
  panel: "Demo cities",
  note: "Choose a demo city. These fictional homes do not represent available properties or service locations.",
  selected: "Last selected city",
  heading: (name: string) => `Sample homes in ${name}`,
  sampleNote:
    "Fictional homes grouped by demo city. Images, prices, and dimensions are illustrative.",
  emptyTitle: "No sample homes in this city yet.",
  emptyText: "Choose another demo city or build your own wish list.",
};
