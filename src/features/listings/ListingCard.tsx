import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ResponsiveImage } from "../../components/ui/ResponsiveImage";
import { listingImages, listingCopy, type Listing } from "../../data/listings";
import { listingHref } from "../../data/cityLinks";
export function ListingCard({ listing }: { listing: Listing }) {
  const [index, setIndex] = useState(0);
  const count = listing.images.length;
  const move = (step: number) => setIndex((index + step + count) % count);
  const image = listing.images[index];
  const meta = listingImages[image];
  return (
    <article className="city-card">
      <div
        className="city-card-photo"
        role="group"
        aria-roledescription="carousel"
        aria-label={listingCopy.imageLabel(listing.title)}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            move(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
      >
        <ResponsiveImage
          key={image}
          name={image}
          alt={meta.alt}
          width={meta.width}
          height={meta.height}
          sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1023px) 50vw, 380px"
        />
        <span className="sample-badge">{listingCopy.badge}</span>
        {listing.featured && <span className="sample-badge featured-badge">Featured</span>}
        <button type="button" className="city-card-arrow prev" aria-label={listingCopy.previous(listing.title)} onClick={() => move(-1)}>
          <span aria-hidden="true">←</span>
        </button>
        <button type="button" className="city-card-arrow next" aria-label={listingCopy.next(listing.title)} onClick={() => move(1)}>
          <span aria-hidden="true">→</span>
        </button>
        <div className="city-card-dots" aria-live="polite">
          {listing.images.map((name, i) => (
            <button key={name + i} type="button" aria-label={`Show image ${i + 1} of ${count}`} aria-current={i === index} onClick={() => setIndex(i)} />
          ))}
        </div>
      </div>
      <div className="city-card-body">
        <Link
          to="/{$city}-apartments/listings"
          params={{ city: listing.city }}
          search={{ neighborhood: listing.neighborhood }}
          className="city-card-area"
        >
          {listing.neighborhoodName}
        </Link>
        <h3>
          <Link to={listingHref(listing.city, listing.id)}>{listing.title}</Link>
        </h3>
        <p>{listingCopy.specs(listing)}</p>
        <span className="city-card-note">{listingCopy.label}</span>
      </div>
    </article>
  );
}
