import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'localizedString',
  title: 'Localized String',
  type: 'object',
  fields: [
    defineField({
      name: 'de',
      title: 'German (DE)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'en',
      title: 'English (EN)',
      type: 'string',
    }),
  ],
  options: {
    collapsible: true,
    collapsed: false,
  },
})
