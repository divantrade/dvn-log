import { defineField, defineType } from "sanity";

export default defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "bio", type: "text" }),
    defineField({ name: "avatar", type: "image", options: { hotspot: true } }),
  ],
  preview: { select: { title: "name", media: "avatar" } },
});
