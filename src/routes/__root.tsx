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
import { faviconHref } from "../lib/head";
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
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    links: [
      { rel: "stylesheet", href: stylesheet },
      { rel: "icon", type: "image/svg+xml", href: faviconHref },
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
