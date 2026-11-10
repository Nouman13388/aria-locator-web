import { themes, resolveTheme, type ThemeDefinition } from "./themes";
import { announcementStorageKey } from "../../data/site";
function initializeThemes(
  registry: readonly ThemeDefinition[],
  resolve: typeof resolveTheme,
  noticeKey: string,
) {
  let stored = null;
  try {
    stored = localStorage.getItem("keenest-theme");
  } catch {
    /* Use the default when storage is unavailable. */
  }
  document.documentElement.dataset.theme = resolve(stored, registry);
  try {
    if (sessionStorage.getItem(noticeKey) === "1")
      document.documentElement.dataset.demoNotice = "dismissed";
  } catch {
    /* The notice remains visible without storage. */
  }
}
export const themeScript = `(${initializeThemes.toString()})(${JSON.stringify(themes)},${resolveTheme.toString()},${JSON.stringify(announcementStorageKey)});`;
