import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
import { Wordmark } from "./Wordmark";
import { navigation } from "../../data/site";
import { CityPicker } from "../ui/CityPicker";
import { homeRevision } from "../../data/home";
export function NavigationDrawer() {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const reduced = useReducedMotion();
  const close = () => dialog.current?.close();
  return (
    <>
      <button
        className="drawer-trigger"
        aria-label="Open navigation"
        aria-expanded={open}
        aria-controls="navigation-drawer"
        onClick={() => {
          setOpen(true);
          dialog.current?.showModal();
        }}
      >
        <span aria-hidden="true">☰</span>
      </button>
      <dialog
        ref={dialog}
        id="navigation-drawer"
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = [
            ...event.currentTarget.querySelectorAll<HTMLElement>(
              "a[href], button",
            ),
          ].filter((control) => control.getClientRects().length > 0);
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onClose={() => setOpen(false)}
        className="navigation-drawer"
        aria-label="Website navigation"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const rect = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < rect.left ||
              event.clientX > rect.right ||
              event.clientY < rect.top ||
              event.clientY > rect.bottom
            )
              close();
          }
        }}
      >
        <m.div
          initial={false}
          animate={
            open && !reduced
              ? { opacity: [0, 1], x: [-12, 0] }
              : { opacity: 1, x: 0 }
          }
          transition={{ duration: reduced ? 0 : 0.18 }}
        >
          <div className="drawer-heading">
            <Wordmark />
            <button
              className="drawer-close"
              aria-label="Close navigation"
              onClick={close}
            >
              ×
            </button>
          </div>
          <nav aria-label="Drawer navigation">
            <Link to="/" onClick={close}>
              {homeRevision.homeLabel}
            </Link>
            <Link to="/explore" onClick={close}>
              {homeRevision.exploreLabel}
            </Link>
            {navigation.map((item) => (
              <Link key={item.to} to={item.to} onClick={close}>
                {item.label}
              </Link>
            ))}
            <CityPicker onChoose={close} />
          </nav>
          <p className="form-note">{homeRevision.drawerNote}</p>
        </m.div>
      </dialog>
    </>
  );
}
