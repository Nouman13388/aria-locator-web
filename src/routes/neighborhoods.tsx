import { createFileRoute, Link } from "@tanstack/react-router";
import { Intro, Section } from "../components/ui/Section";
import { CITIES, cityPath } from "../data/cities";
import { neighborhoodsPage as copy } from "../data/cityPage";
import { pageHead } from "../lib/head";
export const Route = createFileRoute("/neighborhoods")({
  head: () => pageHead("Neighborhoods", copy.intro),
  component: Neighborhoods,
});
function Neighborhoods() {
  return (
    <>
      <Intro eyebrow={copy.eyebrow} title={copy.title}>
        {copy.intro}
      </Intro>
      <Section>
        {CITIES.map((city) => (
          <div key={city.slug} id={city.slug} className="area-group">
            <div className="area-head">
              <h2>{city.name}</h2>
              <Link to={cityPath(city.slug)} className="inline-link">
                {city.name} page <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="grid-3">
              {city.neighborhoods.map((name, i) => (
                <article className="step-card" key={name}>
                  <span className="sample-label">{copy.areaNote}</span>
                  <h3>{name}</h3>
                  <p>{copy.traits[i]}</p>
                </article>
              ))}
            </div>
          </div>
        ))}
      </Section>
    </>
  );
}
