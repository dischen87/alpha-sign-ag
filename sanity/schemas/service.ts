import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'pricing', title: 'Pricing' },
    { name: 'media', title: 'Media' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
      name: 'serviceType',
      title: 'Service Type',
      type: 'string',
      group: 'content',
      options: {
        list: [
          { title: 'Fahrzeugbeschriftung', value: 'fahrzeugbeschriftung' },
          { title: 'Leuchtreklame', value: 'leuchtreklame' },
          { title: 'Signaletik', value: 'signaletik' },
          { title: 'Car Wrapping', value: 'car-wrapping' },
          { title: 'Gebaudebeschriftung', value: 'gebaeudebeschriftung' },
          { title: 'Messeauftritte', value: 'messeauftritte' },
          { title: 'Kunst am Bau', value: 'kunst-am-bau' },
          { title: 'Fine Art Prints', value: 'fine-art-prints' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'localizedText',
      group: 'content',
      description: 'Brief description for service cards and listings',
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'localizedPortableText',
      group: 'content',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Feature Title',
              type: 'localizedString',
            }),
            defineField({
              name: 'description',
              title: 'Feature Description',
              type: 'localizedText',
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Icon name or identifier',
            }),
          ],
          preview: {
            select: {
              title: 'title.de',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'priceRangeMin',
      title: 'Minimum Price (CHF)',
      type: 'number',
      group: 'pricing',
      description: 'Starting price in Swiss Francs',
    }),
    defineField({
      name: 'priceRangeMax',
      title: 'Maximum Price (CHF)',
      type: 'number',
      group: 'pricing',
      description: 'Upper price range in Swiss Francs',
    }),
    defineField({
      name: 'pricingNote',
      title: 'Pricing Note',
      type: 'localizedText',
      group: 'pricing',
      description: 'Additional pricing information (e.g., "Price depends on size and complexity")',
    }),
    defineField({
      name: 'priceUnit',
      title: 'Price Unit',
      type: 'string',
      group: 'pricing',
      options: {
        list: [
          { title: 'Per project', value: 'project' },
          { title: 'Per square meter', value: 'm2' },
          { title: 'Per hour', value: 'hour' },
          { title: 'Per vehicle', value: 'vehicle' },
          { title: 'On request', value: 'request' },
        ],
      },
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
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
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
      name: 'relatedProjects',
      title: 'Related Projects',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'reference',
          to: [{ type: 'project' }],
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      group: 'content',
      description: 'Lower numbers appear first',
      initialValue: 0,
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
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Title (DE)',
      name: 'titleDe',
      by: [{ field: 'title.de', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title.de',
      subtitle: 'serviceType',
      media: 'mainImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Untitled Service',
        subtitle: subtitle || 'No type',
        media,
      }
    },
  },
})
