import { amenityOptions } from "../steps";
import { StepChoices } from "./Fields";
import type { StepProps } from "./types";
export function PreferencesStep(props: StepProps) {
  return (
    <>
      <StepChoices
        {...props}
        name="pets"
        label="Pets"
        options={["No pets", "Cat(s)", "Dog(s)", "Other pets"]}
      />
      <StepChoices
        {...props}
        name="parking"
        label="Parking"
        options={["Not needed", "One space", "Two or more spaces", "Flexible"]}
      />
      <StepChoices
        {...props}
        name="amenities"
        label="Amenities (optional)"
        options={amenityOptions}
        multiple
      />
    </>
  );
}
