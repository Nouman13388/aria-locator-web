import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "../../features/city/blocks";
import { ContactForm } from "../../features/contact/ContactForm";
import { findCity } from "../../data/cities";
import { conciergePage as copy } from "../../data/content";
import { cityPageHead } from "../../lib/cityHead";
export const Route = createFileRoute("/{$city}-apartments/concierge")({
  head: ({ params }) => cityPageHead(findCity(params.city)!, "concierge", "Moving Concierge", copy.intro),
  component: Concierge,
});
function Concierge() {
  return (
    <>
      <PageHero title={copy.title} action={<a className="button" href="#services">{copy.cta}</a>}>{copy.intro}</PageHero>
      <section className="wrap city-section" id="services" aria-labelledby="services-title">
        <div className="city-heading">
          <h2 id="services-title">{copy.servicesTitle}</h2>
          <p>{copy.servicesIntro}</p>
        </div>
        <div className="city-how service-grid">
          {copy.services.map((service) => (
            <article key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
        <p className="form-note">{copy.note}</p>
      </section>
      <section className="wrap city-section narrow">
        <div className="city-heading">
          <h2>{copy.contactTitle}</h2>
          <p>{copy.contactText}</p>
        </div>
        <ContactForm eyebrow="Demo form" title="Tell us what you need" idPrefix="concierge" />
      </section>
    </>
  );
}
