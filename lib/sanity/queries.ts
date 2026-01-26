// lib/sanity/queries.ts
import { groq } from "next-sanity";

// Query for posts that have content in the specified language
// Falls back to showing posts with any language content
export const paginatedPostsQuery = groq`
*[_type == "blogPost" && defined(coalesce(
  select($language == "en" => title_en),
  select($language == "ar" => title_ar),
  select($language == "tr" => title_tr)
))] | order(publishedAt desc) [$offset...$end]{
  _id,
  "title": coalesce(
    select($language == "en" => title_en),
    select($language == "ar" => title_ar),
    select($language == "tr" => title_tr),
    title_en, title_ar, title_tr
  ),
  "slug": coalesce(
    select($language == "en" => slug_en.current),
    select($language == "ar" => slug_ar.current),
    select($language == "tr" => slug_tr.current),
    slug_en.current, slug_ar.current, slug_tr.current
  ),
  "excerpt": coalesce(
    select($language == "en" => excerpt_en),
    select($language == "ar" => excerpt_ar),
    select($language == "tr" => excerpt_tr),
    excerpt_en, excerpt_ar, excerpt_tr
  ),
  publishedAt,
  "mainImageUrl": coalesce(coverImage.asset->url, ""),
  "author": author->{
    name,
    "imageUrl": coalesce(avatar.asset->url, "")
  },
  tags
}
`;

// Count posts that have content in the specified language
export const postsCountQuery = groq`count(*[_type == "blogPost" && defined(coalesce(
  select($language == "en" => title_en),
  select($language == "ar" => title_ar),
  select($language == "tr" => title_tr)
))])`;

// Query for all posts (all languages) - for admin/fallback
export const allPaginatedPostsQuery = groq`
*[_type == "blogPost"] | order(publishedAt desc) [$offset...$end]{
  _id,
  title_en,
  title_ar,
  title_tr,
  "slug_en": slug_en.current,
  "slug_ar": slug_ar.current,
  "slug_tr": slug_tr.current,
  excerpt_en,
  excerpt_ar,
  excerpt_tr,
  publishedAt,
  "mainImageUrl": coalesce(coverImage.asset->url, ""),
  "author": author->{
    name,
    "imageUrl": coalesce(avatar.asset->url, "")
  },
  tags
}
`;

export const allPostsCountQuery = groq`count(*[_type == "blogPost"])`;

// Get post by slug - checks all language slugs
export const postBySlugQuery = groq`
*[_type == "blogPost" && (
  slug_en.current == $slug ||
  slug_ar.current == $slug ||
  slug_tr.current == $slug
)][0]{
  _id,
  title_en,
  title_ar,
  title_tr,
  "slug_en": slug_en.current,
  "slug_ar": slug_ar.current,
  "slug_tr": slug_tr.current,
  excerpt_en,
  excerpt_ar,
  excerpt_tr,
  body_en,
  body_ar,
  body_tr,
  "mainImageUrl": coalesce(coverImage.asset->url, ""),
  publishedAt,
  "author": author->{
    name,
    "imageUrl": coalesce(avatar.asset->url, "")
  },
  tags,
  seo
}
`;

// Related posts - has content in the same language and shares tags
export const relatedPostsQuery = groq`
*[_type == "blogPost" &&
  slug_en.current != $slug &&
  slug_ar.current != $slug &&
  slug_tr.current != $slug &&
  defined(coalesce(
    select($language == "en" => title_en),
    select($language == "ar" => title_ar),
    select($language == "tr" => title_tr)
  )) &&
  count((tags[])[@ in $tags]) > 0
] | order(publishedAt desc)[0...3]{
  _id,
  "title": coalesce(
    select($language == "en" => title_en),
    select($language == "ar" => title_ar),
    select($language == "tr" => title_tr),
    title_en, title_ar, title_tr
  ),
  "slug": coalesce(
    select($language == "en" => slug_en.current),
    select($language == "ar" => slug_ar.current),
    select($language == "tr" => slug_tr.current),
    slug_en.current, slug_ar.current, slug_tr.current
  ),
  "excerpt": coalesce(
    select($language == "en" => excerpt_en),
    select($language == "ar" => excerpt_ar),
    select($language == "tr" => excerpt_tr),
    excerpt_en, excerpt_ar, excerpt_tr
  ),
  "mainImageUrl": coalesce(coverImage.asset->url, ""),
  publishedAt,
  "author": author->{
    name,
    "imageUrl": coalesce(avatar.asset->url, "")
  },
  tags
}
`;

// Get all post slugs for static generation (all languages)
export const allPostSlugsQuery = groq`
*[_type == "blogPost" && (defined(slug_en.current) || defined(slug_ar.current) || defined(slug_tr.current))]{
  "slugs": [slug_en.current, slug_ar.current, slug_tr.current]
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
