import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'order',
  title: 'Order ',
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
      name: 'message',
      title: 'Message',
      type: 'text',
      description: 'Buyer message or inquiry',
    }),

    defineField({
      name: 'trackingCode',
      title: 'Tracking Code',
      type: 'string',
      description: 'Generated tracking code shared with the buyer',
      readOnly: true,
    }),

    defineField({
      name: 'buyerEmailNormalized',
      title: 'Buyer Email (normalized)',
      type: 'string',
      description: 'Lowercased email used for secure lookups',
      hidden: true,
      readOnly: true,
    }),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Contacted', value: 'contacted' },
          { title: 'In Discussion', value: 'discussion' },
          { title: 'Completed', value: 'completed' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
      initialValue: 'new',
    }),
  ],
})
