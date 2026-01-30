import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project / Case Study',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'details', title: 'Project Details' },
    { name: 'media', title: 'Media' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'localizedString',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'localizedSlug',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
      group: 'details',
      description: 'Name of the client/company',
    }),
    defineField({
      name: 'clientLogo',
      title: 'Client Logo',
      type: 'image',
      group: 'details',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'services',
      title: 'Services Used',
      type: 'array',
      group: 'details',
      of: [
        {
          type: 'reference',
          to: [{ type: 'service' }],
        },
      ],
      description: 'Which services were used in this project',
    }),
    defineField({
      name: 'completionDate',
      title: 'Completion Date',
      type: 'date',
      group: 'details',
      options: {
        dateFormat: 'MMMM YYYY',
      },
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      group: 'details',
      description: 'Where the project was realized (city/region)',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'localizedText',
      group: 'content',
      description: 'Short summary for project cards and listings',
    }),
    defineField({
      name: 'challenge',
      title: 'The Challenge',
      type: 'localizedPortableText',
      group: 'content',
      description: 'What problem did the client face?',
    }),
    defineField({
      name: 'solution',
      title: 'Our Solution',
      type: 'localizedPortableText',
      group: 'content',
      description: 'How did we solve the challenge?',
    }),
    defineField({
      name: 'results',
      title: 'Results',
      type: 'localizedPortableText',
      group: 'content',
      description: 'What was the outcome?',
    }),
    defineField({
      name: 'keyMetrics',
      title: 'Key Metrics',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'e.g., "50+", "3 Tage", "100m2"',
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'localizedString',
              description: 'e.g., "Fahrzeuge beschriftet", "Installationszeit"',
            }),
          ],
          preview: {
            select: {
              value: 'value',
              label: 'label.de',
            },
            prepare({ value, label }) {
              return {
                title: value || 'No value',
                subtitle: label || 'No label',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'testimonial',
      title: 'Client Testimonial',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'quote',
          title: 'Quote',
          type: 'localizedText',
        }),
        defineField({
          name: 'author',
          title: 'Author Name',
          type: 'string',
        }),
        defineField({
          name: 'role',
          title: 'Author Role',
          type: 'string',
          description: 'e.g., "Marketing Manager"',
        }),
      ],
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'localizedString',
          title: 'Alternative text',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Project Gallery',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'localizedString',
              title: 'Alternative text',
            },
            {
              name: 'caption',
              type: 'localizedString',
              title: 'Caption',
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'beforeAfter',
      title: 'Before/After Images',
      type: 'object',
      group: 'media',
      fields: [
        defineField({
          name: 'before',
          title: 'Before Image',
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'localizedString',
              title: 'Alternative text',
            },
          ],
        }),
        defineField({
          name: 'after',
          title: 'After Image',
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'localizedString',
              title: 'Alternative text',
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      group: 'content',
      description: 'Show this project on the homepage',
      initialValue: false,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  orderings: [
    {
      title: 'Completion Date (newest)',
      name: 'dateDesc',
      by: [{ field: 'completionDate', direction: 'desc' }],
    },
    {
      title: 'Completion Date (oldest)',
      name: 'dateAsc',
      by: [{ field: 'completionDate', direction: 'asc' }],
    },
    {
      title: 'Client Name',
      name: 'clientAsc',
      by: [{ field: 'client', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title.de',
      client: 'client',
      date: 'completionDate',
      media: 'mainImage',
      featured: 'featured',
    },
    prepare({ title, client, date, media, featured }) {
      const year = date ? new Date(date).getFullYear() : ''
      return {
        title: `${featured ? '* ' : ''}${title || 'Untitled'}`,
        subtitle: [client, year].filter(Boolean).join(' - '),
        media,
      }
    },
  },
})
