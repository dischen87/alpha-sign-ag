// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  // Site URL for sitemap and canonical URLs
  site: 'https://www.alphasign.ch',

  // Static with on-demand server routes (Astro 5: static = former hybrid)
  output: 'static',

  // Cloudflare Pages adapter for SSR routes
  adapter: cloudflare(),

  integrations: [
    react(),
    sitemap({
      // Multi-language support for Swiss market
      i18n: {
        defaultLocale: 'de',
        locales: {
          de: 'de-CH',
          fr: 'fr-CH',
          it: 'it-CH',
          en: 'en',
        },
      },
      // Custom filter to exclude certain pages
      filter: (page) => {
        // Exclude admin, preview, and draft pages
        const excludePatterns = [
          '/admin',
          '/preview',
          '/draft',
          '/api/',
          '/_',
        ];
        return !excludePatterns.some((pattern) => page.includes(pattern));
      },
      // Custom serialization for priority and changefreq
      serialize: (item) => {
        // Set priority based on page depth and importance
        let priority = 0.7;
        /** @type {'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'} */
        let changefreq = 'weekly';

        const url = item.url;

        // Homepage gets highest priority
        if (url.endsWith('/') || url.endsWith('/de/') || url.endsWith('/fr/') || url.endsWith('/it/')) {
          priority = 1.0;
          changefreq = 'daily';
        }
        // Service pages get high priority
        else if (url.includes('/dienstleistungen/') || url.includes('/services/')) {
          priority = 0.9;
          changefreq = 'weekly';
        }
        // About, contact, and main pages
        else if (url.includes('/ueber-uns') || url.includes('/kontakt') || url.includes('/about') || url.includes('/contact')) {
          priority = 0.8;
          changefreq = 'monthly';
        }
        // Blog and news articles
        else if (url.includes('/blog/') || url.includes('/news/')) {
          priority = 0.6;
          changefreq = 'monthly';
        }
        // Legal pages get lower priority
        else if (url.includes('/impressum') || url.includes('/datenschutz') || url.includes('/agb')) {
          priority = 0.3;
          changefreq = 'yearly';
        }

        return {
          ...item,
          priority,
          changefreq,
          // Add last modification date
          lastmod: new Date().toISOString().split('T')[0],
        };
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  // Build configuration
  build: {
    // Generate clean URLs without .html extension
    format: 'directory',
  },

  // Always use trailing slashes to avoid 308 redirects
  trailingSlash: 'always',

  // Internationalization configuration for Swiss market
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'fr', 'it', 'en'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },

  // Prefetch configuration for better performance
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
