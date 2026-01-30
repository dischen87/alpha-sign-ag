/**
 * SEO Components for Alpha Sign AG
 * Export all SEO-related components for easy importing
 */

export { default as SEO } from './SEO.astro';
export { default as SchemaOrg } from './SchemaOrg.astro';
export { default as BaseHead } from './BaseHead.astro';

// Re-export types
export type {
  LocalBusinessSchema,
  ServiceSchema,
  FAQSchema,
  BreadcrumbSchema,
} from './SchemaOrg.astro';
