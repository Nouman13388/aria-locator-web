import { createFileRoute, Link } from "@tanstack/react-router";
import { Intro, Section } from "../components/ui/Section";
import { CITIES } from "../data/cities";
import { sitemapPage as copy } from "../data/cityPage";
import { pageHead } from "../lib/head";
export const Route = createFileRoute("/sitemap")({
  head: () => pageHead("Sitemap", copy.intro),
  component: Sitemap,
});
function Sitemap() {
  return (
    <>
      <Intro eyebrow={copy.eyebrow} title={copy.title}>
        {copy.intro}
      </Intro>
      <Section>
        <ul className="sitemap-list">
          {copy.pages.map((page) => (
            <li key={page.to}>
              <Link to={page.to}>{page.label}</Link>
            </li>
          ))}
        </ul>
        <h2>{copy.citiesTitle}</h2>
        <ul className="sitemap-list">
          {CITIES.map((city) => (
            <li key={city.slug}>
              <Link to="/{$city}-apartments" params={{ city: city.slug }}>
                {city.name}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
