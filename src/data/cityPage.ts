import { siteName } from "./site";
import type { City } from "./cities";
import { cityPageHead } from "../lib/cityHead";
export const cityHead = (city: City) =>
  cityPageHead(
    city,
    undefined,
    `${city.name} apartments (demo)`,
    `A demo landing page for ${city.name}: explore sample neighborhoods and fictional listings, then try the ${siteName} get-started form. Nothing is sent.`,
  );
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
      section: "neighborhoods" as const,
    },
    {
      title: "Get matched",
      text: "See how your preferences line up with sample homes and areas.",
      link: "Browse listings",
      section: "listings" as const,
    },
    {
      title: "Move-in support",
      text: "Plan the practical side of moving day, one checklist at a time.",
      link: "Meet Moving Concierge",
      section: "concierge" as const,
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
export const footerSocials = ["Social profile one", "Social profile two", "Social profile three"];
export const footerDisclaimer = "Demo website. No real inquiries, listings or bookings.";
