import { z } from "zod";
export const listingSearchSchema = z.object({
  // TanStack Router decodes numeric search values before validation.
  beds: z.preprocess(
    (value) => (typeof value === "number" ? String(value) : value),
    z.enum(["any", "studio", "1", "2", "3"]).catch("any").default("any"),
  ),
  setting: z
    .enum(["any", "green", "connected", "quiet"])
    .catch("any")
    .default("any"),
});
export type ListingFilters = z.infer<typeof listingSearchSchema>;
export type SampleListing = {
  id: string;
  title: string;
  beds: string;
  baths: number;
  setting: Exclude<ListingFilters["setting"], "any">;
  price: string;
  images: readonly string[];
  features: readonly string[];
};
export const listingImages: Record<
  string,
  { alt: string; width: number; height: number }
> = {
  "keenest-living": {
    alt: "Sunlit living room with oak finishes and windows facing trees",
    width: 1200,
    height: 896,
  },
  "keenest-kitchen": {
    alt: "Open kitchen with a stone island, dining table, and terrace light",
    width: 1200,
    height: 896,
  },
  "keenest-bedroom": {
    alt: "Bedroom with linen bedding, sheer curtains, and a skyline view",
    width: 1200,
    height: 896,
  },
};
const spaces = [
  ["The Daylight", "1", 1, "green", "$1,800", ["Balcony", "Laundry"]],
  ["The Open Plan", "2", 2, "connected", "$2,400", ["Open kitchen", "Parking"]],
  [
    "The Quiet Corner",
    "studio",
    1,
    "quiet",
    "$1,500",
    ["Work nook", "Storage"],
  ],
  ["The Garden View", "2", 1, "green", "$2,200", ["Green outlook", "Balcony"]],
  ["The Everyday", "1", 1, "connected", "$1,900", ["Laundry", "Storage"]],
  ["The Retreat", "3", 2, "quiet", "$2,900", ["Extra room", "Parking"]],
  [
    "The Window Seat",
    "studio",
    1,
    "green",
    "$1,600",
    ["Natural light", "Work nook"],
  ],
  [
    "The Gathering Place",
    "3",
    2,
    "connected",
    "$3,100",
    ["Dining space", "Laundry"],
  ],
  ["The Soft Landing", "1", 1, "quiet", "$1,700", ["Storage", "Balcony"]],
] as const;
export const listings: SampleListing[] = spaces.map(
  ([title, beds, baths, setting, price, features], i) => ({
    id: `sample-${i + 1}`,
    title,
    beds,
    baths,
    setting,
    price,
    features,
    images: ["keenest-living", "keenest-kitchen", "keenest-bedroom"].map(
      (_, j, all) => all[(i + j) % all.length],
    ),
  }),
);
export function filterListings(filters: ListingFilters) {
  return listings.filter(
    (item) =>
      (filters.beds === "any" || item.beds === filters.beds) &&
      (filters.setting === "any" || item.setting === filters.setting),
  );
}
