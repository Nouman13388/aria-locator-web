import { Review } from "../Review";
import { StepInput } from "./Fields";
import type { StepProps } from "./types";
export function ContactReviewStep({
  onEdit,
  ...props
}: StepProps & { onEdit: (step: number) => void }) {
  return (
    <>
      <Review answers={props.answers} onEdit={onEdit} />
      <StepInput {...props} name="name" label="Your name" />
      <StepInput {...props} name="email" label="Email address" type="email" />
      <StepInput {...props} name="phone" label="Phone number" type="tel" />
      <p className="form-note">
        Contact details stay in memory only. Refreshing this page clears them.
      </p>
    </>
  );
}
