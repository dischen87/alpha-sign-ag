/**
 * Alpha Sign AG Design Tokens
 *
 * This file provides TypeScript types and documentation for the design tokens
 * defined in globals.css. Use these for programmatic access to design values.
 *
 * WCAG AA Compliance:
 * - All text colors have been tested against their backgrounds
 * - Primary blue on white: contrast ratio > 4.5:1
 * - Error/Success colors maintain readability
 * - Focus states are clearly visible
 */

// ============================================
// COLOR PALETTE
// ============================================

/**
 * Primary Colors - Professional Swiss Blue
 * Used for: Primary buttons, links, focus states, brand elements
 *
 * WCAG Compliance:
 * - primary-600 on white: 4.57:1 (AA compliant for normal text)
 * - primary-700 on white: 6.21:1 (AAA compliant)
 * - white on primary-600: 4.57:1 (AA compliant)
 */
export const primaryColors = {
  50: 'var(--color-primary-50)',    // Lightest - backgrounds, hover states
  100: 'var(--color-primary-100)',  // Very light backgrounds
  200: 'var(--color-primary-200)',  // Light backgrounds, selection
  300: 'var(--color-primary-300)',  // Borders, decorative
  400: 'var(--color-primary-400)',  // Dark mode text, icons
  500: 'var(--color-primary-500)',  // Dark mode primary
  600: 'var(--color-primary-600)',  // DEFAULT - buttons, links
  700: 'var(--color-primary-700)',  // Hover states
  800: 'var(--color-primary-800)',  // Active states
  900: 'var(--color-primary-900)',  // Very dark
  950: 'var(--color-primary-950)',  // Darkest - text on light
} as const;

/**
 * Secondary Colors - Sophisticated Slate
 * Used for: Secondary buttons, backgrounds, subtle UI elements
 */
export const secondaryColors = {
  50: 'var(--color-secondary-50)',
  100: 'var(--color-secondary-100)',
  200: 'var(--color-secondary-200)',
  300: 'var(--color-secondary-300)',
  400: 'var(--color-secondary-400)',
  500: 'var(--color-secondary-500)',
  600: 'var(--color-secondary-600)',
  700: 'var(--color-secondary-700)',
  800: 'var(--color-secondary-800)',
  900: 'var(--color-secondary-900)',
  950: 'var(--color-secondary-950)',
} as const;

/**
 * Accent Colors - Swiss Red (restrained, professional)
 * Used for: CTAs, highlights, important actions
 */
export const accentColors = {
  50: 'var(--color-accent-50)',
  100: 'var(--color-accent-100)',
  200: 'var(--color-accent-200)',
  300: 'var(--color-accent-300)',
  400: 'var(--color-accent-400)',
  500: 'var(--color-accent-500)',
  600: 'var(--color-accent-600)',
  700: 'var(--color-accent-700)',
  800: 'var(--color-accent-800)',
  900: 'var(--color-accent-900)',
  950: 'var(--color-accent-950)',
} as const;

/**
 * Semantic Colors
 * Used for: Status indicators, feedback, alerts
 */
export const semanticColors = {
  success: {
    50: 'var(--color-success-50)',
    100: 'var(--color-success-100)',
    200: 'var(--color-success-200)',
    300: 'var(--color-success-300)',
    400: 'var(--color-success-400)',
    500: 'var(--color-success-500)',
    600: 'var(--color-success-600)',   // DEFAULT
    700: 'var(--color-success-700)',
    800: 'var(--color-success-800)',
    900: 'var(--color-success-900)',
    950: 'var(--color-success-950)',
  },
  warning: {
    50: 'var(--color-warning-50)',
    100: 'var(--color-warning-100)',
    200: 'var(--color-warning-200)',
    300: 'var(--color-warning-300)',
    400: 'var(--color-warning-400)',
    500: 'var(--color-warning-500)',   // DEFAULT
    600: 'var(--color-warning-600)',
    700: 'var(--color-warning-700)',
    800: 'var(--color-warning-800)',
    900: 'var(--color-warning-900)',
    950: 'var(--color-warning-950)',
  },
  error: {
    50: 'var(--color-error-50)',
    100: 'var(--color-error-100)',
    200: 'var(--color-error-200)',
    300: 'var(--color-error-300)',
    400: 'var(--color-error-400)',
    500: 'var(--color-error-500)',
    600: 'var(--color-error-600)',     // DEFAULT
    700: 'var(--color-error-700)',
    800: 'var(--color-error-800)',
    900: 'var(--color-error-900)',
    950: 'var(--color-error-950)',
  },
} as const;

/**
 * Neutral Colors - Pure Grays
 * Used for: Text, borders, backgrounds
 */
