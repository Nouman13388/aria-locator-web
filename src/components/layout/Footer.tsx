import { Link, useRouterState } from "@tanstack/react-router";
import { Wordmark } from "./Wordmark";
import { contact, siteName } from "../../data/site";
import {
  footerColumns,
  footerDisclaimer,
  footerLegal,
  footerSocials,
} from "../../data/cityPage";
const icons = [
  <>
    <rect width="20" height="20" x="2" y="2" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <path d="M17.5 6.5h.01" />
  </>,
  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />,
  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  <>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </>,
];
const homeSocials = ["Instagram", "TikTok", "Facebook", "LinkedIn"];
function HomeFooter() {
  return (
    <footer className="site-footer site-footer--home">
      <div className="footer-main footer-main--home">
        <div className="footer-brand">
          <Wordmark />
          <p className="footer-contact-line">
            {contact.email} <span>({contact.label})</span>
          </p>
          <p className="footer-contact-line">
            {contact.phone} <span>({contact.phoneLabel})</span>
          </p>
          <ul className="footer-home-legal">
            {footerLegal.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
        </div>
        <ul className="footer-socials" aria-label="Social links (placeholders)">
          {homeSocials.map((label, i) => (
            <li key={label}>
              <a href="#" aria-label={`${label} (placeholder)`}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {icons[i]}
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="footer-legal">
        <p>
          © {new Date().getFullYear()} {siteName} · {footerDisclaimer}
        </p>
      </div>
    </footer>
  );
}
export function Footer() {
  const isHome = useRouterState({ select: (state) => state.location.pathname === "/" });
  if (isHome) return <HomeFooter />;
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Wordmark />
          <p>{footerDisclaimer}</p>
        </div>
        <nav className="footer-cols" aria-label="Footer navigation">
          {footerColumns.map((column, i) => (
            <ul key={i}>
              {column.map((item) => (
                <li key={item.label}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          ))}
        </nav>
        <ul className="footer-socials" aria-label="Social links (placeholders)">
          {footerSocials.map((label, i) => (
            <li key={label}>
              <a href="#" aria-label={label}>
                <span aria-hidden="true">{["◎", "↗", "◇"][i]}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="footer-legal">
        <ul>
          {footerLegal.map((label) => (
            <li key={label}>{label}</li>
          ))}
        </ul>
        <p>© {new Date().getFullYear()} {siteName}</p>
      </div>
    </footer>
  );
}
