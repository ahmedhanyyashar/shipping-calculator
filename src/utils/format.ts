/**
 * Format price with currency
 */
export const formatPrice = (
  amount: number,
  currency: string = "USD"
): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

/**
 * Format weight
 */
export const formatWeight = (kg: number): string => {
  return `${kg.toFixed(1)} kg`;
};

/**
 * Format dimensions
 */
export const formatDimensions = (
  length: number,
  width: number,
  height: number
): string => {
  return `${length} × ${width} × ${height} cm`;
};

/**
 * Format date range
 */
export const formatDateRange = (minDate: Date, maxDate: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };

  const minStr = minDate.toLocaleDateString("en-US", options);
  const maxStr = maxDate.toLocaleDateString("en-US", options);

  return `${minStr} - ${maxStr}`;
};
