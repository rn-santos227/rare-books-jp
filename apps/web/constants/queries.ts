import { groq } from "next-sanity";

export const BOOKS_QUERY = groq`
  *[_type == "book" && status == "published"]|order(featured desc, _createdAt desc){
    _id,
    title,
    titleJa,
    author,
    authorJa,
    price,
    "createdAt": _createdAt,
    condition,
    featured,
    description,
    descriptionJa,
    inventory,
    marketplaceUrl,
    "slug": slug.current,
    "imageUrl": coverImage.asset->url,
    "coverAlt": coverImage.alt,
    "gallery": gallery[].asset->url,
    "category": category->{
      _id,
      name,
      nameJa,
      "slug": slug.current
    },
    "genres": genres[]->{
      _id,
      name,
      nameJa,
      "slug": slug.current
    }
  }
`;

export const HOME_BOOKS_QUERY = groq`
  *[_type == "book" && status == "published"]|order(featured desc, _createdAt desc)[0...18]{
    _id,
    title,
    titleJa,
    author,
    authorJa,
    price,
    "createdAt": _createdAt,
    condition,
    featured,
    description,
    descriptionJa,
    inventory,
    "slug": slug.current,
    "imageUrl": coverImage.asset->url,
    "coverAlt": coverImage.alt,
    "gallery": gallery[].asset->url,
    "category": category->{
      _id,
      name,
      nameJa,
      "slug": slug.current
    },
    "genres": genres[]->{
      _id,
      name,
      nameJa,
      "slug": slug.current
    }
  }
`;

export const CATEGORIES_QUERY = groq`
  *[_type == "category"]|order(name asc){
    _id,
    name,
    nameJa,
    "slug": slug.current
  }
`;

export const GENRES_QUERY = groq`
  *[_type == "genre"]|order(name asc){
    _id,
    name,
    nameJa,
    "slug": slug.current
  }
`;

export const PROMOTIONS_QUERY = groq`
  *[_type == "promotion" && active == true]|order(priority asc, _createdAt desc){
    _id,
    title,
    titleJa,
    tagline,
    taglineJa,
    description,
    descriptionJa,
    ctaLabel,
    ctaLabelJa,
    ctaHref,
    theme,
    badge,
    badgeJa,
    priority,
    active,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  }
`;

export const CAREERS_QUERY = groq`
  *[_type == "career" && status == "open"]|order(priority asc, _createdAt desc){
    _id,
    title,
    titleJa,
    location,
    locationJa,
    type,
    typeJa,
    description,
    descriptionJa,
    priority
  }
`;

export const BOOK_BY_SLUG_QUERY = groq`
  *[_type == "book" && slug.current == $slug && status == "published"][0]{
    _id,
    title,
    titleJa,
    author,
    authorJa,
    price,
    condition,
    featured,
    description,
    descriptionJa,
    inventory,
    marketplaceUrl,
    "slug": slug.current,
    "imageUrl": images[0].asset->url,
    "gallery": images[].asset->url,
    "category": category->{
      _id,
      name,
      nameJa,
      "slug": slug.current
    },
    "genres": genres[]->{
      _id,
      name,
      nameJa,
      "slug": slug.current
    }
  }
`;

export const BOOK_SEARCH_QUERY = groq`
  *[_type == "book" && status == "published" && (lower(title) match $term || lower(titleJa) match $term)][0...8]{
    _id,
    title,
    titleJa,
    author,
    authorJa,
    "slug": slug.current
  }
`;

export const REVIEWS_BY_BOOK_QUERY = groq`
  *[_type == "review" && status == "approved" && book->slug.current == $slug]|order(_createdAt desc){
    _id,
    reviewType,
    reviewerName,
    title,
    rating,
    "createdAt": _createdAt,
    "bodyText": coalesce(pt::text(body), "")
  }
`;

export const ORDER_BY_TRACKING_QUERY = groq`
  *[_type == "order" && trackingCode == $trackingCode && buyerEmailNormalized == $buyerEmailNormalized][0]{
    "trackingCode": trackingCode,
    "status": coalesce(status, "new"),
    "submittedAt": _createdAt,
    "bookTitle": book->title,
    "bookSlug": book->slug.current,
    "hasMessage": defined(message) && message != "",
  }
`;
