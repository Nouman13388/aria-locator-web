import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { navigation } from "../../data/site";
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const menu = useRef<HTMLDetailsElement>(null);
  const trigger = useRef<HTMLElement>(null);
  const close = () => menu.current?.removeAttribute("open");
  return (
    <details
      className="mobile-menu"
      ref={menu}
      onToggle={(event) => setOpen(event.currentTarget.open)}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          close();
          trigger.current?.focus();
        }
      }}
    >
      <summary ref={trigger} aria-label="Navigation menu">
        ☰
      </summary>
      <m.nav
        aria-label="Mobile navigation"
        initial={false}
        animate={
          open && !reduced
            ? { opacity: [0, 1], y: [-8, 0] }
            : { opacity: 1, y: 0 }
        }
      >
        {navigation.map((item) => (
          <Link key={item.to} to={item.to} onClick={close}>
            {item.label}
          </Link>
        ))}
        <Link to="/listings" search={{ setting: "green" }} onClick={close}>
          Neighborhoods
        </Link>
      </m.nav>
    </details>
  );
}
