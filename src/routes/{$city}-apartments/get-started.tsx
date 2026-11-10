import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "../../features/city/blocks";
import { GetStartedForm } from "../../features/getStarted/GetStartedForm";
import { findCity } from "../../data/cities";
import { cityPageHead } from "../../lib/cityHead";
export const Route = createFileRoute("/{$city}-apartments/get-started")({
  head: ({ params }) => cityPageHead(findCity(params.city)!, "get-started", "Get Started", "Share your timing, layout and preferences in one short demo form. Nothing is sent or stored."),
  component: GetStarted,
});
function GetStarted() {
  const city = findCity(Route.useParams().city)!;
  return (
    <>
      <PageHero title={`Let’s find your ${city.name} apartment.`}>One short form. Tell us about your move and we’ll shape it into a clear brief.</PageHero>
      <section className="wrap city-section narrow">
        <GetStartedForm city={city} />
      </section>
    </>
  );
}
