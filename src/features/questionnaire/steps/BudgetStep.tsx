import { StepInput } from "./Fields";
import type { StepProps } from "./types";
export function BudgetStep(props: StepProps) {
  return (
    <>
      <div className="form-grid">
        <StepInput
          {...props}
          name="budgetMin"
          label="Minimum monthly rent"
          type="number"
        />
        <StepInput
          {...props}
          name="budgetMax"
          label="Maximum monthly rent"
          type="number"
        />
      </div>
      <p className="form-note">
        Use the same local currency for both amounts. These are your
        preferences, not a quote.
      </p>
    </>
  );
}
