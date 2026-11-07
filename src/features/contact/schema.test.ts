import { test } from "node:test";
import assert from "node:assert/strict";
import { contactSchema } from "./schema";
import { contactFields } from "../../lib/validation";
import { stepSchemas } from "../questionnaire/schemas";

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
test("questionnaire requires phone while sharing the same field validators", () => {
  assert.equal(stepSchemas[5].safeParse(valid).success, false);
  assert.equal(contactFields.phone.safeParse("").success, false);
  assert.ok(
    stepSchemas[5].safeParse({ ...valid, phone: "+1 202 555 0123" }).success,
  );
});
