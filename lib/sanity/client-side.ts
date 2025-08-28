import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClientSide = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-07-01",
  useCdn: true, // Use CDN for client-side requests
  perspective: "published",
});

const builder = imageUrlBuilder(sanityClientSide);
export const urlForClientSide = (source: any) => builder.image(source);
