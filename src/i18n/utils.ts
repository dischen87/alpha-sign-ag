import { defaultLocale, locales, localeConfig, isValidLocale, type Locale } from './config';
import de from './translations/de.json';
import en from './translations/en.json';

const translations: Record<Locale, typeof de> = {
  de,
  en,
};

/**
 * Get the current locale from a URL or pathname
 * Returns the default locale (de) if no locale prefix is found
 */
export function getLocaleFromUrl(url: URL | string): Locale {
  const pathname = typeof url === 'string' ? url : url.pathname;
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length > 0 && isValidLocale(segments[0])) {
    return segments[0] as Locale;
  }

  return defaultLocale;
}

/**
 * Get the path without the locale prefix
 */
export function getPathWithoutLocale(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length > 0 && isValidLocale(segments[0])) {
    return '/' + segments.slice(1).join('/');
  }

  return pathname;
}

/**
 * Switch to a different language, returning the new URL path
 */
export function switchLanguage(currentUrl: URL | string, targetLocale: Locale): string {
  const pathname = typeof currentUrl === 'string' ? currentUrl : currentUrl.pathname;
  const pathWithoutLocale = getPathWithoutLocale(pathname);
  const prefix = localeConfig[targetLocale].prefix;

  // Ensure we don't have double slashes
  const cleanPath = pathWithoutLocale === '/' ? '' : pathWithoutLocale;

  return prefix + (cleanPath || '/');
}

/**
 * Get a translated string by key (supports nested keys like "nav.home")
 */
export function t(locale: Locale, key: string): string {
  const keys = key.split('.');
  let result: unknown = translations[locale];

  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = (result as Record<string, unknown>)[k];
    } else {
      // Fallback to default locale
      result = translations[defaultLocale];
      for (const fallbackKey of keys) {
        if (result && typeof result === 'object' && fallbackKey in result) {
          result = (result as Record<string, unknown>)[fallbackKey];
        } else {
          return key; // Return the key if translation not found
        }
      }
      break;
    }
  }

  return typeof result === 'string' ? result : key;
}

/**
 * Create a translation function bound to a specific locale
 */
export function useTranslations(locale: Locale) {
  return (key: string) => t(locale, key);
}

/**
 * Generate hreflang tags for SEO
 * Returns an array of hreflang link objects for all supported locales
 */
export function generateHreflangTags(currentPath: string, baseUrl: string): Array<{ rel: string; hreflang: string; href: string }> {
  const pathWithoutLocale = getPathWithoutLocale(currentPath);
  const tags: Array<{ rel: string; hreflang: string; href: string }> = [];

  for (const locale of locales) {
    const prefix = localeConfig[locale].prefix;
    const cleanPath = pathWithoutLocale === '/' ? '' : pathWithoutLocale;
    const href = `${baseUrl}${prefix}${cleanPath || '/'}`;

    tags.push({
      rel: 'alternate',
      hreflang: localeConfig[locale].hreflang,
      href,
    });
  }

  // Add x-default pointing to the default locale
  tags.push({
    rel: 'alternate',
    hreflang: 'x-default',
    href: `${baseUrl}${pathWithoutLocale}`,
  });

  return tags;
}

/**
 * Get localized URL for a given path and locale
 * Always returns URLs with trailing slashes to match Astro's trailingSlash: 'always' config
 */
export function getLocalizedUrl(path: string, locale: Locale): string {
  const cleanPath = path.startsWith('/') ? path : '/' + path;
  const prefix = localeConfig[locale].prefix;

  if (cleanPath === '/') {
    return prefix ? prefix + '/' : '/';
  }

  const url = `${prefix}${cleanPath}`;
  // Ensure trailing slash (unless it's a file with extension)
  if (!url.endsWith('/') && !url.includes('.')) {
    return url + '/';
  }
  return url;
}

// Re-export config values for convenience
export { locales, defaultLocale, localeNames, localeConfig, isValidLocale, type Locale } from './config';
