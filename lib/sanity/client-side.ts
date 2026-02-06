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

// Query returns all language fields - application handles selection based on locale
export const latestPostsQuery = groq`
*[_type == "blogPost" && (
  defined(slug.current) ||
  defined(slug_en.current) ||
  defined(slug_ar.current) ||
  defined(slug_tr.current)
)] | order(publishedAt desc)[0...4]{
  _id,
  // All title fields
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

// Helper function to get localized field from post object
export function getLocalizedPostField(
  post: Record<string, any>,
  field: 'title' | 'slug' | 'excerpt',
  locale: string
): string {
  const langKey = `${field}_${locale}`;
  const enKey = `${field}_en`;
  const arKey = `${field}_ar`;
  const trKey = `${field}_tr`;

  return (
    post[langKey] ||
    post[enKey] ||
    post[arKey] ||
    post[trKey] ||
    post[field] ||
    ''
  );
}
