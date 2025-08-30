import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { groq } from "next-sanity";

export const sanityClientSide = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-07-01",
  useCdn: true, // Use CDN for client-side requests
  perspective: "published",
});

const builder = imageUrlBuilder(sanityClientSide);
export const urlForClientSide = (source: any) => builder.image(source);

export const latestPostsQuery = groq`
*[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc)[0...4]{
  _id,
  title,
  "slug": slug.current,
  "date": coalesce(publishedAt, _createdAt),
  excerpt,
  "category": categories[0]->title,
  // Cover (support mainImage or coverImage)
  "cover": {
    "src": coalesce(mainImage.asset->url, coverImage.asset->url),
    "w": coalesce(mainImage.asset->metadata.dimensions.width,  coverImage.asset->metadata.dimensions.width),
    "h": coalesce(mainImage.asset->metadata.dimensions.height, coverImage.asset->metadata.dimensions.height),
    "blur": coalesce(mainImage.asset->metadata.lqip,          coverImage.asset->metadata.lqip)
  },
  // Author
  "author": {
    "name": author->name,
    "avatar": author->image.asset->url
  }
}`;
