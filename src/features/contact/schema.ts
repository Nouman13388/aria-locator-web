import { z } from "zod";
import { contactFields } from "../../lib/validation";
export const contactSchema = z.object({
  ...contactFields,
  phone: z.union([z.literal(""), contactFields.phone]),
  message: z
    .string()
    .trim()
    .min(10, "Please add a message of at least 10 characters.")
    .max(2000, "Keep your message under 2,000 characters."),
});
