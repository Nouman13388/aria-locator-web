import { validateStep, type Answers } from "./schemas";

// URL steps are 1-based; schema indexes are 0-based.
export function getFirstInvalidStep(
  answers: Answers,
  requestedStep: number,
): number | null {
  for (let index = 0; index < requestedStep - 1; index++) {
    if (Object.keys(validateStep(index, answers)).length) return index + 1;
  }
  return null;
}
