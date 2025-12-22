import { defineType, defineField } from 'sanity'

type ReviewParent = {
  reviewType?: 'editorial' | 'user'
}

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
      description: 'Shown publicly for both editorial and user reviews',
    }),

    defineField({
      name: 'body',
      title: 'Review Text',
      type: 'array',
      of: [{ type: 'block' }],
      readOnly: ({ document }) => document?.reviewType === 'user',
    }),

    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: '1 (worst) to 5 (best)',
      validation: Rule =>
        Rule.custom((value, context) => {
          const parent = context.parent as ReviewParent

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
      description: 'Shown publicly for user reviews',
      readOnly: ({ document }) => document?.reviewType === 'user',
    }),

    defineField({
      name: 'reviewerEmail',
      title: 'Reviewer Email',
      type: 'string',
      description: 'Not shown publicly; used for moderation follow-up',
      validation: Rule => Rule.required().email().warning('Enter a valid email address'),
      readOnly: ({ document }) => document?.reviewType === 'user',
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

    defineField({
      name: 'buyerName',
      title: 'Legacy reviewer name',
      type: 'string',
      readOnly: true,
      hidden: ({ document }) => !document?.buyerName,
    }),

    defineField({
      name: 'buyerEmail',
      title: 'Legacy reviewer email',
      type: 'string',
      readOnly: true,
      hidden: ({ document }) => !document?.buyerEmail,
    }),
  ],
})
