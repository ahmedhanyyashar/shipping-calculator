/**
 * Calculate estimated delivery date range
 */
export const calculateDeliveryDates = (
  minDays: number,
  maxDays: number
): { minDate: Date; maxDate: Date } => {
  const today = new Date();
  const minDate = new Date(today);
  const maxDate = new Date(today);

  minDate.setDate(today.getDate() + minDays);
  maxDate.setDate(today.getDate() + maxDays);

  return { minDate, maxDate };
};

/**
 * Calculate volumetric weight (length × width × height / 5000)
 */
export const calculateVolumetricWeight = (
  length: number,
  width: number,
  height: number
): number => {
  return (length * width * height) / 5000;
};
