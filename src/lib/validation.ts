import { z } from "zod";
const requiredText = (message: string) =>
  z
    .string()
    .trim()
    .min(1, message)
    .max(250, "Please keep this under 250 characters.");
export const contactFields = {
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
};
