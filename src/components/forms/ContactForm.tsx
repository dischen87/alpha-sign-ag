import * as React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Slider } from '@/components/ui/Slider';
import { Button } from '@/components/ui/button';
import {
  createContactFormSchema,
  projectTypes,
  timelineOptions,
  BUDGET_CONFIG,
  type ContactFormData,
  type ValidationMessages,
  type ProjectType,
  type TimelineOption,
} from '@/lib/validations/contact';

/**
 * Translations interface for the contact form
 */
export interface ContactFormTranslations {
  title: string;
  subtitle: string;
  step: string;
  of: string;
  stepTitles: {
    contact: string;
    project: string;
    details: string;
  };
  fields: {
    name: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    phone: { label: string; placeholder: string };
    company: { label: string; placeholder: string };
    projectType: { label: string; placeholder: string };
    projectDetails: { label: string; placeholder: string };
    budget: { label: string; min: string; max: string };
    timeline: {
      label: string;
      placeholder: string;
      options: Record<TimelineOption, string>;
    };
  };
  projectTypes: Record<ProjectType, string>;
  validation: ValidationMessages;
  success: { title: string; message: string };
  error: { title: string; message: string; spam: string };
  common: {
    back: string;
    next: string;
    submit: string;
    loading: string;
    optional: string;
  };
}

interface ContactFormProps {
  translations: ContactFormTranslations;
  locale: 'de' | 'en';
  onSuccess?: () => void;
  turnstileSiteKey?: string;
}

type FormStep = 1 | 2 | 3;

