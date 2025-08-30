import "server-only";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-07-01",
  useCdn: true,
  token: process.env.SANITY_READ_TOKEN, // optional for private datasets
  perspective: "published",
});

// Safe fetch wrapper for server-side that returns empty data on error
export const safeSanityServerFetch = async (query: string, params = {}, options = {}) => {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      console.warn('Sanity project ID not configured, returning empty data');
      return [];
    }
    return await sanityClient.fetch(query, params, options);
  } catch (error) {
    console.warn('Sanity server fetch failed, returning empty data:', error);
    return [];
  }
};

const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source: any) => builder.image(source);
