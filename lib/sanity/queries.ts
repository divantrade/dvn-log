// lib/sanity/queries.ts
import { groq } from "next-sanity";

// Query for posts - fetches all language fields, application handles selection
// Filters to ensure posts have at least one valid slug
export const paginatedPostsQuery = groq`
*[_type == "blogPost" && (
  defined(slug.current) ||
  defined(slug_en.current) ||
  defined(slug_ar.current) ||
  defined(slug_tr.current)
)] | order(publishedAt desc) [$offset...$end]{
  _id,
  // All title fields (old + new)
  title,
  title_en,
  title_ar,
  title_tr,
  // All slug fields
  "slug": slug.current,
  "slug_en": slug_en.current,
  "slug_ar": slug_ar.current,
  "slug_tr": slug_tr.current,
  // All excerpt fields
  excerpt,
  excerpt_en,
  excerpt_ar,
  excerpt_tr,
  // Common fields
  publishedAt,
  category,
  readingTime,
  "mainImageUrl": coalesce(coverImage.asset->url, ""),
  "author": author->{
    name,
    "imageUrl": coalesce(avatar.asset->url, "")
  },
  // Tags per language (new) + legacy
  tags,
  tags_en,
  tags_ar,
  tags_tr
}
`;

// Count all posts with valid slugs
export const postsCountQuery = groq`count(*[_type == "blogPost" && (
  defined(slug.current) ||
  defined(slug_en.current) ||
  defined(slug_ar.current) ||
  defined(slug_tr.current)
)])`;

// Query for all posts (all languages) - for admin/fallback
export const allPaginatedPostsQuery = groq`
*[_type == "blogPost" && (
  defined(slug.current) ||
  defined(slug_en.current) ||
  defined(slug_ar.current) ||
  defined(slug_tr.current)
)] | order(publishedAt desc) [$offset...$end]{
  _id,
  title,
  title_en,
  title_ar,
  title_tr,
  "slug": slug.current,
  "slug_en": slug_en.current,
  "slug_ar": slug_ar.current,
  "slug_tr": slug_tr.current,
  excerpt,
  excerpt_en,
  excerpt_ar,
  excerpt_tr,
  publishedAt,
  "mainImageUrl": coalesce(coverImage.asset->url, ""),
  "author": author->{
    name,
    "imageUrl": coalesce(avatar.asset->url, "")
  },
  tags,
  tags_en,
  tags_ar,
  tags_tr
}
`;

export const allPostsCountQuery = groq`count(*[_type == "blogPost"])`;

// Get post by slug - checks both old slug and new language slugs
export const postBySlugQuery = groq`
*[_type == "blogPost" && (
  slug.current == $slug ||
  slug_en.current == $slug ||
  slug_ar.current == $slug ||
  slug_tr.current == $slug
)][0]{
  _id,
  // Old schema fields
  title,
  "slug": slug.current,
  excerpt,
  body,
  // New localized fields
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
  // Common fields
  "mainImageUrl": coalesce(coverImage.asset->url, ""),
  "ogImageUrl": coalesce(ogImage.asset->url, coverImage.asset->url, ""),
  publishedAt,
  _updatedAt,
  category,
  readingTime,
  "author": author->{
    name,
    bio,
    bio_ar,
    bio_tr,
    "slug": slug.current,
    "imageUrl": coalesce(avatar.asset->url, "")
  },
  // Tags - legacy and per language
  tags,
  tags_en,
  tags_ar,
  tags_tr,
  // FAQ
  faq[]{
    question_en,
    question_ar,
    question_tr,
    answer_en,
    answer_ar,
    answer_tr
  },
  // SEO fields - new direct fields
  metaTitle_en,
  metaTitle_ar,
  metaTitle_tr,
  metaDescription_en,
  metaDescription_ar,
  metaDescription_tr,
  focusKeyword_en,
  focusKeyword_ar,
  focusKeyword_tr,
  // Legacy SEO (for old posts)
  seo{
    title,
    description,
    "ogImageUrl": coalesce(ogImage.asset->url),
    metaTitle_en,
    metaTitle_ar,
    metaTitle_tr,
    metaDescription_en,
    metaDescription_ar,
    metaDescription_tr,
    focusKeyword_en,
    focusKeyword_ar,
    focusKeyword_tr,
    focusKeyword,
    twitterCardType,
    canonicalUrl,
    noIndex,
    noFollow
  }
}
`;

// Related posts - fetches all language fields
// Checks tags in all language variants for related content
export const relatedPostsQuery = groq`
*[_type == "blogPost" &&
  slug.current != $slug &&
  slug_en.current != $slug &&
  slug_ar.current != $slug &&
  slug_tr.current != $slug &&
  (
    count((tags[])[@ in $tags]) > 0 ||
    count((tags_en[])[@ in $tags]) > 0 ||
    count((tags_ar[])[@ in $tags]) > 0 ||
    count((tags_tr[])[@ in $tags]) > 0
  )
] | order(publishedAt desc)[0...3]{
  _id,
  title,
  title_en,
  title_ar,
  title_tr,
  "slug": slug.current,
  "slug_en": slug_en.current,
  "slug_ar": slug_ar.current,
  "slug_tr": slug_tr.current,
  excerpt,
  excerpt_en,
  excerpt_ar,
  excerpt_tr,
  "mainImageUrl": coalesce(coverImage.asset->url, ""),
  publishedAt,
  "author": author->{
    name,
    "imageUrl": coalesce(avatar.asset->url, "")
  },
  tags,
  tags_en,
  tags_ar,
  tags_tr
}
`;

// Get all post slugs for static generation (supports both old and new schema)
export const allPostSlugsQuery = groq`
*[_type == "blogPost" && (defined(slug.current) || defined(slug_en.current) || defined(slug_ar.current) || defined(slug_tr.current))]{
  "slugs": [slug.current, slug_en.current, slug_ar.current, slug_tr.current]
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
