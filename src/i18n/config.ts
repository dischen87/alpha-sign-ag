/**
 * i18n Configuration
 * Defines supported locales, default locale, and routing configuration
 */

export const locales = ['de', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'de';

export const localeNames: Record<Locale, string> = {
  de: 'Deutsch',
  en: 'English',
};

/**
 * Locale configuration for hreflang and routing
 * - German (de) is the default and served at root (/)
 * - English (en) is served at /en/
 */
export const localeConfig: Record<Locale, { prefix: string; hreflang: string }> = {
  de: {
    prefix: '',
    hreflang: 'de',
  },
  en: {
    prefix: '/en',
    hreflang: 'en',
  },
};

/**
 * Get the URL prefix for a given locale
 */
export function getLocalePrefix(locale: Locale): string {
  return localeConfig[locale].prefix;
}

/**
 * Check if a locale is valid
 */
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
