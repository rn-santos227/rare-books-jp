import { groq } from "next-sanity";

export const BOOKS_QUERY = groq`
  *[_type == "book" && status == "published"]|order(featured desc, _createdAt desc){
    _id,
    title,
    author,
    price,
    condition,
    featured,
    description,
    inventory,
    "slug": slug.current,
    "imageUrl": images[0].asset->url,
    "gallery": images[].asset->url,
    "category": category->{
      _id,
      name,
      "slug": slug.current
    },
    "genres": genres[]->{
      _id,
      name,
      "slug": slug.current
    }
  }
`;

export const CATEGORIES_QUERY = groq`
  *[_type == "category"]|order(name asc){
    _id,
    name,
    "slug": slug.current
  }
`;

export const GENRES_QUERY = groq`
  *[_type == "genre"]|order(name asc){
    _id,
    name,
    "slug": slug.current
  }
`;

export const PROMOTIONS_QUERY = groq`
  *[_type == "promotion" && active == true]|order(priority asc, _createdAt desc){
    _id,
    title,
    tagline,
    description,
    ctaLabel,
    ctaHref,
    theme,
    badge,
    priority,
    active,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  }
`;

export const BOOK_BY_SLUG_QUERY = groq`
  *[_type == "book" && slug.current == $slug && status == "published"][0]{
    _id,
    title,
    author,
    price,
    condition,
    featured,
    description,
    inventory,
    "slug": slug.current,
    "imageUrl": images[0].asset->url,
    "gallery": images[].asset->url,
    "category": category->{
      _id,
      name,
      "slug": slug.current
    },
    "genres": genres[]->{
      _id,
      name,
      "slug": slug.current
    }
  }
`;


