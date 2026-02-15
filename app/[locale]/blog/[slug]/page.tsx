import { sanityClient } from "@/lib/sanity/client";
import { postBySlugQuery, relatedPostsQuery, allPostSlugsQuery } from "@/lib/sanity/queries";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { Link } from '@/i18n/navigation';
import NavHeightObserver from "../../_components/NavHeightObserver";
import { getTranslations, getLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { ArticleJsonLd, FAQJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export const revalidate = 60;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://dvnlog.com';
const SITE_NAME = 'DVN Lojistik';
const PUBLISHER_LOGO = `${SITE_URL}/images/logo.png`;

type FAQItem = {
  question_en?: string;
  question_ar?: string;
  question_tr?: string;
  answer_en?: string;
  answer_ar?: string;
  answer_tr?: string;
};

type SEOData = {
  // Old SEO fields
  title?: string;
  description?: string;
  // New localized SEO fields
  metaTitle_en?: string;
  metaTitle_ar?: string;
  metaTitle_tr?: string;
  metaDescription_en?: string;
  metaDescription_ar?: string;
  metaDescription_tr?: string;
  // Localized focus keywords
  focusKeyword_en?: string;
  focusKeyword_ar?: string;
  focusKeyword_tr?: string;
  focusKeyword?: string; // Legacy
  ogImageUrl?: string;
  twitterCardType?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
};

type LocalizedBlogPost = {
  _id: string;
  // Old schema fields
  title?: string;
  slug?: string;
  excerpt?: string;
  body?: any[];
  // New localized fields
  title_en?: string;
  title_ar?: string;
  title_tr?: string;
  slug_en?: string;
  slug_ar?: string;
  slug_tr?: string;
  excerpt_en?: string;
  excerpt_ar?: string;
  excerpt_tr?: string;
  body_en?: any[];
  body_ar?: any[];
  body_tr?: any[];
  // Common fields
  mainImageUrl?: string;
  publishedAt?: string;
  _updatedAt?: string;
  category?: string;
  readingTime?: number;
  author?: {
    name?: string;
    imageUrl?: string;
    bio?: string;
    slug?: string;
  };
  tags?: string[];
  faq?: FAQItem[];
  seo?: SEOData;
};

type RelatedPost = {
  _id: string;
  // Old schema
  title?: string;
  slug?: string;
  excerpt?: string;
  // New localized schema
  title_en?: string;
  title_ar?: string;
  title_tr?: string;
  slug_en?: string;
  slug_ar?: string;
  slug_tr?: string;
  excerpt_en?: string;
  excerpt_ar?: string;
  excerpt_tr?: string;
  // Common
  mainImageUrl?: string;
};

// Helper function to get localized field for related posts
function getRelatedPostField(
  post: RelatedPost,
  field: 'title' | 'slug' | 'excerpt',
  locale: string
): string {
  const langKey = `${field}_${locale}` as keyof RelatedPost;
  const enKey = `${field}_en` as keyof RelatedPost;
  const arKey = `${field}_ar` as keyof RelatedPost;
  const trKey = `${field}_tr` as keyof RelatedPost;
  const oldKey = field as keyof RelatedPost;

  return (
    (post[langKey] as string) ||
    (post[enKey] as string) ||
    (post[arKey] as string) ||
    (post[trKey] as string) ||
    (post[oldKey] as string) ||
    ''
  );
}

// Helper to get localized content - supports both old and new schema
function getLocalizedValue<T>(
  obj: Record<string, T | undefined> | undefined,
  field: string,
  locale: string
): T | undefined {
  if (!obj) return undefined;
  const langKey = `${field}_${locale}`;
  const enKey = `${field}_en`;
  const arKey = `${field}_ar`;
  const trKey = `${field}_tr`;
  // Also check for old field name without language suffix
  return (obj[langKey] || obj[enKey] || obj[arKey] || obj[trKey] || obj[field]) as T | undefined;
}

function getLocalizedContent<T>(
  post: LocalizedBlogPost,
  field: 'title' | 'slug' | 'excerpt' | 'body',
  locale: string
): T | undefined {
  const langKey = `${field}_${locale}` as keyof LocalizedBlogPost;
  const enKey = `${field}_en` as keyof LocalizedBlogPost;
  const arKey = `${field}_ar` as keyof LocalizedBlogPost;
  const trKey = `${field}_tr` as keyof LocalizedBlogPost;
  const oldKey = field as keyof LocalizedBlogPost; // Fallback to old schema field
  return (post[langKey] || post[enKey] || post[arKey] || post[trKey] || post[oldKey]) as T | undefined;
}

// Generate metadata for SEO
export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = (await params).locale || 'en';

  const post = await sanityClient.fetch<LocalizedBlogPost>(postBySlugQuery, { slug }, { next: { revalidate: 60 } });

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const title = getLocalizedContent<string>(post, 'title', locale) || 'Blog Post';
  const excerpt = getLocalizedContent<string>(post, 'excerpt', locale);

  // Get SEO-specific titles/descriptions or fall back to content
  const seoTitle: string = getLocalizedValue<string>(post.seo as Record<string, string | undefined>, 'metaTitle', locale) || title;
  const seoDescription: string = getLocalizedValue<string>(post.seo as Record<string, string | undefined>, 'metaDescription', locale) || excerpt || '';
  const ogImage = post.seo?.ogImageUrl || post.mainImageUrl;
  const twitterCard = post.seo?.twitterCardType || 'summary_large_image';
  const canonical = post.seo?.canonicalUrl;

  const pageUrl = `${SITE_URL}/${locale}/blog/${slug}`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: (() => {
      const focusKw = getLocalizedValue<string>(post.seo as Record<string, string | undefined>, 'focusKeyword', locale) || post.seo?.focusKeyword;
      return focusKw ? [focusKw, ...(post.tags || [])] : post.tags;
    })(),
    authors: post.author?.name ? [{ name: post.author.name }] : undefined,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: pageUrl,
      siteName: SITE_NAME,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      tags: post.tags,
      images: ogImage ? [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        }
      ] : undefined,
      locale: locale === 'ar' ? 'ar_SA' : locale === 'tr' ? 'tr_TR' : 'en_US',
    },
    twitter: {
      card: twitterCard as 'summary' | 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: ogImage ? [ogImage] : undefined,
    },
    alternates: {
      canonical: canonical || pageUrl,
    },
    robots: {
      index: !post.seo?.noIndex,
      follow: !post.seo?.noFollow,
    },
  };
}

