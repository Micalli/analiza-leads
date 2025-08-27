export function formatCurrency(value: number) {
  const digits = value < 0.01 ? 6 : 2;
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}
