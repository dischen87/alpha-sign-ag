import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'localizedSlug',
  title: 'Localized Slug',
  type: 'object',
  fields: [
    defineField({
      name: 'de',
      title: 'German Slug (DE)',
      type: 'slug',
      options: {
        source: (doc: Record<string, unknown>) => {
          const title = doc.title as { de?: string } | undefined
          return title?.de || ''
        },
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'en',
      title: 'English Slug (EN)',
      type: 'slug',
      options: {
        source: (doc: Record<string, unknown>) => {
          const title = doc.title as { en?: string } | undefined
          return title?.en || ''
        },
        maxLength: 96,
      },
    }),
  ],
  options: {
    collapsible: true,
    collapsed: false,
  },
})
