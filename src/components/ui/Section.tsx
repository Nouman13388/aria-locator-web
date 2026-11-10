import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
import { reveal, revealViewport } from "../../features/motion/reveal";
import type { ReactNode } from "react";
export function Section({
  children,
  band = false,
  id,
  animate = false,
}: {
  children: ReactNode;
  band?: boolean;
  id?: string;
  animate?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <m.section
      id={id}
      className={`section ${band ? "band" : ""}`}
      initial={false}
      whileInView={animate && !reduced ? reveal : undefined}
      viewport={revealViewport}
    >
      <div className="wrap">{children}</div>
    </m.section>
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
