import { z } from "zod";
import { ShippingFormData } from "@/types";

export const locationSchema = z.object({
  country: z
    .string()
    .min(2, "Country is required")
    .max(100, "Country name too long"),
  city: z.string().min(2, "City is required").max(100, "City name too long"),
  postalCode: z
    .string()
    .min(3, "Postal code must be at least 3 characters")
    .max(12, "Postal code too long"),
});

export const packageSchema = z.object({
  weight: z
    .number()
    .min(0.1, "Package must weigh at least 0.1 kg")
    .max(1000, "Maximum weight is 1000 kg")
    .refine((val) => Number.isFinite(val), "Weight must be a valid number"),
  length: z
    .number()
    .min(1, "Length must be at least 1 cm")
    .max(500, "Length cannot exceed 500 cm"),
  width: z
    .number()
    .min(1, "Width must be at least 1 cm")
    .max(500, "Width cannot exceed 500 cm"),
  height: z
    .number()
    .min(1, "Height must be at least 1 cm")
    .max(500, "Height cannot exceed 500 cm"),
});

export const shippingFormSchema = z
  .object({
    origin: locationSchema,
    destination: locationSchema,
    package: packageSchema,
  })
  .refine(
    (data) => {
      const sameCountry = data.origin.country === data.destination.country;
      const sameCity = data.origin.city === data.destination.city;
      const samePostal = data.origin.postalCode === data.destination.postalCode;
      return !(sameCountry && sameCity && samePostal);
    },
    {
      message: "Origin and destination cannot be the same location",
      path: ["destination", "postalCode"], // ← Put error on this specific field
    }
  );

export const isInternationalShipping = (data: ShippingFormData): boolean => {
  return data.origin.country !== data.destination.country;
};
