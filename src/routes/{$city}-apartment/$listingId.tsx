import { useRef, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ResponsiveImage } from "../../components/ui/ResponsiveImage";
import { Button } from "../../components/ui/Button";
import { ContactForm } from "../../features/contact/ContactForm";
import { swipeDirection } from "../../features/listings/swipe";
import { findCity } from "../../data/cities";
import { cityHome, cityHref } from "../../data/cityLinks";
import { findListing, listingCopy, listingImages } from "../../data/listings";
import { detailCopy as copy } from "../../data/content";
import { cityPageHead } from "../../lib/cityHead";
import { CityPicker } from "../../components/ui/CityPicker";
export const Route = createFileRoute("/{$city}-apartment/$listingId")({
  loader: ({ params }) => {
    const city = findCity(params.city);
    const listing = city && findListing(city, params.listingId);
    if (!city || !listing) throw notFound();
    return listing;
  },
  head: ({ loaderData, params }) => {
    const city = findCity(params.city);
    if (!city || !loaderData) return {};
    return cityPageHead(city, undefined, `${loaderData.title}, ${loaderData.neighborhoodName} (sample)`, `A fictional sample ${listingCopy.specs(loaderData)} home in ${city.name}. Illustrative only.`, `/${city.slug}-apartment/${loaderData.id}`);
  },
  notFoundComponent: () => (
    <div className="wrap section center">
      <span className="eyebrow accent">404</span>
      <h1>{copy.notFoundTitle}</h1>
      <p>Pick a city to browse sample listings.</p>
      <CityPicker variant="hero" />
    </div>
  ),
  component: Detail,
});
function Detail() {
  const listing = Route.useLoaderData();
  const city = findCity(listing.city)!;
  const [index, setIndex] = useState(0);
  const [toast, setToast] = useState("");
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const count = listing.images.length;
  const move = (step: number) => setIndex((index + step + count) % count);
  const image = listing.images[index];
  const meta = listingImages[image];
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setToast(copy.copied);
    } catch {
      setToast(copy.copyFailed);
    }
    setTimeout(() => setToast(""), 2500);
  }
  return (
    <article className="wrap listing-detail">
      <nav aria-label="Breadcrumb" className="crumbs">
        <Link to={cityHome(city.slug)}>{copy.crumb(city.name)}</Link> <span aria-hidden="true">/</span>{" "}
        <Link to={cityHref(city.slug, "listings")}>Listings</Link>
      </nav>
      <header className="detail-head">
        <div>
          <h1>{listing.title}</h1>
          <p className="detail-meta">
            <Link to="/{$city}-apartments/listings" params={{ city: city.slug }} search={{ neighborhood: listing.neighborhood }}>
              {listing.neighborhoodName}
            </Link>{" "}
            · {listing.beds === "studio" ? "Studio" : `${listing.beds} bed`} · {listing.baths} bath · {listing.size} sq ft · {copy.added}
          </p>
        </div>
        <div className="detail-actions">
          <span className="sample-badge static">{listingCopy.label}</span>
          <Button type="button" appearance="secondary" onClick={copyLink}>{copy.copy}</Button>
          <span role="status" className="toast">{toast}</span>
        </div>
      </header>
      <div
        className="gallery"
        role="group"
        aria-roledescription="carousel"
        aria-label={listingCopy.imageLabel(listing.title)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            e.preventDefault();
            move(e.key === "ArrowRight" ? 1 : -1);
          }
        }}
        onPointerDown={(e) => {
          if (!(e.target as Element).closest("button")) pointer.current = { x: e.clientX, y: e.clientY };
        }}
        onPointerUp={(e) => {
          const dir = pointer.current && swipeDirection(pointer.current, { x: e.clientX, y: e.clientY });
          if (dir) move(dir);
          pointer.current = null;
        }}
        onPointerCancel={() => (pointer.current = null)}
      >
        <div className="gallery-main">
          <ResponsiveImage key={image} name={image} alt={meta.alt} width={meta.width} height={meta.height} loading="eager" sizes="(max-width: 900px) calc(100vw - 32px), 800px" />
          <button type="button" className="city-card-arrow prev" aria-label={listingCopy.previous(listing.title)} onClick={() => move(-1)}><span aria-hidden="true">←</span></button>
          <button type="button" className="city-card-arrow next" aria-label={listingCopy.next(listing.title)} onClick={() => move(1)}><span aria-hidden="true">→</span></button>
        </div>
        <div className="gallery-thumbs">
          {listing.images.map((name, i) => (
            <button key={name + i} type="button" aria-label={`Show image ${i + 1} of ${count}`} aria-current={i === index} onClick={() => setIndex(i)}>
              <ResponsiveImage name={name} alt="" width={listingImages[name].width} height={listingImages[name].height} sizes="120px" />
            </button>
          ))}
        </div>
      </div>
      <div className="detail-blocks">
        <section aria-labelledby="info-title" className="detail-card">
          <h2 id="info-title">{copy.propertyInfo}</h2>
          <ul>
            {listing.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
            <li>{listingCopy.specs(listing)}</li>
          </ul>
        </section>
        <section aria-labelledby="details-title" className="detail-card">
          <h2 id="details-title">{copy.details}</h2>
          {copy.detailsText.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </section>
      </div>
      <section className="narrow-form" aria-labelledby="inquiry-title">
        <h2 id="inquiry-title">{copy.inquiryTitle}</h2>
        <ContactForm eyebrow="Demo form" title="Ask about this sample" idPrefix="inquiry" />
      </section>
    </article>
  );
}
