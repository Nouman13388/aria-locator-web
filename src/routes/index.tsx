import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
import { reveal, revealViewport } from "../features/motion/reveal";
import { createFileRoute } from "@tanstack/react-router";
import { homeLabels, homeRevision, inspirationCircles } from "../data/home";
import { AreaChooser } from "../components/ui/AreaChooser";
import { HeroVideo } from "../components/ui/HeroVideo";
import { ResponsiveImage } from "../components/ui/ResponsiveImage";
import { ButtonLink } from "../components/ui/Button";
import { pageHead } from "../lib/head";
export const Route = createFileRoute("/")({
  head: () => ({
    ...pageHead(homeLabels.metaTitle, homeLabels.metaDescription),
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
  const reduced = useReducedMotion();
  const entrance = {
    initial: false as const,
    whileInView: reduced ? undefined : reveal,
    viewport: revealViewport,
  };
  return (
    <div className="landing-page">
      <section className="home-hero" aria-labelledby="hero-title">
        <HeroVideo />
        <div className="landing-hero-copy">
          <h1 id="hero-title">{homeRevision.heroTitle}</h1>
          <p>{homeRevision.heroDescription}</p>
          <AreaChooser hero />
        </div>
      </section>
      <m.section className="home-feature" {...entrance}>
        <div className="feature-card">
          <h2>{homeRevision.featureTitle}</h2>
          <div>
            <p>{homeRevision.featureDescription}</p>
            <ButtonLink>
              {homeRevision.featureAction}
              <span aria-hidden="true">↗</span>
            </ButtonLink>
          </div>
        </div>
      </m.section>
      <m.section className="home-community" {...entrance}>
        <div className="inspiration-circles" aria-hidden="true">
          {inspirationCircles.map((image) => (
            <ResponsiveImage
              key={image.name}
              name={image.name}
              width={image.width}
              height={image.height}
              alt=""
              sizes="112px"
            />
          ))}
        </div>
        <h2>{homeRevision.communityTitle}</h2>
        <p>{homeRevision.communityDescription}</p>
        <ButtonLink>
          {homeRevision.communityAction}
          <span aria-hidden="true">↗</span>
        </ButtonLink>
      </m.section>
    </div>
  );
}
