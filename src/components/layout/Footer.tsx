import { Link } from "@tanstack/react-router";
import { Wordmark } from "./Wordmark";
import { siteName, contact } from "../../data/site";
import { footerCopy, homeRevision } from "../../data/home";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-contact">
        <Wordmark />
        <p className="footer-email">
          {contact.email}
          <span>{contact.label}</span>
        </p>
        <div className="footer-short-links">
          <Link to="/explore">{homeRevision.exploreLabel}</Link>
          <Link to="/contact">{homeRevision.contactLabel}</Link>
        </div>
        <div className="legal-placeholders">
          {footerCopy.legal.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
        <p className="footer-note">
          © {new Date().getFullYear()} {siteName} · {footerCopy.note}
        </p>
      </div>
      <div className="footer-social">
        <span className="eyebrow">{homeRevision.socialTitle}</span>
        <div className="social-placeholders" aria-label="Social placeholders">
          {footerCopy.socials.map((label, index) => (
            <span key={label}>
              <span aria-hidden="true">{["◎", "↗", "◇"][index]}</span>
              <span className="sr-only">{label}</span>
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
