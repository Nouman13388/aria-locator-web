import { Link, useRouterState } from "@tanstack/react-router";
import { AnnouncementBar } from "./AnnouncementBar";
import { useCompactHeader } from "./useCompactHeader";
import { Wordmark } from "./Wordmark";
import { NavigationDrawer } from "./NavigationDrawer";
import { CityPicker } from "../ui/CityPicker";
import { contact } from "../../data/site";
import { homeNav, mainNav } from "../../data/cityLinks";
import { useCityScope } from "../../features/city/useCityScope";
import { actions } from "../../data/actions";
import { HeaderMore } from "./HeaderMore";
import { ButtonLink } from "../ui/Button";
export function Header() {
  const compact = useCompactHeader();
  const slug = useCityScope();
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
                  {homeNav(slug).map((item) => (
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
                {mainNav(slug).map((item) => (
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
