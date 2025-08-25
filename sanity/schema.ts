import { type SchemaTypeDefinition } from "sanity";
import partner from "./schemas/partner";
import author from "./schemas/author";
import blogPost from "./schemas/blogPost";
import seo from "./schemas/seo";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [partner, author, blogPost, seo],
};
