import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Header, Footer } from "../components/layout/Layout";
import { ButtonLink } from "../components/ui/Button";
import { ThemeSelector, themeScript } from "../features/theme/ThemeSelector";
import stylesheet from "../styles/app.css?url";
export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { title: "Aria | Apartment locating demo" },
      {
        name: "description",
        content:
          "A thoughtful apartment-locating demo. Begin with your preferences and imagine your next home.",
      },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    links: [
      { rel: "stylesheet", href: stylesheet },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
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
  notFoundComponent: () => (
    <div className="wrap section center">
      <span className="eyebrow accent">404 · A little off the beaten path</span>
      <h1>Let’s find your way home.</h1>
      <p>This page isn’t here. Your next chapter can still start below.</p>
      <ButtonLink to="/">Back to Home</ButtonLink>
    </div>
  ),
});
function Document({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="client" suppressHydrationWarning>
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
