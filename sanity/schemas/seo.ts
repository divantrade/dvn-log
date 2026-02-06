import { defineField, defineType } from "sanity";

// This schema is kept for backward compatibility with old posts
// New posts use SEO fields directly in the language tabs
export default defineType({
  name: "seo",
  title: "SEO (Legacy)",
  type: "object",
  description: "Legacy SEO settings - for new posts, use SEO fields in language tabs",
  fields: [
    // Legacy fields - kept for old posts that might have data here
    defineField({
      name: "title",
      title: "SEO Title (Legacy)",
      type: "string",
      description: "Old SEO title field",
    }),
    defineField({
      name: "description",
      title: "Meta Description (Legacy)",
      type: "text",
      rows: 3,
      description: "Old meta description field",
    }),
    defineField({
      name: "focusKeyword",
      title: "Focus Keyword (Legacy)",
      type: "string",
      description: "Old single keyword field",
    }),
    // Multi-language SEO fields (legacy - for old posts that used nested seo object)
    defineField({
      name: "metaTitle_en",
      title: "SEO Title (English)",
      type: "string",
    }),
    defineField({
      name: "metaTitle_ar",
      title: "عنوان SEO (عربي)",
      type: "string",
    }),
    defineField({
      name: "metaTitle_tr",
      title: "SEO Başlığı (Türkçe)",
      type: "string",
    }),
    defineField({
      name: "metaDescription_en",
      title: "Meta Description (English)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "metaDescription_ar",
      title: "وصف Meta (عربي)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "metaDescription_tr",
      title: "Meta Açıklaması (Türkçe)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "focusKeyword_en",
      title: "Focus Keyword (English)",
      type: "string",
    }),
    defineField({
      name: "focusKeyword_ar",
      title: "الكلمة المفتاحية (عربي)",
      type: "string",
    }),
    defineField({
      name: "focusKeyword_tr",
      title: "Odak Anahtar Kelime (Türkçe)",
      type: "string",
    }),
    // Social Media (legacy)
    defineField({
      name: "ogImage",
      title: "Social Share Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "twitterCardType",
      title: "Twitter Card Type",
      type: "string",
      options: {
        list: [
          { title: "Summary (small image)", value: "summary" },
          { title: "Summary Large Image", value: "summary_large_image" },
        ],
      },
      initialValue: "summary_large_image",
    }),
    // Advanced - hidden by default
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      hidden: true,
    }),
    defineField({
      name: "noIndex",
      title: "Hide from Search Engines",
      type: "boolean",
      initialValue: false,
      hidden: true,
    }),
    defineField({
      name: "noFollow",
      title: "No Follow Links",
      type: "boolean",
      initialValue: false,
      hidden: true,
    }),
  ],
});
