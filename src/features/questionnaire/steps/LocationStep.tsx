import { locationChips } from "../steps";
import { StepInput, StepChoices } from "./Fields";
import type { StepProps } from "./types";
export function LocationStep(props: StepProps) {
  return (
    <>
      <StepInput
        {...props}
        name="location"
        label="City or neighborhood"
        hint="For example, your preferred city and nearby areas."
      />
      <StepChoices
        {...props}
        name="surroundings"
        label="What kind of surroundings appeal to you?"
        options={locationChips}
        multiple
        chips
      />
      <img
        src="/images/get-started-questionnaire-0.jpg"
        alt="Sunlit limestone architecture and a peaceful tree-lined street"
        style={{ height: 150, borderRadius: 8 }}
      />
    </>
  );
}
