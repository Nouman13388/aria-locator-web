import { actions } from "../data/actions";
import { homeCopy, inspiration } from "../data/pages";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "../components/ui/Section";
import { ButtonLink } from "../components/ui/Button";
import { CTA } from "../components/layout/Layout";
import { Accordion } from "../components/ui/Accordion";
import { process } from "../data/site";
import { faqGroups } from "../data/faq";
import { pageHead } from "../lib/head";
export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "Find your next home",
      "A thoughtful apartment search starts with you. Explore the Aria apartment-locating demo.",
    ),
  component: Home,
});
function Home() {
  return (
    <>
      <section className="hero-top">
        <span className="eyebrow">{homeCopy.eyebrow}</span>
        <h1>
          {homeCopy.title}
          <br />
          <em>{homeCopy.titleEmphasis}</em>
        </h1>
        <p>{homeCopy.description}</p>
        <div className="actions actions-center">
          <ButtonLink variant="light">
            {actions.findSpace} <span aria-hidden="true">↗</span>
          </ButtonLink>
          <ButtonLink to="/how-it-works" variant="secondary">
            {actions.howItWorks}
          </ButtonLink>
        </div>
      </section>
      <div className="wrap hero-photo">
        <img
          src="/images/home-0.jpg"
          alt="Sunlit living room with natural textures and floor-to-ceiling terrace doors"
          fetchPriority="high"
          width="1400"
          height="650"
        />
        <span className="image-caption">{homeCopy.imageCaption}</span>
      </div>
      <Section>
        <div className="grid-2">
          <div>
            <span className="eyebrow accent">Quiet guidance</span>
            <h2>
              Less searching.
              <br />
              <em>More possibility.</em>
            </h2>
          </div>
          <div>
            <p>
              Your next home is more than a floor plan. It’s the light in the
              morning, room for your routines, and a neighborhood that feels
              like your own.
            </p>
            <div className="diamond" aria-hidden="true">
              ◆
            </div>
            <p>
              Aria brings those details together in a clear, personal brief. A
              calmer starting point for the place you’ll call home.
            </p>
          </div>
        </div>
      </Section>
      <Section band>
        <div className="section-heading">
          <div>
            <span className="eyebrow accent">The pathway</span>
            <h2>A three-step transition</h2>
          </div>
          <p>
            A little clarity at the beginning makes room for a more thoughtful
            search.
          </p>
        </div>
        <div className="grid-3">
          {process.map((p, i) => (
            <article className="step-card" key={p.title}>
              <span className="step-number">
                0{i + 1} <span aria-hidden="true">↗</span>
              </span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
        <Link to="/how-it-works" className="button secondary">
          {actions.exploreProcess} <span aria-hidden="true">→</span>
        </Link>
      </Section>
      <Section>
        <div className="section-heading">
          <div>
            <span className="eyebrow accent">Room to imagine</span>
            <h2>Spaces defined by calm</h2>
          </div>
          <p>
            Natural textures. Thoughtful proportions. The small details that
            make everyday living feel different.
          </p>
        </div>
        <div className="grid-3 gallery">
          {inspiration.map((x) => (
            <article key={x.title}>
              <img
                src={`/images/home-${x.image}.jpg`}
                alt={x.alt}
                loading="lazy"
                width="420"
                height="440"
              />
              <h3>{x.title}</h3>
              <p>{x.text}</p>
            </article>
          ))}
        </div>
        <p className="form-note">
          Interior inspiration only. These images do not represent available
          properties.
        </p>
      </Section>
      <Section band>
        <div className="grid-2 items-start">
          <div>
            <span className="eyebrow accent">A little clarity</span>
            <h2>
              Good questions.
              <br />
              <em>Thoughtful answers.</em>
            </h2>
            <ButtonLink to="/faq" variant="secondary">
              {actions.visitFAQ} <span aria-hidden="true">→</span>
            </ButtonLink>
          </div>
          <div>
            {faqGroups[0].items.map(([question, answer]) => (
              <Accordion key={question} question={question} answer={answer} />
            ))}
          </div>
        </div>
      </Section>
      <Section>
        <CTA />
      </Section>
    </>
  );
}
