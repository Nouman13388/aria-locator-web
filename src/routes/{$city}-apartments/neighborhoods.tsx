import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "../../features/city/blocks";
import { ResponsiveImage } from "../../components/ui/ResponsiveImage";
import { findCity } from "../../data/cities";
import { listingImages } from "../../data/listings";
import { neighborhoodsPage as copy } from "../../data/content";
import { cityPageHead } from "../../lib/cityHead";
export const Route = createFileRoute("/{$city}-apartments/neighborhoods")({
  head: ({ params }) => {
    const city = findCity(params.city)!;
    return cityPageHead(city, "neighborhoods", copy.title(city.name), copy.intro);
  },
  component: Neighborhoods,
});
function Neighborhoods() {
  const city = findCity(Route.useParams().city)!;
  return (
    <>
      <PageHero title={copy.title(city.name)}>{copy.intro}</PageHero>
      <section className="wrap city-section">
        <div className="area-grid">
          {city.neighborhoods.map((area, i) => {
            const name = city.gallery[i % city.gallery.length];
            const meta = listingImages[name];
            return (
              <article className="area-card" key={area.slug}>
                <ResponsiveImage name={name} alt={meta.alt} width={meta.width} height={meta.height} sizes="(max-width: 760px) calc(100vw - 32px), 600px" />
                <div className="area-card-body">
                  <span className="sample-label">{copy.sample}</span>
                  <h2>{area.name}</h2>
                  <p>{area.blurb}</p>
                  <Link to="/{$city}-apartments/listings" params={{ city: city.slug }} search={{ neighborhood: area.slug }} className="inline-link">
                    {copy.view} <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
