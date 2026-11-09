import { siteName } from "../data/site";
export const pageHead = (title: string, description: string) => ({
  meta: [
    { title: `${title} | ${siteName}` },
    { name: "description", content: description },
  ],
});
