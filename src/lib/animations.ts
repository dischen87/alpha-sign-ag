/**
 * Animation Utilities for Astro + React Islands
 *
 * Performance Guidelines:
 * - Only animate transform and opacity (GPU-optimized properties)
 * - No layout-shifting animations (prevent CLS issues)
 * - All animations respect reduced-motion preferences
 *
 * Usage with Motion (Framer Motion):
 * import { fadeIn, slideUp, heroEntrance } from '@/lib/animations';
 * <motion.div variants={fadeIn} initial="hidden" animate="visible" />
 */

import type { Variants, Transition, TargetAndTransition } from 'motion/react';

// =============================================================================
// CONFIGURATION
// =============================================================================

/**
 * Default transition presets
 */
export const transitions = {
  // Smooth, natural easing
  smooth: {
    type: 'tween',
    ease: [0.25, 0.1, 0.25, 1], // cubic-bezier
    duration: 0.4,
  } as Transition,

  // Spring animation for bouncy feel
  spring: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  } as Transition,

  // Gentle spring for subtle movements
  gentleSpring: {
    type: 'spring',
    stiffness: 200,
    damping: 25,
  } as Transition,

  // Quick transition for immediate feedback
  quick: {
    type: 'tween',
    ease: 'easeOut',
    duration: 0.2,
  } as Transition,

  // Slow, dramatic entrance
  slow: {
    type: 'tween',
    ease: [0.25, 0.1, 0.25, 1],
    duration: 0.8,
  } as Transition,
} as const;

/**
 * Stagger configuration for list animations
 */
export const staggerConfig = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
} as const;

// =============================================================================
// PAGE TRANSITIONS
// =============================================================================

/**
 * Fade in/out transition
 */
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: transitions.smooth,
  },
  exit: {
    opacity: 0,
    transition: transitions.quick,
  },
};

/**
 * Slide up with fade
 */
export const slideUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.smooth,
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: transitions.quick,
  },
};

/**
 * Slide down with fade
 */
export const slideDown: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.smooth,
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: transitions.quick,
  },
};

/**
 * Slide from left with fade
 */
export const slideLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.smooth,
  },
  exit: {
    opacity: 0,
    x: 30,
    transition: transitions.quick,
  },
};

/**
 * Slide from right with fade
 */
export const slideRight: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.smooth,
  },
  exit: {
    opacity: 0,
    x: -30,
    transition: transitions.quick,
  },
};

/**
 * Scale in with fade (from smaller)
 */
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.spring,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: transitions.quick,
  },
};

// =============================================================================
// HERO SECTION ANIMATIONS
// =============================================================================

/**
 * Hero title entrance - dramatic slide up with fade
 */
export const heroTitle: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...transitions.slow,
      delay: 0.1,
    },
  },
};

/**
 * Hero subtitle entrance - follows title
 */
export const heroSubtitle: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...transitions.slow,
      delay: 0.3,
    },
  },
};

/**
 * Hero CTA button entrance
 */
export const heroCta: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...transitions.smooth,
      delay: 0.5,
    },
  },
};

/**
 * Hero image/media entrance
 */
export const heroMedia: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      ...transitions.slow,
      delay: 0.2,
    },
  },
};

/**
 * Complete hero container with stagger for children
 */
export const heroContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

/**
 * Hero child element (use with heroContainer)
 */
export const heroChild: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.smooth,
  },
};

// =============================================================================
// CARD ANIMATIONS
// =============================================================================

/**
 * Card hover state - subtle lift effect
 * Use with whileHover prop
 */
export const cardHover: TargetAndTransition = {
  y: -4,
  scale: 1.02,
  transition: transitions.spring,
};

/**
 * Card tap/press state
 * Use with whileTap prop
 */
export const cardTap: TargetAndTransition = {
  scale: 0.98,
  transition: transitions.quick,
};

/**
 * Card entrance animation
 */
export const cardEntrance: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: transitions.spring,
  },
};

/**
 * Card container with stagger for grid layouts
 */
export const cardContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerConfig.normal,
      delayChildren: 0.1,
    },
  },
};

// =============================================================================
// BUTTON ANIMATIONS
// =============================================================================

/**
 * Button hover state
 * Use with whileHover prop
 */
export const buttonHover: TargetAndTransition = {
  scale: 1.02,
  transition: transitions.spring,
};

/**
 * Button tap/press state
 * Use with whileTap prop
 */
export const buttonTap: TargetAndTransition = {
  scale: 0.98,
  transition: transitions.quick,
};

/**
 * Primary button with glow effect (use with CSS for glow)
 */
export const buttonPrimary: Variants = {
  idle: {
    scale: 1,
  },
  hover: {
    scale: 1.02,
    transition: transitions.spring,
  },
  tap: {
    scale: 0.98,
    transition: transitions.quick,
  },
};

/**
 * Icon button rotation on hover
 */
export const iconButtonHover: TargetAndTransition = {
  rotate: 15,
  scale: 1.1,
  transition: transitions.spring,
};

// =============================================================================
// NAVIGATION ANIMATIONS
// =============================================================================

/**
 * Mobile menu overlay
 */
export const menuOverlay: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: transitions.quick,
  },
  exit: {
    opacity: 0,
    transition: transitions.quick,
  },
};

/**
 * Mobile menu panel (slide from right)
 */
export const menuPanel: Variants = {
  hidden: {
    x: '100%',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: transitions.spring,
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: {
      ...transitions.smooth,
      duration: 0.3,
    },
  },
};

/**
 * Mobile menu panel (slide from left)
 */
