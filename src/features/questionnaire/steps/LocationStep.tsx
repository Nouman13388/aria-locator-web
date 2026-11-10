import { ResponsiveImage } from "../../../components/ui/ResponsiveImage";
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
      <ResponsiveImage
        name="keenest-exterior"
        alt="Daytime apartment exterior with glass balconies and street greenery"
        width={1376}
        height={768}
        className="location-image"
      />
    </>
  );
}
