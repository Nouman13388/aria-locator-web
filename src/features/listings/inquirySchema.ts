import { z } from "zod";
import { contactFields } from "../../lib/validation";
const name = (message: string) => z.string().trim().min(1, message).max(100);
export const inquirySchema = z.object({
  moveDate: z.union([z.literal(""), z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a valid date.")]),
  firstName: name("Please enter your first name."),
  lastName: name("Please enter your last name."),
  phone: z.union([z.literal(""), contactFields.phone]),
  email: contactFields.email,
  message: z.string().trim().min(10, "Please add a message of at least 10 characters.").max(2000, "Keep your message under 2,000 characters."),
  consent: z.boolean(),
});
export const emptyInquiry = { moveDate: "", firstName: "", lastName: "", phone: "", email: "", message: "", consent: false };
export function validateInquiry(values: typeof emptyInquiry) {
  const result = inquirySchema.safeParse(values);
  const errors: Record<string, string> = {};
  if (!result.success) for (const issue of result.error.issues) errors[String(issue.path[0])] ??= issue.message;
  return errors;
}
