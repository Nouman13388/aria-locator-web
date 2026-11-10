import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "../features/city/blocks";
import { legalPage as copy } from "../data/content";
import { pageHead } from "../lib/head";
export const Route = createFileRoute("/legal")({
  head: () => pageHead("Legal", "Demo disclaimer, privacy and terms for this demonstration website."),
  component: Legal,
});
function Legal() {
  return (
    <>
      <PageHero eyebrow="Demo" title={copy.title}>{copy.note}</PageHero>
      <section className="wrap city-section narrow prose">
        {copy.sections.map((section) => (
          <div key={section.id} id={section.id}>
            <h2>{section.title}</h2>
            <p>{section.text}</p>
          </div>
        ))}
      </section>
    </>
  );
}
