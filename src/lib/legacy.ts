import { redirect } from "@tanstack/react-router";
import { CITIES } from "../data/cities";
import { cityHref, legacyRedirects } from "../data/cityLinks";
import { getSavedCity } from "../features/listings/cityPreference";
// Server has no saved city (localStorage throws, caught), so it falls back to the first city.
export const defaultCity = () => getSavedCity() ?? CITIES[0].slug;
export const legacyTarget = (path: keyof typeof legacyRedirects, slug = defaultCity()) =>
  cityHref(slug, legacyRedirects[path]);
export const legacy = (path: keyof typeof legacyRedirects) => ({
  beforeLoad: () => {
    throw redirect({ href: legacyTarget(path) });
  },
});
