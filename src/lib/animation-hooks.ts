/**
 * Animation Hooks for Astro + React Islands
 *
 * Custom hooks for common animation patterns using Motion (Framer Motion).
 * These hooks handle reduced motion preferences automatically.
 */

import { useReducedMotion, useInView, useAnimation } from 'motion/react';
import { useEffect, useRef, useState, useCallback, type RefObject } from 'react';
import type { Variants, Transition } from 'motion/react';
import {
  fadeIn,
  slideUp,
  reducedMotion,
} from './animations';

// =============================================================================
// REDUCED MOTION HOOK
// =============================================================================

/**
 * Returns animation variants based on user's motion preference
 * Automatically returns reduced motion variants if user prefers reduced motion
 */
export const useAccessibleAnimation = (
  normalVariants: Variants,
  reducedVariants: Variants = reducedMotion
): Variants => {
  const prefersReduced = useReducedMotion();
  return prefersReduced ? reducedVariants : normalVariants;
};

// =============================================================================
// SCROLL-TRIGGERED ANIMATION HOOK
// =============================================================================

interface UseScrollAnimationOptions {
  /** Trigger animation only once */
  once?: boolean;
  /** Amount of element that must be visible (0-1) */
  amount?: number;
  /** Custom variants to use */
  variants?: Variants;
}

interface UseScrollAnimationReturn {
  /** Ref to attach to the animated element */
  ref: RefObject<HTMLElement | null>;
  /** Whether the element is in view */
  isInView: boolean;
  /** Animation controls for manual control */
  controls: ReturnType<typeof useAnimation>;
  /** Props to spread on motion component */
  animationProps: {
    ref: RefObject<HTMLElement | null>;
    initial: string;
    animate: ReturnType<typeof useAnimation>;
    variants: Variants;
  };
}

/**
 * Hook for scroll-triggered animations with reduced motion support
 */
export const useScrollAnimation = (
  options: UseScrollAnimationOptions = {}
): UseScrollAnimationReturn => {
  const {
    once = true,
    amount = 0.2,
    variants = slideUp,
  } = options;

  const ref = useRef<HTMLElement>(null);
  const controls = useAnimation();
  const prefersReduced = useReducedMotion();

  const isInView = useInView(ref, {
    once,
    amount,
  });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [isInView, controls, once]);

  const accessibleVariants = prefersReduced ? reducedMotion : variants;

  return {
    ref,
    isInView,
    controls,
    animationProps: {
      ref,
      initial: 'hidden',
      animate: controls,
      variants: accessibleVariants,
    },
  };
};

// =============================================================================
// STAGGERED CHILDREN HOOK
// =============================================================================

interface UseStaggerOptions {
  /** Delay between each child animation */
  staggerDelay?: number;
  /** Initial delay before first child animates */
  initialDelay?: number;
  /** Whether to trigger on scroll into view */
  triggerOnScroll?: boolean;
  /** Amount of element that must be visible for scroll trigger */
  scrollAmount?: number;
}

interface UseStaggerReturn {
  /** Ref to attach to the container */
  containerRef: RefObject<HTMLElement | null>;
  /** Container variants for the parent element */
  containerVariants: Variants;
  /** Item variants for child elements */
  itemVariants: Variants;
  /** Animation controls */
  controls: ReturnType<typeof useAnimation>;
  /** Whether animation has been triggered */
  hasAnimated: boolean;
}

/**
 * Hook for staggered children animations
 */
export const useStagger = (options: UseStaggerOptions = {}): UseStaggerReturn => {
  const {
    staggerDelay = 0.1,
    initialDelay = 0,
    triggerOnScroll = true,
    scrollAmount = 0.2,
  } = options;

  const containerRef = useRef<HTMLElement>(null);
  const controls = useAnimation();
  const prefersReduced = useReducedMotion();
  const [hasAnimated, setHasAnimated] = useState(false);

  const isInView = useInView(containerRef, {
    once: true,
    amount: scrollAmount,
  });

  useEffect(() => {
    if (triggerOnScroll && isInView && !hasAnimated) {
      controls.start('visible');
      setHasAnimated(true);
    } else if (!triggerOnScroll && !hasAnimated) {
      controls.start('visible');
      setHasAnimated(true);
    }
  }, [isInView, controls, triggerOnScroll, hasAnimated]);

  const containerVariants: Variants = prefersReduced
    ? reducedMotion
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: initialDelay,
          },
        },
      };

  const itemVariants: Variants = prefersReduced
    ? reducedMotion
    : {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: 'tween' as const,
            ease: [0.25, 0.1, 0.25, 1],
            duration: 0.4,
          },
        },
      };

  return {
    containerRef,
    containerVariants,
    itemVariants,
    controls,
    hasAnimated,
  };
};

// =============================================================================
// HOVER ANIMATION HOOK
// =============================================================================

interface UseHoverAnimationOptions {
  /** Scale factor on hover */
  scale?: number;
  /** Y offset on hover (lift effect) */
  lift?: number;
  /** Rotation on hover (degrees) */
  rotate?: number;
}

interface UseHoverAnimationReturn {
  /** Props to spread on motion component */
  hoverProps: {
    whileHover: object;
    whileTap: object;
    transition: object;
  };
}

/**
 * Hook for hover animations with reduced motion support
 */
export const useHoverAnimation = (
  options: UseHoverAnimationOptions = {}
): UseHoverAnimationReturn => {
  const { scale = 1.02, lift = 0, rotate = 0 } = options;
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return {
      hoverProps: {
        whileHover: {},
        whileTap: {},
        transition: {},
      },
    };
  }

  return {
    hoverProps: {
      whileHover: {
        scale,
        y: lift ? -lift : undefined,
        rotate: rotate || undefined,
      },
      whileTap: {
        scale: 0.98,
      },
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  };
};

