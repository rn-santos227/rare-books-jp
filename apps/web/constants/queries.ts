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
