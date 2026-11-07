import { test } from "node:test";
import assert from "node:assert/strict";
import {
  initialAnswers,
  validateStep,
  preferencesOnly,
  restorePreferences,
} from "./schemas";
import { submitLead } from "./submitLead";
test("each step rejects missing required answers", () => {
  for (let step = 0; step < 6; step++)
    assert.ok(Object.keys(validateStep(step, initialAnswers)).length > 0);
});
test("all steps accept a complete brief and budget rejects reversal", () => {
  const answers = {
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
    name: "Demo Renter",
    email: "demo@example.com",
    phone: "+1 202 555 0123",
  };
  for (let step = 0; step < 6; step++)
    assert.deepEqual(validateStep(step, answers), {});
  assert.ok(validateStep(3, { ...answers, budgetMin: "3000" }).budgetMax);
  assert.ok(validateStep(1, { ...answers, moveDate: "2027-02-30" }).moveDate);
  assert.ok(validateStep(5, { ...answers, email: "invalid" }).email);
  assert.ok(validateStep(5, { ...answers, phone: "---...." }).phone);
});
test("contact fields never enter persisted or restored preferences", () => {
  const answers = {
    ...initialAnswers,
    name: "Private",
    email: "private@example.com",
    phone: "123456789",
  };
  const saved = preferencesOnly(answers);
  assert.equal("name" in saved, false);
  assert.equal("email" in saved, false);
  assert.equal("phone" in saved, false);
  const restored = restorePreferences({
    ...saved,
    name: "Injected",
    email: "injected@example.com",
    phone: "1111111",
  });
  assert.equal("name" in restored, false);
  assert.deepEqual(restorePreferences({ location: 42 }), {});
});
test("submission adapter resolves locally", async () => {
  assert.deepEqual(await submitLead(initialAnswers), { demo: true });
});

test("completion clears answers and reset begins a clean brief", async () => {
  const { reducer } = await import("./state");
  const state = {
    answers: { ...initialAnswers, name: "Demo", location: "An area" },
    complete: false,
  };
  const completed = reducer(state, { type: "complete" });
  assert.deepEqual(completed.answers, initialAnswers);
  assert.equal(completed.complete, true);
  assert.deepEqual(reducer(completed, { type: "reset" }), {
    answers: initialAnswers,
    complete: false,
  });
});
