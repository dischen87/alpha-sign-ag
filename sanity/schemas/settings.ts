import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'company', title: 'Company Info', default: true },
    { name: 'contact', title: 'Contact' },
    { name: 'social', title: 'Social Media' },
    { name: 'seo', title: 'Default SEO' },
  ],
  fields: [
    // Company Information
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      group: 'company',
      initialValue: 'Alpha Sign AG',
    }),
    defineField({
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'image',
      group: 'company',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
    }),
    defineField({
      name: 'companyLogoLight',
      title: 'Company Logo (Light version)',
      type: 'image',
      group: 'company',
      description: 'Light version of the logo for dark backgrounds',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'tagline',
      title: 'Company Tagline',
      type: 'localizedString',
      group: 'company',
    }),
    defineField({
      name: 'description',
      title: 'Company Description',
      type: 'localizedText',
      group: 'company',
      description: 'Brief description of the company for footer, about sections, etc.',
    }),

    // Contact Information
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      group: 'contact',
      fields: [
        defineField({
          name: 'street',
          title: 'Street',
          type: 'string',
        }),
        defineField({
          name: 'postalCode',
          title: 'Postal Code',
          type: 'string',
        }),
        defineField({
          name: 'city',
          title: 'City',
          type: 'string',
        }),
        defineField({
          name: 'country',
          title: 'Country',
          type: 'string',
          initialValue: 'Switzerland',
        }),
      ],
    }),
    defineField({
      name: 'email',
      title: 'Primary Email',
      type: 'email',
      group: 'contact',
    }),
    defineField({
      name: 'phone',
      title: 'Primary Phone',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'fax',
      title: 'Fax',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'openingHours',
      title: 'Opening Hours',
      type: 'array',
      group: 'contact',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'days',
              title: 'Days',
              type: 'localizedString',
              description: 'e.g., "Montag - Freitag" / "Monday - Friday"',
            }),
            defineField({
              name: 'hours',
              title: 'Hours',
              type: 'string',
              description: 'e.g., "08:00 - 17:00"',
            }),
          ],
          preview: {
            select: {
              days: 'days.de',
              hours: 'hours',
            },
            prepare({ days, hours }) {
              return {
                title: days || 'No days',
                subtitle: hours || 'No hours',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'Google Maps URL',
      type: 'url',
      group: 'contact',
    }),
    defineField({
      name: 'coordinates',
      title: 'Coordinates',
      type: 'object',
      group: 'contact',
      fields: [
        defineField({
          name: 'lat',
          title: 'Latitude',
          type: 'number',
        }),
        defineField({
          name: 'lng',
          title: 'Longitude',
          type: 'number',
        }),
      ],
    }),

    // Social Media
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      group: 'social',
      fields: [
        defineField({
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        }),
        defineField({
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
        }),
        defineField({
          name: 'xing',
          title: 'Xing',
          type: 'url',
        }),
        defineField({
          name: 'youtube',
          title: 'YouTube',
          type: 'url',
        }),
      ],
    }),

    // Default SEO
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO Settings',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Default Meta Title',
          type: 'localizedString',
        }),
        defineField({
          name: 'metaDescription',
          title: 'Default Meta Description',
          type: 'localizedText',
        }),
        defineField({
          name: 'ogImage',
          title: 'Default Open Graph Image',
          type: 'image',
          description: 'Default image for social sharing (1200x630px recommended)',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'googleSiteVerification',
          title: 'Google Site Verification',
          type: 'string',
          description: 'Google Search Console verification code',
        }),
      ],
    }),

    // Legal
    defineField({
      name: 'legalInfo',
      title: 'Legal Information',
      type: 'object',
      group: 'company',
      fields: [
        defineField({
          name: 'vatNumber',
          title: 'VAT Number',
          type: 'string',
          description: 'Swiss VAT number (e.g., CHE-123.456.789 MWST)',
        }),
        defineField({
          name: 'commercialRegister',
          title: 'Commercial Register',
          type: 'string',
          description: 'Commercial register number',
        }),
        defineField({
          name: 'jurisdiction',
          title: 'Jurisdiction',
          type: 'string',
          description: 'Legal jurisdiction (e.g., "Zurich, Switzerland")',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
        subtitle: 'Global configuration',
      }
    },
  },
})
