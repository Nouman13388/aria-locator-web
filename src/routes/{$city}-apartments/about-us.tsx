import { createFileRoute } from "@tanstack/react-router";
import { PageHero, ClosingBand } from "../../features/city/blocks";
import { findCity } from "../../data/cities";
import { cityHref } from "../../data/cityLinks";
import { aboutPage as copy, processPage } from "../../data/content";
import { cityPageHead } from "../../lib/cityHead";
export const Route = createFileRoute("/{$city}-apartments/about-us")({
  head: ({ params }) => cityPageHead(findCity(params.city)!, "about-us", "About Us", copy.intro),
  component: About,
});
function About() {
  const city = findCity(Route.useParams().city)!;
  return (
    <>
      <PageHero title={copy.title}>{copy.intro}</PageHero>
      <section className="wrap city-section">
        <div className="mission">
          <h2>{copy.missionTitle}</h2>
          <p>{copy.mission}</p>
        </div>
      </section>
      <section className="wrap city-section" aria-labelledby="apart-title">
        <div className="city-heading"><h2 id="apart-title">{copy.setsApartTitle}</h2></div>
        <div className="city-how">
          {copy.points.map((point) => (
            <article key={point.title}>
              <h3>{point.title}</h3>
              <p>{point.text}</p>
            </article>
          ))}
        </div>
      </section>
      <ClosingBand title={processPage.closingTitle} text={processPage.closingText} to={cityHref(city.slug, "get-started")} />
    </>
  );
}
