import { defineType, defineField } from "sanity";

// Localized string field (for titles, short text)
export const localeString = defineType({
  name: "localeString",
  title: "Localized String",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "🇬🇧 English",
      type: "string",
    }),
    defineField({
      name: "ar",
      title: "🇸🇦 العربية",
      type: "string",
    }),
    defineField({
      name: "tr",
      title: "🇹🇷 Türkçe",
      type: "string",
    }),
  ],
});

// Localized text field (for excerpts, descriptions)
export const localeText = defineType({
  name: "localeText",
  title: "Localized Text",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "🇬🇧 English",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "ar",
      title: "🇸🇦 العربية",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "tr",
      title: "🇹🇷 Türkçe",
      type: "text",
      rows: 3,
    }),
  ],
});

// Localized slug field
export const localeSlug = defineType({
  name: "localeSlug",
  title: "Localized Slug",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "🇬🇧 English Slug",
      type: "slug",
      options: { maxLength: 96 },
    }),
    defineField({
      name: "ar",
      title: "🇸🇦 الرابط بالعربية",
      type: "slug",
      options: { maxLength: 96 },
    }),
    defineField({
      name: "tr",
      title: "🇹🇷 Türkçe Slug",
      type: "slug",
      options: { maxLength: 96 },
    }),
  ],
});

// Localized rich text (block content)
export const localeBlock = defineType({
  name: "localeBlock",
  title: "Localized Content",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "🇬🇧 English Content",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "ar",
      title: "🇸🇦 المحتوى بالعربية",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "tr",
      title: "🇹🇷 Türkçe İçerik",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
  ],
});
