import { test } from "node:test";
import assert from "node:assert/strict";
import { contactSchema } from "./schema";
import { contactFields } from "../../lib/validation";
import { getStartedSchema } from "../getStarted/schema";

const valid = {
  name: "Sample Renter",
  email: "sample@example.com",
  phone: "",
  message: "A sample message about an apartment search.",
};
test("contact form accepts an omitted phone value and trims name and message", () => {
  const result = contactSchema.parse({
    ...valid,
    name: ` ${valid.name} `,
    message: ` ${valid.message} `,
  });
  assert.equal(result.name, valid.name);
  assert.equal(result.message, valid.message);
});
test("contact form accepts a valid optional phone", () => {
  assert.ok(
    contactSchema.safeParse({ ...valid, phone: "+1 202 555 0123" }).success,
  );
});
test("contact form rejects invalid or oversized fields", () => {
  for (const patch of [
    { name: " " },
    { name: "x".repeat(101) },
    { email: "invalid" },
    { phone: "123" },
    { phone: "---...." },
    { phone: "1".repeat(16) },
    { message: "short" },
    { message: "x".repeat(2001) },
  ]) {
    assert.equal(
      contactSchema.safeParse({ ...valid, ...patch }).success,
      false,
    );
  }
});
test("get-started requires phone while sharing the same field validators", () => {
  const brief = { moveDate: "2026-09-01", layout: "Studio", neighborhoods: [], pets: "No pets", parking: "Not needed", mustHaves: [], firstName: "Sam", lastName: "Renter", phone: "", email: "sample@example.com", notes: "", consentMarketing: false, consentContact: false };
  assert.equal(getStartedSchema.safeParse(brief).success, false);
  assert.equal(contactFields.phone.safeParse("").success, false);
  assert.ok(getStartedSchema.safeParse({ ...brief, phone: "+1 202 555 0123" }).success);
});
