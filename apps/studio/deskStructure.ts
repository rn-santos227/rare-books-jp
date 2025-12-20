import {
  BookIcon,
  TagIcon,
  StarIcon,
  CheckmarkCircleIcon,
  ClockIcon,
  CommentIcon,
  DocumentIcon,
  BellIcon,
  UsersIcon,
} from '@sanity/icons'
import type {StructureResolver} from 'sanity/structure'

export const deskStructure: StructureResolver = S =>
  S.list()
    .title('Store Admin')
    .items([
      S.listItem()
        .title('Books: Upload & Inventory')
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

      S.listItem()
        .title('Genres')
        .icon(TagIcon)
        .child(S.documentTypeList('genre').title('Genres')),

      S.listItem()
        .title('Homepage Promotions')
        .icon(BellIcon)
        .child(
          S.documentTypeList('promotion')
            .title('Promotions')
            .defaultOrdering([{field: 'priority', direction: 'asc'}])
        ),

      S.listItem()
        .title('Careers')
        .icon(UsersIcon)
        .child(
          S.documentTypeList('career')
            .title('Career Postings')
            .filter('_type == "career" && status == $status')
            .params({status: 'open'})
            .defaultOrdering([
              {field: 'priority', direction: 'asc'},
              {field: '_createdAt', direction: 'desc'},
            ])
        ),

      S.divider(),
      S.listItem()
        .title('Comments & Ratings')
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
        .title('Top-Rated Highlights')
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
        .title('Orders to Confirm')
        .icon(CheckmarkCircleIcon)
        .child(
          S.documentTypeList('order')
            .title('Orders to Confirm')
            .filter('_type == "order" && status == "new"')
            .defaultOrdering([{field: '_createdAt', direction: 'desc'}])
        ),

      S.listItem()
        .title('Orders in Progress')
        .icon(ClockIcon)
        .child(
          S.documentTypeList('order')
            .title('Orders in Progress')
            .filter('_type == "order" && status in ["contacted", "discussion"]')
            .defaultOrdering([{field: '_updatedAt', direction: 'desc'}])
        ),

      S.listItem()
        .title('All Orders')
        .icon(DocumentIcon)
        .child(
          S.documentTypeList('order')
            .title('All Orders')
            .defaultOrdering([{field: '_createdAt', direction: 'desc'}])
        ),

      S.listItem()
        .title('Support Inquiries')
        .icon(DocumentIcon)
        .child(
          S.documentTypeList('support')
            .title('Support Inquiries')
            .defaultOrdering([{field: '_createdAt', direction: 'desc'}])
        ),
    ])
