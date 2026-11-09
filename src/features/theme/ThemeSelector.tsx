import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  defaultTheme,
  resolveTheme,
  themes,
  themeSelectionCSS,
} from "./themes";
export { themeScript } from "./headScript";
const themeEvent = "keenest-theme-change";
function subscribe(listener: () => void) {
  window.addEventListener(themeEvent, listener);
  return () => window.removeEventListener(themeEvent, listener);
}
const getSnapshot = () => resolveTheme(document.documentElement.dataset.theme);
const getServerSnapshot = () => defaultTheme;
export function ThemeSelector() {
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
  function choose(value: string) {
    document.documentElement.dataset.theme = resolveTheme(value);
    window.dispatchEvent(new Event(themeEvent));
    try {
      localStorage.setItem(
        "keenest-theme",
        document.documentElement.dataset.theme,
      );
    } catch {
      /* Storage may be disabled. */
    }
  }
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
      <div
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
      </div>
    </aside>
  );
}
