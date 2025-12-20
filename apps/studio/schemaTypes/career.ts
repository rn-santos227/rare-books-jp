import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'career',
  title: 'Career Posting',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Role title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'titleJa',
      title: 'Role title (Japanese)',
      type: 'string',
      description: 'Optional localized title for Japanese readers.',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'locationJa',
      title: 'Location (Japanese)',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Employment type',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'typeJa',
      title: 'Employment type (Japanese)',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'descriptionJa',
      title: 'Description (Japanese)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Open', value: 'open'},
          {title: 'Closed', value: 'closed'},
        ],
      },
      initialValue: 'open',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'priority',
      title: 'Display priority',
      type: 'number',
      description: 'Lower numbers appear first.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'location',
      status: 'status',
    },
    prepare({title, subtitle, status}) {
      return {
        title,
        subtitle: `${subtitle || 'Unspecified'} · ${status || 'open'}`,
      }
    },
  },
})
