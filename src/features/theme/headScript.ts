import { themes, resolveTheme, type ThemeDefinition } from "./themes";
function initializeThemes(
  registry: readonly ThemeDefinition[],
  resolve: typeof resolveTheme,
) {
  let stored = null;
  try {
    stored = localStorage.getItem("aria-theme");
  } catch {
    /* The default theme also works without browser storage. */
  }
  const id = resolve(stored, registry);
  document.documentElement.dataset.theme = id;
  const selected = registry.find((theme) => theme.id === id)!;
  for (const file of new Set([selected.personality.fontFile, "inter"])) {
    const font = document.createElement("link");
    font.rel = "preload";
    font.as = "font";
    font.type = "font/woff2";
    font.crossOrigin = "anonymous";
    font.href = `/fonts/${file}-latin-wght-normal.woff2`;
    document.head.appendChild(font);
  }
}
export const themeScript = `(${initializeThemes.toString()})(${JSON.stringify(themes)},${resolveTheme.toString()});`;
