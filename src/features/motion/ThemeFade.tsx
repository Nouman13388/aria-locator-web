import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
export function ThemeFade() {
  const [version, setVersion] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    const fade = () => setVersion((current) => current + 1);
    window.addEventListener("keenest-theme-change", fade);
    return () => window.removeEventListener("keenest-theme-change", fade);
  }, []);
  if (!version || reduced) return null;
  return (
    <m.div
      key={version}
      className="theme-transition-veil"
      aria-hidden="true"
      initial={{ opacity: 0.12 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    />
  );
}
