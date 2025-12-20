import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'supportInquiry',
  title: 'Support Inquiry',
  type: 'document',

  fields: [
    defineField({
      name: 'requesterName',
      title: 'Requester name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'requesterEmail',
      title: 'Requester email',
      type: 'string',
      validation: Rule => Rule.required().email(),
    }),

    defineField({
      name: 'requesterEmailNormalized',
      title: 'Requester email (normalized)',
      type: 'string',
      hidden: true,
      readOnly: true,
    }),

    defineField({
      name: 'topic',
      title: 'Topic',
      type: 'string',
      options: {
        list: [
          {title: 'Order help', value: 'order'},
          {title: 'Book or catalog question', value: 'catalog'},
          {title: 'Shipping & delivery', value: 'shipping'},
          {title: 'Account & billing', value: 'account'},
          {title: 'Something else', value: 'other'},
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'orderTrackingCode',
      title: 'Order tracking code',
      type: 'string',
      description: 'Tracking code provided to the customer (if applicable)',
    }),

    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'New', value: 'new'},
          {title: 'In review', value: 'in_review'},
          {title: 'Responded', value: 'responded'},
          {title: 'Closed', value: 'closed'},
        ],
        layout: 'radio',
      },
      initialValue: 'new',
    }),

    defineField({
      name: 'submittedAt',
      title: 'Submitted at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
})
