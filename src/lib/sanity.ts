// Sanity client configuration
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Sanity configuration
const projectId = 'sxi7fruw';
const dataset = 'production';
const apiVersion = '2024-01-01';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Use CDN for better performance in production
});

// Image URL builder
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Helper function to fetch data from Sanity
export async function sanityFetch<T>(query: string, params = {}): Promise<T> {
  return sanityClient.fetch(query, params);
}

// ============================================
// GROQ Queries for Projects
// ============================================

// Get all projects (for portfolio listing)
export const projectsQuery = `*[_type == "project"] | order(completionDate desc) {
  _id,
  "slug": slug.de.current,
  "slugEn": slug.en.current,
  title,
  excerpt,
  client,
  completionDate,
  location,
  featured,
  mainImage,
  "services": services[]->{ _id, title },
  "categoryKey": services[0]->slug.current
}`;

// Get single project by slug
export const projectBySlugQuery = `*[_type == "project" && (slug.de.current == $slug || slug.en.current == $slug)][0] {
  _id,
  "slug": slug.de.current,
  "slugEn": slug.en.current,
  title,
  excerpt,
  client,
  clientLogo,
  completionDate,
  location,
  challenge,
  solution,
  results,
  keyMetrics,
  testimonial,
  mainImage,
  gallery,
  beforeAfter,
  featured,
  seo,
  "services": services[]->{ _id, title, "slug": slug.current }
}`;

// Get featured projects (for homepage)
export const featuredProjectsQuery = `*[_type == "project" && featured == true] | order(completionDate desc)[0...6] {
  _id,
  "slug": slug.de.current,
  "slugEn": slug.en.current,
  title,
  excerpt,
  client,
  mainImage,
  "services": services[]->{ _id, title },
  "categoryKey": services[0]->slug.current
}`;

// Get all project slugs (for static paths)
export const projectSlugsQuery = `*[_type == "project"] {
  "slug": slug.de.current,
  "slugEn": slug.en.current
}`;

// ============================================
// TypeScript Types for Sanity Data
// ============================================

export interface LocalizedString {
  de: string;
  en?: string;
}

export interface LocalizedText {
  de: string;
  en?: string;
}

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: LocalizedString;
  caption?: LocalizedString;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface KeyMetric {
  value: string;
  label: LocalizedString;
}

export interface Testimonial {
  quote: LocalizedText;
  author: string;
  role: string;
}

export interface SanityProject {
  _id: string;
  slug: string;
  slugEn?: string;
  title: LocalizedString;
  excerpt: LocalizedText;
  client: string;
  clientLogo?: SanityImage;
  completionDate: string;
  location?: string;
  challenge?: LocalizedText;
  solution?: LocalizedText;
  results?: LocalizedText;
  keyMetrics?: KeyMetric[];
  testimonial?: Testimonial;
  mainImage: SanityImage;
  gallery?: SanityImage[];
  beforeAfter?: {
    before: SanityImage;
    after: SanityImage;
  };
  featured: boolean;
  services?: Array<{ _id: string; title: LocalizedString; slug?: string }>;
  categoryKey?: string;
  seo?: {
    metaTitle?: LocalizedString;
    metaDescription?: LocalizedText;
    openGraphImage?: SanityImage;
  };
}

// ============================================
// Helper Functions
// ============================================

// Get localized value based on language
export function getLocalizedValue<T extends LocalizedString | LocalizedText>(
  field: T | undefined,
  lang: 'de' | 'en'
): string {
  if (!field) return '';
  return field[lang] || field.de || '';
}

// Format date for display
export function formatProjectDate(date: string, lang: 'de' | 'en'): string {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString(lang === 'de' ? 'de-CH' : 'en-US', {
    year: 'numeric',
    month: 'long',
  });
}
