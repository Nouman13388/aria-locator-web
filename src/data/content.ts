import { siteName } from "./site";
import type { City } from "./cities";
export const listingsPage = {
  title: (city: string) => `${city} apartment listings`,
  intro: "Sample homes with illustrative images and dimensions. They are not available properties.",
  searchTitle: "Search Listings",
  neighborhoods: "Neighborhoods",
  anyNeighborhood: "All neighborhoods",
  layout: "Beds & Baths",
  anyLayout: "Any layout",
  featured: "Featured",
  clear: "Clear Filters",
  empty: "No sample listings match these filters.",
  emptyHint: "Clear a filter or choose another neighborhood.",
  closingTitle: "Find your dream apartment!",
  closingText: "Tell us what a good home looks like for you and we’ll shape it into a clear brief.",
};
export const neighborhoodsPage = {
  title: (city: string) => `Neighborhoods in ${city}`,
  intro: "Sample areas to explore. Names and descriptions are fictional placeholders for a client’s real markets.",
  view: "View sample listings",
  sample: "Sample neighborhood",
};
export const conciergePage = {
  title: "Move-in made simple.",
  intro: "A demo outline of the practical help a concierge could offer around moving day. Nothing here is a live service.",
  cta: "Meet our services",
  servicesTitle: "Meet our services",
  servicesIntro: "Six ways a concierge could take a task off your list.",
  services: [
    { title: "Utilities setup", text: "A short guide to lining up power, water and internet before the keys change hands." },
    { title: "Renter protection tips", text: "Plain-language reminders about reading a lease and documenting a home’s condition." },
    { title: "Moving help", text: "A planning outline for packing, timing and the day itself." },
    { title: "Pet-friendly planning", text: "Notes on settling pets into a new space, from the first walk to the first week." },
    { title: "Cleaning", text: "A checklist for the last clean at the old place and the first one at the new." },
    { title: "Move-in checklist", text: "One list for keys, mail, parking and everything else that’s easy to forget." },
  ],
  note: "Illustrative content for a demo page. No partners or providers are named.",
  contactTitle: "Get in touch",
  contactText: "Ask about any of these topics. This is a demo form and nothing is sent.",
};
export const aboutPage = {
  title: "A home search built around everyday life.",
  intro: `${siteName} is a demo of a more thoughtful way to look for an apartment, with your preferences at the center.`,
  missionTitle: "Our mission",
  mission: "To make the search for a home feel clear, calm and personal, from the first idea to the last box.",
  setsApartTitle: "What sets us apart",
  points: [
    { title: "Clarity first", text: "Every step is written in plain language so you always know what comes next." },
    { title: "Fit over volume", text: "We care about how a home suits your routines more than how many you see." },
    { title: "Your pace", text: "Pause, revisit and change your mind whenever you like." },
  ],
};
export const processPage = {
  title: "Our process",
  intro: "Six steps from a rough idea to a place that feels like home.",
  imageAlt: "Sunlit living room with oak finishes and windows facing trees",
  steps: [
    { title: "Share your preferences", text: "Start with your timing, layout and the details that matter." },
    { title: "Choose your neighborhoods", text: "Pick the areas that fit the way you like to spend your days." },
    { title: "Review sample matches", text: "See how your brief lines up with sample homes." },
    { title: "Refine together", text: "Adjust the brief as you learn what feels right." },
    { title: "Plan your visits", text: "Line up the homes you most want to see in person." },
    { title: "Settle in", text: "Use the moving checklist so the first week is calm." },
  ],
  closingTitle: "Ready to get started?",
  closingText: "Put your preferences into words with the demo form. Nothing is sent.",
};
export const faqPage = { title: "Got questions?", intro: "Short answers about this demo.", closingTitle: "Still curious?", closingText: "Start the demo form or explore the sample listings." };
export function faqFor(city: City) {
  const areas = city.neighborhoods.slice(0, 3).map((a) => a.name).join(", ");
  return [
    { question: `What is ${siteName}?`, answer: `${siteName} is a demo of an apartment-locating experience. It shows how a search could be organized around your preferences.` },
    { question: `Is this a real service in ${city.name}?`, answer: `No. ${city.name} is one of eight placeholder markets. Nothing here is an offer, listing or booking.` },
    { question: "How do I start my brief?", answer: "Open the Get Started page and fill in the single form. It takes a few minutes and nothing is sent." },
    { question: "Do I have to choose neighborhoods now?", answer: `No. You can leave it open, or pick from sample areas such as ${areas}.` },
    { question: "What do the sample listings show?", answer: "Fictional homes with illustrative images and dimensions, so you can see how the experience would feel." },
    { question: "Are the sample homes available?", answer: "No. Every home on this site is labelled Sample and does not exist as a real rental." },
    { question: "What could Moving Concierge cover?", answer: "The demo outlines six areas: utilities, renter tips, moving help, pet planning, cleaning and a move-in checklist." },
    { question: "Is my information saved?", answer: "No. Forms in this demo validate your entries, show a confirmation and then clear everything." },
    { question: "Can I change my preferences later?", answer: "Yes. A real brief would be easy to revisit and update as your plans change." },
    { question: "Who should I ask about a real search?", answer: "This is a demo, so there is no one to contact. A live version would list real contact options." },
  ];
}
export const detailCopy = {
  crumb: (city: string) => `${city} Apartment`,
  added: "Added recently",
  copy: "Copy Link",
  copied: "Link copied",
  copyFailed: "Could not copy the link",
  propertyInfo: "Property Info",
  details: "Details",
  detailsText: [
    "This is a sample listing. Dimensions, layout and features are illustrative.",
    "For a real home, this area would explain availability, lease terms and what is included.",
  ],
  inquiryTitle: "Want more info on this listing?",
  notFoundTitle: "We couldn’t find that listing.",
};
export const legalPage = {
  title: "Legal",
  sections: [
    { id: "demo", title: "Demo disclaimer", text: `${siteName} is a demonstration website. It does not offer apartments, brokerage services or bookings, and the listings, neighborhoods and contact details on it are fictional placeholders.` },
    { id: "privacy", title: "Privacy", text: "Forms on this demo validate what you type, show a confirmation and clear it. Nothing is sent to a server, and contact details are never stored. A short note about your chosen theme and city is kept in your browser." },
    { id: "terms", title: "Terms of use", text: "Use this demo to explore the layout and flow. Please do not enter real personal information. A live service would publish its own terms here." },
  ],
  note: "Demo text for presentation only. It is not legal advice.",
};
export const accessibilityPage = {
  title: "Accessibility",
  intro: "How this demo approaches accessible design.",
  sections: [
    { title: "Keyboard", text: "Menus, galleries, accordions, pagination and forms can be used with a keyboard." },
    { title: "Motion", text: "Animations are gentle and switch off when your device asks for reduced motion." },
    { title: "Color", text: "Three themes are available from the theme button. Text and buttons are designed to keep readable contrast in each." },
    { title: "Feedback", text: "This is a demo with no staff behind it. A live site would list how to report an accessibility problem." },
  ],
};
