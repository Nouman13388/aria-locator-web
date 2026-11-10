import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ResponsiveImage } from "../../components/ui/ResponsiveImage";
import { InquiryForm } from "./InquiryForm";
import { swipeDirection } from "./swipe";
import { copyText } from "../../lib/clipboard";
import { detailCopy, modalCopy } from "../../data/content";
import { listingCopy, listingImages, type Listing } from "../../data/listings";
type Heading = "h1" | "h2";
function Gallery({ listing }: { listing: Listing }) {
  const [index, setIndex] = useState(0);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const count = listing.images.length;
  const move = (step: number) => setIndex((index + step + count) % count);
  // Warm the previous and next images so arrows feel instant.
  useEffect(() => {
    for (const step of [-1, 1]) new Image().src = `/images/${listing.images[(index + step + count) % count]}.webp`;
  }, [index, count, listing.images]);
  const image = listing.images[index];
  const meta = listingImages[image];
  return (
    <div
      className="ld-gallery"
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
      <ResponsiveImage key={image} name={image} alt={meta.alt} width={meta.width} height={meta.height} loading={index === 0 ? "eager" : "lazy"} sizes="(max-width: 900px) 100vw, 1000px" />
      <button type="button" className="city-card-arrow prev" aria-label={listingCopy.previous(listing.title)} onClick={() => move(-1)}><span aria-hidden="true">←</span></button>
      <button type="button" className="city-card-arrow next" aria-label={listingCopy.next(listing.title)} onClick={() => move(1)}><span aria-hidden="true">→</span></button>
      <span className="ld-counter" aria-live="polite">{modalCopy.imageCounter(index + 1, count)}</span>
    </div>
  );
}
// One detail view, rendered inside a ModalShell or a PageShell.
export function ListingDetail({ listing, cityName, heading: H = "h2", headingId }: { listing: Listing; cityName: string; heading?: Heading; headingId?: string }) {
  const [toast, setToast] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    const ok = await copyText(navigator.clipboard, `${window.location.origin}/${listing.city}-apartment/${listing.id}`);
    setToast(ok ? detailCopy.copied : detailCopy.copyFailed);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 2500);
  }
  return (
    <div className="ld">
      <Gallery listing={listing} />
      <div className="ld-cols">
        <div className="ld-main">
          <H id={headingId} className="ld-title">{listing.title} <span className="ld-city">· {cityName}</span></H>
          <div className="ld-price-row">
            <span className="ld-label">{modalCopy.label}</span>
            <button type="button" className="ld-copy" aria-label={detailCopy.copy} onClick={copy}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="14" height="14" x="8" y="8" rx="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            </button>
            <span role="status" className="toast">{toast}</span>
          </div>
          <p className="ld-small">{modalCopy.illustrative}</p>
          <p className="ld-area">
            <Link to="/{$city}-apartments/listings" params={{ city: listing.city }} search={{ neighborhood: listing.neighborhood }}>
              {listing.neighborhoodName}
            </Link>
          </p>
          <p className="ld-specs">
            {listing.beds === "studio" ? "Studio" : `${listing.beds}bd`} | {listing.baths}ba | {listing.size}sqft
          </p>
          <h3>{detailCopy.propertyInfo}</h3>
          <ul className="ld-features">
            {listing.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <h3>{detailCopy.details}</h3>
          {detailCopy.detailsText.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
        <aside className="ld-aside" aria-labelledby="ld-form-title">
          <div className="ld-card">
            <h3 id="ld-form-title">{modalCopy.formTitle}</h3>
            <InquiryForm />
          </div>
        </aside>
      </div>
    </div>
  );
}
