import { actions } from "../../data/actions";
import type { Ref } from "react";
import { Button, ButtonLink } from "../../components/ui/Button";
export function Success({
  title,
  reset,
}: {
  title: Ref<HTMLHeadingElement>;
  reset: () => void;
}) {
  return (
    <div className="wrap questionnaire-shell">
      <div className="questionnaire-card success">
        <span className="success-mark" aria-hidden="true">
          ✓
        </span>
        <h1 ref={title} tabIndex={-1}>
          A thoughtful start.
        </h1>
        <p role="status">
          Demo only. No inquiry was sent, and no data was stored.
        </p>
        <p>
          Your answers and contact details have been cleared. This was a preview
          of the Aria experience.
        </p>
        <div className="actions actions-center">
          <Button onClick={reset}>{actions.tryAgain}</Button>
          <ButtonLink to="/" variant="secondary">
            {actions.backHome}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
