import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { areaChoices, homeRevision } from "../../data/home";
export function AreaChooser({ hero = false }: { hero?: boolean }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const details = useRef<HTMLDetailsElement>(null);
  const trigger = useRef<HTMLElement>(null);
  const close = () => details.current?.removeAttribute("open");
  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !details.current?.contains(event.target)
      )
        close();
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, []);
  return (
    <details
      ref={details}
      onToggle={(event) => setOpen(event.currentTarget.open)}
      className={`area-chooser ${hero ? "hero-area" : ""}`}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) close();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          close();
          trigger.current?.focus();
        }
        if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
          event.preventDefault();
          const links = [...(details.current?.querySelectorAll("a") ?? [])];
          const current = links.indexOf(
            document.activeElement as HTMLAnchorElement,
          );
          if (details.current) details.current.open = true;
          const next =
            event.key === "Home"
              ? 0
              : event.key === "End"
                ? areaChoices.length - 1
                : event.key === "ArrowUp"
                  ? (current < 0 ? 0 : current) - 1
                  : current + 1;
          requestAnimationFrame(() =>
            details.current
              ?.querySelectorAll<HTMLAnchorElement>("a")
              [(next + areaChoices.length) % areaChoices.length]?.focus(),
          );
        }
      }}
    >
      <summary ref={trigger} className="button">
        {homeRevision.chooseArea}
        <span aria-hidden="true">⌄</span>
      </summary>
      <m.nav
        className="area-options"
        aria-label="Area choices"
        initial={false}
        animate={
          open && !reduced
            ? { opacity: [0, 1], y: [-6, 0] }
            : { opacity: 1, y: 0 }
        }
      >
        <p>{homeRevision.areaNote}</p>
        {areaChoices.map((item) => (
          <Link
            key={item.setting}
            to="/listings"
            search={{ beds: "any", setting: item.setting }}
            onClick={close}
          >
            {item.label}
            <span aria-hidden="true">→</span>
          </Link>
        ))}
      </m.nav>
    </details>
  );
}
