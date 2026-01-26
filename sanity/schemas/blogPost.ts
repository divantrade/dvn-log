import { defineField, defineType } from "sanity";

export default defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  groups: [
    { name: "english", title: "🇬🇧 English", default: true },
    { name: "arabic", title: "🇸🇦 العربية" },
    { name: "turkish", title: "🇹🇷 Türkçe" },
    { name: "media", title: "📷 Media" },
    { name: "faq", title: "❓ FAQ" },
    { name: "seo", title: "🔍 SEO" },
  ],
  fields: [
    // English Fields
    defineField({
      name: "title_en",
      title: "Title (English)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "slug_en",
      title: "Slug (English)",
      type: "slug",
      options: { source: "title_en", maxLength: 96 },
      group: "english",
    }),
    defineField({
      name: "excerpt_en",
      title: "Excerpt (English)",
      type: "text",
      rows: 3,
      group: "english",
    }),
    defineField({
      name: "body_en",
      title: "Content (English)",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
      group: "english",
    }),

    // Arabic Fields
    defineField({
      name: "title_ar",
      title: "العنوان (عربي)",
      type: "string",
      group: "arabic",
    }),
    defineField({
      name: "slug_ar",
      title: "الرابط (عربي)",
      type: "slug",
      options: { source: "title_ar", maxLength: 96 },
      group: "arabic",
    }),
    defineField({
      name: "excerpt_ar",
      title: "المقتطف (عربي)",
      type: "text",
      rows: 3,
      group: "arabic",
    }),
    defineField({
      name: "body_ar",
      title: "المحتوى (عربي)",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
      group: "arabic",
    }),

    // Turkish Fields
    defineField({
      name: "title_tr",
      title: "Başlık (Türkçe)",
      type: "string",
      group: "turkish",
    }),
    defineField({
      name: "slug_tr",
      title: "Slug (Türkçe)",
      type: "slug",
      options: { source: "title_tr", maxLength: 96 },
      group: "turkish",
    }),
    defineField({
      name: "excerpt_tr",
      title: "Özet (Türkçe)",
      type: "text",
      rows: 3,
      group: "turkish",
    }),
    defineField({
      name: "body_tr",
      title: "İçerik (Türkçe)",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
      group: "turkish",
    }),

    // Shared Media & Metadata
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      group: "media",
      description: "Recommended: 1200x630px for optimal social sharing",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      group: "media",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Logistics", value: "logistics" },
          { title: "Shipping", value: "shipping" },
          { title: "Industry News", value: "news" },
          { title: "Tips & Guides", value: "guides" },
          { title: "Company Updates", value: "updates" },
        ],
      },
      group: "media",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      group: "media",
    }),
    defineField({
      name: "readingTime",
      title: "Reading Time (minutes)",
      type: "number",
      description: "Estimated reading time in minutes",
      initialValue: 5,
      group: "media",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      group: "media",
    }),

    // FAQ Section - Great for SEO rich snippets
    defineField({
      name: "faq",
      title: "Frequently Asked Questions",
      description: "Add FAQ items to appear as rich snippets in Google search results",
      type: "array",
      of: [{ type: "faqItem" }],
      group: "faq",
    }),

    // SEO
    defineField({
      name: "seo",
      title: "SEO & Social Media Settings",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title_en: "title_en",
      title_ar: "title_ar",
      title_tr: "title_tr",
      media: "coverImage",
      authorName: "author.name",
    },
    prepare({ title_en, title_ar, title_tr, media, authorName }) {
      const flags = [];
      if (title_en) flags.push("🇬🇧");
      if (title_ar) flags.push("🇸🇦");
      if (title_tr) flags.push("🇹🇷");
      const title = title_en || title_ar || title_tr || "Untitled";
      return {
        title: `${flags.join("")} ${title}`,
        subtitle: authorName,
        media,
      };
    },
  },
});
