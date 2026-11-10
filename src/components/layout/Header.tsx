import { useCompactHeader } from "./useCompactHeader";
import { homeLabels } from "../../data/home";
import { announcementStorageKey } from "../../data/site";
import { actions } from "../../data/actions";
import { MobileMenu } from "./MobileMenu";
import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Wordmark } from "./Wordmark";
import { ButtonLink } from "../ui/Button";
import { navigation } from "../../data/site";

export function Header() {
  const reduced = useReducedMotion();
  const compact = useCompactHeader();
  const [more, setMore] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    function close(event: PointerEvent) {
      if (event.target instanceof Node && !menu.current?.contains(event.target))
        setMore(false);
    }
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);
  function focusItem(index: number) {
    requestAnimationFrame(() => {
      const links = menu.current?.querySelectorAll<HTMLAnchorElement>("a");
      if (links?.length) links[(index + links.length) % links.length]?.focus();
    });
  }
  return (
    <>
      <aside className="announcement" aria-label="Demo notice">
        <div className="wrap announcement-inner">
          <p>{homeLabels.notice}</p>
          <button
            aria-label={homeLabels.dismissNotice}
            onClick={() => {
              document.documentElement.dataset.demoNotice = "dismissed";
              try {
                sessionStorage.setItem(announcementStorageKey, "1");
              } catch {}
            }}
          >
            ×
          </button>
        </div>
      </aside>
      <div className={`header-slot ${compact ? "compact" : ""}`}>
        <header className="site-header">
          <div className="wrap header-inner">
            <Wordmark />
            <nav className="desktop-nav" aria-label="Main navigation">
              <Link to="/listings">{navigation[0].label}</Link>
              <Link to="/listings" search={{ setting: "green" }}>
                {homeLabels.neighborhoods}
              </Link>
              <Link to="/how-it-works">How It Works</Link>
              <div
                className="nav-more"
                ref={menu}
                onKeyDown={(e) => {
                  const links = [
                    ...(menu.current?.querySelectorAll("a") ?? []),
                  ];
                  const index = links.indexOf(
                    document.activeElement as HTMLAnchorElement,
                  );
                  if (e.key === "Escape") {
                    e.preventDefault();
                    setMore(false);
                    trigger.current?.focus();
                  }
                  if (["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) {
                    e.preventDefault();
                    setMore(true);
                    focusItem(
                      e.key === "Home"
                        ? 0
                        : e.key === "End"
                          ? -1
                          : e.key === "ArrowUp"
                            ? (index < 0 ? 0 : index) - 1
                            : index + 1,
                    );
                  }
                }}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget))
                    setMore(false);
                }}
              >
                <button
                  ref={trigger}
                  aria-expanded={more}
                  aria-controls="more-navigation"
                  onClick={() => setMore(!more)}
                >
                  {homeLabels.more} <span aria-hidden="true">⌄</span>
                </button>
                {more && (
                  <m.div
                    id="more-navigation"
                    className="nav-dropdown"
                    initial={reduced ? false : { opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {navigation.slice(2).map((n) => (
                      <Link key={n.to} to={n.to} onClick={() => setMore(false)}>
                        {n.label}
                      </Link>
                    ))}
                  </m.div>
                )}
              </div>
            </nav>
            <ButtonLink>
              {actions.getStarted} <span aria-hidden="true">↗</span>
            </ButtonLink>
            <MobileMenu />
          </div>
        </header>
      </div>
    </>
  );
}
