import { defineField, defineType } from "sanity";

// FAQ Item type for use in blog posts
export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "object",
  fields: [
    defineField({
      name: "question_en",
      title: "🇬🇧 Question (English)",
      type: "string",
    }),
    defineField({
      name: "question_ar",
      title: "🇸🇦 السؤال (عربي)",
      type: "string",
    }),
    defineField({
      name: "question_tr",
      title: "🇹🇷 Soru (Türkçe)",
      type: "string",
    }),
    defineField({
      name: "answer_en",
      title: "🇬🇧 Answer (English)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "answer_ar",
      title: "🇸🇦 الإجابة (عربي)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "answer_tr",
      title: "🇹🇷 Cevap (Türkçe)",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      question_en: "question_en",
      question_ar: "question_ar",
      question_tr: "question_tr",
    },
    prepare({ question_en, question_ar, question_tr }) {
      return {
        title: question_en || question_ar || question_tr || "FAQ Item",
      };
    },
  },
});
