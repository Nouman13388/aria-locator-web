import { StepInput, StepChoices } from "./Fields";
import type { StepProps } from "./types";
export function MoveInStep(props: StepProps) {
  return (
    <>
      <StepInput
        {...props}
        name="moveDate"
        label="Target move-in date"
        type="date"
      />
      <StepChoices
        {...props}
        name="flexibility"
        label="How flexible is your date?"
        options={["Exact date", "±2 weeks", "Flexible"]}
      />
    </>
  );
}
