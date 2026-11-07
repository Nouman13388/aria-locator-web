import { ButtonLink } from "../ui/Button";
export function NotFound() {
  return (
    <div className="wrap section center">
      <span className="eyebrow accent">404 · A little off the beaten path</span>
      <h1>Let’s find your way home.</h1>
      <p>This page isn’t here. Your next chapter can still start below.</p>
      <ButtonLink to="/">Back to Home</ButtonLink>
    </div>
  );
}
