/**
 * Sanity Projects Adapter
 * Fetches projects from Sanity and maps them to the existing Project format
 * Falls back to static data if Sanity is unavailable or empty
 */

import {
  sanityFetch,
  urlFor,
  projectsQuery,
  projectBySlugQuery,
  featuredProjectsQuery,
  projectSlugsQuery,
  getLocalizedValue,
  type SanityProject,
} from './sanity';
import { projects as staticProjects, categories, type Project } from '../data/projects';

// Transform Sanity project to static Project format
function transformSanityProject(sanityProject: SanityProject): Project {
  const categoryKeyMap: Record<string, string> = {
    'fahrzeugbeschriftung': 'fahrzeugbeschriftung',
    'vehicle-lettering': 'fahrzeugbeschriftung',
    'leuchtreklame': 'leuchtreklame',
    'illuminated-signs': 'leuchtreklame',
    'signaletik': 'signaletik',
    'wayfinding': 'signaletik',
    'car-wrapping': 'car-wrapping',
    'gebaeudebeschriftung': 'gebaeudebeschriftung',
    'building-signage': 'gebaeudebeschriftung',
    'messeauftritte': 'messeauftritte',
    'trade-shows': 'messeauftritte',
    'kunst-am-bau': 'kunst-am-bau',
    'art-in-architecture': 'kunst-am-bau',
    'fine-art-prints': 'fine-art-prints',
  };

  // Get category from first service or fallback
  const categoryKey = sanityProject.categoryKey
    ? categoryKeyMap[sanityProject.categoryKey] || sanityProject.categoryKey
    : 'fahrzeugbeschriftung';

  const categoryLabel = categories.de.find(c => c.key === categoryKey)?.label || 'Allgemein';

  // Parse results from text format (bullet points) back to array
  const parseResultsList = (text: string | undefined): string[] => {
    if (!text) return [];
    return text
      .split('\n')
      .map(line => line.replace(/^[•\-]\s*/, '').trim())
      .filter(line => line.length > 0);
  };

  // Get image URL or fallback
  const getImageUrl = (image: SanityProject['mainImage'] | undefined): string => {
    if (!image?.asset) {
      return 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80';
    }
    return urlFor(image).width(1200).quality(80).url();
  };

  // Get year from completion date
  const year = sanityProject.completionDate
    ? new Date(sanityProject.completionDate).getFullYear()
    : new Date().getFullYear();

  return {
    slug: sanityProject.slug || sanityProject._id,
    category: categoryLabel,
    categoryKey,
    year,
    client: sanityProject.client || '',
    image: getImageUrl(sanityProject.mainImage),
    gallery: sanityProject.gallery?.map(img => getImageUrl(img)) || [],
    de: {
      title: getLocalizedValue(sanityProject.title, 'de'),
      description: getLocalizedValue(sanityProject.excerpt, 'de'),
      challenge: getLocalizedValue(sanityProject.challenge, 'de'),
      solution: getLocalizedValue(sanityProject.solution, 'de'),
      results: parseResultsList(getLocalizedValue(sanityProject.results, 'de')),
    },
    en: {
      title: getLocalizedValue(sanityProject.title, 'en') || getLocalizedValue(sanityProject.title, 'de'),
      description: getLocalizedValue(sanityProject.excerpt, 'en') || getLocalizedValue(sanityProject.excerpt, 'de'),
      challenge: getLocalizedValue(sanityProject.challenge, 'en') || getLocalizedValue(sanityProject.challenge, 'de'),
      solution: getLocalizedValue(sanityProject.solution, 'en') || getLocalizedValue(sanityProject.solution, 'de'),
      results: parseResultsList(getLocalizedValue(sanityProject.results, 'en')) ||
        parseResultsList(getLocalizedValue(sanityProject.results, 'de')),
    },
  };
}

/**
 * Get all projects - tries Sanity first, falls back to static data
 */
export async function getProjects(): Promise<Project[]> {
  try {
    const sanityProjects = await sanityFetch<SanityProject[]>(projectsQuery);

    if (sanityProjects && sanityProjects.length > 0) {
      console.log(`[Sanity] Loaded ${sanityProjects.length} projects from CMS`);
      return sanityProjects.map(transformSanityProject);
    }
  } catch (error) {
    console.warn('[Sanity] Failed to fetch projects, using static data:', error);
  }

  // Fallback to static projects
  console.log('[Static] Using static project data');
  return staticProjects;
}

/**
 * Get featured projects for homepage
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const sanityProjects = await sanityFetch<SanityProject[]>(featuredProjectsQuery);

    if (sanityProjects && sanityProjects.length > 0) {
      return sanityProjects.map(transformSanityProject);
    }
  } catch (error) {
    console.warn('[Sanity] Failed to fetch featured projects, using static data:', error);
  }

  // Fallback: return first 6 static projects
  return staticProjects.slice(0, 6);
}

/**
 * Get project by slug
 */
export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  try {
    const sanityProject = await sanityFetch<SanityProject | null>(projectBySlugQuery, { slug });

    if (sanityProject) {
      return transformSanityProject(sanityProject);
    }
  } catch (error) {
    console.warn(`[Sanity] Failed to fetch project "${slug}", trying static data:`, error);
  }

  // Fallback to static project
  return staticProjects.find(p => p.slug === slug);
}

/**
 * Get all project slugs for static path generation
 */
export async function getProjectSlugs(): Promise<Array<{ slug: string; slugEn?: string }>> {
  try {
    const slugs = await sanityFetch<Array<{ slug: string; slugEn?: string }>>(projectSlugsQuery);

    if (slugs && slugs.length > 0) {
      return slugs;
    }
  } catch (error) {
    console.warn('[Sanity] Failed to fetch project slugs, using static data:', error);
  }

  // Fallback to static slugs
  return staticProjects.map(p => ({ slug: p.slug }));
}

/**
 * Get related projects by category
 */
export async function getRelatedProjects(
  currentSlug: string,
  categoryKey: string,
  limit = 3
): Promise<Project[]> {
  const allProjects = await getProjects();

  return allProjects
    .filter(p => p.slug !== currentSlug && p.categoryKey === categoryKey)
    .slice(0, limit);
}

// Re-export categories from static data (these don't change often)
export { categories };
