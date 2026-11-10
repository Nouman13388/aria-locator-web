import { useEffect, useId, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
import { moreNav } from "../../data/cityLinks";
import { useCityScope } from "../../features/city/useCityScope";
import { homeLabels } from "../../data/home";
export function HeaderMore() {
  const [open, setOpen] = useState(false);
  const slug = useCityScope();
  const reduced = useReducedMotion();
  const root = useRef<HTMLDetailsElement>(null);
  const trigger = useRef<HTMLElement>(null);
  const id = useId();
  function close() {
    if (root.current) root.current.open = false;
  }
  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target))
        close();
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, []);
  return (
    <details
      ref={root}
      className="header-more"
      onToggle={(event) => setOpen(event.currentTarget.open)}
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
          if (root.current) root.current.open = true;
          const links = [
            ...(root.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []),
          ];
          const index = links.indexOf(
            document.activeElement as HTMLAnchorElement,
          );
          const next =
            event.key === "Home"
              ? 0
              : event.key === "End"
                ? links.length - 1
                : event.key === "ArrowUp"
                  ? (index < 0 ? 0 : index) - 1
                  : index + 1;
          requestAnimationFrame(() =>
            links[(next + links.length) % links.length]?.focus(),
          );
        }
      }}
    >
      <summary
        ref={trigger}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={id}
      >
        {homeLabels.more}
        <span aria-hidden="true">⌄</span>
      </summary>
      <m.div
        className="header-more-panel"
        initial={false}
        animate={
          open && !reduced
            ? { opacity: [0, 1], scale: [0.98, 1] }
            : { opacity: 1, scale: 1 }
        }
      >
        <div id={id} role="menu" aria-label={homeLabels.more}>
          {moreNav(slug).map((item) => (
            <Link key={item.to} to={item.to} role="menuitem" onClick={close}>
              {item.label}
            </Link>
          ))}
        </div>
      </m.div>
    </details>
  );
}
