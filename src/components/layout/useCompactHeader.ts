import { useSyncExternalStore } from "react";
function subscribe(listener: () => void) {
  window.addEventListener("scroll", listener, { passive: true });
  return () => window.removeEventListener("scroll", listener);
}
export const useCompactHeader = () =>
  useSyncExternalStore(
    subscribe,
    () => window.scrollY > 64,
    () => false,
  );
