import type { ReactNode } from "react";
import { LazyMotion, MotionConfig } from "motion/react";
import { ThemeFade } from "./ThemeFade";
// Keep the optional animation feature download after the first paint.
const loadFeatures = () =>
  new Promise<typeof import("./domAnimation").default>((resolve, reject) => {
    const load = () =>
      import("./domAnimation").then(
        (module) => resolve(module.default),
        reject,
      );
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        if (typeof window.requestIdleCallback === "function")
          window.requestIdleCallback(load, { timeout: 250 });
        else setTimeout(load, 0);
      }),
    );
  });
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
