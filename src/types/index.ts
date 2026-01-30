// TypeScript types

export type Language = 'de' | 'en';

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface SEOProps {
  title: string;
  description: string;
  image?: string;
  canonical?: string;
}

// Sanity types
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

export interface SanityPage {
  _id: string;
  _type: 'page';
  title: string;
  slug: {
    current: string;
  };
  content?: unknown[];
}

export interface Service {
  _id: string;
  title: string;
  description: string;
  slug: {
    current: string;
  };
  image?: SanityImage;
}

export interface Testimonial {
  _id: string;
  name: string;
  company?: string;
  quote: string;
  image?: SanityImage;
}
