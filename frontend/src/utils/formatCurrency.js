/**
 * Formats a number to Indian Rupee (INR) currency format
 * e.g., 2499 -> ₹2,499
 */
export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const calculateDiscount = (originalPrice, discountPercentage) => {
  if (!discountPercentage) return originalPrice;
  return Math.round(originalPrice * (1 - discountPercentage / 100));
};
