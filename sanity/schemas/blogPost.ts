import { defineField, defineType, defineArrayMember } from "sanity";

// Rich text block definition with enhanced editing features
const richTextBlock = defineArrayMember({
  type: "block",
  styles: [
    { title: "Normal", value: "normal" },
    { title: "H2", value: "h2" },
    { title: "H3", value: "h3" },
    { title: "H4", value: "h4" },
    { title: "Quote", value: "blockquote" },
  ],
  lists: [
    { title: "Bullet", value: "bullet" },
    { title: "Numbered", value: "number" },
  ],
  marks: {
    decorators: [
      { title: "Bold", value: "strong" },
      { title: "Italic", value: "em" },
      { title: "Underline", value: "underline" },
      { title: "Code", value: "code" },
    ],
    annotations: [
      // External link annotation
      {
        name: "link",
        type: "object",
        title: "🔗 External Link",
        fields: [
          {
            name: "href",
            type: "url",
            title: "URL",
            validation: (rule: any) =>
              rule.uri({
                scheme: ["http", "https", "mailto", "tel"],
              }),
          },
          {
            name: "openInNewTab",
            type: "boolean",
            title: "Open in new tab",
            initialValue: true,
          },
        ],
      },
      // Internal link to other blog posts
      {
        name: "internalLink",
        type: "object",
        title: "📄 Link to Article",
        fields: [
          {
            name: "reference",
            type: "reference",
            title: "Article",
            to: [{ type: "blogPost" }],
          },
        ],
      },
    ],
  },
});

// Image with optional link
const linkedImage = defineArrayMember({
  type: "image",
  title: "Image",
  options: { hotspot: true },
  fields: [
    {
      name: "alt",
      type: "string",
      title: "Alt Text",
      description: "Important for SEO and accessibility",
    },
    {
      name: "caption",
      type: "string",
      title: "Caption",
    },
    {
      name: "link",
      type: "url",
      title: "Link (optional)",
      description: "Make image clickable",
    },
  ],
});

