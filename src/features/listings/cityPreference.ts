import { citySchema, type CitySlug } from "../../data/cities";
const key = "keenest-city";
const event = "keenest-city-change";
export function getSavedCity() {
  try {
    const result = citySchema.safeParse(localStorage.getItem(key));
    return result.success ? result.data : undefined;
  } catch {
    return undefined;
  }
}
export const getServerCity = () => undefined;
export function subscribeCity(listener: () => void) {
  window.addEventListener(event, listener);
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener(event, listener);
    window.removeEventListener("storage", listener);
  };
}
export function saveCity(city: CitySlug) {
  try {
    localStorage.setItem(key, city);
  } catch {
    /* Storage may be unavailable. */
  }
  window.dispatchEvent(new Event(event));
}
