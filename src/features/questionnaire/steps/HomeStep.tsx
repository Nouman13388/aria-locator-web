import { Textarea } from "../../../components/ui/Input";
import { mustHaveOptions } from "../steps";
import { StepChoices } from "./Fields";
import type { StepProps } from "./types";
export function HomeStep(props: StepProps) {
  return (
    <>
      <StepChoices
        {...props}
        name="bedrooms"
        label="Bedrooms"
        options={["Studio", "1", "2", "3", "4+"]}
      />
      <StepChoices
        {...props}
        name="bathrooms"
        label="Bathrooms"
        options={["1", "1.5", "2", "3+"]}
      />
      <StepChoices
        {...props}
        name="mustHaves"
        label="Must-haves"
        options={mustHaveOptions}
        multiple
      />
      <Textarea
        id="notes"
        label="Anything else that matters? (optional)"
        value={props.answers.notes}
        maxLength={500}
        onChange={(e) => props.update("notes", e.target.value)}
        error={props.errors.notes}
      />
    </>
  );
}
