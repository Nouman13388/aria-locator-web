import type { ReactNode } from "react";
export function Section({
  children,
  band = false,
  id,
}: {
  children: ReactNode;
  band?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className={`section ${band ? "band" : ""}`}>
      <div className="wrap">{children}</div>
    </section>
  );
}
export function Intro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="wrap">
      <div className="page-intro">
        <span className="eyebrow accent">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{children}</p>
      </div>
    </div>
  );
}
