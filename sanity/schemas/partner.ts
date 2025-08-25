import { defineField, defineType } from "sanity";

export default defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "logo", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: "websiteUrl", title: "Website URL", type: "url", validation: (r) => r.uri({ scheme: ["http", "https"] }) }),
    defineField({ name: "priority", type: "number", description: "Higher appears first", initialValue: 0 }),
    defineField({ name: "active", type: "boolean", initialValue: true }),
  ],
  preview: { select: { title: "name", media: "logo", subtitle: "websiteUrl" } },
});
