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
      name: 'buyerName',
      title: 'Buyer Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'buyerEmail',
      title: 'Buyer Email',
      type: 'string',
      validation: Rule =>
        Rule.required().email(),
    }),

    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      description: 'Buyer message or inquiry',
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
