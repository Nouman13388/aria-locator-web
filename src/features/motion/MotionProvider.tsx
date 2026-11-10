import type { ReactNode } from "react";
import { LazyMotion, MotionConfig } from "motion/react";
import { ThemeFade } from "./ThemeFade";
const loadFeatures = () =>
  import("./domAnimation").then((module) => module.default);
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      <LazyMotion features={loadFeatures} strict>
        {children}
        <ThemeFade />
      </LazyMotion>
    </MotionConfig>
  );
}
