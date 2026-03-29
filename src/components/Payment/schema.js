import { z } from "zod";

export const checkoutSchema = z.object({
  details: z
    .string()
    .min(5, "Address must be at least 5 characters"),

  phone: z
    .string()
    .regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),

  city: z
    .string()
    .min(2, "City is required"),

  postalCode: z
    .string()
    .regex(/^[0-9]{5}$/, "Must be 5 digits"),
});