import { test } from "node:test";
import assert from "node:assert/strict";
import { initialAnswers, preferencesOnly, restorePreferences } from "./schemas";

test("preferencesOnly strips all contact fields and preserves preferences", () => {
  const source = {
    ...initialAnswers,
    location: "Preferred area",
    name: "Sample",
    email: "sample@example.com",
    phone: "123456789",
  };
  const preferences = preferencesOnly(source);
  assert.equal(preferences.location, source.location);
  for (const key of ["name", "email", "phone"])
    assert.equal(Object.hasOwn(preferences, key), false);
  assert.equal(source.name, "Sample");
});
test("restorePreferences accepts valid partial and complete preferences", () => {
  assert.deepEqual(restorePreferences({ location: "Preferred area" }), {
    location: "Preferred area",
  });
  const preferences = preferencesOnly(initialAnswers);
  assert.deepEqual(restorePreferences(preferences), preferences);
});
test("restorePreferences rejects malformed values", () => {
  for (const value of [
    null,
    [],
    "not an object",
    42,
    { location: 42 },
    { surroundings: "Quiet surroundings" },
    { amenities: [null] },
  ]) {
    assert.deepEqual(restorePreferences(value), {});
  }
});
test("restorePreferences rejects unknown keys, including contact fields", () => {
  for (const key of [
    "unknown",
    "step",
    "complete",
    "name",
    "email",
    "phone",
    "__proto__",
  ]) {
    const value = JSON.parse(
      `{"location":"Preferred area","${key}":"injected"}`,
    );
    const restored = restorePreferences(value);
    assert.deepEqual(restored, {});
    for (const pii of ["name", "email", "phone"])
      assert.equal(Object.hasOwn(restored, pii), false);
  }
});
test("restorePreferences rejects oversized strings, lists, and list items", () => {
  for (const value of [
    { location: "x".repeat(251) },
    { notes: "x".repeat(501) },
    { budgetMin: "1".repeat(21) },
    { surroundings: Array(5).fill("City living") },
    { amenities: Array(7).fill("Storage") },
    { mustHaves: Array(5).fill("Natural light") },
    { surroundings: ["x".repeat(10000)] },
    { amenities: ["x".repeat(10000)] },
  ])
    assert.deepEqual(restorePreferences(value), {});
});
