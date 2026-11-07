import { z } from "zod";
import { locationChips, mustHaveOptions, amenityOptions } from "./steps";
const requiredText = (message: string) =>
  z
    .string()
    .trim()
    .min(1, message)
    .max(250, "Please keep this under 250 characters.");
export const contactSchema = z.object({
  name: requiredText("Please enter your name.").max(100),
  email: z.email("Enter a valid email address.").max(254),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s().-]{7,25}$/, "Enter a phone number with 7–15 digits.")
    .refine((v) => {
      const n = v.replace(/\D/g, "").length;
      return n >= 7 && n <= 15;
    }, "Enter a phone number with 7–15 digits."),
});
const amount = z
  .string()
  .trim()
  .min(1, "Enter a monthly amount.")
  .refine(
    (v) =>
      /^\d+(\.\d{1,2})?$/.test(v) && Number(v) > 0 && Number(v) <= 10000000,
    "Enter a positive amount, up to 10,000,000.",
  );
const date = z
  .string()
  .min(1, "Choose a move-in date.")
  .refine(
    (v) =>
      /^\d{4}-\d{2}-\d{2}$/.test(v) &&
      !Number.isNaN(Date.parse(v)) &&
      new Date(v).toISOString().slice(0, 10) === v,
    "Choose a valid calendar date.",
  );
export const stepSchemas = [
  z.object({
    location: requiredText("Enter a city or neighborhood."),
    surroundings: z.array(z.enum(locationChips)).max(4),
  }),
  z.object({
    moveDate: date,
    flexibility: z.enum(["Exact date", "±2 weeks", "Flexible"], {
      error: "Choose how flexible your date is.",
    }),
  }),
  z.object({
    bedrooms: z.enum(["Studio", "1", "2", "3", "4+"], {
      error: "Choose a bedroom count.",
    }),
    bathrooms: z.enum(["1", "1.5", "2", "3+"], {
      error: "Choose a bathroom count.",
    }),
    mustHaves: z.array(z.enum(mustHaveOptions)).max(4),
    notes: z.string().max(500, "Keep your must-haves under 500 characters."),
  }),
  z
    .object({ budgetMin: amount, budgetMax: amount })
    .refine((v) => Number(v.budgetMin) <= Number(v.budgetMax), {
      message: "Maximum budget must be at least the minimum.",
      path: ["budgetMax"],
    }),
  z.object({
    pets: z.enum(["No pets", "Cat(s)", "Dog(s)", "Other pets"], {
      error: "Choose a pet preference.",
    }),
    parking: z.enum(
      ["Not needed", "One space", "Two or more spaces", "Flexible"],
      { error: "Choose a parking preference." },
    ),
    amenities: z.array(z.enum(amenityOptions)).max(6),
  }),
  contactSchema,
] as const;
export type Answers = {
  location: string;
  surroundings: string[];
  moveDate: string;
  flexibility: string;
  bedrooms: string;
  bathrooms: string;
  mustHaves: string[];
  notes: string;
  budgetMin: string;
  budgetMax: string;
  pets: string;
  parking: string;
  amenities: string[];
  name: string;
  email: string;
  phone: string;
};
export const initialAnswers: Answers = {
  location: "",
  surroundings: [],
  moveDate: "",
  flexibility: "",
  bedrooms: "",
  bathrooms: "",
  mustHaves: [],
  notes: "",
  budgetMin: "",
  budgetMax: "",
  pets: "",
  parking: "",
  amenities: [],
  name: "",
  email: "",
  phone: "",
};
export function validateStep(
  step: number,
  answers: Answers,
): Record<string, string> {
  const result = stepSchemas[step].safeParse(answers);
  if (result.success) return {};
  return Object.fromEntries(
    result.error.issues.map((i) => [String(i.path[0]), i.message]),
  );
}
export function preferencesOnly(answers: Answers) {
  const { name: _name, email: _email, phone: _phone, ...preferences } = answers;
  return preferences;
}
// Whitelist and validate each field rather than trusting parsed browser storage.
export function restorePreferences(value: unknown): Partial<Answers> {
  const parsed = z
    .object({
      location: z.string().max(250),
      surroundings: z.array(z.string()).max(4),
      moveDate: z.string().max(10),
      flexibility: z.string().max(30),
      bedrooms: z.string().max(20),
      bathrooms: z.string().max(20),
      mustHaves: z.array(z.string()).max(4),
      notes: z.string().max(500),
      budgetMin: z.string().max(20),
      budgetMax: z.string().max(20),
      pets: z.string().max(40),
      parking: z.string().max(40),
      amenities: z.array(z.string()).max(6),
    })
    .partial()
    .safeParse(value);
  return parsed.success ? parsed.data : {};
}
