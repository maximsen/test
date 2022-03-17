export const presets = [40, 100, 200, 1000, 2500, 5000];
export const defaultSuggestion = 40;

export const defaultCurrency = "USD";

export const currencies = [
  { name: "US Dollar", code: "USD", symbol: "$", rate: 1 },
  { name: "Euro", code: "EUR", symbol: "€", rate: 0.897597 },
  { name: "British Pound", code: "GBP", symbol: "£", rate: 0.81755 },
  { name: "Russian Ruble", code: "RUB", symbol: "₽", rate: 63.461993 },
];

export const currencyRateMap: Record<string, number> = currencies.reduce<
  Record<string, number>
>((acc, { code, rate }) => {
  acc[code] = rate;
  return acc;
}, {});

export const currencyOptions = currencies.map(({ code, rate }) => ({
  text: code,
  value: code,
}));
