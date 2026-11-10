import { createFileRoute } from "@tanstack/react-router";
import { Intro, Section } from "../components/ui/Section";
import { ListingCard } from "../features/listings/ListingCard";
import { filterListings, listingSearchSchema } from "../data/listings";
import { pageHead } from "../lib/head";
export const Route = createFileRoute("/listings")({
  validateSearch: listingSearchSchema,
  head: () =>
    pageHead(
      "Sample listings",
      "Explore fictional apartments and try layout and surroundings filters. All prices and details are placeholders.",
    ),
  component: Listings,
});
function Listings() {
  const filters = Route.useSearch();
  const navigate = Route.useNavigate();
  const items = filterListings(filters);
  return (
    <>
      <Intro eyebrow="A little inspiration" title="Picture the possibilities.">
        Explore sample spaces, then shape a search around your own priorities.
        These fictional listings are not available properties. All prices and
        features are placeholders; images are illustrative.
      </Intro>
      <Section band id="surroundings">
        <form
          className="listing-filters"
          aria-label="Filter sample listings"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="field">
            <label htmlFor="filter-beds">Bedrooms</label>
            <select
              id="filter-beds"
              value={filters.beds}
              onChange={(e) =>
                void navigate({
                  search: {
                    ...filters,
                    beds: listingSearchSchema.shape.beds.parse(e.target.value),
                  },
                })
              }
            >
              <option value="any">Any layout</option>
              <option value="studio">Studio</option>
              <option value="1">1 bedroom</option>
              <option value="2">2 bedrooms</option>
              <option value="3">3 bedrooms</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="filter-setting">Surroundings</label>
            <select
              id="filter-setting"
              value={filters.setting}
              onChange={(e) =>
                void navigate({
                  search: {
                    ...filters,
                    setting: listingSearchSchema.shape.setting.parse(
                      e.target.value,
                    ),
                  },
                })
              }
            >
              <option value="any">Any setting</option>
              <option value="green">Green spaces</option>
              <option value="connected">Connected living</option>
              <option value="quiet">Quiet surroundings</option>
            </select>
          </div>
          <button
            className="button secondary"
            type="button"
            onClick={() =>
              void navigate({ search: { beds: "any", setting: "any" } })
            }
          >
            Reset filters
          </button>
        </form>
        <p className="form-note" role="status">
          {items.length} sample {items.length === 1 ? "listing" : "listings"}{" "}
          shown
        </p>
        {items.length ? (
          <div className="listing-grid">
            {items.map((item) => (
              <ListingCard key={item.id} listing={item} />
            ))}
          </div>
        ) : (
          <div className="card">
            <h2>No samples in this combination.</h2>
            <p>Try another layout or setting to explore more ideas.</p>
          </div>
        )}
      </Section>
    </>
  );
}
