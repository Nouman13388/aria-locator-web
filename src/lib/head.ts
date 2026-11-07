import faviconTemplate from "../assets/favicon.svg?raw";
import { siteName, wordmarkParts } from "../data/site";
export const pageHead = (title: string, description: string) => ({
  meta: [
    { title: `${title} | ${siteName}` },
    { name: "description", content: description },
  ],
});

export const faviconHref = `data:image/svg+xml,${encodeURIComponent(faviconTemplate.replace("{{wordmark}}", wordmarkParts.name))}`;
