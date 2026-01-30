/**
 * Motion Components for Astro + React Islands
 *
 * Pre-configured motion components with common animation patterns.
 * These components automatically handle reduced motion preferences.
 *
 * Usage in Astro:
 * ---
 * import { AnimatedCard, AnimatedButton } from '@/lib/motion';
 * ---
 * <AnimatedCard client:visible>
 *   Card content here
 * </AnimatedCard>
 */

'use client';

import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type HTMLMotionProps,
  type MotionProps,
} from 'motion/react';
import { forwardRef, type ReactNode, type ComponentPropsWithoutRef } from 'react';
import {
  fadeIn,
  slideUp,
  scaleIn,
  cardHover,
  cardTap,
  cardEntrance,
  buttonHover,
  buttonTap,
  heroContainer,
  heroChild,
  staggerContainer,
  staggerItem,
  scrollSlideUp,
  menuOverlay,
  menuPanel,
  menuItem,
  reducedMotion,
  viewportOptions,
  transitions,
} from './animations';

// =============================================================================
// ANIMATED CONTAINER
// =============================================================================

interface AnimatedContainerProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  variant?: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale';
  delay?: number;
  className?: string;
}

/**
 * Generic animated container with common animation presets
 */
export const AnimatedContainer = forwardRef<HTMLDivElement, AnimatedContainerProps>(
  ({ children, variant = 'slideUp', delay = 0, className, ...props }, ref) => {
    const prefersReduced = useReducedMotion();

    const getVariants = () => {
      if (prefersReduced) return reducedMotion;

      switch (variant) {
        case 'fade':
          return fadeIn;
        case 'scale':
          return scaleIn;
        case 'slideDown':
          return {
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0, transition: { ...transitions.smooth, delay } },
          };
        case 'slideLeft':
          return {
            hidden: { opacity: 0, x: -30 },
            visible: { opacity: 1, x: 0, transition: { ...transitions.smooth, delay } },
          };
        case 'slideRight':
          return {
            hidden: { opacity: 0, x: 30 },
            visible: { opacity: 1, x: 0, transition: { ...transitions.smooth, delay } },
          };
        case 'slideUp':
        default:
          return {
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { ...transitions.smooth, delay } },
          };
      }
    };

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate="visible"
        variants={getVariants()}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

AnimatedContainer.displayName = 'AnimatedContainer';

// =============================================================================
// SCROLL-TRIGGERED CONTAINER
// =============================================================================

interface ScrollRevealProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  variant?: 'fade' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale';
  once?: boolean;
  amount?: number;
  className?: string;
}

/**
 * Container that animates when scrolled into view
 */
export const ScrollReveal = forwardRef<HTMLDivElement, ScrollRevealProps>(
  ({ children, variant = 'slideUp', once = true, amount = 0.2, className, ...props }, ref) => {
    const prefersReduced = useReducedMotion();

    const getVariants = () => {
      if (prefersReduced) return reducedMotion;

      switch (variant) {
        case 'fade':
          return fadeIn;
        case 'scale':
          return scaleIn;
        case 'slideLeft':
          return {
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0, transition: transitions.smooth },
          };
        case 'slideRight':
          return {
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0, transition: transitions.smooth },
          };
        case 'slideUp':
        default:
          return scrollSlideUp;
      }
    };

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount }}
        variants={getVariants()}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

ScrollReveal.displayName = 'ScrollReveal';

// =============================================================================
// ANIMATED CARD
// =============================================================================

interface AnimatedCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  enableHover?: boolean;
  enableTap?: boolean;
  className?: string;
}

/**
 * Card component with hover lift effect and entrance animation
 */
export const AnimatedCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ children, enableHover = true, enableTap = true, className, ...props }, ref) => {
    const prefersReduced = useReducedMotion();

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions.default}
        variants={prefersReduced ? reducedMotion : cardEntrance}
        whileHover={enableHover && !prefersReduced ? cardHover : undefined}
        whileTap={enableTap && !prefersReduced ? cardTap : undefined}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

