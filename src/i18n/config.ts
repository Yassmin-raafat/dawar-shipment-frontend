export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const localeCookie = "dawar_locale";

export function isLocale(value: unknown): value is Locale {
  return locales.some((locale) => locale === value);
}
