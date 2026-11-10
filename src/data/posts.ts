import type { CitySlug } from "./cities";
export type Topic = "Moving" | "Neighborhoods" | "Planning" | "Pets";
export type Post = {
  slug: string;
  title: string;
  date: string;
  topic: Topic;
  location: CitySlug | "general";
  image: string;
  excerpt: string;
  body: string[];
};
export const topics: readonly Topic[] = ["Moving", "Neighborhoods", "Planning", "Pets"];
export const posts: readonly Post[] = [
  { slug: "make-a-move-in-checklist", title: "Make a move-in checklist you will actually use", date: "2026-03-04", topic: "Moving", location: "general", image: "keenest-kitchen", excerpt: "Keys, mail, parking and the little things that are easy to forget on moving day.", body: ["A good checklist is short enough to finish. Start with the three things you need on day one: keys, a place to sleep and a way to reach your new building.", "Add a second list for the first week. Mail forwarding, parking arrangements and a walk around the block fit here.", "Keep the list somewhere you already look, like your phone’s notes. Cross things off as you go."] },
  { slug: "choosing-a-neighborhood-by-routine", title: "Choosing a neighborhood by your routine", date: "2026-02-18", topic: "Neighborhoods", location: "houston", image: "keenest-exterior", excerpt: "Start with a normal Tuesday and see which streets fit around it.", body: ["Write down a typical weekday: when you leave, where you go and what you pick up on the way home.", "Match that to sample areas. A quiet block may matter more than a short commute, or the other way around.", "In this demo, the Houston areas are placeholders, but the exercise works anywhere."] },
  { slug: "planning-your-timeline", title: "Planning your timeline backwards", date: "2026-02-02", topic: "Planning", location: "general", image: "keenest-living", excerpt: "Work back from your move date to see when each step needs to happen.", body: ["Begin with the day you want to be moved in. Then count back the weeks you would like for packing and for visits.", "Leave a little slack at each stage. Plans shift, and a calm schedule is easier to adjust.", "Use the Get Started form to note your target date."] },
  { slug: "settling-a-pet-into-a-new-place", title: "Settling a pet into a new place", date: "2026-01-21", topic: "Pets", location: "austin", image: "keenest-bedroom", excerpt: "Small routines help animals feel at home in unfamiliar rooms.", body: ["Set up a familiar bed, bowl and toy first. Familiar smells make a new room feel less strange.", "Walk the neighborhood together in the first days so the new streets become routine.", "Keep the first week predictable: the same times for meals and walks."] },
  { slug: "reading-a-sample-listing", title: "How to read a sample listing", date: "2026-01-09", topic: "Planning", location: "dallas", image: "keenest-living", excerpt: "Layout, light and storage tell you more than a headline photo.", body: ["Look at the bed and bath count first, then the square footage. It helps you picture how rooms flow.", "Check the gallery for natural light and storage. Those two details shape daily life more than most features.", "Remember that every home in this demo is fictional and labelled Sample."] },
  { slug: "a-calm-first-week", title: "A calm first week in a new apartment", date: "2025-12-15", topic: "Moving", location: "san-antonio", image: "keenest-bedroom", excerpt: "Unpack in layers so the home feels usable fast.", body: ["Unpack the bedroom and bathroom first. Having those ready makes the first night easy.", "Then the kitchen essentials. Leave decorations for later.", "Take ten minutes each evening to note what is missing and add it to a short list."] },
];
export const postBySlug = (slug: string) => posts.find((post) => post.slug === slug);
export const postDate = (date: string) =>
  new Date(date + "T12:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
