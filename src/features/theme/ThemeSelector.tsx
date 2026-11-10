import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { themes, themeSelectionCSS } from "./themes";
import { subscribe, getSnapshot, getServerSnapshot, choose } from "./store";
export { themeScript } from "./headScript";
// Fixed bottom-left, collapsed to a small button so it never covers the hero.
export function ThemeSelector() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);
  return (
    <aside ref={root} className="theme-fab" aria-label="Website appearance">
      <style>{themeSelectionCSS}</style>
      <button
        ref={toggle}
        type="button"
        className="theme-fab-toggle"
        aria-expanded={open}
        aria-controls="theme-options"
        aria-label="Choose website theme"
        onClick={() => setOpen(!open)}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" />
        </svg>
      </button>
      <div id="theme-options" hidden={!open} className="theme-options" role="radiogroup" aria-label="Color theme">
        {themes.map((item, index) => (
          <button
            key={item.id}
            role="radio"
            data-theme-choice={item.id}
            aria-checked={theme === item.id}
            tabIndex={theme === item.id ? 0 : -1}
            className="theme-option"
            onClick={() => {
              choose(item.id);
              setOpen(false);
              toggle.current?.focus();
            }}
            onKeyDown={(event) => {
              if (
                !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)
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
                ?.querySelector<HTMLElement>(`[data-theme-choice="${themes[next].id}"]`)
                ?.focus();
            }}
          >
            <svg className="theme-swatches" viewBox="0 0 26 16" aria-hidden="true">
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
