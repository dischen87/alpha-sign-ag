/**
 * Animation System Entry Point
 *
 * Central export for all animation utilities, hooks, and components.
 *
 * Usage:
 * import { fadeIn, useScrollAnimation, AnimatedCard } from '@/lib/animation-index';
 */

// Animation variants and utilities
export {
  // Transitions
  transitions,
  staggerConfig,

  // Page transitions
  fadeIn,
  slideUp,
  slideDown,
  slideLeft,
  slideRight,
  scaleIn,

  // Hero section
  heroTitle,
  heroSubtitle,
  heroCta,
  heroMedia,
  heroContainer,
  heroChild,

  // Card animations
  cardHover,
  cardTap,
  cardEntrance,
  cardContainer,

  // Button animations
  buttonHover,
  buttonTap,
  buttonPrimary,
  iconButtonHover,

  // Navigation animations
  menuOverlay,
  menuPanel,
  menuPanelLeft,
  menuItemsContainer,
  menuItem,
  dropdown,
  hamburgerTop,
  hamburgerMiddle,
  hamburgerBottom,

  // Staggered animations
  staggerContainer,
  staggerContainerFast,
  staggerContainerSlow,
  staggerItem,
  staggerItemLeft,
  staggerItemRight,
  staggerItemScale,

  // Scroll-triggered animations
  scrollFadeIn,
  scrollSlideUp,
  scrollScaleIn,
  scrollSlideLeft,
  scrollSlideRight,

  // Viewport options
  viewportOptions,

  // Reduced motion
  prefersReducedMotion,
  getAccessibleVariants,
  reducedMotion,

  // Utility functions
  createStaggerContainer,
  createSlideAnimation,
  withDelay,
} from './animations';

// Animation hooks
export {
  useAccessibleAnimation,
  useScrollAnimation,
  useStagger,
  useHoverAnimation,
  useEntranceAnimation,
  useMenuAnimation,
  useParallax,
  useAnimationSequence,
} from './animation-hooks';

// Pre-built motion components
export {
  // Container components
  AnimatedContainer,
  ScrollReveal,

  // Interactive components
  AnimatedCard,
  AnimatedButton,
  AnimatedLink,

  // Hero components
  HeroSection,
  HeroElement,

  // List components
  StaggeredList,
  StaggeredItem,
  StaggeredGrid,
  StaggeredGridItem,

  // Navigation components
  MobileMenu,
  MenuItems,
  MenuItem,

  // Page transitions
  PageTransition,

  // Re-exports from motion
  motion,
  AnimatePresence,
  useReducedMotion,
} from './motion';

// Re-export types
export type { Variants, Transition, TargetAndTransition } from 'motion/react';
