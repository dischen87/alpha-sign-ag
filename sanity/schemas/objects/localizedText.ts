import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'localizedText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    defineField({
      name: 'de',
      title: 'German (DE)',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'en',
      title: 'English (EN)',
      type: 'text',
      rows: 4,
    }),
  ],
  options: {
    collapsible: true,
    collapsed: false,
  },
})
