import { useEffect, useRef, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
import { Wordmark } from "../../components/layout/Wordmark";
import { cityHome, cityHref } from "../../data/cityLinks";
import { detailCopy, modalCopy } from "../../data/content";
// The card that opened the modal, so focus can return to it (Safari does not focus links on click).
let opener: HTMLElement | null = null;
export const rememberOpener = (element: HTMLElement | null) => {
  opener = element;
};
export function PageShell({ city, cityName, children }: { city: string; cityName: string; children: ReactNode }) {
  return (
    <article className="wrap listing-detail">
      <nav aria-label="Breadcrumb" className="crumbs">
        <Link to={cityHome(city)}>{detailCopy.crumb(cityName)}</Link> <span aria-hidden="true">/</span>{" "}
        <Link to={cityHref(city, "listings")}>Listings</Link>
      </nav>
      {children}
    </article>
  );
}
const focusable = "a[href], button:not([disabled]), input:not([disabled]), textarea, select, summary, [tabindex]:not([tabindex='-1'])";
export function ModalShell({ labelledBy, onClose, children }: { labelledBy: string; onClose: () => void; children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const element = dialog.current!;
    const returnTo = opener ?? (document.activeElement as HTMLElement | null);
    // Lock page scroll without shifting layout when the scrollbar disappears.
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const before = { overflow: document.body.style.overflow, padding: document.body.style.paddingRight };
    document.body.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;
    if (!element.open) element.showModal(); // makes the rest of the page inert
    close.current?.focus();
    return () => {
      document.body.style.overflow = before.overflow;
      document.body.style.paddingRight = before.padding;
      if (element.open) element.close();
      if (returnTo?.isConnected) returnTo.focus({ preventScroll: true });
      opener = null;
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="listing-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key !== "Tab") return;
        const items = [...e.currentTarget.querySelectorAll<HTMLElement>(focusable)].filter((el) => el.getClientRects().length > 0);
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }}
    >
      <m.div
        className="listing-modal-panel"
        initial={{ opacity: 0, scale: reduced ? 1 : 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduced ? 0.1 : 0.15 }}
      >
        <div className="listing-modal-top">
          <button ref={close} type="button" className="modal-back" onClick={onClose}>
            <span className="modal-back-icon" aria-hidden="true">‹</span>
            <span>{modalCopy.back}</span>
          </button>
          <span className="boxed-logo"><Wordmark /></span>
        </div>
        {children}
      </m.div>
    </dialog>
  );
}
