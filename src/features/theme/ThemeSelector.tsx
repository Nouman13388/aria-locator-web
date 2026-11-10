import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { themes, themeSelectionCSS } from "./themes";
import { subscribe, getSnapshot, getServerSnapshot, choose } from "./store";
export { themeScript } from "./headScript";
export function ThemeSelector() {
  const reduced = useReducedMotion();
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [open, setOpen] = useState(false);
  const dock = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    function outside(event: PointerEvent) {
      if (event.target instanceof Node && !dock.current?.contains(event.target))
        setOpen(false);
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);
  function select(value: string) {
    choose(value);
    setOpen(false);
    if (window.matchMedia("(max-width: 640px)").matches)
      toggle.current?.focus();
  }
  return (
    <aside
      ref={dock}
      className={`theme-dock ${open ? "expanded" : "collapsed"}`}
      aria-label="Website appearance"
    >
      <style>{themeSelectionCSS}</style>
      <button
        ref={toggle}
        className="theme-toggle"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="theme-options"
        aria-label="Choose website theme"
      >
        ◐
      </button>
      <span className="dock-label">THEME</span>
      <m.div
        initial={false}
        animate={
          open && !reduced
            ? { opacity: [0, 1], y: [8, 0] }
            : { opacity: 1, y: 0 }
        }
        id="theme-options"
        className="theme-options"
        role="radiogroup"
        aria-label="Color theme"
      >
        {themes.map((item, index) => (
          <button
            key={item.id}
            role="radio"
            data-theme-choice={item.id}
            aria-checked={theme === item.id}
            tabIndex={theme === item.id ? 0 : -1}
            className="theme-option"
            onClick={() => select(item.id)}
            onKeyDown={(event) => {
              if (
                ![
                  "ArrowLeft",
                  "ArrowRight",
                  "ArrowUp",
                  "ArrowDown",
                  "Home",
                  "End",
                ].includes(event.key)
              )
                return;
              event.preventDefault();
              const direction =
                event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1;
              const next =
                event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? themes.length - 1
                    : (index + direction + themes.length) % themes.length;
              choose(themes[next].id);
              event.currentTarget.parentElement
                ?.querySelector<HTMLElement>(
                  `[data-theme-choice="${themes[next].id}"]`,
                )
                ?.focus();
            }}
          >
            <svg
              className="theme-swatches"
              viewBox="0 0 26 16"
              aria-hidden="true"
            >
              <circle cx="8" cy="8" r="6" fill={item.swatch[0]} />
              <circle cx="18" cy="8" r="6" fill={item.swatch[1]} />
            </svg>
            {item.label}
          </button>
        ))}
      </m.div>
    </aside>
  );
}
