// lib/sanity/queries.ts
import { groq } from "next-sanity";

export const paginatedPostsQuery = groq`
*[_type == "blogPost"] | order(publishedAt desc) [$offset...$end]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  "mainImageUrl": coalesce(coverImage.asset->url, ""),
  "author": author->{
    name,
    "imageUrl": coalesce(avatar.asset->url, "")
  },
  tags
}
`;

export const postsCountQuery = groq`count(*[_type == "blogPost"])`;

export const postBySlugQuery = groq`
*[_type == "blogPost" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "mainImageUrl": coalesce(coverImage.asset->url, ""),
  body,
  publishedAt,
  "author": author->{
    name,
    "imageUrl": coalesce(avatar.asset->url, "")
  },
  tags,
  seo
}
`;

export const relatedPostsQuery = groq`
*[_type == "blogPost" && slug.current != $slug && count((tags[])[@ in ^.^.tags]) > 0] | order(publishedAt desc)[0...3]{
  _id,
  title,
  "slug": slug.current,
  "mainImageUrl": coalesce(coverImage.asset->url, ""),
  excerpt,
  publishedAt,
  "author": author->{
    name,
    "imageUrl": coalesce(avatar.asset->url, "")
  },
  tags
}
`;

export const partnersQuery = groq`
*[_type == "partner"] | order(displayOrder asc){
  _id,
  name,
  logo,
  website,
  displayOrder
}
`;

export const clientFeedbackQuery = groq`
*[_type == "clientFeedback"] | order(displayOrder asc){
  _id,
  companyName,
  companyLogo,
  companyWebsite,
  testimonialScreenshot,
  displayOrder
}
`;

export const clientReviewsQuery = groq`
*[_type == "clientReview"] | order(displayOrder asc){
  _id,
  companyName,
  companyLogo,
  companyWebsite,
  reviewScreenshot,
  displayOrder
}
`;

export const testimonialsQuery = groq`
*[_type == "testimonial"] | order(displayOrder asc){
  _id,
  clientName,
  clientPosition,
  companyName,
  companyLogo,
  testimonialText,
  rating,
  featured
}
`;

export const allPostSlugsQuery = groq`
*[_type == "blogPost" && defined(slug.current)]{
  "slug": slug.current
}
`;
