import type { CitySlug } from "./cities";
export const citySections = [
  { key: "listings", label: "Listings" },
  { key: "neighborhoods", label: "Neighborhoods" },
  { key: "concierge", label: "Moving Concierge" },
  { key: "about-us", label: "About Us" },
  { key: "our-process", label: "Our Process" },
  { key: "faq", label: "FAQ" },
  { key: "get-started", label: "Get Started" },
] as const;
export type CitySection = (typeof citySections)[number]["key"];
export const cityHome = (slug: CitySlug | string) => `/${slug}-apartments`;
export const cityHref = (slug: CitySlug | string, section: CitySection) =>
  `${cityHome(slug)}/${section}`;
export const listingHref = (slug: CitySlug | string, id: string) =>
  `/${slug}-apartment/${id}`;
export const sectionLabel = (section: CitySection) =>
  citySections.find((item) => item.key === section)!.label;
// Old global routes and the scoped section each one now redirects to.
export const legacyRedirects = {
  "/listings": "listings",
  "/neighborhoods": "neighborhoods",
  "/moving-concierge": "concierge",
  "/about": "about-us",
  "/how-it-works": "our-process",
  "/faq": "faq",
  "/get-started": "get-started",
  "/explore": "listings",
  "/contact": "get-started",
} as const satisfies Record<string, CitySection>;
export const mainNav = (slug: string) => [
  { to: cityHref(slug, "listings"), label: "Listings" },
  { to: cityHref(slug, "neighborhoods"), label: "Neighborhoods" },
  { to: cityHref(slug, "concierge"), label: "Moving Concierge" },
];
export const moreNav = (slug: string) => [
  { to: cityHref(slug, "about-us"), label: "About Us" },
  { to: cityHref(slug, "our-process"), label: "Our Process" },
  { to: "/blog", label: "Blog" },
  { to: cityHref(slug, "faq"), label: "FAQ" },
];
export const homeNav = (slug: string) => [
  { to: cityHref(slug, "about-us"), label: "About" },
  { to: cityHref(slug, "faq"), label: "FAQ" },
];
export const drawerNav = (slug: string) => [
  { to: cityHome(slug), label: "City home" },
  ...citySections.map((item) => ({ to: cityHref(slug, item.key), label: item.label })),
  { to: "/blog", label: "Blog" },
];
export const footerColumns = (slug: string) => [
  [
    { to: cityHref(slug, "listings"), label: "Listings" },
    { to: cityHref(slug, "neighborhoods"), label: "Neighborhoods" },
    { to: cityHref(slug, "concierge"), label: "Moving Concierge" },
    { to: "/sitemap", label: "Sitemap" },
  ],
  [
    { to: cityHref(slug, "our-process"), label: "Our Process" },
    { to: cityHref(slug, "faq"), label: "FAQ" },
    { to: cityHref(slug, "about-us"), label: "About Us" },
    { to: "/blog", label: "Blog" },
  ],
];
export const legalLinks = [
  { to: "/legal", label: "Legal" },
  { to: "/accessibility", label: "Accessibility" },
];
