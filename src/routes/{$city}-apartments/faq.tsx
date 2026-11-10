import { createFileRoute } from "@tanstack/react-router";
import { PageHero, ClosingBand } from "../../features/city/blocks";
import { Accordion } from "../../components/ui/Accordion";
import { findCity } from "../../data/cities";
import { cityHref } from "../../data/cityLinks";
import { faqFor, faqPage as copy } from "../../data/content";
import { cityPageHead } from "../../lib/cityHead";
export const Route = createFileRoute("/{$city}-apartments/faq")({
  head: ({ params }) => cityPageHead(findCity(params.city)!, "faq", "FAQ", copy.intro),
  component: FAQ,
});
function FAQ() {
  const city = findCity(Route.useParams().city)!;
  return (
    <>
      <PageHero title={copy.title}>{copy.intro}</PageHero>
      <section className="wrap city-section narrow">
        <Accordion items={faqFor(city)} />
      </section>
      <ClosingBand title={copy.closingTitle} text={copy.closingText} to={cityHref(city.slug, "get-started")} secondary={{ to: cityHref(city.slug, "listings"), label: "Browse listings" }} />
    </>
  );
}
