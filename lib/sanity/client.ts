import "server-only";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: "dr3pqajq",
  dataset: "production",
  apiVersion: "2024-07-01",
  useCdn: true,
  token: process.env.SANITY_READ_TOKEN, // optional for private datasets
  perspective: "published",
});

const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source: any) => builder.image(source);
