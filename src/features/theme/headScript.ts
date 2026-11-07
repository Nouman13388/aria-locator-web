import { themes, resolveTheme, type ThemeDefinition } from "./themes";
function initializeThemes(
  registry: readonly ThemeDefinition[],
  resolve: typeof resolveTheme,
) {
  const flag = new URLSearchParams(location.search).get("themes");
  let extras = flag === "all";
  let stored = null;
  try {
    if (flag === "all") localStorage.setItem("aria-themes-all", "1");
    else if (flag === "off") localStorage.removeItem("aria-themes-all");
    extras =
      flag === "all" ||
      (flag !== "off" && localStorage.getItem("aria-themes-all") === "1");
    stored = localStorage.getItem("aria-theme");
  } catch {
    /* The query flag also works when storage is unavailable. */
  }
  document.documentElement.dataset.theme = resolve(stored, extras, registry);
  if (extras) document.documentElement.dataset.themes = "all";
  else delete document.documentElement.dataset.themes;
}
export const themeScript = `(${initializeThemes.toString()})(${JSON.stringify(themes)},${resolveTheme.toString()});`;
