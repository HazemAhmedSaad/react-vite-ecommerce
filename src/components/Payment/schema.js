import { z } from "zod";

export const checkoutSchema = z.object({
  address: z
    .string()
    .trim()
    .min(1, "Address is required")
    .min(4, "Address must be at least 4 characters")
    .max(100, "Address is too long"),

  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(/^\d+$/, "Only numbers allowed")
    .regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),

  city: z
    .string()
    .trim()
    .min(1, "City is required")
    .min(3, "City name is too short")
    .max(50, "City name is too long"),

  postalCode: z
    .string()
    .trim()
    .min(1, "Postal code is required")
    .regex(/^\d+$/, "Only numbers allowed")
    .regex(/^[0-9]{5}$/, "Postal code must be 5 digits"),
});
