import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { groq } from "next-sanity";

export const sanityClientSide = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "dr3pqajq",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-07-01",
  useCdn: true, // Use CDN for client-side requests
  perspective: "published",
});

const builder = imageUrlBuilder(sanityClientSide);
export const urlForClientSide = (source: any) => builder.image(source);

// Query supports both old schema (slug.current) and new multi-language schema (slug_en.current, etc.)
export const latestPostsQuery = groq`
*[_type == "blogPost" && (
  defined(slug.current) ||
  defined(slug_en.current) ||
  defined(slug_ar.current) ||
  defined(slug_tr.current)
)] | order(publishedAt desc)[0...4]{
  _id,
  // Old schema fields
  "title": coalesce(title_en, title_ar, title_tr, title),
  "slug": coalesce(slug_en.current, slug_ar.current, slug_tr.current, slug.current),
  "excerpt": coalesce(excerpt_en, excerpt_ar, excerpt_tr, excerpt),
  // Common fields
  "date": coalesce(publishedAt, _createdAt),
  category,
  // Cover (support mainImage or coverImage)
  "cover": {
    "src": coalesce(mainImage.asset->url, coverImage.asset->url),
    "w": coalesce(mainImage.asset->metadata.dimensions.width, coverImage.asset->metadata.dimensions.width),
    "h": coalesce(mainImage.asset->metadata.dimensions.height, coverImage.asset->metadata.dimensions.height),
    "blur": coalesce(mainImage.asset->metadata.lqip, coverImage.asset->metadata.lqip)
  },
  // Author
  "author": {
    "name": author->name,
    "avatar": author->image.asset->url
  }
}`;
