export type CourierProvider = "DHL" | "FEDEX" | "UPS" | "USPS";
export type ServiceLevel = "express" | "standard" | "economy";
export type FormStep = "origin" | "destination" | "package";

export interface Courier {
  id: string;
  name: string;
  logo: string;
  serviceLevel: ServiceLevel;
}

export interface CourierQuote {
  courier: Courier;
  basePrice: number;
  tax: number;
  totalPrice: number;
  estimatedDays: {
    min: number;
    max: number;
  };
  currency: string;
}

export interface LocationData {
  country: string;
  city: string;
  postalCode: string;
}

export interface PackageData {
  weight: number; // kg
  length: number; // cm
  width: number; // cm
  height: number; // cm
}

export interface ShippingFormData {
  origin: LocationData;
  destination: LocationData;
  package: PackageData;
}

export interface CourierRanking {
  cheapest: string | null; // courier ID
  fastest: string | null; // courier ID
}

export interface ApiError {
  courier: string;
  message: string;
  code: string;
}

export interface SearchState {
  isSearching: boolean;
  quotes: CourierQuote[] | undefined;
  ranking: CourierRanking;
  error: Error | null;
  partialErrors: ApiError[];
}
