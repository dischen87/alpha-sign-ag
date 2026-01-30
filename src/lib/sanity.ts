// Sanity client configuration
import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: import.meta.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

// Helper function to fetch data from Sanity
export async function sanityFetch<T>(query: string, params = {}): Promise<T> {
  return sanityClient.fetch(query, params);
}