// Generate static params for all blog posts at build time
export async function generateStaticParams() {
  try {
    const posts = await sanityClient.fetch<{ slugs: (string | null)[] }[]>(allPostSlugsQuery);
    const allSlugs = posts
      .flatMap(post => post.slugs)
      .filter((slug): slug is string => slug !== null && slug !== undefined);
    const uniqueSlugs = [...new Set(allSlugs)];
    return uniqueSlugs.map((slug) => ({ slug }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = await getTranslations('blog');
  const locale = await getLocale();

  function formatDate(d?: string) {
    if (!d) return "";
    try {
      return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long",
        day: "numeric"
      }).format(new Date(d));
    } catch {
      return "";
    }
  }

  const post = await sanityClient.fetch<LocalizedBlogPost>(postBySlugQuery, { slug }, { next: { revalidate: 60 } });

  if (!post) {
    return (
      <main className="px-0 bg-white dark:bg-[#0a0f1a]">
        <NavHeightObserver />
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{t('postNotFound')}</h1>
          <Link href="/blog" className="mt-4 inline-block text-indigo-600 dark:text-indigo-400 hover:underline">
            &larr; {t('backToBlog')}
          </Link>
        </div>
      </main>
    );
  }

  // Get localized content
  const title = getLocalizedContent<string>(post, 'title', locale) || 'Untitled';
  const excerpt = getLocalizedContent<string>(post, 'excerpt', locale);
  const body = getLocalizedContent<any[]>(post, 'body', locale) || [];
  const currentSlug = getLocalizedContent<string>(post, 'slug', locale) || slug;

  // Get localized FAQ
  const faqItems = post.faq?.map(item => ({
    question: getLocalizedValue(item, 'question', locale) || '',
    answer: getLocalizedValue(item, 'answer', locale) || '',
  })).filter(item => item.question && item.answer) || [];

  // Fetch related posts
  const related = await sanityClient.fetch<RelatedPost[]>(
    relatedPostsQuery,
    { slug, language: locale, tags: post.tags || [] },
    { next: { revalidate: 60 } }
  );

  const publishedDate = formatDate(post.publishedAt);
  const isRTL = locale === 'ar' || /[\u0600-\u06FF]/.test(title);
  const pageUrl = `${SITE_URL}/${locale}/blog/${currentSlug}`;

  return (
    <main className="px-0 bg-white dark:bg-[#0a0f1a]">
      <NavHeightObserver />

      {/* JSON-LD Structured Data */}
      <ArticleJsonLd
        title={title}
        description={excerpt || ''}
        url={pageUrl}
        imageUrl={post.mainImageUrl || ''}
        datePublished={post.publishedAt || ''}
        dateModified={post._updatedAt}
        authorName={post.author?.name || SITE_NAME}
        authorUrl={post.author?.slug ? `${SITE_URL}/authors/${post.author.slug}` : undefined}
        publisherName={SITE_NAME}
        publisherLogo={PUBLISHER_LOGO}
        readingTime={post.readingTime}
      />

      <BreadcrumbJsonLd
        items={[
          { name: locale === 'ar' ? 'الرئيسية' : locale === 'tr' ? 'Ana Sayfa' : 'Home', url: `${SITE_URL}/${locale}` },
          { name: locale === 'ar' ? 'المدونة' : locale === 'tr' ? 'Blog' : 'Blog', url: `${SITE_URL}/${locale}/blog` },
          { name: title, url: pageUrl },
        ]}
      />

      {faqItems.length > 0 && <FAQJsonLd items={faqItems} />}

      {/* Hero Section with Cover Image Background */}
      <section className="relative w-full min-h-[50vh] md:min-h-[60vh] flex items-end -mt-16 md:-mt-24">
        {/* Background Image */}
        {post.mainImageUrl ? (
          <Image
            src={post.mainImageUrl}
            alt={title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-violet-900 to-purple-900" />
        )}

        {/* Dark Overlay with indigo tint */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-indigo-900/30" />

        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

        {/* Content */}
        <div className="relative z-10 w-full">
          <div className="mx-auto max-w-4xl px-6 py-8 md:py-12 pt-24 md:pt-32">
            <Link href="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors text-sm">
              <svg className="w-4 h-4 me-2 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t('backToBlog')}
            </Link>

            {/* Category & Reading Time */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {post.category && (
                <span className="px-3 py-1 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-medium rounded-full uppercase">
                  {post.category}
                </span>
              )}
              {post.readingTime && (
                <span className="text-white/70 text-sm flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {post.readingTime} {locale === 'ar' ? 'دقائق قراءة' : locale === 'tr' ? 'dk okuma' : 'min read'}
                </span>
              )}
            </div>

            <h1
              dir={isRTL ? "rtl" : "ltr"}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-4 text-white drop-shadow-lg tracking-tight"
            >
              {title}
            </h1>

            <div className="flex items-center gap-4 text-white/80">
              {post.author?.name && (
                <div className="flex items-center gap-3">
                  {post.author.imageUrl && (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/30 shadow-lg">
                      <Image
                        src={post.author.imageUrl}
                        alt={post.author.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <span className="block font-medium text-white">{post.author.name}</span>
                    {publishedDate && <span className="text-sm text-white/60">{publishedDate}</span>}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="mx-auto max-w-4xl px-6 py-10 md:py-12">
        <div className={`prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-indigo-600 dark:prose-a:text-indigo-400 ${isRTL ? 'text-right' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
          {body.length > 0 ? (
            <PortableText value={body} />
          ) : (
            <p className="text-gray-500 italic">{excerpt || t('postNotFound')}</p>
          )}
        </div>

        {/* FAQ Section */}
        {faqItems.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-200/80 dark:border-slate-700/50">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {locale === 'ar' ? 'الأسئلة الشائعة' : locale === 'tr' ? 'Sıkça Sorulan Sorular' : 'Frequently Asked Questions'}
            </h2>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <details
                  key={index}
                  className="group bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-5 cursor-pointer border border-slate-200/80 dark:border-slate-700/50"
                >
                  <summary className="font-semibold text-gray-900 dark:text-white list-none flex items-center justify-between">
                    {item.question}
                    <svg className="w-5 h-5 text-indigo-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-3 text-gray-500 dark:text-gray-400">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 pt-8 border-t border-slate-200/80 dark:border-slate-700/50">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">{t('tags')}</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-slate-100 dark:bg-slate-800/60 text-gray-700 dark:text-gray-300 text-sm rounded-full border border-slate-200/80 dark:border-slate-700/50 hover:border-indigo-400 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Related Posts */}
      {related && related.length > 0 && (
        <section className="mesh-gradient py-14">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">{t('relatedArticles')}</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((relatedPost) => {
                const relatedTitle = getRelatedPostField(relatedPost, 'title', locale);
                const relatedSlug = getRelatedPostField(relatedPost, 'slug', locale);
                const relatedExcerpt = getRelatedPostField(relatedPost, 'excerpt', locale);

                if (!relatedSlug) return null;

                return (
                  <article key={relatedPost._id} className="card-hover bg-white dark:bg-slate-800/60 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-700/50 overflow-hidden">
                    {relatedPost.mainImageUrl && (
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <Image
                          src={relatedPost.mainImageUrl}
                          alt={relatedTitle}
                          fill
                          sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        <Link href={`/blog/${relatedSlug}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                          {relatedTitle}
                        </Link>
                      </h3>
                      {relatedExcerpt && (
                        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 mb-4">
                          {relatedExcerpt}
                        </p>
                      )}
                      <Link
                        href={`/blog/${relatedSlug}`}
                        className="inline-flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                      >
                        {t('readMore')}
                        <svg className="w-4 h-4 ms-1 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
