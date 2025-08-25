import { defineField, defineType } from "sanity";

export default defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "description", type: "text" }),
    defineField({ name: "ogImage", title: "OG Image", type: "image", options: { hotspot: true } }),
  ],
});
