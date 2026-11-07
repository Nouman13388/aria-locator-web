import { siteName } from "../data/site";
export const faqGroups = [
  {
    id: "the-service",
    title: "The service",
    items: [
      [
        "What does an apartment locator do?",
        "An apartment locator helps organize a rental search around your preferred area, timing, budget, and lifestyle. This website demonstrates how that first conversation could begin.",
      ],
      [
        "Is this a live apartment-locating service?",
        `No. ${siteName} is a demonstration website. It does not search live listings, send inquiries, make bookings, or connect you with a real locator.`,
      ],
      [
        "Can I browse available apartments here?",
        "The interior images are visual inspiration rather than available listings. No property availability is represented on this demo.",
      ],
    ],
  },
  {
    id: "your-questionnaire",
    title: "Your questionnaire",
    items: [
      [
        "What should I have ready?",
        "Think about your preferred city or neighborhood, a move-in date, the space you need, and a comfortable monthly budget. You can also include pets, parking, and amenities.",
      ],
      [
        "Can I change an answer?",
        "Yes. Use Back to revisit a step, or the Edit links in the review summary. Your answers stay available as you move between steps.",
      ],
      [
        "What happens to my information?",
        "Nothing is sent. Your non-contact preferences can be kept in this browser tab for the demo. Name, email, and phone are held only in memory and are cleared when you refresh or leave the questionnaire. Completing the demo clears its saved preferences.",
      ],
    ],
  },
  {
    id: "preferences-and-matching",
    title: "Preferences & matching",
    items: [
      [
        "How should I choose a budget?",
        "Enter a monthly rental range you feel comfortable with. A real search would also need to consider utilities, deposits, parking, and other property-specific costs separately.",
      ],
      [
        "Can I include pets and accessibility needs?",
        "Yes. Choose the relevant preferences and add any essential needs in the must-haves field. In a live search, individual property policies would still need to be confirmed.",
      ],
      [
        "What if I am flexible about location or timing?",
        "You can describe more than one area and choose a flexible move-in schedule. This helps distinguish essentials from preferences that have room to change.",
      ],
    ],
  },
];
