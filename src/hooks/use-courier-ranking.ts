import { CourierQuote, CourierRanking } from "@/types";

/**
 * Calculate cheapest and fastest couriers
 */
export const useCourierRanking = (quotes: CourierQuote[]): CourierRanking => {
  if (quotes.length === 0) {
    return { cheapest: null, fastest: null };
  }

  const cheapest = quotes.reduce((min, quote) =>
    quote.totalPrice < min.totalPrice ? quote : min
  );

  const fastest = quotes.reduce((min, quote) =>
    quote.estimatedDays.max < min.estimatedDays.max ? quote : min
  );

  return {
    cheapest: cheapest.courier.id,
    fastest: fastest.courier.id,
  };
};
