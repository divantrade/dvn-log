import groq from "groq";

export const partnersQuery = groq`*[_type=="partner" && active==true] | order(priority desc, name asc){
  _id, name, logo, websiteUrl, priority, active
}`;

export const latestPostsQuery = groq`*[_type=="blogPost"] | order(publishedAt desc)[0...3]{
  _id, title, "slug": slug.current, excerpt, coverImage, publishedAt,
  "author": author-> { _id, name, "slug": slug.current, avatar },
  tags
}`;

export const paginatedPostsQuery = groq`*[_type=="blogPost"] | order(publishedAt desc)[$offset...$end]{
  _id, title, "slug": slug.current, excerpt, coverImage, publishedAt,
  "author": author-> { _id, name, "slug": slug.current, avatar }, tags
}`;

export const postsCountQuery = groq`count(*[_type=="blogPost"])`;

export const postBySlugQuery = groq`*[_type=="blogPost" && slug.current==$slug][0]{
  _id, title, "slug": slug.current, excerpt, coverImage, body, publishedAt,
  "author": author-> { _id, name, "slug": slug.current, avatar },
  tags, seo
}`;

export const relatedPostsQuery = groq`*[_type=="blogPost" && slug.current!=$slug && count((tags[])[@ in ^.^.tags]) > 0] | order(publishedAt desc)[0...3]{
  _id, title, "slug": slug.current, coverImage, excerpt, publishedAt,
  "author": author-> { _id, name, "slug": slug.current, avatar }, tags
}`;

export const clientReviewsQuery = groq`*[_type=="clientReview"] | order(displayOrder asc){
  _id,
  companyName,
  companyLogo,
  companyWebsite,
  reviewScreenshot,
  displayOrder
}`;

export const clientFeedbackQuery = groq`*[_type=="clientFeedback"] | order(displayOrder asc)[0...9]{
  _id,
  companyName,
  companyLogo,
  companyWebsite,
  testimonialScreenshot,
  displayOrder
}`;
