import { sanityClient } from "@/lib/sanity/client";
import { postBySlugQuery, relatedPostsQuery, allPostSlugsQuery } from "@/lib/sanity/queries";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { Link } from '@/i18n/navigation';
import NavHeightObserver from "../../_components/NavHeightObserver";
import { getTranslations, getLocale } from 'next-intl/server';

export const revalidate = 60;

type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  mainImageUrl?: string;
  body: any[];
  publishedAt?: string;
  author?: { name?: string; imageUrl?: string };
  tags?: string[];
  seo?: any;
};

// Generate static params for all blog posts at build time
export async function generateStaticParams() {
  try {
    const posts = await sanityClient.fetch<{ slug: string }[]>(allPostSlugsQuery);
    return posts.map((post) => ({
      slug: post.slug,
    }));
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

  const [post, related] = await Promise.all([
    sanityClient.fetch<BlogPost>(postBySlugQuery, { slug }, { cache: "force-cache" }),
    sanityClient.fetch<BlogPost[]>(relatedPostsQuery, { slug }, { cache: "force-cache" })
  ]);

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

  const publishedDate = formatDate(post.publishedAt);
  const isRTL = /[\u0600-\u06FF]/.test(post.title ?? "");

  return (
    <main className="px-0">
      <NavHeightObserver />

      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <Link href="/blog" className="inline-flex items-center text-slate-300 hover:text-white mb-6 transition-colors">
            <svg className="w-4 h-4 me-2 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('backToBlog')}
          </Link>

          <h1
            dir={isRTL ? "rtl" : "ltr"}
            className="text-3xl md:text-4xl font-bold leading-tight mb-4"
          >
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-slate-300">
            {post.author?.name && (
              <div className="flex items-center gap-2">
                {post.author.imageUrl && (
                  <div className="relative w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={post.author.imageUrl}
                      alt={post.author.name}
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                )}
                <span>{post.author.name}</span>
              </div>
            )}
            {publishedDate && (
              <>
                <span>•</span>
                <span>{publishedDate}</span>
              </>
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
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
          <PortableText value={post.body} />
        </div>

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
