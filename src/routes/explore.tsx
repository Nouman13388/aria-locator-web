import { homeRevision, homeLabels } from "../data/home";
import { actions } from "../data/actions";
import { createFileRoute, Link } from "@tanstack/react-router";
import { process } from "../data/site";
import { exampleSearches, homePrinciples } from "../data/pages";
import { listings } from "../data/listings";
import { Intro, Section } from "../components/ui/Section";
import { ButtonLink } from "../components/ui/Button";
import { ListingCard } from "../features/listings/ListingCard";
import { ProcessIcon } from "../components/ui/ProcessIcon";
import { pageHead } from "../lib/head";
export const Route = createFileRoute("/explore")({
  head: () =>
    pageHead(homeRevision.exploreLabel, homeRevision.exploreDescription),
  component: Explore,
});
function Explore() {
  return (
    <div className="explore-page">
      <Intro
        eyebrow={homeRevision.exploreLabel}
        title={homeRevision.exploreTitle}
      >
        {homeRevision.exploreDescription}
      </Intro>
      <Section>
        <div className="example-searches">
          {exampleSearches.map((item) => (
            <article className="example-card" key={item.title}>
              <span className="search-tag">{item.tag}</span>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
              <div className="example-bottom">
                <span>{homeLabels.example}</span>
                <Link to="/get-started" search={{ step: 1 }}>
                  {homeLabels.tryDirection} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <Section animate>
        <div className="section-heading centered-heading">
          <span className="eyebrow accent">{homeLabels.processEyebrow}</span>
          <h2>{homeLabels.processTitle}</h2>
          <p>{homeLabels.processDescription}</p>
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
                {homeLabels.learnMore} →
              </Link>
            </article>
          ))}
        </div>
      </Section>
      <Section band animate>
        <div className="section-heading">
          <div>
            <span className="sample-label">{homeLabels.sampleLabel}</span>
            <h2>{homeLabels.sampleTitle}</h2>
          </div>
          <p>{homeLabels.sampleDescription}</p>
        </div>
        <div className="listing-grid">
          {listings.slice(0, 3).map((item) => (
            <ListingCard key={item.id} listing={item} />
          ))}
        </div>
        <div className="actions actions-center">
          <ButtonLink to="/listings" appearance="secondary">
            {homeLabels.seeSamples} <span aria-hidden="true">→</span>
          </ButtonLink>
        </div>
      </Section>
      <Section animate>
        <div className="principles-band">
          <div className="principles-heading">
            <span className="eyebrow accent">
              {homeLabels.principlesEyebrow}
            </span>
            <h2>
              {homeLabels.principlesTitle}{" "}
              <span className="text-highlight">
                {homeLabels.principlesHighlight}
              </span>
            </h2>
            <p>{homeLabels.principlesDescription}</p>
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
          <h2>{homeLabels.closingTitle}</h2>
          <p>{homeLabels.closingDescription}</p>
          <div className="actions actions-center">
            <ButtonLink>
              {actions.getStarted} <span aria-hidden="true">→</span>
            </ButtonLink>
            <ButtonLink to="/how-it-works" appearance="secondary">
              {actions.howItWorks}
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
