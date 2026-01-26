import { defineField, defineType } from "sanity";

export default defineType({
  name: "seo",
  title: "SEO & Social Media",
  type: "object",
  groups: [
    { name: "basic", title: "🔍 Basic SEO", default: true },
    { name: "social", title: "📱 Social Media" },
    { name: "advanced", title: "⚙️ Advanced" },
  ],
  fields: [
    // Basic SEO - Multi-language
    defineField({
      name: "metaTitle_en",
      title: "🇬🇧 SEO Title (English)",
      type: "string",
      description: "Optimal: 50-60 characters. This appears in Google search results.",
      validation: (rule) =>
        rule.max(70).warning("Keep under 60 characters for best results"),
      group: "basic",
    }),
    defineField({
      name: "metaTitle_ar",
      title: "🇸🇦 عنوان SEO (عربي)",
      type: "string",
      description: "الأمثل: 50-60 حرف. يظهر في نتائج بحث Google.",
      validation: (rule) =>
        rule.max(70).warning("حافظ على أقل من 60 حرف للحصول على أفضل النتائج"),
      group: "basic",
    }),
    defineField({
      name: "metaTitle_tr",
      title: "🇹🇷 SEO Başlığı (Türkçe)",
      type: "string",
      description: "Optimal: 50-60 karakter. Google arama sonuçlarında görünür.",
      validation: (rule) =>
        rule.max(70).warning("En iyi sonuçlar için 60 karakterin altında tutun"),
      group: "basic",
    }),
    defineField({
      name: "metaDescription_en",
      title: "🇬🇧 Meta Description (English)",
      type: "text",
      rows: 3,
      description: "Optimal: 150-160 characters. Compelling description for search results.",
      validation: (rule) =>
        rule.max(170).warning("Keep under 160 characters for best results"),
      group: "basic",
    }),
    defineField({
      name: "metaDescription_ar",
      title: "🇸🇦 وصف Meta (عربي)",
      type: "text",
      rows: 3,
      description: "الأمثل: 150-160 حرف. وصف جذاب لنتائج البحث.",
      validation: (rule) =>
        rule.max(170).warning("حافظ على أقل من 160 حرف للحصول على أفضل النتائج"),
      group: "basic",
    }),
    defineField({
      name: "metaDescription_tr",
      title: "🇹🇷 Meta Açıklaması (Türkçe)",
      type: "text",
      rows: 3,
      description: "Optimal: 150-160 karakter. Arama sonuçları için çekici açıklama.",
      validation: (rule) =>
        rule.max(170).warning("En iyi sonuçlar için 160 karakterin altında tutun"),
      group: "basic",
    }),
    defineField({
      name: "focusKeyword",
      title: "🎯 Focus Keyword",
      type: "string",
      description: "Main keyword you want to rank for (e.g., 'sea freight shipping')",
      group: "basic",
    }),

    // Social Media
    defineField({
      name: "ogImage",
      title: "📷 Social Share Image",
      type: "image",
      description: "Recommended: 1200x630px. Used when sharing on Facebook, LinkedIn, Twitter, WhatsApp.",
      options: { hotspot: true },
      group: "social",
    }),
    defineField({
      name: "twitterCardType",
      title: "🐦 Twitter Card Type",
      type: "string",
      options: {
        list: [
          { title: "Summary (small image)", value: "summary" },
          { title: "Summary Large Image (recommended)", value: "summary_large_image" },
        ],
        layout: "radio",
      },
      initialValue: "summary_large_image",
      group: "social",
    }),

    // Advanced
    defineField({
      name: "canonicalUrl",
      title: "🔗 Canonical URL",
      type: "url",
      description: "Only set if this content exists elsewhere and this is not the original.",
      group: "advanced",
    }),
    defineField({
      name: "noIndex",
      title: "🚫 Hide from Search Engines",
      type: "boolean",
      description: "Enable to prevent this page from appearing in Google search results.",
      initialValue: false,
      group: "advanced",
    }),
    defineField({
      name: "noFollow",
      title: "🔗 No Follow Links",
      type: "boolean",
      description: "Enable to tell search engines not to follow links on this page.",
      initialValue: false,
      group: "advanced",
    }),
  ],
});
