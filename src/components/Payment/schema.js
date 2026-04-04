import { z } from "zod";

export const checkoutSchema = z.object({
  details: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters")
    .max(100, "Address is too long"),


  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),

  city: z
    .string()
    .trim()
    .min(2, "City is required")
    .max(50, "City name is too long"),

  postalCode: z
    .string()
    .trim()
    .regex(/^[0-9]{5}$/, "Postal code must be 5 digits"),

});