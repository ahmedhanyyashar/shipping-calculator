import { CourierProvider, Courier } from "@/types";

export const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Germany",
  "France",
  "Australia",
  "Japan",
  "Brazil",
  "India",
  "China",
  "Mexico",
  "Italy",
  "Spain",
  "Netherlands",
  "Sweden",
];

export const COURIERS: Record<CourierProvider, Courier> = {
  DHL: {
    id: "dhl",
    name: "DHL Express",
    logo: "🚀",
    serviceLevel: "express",
  },
  FEDEX: {
    id: "fedex",
    name: "FedEx Priority",
    logo: "📦",
    serviceLevel: "express",
  },
  UPS: {
    id: "ups",
    name: "UPS Ground",
    logo: "🚚",
    serviceLevel: "standard",
  },
  USPS: {
    id: "usps",
    name: "USPS Priority",
    logo: "✉️",
    serviceLevel: "standard",
  },
};

export const TAX_RATE = 0.08; // 8% tax
