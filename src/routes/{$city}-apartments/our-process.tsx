import { createFileRoute } from "@tanstack/react-router";
import { PageHero, ClosingBand } from "../../features/city/blocks";
import { ResponsiveImage } from "../../components/ui/ResponsiveImage";
import { findCity } from "../../data/cities";
import { cityHref } from "../../data/cityLinks";
import { processPage as copy } from "../../data/content";
import { cityPageHead } from "../../lib/cityHead";
export const Route = createFileRoute("/{$city}-apartments/our-process")({
  head: ({ params }) => cityPageHead(findCity(params.city)!, "our-process", "Our Process", copy.intro),
  component: Process,
});
function Process() {
  const city = findCity(Route.useParams().city)!;
  return (
    <>
      <PageHero title={copy.title}>{copy.intro}</PageHero>
      <section className="wrap city-section process-layout">
        <div className="process-image">
          <ResponsiveImage name="keenest-living" alt={copy.imageAlt} width={1200} height={896} sizes="(max-width: 900px) calc(100vw - 32px), 520px" />
        </div>
        <ol className="process-steps">
          {copy.steps.map((step, i) => (
            <li key={step.title}>
              <span className="step-dot" aria-hidden="true">{i + 1}</span>
              <h2>{step.title}</h2>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>
      <ClosingBand title={copy.closingTitle} text={copy.closingText} to={cityHref(city.slug, "get-started")} />
    </>
  );
}
