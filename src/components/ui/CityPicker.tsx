import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Link } from "@tanstack/react-router";
import { CITIES, cityPickerCopy } from "../../data/cities";
import {
  getSavedCity,
  getServerCity,
  saveCity,
  subscribeCity,
} from "../../features/listings/cityPreference";
export function CityPicker({
  variant = "header",
  onChoose,
}: {
  variant?: "header" | "hero";
  onChoose?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = useSyncExternalStore(
    subscribeCity,
    getSavedCity,
    getServerCity,
  );
  const reduced = useReducedMotion();
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = (returnFocus = false) => {
    setOpen(false);
    if (returnFocus) trigger.current?.focus();
  };
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target))
        close();
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);
  return (
    <div
      ref={root}
      className={`city-picker city-picker--${variant} ${open ? "is-open" : ""}`}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) close();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          event.stopPropagation();
          close(true);
        }
        if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
          event.preventDefault();
          setOpen(true);
          const links = [
            ...(root.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []),
          ];
          const current = links.indexOf(
            document.activeElement as HTMLAnchorElement,
          );
          const next =
            event.key === "Home"
              ? 0
              : event.key === "End"
                ? CITIES.length - 1
                : event.key === "ArrowUp"
                  ? (current < 0 ? 0 : current) - 1
                  : current + 1;
          requestAnimationFrame(() =>
            links[(next + links.length) % links.length]?.focus(),
          );
        }
      }}
    >
      <button
        ref={trigger}
        type="button"
        className="button city-trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
      >
        {cityPickerCopy.trigger}
        <span className="city-chevron" aria-hidden="true">
          ⌄
        </span>
      </button>
      <m.div
        hidden={!open}
        className="city-options"
        initial={false}
        animate={
          open && !reduced
            ? { opacity: [0, 1], scale: [0.98, 1] }
            : { opacity: 1, scale: 1 }
        }
        transition={{ duration: reduced ? 0 : 0.16 }}
      >
        <p>{cityPickerCopy.note}</p>
        <nav id={id} role="menu" aria-label={cityPickerCopy.panel}>
          {CITIES.map((city) => (
            <Link
              key={city.slug}
              role="menuitem"
              to="/explore"
              search={{ city: city.slug }}
              data-selected={selected === city.slug || undefined}
              onClick={() => {
                saveCity(city.slug);
                close(true);
                onChoose?.();
              }}
            >
              <span>
                <strong>{city.name}</strong>
                <span className="city-blurb">{city.blurb}</span>
              </span>
              {selected === city.slug && (
                <span className="city-selected">
                  <span aria-hidden="true">✓</span>
                  <span className="sr-only">{cityPickerCopy.selected}</span>
                </span>
              )}
            </Link>
          ))}
        </nav>
      </m.div>
    </div>
  );
}