export const neutralColors = {
  50: 'var(--color-neutral-50)',    // Page background (light)
  100: 'var(--color-neutral-100)',  // Secondary background
  200: 'var(--color-neutral-200)',  // Borders, dividers
  300: 'var(--color-neutral-300)',  // Stronger borders
  400: 'var(--color-neutral-400)',  // Placeholder text
  500: 'var(--color-neutral-500)',  // Muted text
  600: 'var(--color-neutral-600)',  // Secondary text
  700: 'var(--color-neutral-700)',  // Icons, subtle text
  800: 'var(--color-neutral-800)',  // Dark backgrounds
  900: 'var(--color-neutral-900)',  // Primary text (light mode)
  950: 'var(--color-neutral-950)',  // Page background (dark)
} as const;

// ============================================
// TYPOGRAPHY
// ============================================

export const fontFamilies = {
  sans: 'var(--font-sans)',
  serif: 'var(--font-serif)',
  mono: 'var(--font-mono)',
} as const;

export const fontSizes = {
  xs: 'var(--text-xs)',       // 12px
  sm: 'var(--text-sm)',       // 14px
  base: 'var(--text-base)',   // 16px
  lg: 'var(--text-lg)',       // 18px
  xl: 'var(--text-xl)',       // 20px
  '2xl': 'var(--text-2xl)',   // 24px
  '3xl': 'var(--text-3xl)',   // 30px
  '4xl': 'var(--text-4xl)',   // 36px
  '5xl': 'var(--text-5xl)',   // 48px
  '6xl': 'var(--text-6xl)',   // 60px
  '7xl': 'var(--text-7xl)',   // 72px
  '8xl': 'var(--text-8xl)',   // 96px
  '9xl': 'var(--text-9xl)',   // 128px
} as const;

export const fontWeights = {
  thin: 'var(--font-thin)',           // 100
  extralight: 'var(--font-extralight)', // 200
  light: 'var(--font-light)',         // 300
  normal: 'var(--font-normal)',       // 400
  medium: 'var(--font-medium)',       // 500
  semibold: 'var(--font-semibold)',   // 600
  bold: 'var(--font-bold)',           // 700
  extrabold: 'var(--font-extrabold)', // 800
  black: 'var(--font-black)',         // 900
} as const;

export const lineHeights = {
  none: 'var(--leading-none)',       // 1
  tight: 'var(--leading-tight)',     // 1.25
  snug: 'var(--leading-snug)',       // 1.375
  normal: 'var(--leading-normal)',   // 1.5
  relaxed: 'var(--leading-relaxed)', // 1.625
  loose: 'var(--leading-loose)',     // 2
} as const;

export const letterSpacing = {
  tighter: 'var(--tracking-tighter)', // -0.05em
  tight: 'var(--tracking-tight)',     // -0.025em
  normal: 'var(--tracking-normal)',   // 0em
  wide: 'var(--tracking-wide)',       // 0.025em
  wider: 'var(--tracking-wider)',     // 0.05em
  widest: 'var(--tracking-widest)',   // 0.1em
} as const;

// ============================================
// SPACING
// ============================================

export const spacing = {
  0: 'var(--spacing-0)',       // 0
  px: 'var(--spacing-px)',     // 1px
  0.5: 'var(--spacing-0_5)',   // 2px
  1: 'var(--spacing-1)',       // 4px
  1.5: 'var(--spacing-1_5)',   // 6px
  2: 'var(--spacing-2)',       // 8px
  2.5: 'var(--spacing-2_5)',   // 10px
  3: 'var(--spacing-3)',       // 12px
  3.5: 'var(--spacing-3_5)',   // 14px
  4: 'var(--spacing-4)',       // 16px
  5: 'var(--spacing-5)',       // 20px
  6: 'var(--spacing-6)',       // 24px
  7: 'var(--spacing-7)',       // 28px
  8: 'var(--spacing-8)',       // 32px
  9: 'var(--spacing-9)',       // 36px
  10: 'var(--spacing-10)',     // 40px
  11: 'var(--spacing-11)',     // 44px
  12: 'var(--spacing-12)',     // 48px
  14: 'var(--spacing-14)',     // 56px
  16: 'var(--spacing-16)',     // 64px
  20: 'var(--spacing-20)',     // 80px
  24: 'var(--spacing-24)',     // 96px
  28: 'var(--spacing-28)',     // 112px
  32: 'var(--spacing-32)',     // 128px
  36: 'var(--spacing-36)',     // 144px
  40: 'var(--spacing-40)',     // 160px
  44: 'var(--spacing-44)',     // 176px
  48: 'var(--spacing-48)',     // 192px
  52: 'var(--spacing-52)',     // 208px
  56: 'var(--spacing-56)',     // 224px
  60: 'var(--spacing-60)',     // 240px
  64: 'var(--spacing-64)',     // 256px
  72: 'var(--spacing-72)',     // 288px
  80: 'var(--spacing-80)',     // 320px
  96: 'var(--spacing-96)',     // 384px
} as const;

