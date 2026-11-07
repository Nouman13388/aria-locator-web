import { useState, useSyncExternalStore } from "react";
import {
  defaultTheme,
  resolveTheme,
  themes,
  themeSelectionCSS,
} from "./themes";
export { themeScript } from "./headScript";
const themeEvent = "aria-theme-change";
function subscribe(listener: () => void) {
  window.addEventListener(themeEvent, listener);
  return () => window.removeEventListener(themeEvent, listener);
}
function getSnapshot() {
  const extras = document.documentElement.dataset.themes === "all";
  return `${resolveTheme(document.documentElement.dataset.theme, extras)}|${extras}`;
}
const getServerSnapshot = () => `${defaultTheme}|false`;
export function ThemeSelector() {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const [theme, flag] = snapshot.split("|");
  const extras = flag === "true";
  const visible = themes.filter((item) => extras || !item.extra);
  const [collapsed, setCollapsed] = useState(true);
  function choose(value: string) {
    document.documentElement.dataset.theme = resolveTheme(value, extras);
    window.dispatchEvent(new Event(themeEvent));
    try {
      localStorage.setItem(
        "aria-theme",
        document.documentElement.dataset.theme,
      );
    } catch {
      /* Storage may be disabled. */
    }
  }
  return (
    <aside
      className={`theme-dock ${collapsed ? "collapsed" : ""}`}
      aria-label="Website appearance"
    >
      <style>{themeSelectionCSS}</style>
      <button
        className="theme-toggle"
        onClick={() => setCollapsed(!collapsed)}
        aria-expanded={!collapsed}
        aria-label="Choose website theme"
      >
        ◐
      </button>
      <span className="dock-label">THEME</span>
      <div className="theme-options" role="radiogroup" aria-label="Color theme">
        {themes.map((item) => (
          <button
            key={item.id}
            role="radio"
            data-extra-theme={item.extra || undefined}
            data-theme-choice={item.id}
            aria-checked={theme === item.id}
            tabIndex={theme === item.id ? 0 : -1}
            className="theme-option"
            onClick={() => choose(item.id)}
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
              const index = visible.findIndex(
                (option) => option.id === item.id,
              );
              const direction =
                event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1;
              const next =
                event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? visible.length - 1
                    : (index + direction + visible.length) % visible.length;
              choose(visible[next].id);
              event.currentTarget.parentElement
                ?.querySelector<HTMLElement>(
                  `[data-theme-choice="${visible[next].id}"]`,
                )
                ?.focus();
            }}
          >
            <span className="theme-dot" aria-hidden="true" />
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
