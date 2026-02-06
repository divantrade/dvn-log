// lib/sanity/queries.ts
import { groq } from "next-sanity";

// Query for posts - supports both old schema (title, slug) and new schema (title_en, slug_en, etc.)
// Falls back to old fields if new localized fields don't exist
export const paginatedPostsQuery = groq`
*[_type == "blogPost"] | order(publishedAt desc) [$offset...$end]{
  _id,
  "title": coalesce(
    select($language == "en" => title_en),
    select($language == "ar" => title_ar),
    select($language == "tr" => title_tr),
    title_en, title_ar, title_tr,
    title
  ),
  "slug": coalesce(
    select($language == "en" => slug_en.current),
    select($language == "ar" => slug_ar.current),
    select($language == "tr" => slug_tr.current),
    slug_en.current, slug_ar.current, slug_tr.current,
    slug.current
  ),
  "excerpt": coalesce(
    select($language == "en" => excerpt_en),
    select($language == "ar" => excerpt_ar),
    select($language == "tr" => excerpt_tr),
    excerpt_en, excerpt_ar, excerpt_tr,
    excerpt
  ),
  publishedAt,
  category,
  readingTime,
  "mainImageUrl": coalesce(coverImage.asset->url, ""),
  "author": author->{
    name,
    "imageUrl": coalesce(avatar.asset->url, "")
  },
  tags
}
`;

// Count all posts
export const postsCountQuery = groq`count(*[_type == "blogPost"])`;

// Query for all posts (all languages) - for admin/fallback
export const allPaginatedPostsQuery = groq`
*[_type == "blogPost"] | order(publishedAt desc) [$offset...$end]{
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
  tags
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
  publishedAt,
  _updatedAt,
  category,
  readingTime,
  "author": author->{
    name,
    bio,
    "slug": slug.current,
    "imageUrl": coalesce(avatar.asset->url, "")
  },
  tags,
  faq[]{
    question_en,
    question_ar,
    question_tr,
    answer_en,
    answer_ar,
    answer_tr
  },
  seo{
    // Old SEO fields
    title,
    description,
    "ogImageUrl": coalesce(ogImage.asset->url),
    // New localized SEO fields
    metaTitle_en,
    metaTitle_ar,
    metaTitle_tr,
    metaDescription_en,
    metaDescription_ar,
    metaDescription_tr,
    focusKeyword,
    twitterCardType,
    canonicalUrl,
    noIndex,
    noFollow
  }
}
`;

// Related posts - supports both old and new schema
export const relatedPostsQuery = groq`
*[_type == "blogPost" &&
  slug.current != $slug &&
  slug_en.current != $slug &&
  slug_ar.current != $slug &&
  slug_tr.current != $slug &&
  count((tags[])[@ in $tags]) > 0
] | order(publishedAt desc)[0...3]{
  _id,
  "title": coalesce(
    select($language == "en" => title_en),
    select($language == "ar" => title_ar),
    select($language == "tr" => title_tr),
    title_en, title_ar, title_tr,
    title
  ),
  "slug": coalesce(
    select($language == "en" => slug_en.current),
    select($language == "ar" => slug_ar.current),
    select($language == "tr" => slug_tr.current),
    slug_en.current, slug_ar.current, slug_tr.current,
    slug.current
  ),
  "excerpt": coalesce(
    select($language == "en" => excerpt_en),
    select($language == "ar" => excerpt_ar),
    select($language == "tr" => excerpt_tr),
    excerpt_en, excerpt_ar, excerpt_tr,
    excerpt
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
