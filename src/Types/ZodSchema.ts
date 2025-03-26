import { z } from "zod";

export const ZodApplicationFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Full name is required" })
    .regex(/^[A-Z][a-z]+ [A-Z][a-z]+$/, {
      message:
        "Name must be in the format 'First Last' with first letter of each name capitalized",
    }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  cover_letter: z
    .string()
    .min(300, { message: "Cover letter must be at least 300 characters" })
    .max(1000, { message: "Cover letter must not exceed 1000 characters" }),
  resume: z.instanceof(File),
});