export default defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  groups: [
    { name: "english", title: "🇬🇧 English", default: true },
    { name: "arabic", title: "🇸🇦 العربية" },
    { name: "turkish", title: "🇹🇷 Türkçe" },
    { name: "media", title: "📷 Media & Settings" },
    { name: "faq", title: "❓ FAQ" },
    { name: "legacy", title: "⚙️ Legacy (Old Posts)" },
  ],
  fields: [
    // ==================== ENGLISH TAB ====================
    defineField({
      name: "title_en",
      title: "📝 Title",
      type: "string",
      group: "english",
      validation: (rule) => rule.max(100).warning("Keep under 100 characters"),
    }),
    defineField({
      name: "slug_en",
      title: "🔗 Slug (URL)",
      type: "slug",
      options: { source: "title_en", maxLength: 96 },
      group: "english",
    }),
    defineField({
      name: "excerpt_en",
      title: "📋 Excerpt",
      type: "text",
      rows: 3,
      group: "english",
      description: "Short summary shown in blog listings",
    }),
    defineField({
      name: "body_en",
      title: "📖 Content",
      type: "array",
      of: [richTextBlock, linkedImage],
      group: "english",
    }),
    defineField({
      name: "tags_en",
      title: "🏷️ Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      group: "english",
      description: "Add relevant tags for this article",
    }),
    // SEO Fields - English
    defineField({
      name: "metaTitle_en",
      title: "🔍 SEO Title",
      type: "string",
      description: "Optimal: 50-60 characters. Appears in Google search results.",
      validation: (rule) =>
        rule.max(70).warning("Keep under 60 characters for best results"),
      group: "english",
    }),
    defineField({
      name: "metaDescription_en",
      title: "🔍 Meta Description",
      type: "text",
      rows: 3,
      description: "Optimal: 150-160 characters. Compelling description for search results.",
      validation: (rule) =>
        rule.max(170).warning("Keep under 160 characters for best results"),
      group: "english",
    }),
    defineField({
      name: "focusKeyword_en",
      title: "🎯 Focus Keyword",
      type: "string",
      description: "Main keyword to rank for (e.g., 'sea freight shipping')",
      group: "english",
    }),

    // ==================== ARABIC TAB ====================
    defineField({
      name: "title_ar",
      title: "📝 العنوان",
      type: "string",
      group: "arabic",
      validation: (rule) => rule.max(100).warning("حافظ على أقل من 100 حرف"),
    }),
    defineField({
      name: "slug_ar",
      title: "🔗 الرابط",
      type: "slug",
      options: { source: "title_ar", maxLength: 96 },
      group: "arabic",
    }),
    defineField({
      name: "excerpt_ar",
      title: "📋 المقتطف",
      type: "text",
      rows: 3,
      group: "arabic",
      description: "ملخص قصير يظهر في قوائم المدونة",
    }),
    defineField({
      name: "body_ar",
      title: "📖 المحتوى",
      type: "array",
      of: [richTextBlock, linkedImage],
      group: "arabic",
    }),
    defineField({
      name: "tags_ar",
      title: "🏷️ الوسوم",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      group: "arabic",
      description: "أضف وسوم ذات صلة لهذا المقال",
    }),
    // SEO Fields - Arabic
    defineField({
      name: "metaTitle_ar",
      title: "🔍 عنوان SEO",
      type: "string",
      description: "الأمثل: 50-60 حرف. يظهر في نتائج بحث Google.",
      validation: (rule) =>
        rule.max(70).warning("حافظ على أقل من 60 حرف للحصول على أفضل النتائج"),
      group: "arabic",
    }),
    defineField({
      name: "metaDescription_ar",
      title: "🔍 وصف Meta",
      type: "text",
      rows: 3,
      description: "الأمثل: 150-160 حرف. وصف جذاب لنتائج البحث.",
      validation: (rule) =>
        rule.max(170).warning("حافظ على أقل من 160 حرف للحصول على أفضل النتائج"),
      group: "arabic",
    }),
    defineField({
      name: "focusKeyword_ar",
      title: "🎯 الكلمة المفتاحية",
      type: "string",
      description: "الكلمة الرئيسية للتصنيف (مثال: 'شحن بحري دولي')",
      group: "arabic",
    }),

    // ==================== TURKISH TAB ====================
    defineField({
      name: "title_tr",
      title: "📝 Başlık",
      type: "string",
      group: "turkish",
      validation: (rule) => rule.max(100).warning("100 karakterin altında tutun"),
    }),
    defineField({
      name: "slug_tr",
      title: "🔗 Slug (URL)",
      type: "slug",
      options: { source: "title_tr", maxLength: 96 },
      group: "turkish",
    }),
    defineField({
      name: "excerpt_tr",
      title: "📋 Özet",
      type: "text",
      rows: 3,
      group: "turkish",
      description: "Blog listelerinde gösterilen kısa özet",
    }),
    defineField({
      name: "body_tr",
      title: "📖 İçerik",
      type: "array",
      of: [richTextBlock, linkedImage],
      group: "turkish",
    }),
    defineField({
      name: "tags_tr",
      title: "🏷️ Etiketler",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      group: "turkish",
      description: "Bu makale için ilgili etiketler ekleyin",
    }),
    // SEO Fields - Turkish
    defineField({
      name: "metaTitle_tr",
      title: "🔍 SEO Başlığı",
      type: "string",
      description: "Optimal: 50-60 karakter. Google arama sonuçlarında görünür.",
      validation: (rule) =>
        rule.max(70).warning("En iyi sonuçlar için 60 karakterin altında tutun"),
      group: "turkish",
    }),
    defineField({
      name: "metaDescription_tr",
      title: "🔍 Meta Açıklaması",
      type: "text",
      rows: 3,
      description: "Optimal: 150-160 karakter. Arama sonuçları için çekici açıklama.",
      validation: (rule) =>
        rule.max(170).warning("En iyi sonuçlar için 160 karakterin altında tutun"),
      group: "turkish",
    }),
    defineField({
      name: "focusKeyword_tr",
      title: "🎯 Odak Anahtar Kelime",
      type: "string",
      description: "Sıralama için ana anahtar kelime (örn: 'deniz taşımacılığı')",
      group: "turkish",
    }),

    // ==================== MEDIA & SETTINGS TAB ====================
    defineField({
      name: "coverImage",
      title: "🖼️ Cover Image",
      type: "image",
      options: { hotspot: true },
      group: "media",
      description: "Recommended: 1200x630px for optimal social sharing",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt Text",
          description: "Important for SEO and accessibility",
        },
      ],
    }),
    defineField({
      name: "ogImage",
      title: "📷 Social Share Image (Optional)",
      type: "image",
      options: { hotspot: true },
      group: "media",
      description: "Override cover image for social media. Recommended: 1200x630px",
    }),
    defineField({
      name: "author",
      title: "👤 Author",
      type: "reference",
      to: [{ type: "author" }],
      group: "media",
    }),
    defineField({
      name: "category",
      title: "📁 Category",
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
      name: "readingTime",
      title: "⏱️ Reading Time (minutes)",
      type: "number",
      description: "Estimated reading time in minutes",
      initialValue: 5,
      group: "media",
    }),
    defineField({
      name: "publishedAt",
      title: "📅 Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      group: "media",
    }),

    // ==================== FAQ TAB ====================
    defineField({
      name: "faq",
      title: "Frequently Asked Questions",
      description: "Add FAQ items to appear as rich snippets in Google search results",
      type: "array",
      of: [{ type: "faqItem" }],
      group: "faq",
    }),

    // ==================== LEGACY TAB (for backward compatibility) ====================
    defineField({
      name: "title",
      title: "Title (Legacy)",
      type: "string",
      group: "legacy",
      description: "Old posts only - use language tabs for new posts",
    }),
    defineField({
      name: "slug",
      title: "Slug (Legacy)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      group: "legacy",
      description: "Old posts only - use language tabs for new posts",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt (Legacy)",
      type: "text",
      rows: 3,
      group: "legacy",
      description: "Old posts only - use language tabs for new posts",
    }),
    defineField({
      name: "body",
      title: "Content (Legacy)",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
      group: "legacy",
      description: "Old posts only - use language tabs for new posts",
    }),
    defineField({
      name: "language",
      title: "Language (Legacy)",
      type: "string",
      group: "legacy",
      description: "Old posts only - no longer used",
      options: {
        list: [
          { title: "English", value: "en" },
          { title: "العربية", value: "ar" },
          { title: "Türkçe", value: "tr" },
        ],
      },
    }),
    defineField({
      name: "tags",
      title: "Tags (Legacy)",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      group: "legacy",
      description: "Old posts only - use language tabs for new posts",
    }),
    // Keep legacy SEO reference for old posts
    defineField({
      name: "seo",
      title: "SEO (Legacy)",
      type: "seo",
      group: "legacy",
      description: "Old posts only - use language tabs for new posts",
    }),
  ],
  preview: {
    select: {
      title: "title",
      title_en: "title_en",
      title_ar: "title_ar",
      title_tr: "title_tr",
      media: "coverImage",
      authorName: "author.name",
    },
    prepare({ title, title_en, title_ar, title_tr, media, authorName }) {
      const flags = [];
      if (title_en) flags.push("🇬🇧");
      if (title_ar) flags.push("🇸🇦");
      if (title_tr) flags.push("🇹🇷");
      const displayTitle = title_en || title_ar || title_tr || title || "Untitled";
      const isLegacy = title && !title_en && !title_ar && !title_tr;
      return {
        title: isLegacy ? `⚙️ ${displayTitle}` : `${flags.join("")} ${displayTitle}`,
        subtitle: isLegacy ? `Legacy Post • ${authorName || ""}` : authorName,
        media,
      };
    },
  },
});
