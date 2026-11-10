import { siteName, siteUrl } from "../data/site";
import { cityHome, cityHref, type CitySection } from "../data/cityLinks";
import type { City } from "../data/cities";
export function cityPageHead(
  city: City,
  section: CitySection | undefined,
  title: string,
  description: string,
  path?: string,
) {
  const url = siteUrl + (path ?? (section ? cityHref(city.slug, section) : cityHome(city.slug)));
  const full = `${title} | ${siteName}`;
  return {
    links: [{ rel: "canonical", href: url }],
    meta: [
      { title: full },
      { name: "description", content: description },
      { property: "og:title", content: full },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
    ],
  };
}
