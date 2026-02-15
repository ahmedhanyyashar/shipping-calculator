import { Courier, ShippingFormData, CourierQuote } from "@/types";
import { calculateVolumetricWeight } from "@/utils/calculate";
import { TAX_RATE } from "@/constants/couriers";

export const generateMockQuote = (
  courier: Courier,
  shipment: ShippingFormData
): CourierQuote => {
  // Calculate base price based on weight and distance
  const baseWeight = shipment.package.weight;
  const volumetricWeight = calculateVolumetricWeight(
    shipment.package.length,
    shipment.package.width,
    shipment.package.height
  );

  const chargeableWeight = Math.max(baseWeight, volumetricWeight);

  // Different pricing per courier
  const ratePerKg: Record<string, number> = {
    dhl: 9.5,
    fedex: 11.0,
    ups: 7.5,
    usps: 8.5,
  };

  const basePrice = chargeableWeight * (ratePerKg[courier.id] || 8.0);
  const tax = basePrice * TAX_RATE;
  const totalPrice = basePrice + tax;

  // Delivery estimates
  const deliveryDays: Record<string, { min: number; max: number }> = {
    dhl: { min: 2, max: 3 },
    fedex: { min: 1, max: 2 },
    ups: { min: 4, max: 6 },
    usps: { min: 3, max: 5 },
  };

  return {
    courier,
    basePrice: parseFloat(basePrice.toFixed(2)),
    tax: parseFloat(tax.toFixed(2)),
    totalPrice: parseFloat(totalPrice.toFixed(2)),
    estimatedDays: deliveryDays[courier.id] || {
      min: 3,
      max: 5,
    },
    currency: "USD",
  };
};
