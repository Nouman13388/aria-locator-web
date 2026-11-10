import { siteName } from "../data/site";
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Header, Footer } from "../components/layout/Layout";
import { NotFound } from "../components/layout/NotFound";
import { ThemeSelector, themeScript } from "../features/theme/ThemeSelector";
import { defaultTheme } from "../features/theme/themes";
import stylesheet from "../styles/app.css?url";
export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { title: `${siteName} | Apartment locating demo` },
      {
        name: "description",
        content:
          "A thoughtful apartment-locating demo. Begin with your preferences and imagine your next home.",
      },
      {
        property: "og:title",
        content: `${siteName} | Apartment locating demo`,
      },
      {
        property: "og:description",
        content:
          "A thoughtful apartment-locating demo. Begin with your preferences and imagine your next home.",
      },
      { property: "og:image", content: "/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: `${siteName} wordmark` },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    links: [
      { rel: "stylesheet", href: stylesheet },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico?v=3" },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32.png?v=3",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        href: "/icon-192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        href: "/icon-512.png",
      },
    ],
  }),
  shellComponent: Document,
  component: () => (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <ThemeSelector />
    </>
  ),
  notFoundComponent: NotFound,
});
function Document({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme={defaultTheme} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
