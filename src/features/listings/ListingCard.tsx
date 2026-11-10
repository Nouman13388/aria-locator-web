import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
import { reveal, revealViewport } from "../motion/reveal";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { listingImages, type SampleListing } from "../../data/listings";
export function ListingCard({ listing }: { listing: SampleListing }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const reduced = useReducedMotion();
  const image = listing.images[index];
  const meta = listingImages[image];
  function move(direction: number) {
    setDirection(direction);
    setIndex(
      (current) =>
        (current + direction + listing.images.length) % listing.images.length,
    );
  }
  return (
    <m.article
      className="listing-card"
      initial={false}
      whileInView={reduced ? undefined : reveal}
      viewport={revealViewport}
    >
      <div
        className="listing-photo"
        role="region"
        aria-roledescription="carousel"
        aria-label={`${listing.title} sample images`}
      >
        <m.img
          key={image}
          initial={
            direction && !reduced ? { opacity: 0, x: direction * 12 } : false
          }
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: reduced ? 0 : 0.18 }}
          src={`/images/${image}.webp`}
          alt={meta.alt}
          width={meta.width}
          height={meta.height}
          loading="lazy"
        />
        <span className="sample-badge">Sample listing</span>
        <p className="listing-price">
          {listing.price}
          <span> / mo · placeholder</span>
        </p>
        <div className="carousel-controls">
          <button
            aria-label={`Previous image for ${listing.title}`}
            onClick={() => move(-1)}
          >
            ←
          </button>
          <span
            className="carousel-count"
            aria-live="polite"
            aria-atomic="true"
          >
            {index + 1} / {listing.images.length}
          </span>
          <button
            aria-label={`Next image for ${listing.title}`}
            onClick={() => move(1)}
          >
            →
          </button>
        </div>
      </div>
      <div className="listing-body">
        <span className="listing-setting">
          {listing.setting} setting · fictional
        </span>
        <h3>{listing.title}</h3>
        <p className="listing-specs">
          {listing.beds === "studio" ? "Studio" : `${listing.beds} bed`} ·{" "}
          {listing.baths} bath · {listing.setting} setting
        </p>
        <div className="listing-tags">
          {listing.features.map((feature) => (
            <span key={feature}>{feature}</span>
          ))}
        </div>
        <Link className="listing-link" to="/get-started" search={{ step: 1 }}>
          Build your wish list <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </m.article>
  );
}
