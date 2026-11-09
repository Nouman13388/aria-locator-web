import { themes, resolveTheme, type ThemeDefinition } from "./themes";
function initializeThemes(
  registry: readonly ThemeDefinition[],
  resolve: typeof resolveTheme,
) {
  let stored = null;
  try {
    stored = localStorage.getItem("keenest-theme");
  } catch {
    /* The default theme also works without browser storage. */
  }
  document.documentElement.dataset.theme = resolve(stored, registry);
}
export const themeScript = `(${initializeThemes.toString()})(${JSON.stringify(themes)},${resolveTheme.toString()});`;
