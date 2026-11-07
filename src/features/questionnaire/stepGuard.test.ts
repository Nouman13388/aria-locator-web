import { test } from "node:test";
import assert from "node:assert/strict";
import { getFirstInvalidStep } from "./stepGuard";
import { initialAnswers } from "./schemas";

const validPreferences = {
  ...initialAnswers,
  location: "Preferred area",
  moveDate: "2027-01-20",
  flexibility: "Flexible",
  bedrooms: "2",
  bathrooms: "1",
  budgetMin: "1500",
  budgetMax: "2200",
  pets: "No pets",
  parking: "Not needed",
};
test("step 1 never requires a previous answer", () => {
  assert.equal(getFirstInvalidStep(initialAnswers, 1), null);
});
test("deep links with empty preferences return the first step", () => {
  for (let step = 2; step <= 6; step++)
    assert.equal(getFirstInvalidStep(initialAnswers, step), 1);
});
test("guard finds the first invalid earlier step in order", () => {
  const invalidFields = [
    "location",
    "moveDate",
    "bedrooms",
    "budgetMin",
    "pets",
  ] as const;
  for (let index = 0; index < invalidFields.length; index++) {
    const answers = {
      ...validPreferences,
      [invalidFields[index]]: "",
      phone: "",
    };
    assert.equal(getFirstInvalidStep(answers, 6), index + 1);
  }
  assert.equal(
    getFirstInvalidStep({ ...validPreferences, location: "", moveDate: "" }, 6),
    1,
  );
  assert.equal(
    getFirstInvalidStep({ ...validPreferences, budgetMin: "3000" }, 6),
    4,
  );
});
test("guard ignores current and later steps, including cleared contact details", () => {
  assert.equal(
    getFirstInvalidStep({ ...validPreferences, budgetMin: "" }, 4),
    null,
  );
  assert.equal(getFirstInvalidStep(validPreferences, 6), null);
  assert.equal(
    getFirstInvalidStep({ ...initialAnswers, location: "Preferred area" }, 2),
    null,
  );
});
