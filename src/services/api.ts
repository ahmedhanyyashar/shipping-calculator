import { COURIERS } from "@/constants/couriers";
import { ShippingFormData, CourierQuote, ApiError } from "@/types";
import { generateMockQuote } from "./mock-data";

/**
 * Simulates API call with random delay and potential failure
 */
const simulateApiCall = async <T>(
  fn: () => T,
  delay: number = 800,
  failureRate: number = 0.1
): Promise<T> => {
  await new Promise((resolve) => setTimeout(resolve, delay));

  if (Math.random() < failureRate) {
    throw new Error("Service temporarily unavailable");
  }

  return fn();
};

/**
 * Fetch quote from DHL
 */
export const fetchDHLRate = async (
  shipment: ShippingFormData
): Promise<CourierQuote> => {
  return simulateApiCall(
    () => generateMockQuote(COURIERS.DHL, shipment),
    600,
    0.9
  );
};

/**
 * Fetch quote from FedEx
 */
export const fetchFedExRate = async (
  shipment: ShippingFormData
): Promise<CourierQuote> => {
  return simulateApiCall(
    () => generateMockQuote(COURIERS.FEDEX, shipment),
    700,
    0.5
  );
};

/**
 * Fetch quote from UPS
 */
export const fetchUPSRate = async (
  shipment: ShippingFormData
): Promise<CourierQuote> => {
  return simulateApiCall(
    () => generateMockQuote(COURIERS.UPS, shipment),
    800,
    0.1
  );
};

/**
 * Fetch quote from USPS
 */
export const fetchUSPSRate = async (
  shipment: ShippingFormData
): Promise<CourierQuote> => {
  return simulateApiCall(
    () => generateMockQuote(COURIERS.USPS, shipment),
    650,
    0.1
  );
};

/**
 * Retry logic with exponential backoff
 */
export const fetchWithRetry = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const timeout = 5000 * Math.pow(2, attempt); // 5s, 10s, 20s

      const result = await Promise.race([
        fn(),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Request timeout")), timeout)
        ),
      ]);

      return result;
    } catch (error) {
      if (attempt === maxRetries - 1) {
        throw error;
      }

      // Wait before retry: 1s, 2s, 4s
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new Error("Max retries exceeded");
};

/**
 * Fetch all courier quotes with graceful degradation
 */
export const fetchAllQuotes = async (
  shipment: ShippingFormData
): Promise<{
  quotes: CourierQuote[];
  errors: ApiError[];
}> => {
  const courierFetchers = [
    {
      name: "DHL",
      fn: () => fetchWithRetry(() => fetchDHLRate(shipment)),
    },
    {
      name: "FedEx",
      fn: () => fetchWithRetry(() => fetchFedExRate(shipment)),
    },
    {
      name: "UPS",
      fn: () => fetchWithRetry(() => fetchUPSRate(shipment)),
    },
    {
      name: "USPS",
      fn: () => fetchWithRetry(() => fetchUSPSRate(shipment)),
    },
  ];

  const results = await Promise.allSettled(
    courierFetchers.map((fetcher) => fetcher.fn())
  );

  const quotes: CourierQuote[] = [];
  const errors: ApiError[] = [];

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      quotes.push(result.value);
    } else {
      errors.push({
        courier: courierFetchers[index]!.name,
        message: result.reason.message || "Unknown error",
        code: "FETCH_ERROR",
      });
    }
  });

  return { quotes, errors };
};
