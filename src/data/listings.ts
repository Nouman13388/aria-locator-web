import { CITIES, type City } from "./cities";
export const listingImages: Record<string, { alt: string; width: number; height: number }> = {
  "keenest-exterior": { alt: "Daytime apartment building with broad balconies and leafy surroundings", width: 1376, height: 768 },
  "keenest-living": { alt: "Sunlit living room with oak finishes and windows facing trees", width: 1200, height: 896 },
  "keenest-kitchen": { alt: "Open kitchen with a stone island, dining table, and terrace light", width: 1200, height: 896 },
  "keenest-bedroom": { alt: "Bedroom with linen bedding, sheer curtains, and a skyline view", width: 1200, height: 896 },
};
export const layouts = [
  { key: "studio-1", beds: "studio", baths: 1, label: "Studio · 1 bath", size: 520 },
  { key: "1-1", beds: "1", baths: 1, label: "1 bed · 1 bath", size: 700 },
  { key: "2-1", beds: "2", baths: 1, label: "2 bed · 1 bath", size: 880 },
  { key: "2-2", beds: "2", baths: 2, label: "2 bed · 2 bath", size: 1040 },
  { key: "3-2", beds: "3", baths: 2, label: "3 bed · 2 bath", size: 1360 },
] as const;
export type LayoutKey = (typeof layouts)[number]["key"];
const titles = ["The Daylight", "The Open Plan", "The Quiet Corner", "The Garden View", "The Everyday", "The Retreat", "The Window Seat", "The Gathering Place", "The Soft Landing", "The Terrace", "The Courtyard", "The Skyline", "The Atelier", "The Hearth", "The Lookout", "The Orchard", "The Sunroom", "The Loft", "The Harbor", "The Meadow"];
const featurePool = ["Balcony", "Laundry", "Work nook", "Storage", "Open kitchen", "Natural light", "Dining space", "Green outlook", "Extra room", "Parking"];
export type Listing = {
  id: string;
  city: City["slug"];
  title: string;
  neighborhood: string;
  neighborhoodName: string;
  layout: LayoutKey;
  beds: string;
  baths: number;
  size: number;
  featured: boolean;
  images: readonly string[];
  features: readonly string[];
};
export const LISTINGS_PER_CITY = 20;
const cache = new Map<string, Listing[]>();
// Deterministic: the same city always yields the same listings in the same order.
export function listingsForCity(city: City): Listing[] {
  const cached = cache.get(city.slug);
  if (cached) return cached;
  const ci = CITIES.indexOf(city);
  const result = Array.from({ length: LISTINGS_PER_CITY }, (_, i): Listing => {
    const layout = layouts[(i * 3 + ci) % layouts.length];
    const area = city.neighborhoods[(i * 5 + ci) % city.neighborhoods.length];
    return {
      id: `${city.slug}-${String(i + 1).padStart(2, "0")}`,
      city: city.slug,
      title: titles[i % titles.length],
      neighborhood: area.slug,
      neighborhoodName: area.name,
      layout: layout.key,
      beds: layout.beds,
      baths: layout.baths,
      size: layout.size + ((i * 37 + ci * 11) % 6) * 20,
      featured: i % 5 === 2,
      images: [0, 1, 2].map((j) => city.gallery[(i + j) % city.gallery.length]),
      features: [0, 1, 2].map((j) => featurePool[(i * 2 + j * 3 + ci) % featurePool.length]),
    };
  });
  cache.set(city.slug, result);
  return result;
}
export const findListing = (city: City, id: string) =>
  listingsForCity(city).find((listing) => listing.id === id);
export const listingCopy = {
  badge: "Sample",
  label: "Sample listing",
  previous: (title: string) => `Previous image for ${title}`,
  next: (title: string) => `Next image for ${title}`,
  imageLabel: (title: string) => `${title} sample images`,
  specs: (item: Pick<Listing, "beds" | "baths" | "size">) =>
    `${item.beds === "studio" ? "Studio" : `${item.beds} bed`} · ${item.baths} bath · ${item.size} sq ft`,
};
