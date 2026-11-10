import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ButtonLink } from "../../components/ui/Button";
export function PageHero({ eyebrow, title, children, action }: { eyebrow?: string; title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <header className="wrap page-hero">
      {eyebrow && <span className="eyebrow accent">{eyebrow}</span>}
      <h1>{title}</h1>
      {children && <p>{children}</p>}
      {action}
    </header>
  );
}
export function ClosingBand({ title, text, to, label = "Get Started", secondary }: { title: string; text: string; to: string; label?: string; secondary?: { to: string; label: string } }) {
  return (
    <section className="city-closing" aria-labelledby="band-title">
      <h2 id="band-title">{title}</h2>
      <p>{text}</p>
      <div className="actions actions-center">
        <ButtonLink to={to}>{label}</ButtonLink>
        {secondary && (
          <Link to={secondary.to} className="inline-link">
            {secondary.label} <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </section>
  );
}