export function ContactForm({
  translations: t,
  locale,
  onSuccess,
  turnstileSiteKey,
}: ContactFormProps) {
  const [currentStep, setCurrentStep] = React.useState<FormStep>(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const [formLoadTime] = React.useState(() => Date.now());
  const [turnstileToken, setTurnstileToken] = React.useState<string>('');

  // Create schema with translated validation messages
  const schema = React.useMemo(
    () => createContactFormSchema(t.validation),
    [t.validation]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      projectType: undefined,
      projectDetails: '',
      budget: BUDGET_CONFIG.defaultValue,
      timeline: undefined,
      honeypot: '',
      formLoadTime,
    },
    mode: 'onBlur',
  });

  const budgetValue = watch('budget');

  // Format budget value for display
  const formatBudget = (value: number): string => {
    if (value >= BUDGET_CONFIG.max) {
      return `CHF ${BUDGET_CONFIG.max.toLocaleString(locale === 'de' ? 'de-CH' : 'en-CH')}+`;
    }
    return `CHF ${value.toLocaleString(locale === 'de' ? 'de-CH' : 'en-CH')}`;
  };

  // Validate current step before proceeding
  const validateStep = async (step: FormStep): Promise<boolean> => {
    const fieldsToValidate: (keyof ContactFormData)[] =
      step === 1
        ? ['name', 'email', 'phone', 'company']
        : step === 2
        ? ['projectType']
        : ['projectDetails', 'budget', 'timeline'];

    const isValid = await trigger(fieldsToValidate);
    return isValid;
  };

  const handleNext = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as FormStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as FormStep);
    }
  };

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          locale,
          turnstileToken,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || t.error.message);
      }

      setSubmitStatus('success');
      onSuccess?.();
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : t.error.message
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render Cloudflare Turnstile widget (placeholder)
  React.useEffect(() => {
    if (turnstileSiteKey && typeof window !== 'undefined') {
      // Turnstile integration placeholder
      // When implementing, uncomment the following:
      // const turnstile = (window as unknown as { turnstile: { render: (selector: string, options: { sitekey: string; callback: (token: string) => void }) => void } }).turnstile;
      // turnstile.render('#turnstile-container', { sitekey: turnstileSiteKey, callback: setTurnstileToken });
      console.log('Turnstile site key configured:', turnstileSiteKey);
      // Placeholder: Set empty token (remove this when implementing Turnstile)
      setTurnstileToken('');
    }
  }, [turnstileSiteKey]);

  // Success state
  if (submitStatus === 'success') {
    return (
      <div className="text-center py-12 px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--success-bg)] rounded-full mb-6">
          <svg
            className="w-8 h-8 text-[var(--success)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">{t.success.title}</h3>
        <p className="text-[var(--muted-foreground)]">{t.success.message}</p>
      </div>
    );
  }

  const projectTypeOptions = projectTypes.map((type) => ({
    value: type,
    label: t.projectTypes[type],
  }));

  const timelineOptionsList = timelineOptions.map((option) => ({
    value: option,
    label: t.fields.timeline.options[option],
  }));

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[var(--foreground)] mb-2">{t.title}</h2>
        <p className="text-[var(--muted-foreground)]">{t.subtitle}</p>
      </div>

      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-[var(--muted-foreground)]">
            {t.step} {currentStep} {t.of} 3
          </span>
          <span className="text-sm font-medium text-[var(--foreground)]">
            {currentStep === 1
              ? t.stepTitles.contact
              : currentStep === 2
              ? t.stepTitles.project
              : t.stepTitles.details}
          </span>
        </div>
        <div className="w-full bg-[var(--secondary)] rounded-full h-2">
          <div
            className="bg-[var(--primary)] h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Error message */}
      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-[var(--error-bg)] border border-[var(--error)] rounded-lg">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-[var(--error)] mt-0.5 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h4 className="font-medium text-[var(--error)]">{t.error.title}</h4>
              <p className="text-sm text-[var(--error)] mt-1">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Honeypot field - hidden from users */}
        <div className="absolute -left-[9999px] top-0" aria-hidden="true">
          <input
            type="text"
            {...register('honeypot')}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Hidden form load time */}
        <input type="hidden" {...register('formLoadTime', { valueAsNumber: true })} />

        {/* Step 1: Contact Information */}
        <div className={currentStep === 1 ? 'block' : 'hidden'}>
          <div className="space-y-6">
            <Input
              {...register('name')}
              label={t.fields.name.label}
              placeholder={t.fields.name.placeholder}
              error={errors.name?.message}
              required
              autoComplete="name"
            />

            <Input
              {...register('email')}
              type="email"
              label={t.fields.email.label}
              placeholder={t.fields.email.placeholder}
              error={errors.email?.message}
              required
              autoComplete="email"
            />

            <Input
              {...register('phone')}
              type="tel"
              label={`${t.fields.phone.label} (${t.common.optional})`}
              placeholder={t.fields.phone.placeholder}
              error={errors.phone?.message}
              autoComplete="tel"
            />

            <Input
              {...register('company')}
              label={`${t.fields.company.label} (${t.common.optional})`}
              placeholder={t.fields.company.placeholder}
              error={errors.company?.message}
              autoComplete="organization"
            />
          </div>
        </div>

        {/* Step 2: Project Type */}
        <div className={currentStep === 2 ? 'block' : 'hidden'}>
          <div className="space-y-6">
            <Select
              {...register('projectType')}
              label={t.fields.projectType.label}
              placeholder={t.fields.projectType.placeholder}
              options={projectTypeOptions}
              error={errors.projectType?.message}
              required
            />

            {/* Visual project type cards */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              {projectTypeOptions.map((option) => {
                const isSelected = watch('projectType') === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setValue('projectType', option.value as ProjectType, { shouldValidate: true })}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      isSelected
                        ? 'border-[var(--primary)] bg-[var(--primary-light)]'
                        : 'border-[var(--border)] hover:border-[var(--border-hover)]'
                    }`}
                  >
                    <span className={`text-sm font-medium ${isSelected ? 'text-[var(--primary)]' : 'text-[var(--foreground)]'}`}>
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Step 3: Project Details */}
        <div className={currentStep === 3 ? 'block' : 'hidden'}>
          <div className="space-y-6">
            <Textarea
              {...register('projectDetails')}
              label={t.fields.projectDetails.label}
              placeholder={t.fields.projectDetails.placeholder}
              error={errors.projectDetails?.message}
              required
              rows={5}
            />

            <Slider
              label={t.fields.budget.label}
              min={BUDGET_CONFIG.min}
              max={BUDGET_CONFIG.max}
              step={BUDGET_CONFIG.step}
              value={budgetValue}
              onChange={(value) => setValue('budget', value, { shouldValidate: true })}
              formatValue={formatBudget}
              minLabel={t.fields.budget.min}
              maxLabel={t.fields.budget.max}
            />

            <Select
              {...register('timeline')}
              label={t.fields.timeline.label}
              placeholder={t.fields.timeline.placeholder}
              options={timelineOptionsList}
              error={errors.timeline?.message}
              required
            />

            {/* Turnstile placeholder */}
            {turnstileSiteKey && (
              <div id="turnstile-container" className="flex justify-center my-4">
                {/* Cloudflare Turnstile widget will be rendered here */}
                <div className="text-sm text-[var(--muted-foreground)]">
                  Protected by Cloudflare Turnstile
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-[var(--border)]">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className={currentStep === 1 ? 'invisible' : ''}
          >
            {t.common.back}
          </Button>

          {currentStep < 3 ? (
            <Button type="button" onClick={handleNext}>
              {t.common.next}
            </Button>
          ) : (
            <Button type="submit" isLoading={isSubmitting}>
              {isSubmitting ? t.common.loading : t.common.submit}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
