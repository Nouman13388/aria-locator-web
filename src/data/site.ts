export const siteName = "Kee Nest";
export const wordmarkParts = {
  name: siteName.toUpperCase(),
  parts: siteName.toUpperCase().split(" "),
  descriptor: "Apartment locating",
};

export const navigation = [
  { to: "/listings", label: "Listings" },
  { to: "/neighborhoods", label: "Neighborhoods" },
  { to: "/moving-concierge", label: "Moving Concierge" },
  { to: "/how-it-works", label: "Process" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];
export const process = [
  {
    title: "Share your preferences",
    text: "Start with the essentials: your ideal area, move-in plans, budget, and the details that make a space feel like home.",
  },
  {
    title: "Get personalized matches",
    text: "A clear brief helps a locator compare layouts, amenities, and practical needs with what matters to you.",
  },
  {
    title: "Explore your options",
    text: "Use your preferences to guide a thoughtful search. In a live service, you would review options and arrange visits with a locator.",
  },
];
export const principles = [
  {
    title: "Thoughtful curation",
    text: "Start with what matters to you. A good search makes room for both everyday needs and the feeling of a space.",
  },
  {
    title: "Clarity at every step",
    text: "Keep preferences, questions, and decisions easy to understand, from the first brief to the next conversation.",
  },
  {
    title: "Room for real life",
    text: "Consider the practical details: pets, parking, commute, accessibility, and the rhythm of your day.",
  },
  {
    title: "Your preferences, your pace",
    text: "A search can evolve. Revisit your priorities and make considered choices as you learn what feels right.",
  },
];
export const contact = {
  email: "hello@example.com",
  label: "Demo email address",
  phone: "(555) 010-0100",
  phoneLabel: "Demo phone",
  hours: "Mon–Fri, 9am–5pm",
  hoursLabel: "Demo hours",
};
// shortcut: no production origin yet, so canonical URLs stay path-relative; set this when the domain is known.
export const siteUrl = "";

export const announcementStorageKey = "keenest-announcement-dismissed";

export const headerNavigation = [
  { to: "/listings", label: "Listings" },
  { to: "/neighborhoods", label: "Neighborhoods" },
  { to: "/moving-concierge", label: "Moving Concierge" },
] as const;
export const headerMoreNavigation = [
  { to: "/about", label: "About" },
  { to: "/how-it-works", label: "Process" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;
export const homeNavigation = [
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
] as const;
