import { Link } from "@tanstack/react-router";
import { ResponsiveImage } from "../../components/ui/ResponsiveImage";
import { ButtonLink } from "../../components/ui/Button";
import { cityCopy } from "../../data/cityPage";
import { contact } from "../../data/site";
import type { City } from "../../data/cities";
import { CityListingCard } from "./CityListingCard";
export function CityHero({ city }: { city: City }) {
  const image =
    city.hero === "keenest-exterior"
      ? { width: 1376, height: 768 }
      : { width: 1200, height: 896 };
  return (
    <section className="city-hero" aria-labelledby="city-title">
      <div className="city-hero-copy">
        <h1 id="city-title">{cityCopy.heroTitle(city.name)}</h1>
        <p>{cityCopy.heroText}</p>
        <ButtonLink>{cityCopy.heroCta}</ButtonLink>
      </div>
      <div className="city-hero-media">
        <ResponsiveImage
          name={city.hero}
          alt={city.heroAlt}
          width={image.width}
          height={image.height}
          loading="eager"
          fetchPriority="high"
          sizes="(max-width: 900px) calc(100vw - 32px), 560px"
          style={{ objectPosition: city.heroPosition }}
        />
        <ul className="city-bubbles" aria-label={cityCopy.bubblesLabel}>
          {cityCopy.bubbles.map((bubble) => (
            <li key={bubble.initial}>
              <span className="avatar" aria-hidden="true">
                {bubble.initial}
              </span>
              {bubble.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
export function CityHow() {
  return (
    <section className="city-section wrap" aria-labelledby="how-title">
      <div className="city-heading">
        <h2 id="how-title">{cityCopy.howTitle}</h2>
        <p>{cityCopy.howIntro}</p>
      </div>
      <div className="city-how">
        {cityCopy.how.map((item) => (
          <article key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <Link to={item.to} className="inline-link">
              {item.link} <span aria-hidden="true">→</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
export function CityFeatured({ city }: { city: City }) {
  return (
    <section className="city-section wrap" aria-labelledby="featured-title">
      <div className="city-heading">
        <h2 id="featured-title">{cityCopy.featuredTitle(city.name)}</h2>
        <p>{cityCopy.featuredNote}</p>
      </div>
      <div className="city-cards">
        {city.sampleListings.map((listing) => (
          <CityListingCard key={listing.id} city={city} listing={listing} />
        ))}
      </div>
      <div className="actions actions-center">
        <ButtonLink to="/listings" appearance="secondary">
          {cityCopy.seeAll}
        </ButtonLink>
      </div>
    </section>
  );
}
export function CityWhy() {
  return (
    <section className="city-why" aria-labelledby="why-title">
      <div className="wrap">
        <span className="eyebrow">{cityCopy.whyKicker}</span>
        <h2 id="why-title">{cityCopy.whyTitle}</h2>
        <div className="city-why-points">
          {cityCopy.why.map((item) => (
            <div key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export function CityClosing({ city }: { city: City }) {
  return (
    <section className="city-closing" aria-labelledby="closing-title">
      <h2 id="closing-title">{cityCopy.closingTitle(city.name)}</h2>
      <p>{cityCopy.closingText}</p>
      <div className="actions actions-center">
        <ButtonLink>{cityCopy.heroCta}</ButtonLink>
        <Link to="/faq" className="inline-link">
          {cityCopy.learnMore} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
export function CityContact() {
  return (
    <section className="city-section wrap" aria-labelledby="contact-title">
      <div className="city-heading">
        <h2 id="contact-title">{cityCopy.contactTitle}</h2>
        <p>{cityCopy.contactNote}</p>
      </div>
      <dl className="city-contact">
        <div>
          <dt>{contact.label}</dt>
          <dd>{contact.email}</dd>
        </div>
        <div>
          <dt>{contact.phoneLabel}</dt>
          <dd>{contact.phone}</dd>
        </div>
        <div>
          <dt>{contact.hoursLabel}</dt>
          <dd>{contact.hours}</dd>
        </div>
      </dl>
    </section>
  );
}