// =============================================================================
// ENTRANCE ANIMATION HOOK
// =============================================================================

interface UseEntranceAnimationOptions {
  /** Delay before animation starts */
  delay?: number;
  /** Animation variant type */
  type?: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale';
  /** Custom variants */
  variants?: Variants;
}

/**
 * Hook for entrance animations
 */
export const useEntranceAnimation = (options: UseEntranceAnimationOptions = {}) => {
  const { delay = 0, type = 'slideUp', variants } = options;
  const prefersReduced = useReducedMotion();
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      controls.start('visible');
      setHasAnimated(true);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [controls, delay]);

  const getVariants = (): Variants => {
    if (variants) return variants;
    if (prefersReduced) return reducedMotion;

    const baseTransition: Transition = {
      type: 'tween',
      ease: [0.25, 0.1, 0.25, 1],
      duration: 0.4,
    };

    switch (type) {
      case 'fade':
        return fadeIn;
      case 'slideDown':
        return {
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0, transition: baseTransition },
        };
      case 'slideLeft':
        return {
          hidden: { opacity: 0, x: -30 },
          visible: { opacity: 1, x: 0, transition: baseTransition },
        };
      case 'slideRight':
        return {
          hidden: { opacity: 0, x: 30 },
          visible: { opacity: 1, x: 0, transition: baseTransition },
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.95 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { type: 'spring' as const, stiffness: 300, damping: 30 },
          },
        };
      case 'slideUp':
      default:
        return slideUp;
    }
  };

  return {
    controls,
    variants: getVariants(),
    hasAnimated,
    animationProps: {
      initial: 'hidden',
      animate: controls,
      variants: getVariants(),
    },
  };
};

// =============================================================================
// MENU ANIMATION HOOK
// =============================================================================

interface UseMenuAnimationReturn {
  /** Whether menu is open */
  isOpen: boolean;
  /** Toggle menu state */
  toggle: () => void;
  /** Open menu */
  open: () => void;
  /** Close menu */
  close: () => void;
  /** Animation state for motion components */
  animationState: 'open' | 'closed';
  /** Overlay variants */
  overlayVariants: Variants;
  /** Panel variants */
  panelVariants: Variants;
  /** Menu items container variants */
  itemsContainerVariants: Variants;
  /** Individual menu item variants */
  itemVariants: Variants;
}

/**
 * Hook for menu open/close animations
 */
export const useMenuAnimation = (
  direction: 'left' | 'right' = 'right'
): UseMenuAnimationReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const baseTransition: Transition = {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  };

  const quickTransition: Transition = {
    type: 'tween',
    ease: 'easeOut',
    duration: 0.2,
  };

  const overlayVariants: Variants = prefersReduced
    ? reducedMotion
    : {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: quickTransition },
        exit: { opacity: 0, transition: quickTransition },
      };

  const panelVariants: Variants = prefersReduced
    ? reducedMotion
    : {
        hidden: {
          x: direction === 'right' ? '100%' : '-100%',
          opacity: 0,
        },
        visible: {
          x: 0,
          opacity: 1,
          transition: baseTransition,
        },
        exit: {
          x: direction === 'right' ? '100%' : '-100%',
          opacity: 0,
          transition: {
            type: 'tween' as const,
            ease: [0.25, 0.1, 0.25, 1],
            duration: 0.3,
          },
        },
      };

  const itemsContainerVariants: Variants = prefersReduced
    ? reducedMotion
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.05,
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

  const itemVariants: Variants = prefersReduced
    ? reducedMotion
    : {
        hidden: { opacity: 0, x: 20 },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            type: 'tween' as const,
            ease: [0.25, 0.1, 0.25, 1],
            duration: 0.4,
          },
        },
        exit: {
          opacity: 0,
          x: -10,
          transition: quickTransition,
        },
      };

  return {
    isOpen,
    toggle,
    open,
    close,
    animationState: isOpen ? 'open' : 'closed',
    overlayVariants,
    panelVariants,
    itemsContainerVariants,
    itemVariants,
  };
};

// =============================================================================
// PARALLAX HOOK (SIMPLE)
// =============================================================================

interface UseParallaxOptions {
  /** Parallax strength (0-1, where 1 is full speed difference) */
  strength?: number;
  /** Direction of parallax */
  direction?: 'up' | 'down';
}

/**
 * Simple parallax hook using CSS transforms
 * For performance, this uses CSS transforms only
 */
export const useParallax = (options: UseParallaxOptions = {}) => {
  const { strength = 0.2, direction = 'up' } = options;
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const newOffset = scrollProgress * strength * 100 * (direction === 'up' ? -1 : 1);
      setOffset(newOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [strength, direction, prefersReduced]);

  return {
    ref,
    style: prefersReduced
      ? {}
      : {
          transform: `translateY(${offset}px)`,
          willChange: 'transform',
        },
  };
};

// =============================================================================
// ANIMATION SEQUENCE HOOK
// =============================================================================

/**
 * Hook for running sequential animations
 */
export const useAnimationSequence = () => {
  const controls = useAnimation();

  const runSequence = useCallback(
    async (sequence: Array<{ animation: string; duration?: number }>) => {
      for (const step of sequence) {
        await controls.start(step.animation);
        if (step.duration) {
          await new Promise((resolve) => setTimeout(resolve, step.duration));
        }
      }
    },
    [controls]
  );

  return {
    controls,
    runSequence,
  };
};
