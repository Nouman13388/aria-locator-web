import { createFileRoute } from "@tanstack/react-router";
import { Intro, Section } from "../components/ui/Section";
import { CTA } from "../components/layout/Layout";
import { conciergePage as copy } from "../data/cityPage";
import { pageHead } from "../lib/head";
export const Route = createFileRoute("/moving-concierge")({
  head: () => pageHead("Moving Concierge", copy.intro),
  component: MovingConcierge,
});
function MovingConcierge() {
  return (
    <>
      <Intro eyebrow={copy.eyebrow} title={copy.title}>
        {copy.intro}
      </Intro>
      <Section>
        <div className="section-heading centered-heading">
          <h2>{copy.stepsTitle}</h2>
          <p>{copy.note}</p>
        </div>
        <div className="grid-3">
          {copy.steps.map((step, i) => (
            <article className="step-card" key={step.title}>
              <span className="step-number">0{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section>
        <CTA />
      </Section>
    </>
  );
}
