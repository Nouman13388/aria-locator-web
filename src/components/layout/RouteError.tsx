import { actions } from "../../data/actions";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { Button, ButtonLink } from "../ui/Button";
export function RouteError({ reset }: ErrorComponentProps) {
  return (
    <div className="wrap section center" role="alert">
      <span className="eyebrow accent">A moment to reset</span>
      <h1>Something didn’t go as planned.</h1>
      <p>Please try again, or head home to continue exploring.</p>
      <div className="actions">
        <Button onClick={reset}>{actions.tryAgain}</Button>
        <ButtonLink to="/" variant="secondary">
          {actions.backHome}
        </ButtonLink>
      </div>
    </div>
  );
}
