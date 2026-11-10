import { resolveTheme, defaultTheme } from "./themes";
const themeEvent = "keenest-theme-change";
export function subscribe(listener: () => void) {
  window.addEventListener(themeEvent, listener);
  return () => window.removeEventListener(themeEvent, listener);
}
export const getSnapshot = () =>
  resolveTheme(document.documentElement.dataset.theme);
export const getServerSnapshot = () => defaultTheme;
export function choose(value: string) {
  const id = resolveTheme(value);
  document.documentElement.dataset.theme = id;
  window.dispatchEvent(new Event(themeEvent));
  try {
    localStorage.setItem("keenest-theme", id);
  } catch {
    /* Storage may be disabled. */
  }
}
