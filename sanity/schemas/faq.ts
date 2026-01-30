import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'localizedPortableText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Allgemein / General', value: 'general' },
          { title: 'Services / Dienstleistungen', value: 'services' },
          { title: 'Preise / Pricing', value: 'pricing' },
          { title: 'Ablauf / Process', value: 'process' },
          { title: 'Material / Materials', value: 'materials' },
          { title: 'Garantie / Warranty', value: 'warranty' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'relatedServices',
      title: 'Related Services',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'service' }],
        },
      ],
      description: 'Link to related services for better context',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first within the same category',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      question: 'question.de',
      category: 'category',
    },
    prepare({ question, category }) {
      const categoryLabels: Record<string, string> = {
        general: 'Allgemein',
        services: 'Services',
        pricing: 'Preise',
        process: 'Ablauf',
        materials: 'Material',
        warranty: 'Garantie',
      }
      return {
        title: question || 'Untitled Question',
        subtitle: category ? categoryLabels[category] : 'No category',
      }
    },
  },
})
