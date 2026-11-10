import { themes, resolveTheme, defaultTheme } from "./themes";
const themeEvent = "aria-theme-change";
let pendingChoice = 0;
export function subscribe(listener: () => void) {
  window.addEventListener(themeEvent, listener);
  return () => window.removeEventListener(themeEvent, listener);
}
export const getSnapshot = () =>
  resolveTheme(document.documentElement.dataset.theme);
export const getServerSnapshot = () => defaultTheme;
export async function choose(value: string) {
  const request = ++pendingChoice;
  const selected = themes.find((item) => item.id === resolveTheme(value))!;
  try {
    await document.fonts.load(`700 1em "${selected.personality.displayFont}"`);
  } catch {
    /* Keep the fallback if a local font is unavailable. */
  }
  if (request !== pendingChoice) return;
  document.documentElement.dataset.theme = selected.id;
  window.dispatchEvent(new Event(themeEvent));
  try {
    localStorage.setItem("aria-theme", selected.id);
  } catch {
    /* Storage may be disabled. */
  }
}
