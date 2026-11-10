import { ResponsiveImage } from "../components/ui/ResponsiveImage";
import { pageIntros } from "../data/pages";
import { createFileRoute } from "@tanstack/react-router";
import { Intro, Section } from "../components/ui/Section";
import { CTA } from "../components/layout/Layout";
import { principles } from "../data/site";
import { pageHead } from "../lib/head";
export const Route = createFileRoute("/about")({
  head: () =>
    pageHead(
      "About",
      "A considered approach to apartment locating, built around your life and preferences.",
    ),
  component: About,
});
function About() {
  return (
    <>
      <Intro eyebrow={pageIntros.about.eyebrow} title={pageIntros.about.title}>
        {pageIntros.about.description}
      </Intro>
      <Section>
        <div className="grid-2">
          <div>
            <span className="eyebrow accent">The philosophy</span>
            <h2>
              Good spaces begin
              <br />
              <em>with understanding.</em>
            </h2>
            <p>
              Before the search comes the question: what does home mean to you?
              Perhaps it’s a quiet corner for reading, an easy commute, or
              enough room to welcome the people you love.
            </p>
            <p>
              Our demo begins with those details. It turns everyday needs and
              personal preferences into a clear brief, ready to guide a more
              considered search.
            </p>
            <div className="diamond" aria-hidden="true">
              ◆
            </div>
            <h3>Room for what matters.</h3>
            <p>
              No two routines are quite alike. Your next space should reflect
              yours.
            </p>
          </div>
          <figure className="figure-reset">
            <ResponsiveImage
              name="keenest-living"
              alt="Sunlit living room with oak finishes and windows facing greenery"
              width={1200}
              height={896}
              className="round-image"
            />
            <figcaption className="form-note figure-caption">
              A study in natural light, texture, and everyday calm. Interior
              inspiration.
            </figcaption>
          </figure>
        </div>
      </Section>
      <Section band>
        <div className="section-heading">
          <div>
            <span className="eyebrow accent">Guiding principles</span>
            <h2>A considered approach</h2>
          </div>
          <p>
            Simple ideas that shape a clearer, more personal apartment search.
          </p>
        </div>
        <div className="grid-2 principles-grid">
          {principles.map((p, i) => (
            <article key={p.title} className="card">
              <span className="eyebrow accent">Principle 0{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
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