// ============================================
// BORDER RADIUS
// ============================================

export const borderRadius = {
  none: 'var(--radius-none)',   // 0
  sm: 'var(--radius-sm)',       // 2px
  DEFAULT: 'var(--radius)',     // 4px - default for shadcn/ui
  md: 'var(--radius-md)',       // 6px
  lg: 'var(--radius-lg)',       // 8px
  xl: 'var(--radius-xl)',       // 12px
  '2xl': 'var(--radius-2xl)',   // 16px
  '3xl': 'var(--radius-3xl)',   // 24px
  full: 'var(--radius-full)',   // 9999px
} as const;

// ============================================
// SHADOWS
// ============================================

export const shadows = {
  xs: 'var(--shadow-xs)',
  sm: 'var(--shadow-sm)',
  DEFAULT: 'var(--shadow)',
  md: 'var(--shadow-md)',
  lg: 'var(--shadow-lg)',
  xl: 'var(--shadow-xl)',
  '2xl': 'var(--shadow-2xl)',
  inner: 'var(--shadow-inner)',
  none: 'var(--shadow-none)',
} as const;

// ============================================
// TRANSITIONS
// ============================================

export const durations = {
  75: 'var(--duration-75)',     // 75ms
  100: 'var(--duration-100)',   // 100ms
  150: 'var(--duration-150)',   // 150ms - default
  200: 'var(--duration-200)',   // 200ms
  300: 'var(--duration-300)',   // 300ms
  500: 'var(--duration-500)',   // 500ms
  700: 'var(--duration-700)',   // 700ms
  1000: 'var(--duration-1000)', // 1000ms
} as const;

export const easings = {
  linear: 'var(--ease-linear)',
  in: 'var(--ease-in)',
  out: 'var(--ease-out)',
  inOut: 'var(--ease-in-out)',
} as const;

// ============================================
// THEME VARIABLES (for use in components)
// ============================================

/**
 * Theme-aware variables that automatically switch between light/dark mode.
 * Use these in components instead of direct color references.
 */
export const themeVars = {
  // Backgrounds
  background: 'var(--background)',
  backgroundSecondary: 'var(--background-secondary)',
  backgroundTertiary: 'var(--background-tertiary)',

  // Foregrounds
  foreground: 'var(--foreground)',
  foregroundSecondary: 'var(--foreground-secondary)',
  foregroundMuted: 'var(--foreground-muted)',

  // Components
  card: 'var(--card)',
  cardForeground: 'var(--card-foreground)',
  popover: 'var(--popover)',
  popoverForeground: 'var(--popover-foreground)',

  // Primary
  primary: 'var(--primary)',
  primaryHover: 'var(--primary-hover)',
  primaryForeground: 'var(--primary-foreground)',

  // Secondary
  secondary: 'var(--secondary)',
  secondaryHover: 'var(--secondary-hover)',
  secondaryForeground: 'var(--secondary-foreground)',

  // Accent
  accent: 'var(--accent)',
  accentHover: 'var(--accent-hover)',
  accentForeground: 'var(--accent-foreground)',

  // Muted
  muted: 'var(--muted)',
  mutedForeground: 'var(--muted-foreground)',

  // Destructive
  destructive: 'var(--destructive)',
  destructiveHover: 'var(--destructive-hover)',
  destructiveForeground: 'var(--destructive-foreground)',

  // Semantic
  success: 'var(--success)',
  successForeground: 'var(--success-foreground)',
  warning: 'var(--warning)',
  warningForeground: 'var(--warning-foreground)',
  error: 'var(--error)',
  errorForeground: 'var(--error-foreground)',

  // Borders & Input
  border: 'var(--border)',
  borderSecondary: 'var(--border-secondary)',
  input: 'var(--input)',
  inputFocus: 'var(--input-focus)',
  ring: 'var(--ring)',

  // Radius
  radius: 'var(--radius)',
} as const;

// ============================================
// Z-INDEX SCALE
// ============================================

export const zIndex = {
  0: 'var(--z-0)',
  10: 'var(--z-10)',    // Dropdowns
  20: 'var(--z-20)',    // Sticky elements
  30: 'var(--z-30)',    // Fixed elements
  40: 'var(--z-40)',    // Modals backdrop
  50: 'var(--z-50)',    // Modals, tooltips
  auto: 'var(--z-auto)',
} as const;
