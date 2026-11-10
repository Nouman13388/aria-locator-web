import { z } from "zod";
import { contactFields } from "../../lib/validation";
export const layoutOptions = ["Studio", "1 bedroom", "2 bedrooms", "3 bedrooms", "4+ bedrooms"] as const;
export const petOptions = ["No pets", "Dog", "Cat", "Other"] as const;
export const parkingOptions = ["Not needed", "One space", "Two spaces"] as const;
export const mustHaveOptions = ["Balcony", "In-home laundry", "Work nook", "Level entry", "Natural light", "Extra storage"] as const;
const required = (message: string) => z.string().trim().min(1, message).max(100);
// No budget, credit or background-check fields exist by design.
export const getStartedSchema = z.object({
  moveDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a target move date.").refine((v) => !Number.isNaN(Date.parse(v)), "Choose a valid date."),
  layout: z.enum(layoutOptions, "Choose a layout."),
  neighborhoods: z.array(z.string()),
  pets: z.enum(petOptions, "Tell us about pets."),
  parking: z.enum(parkingOptions, "Choose a parking need."),
  mustHaves: z.array(z.enum(mustHaveOptions)),
  firstName: required("Please enter your first name."),
  lastName: required("Please enter your last name."),
  phone: contactFields.phone,
  email: contactFields.email,
  notes: z.string().trim().max(2000, "Keep this under 2,000 characters."),
  consentMarketing: z.boolean(),
  consentContact: z.boolean(),
});
export type GetStartedValues = z.infer<typeof getStartedSchema>;
export const emptyGetStarted = {
  moveDate: "", layout: "", neighborhoods: [] as string[], pets: "", parking: "", mustHaves: [] as string[],
  firstName: "", lastName: "", phone: "", email: "", notes: "", consentMarketing: false, consentContact: false,
};
export function validateGetStarted(values: typeof emptyGetStarted) {
  const result = getStartedSchema.safeParse(values);
  if (result.success) return {};
  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) errors[String(issue.path[0])] ??= issue.message;
  return errors;
}
