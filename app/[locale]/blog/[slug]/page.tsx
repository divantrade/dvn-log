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
  metaTitle_en?: string;
  metaTitle_ar?: string;
  metaTitle_tr?: string;
  metaDescription_en?: string;
  metaDescription_ar?: string;
  metaDescription_tr?: string;
  focusKeyword?: string;
  ogImageUrl?: string;
  twitterCardType?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
};

type LocalizedBlogPost = {
  _id: string;
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
  title: string;
  slug: string;
  excerpt?: string;
  mainImageUrl?: string;
};

// Helper to get localized content
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
  return (obj[langKey] || obj[enKey] || obj[arKey] || obj[trKey]) as T | undefined;
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
  return (post[langKey] || post[enKey] || post[arKey] || post[trKey]) as T | undefined;
}

// Generate metadata for SEO
export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = (await params).locale || 'en';

  const post = await sanityClient.fetch<LocalizedBlogPost>(postBySlugQuery, { slug }, { cache: "force-cache" });

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
    keywords: post.seo?.focusKeyword ? [post.seo.focusKeyword, ...(post.tags || [])] : post.tags,
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

  const post = await sanityClient.fetch<LocalizedBlogPost>(postBySlugQuery, { slug }, { cache: "force-cache" });

  if (!post) {
    return (
      <main className="px-0">
        <NavHeightObserver />
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">{t('postNotFound')}</h1>
          <Link href="/blog" className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline">
            ← {t('backToBlog')}
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
    { cache: "force-cache" }
  );

  const publishedDate = formatDate(post.publishedAt);
  const isRTL = locale === 'ar' || /[\u0600-\u06FF]/.test(title);
  const pageUrl = `${SITE_URL}/${locale}/blog/${currentSlug}`;

  return (
    <main className="px-0">
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

      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <Link href="/blog" className="inline-flex items-center text-slate-300 hover:text-white mb-6 transition-colors">
            <svg className="w-4 h-4 me-2 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('backToBlog')}
          </Link>

          {/* Category & Reading Time */}
          <div className="flex items-center gap-3 mb-4">
            {post.category && (
              <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full uppercase">
                {post.category}
              </span>
            )}
            {post.readingTime && (
              <span className="text-slate-400 text-sm flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {post.readingTime} {locale === 'ar' ? 'دقائق قراءة' : locale === 'tr' ? 'dk okuma' : 'min read'}
              </span>
            )}
          </div>

          <h1
            dir={isRTL ? "rtl" : "ltr"}
            className="text-3xl md:text-4xl font-bold leading-tight mb-4"
          >
            {title}
          </h1>

          <div className="flex items-center gap-4 text-slate-300">
            {post.author?.name && (
              <div className="flex items-center gap-2">
                {post.author.imageUrl && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
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
                  <span className="block font-medium">{post.author.name}</span>
                  {publishedDate && <span className="text-sm text-slate-400">{publishedDate}</span>}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="mx-auto max-w-4xl px-6 py-12">
        {post.mainImageUrl && (
          <div className="relative aspect-[16/9] w-full mb-8 rounded-2xl overflow-hidden">
            <Image
              src={post.mainImageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className={`prose prose-lg prose-slate dark:prose-invert max-w-none ${isRTL ? 'text-right' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
          {body.length > 0 ? (
            <PortableText value={body} />
          ) : (
            <p className="text-slate-500 italic">{excerpt || t('postNotFound')}</p>
          )}
        </div>

        {/* FAQ Section */}
        {faqItems.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              {locale === 'ar' ? 'الأسئلة الشائعة' : locale === 'tr' ? 'Sıkça Sorulan Sorular' : 'Frequently Asked Questions'}
            </h2>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <details
                  key={index}
                  className="group bg-slate-50 dark:bg-slate-800 rounded-xl p-4 cursor-pointer"
                >
                  <summary className="font-semibold text-slate-900 dark:text-white list-none flex items-center justify-between">
                    {item.question}
                    <svg className="w-5 h-5 text-slate-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-3 text-slate-600 dark:text-slate-400">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">{t('tags')}</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm rounded-full"
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
        <section className="bg-slate-50 dark:bg-slate-800/50 py-12">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">{t('relatedArticles')}</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((relatedPost) => (
                <article key={relatedPost._id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow">
                  {relatedPost.mainImageUrl && (
                    <div className="relative aspect-[16/10] w-full">
                      <Image
                        src={relatedPost.mainImageUrl}
                        alt={relatedPost.title}
                        fill
                        sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2">
                      <Link href={`/blog/${relatedPost.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {relatedPost.title}
                      </Link>
                    </h3>
                    {relatedPost.excerpt && (
                      <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-4">
                        {relatedPost.excerpt}
                      </p>
                    )}
                    <Link
                      href={`/blog/${relatedPost.slug}`}
                      className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {t('readMore')}
                      <svg className="w-4 h-4 ms-1 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
