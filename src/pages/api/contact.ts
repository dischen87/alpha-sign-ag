/**
 * Contact Form API Endpoint
 *
 * This endpoint handles quote request submissions from the contact form.
 *
 * IMPORTANT: For this server endpoint to work in production, you need to:
 * 1. Install an Astro adapter (e.g., @astrojs/vercel, @astrojs/netlify, @astrojs/cloudflare)
 * 2. Configure the adapter in astro.config.mjs
 * 3. Set TURNSTILE_SECRET_KEY environment variable if using Cloudflare Turnstile
 *
 * Example adapter installation:
 *   npm install @astrojs/vercel
 *   npm install @astrojs/netlify
 *   npm install @astrojs/cloudflare
 */
import type { APIRoute } from 'astro';
import {
  createContactFormSchema,
  validateSpamProtection,
  type ContactFormData,
  defaultValidationMessages,
} from '@/lib/validations/contact';

// Mark this endpoint as server-rendered (not prerendered)
export const prerender = false;

/**
 * Rate limiting store (in-memory, consider Redis for production)
 * Key: IP address, Value: { count: number, resetTime: number }
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // Max 5 requests per minute

/**
 * Check rate limit for an IP address
 */
function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || record.resetTime < now) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX - record.count };
}

/**
 * Verify Cloudflare Turnstile token
 * @see https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */
async function verifyTurnstileToken(token: string, ip: string): Promise<boolean> {
  const secretKey = import.meta.env.TURNSTILE_SECRET_KEY;

  // Skip verification if no secret key configured (development mode)
  if (!secretKey) {
    console.warn('TURNSTILE_SECRET_KEY not configured, skipping verification');
    return true;
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
        remoteip: ip,
      }),
    });

    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}

/**
 * Send notification email (placeholder)
 * Replace with your preferred email service (SendGrid, Resend, etc.)
 */
async function sendNotificationEmail(data: ContactFormData, locale: string): Promise<void> {
  // Placeholder: Log the submission
  console.log('New contact form submission:', {
    name: data.name,
    email: data.email,
    phone: data.phone,
    company: data.company,
    projectType: data.projectType,
    budget: data.budget,
    timeline: data.timeline,
    locale,
    submittedAt: new Date().toISOString(),
  });

  // TODO: Implement email sending
  // Example with Resend:
  // const resend = new Resend(import.meta.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: 'noreply@alphasign.ch',
  //   to: 'info@alphasign.ch',
  //   subject: `Neue Offertanfrage von ${data.name}`,
  //   html: `...`,
  // });
}

/**
 * Store submission in database (placeholder)
 * Replace with your preferred database (Supabase, PostgreSQL, etc.)
 */
async function storeSubmission(data: ContactFormData, locale: string, ip: string): Promise<void> {
  // Placeholder: Log the submission
  console.log('Storing submission:', {
    ...data,
    locale,
    ip,
    timestamp: new Date().toISOString(),
  });

  // TODO: Implement database storage
  // Example with Supabase:
  // const { error } = await supabase.from('contact_submissions').insert({
  //   name: data.name,
  //   email: data.email,
  //   phone: data.phone,
  //   company: data.company,
  //   project_type: data.projectType,
  //   project_details: data.projectDetails,
  //   budget: data.budget,
  //   timeline: data.timeline,
  //   locale,
  //   ip_address: ip,
  //   created_at: new Date().toISOString(),
  // });
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const ip = clientAddress || 'unknown';

  // Check rate limit
  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Too many requests. Please try again later.',
        code: 'RATE_LIMITED',
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '60',
          'X-RateLimit-Remaining': '0',
        },
      }
    );
  }

  try {
    // Parse request body
    const body = await request.json();
    const { turnstileToken, locale = 'de', ...formData } = body;

    // Validate form data
    const schema = createContactFormSchema(defaultValidationMessages);
    const parseResult = schema.safeParse(formData);

    if (!parseResult.success) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Validation failed',
          code: 'VALIDATION_ERROR',
          errors: parseResult.error.flatten().fieldErrors,
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Remaining': String(rateLimit.remaining),
          },
        }
      );
    }

    const validatedData = parseResult.data;

    // Validate spam protection
    const spamCheck = validateSpamProtection(validatedData);
    if (!spamCheck.valid) {
      console.warn(`Spam detected from ${ip}: ${spamCheck.reason}`);
      // Return success to not reveal spam detection
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Thank you for your submission.',
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Remaining': String(rateLimit.remaining),
          },
        }
      );
    }

    // Verify Turnstile token (if provided)
    if (turnstileToken) {
      const isTurnstileValid = await verifyTurnstileToken(turnstileToken, ip);
      if (!isTurnstileValid) {
        return new Response(
          JSON.stringify({
            success: false,
            message: 'Security verification failed. Please try again.',
            code: 'TURNSTILE_FAILED',
          }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              'X-RateLimit-Remaining': String(rateLimit.remaining),
            },
          }
        );
      }
    }

    // Store submission and send notification
    await Promise.all([
      storeSubmission(validatedData, locale, ip),
      sendNotificationEmail(validatedData, locale),
    ]);

    return new Response(
      JSON.stringify({
        success: true,
        message: locale === 'de'
          ? 'Ihre Anfrage wurde erfolgreich gesendet.'
          : 'Your request has been successfully submitted.',
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Remaining': String(rateLimit.remaining),
        },
      }
    );
  } catch (error) {
    console.error('Contact form error:', error);

    return new Response(
      JSON.stringify({
        success: false,
        message: 'An error occurred. Please try again later.',
        code: 'SERVER_ERROR',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Remaining': String(rateLimit.remaining),
        },
      }
    );
  }
};

// Handle unsupported methods
export const ALL: APIRoute = ({ request }) => {
  return new Response(
    JSON.stringify({
      success: false,
      message: `Method ${request.method} not allowed`,
      code: 'METHOD_NOT_ALLOWED',
    }),
    {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Allow': 'POST',
      },
    }
  );
};
