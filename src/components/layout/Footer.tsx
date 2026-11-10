import { Link } from "@tanstack/react-router";
import { Wordmark } from "./Wordmark";
import { siteName, navigation, contact } from "../../data/site";
import { footerCopy } from "../../data/home";
import { actions } from "../../data/actions";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <Wordmark />
            <p>{footerCopy.description}</p>
            <p className="form-note">
              {contact.email}
              <br />
              {contact.label}
            </p>
            <div
              className="social-placeholders"
              aria-label="Social placeholders"
            >
              {footerCopy.socials.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          </div>
          <div className="footer-links">
            <div>
              <span className="eyebrow muted">{footerCopy.discover}</span>
              {navigation.map((item) => (
                <Link key={item.to} to={item.to}>
                  {item.label}
                </Link>
              ))}
            </div>
            <div>
              <span className="eyebrow muted">{footerCopy.begin}</span>
              <Link to="/get-started">{actions.getStarted}</Link>
              <Link to="/contact">{actions.contact}</Link>
            </div>
            <div>
              <span className="eyebrow muted">{footerCopy.about}</span>
              <p>{footerCopy.aboutText}</p>
              <Link to="/faq">{footerCopy.questions}</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {siteName}
          </span>
          <span>{footerCopy.note}</span>
        </div>
        <div className="legal-placeholders">
          {footerCopy.legal.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
