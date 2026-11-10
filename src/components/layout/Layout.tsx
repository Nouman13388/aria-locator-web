import { Wordmark } from "./Wordmark";
import { siteName } from "../../data/site";
import { actions, ctaCopy } from "../../data/actions";
import { Link } from "@tanstack/react-router";
import { navigation } from "../../data/site";
import { ButtonLink } from "../ui/Button";
export { Header } from "./Header";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <Wordmark />
            <p>
              Your routines. Your wish list. Your next move. An apartment search
              begins with the way you want to live.
            </p>
          </div>
          <div className="footer-links">
            <div>
              <span className="eyebrow muted">Discover</span>
              {navigation.map((n) => (
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
            <div>
              <span className="eyebrow muted">About this demo</span>
              <p>
                Sample homes. Placeholder prices. No live matching or bookings.
              </p>
              <Link to="/faq">Questions & answers</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {siteName}
          </span>
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
        <ButtonLink appearance="light">
          {actions.findSpace} <span aria-hidden="true">↗</span>
        </ButtonLink>
        <ButtonLink to="/listings" appearance="outline-light">
          See sample listings
        </ButtonLink>
      </div>
      <p className="form-note cta-note">{ctaCopy.note}</p>
    </div>
  );
}
