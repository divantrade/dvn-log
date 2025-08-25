import { defineField, defineType } from "sanity";

export default defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: "excerpt", type: "text" }),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true } }),
    defineField({
      name: "body",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
      validation: (r) => r.required(),
    }),
    defineField({ name: "author", type: "reference", to: [{ type: "author" }], validation: (r) => r.required() }),
    defineField({ name: "tags", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "publishedAt", type: "datetime", initialValue: () => new Date().toISOString() }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: { select: { title: "title", media: "coverImage", subtitle: "author.name" } },
});
