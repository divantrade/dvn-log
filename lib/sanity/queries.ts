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
