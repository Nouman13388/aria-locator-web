import { useEffect, useState } from "react";
export const themeScript = `(function(){try{var t=localStorage.getItem('aria-theme');document.documentElement.dataset.theme=t==='recommended'?'recommended':'client'}catch(e){document.documentElement.dataset.theme='client'}})()`;
const themes = [
  { id: "client", label: "Client Preference" },
  { id: "recommended", label: "Recommended Design" },
] as const;
export function ThemeSelector() {
  const [theme, setTheme] = useState("client");
  const [collapsed, setCollapsed] = useState(true);
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || "client");
  }, []);
  function choose(value: string) {
    setTheme(value);
    document.documentElement.dataset.theme = value;
    try {
      localStorage.setItem("aria-theme", value);
    } catch {
      /* Storage may be disabled. */
    }
  }
  return (
    <aside
      className={`theme-dock ${collapsed ? "collapsed" : ""}`}
      aria-label="Website appearance"
    >
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
        {themes.map((t, i) => (
          <button
            key={t.id}
            role="radio"
            aria-checked={theme === t.id}
            tabIndex={theme === t.id ? 0 : -1}
            className="theme-option"
            onClick={() => choose(t.id)}
            onKeyDown={(e) => {
              if (
                [
                  "ArrowLeft",
                  "ArrowRight",
                  "ArrowUp",
                  "ArrowDown",
                  "Home",
                  "End",
                ].includes(e.key)
              ) {
                e.preventDefault();
                const n = e.key === "Home" ? 0 : e.key === "End" ? 1 : 1 - i;
                choose(themes[n].id);
                (
                  e.currentTarget.parentElement?.children[n] as HTMLElement
                ).focus();
              }
            }}
          >
            <span className="theme-dot" aria-hidden="true" />
            {t.label}
          </button>
        ))}
      </div>
    </aside>
  );
}
