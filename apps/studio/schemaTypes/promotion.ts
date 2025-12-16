import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'promotion',
  title: 'Promotion',
  type: 'document',
  description: 'Hero and campaign banners featured on the marketplace homepage.',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'titleJa',
      title: 'Title (Japanese)',
      type: 'string',
      description: 'Localized headline for Japanese visitors.',
    }),

    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short supporting line that appears above the headline.',
    }),

    defineField({
      name: 'taglineJa',
      title: 'Tagline (Japanese)',
      type: 'string',
      description: 'Japanese translation of the supporting line.',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'descriptionJa',
      title: 'Description (Japanese)',
      type: 'text',
      rows: 3,
      description: 'Localized description shown when the site is in Japanese.',
    }),

    defineField({
      name: 'ctaLabel',
      title: 'CTA label',
      type: 'string',
      description: 'Primary action button copy (e.g., "Browse rare releases").',
    }),

    defineField({
      name: 'ctaLabelJa',
      title: 'CTA label (Japanese)',
      type: 'string',
      description: 'Localized call-to-action text for Japanese visitors.',
    }),

    defineField({
      name: 'ctaHref',
      title: 'CTA link',
      type: 'url',
      description: 'Where the hero button should link to.',
    }),

    defineField({
      name: 'image',
      title: 'Hero image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: Rule => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      description: 'Optional label rendered above the hero, such as "New arrival".',
    }),
    defineField({
      name: 'badgeJa',
      title: 'Badge (Japanese)',
      type: 'string',
      description: 'Japanese badge label.',
    }),

    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      description: 'Visual theme token for the web hero (e.g., indigo, amber).',
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'number',
      description: 'Lower numbers are featured first.',
      initialValue: 1,
      validation: Rule => Rule.min(1),
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'tagline',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title ?? 'New promotion',
        subtitle: subtitle ?? 'Hero banner',
        media,
      }
    },
  },
})
