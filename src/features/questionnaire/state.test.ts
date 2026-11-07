import { test } from "node:test";
import assert from "node:assert/strict";
import { reducer } from "./state";
import { initialAnswers } from "./schemas";

const fresh = () => ({ answers: { ...initialAnswers }, complete: false });
test("update merges answers without mutating the previous state", () => {
  const before = fresh();
  const after = reducer(before, {
    type: "update",
    patch: { location: "Preferred area", bedrooms: "2" },
  });
  assert.equal(after.answers.location, "Preferred area");
  assert.equal(after.answers.bedrooms, "2");
  assert.equal(after.answers.budgetMin, "");
  assert.deepEqual(before, fresh());
  assert.equal("step" in after, false);
});
test("complete clears every answer and sets in-memory success only", () => {
  const before = {
    answers: {
      ...initialAnswers,
      name: "Sample",
      email: "sample@example.com",
      phone: "123456789",
      location: "Preferred area",
    },
    complete: false,
  };
  const after = reducer(before, { type: "complete" });
  assert.deepEqual(after, { answers: initialAnswers, complete: true });
  assert.equal(before.complete, false);
  assert.equal(before.answers.location, "Preferred area");
});
test("reset clears an unfinished brief or a completed demo", () => {
  for (const complete of [false, true]) {
    assert.deepEqual(
      reducer(
        {
          answers: {
            ...initialAnswers,
            name: "Sample",
            location: "Preferred area",
          },
          complete,
        },
        { type: "reset" },
      ),
      fresh(),
    );
  }
});
