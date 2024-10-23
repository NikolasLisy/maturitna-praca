const CURRENCY_FORMATTER = new Intl.NumberFormat("sk-SK", {
  currency: "EUR", // Zmena meny na EUR
  style: "currency",
  minimumFractionDigits: 0, // Môžeš prispôsobiť podľa potreby
});

export function formatCurrency(amount: number) {
  return CURRENCY_FORMATTER.format(amount);
}

const NUMBER_FORMATTER = new Intl.NumberFormat("sk-SK");

export function formatNumber(number: number) {
  return NUMBER_FORMATTER.format(number);
}
