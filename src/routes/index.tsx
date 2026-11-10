import { createFileRoute, Link } from "@tanstack/react-router";
import { siteName, process } from "../data/site";
import { homeCopy, exampleSearches, homePrinciples } from "../data/pages";
import { listings } from "../data/listings";
import { Section } from "../components/ui/Section";
import { ButtonLink } from "../components/ui/Button";
import { ListingCard } from "../features/listings/ListingCard";
import { ProcessIcon } from "../components/ui/ProcessIcon";
import { HeroVideo } from "../components/ui/HeroVideo";
import { pageHead } from "../lib/head";
export const Route = createFileRoute("/")({
  head: () => ({
    ...pageHead(
      "Find your next home",
      `Explore a new way to begin your apartment search with ${siteName}. An interactive demo, shaped around your preferences.`,
    ),
    links: [
      {
        rel: "preload",
        as: "image",
        href: "/videos/poster-mobile.webp",
        type: "image/webp",
        media: "(max-width: 640px)",
        fetchPriority: "high",
      },
      {
        rel: "preload",
        as: "image",
        href: "/videos/poster.webp",
        type: "image/webp",
        media: "(min-width: 641px)",
        fetchPriority: "high",
      },
    ],
  }),
  component: Home,
});
function Home() {
  return (
    <div className="home-page">
      <section className="photo-hero" aria-labelledby="hero-title">
        <div className="wrap hero-content">
          <HeroVideo />
          <div className="hero-message">
            <span className="hero-kicker">{homeCopy.eyebrow}</span>
            <h1 id="hero-title">
              {homeCopy.title}
              <br />
              <span className="hero-highlight">{homeCopy.titleEmphasis}</span>
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
      <Section animate>
        <div className="section-heading centered-heading">
          <span className="eyebrow accent">Your move, in focus</span>
          <h2>How your search takes shape.</h2>
          <p>Bring your ideas together, one step at a time.</p>
        </div>
        <div className="grid-3">
          {process.map((item, i) => (
            <article className="step-card" key={item.title}>
              <div className="step-card-top">
                <span className="step-number">0{i + 1}</span>
                <span className="process-icon" aria-hidden="true">
                  <ProcessIcon step={i} />
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
      <Section band animate>
        <div className="section-heading">
          <div>
            <span className="sample-label">Sample data</span>
            <h2>A few places to imagine.</h2>
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
      <Section animate>
        <div className="principles-band">
          <div className="principles-heading">
            <span className="eyebrow accent">Our approach</span>
            <h2>
              An apartment search built around{" "}
              <span className="text-highlight">your life.</span>
            </h2>
            <p>
              Start with the routines, spaces, and little details that make a
              place feel like yours.
            </p>
          </div>
          <div className="grid-3">
            {homePrinciples.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>
      <section className="section home-closing">
        <div className="wrap center">
          <h2>Ready to picture your next move?</h2>
          <p>
            Bring your preferences together in the demo questionnaire. No
            inquiry is sent.
          </p>
          <div className="actions actions-center">
            <ButtonLink>
              Get Started <span aria-hidden="true">→</span>
            </ButtonLink>
            <ButtonLink to="/how-it-works" variant="secondary">
              How It Works
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