AnimatedCard.displayName = 'AnimatedCard';

// =============================================================================
// ANIMATED BUTTON
// =============================================================================

interface AnimatedButtonProps extends HTMLMotionProps<'button'> {
  children: ReactNode;
  className?: string;
}

/**
 * Button with hover and tap animations
 */
export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, className, ...props }, ref) => {
    const prefersReduced = useReducedMotion();

    return (
      <motion.button
        ref={ref}
        whileHover={!prefersReduced ? buttonHover : undefined}
        whileTap={!prefersReduced ? buttonTap : undefined}
        className={className}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';

// =============================================================================
// ANIMATED LINK
// =============================================================================

interface AnimatedLinkProps extends HTMLMotionProps<'a'> {
  children: ReactNode;
  className?: string;
}

/**
 * Link with hover and tap animations
 */
export const AnimatedLink = forwardRef<HTMLAnchorElement, AnimatedLinkProps>(
  ({ children, className, ...props }, ref) => {
    const prefersReduced = useReducedMotion();

    return (
      <motion.a
        ref={ref}
        whileHover={!prefersReduced ? { scale: 1.02 } : undefined}
        whileTap={!prefersReduced ? { scale: 0.98 } : undefined}
        transition={transitions.spring}
        className={className}
        {...props}
      >
        {children}
      </motion.a>
    );
  }
);

AnimatedLink.displayName = 'AnimatedLink';

// =============================================================================
// HERO SECTION
// =============================================================================

interface HeroSectionProps extends HTMLMotionProps<'section'> {
  children: ReactNode;
  className?: string;
}

/**
 * Hero section container with staggered children animations
 */
export const HeroSection = forwardRef<HTMLElement, HeroSectionProps>(
  ({ children, className, ...props }, ref) => {
    const prefersReduced = useReducedMotion();

    return (
      <motion.section
        ref={ref}
        initial="hidden"
        animate="visible"
        variants={prefersReduced ? reducedMotion : heroContainer}
        className={className}
        {...props}
      >
        {children}
      </motion.section>
    );
  }
);

HeroSection.displayName = 'HeroSection';

/**
 * Hero child element for use within HeroSection
 */
export const HeroElement = forwardRef<HTMLDivElement, HTMLMotionProps<'div'>>(
  ({ children, className, ...props }, ref) => {
    const prefersReduced = useReducedMotion();

    return (
      <motion.div
        ref={ref}
        variants={prefersReduced ? reducedMotion : heroChild}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

HeroElement.displayName = 'HeroElement';

// =============================================================================
// STAGGERED LIST
// =============================================================================

interface StaggeredListProps extends HTMLMotionProps<'ul'> {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

/**
 * Unordered list with staggered item animations
 */
export const StaggeredList = forwardRef<HTMLUListElement, StaggeredListProps>(
  ({ children, staggerDelay = 0.1, className, ...props }, ref) => {
    const prefersReduced = useReducedMotion();

    const containerVariants = prefersReduced
      ? reducedMotion
      : {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: staggerDelay,
              delayChildren: 0.1,
            },
          },
        };

    return (
      <motion.ul
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions.default}
        variants={containerVariants}
        className={className}
        {...props}
      >
        {children}
      </motion.ul>
    );
  }
);

StaggeredList.displayName = 'StaggeredList';

/**
 * List item for use within StaggeredList
 */
export const StaggeredItem = forwardRef<HTMLLIElement, HTMLMotionProps<'li'>>(
  ({ children, className, ...props }, ref) => {
    const prefersReduced = useReducedMotion();

    return (
      <motion.li
        ref={ref}
        variants={prefersReduced ? reducedMotion : staggerItem}
        className={className}
        {...props}
      >
        {children}
      </motion.li>
    );
  }
);

StaggeredItem.displayName = 'StaggeredItem';

// =============================================================================
// STAGGERED GRID
// =============================================================================

interface StaggeredGridProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

/**
 * Grid container with staggered item animations
 */
export const StaggeredGrid = forwardRef<HTMLDivElement, StaggeredGridProps>(
  ({ children, staggerDelay = 0.1, className, ...props }, ref) => {
    const prefersReduced = useReducedMotion();

    const containerVariants = prefersReduced
      ? reducedMotion
      : {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: staggerDelay,
              delayChildren: 0.1,
            },
          },
        };

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions.default}
        variants={containerVariants}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

StaggeredGrid.displayName = 'StaggeredGrid';

/**
 * Grid item for use within StaggeredGrid
 */
export const StaggeredGridItem = forwardRef<HTMLDivElement, HTMLMotionProps<'div'>>(
  ({ children, className, ...props }, ref) => {
    const prefersReduced = useReducedMotion();

    return (
      <motion.div
        ref={ref}
        variants={prefersReduced ? reducedMotion : staggerItem}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

StaggeredGridItem.displayName = 'StaggeredGridItem';

// =============================================================================
// MOBILE MENU
// =============================================================================

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  direction?: 'left' | 'right';
  overlayClassName?: string;
  panelClassName?: string;
}

/**
 * Animated mobile menu with overlay and slide-in panel
 */
export const MobileMenu = ({
  isOpen,
  onClose,
  children,
  direction = 'right',
  overlayClassName = '',
  panelClassName = '',
}: MobileMenuProps) => {
  const prefersReduced = useReducedMotion();

  const panelVariants = prefersReduced
    ? reducedMotion
    : {
        hidden: {
          x: direction === 'right' ? '100%' : '-100%',
          opacity: 0,
        },
        visible: {
          x: 0,
          opacity: 1,
          transition: transitions.spring,
        },
        exit: {
          x: direction === 'right' ? '100%' : '-100%',
          opacity: 0,
          transition: { ...transitions.smooth, duration: 0.3 },
        },
      };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={prefersReduced ? reducedMotion : menuOverlay}
            onClick={onClose}
            className={overlayClassName}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 40,
            }}
          />

          {/* Panel */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={panelVariants}
            className={panelClassName}
            style={{
              position: 'fixed',
              top: 0,
              bottom: 0,
              [direction]: 0,
              zIndex: 50,
            }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// =============================================================================
// MENU ITEMS
// =============================================================================

interface MenuItemsProps extends HTMLMotionProps<'nav'> {
  children: ReactNode;
  className?: string;
}

/**
 * Container for animated menu items
 */
export const MenuItems = forwardRef<HTMLElement, MenuItemsProps>(
  ({ children, className, ...props }, ref) => {
    const prefersReduced = useReducedMotion();

    const containerVariants = prefersReduced
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
        };

    return (
      <motion.nav
        ref={ref}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={className}
        {...props}
      >
        {children}
      </motion.nav>
    );
  }
);

MenuItems.displayName = 'MenuItems';

/**
 * Individual animated menu item
 */
export const MenuItem = forwardRef<HTMLDivElement, HTMLMotionProps<'div'>>(
  ({ children, className, ...props }, ref) => {
    const prefersReduced = useReducedMotion();

    return (
      <motion.div
        ref={ref}
        variants={prefersReduced ? reducedMotion : menuItem}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

MenuItem.displayName = 'MenuItem';

// =============================================================================
// PAGE TRANSITION WRAPPER
// =============================================================================

interface PageTransitionProps {
  children: ReactNode;
  mode?: 'wait' | 'sync' | 'popLayout';
}

/**
 * Wrapper for page transitions using AnimatePresence
 * Use with Astro's view transitions or React Router
 */
export const PageTransition = ({ children, mode = 'wait' }: PageTransitionProps) => {
  return <AnimatePresence mode={mode}>{children}</AnimatePresence>;
};

// =============================================================================
// RE-EXPORTS
// =============================================================================

// Re-export motion components and utilities for convenience
export { motion, AnimatePresence, useReducedMotion } from 'motion/react';
export type { Variants, Transition, TargetAndTransition } from 'motion/react';
