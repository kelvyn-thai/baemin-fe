export const currencyFormatted = ({
  locales = "vi-VN",
  value,
  currency = "VND",
}: {
  locales?: string | string[];
  value: number;
  currency?: string;
}) =>
  new Intl.NumberFormat(locales, { style: "currency", currency }).format(value);
