import { createFileRoute, notFound } from "@tanstack/react-router";
import { ListingDetail } from "../../features/listings/ListingDetail";
import { PageShell } from "../../features/listings/ListingShells";
import { findCity } from "../../data/cities";
import { findListing, listingCopy } from "../../data/listings";
import { detailCopy as copy } from "../../data/content";
import { cityPageHead } from "../../lib/cityHead";
import { CityPicker } from "../../components/ui/CityPicker";
export const Route = createFileRoute("/{$city}-apartment/$listingId")({
  loader: ({ params }) => {
    const city = findCity(params.city);
    const listing = city && findListing(city, params.listingId);
    if (!city || !listing) throw notFound();
    return listing;
  },
  head: ({ loaderData, params }) => {
    const city = findCity(params.city);
    if (!city || !loaderData) return {};
    return cityPageHead(city, undefined, `${loaderData.title}, ${loaderData.neighborhoodName} (sample)`, `A fictional sample ${listingCopy.specs(loaderData)} home in ${city.name}. Illustrative only.`, `/${city.slug}-apartment/${loaderData.id}`);
  },
  notFoundComponent: () => (
    <div className="wrap section center">
      <span className="eyebrow accent">404</span>
      <h1>{copy.notFoundTitle}</h1>
      <p>Pick a city to browse sample listings.</p>
      <CityPicker variant="hero" />
    </div>
  ),
  component: Detail,
});
function Detail() {
  const listing = Route.useLoaderData();
  const city = findCity(listing.city)!;
  return (
    <PageShell city={city.slug} cityName={city.name}>
      <ListingDetail listing={listing} cityName={city.name} heading="h1" />
    </PageShell>
  );
}
