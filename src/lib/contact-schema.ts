import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name")
    .max(100, "Please keep your name under 100 characters"),
  phone: z
    .string()
    .trim()
    .min(1, "Please enter a phone number")
    .max(30, "Please keep the phone number under 30 characters")
    .regex(/^[+0-9()\-.\s]+$/, "Use digits and + ( ) - . only"),
  projectDescription: z
    .string()
    .trim()
    .min(1, "Please tell us a little about your project")
    .max(2000, "Please keep the description under 2000 characters"),
});

export type ContactInput = z.infer<typeof contactSchema>;
