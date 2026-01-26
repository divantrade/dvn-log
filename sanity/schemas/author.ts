import { defineField, defineType } from "sanity";

export default defineType({
  name: "author",
  title: "Author",
  type: "document",
  groups: [
    { name: "basic", title: "Basic Info", default: true },
    { name: "social", title: "Social & Links" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // Basic Info
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (r) => r.required(),
      group: "basic",
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: { source: "name" },
      group: "basic",
    }),
    defineField({
      name: "jobTitle",
      title: "Job Title",
      type: "string",
      placeholder: "e.g., Logistics Manager, Content Writer",
      group: "basic",
    }),
    defineField({
      name: "bio",
      title: "Bio (English)",
      type: "text",
      rows: 3,
      group: "basic",
    }),
    defineField({
      name: "bio_ar",
      title: "Bio (العربية)",
      type: "text",
      rows: 3,
      group: "basic",
    }),
    defineField({
      name: "bio_tr",
      title: "Bio (Türkçe)",
      type: "text",
      rows: 3,
      group: "basic",
    }),
    defineField({
      name: "avatar",
      title: "Profile Photo",
      type: "image",
      options: { hotspot: true },
      description: "Recommended: Square image, at least 400x400px",
      group: "basic",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "email",
      group: "basic",
    }),

    // Social & Links
    defineField({
      name: "linkedin",
      title: "LinkedIn URL",
      type: "url",
      group: "social",
    }),
    defineField({
      name: "twitter",
      title: "Twitter/X URL",
      type: "url",
      group: "social",
    }),
    defineField({
      name: "website",
      title: "Personal Website",
      type: "url",
      group: "social",
    }),

    // SEO
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 2,
      description: "A brief description for search engines (150-160 characters)",
      validation: (r) => r.max(170).warning("Keep under 160 characters"),
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "jobTitle",
      media: "avatar",
    },
  },
});
