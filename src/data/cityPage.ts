import { siteName, siteUrl } from "./site";
import { cityPath, type City } from "./cities";
export const cityHead = (city: City) => {
  const title = `${city.name} apartments (demo) | ${siteName}`;
  const description = `A demo landing page for ${city.name}: explore sample neighborhoods and fictional listings, then try the ${siteName} questionnaire. Nothing is sent.`;
  const url = siteUrl + cityPath(city.slug);
  return {
    links: [{ rel: "canonical", href: url }],
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
    ],
  };
};
export const cityCopy = {
  heroTitle: (name: string) => `We’ll find your next ${name} apartment.`,
  heroText:
    "Tell us how you like to live. We’ll turn it into a clear brief you can bring to any search.",
  heroCta: "Get Started",
  bubblesLabel: "Sample renter requests",
  bubbles: [
    { initial: "M", text: "Looking for a quiet 1-bed with room for a desk." },
    { initial: "J", text: "Two bedrooms, a balcony and an easy commute?" },
  ],
  howTitle: "How it works",
  howIntro: "Three small steps from a rough idea to a clear shortlist.",
  how: [
    {
      title: "Tell us your needs",
      text: "Share the layout, surroundings and routines that matter to you.",
      link: "Explore neighborhoods",
      to: "/neighborhoods",
    },
    {
      title: "Get matched",
      text: "See how your preferences line up with sample homes and areas.",
      link: "Browse listings",
      to: "/listings",
    },
    {
      title: "Move-in support",
      text: "Plan the practical side of moving day, one checklist at a time.",
      link: "Meet Moving Concierge",
      to: "/moving-concierge",
    },
  ],
  featuredTitle: (name: string) => `Sample homes in ${name}`,
  featuredNote:
    "Fictional homes with illustrative images and dimensions. They are not available properties.",
  sample: "Sample",
  sampleListing: "Sample listing",
  seeAll: "See all listings",
  whyKicker: `Why ${siteName}`,
  whyTitle: "A search that starts with you, not a spreadsheet.",
  why: [
    {
      title: "Clear by design",
      text: "Every step is plain language, so you always know what comes next.",
    },
    {
      title: "Made for real routines",
      text: "Pets, parking, light and commute count as much as square footage.",
    },
    {
      title: "Your pace",
      text: "Pause, change your mind and revisit your brief whenever you like.",
    },
  ],
  closingTitle: (name: string) => `Ready to picture your ${name} move?`,
  closingText:
    "Start the demo questionnaire and put your preferences into words. Nothing is sent.",
  learnMore: "Learn more",
  contactTitle: "Say hello",
  contactNote: "Placeholder details for this demo. Nothing here is monitored.",
  notFoundTitle: "We don’t have that city yet.",
  notFoundText: "Pick one of the demo cities below to continue.",
};
export const footerColumns = [
  [
    { to: "/listings", label: "Listings" },
    { to: "/neighborhoods", label: "Neighborhoods" },
    { to: "/moving-concierge", label: "Moving Concierge" },
    { to: "/sitemap", label: "Sitemap" },
  ],
  [
    { to: "/how-it-works", label: "Process" },
    { to: "/faq", label: "FAQ" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ],
] as const;
export const footerSocials = ["Social profile one", "Social profile two", "Social profile three"];
export const footerLegal = [
  "Privacy (placeholder)",
  "Accessibility (placeholder)",
  "Demo disclaimer",
];
export const footerDisclaimer =
  "Demo website. No real inquiries, listings or bookings.";
export const neighborhoodsPage = {
  eyebrow: "Neighborhoods",
  title: "Find the surroundings that fit your day.",
  intro:
    "Sample areas for each demo city. Names and descriptions are fictional placeholders for a client’s real markets.",
  areaNote: "Sample neighborhood",
  traits: [
    "Tree-lined streets and a nearby green space.",
    "A short walk to everyday errands and cafés.",
    "Quiet evenings with easy access to main routes.",
  ],
};
export const conciergePage = {
  eyebrow: "Moving Concierge",
  title: "Move-in support, one small task at a time.",
  intro:
    "A demo outline of the help a concierge could offer around moving day. Nothing here is a live service.",
  stepsTitle: "What the support could cover",
  steps: [
    { title: "Plan the timeline", text: "Line up notice dates, key pickup and the week you want to move." },
    { title: "Sort the logistics", text: "Keep utilities, parking and building rules in one short checklist." },
    { title: "Settle in", text: "Note the first-week tasks so the new place feels like home sooner." },
  ],
  note: "Illustrative content for a demo concierge page.",
};
export const sitemapPage = {
  eyebrow: "Sitemap",
  title: "Every page in one place.",
  intro: "All pages of this demo, including the sample city pages.",
  pages: [
    { to: "/", label: "Home" },
    { to: "/listings", label: "Listings" },
    { to: "/neighborhoods", label: "Neighborhoods" },
    { to: "/moving-concierge", label: "Moving Concierge" },
    { to: "/how-it-works", label: "Process" },
    { to: "/explore", label: "Explore" },
    { to: "/about", label: "About" },
    { to: "/faq", label: "FAQ" },
    { to: "/contact", label: "Contact" },
    { to: "/get-started", label: "Get started" },
  ],
  citiesTitle: "Demo city pages",
};
