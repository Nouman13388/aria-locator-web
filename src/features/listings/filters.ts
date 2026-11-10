import { z } from "zod";
import { allListingIds, layouts, type Listing } from "../../data/listings";
// Fields are optional (no schema defaults) so the router never rewrites a clean URL.
export const listingsSearchSchema = z.object({
  // Comma-separated neighborhood slugs keep the URL readable and shareable.
  neighborhood: z.string().optional().catch(undefined),
  layout: z.enum(layouts.map((layout) => layout.key)).optional().catch(undefined),
  featured: z.boolean().optional().catch(undefined),
  page: z.coerce.number().int().min(1).optional().catch(undefined),
  // Open listing modal; unknown ids are dropped.
  listing: z.string().refine((id) => allListingIds.has(id)).optional().catch(undefined),
});
export type ListingFilters = z.infer<typeof listingsSearchSchema>;
export const readFilters = (search: ListingFilters) => ({
  neighborhood: search.neighborhood ?? "",
  layout: search.layout ?? ("any" as const),
  featured: search.featured ?? false,
  page: search.page ?? 1,
});
// Drops default values so shared URLs stay short.
export const compactFilters = (f: ReturnType<typeof readFilters>): ListingFilters => ({
  neighborhood: f.neighborhood || undefined,
  layout: f.layout === "any" ? undefined : f.layout,
  featured: f.featured || undefined,
  page: f.page > 1 ? f.page : undefined,
});
export const PAGE_SIZE = 9;
export const parseNeighborhoods = (value: string, valid: readonly string[]) =>
  value.split(",").filter((slug) => valid.includes(slug));
export function filterListings(
  listings: readonly Listing[],
  filters: Pick<ReturnType<typeof readFilters>, "layout" | "featured"> & { neighborhoods: readonly string[] },
) {
  return listings.filter(
    (item) =>
      (filters.neighborhoods.length === 0 || filters.neighborhoods.includes(item.neighborhood)) &&
      (filters.layout === "any" || item.layout === filters.layout) &&
      (!filters.featured || item.featured),
  );
}
export function paginate<T>(items: readonly T[], page: number, size = PAGE_SIZE) {
  const pages = Math.max(1, Math.ceil(items.length / size));
  const current = Math.min(Math.max(1, page), pages);
  return { items: items.slice((current - 1) * size, current * size), page: current, pages, total: items.length };
}
