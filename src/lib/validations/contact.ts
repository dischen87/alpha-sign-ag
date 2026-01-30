import { z } from 'zod';

/**
 * Project types available for quote requests
 */
export const projectTypes = [
  'fahrzeugbeschriftung',
  'leuchtreklame',
  'signaletik',
  'carWrapping',
  'gebaeudebeschriftung',
  'messeauftritte',
  'kunstAmBau',
  'andere',
] as const;

export type ProjectType = (typeof projectTypes)[number];

/**
 * Timeline options for project delivery
 */
export const timelineOptions = [
  'asap',
  '1month',
  '3months',
  '6months',
  'flexible',
] as const;

export type TimelineOption = (typeof timelineOptions)[number];

/**
 * Budget range configuration
 */
export const BUDGET_CONFIG = {
  min: 500,
  max: 50000,
  step: 500,
  defaultValue: 5000,
} as const;

/**
 * Validation messages (can be overridden with i18n)
 */
export type ValidationMessages = {
  nameRequired: string;
  nameMin: string;
  emailRequired: string;
  emailInvalid: string;
  phoneInvalid: string;
  projectTypeRequired: string;
  projectDetailsRequired: string;
  projectDetailsMin: string;
  timelineRequired: string;
};

/**
 * Default validation messages (German)
 */
export const defaultValidationMessages: ValidationMessages = {
  nameRequired: 'Bitte geben Sie Ihren Namen ein',
  nameMin: 'Der Name muss mindestens 2 Zeichen lang sein',
  emailRequired: 'Bitte geben Sie Ihre E-Mail-Adresse ein',
  emailInvalid: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
  phoneInvalid: 'Bitte geben Sie eine gültige Telefonnummer ein',
  projectTypeRequired: 'Bitte wählen Sie eine Projektart',
  projectDetailsRequired: 'Bitte beschreiben Sie Ihr Projekt',
  projectDetailsMin: 'Die Beschreibung muss mindestens 10 Zeichen lang sein',
  timelineRequired: 'Bitte wählen Sie einen Zeitrahmen',
};

/**
 * Create contact form schema with custom messages
 */
export function createContactFormSchema(messages: ValidationMessages = defaultValidationMessages) {
  return z.object({
    // Step 1: Contact Information
    name: z
      .string()
      .min(1, messages.nameRequired)
      .min(2, messages.nameMin),
    email: z
      .string()
      .min(1, messages.emailRequired)
      .email(messages.emailInvalid),
    phone: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^[\d\s+()-]{7,20}$/.test(val),
        messages.phoneInvalid
      ),
    company: z.string().optional(),

    // Step 2: Project Type
    projectType: z.enum(projectTypes, {
      errorMap: () => ({ message: messages.projectTypeRequired }),
    }),

    // Step 3: Project Details
    projectDetails: z
      .string()
      .min(1, messages.projectDetailsRequired)
      .min(10, messages.projectDetailsMin),
    budget: z.number().min(BUDGET_CONFIG.min).max(BUDGET_CONFIG.max + 1), // +1 for "50000+"
    timeline: z.enum(timelineOptions, {
      errorMap: () => ({ message: messages.timelineRequired }),
    }),

    // Spam protection fields (not shown to user)
    honeypot: z.string().max(0).optional(), // Must be empty
    formLoadTime: z.number(), // Timestamp when form was loaded
  });
}

/**
 * Contact form data type
 */
export type ContactFormData = z.infer<ReturnType<typeof createContactFormSchema>>;

/**
 * API submission data (without spam protection fields exposed)
 */
export type ContactSubmissionData = Omit<ContactFormData, 'honeypot' | 'formLoadTime'>;

/**
 * Step 1 schema for partial validation
 */
export function createStep1Schema(messages: ValidationMessages = defaultValidationMessages) {
  return z.object({
    name: z.string().min(1, messages.nameRequired).min(2, messages.nameMin),
    email: z.string().min(1, messages.emailRequired).email(messages.emailInvalid),
    phone: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^[\d\s+()-]{7,20}$/.test(val),
        messages.phoneInvalid
      ),
    company: z.string().optional(),
  });
}

/**
 * Step 2 schema for partial validation
 */
export function createStep2Schema(messages: ValidationMessages = defaultValidationMessages) {
  return z.object({
    projectType: z.enum(projectTypes, {
      errorMap: () => ({ message: messages.projectTypeRequired }),
    }),
  });
}

/**
 * Step 3 schema for partial validation
 */
export function createStep3Schema(messages: ValidationMessages = defaultValidationMessages) {
  return z.object({
    projectDetails: z
      .string()
      .min(1, messages.projectDetailsRequired)
      .min(10, messages.projectDetailsMin),
    budget: z.number().min(BUDGET_CONFIG.min).max(BUDGET_CONFIG.max + 1),
    timeline: z.enum(timelineOptions, {
      errorMap: () => ({ message: messages.timelineRequired }),
    }),
  });
}

/**
 * Spam protection validation
 * - Honeypot must be empty
 * - Form must have been loaded for at least 3 seconds
 */
export function validateSpamProtection(data: ContactFormData): { valid: boolean; reason?: string } {
  // Check honeypot
  if (data.honeypot && data.honeypot.length > 0) {
    return { valid: false, reason: 'honeypot' };
  }

  // Check time-based validation (minimum 3 seconds)
  const timeDiff = Date.now() - data.formLoadTime;
  if (timeDiff < 3000) {
    return { valid: false, reason: 'too_fast' };
  }

  return { valid: true };
}
