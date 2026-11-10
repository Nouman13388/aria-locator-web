import { Link, useRouterState } from "@tanstack/react-router";
import { AnnouncementBar } from "./AnnouncementBar";
import { useCompactHeader } from "./useCompactHeader";
import { Wordmark } from "./Wordmark";
import { NavigationDrawer } from "./NavigationDrawer";
import { CityPicker } from "../ui/CityPicker";
import { contact, headerNavigation, homeNavigation } from "../../data/site";
import { actions } from "../../data/actions";
import { HeaderMore } from "./HeaderMore";
import { ButtonLink } from "../ui/Button";
export function Header() {
  const compact = useCompactHeader();
  const isHome = useRouterState({ select: (state) => state.location.pathname === "/" });
  return (
    <>
      <AnnouncementBar />
      <div className={`header-slot ${compact ? "compact" : ""} ${isHome ? "is-home" : ""}`}>
        <header className="site-header">
          <div className="header-inner">
            <div className="header-brand-group">
              <NavigationDrawer />
              <Wordmark />
            </div>
            {isHome ? (
              <>
                <nav className="home-links" aria-label="Main navigation">
                  {homeNavigation.map((item) => (
                    <Link key={item.label} to={item.to}>
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <CityPicker />
              </>
            ) : (
              <>
            <div className="header-desktop">
              <nav className="header-links" aria-label="Main navigation">
                {headerNavigation.map((item) => (
                  <Link key={item.label} to={item.to}>
                    {item.label}
                  </Link>
                ))}
                <HeaderMore />
              </nav>
              <CityPicker />
              <div className="header-contact">
                <span>{contact.phone}</span>
                <span>{contact.phoneLabel}</span>
              </div>
            </div>
            <div className="header-start">
              <ButtonLink>{actions.startNow}</ButtonLink>
            </div>
              </>
            )}
          </div>
        </header>
      </div>
    </>
  );
}
