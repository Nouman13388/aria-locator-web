import { actions, ctaCopy } from "../../data/actions";
import { Link } from "@tanstack/react-router";
import { navigation } from "../../data/site";
import { ButtonLink } from "../ui/Button";
export function Wordmark() {
  return (
    <Link to="/" className="brand" aria-label="Aria home">
      <span className="wordmark">ARIA</span>
      <span className="brand-tag">◆ Apartment locating</span>
    </Link>
  );
}
export function Header() {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Wordmark />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((n) => (
            <Link key={n.to} to={n.to} activeProps={{ "aria-current": "page" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <ButtonLink>
          {actions.getStarted} <span aria-hidden="true">↗</span>
        </ButtonLink>
        <details className="mobile-menu">
          <summary aria-label="Navigation menu">☰</summary>
          <nav aria-label="Mobile navigation">
            {navigation.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={(e) =>
                  e.currentTarget.closest("details")?.removeAttribute("open")
                }
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <Wordmark />
            <p>
              A thoughtful approach to finding your next home. Space for your
              preferences. Room for your next chapter.
            </p>
          </div>
          <div className="footer-links">
            <div>
              <span className="eyebrow muted">Discover</span>
              {navigation.slice(0, 3).map((n) => (
                <Link key={n.to} to={n.to}>
                  {n.label}
                </Link>
              ))}
            </div>
            <div>
              <span className="eyebrow muted">Let’s begin</span>
              <Link to="/get-started">{actions.findSpaceFooter}</Link>
              <Link to="/contact">{actions.contact}</Link>
              <span className="form-note">
                hello@example.com
                <br />
                Demo email address
              </span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Aria</span>
          <span>Demo website · No real inquiries or bookings</span>
        </div>
      </div>
    </footer>
  );
}
export function CTA() {
  return (
    <div className="cta">
      <span className="eyebrow">{ctaCopy.eyebrow}</span>
      <h2>
        {ctaCopy.title}
        <br />
        <em>{ctaCopy.emphasis}</em>
      </h2>
      <p>{ctaCopy.description}</p>
      <div className="actions actions-center">
        <ButtonLink variant="light">
          {actions.findSpace} <span aria-hidden="true">↗</span>
        </ButtonLink>
      </div>
      <p className="form-note cta-note">{ctaCopy.note}</p>
    </div>
  );
}
