import { createFileRoute, Link } from "@tanstack/react-router";
import { siteName, process } from "../data/site";
import { homeCopy, exampleSearches, homePrinciples } from "../data/pages";
import { listings } from "../data/listings";
import { Section } from "../components/ui/Section";
import { ButtonLink } from "../components/ui/Button";
import { CTA } from "../components/layout/Layout";
import { ListingCard } from "../features/listings/ListingCard";
import { pageHead } from "../lib/head";
export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "Find your next home",
      `Explore a new way to begin your apartment search with ${siteName}. An interactive demo, shaped around your preferences.`,
    ),
  component: Home,
});
function Home() {
  return (
    <>
      <section className="photo-hero" aria-labelledby="hero-title">
        <img
          className="hero-background"
          src="/images/aria-exterior.webp"
          alt="Modern apartment building with glass balconies, leafy trees, and a clear blue sky"
          width="1376"
          height="768"
          fetchPriority="high"
        />
        <div className="hero-wash" />
        <div className="wrap hero-content">
          <div className="hero-message">
            <span className="hero-kicker">{homeCopy.eyebrow}</span>
            <h1 id="hero-title">
              {homeCopy.title}
              <br />
              {homeCopy.titleEmphasis}
            </h1>
            <p>{homeCopy.description}</p>
            <ButtonLink>
              Start your search <span aria-hidden="true">→</span>
            </ButtonLink>
          </div>
          <div className="example-searches">
            {exampleSearches.map((item) => (
              <article className="example-card" key={item.title}>
                <span className="search-tag">{item.tag}</span>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
                <div className="example-bottom">
                  <span>Example search</span>
                  <Link to="/get-started" search={{ step: 1 }}>
                    Try this direction <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Section>
        <div className="section-heading centered-heading">
          <span className="eyebrow accent">Your move, in focus</span>
          <h2>A little direction. A new beginning.</h2>
          <p>Bring your ideas together, one step at a time.</p>
        </div>
        <div className="grid-3">
          {process.map((item, i) => (
            <article className="step-card" key={item.title}>
              <div className="step-card-top">
                <span className="step-number">0{i + 1}</span>
                <span className="process-icon" aria-hidden="true">
                  {["✎", "☷", "↗"][i]}
                </span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <Link to="/how-it-works" className="inline-link">
                Explore the process →
              </Link>
            </article>
          ))}
        </div>
      </Section>
      <Section band>
        <div className="section-heading">
          <div>
            <span className="eyebrow accent">Sample spaces</span>
            <h2>Make room for possibility.</h2>
          </div>
          <p>
            Fictional apartments, illustrative images, and placeholder prices. A
            starting point for your imagination.
          </p>
        </div>
        <div className="listing-grid">
          {listings.slice(0, 3).map((item) => (
            <ListingCard key={item.id} listing={item} />
          ))}
        </div>
        <div className="actions actions-center">
          <ButtonLink to="/listings" variant="secondary">
            See sample listings <span aria-hidden="true">→</span>
          </ButtonLink>
        </div>
      </Section>
      <Section>
        <div className="principles-band">
          <div className="section-heading centered-heading">
            <span className="eyebrow accent">
              A search with you at the center
            </span>
            <h2>Less noise. More you.</h2>
          </div>
          <div className="grid-3">
            {homePrinciples.map((item, i) => (
              <article key={item.title}>
                <span className="principle-icon" aria-hidden="true">
                  {["◎", "◇", "◷"][i]}
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
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
