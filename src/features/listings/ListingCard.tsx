import { swipeDirection } from "./swipe";
import { ResponsiveImage } from "../../components/ui/ResponsiveImage";
import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
import { reveal, revealViewport } from "../motion/reveal";
import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  listingImages,
  listingCopy,
  type SampleListing,
} from "../../data/listings";
export function ListingCard({ listing }: { listing: SampleListing }) {
  const pointer = useRef<{ x: number; y: number } | null>(null);
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
      whileHover={reduced ? undefined : { y: -2 }}
    >
      <div
        className="listing-photo"
        onPointerDown={(event) => {
          if ((event.target as Element).closest("button")) return;
          pointer.current = { x: event.clientX, y: event.clientY };
        }}
        onPointerCancel={() => {
          pointer.current = null;
        }}
        onPointerUp={(event) => {
          if (pointer.current) {
            const direction = swipeDirection(pointer.current, {
              x: event.clientX,
              y: event.clientY,
            });
            if (direction) move(direction);
          }
          pointer.current = null;
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            move(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
        role="region"
        aria-roledescription="carousel"
        aria-label={listingCopy.imageLabel(listing.title)}
      >
        <m.div
          className="listing-slide"
          key={image}
          initial={
            direction && !reduced ? { opacity: 0, x: direction * 12 } : false
          }
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: reduced ? 0 : 0.18 }}
        >
          <ResponsiveImage
            name={image}
            alt={meta.alt}
            width={meta.width}
            height={meta.height}
          />
        </m.div>
        <span className="sample-badge">{listingCopy.badge}</span>
        <p className="listing-price">
          {listing.price}
          <span>{listingCopy.priceSuffix}</span>
        </p>
        <div className="carousel-controls">
          <button
            aria-label={listingCopy.previous(listing.title)}
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
            aria-label={listingCopy.next(listing.title)}
            onClick={() => move(1)}
          >
            →
          </button>
        </div>
      </div>
      <div className="listing-body">
        <span className="listing-setting">{listing.neighborhood}</span>
        <h3>{listing.title}</h3>
        <p className="listing-specs">{listingCopy.summary(listing)}</p>
        <div className="listing-tags">
          {listing.features.map((feature) => (
            <span key={feature}>{feature}</span>
          ))}
        </div>
        <Link className="listing-link" to="/get-started" search={{ step: 1 }}>
          {listingCopy.wishList} <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </m.article>
  );
}
