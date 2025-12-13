import {
  BookIcon,
  TagIcon,
  StarIcon,
  CheckmarkCircleIcon,
  ClockIcon,
  CommentIcon,
  DocumentIcon,
} from '@sanity/icons'
import type {StructureResolver} from 'sanity/structure'

export const deskStructure: StructureResolver = S =>
  S.list()
    .title('Store admin')
    .items([
      S.listItem()
        .title('Books: upload & inventory')
        .icon(BookIcon)
        .child(
          S.documentTypeList('book')
            .title('Books')
            .defaultOrdering([{field: 'title', direction: 'asc'}])
        ),

      S.listItem()
        .title('Categories')
        .icon(TagIcon)
        .child(
          S.documentTypeList('category')
            .title('Categories')
        ),

      S.divider(),

      S.listItem()
        .title('Comments & ratings')
        .icon(CommentIcon)
        .child(
          S.documentTypeList('review')
            .title('Reviews & ratings')
            .filter('_type == "review"')
            .defaultOrdering([
              {field: 'status', direction: 'asc'},
              {field: '_createdAt', direction: 'desc'},
            ])
        ),

      S.listItem()
        .title('Top-rated highlights')
        .icon(StarIcon)
        .child(
          S.documentTypeList('review')
            .title('Approved 4–5 star reviews')
            .filter('_type == "review" && rating >= $min && status == "approved"')
            .params({min: 4})
            .defaultOrdering([{field: 'rating', direction: 'desc'}])
        ),

      S.divider(),

      S.listItem()
        .title('Orders to confirm')
        .icon(CheckmarkCircleIcon)
        .child(
          S.documentTypeList('order')
            .title('Orders to confirm')
            .filter('_type == "order" && status == "new"')
            .defaultOrdering([{field: '_createdAt', direction: 'desc'}])
        ),

      S.listItem()
        .title('Orders in progress')
        .icon(ClockIcon)
        .child(
          S.documentTypeList('order')
            .title('Orders in progress')
            .filter('_type == "order" && status in ["contacted", "discussion"]')
            .defaultOrdering([{field: '_updatedAt', direction: 'desc'}])
        ),

      S.listItem()
        .title('All orders')
        .icon(DocumentIcon)
        .child(
          S.documentTypeList('order')
            .title('All orders')
            .defaultOrdering([{field: '_createdAt', direction: 'desc'}])
        ),
    ])