export const menuPanelLeft: Variants = {
  hidden: {
    x: '-100%',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: transitions.spring,
  },
  exit: {
    x: '-100%',
    opacity: 0,
    transition: {
      ...transitions.smooth,
      duration: 0.3,
    },
  },
};

/**
 * Navigation menu items container
 */
export const menuItemsContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerConfig.fast,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

/**
 * Individual menu item
 */
export const menuItem: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.smooth,
  },
  exit: {
    opacity: 0,
    x: -10,
    transition: transitions.quick,
  },
};

/**
 * Dropdown menu animation
 */
export const dropdown: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: transitions.spring,
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: transitions.quick,
  },
};

/**
 * Hamburger menu icon animation (top line)
 */
export const hamburgerTop: Variants = {
  closed: {
    rotate: 0,
    y: 0,
  },
  open: {
    rotate: 45,
    y: 6,
    transition: transitions.spring,
  },
};

/**
 * Hamburger menu icon animation (middle line)
 */
export const hamburgerMiddle: Variants = {
  closed: {
    opacity: 1,
  },
  open: {
    opacity: 0,
    transition: transitions.quick,
  },
};

/**
 * Hamburger menu icon animation (bottom line)
 */
export const hamburgerBottom: Variants = {
  closed: {
    rotate: 0,
    y: 0,
  },
  open: {
    rotate: -45,
    y: -6,
    transition: transitions.spring,
  },
};

// =============================================================================
// STAGGERED LIST ANIMATIONS
// =============================================================================

/**
 * List container with stagger effect
 */
export const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerConfig.normal,
      delayChildren: 0.1,
    },
  },
};

/**
 * Fast stagger container
 */
export const staggerContainerFast: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerConfig.fast,
      delayChildren: 0.05,
    },
  },
};

/**
 * Slow stagger container
 */
export const staggerContainerSlow: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerConfig.slow,
      delayChildren: 0.15,
    },
  },
};

/**
 * Stagger item - fade up
 */
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.smooth,
  },
};

/**
 * Stagger item - fade in from left
 */
export const staggerItemLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.smooth,
  },
};

/**
 * Stagger item - fade in from right
 */
export const staggerItemRight: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.smooth,
  },
};

/**
 * Stagger item - scale up
 */
export const staggerItemScale: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.spring,
  },
};

// =============================================================================
// SCROLL-TRIGGERED ANIMATIONS
// =============================================================================

/**
 * Fade in when scrolled into view
 * Use with whileInView prop
 */
export const scrollFadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: transitions.smooth,
  },
};

/**
 * Slide up when scrolled into view
 * Use with whileInView prop
 */
export const scrollSlideUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.smooth,
  },
};

/**
 * Scale in when scrolled into view
 * Use with whileInView prop
 */
export const scrollScaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.spring,
  },
};

/**
 * Slide from left when scrolled into view
 */
export const scrollSlideLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.smooth,
  },
};

/**
 * Slide from right when scrolled into view
 */
export const scrollSlideRight: Variants = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.smooth,
  },
};

// =============================================================================
// VIEWPORT/SCROLL OPTIONS
// =============================================================================

/**
 * Default viewport options for scroll-triggered animations
 */
export const viewportOptions = {
  // Trigger when 20% of element is visible
  default: {
    once: true,
    amount: 0.2,
  },
  // Trigger when element enters viewport
  onEnter: {
    once: true,
    amount: 0,
  },
  // Trigger when 50% visible (for larger elements)
  half: {
    once: true,
    amount: 0.5,
  },
  // Re-trigger on every scroll (use sparingly)
  repeat: {
    once: false,
    amount: 0.2,
  },
} as const;

// =============================================================================
// REDUCED MOTION UTILITIES
// =============================================================================

/**
 * Check if user prefers reduced motion
 * Use this to conditionally apply animations
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get animation variants based on reduced motion preference
 * Returns simplified variants if user prefers reduced motion
 */
export const getAccessibleVariants = (variants: Variants): Variants => {
  if (prefersReducedMotion()) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0 } },
      exit: { opacity: 0, transition: { duration: 0 } },
    };
  }
  return variants;
};

/**
 * Reduced motion variant (instant opacity change only)
 */
export const reducedMotion: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { duration: 0 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0 },
  },
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Create a custom stagger container with specified delay
 */
export const createStaggerContainer = (
  staggerDelay: number = 0.1,
  initialDelay: number = 0
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: initialDelay,
    },
  },
});

/**
 * Create a custom slide animation
 */
export const createSlideAnimation = (
  direction: 'up' | 'down' | 'left' | 'right',
  distance: number = 20
): Variants => {
  const isVertical = direction === 'up' || direction === 'down';
  const value = direction === 'down' || direction === 'right' ? -distance : distance;

  if (isVertical) {
    return {
      hidden: { opacity: 0, y: value },
      visible: { opacity: 1, y: 0, transition: transitions.smooth },
      exit: { opacity: 0, y: -value, transition: transitions.quick },
    };
  }

  return {
    hidden: { opacity: 0, x: value },
    visible: { opacity: 1, x: 0, transition: transitions.smooth },
    exit: { opacity: 0, x: -value, transition: transitions.quick },
  };
};

/**
 * Create a delayed variant
 */
export const withDelay = (variants: Variants, delay: number): Variants => {
  const result = { ...variants };
  if (result.visible && typeof result.visible === 'object') {
    result.visible = {
      ...result.visible,
      transition: {
        ...(result.visible.transition as Transition),
        delay,
      },
    };
  }
  return result;
};
