import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'review',
  title: 'Review',
  type: 'document',

  fields: [
    defineField({
      name: 'book',
      title: 'Book',
      type: 'reference',
      to: [{ type: 'book' }],
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'reviewType',
      title: 'Review Type',
      type: 'string',
      options: {
        list: [
          { title: 'Editorial', value: 'editorial' },
          { title: 'User', value: 'user' },
        ],
        layout: 'radio',
      },
      initialValue: 'user',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: ({ parent }) => parent?.reviewType === 'user',
    }),

    defineField({
      name: 'body',
      title: 'Review Text',
      type: 'array',
      of: [{ type: 'block' }],
      hidden: ({ parent }) => parent?.reviewType === 'user',
    }),

    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: '1 (worst) to 5 (best)',
      validation: Rule =>
        Rule.custom((value, context) => {
          const parent = context.parent as { reviewType?: string }

          if (parent?.reviewType === 'user' && !value) {
            return 'User reviews require a rating'
          }

          if (value && (value < 1 || value > 5)) {
            return 'Rating must be between 1 and 5'
          }

          return true
        }),
    }),

    defineField({
      name: 'reviewerName',
      title: 'Reviewer Name',
      type: 'string',
      hidden: ({ parent }) => parent?.reviewType === 'editorial',
    }),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Approved', value: 'approved' },
          { title: 'Rejected', value: 'rejected' },
        ],
      },
      initialValue: 'pending',
    }),
  ],
})
