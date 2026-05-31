import { groq } from "next-sanity";

// Get all posts
export const postsQuery = groq`*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  subtitle,
  publishedAt,
  "slug": slug.current,
  tags,
}`;

// Get a single post by its slug
export const postQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  subtitle,
  publishedAt,
  tags,
  author,
  body,
}`;

// Get all post slugs
export const postPathsQuery = groq`*[_type == "post" && defined(slug.current)][]{
    "params": { "slug": slug.current }
  }`;

// Get all PDFs
export const pdfsQuery = groq`*[_type == "pdf"] | order(publishedAt desc) {
  _id,
  title,
  subtitle,
  publishedAt,
  tags,
  "slug": slug.current,
  "fileURL": file.asset->url,
  coverImage {
    asset->,
    crop,
    hotspot
  },
}`;

// Get a single PDF by its slug
export const pdfQuery = groq`*[_type == "pdf" && slug.current == $slug][0]{
  _id,
  title,
  subtitle,
  publishedAt,
  tags,
  "file": file.asset->url,
}`;
