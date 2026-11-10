import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { PageHero, ClosingBand } from "../../features/city/blocks";
import { Pagination } from "../../components/ui/Pagination";
import { ListingCard } from "../../features/listings/ListingCard";
import { ListingDetail } from "../../features/listings/ListingDetail";
import { ModalShell } from "../../features/listings/ListingShells";
import { findCity } from "../../data/cities";
import { cityHref } from "../../data/cityLinks";
import { findListing, layouts, listingsForCity } from "../../data/listings";
import { listingsPage as copy } from "../../data/content";
import { compactFilters, filterListings, listingsSearchSchema, paginate, parseNeighborhoods, readFilters } from "../../features/listings/filters";
import { cityPageHead } from "../../lib/cityHead";
export const Route = createFileRoute("/{$city}-apartments/listings")({
  validateSearch: listingsSearchSchema,
  head: ({ params }) => {
    const city = findCity(params.city)!;
    return cityPageHead(city, "listings", copy.title(city.name), `Browse fictional sample apartments in ${city.name} and filter by neighborhood and layout.`);
  },
  component: Listings,
});
function Listings() {
  const city = findCity(Route.useParams().city)!;
  const rawSearch = Route.useSearch();
  const search = readFilters(rawSearch);
  const router = useRouter();
  const open = rawSearch.listing ? findListing(city, rawSearch.listing) : undefined;
  const openedInApp = useRef(false);
  const navigate = useNavigate({ from: Route.fullPath });
  const selected = parseNeighborhoods(search.neighborhood, city.neighborhoods.map((a) => a.slug));
  const results = filterListings(listingsForCity(city), { neighborhoods: selected, layout: search.layout, featured: search.featured });
  const view = paginate(results, search.page);
  const update = (patch: Partial<typeof search>) =>
    navigate({ search: (prev) => compactFilters({ ...readFilters(prev), page: 1, ...patch }), resetScroll: false });
  const toggle = (slug: string) =>
    update({ neighborhood: (selected.includes(slug) ? selected.filter((s) => s !== slug) : [...selected, slug]).join(",") });
  // Closing keeps the page where it is. Back button semantics when we opened it, replace otherwise.
  const closeModal = () => {
    if (openedInApp.current) {
      openedInApp.current = false;
      router.history.back();
    }
    else navigate({ search: (prev) => ({ ...prev, listing: undefined }), replace: true, resetScroll: false });
  };
  useEffect(() => {
    if (rawSearch.listing && !open) navigate({ search: (prev) => ({ ...prev, listing: undefined }), replace: true, resetScroll: false });
  }, [rawSearch.listing, open, navigate]);
  const filtered = selected.length > 0 || search.layout !== "any" || search.featured;
  return (
    <>
      <PageHero title={copy.title(city.name)}>{copy.intro}</PageHero>
      <section className="wrap" aria-labelledby="search-title">
        <form className="search-card" role="search" onSubmit={(e) => e.preventDefault()}>
          <h2 id="search-title">{copy.searchTitle}</h2>
          <div className="search-fields">
            <details className="multi-select">
              <summary>
                {copy.neighborhoods}
                <span>{selected.length ? `${selected.length} selected` : copy.anyNeighborhood}</span>
              </summary>
              <fieldset>
                <legend className="sr-only">{copy.neighborhoods}</legend>
                {city.neighborhoods.map((area) => (
                  <label key={area.slug}>
                    <input type="checkbox" checked={selected.includes(area.slug)} onChange={() => toggle(area.slug)} />
                    {area.name}
                  </label>
                ))}
              </fieldset>
            </details>
            <div className="field">
              <label htmlFor="layout">{copy.layout}</label>
              <select id="layout" value={search.layout} onChange={(e) => update({ layout: e.target.value as typeof search.layout })}>
                <option value="any">{copy.anyLayout}</option>
                {layouts.map((layout) => (
                  <option key={layout.key} value={layout.key}>{layout.label}</option>
                ))}
              </select>
            </div>
            <label className="consent">
              <input type="checkbox" checked={search.featured} onChange={(e) => update({ featured: e.target.checked })} />
              {copy.featured}
            </label>
            <Link to="/{$city}-apartments/listings" params={{ city: city.slug }} search={{}} className="inline-link" aria-disabled={!filtered}>
              {copy.clear}
            </Link>
          </div>
        </form>
        <p className="results-count" role="status">{results.length} sample {results.length === 1 ? "listing" : "listings"}</p>
        {results.length === 0 ? (
          <div className="empty-state">
            <h3>{copy.empty}</h3>
            <p>{copy.emptyHint}</p>
          </div>
        ) : (
          <div className="city-cards listings-grid">
            {view.items.map((listing) => (
              <div key={listing.id} onClickCapture={() => (openedInApp.current = true)} className="card-slot"><ListingCard listing={listing} modal /></div>
            ))}
          </div>
        )}
        <Pagination page={view.page} pages={view.pages} onChange={(page) => navigate({ search: (prev) => compactFilters({ ...readFilters(prev), page }), resetScroll: true })} />
      </section>
      {open && (
        <ModalShell labelledBy="ld-title" onClose={closeModal}>
          <ListingDetail listing={open} cityName={city.name} headingId="ld-title" />
        </ModalShell>
      )}
      <ClosingBand title={copy.closingTitle} text={copy.closingText} to={cityHref(city.slug, "get-started")} />
    </>
  );
}
