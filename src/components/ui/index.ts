/**
 * UI Components Index
 *
 * Export all UI components for convenient imports.
 *
 * Usage in Astro files:
 * ---
 * import Button from '@/components/ui/Button.astro';
 * import { Card, Badge, Input } from '@/components/ui';
 * ---
 *
 * For React components (use with client:* directives):
 * ---
 * import { Button } from '@/components/ui/button';
 * import { Input } from '@/components/ui/Input';
 * ---
 *
 * Note: Due to Astro's component system, you may need to import
 * Astro components individually from their files rather than from this index.
 * This file serves as documentation for available components.
 */

// React component exports (shadcn/ui style)
export { Button, buttonVariants } from './button';
export type { ButtonProps } from './button';

export { Input } from './Input';
export type { InputProps } from './Input';

export { Select } from './Select';
export type { SelectProps, SelectOption } from './Select';

export { Textarea } from './Textarea';
export type { TextareaProps } from './Textarea';

// Astro component list (for documentation purposes)
// In Astro, import components directly:
//
// import Button from '@/components/ui/Button.astro';
// import Card from '@/components/ui/Card.astro';
// import Badge from '@/components/ui/Badge.astro';
// import Input from '@/components/ui/Input.astro';
// import Textarea from '@/components/ui/Textarea.astro';
// import Select from '@/components/ui/Select.astro';
// import Modal from '@/components/ui/Modal.astro';
// import Accordion from '@/components/ui/Accordion.astro';
// import Tabs from '@/components/ui/Tabs.astro';
// import Breadcrumb from '@/components/ui/Breadcrumb.astro';
// import Spinner from '@/components/ui/Spinner.astro';

export const astroComponents = [
  'Button',
  'Card',
  'Badge',
  'Input',
  'Textarea',
  'Select',
  'Modal',
  'Accordion',
  'Tabs',
  'Breadcrumb',
  'Spinner',
] as const;

export type AstroComponentName = typeof astroComponents[number];
