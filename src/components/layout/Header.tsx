import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Wordmark } from "./Wordmark";
import { ButtonLink } from "../ui/Button";
import { navigation } from "../../data/site";

export function Header() {
  const [notice, setNotice] = useState(true);
  const [more, setMore] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const mobile = useRef<HTMLDetailsElement>(null);
  const mobileTrigger = useRef<HTMLElement>(null);
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
      {notice && (
        <aside className="announcement" aria-label="Demo notice">
          <div className="wrap announcement-inner">
            <p>
              <strong>Demo</strong> Explore the experience. No inquiries are
              sent.
            </p>
            <button
              aria-label="Dismiss demo notice"
              onClick={() => setNotice(false)}
            >
              ×
            </button>
          </div>
        </aside>
      )}
      <header className="site-header">
        <div className="wrap header-inner">
          <Wordmark />
          <nav className="desktop-nav" aria-label="Main navigation">
            <Link to="/listings">Listings</Link>
            <Link to="/listings" search={{ setting: "green" }}>
              Neighborhoods
            </Link>
            <Link to="/how-it-works">How It Works</Link>
            <div
              className="nav-more"
              ref={menu}
              onKeyDown={(e) => {
                const links = [...(menu.current?.querySelectorAll("a") ?? [])];
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
                        ? links.length - 1
                        : index + (e.key === "ArrowUp" ? -1 : 1),
                  );
                }
              }}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) setMore(false);
              }}
            >
              <button
                ref={trigger}
                aria-expanded={more}
                aria-controls="more-navigation"
                onClick={() => setMore(!more)}
              >
                More <span aria-hidden="true">⌄</span>
              </button>
              {more && (
                <div id="more-navigation" className="nav-dropdown">
                  {navigation.slice(2).map((n) => (
                    <Link key={n.to} to={n.to} onClick={() => setMore(false)}>
                      {n.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>
          <ButtonLink>
            Get Started <span aria-hidden="true">↗</span>
          </ButtonLink>
          <details
            className="mobile-menu"
            ref={mobile}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                mobile.current?.removeAttribute("open");
                mobileTrigger.current?.focus();
              }
            }}
          >
            <summary ref={mobileTrigger} aria-label="Navigation menu">
              ☰
            </summary>
            <nav aria-label="Mobile navigation">
              {navigation.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => mobile.current?.removeAttribute("open")}
                >
                  {n.label}
                </Link>
              ))}
              <Link
                to="/listings"
                search={{ setting: "green" }}
                onClick={() => mobile.current?.removeAttribute("open")}
              >
                Neighborhoods
              </Link>
            </nav>
          </details>
        </div>
      </header>
    </>
  );
}
