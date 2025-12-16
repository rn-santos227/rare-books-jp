import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'genre',
  title: 'Genre',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'nameJa',
      title: 'Name (Japanese)',
      type: 'string',
      description: 'Localized Japanese name for the genre.',
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: Rule => Rule.required(),
    }),
  ],
})
