import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "../features/city/blocks";
import { accessibilityPage as copy } from "../data/content";
import { pageHead } from "../lib/head";
export const Route = createFileRoute("/accessibility")({
  head: () => pageHead("Accessibility", copy.intro),
  component: Accessibility,
});
function Accessibility() {
  return (
    <>
      <PageHero eyebrow="Demo" title={copy.title}>{copy.intro}</PageHero>
      <section className="wrap city-section narrow prose">
        {copy.sections.map((section) => (
          <div key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.text}</p>
          </div>
        ))}
      </section>
    </>
  );
}
