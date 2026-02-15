// app/blog/page.tsx
import Image from "next/image";
import { Link } from '@/i18n/navigation';
import { sanityClient } from "@/lib/sanity/client";
import { paginatedPostsQuery, postsCountQuery } from "@/lib/sanity/queries";
import { getTranslations, getLocale } from 'next-intl/server';

export const revalidate = 60;
const PAGE_SIZE = 9;

type Post = {
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
  publishedAt?: string;
  mainImageUrl?: string;
  category?: string;
  tags?: string[];
  author?: { name?: string; imageUrl?: string };
};

// Helper function to get localized content with fallbacks
function getLocalizedField(
  post: Post,
  field: 'title' | 'slug' | 'excerpt',
  locale: string
): string {
  const langKey = `${field}_${locale}` as keyof Post;
  const enKey = `${field}_en` as keyof Post;
  const arKey = `${field}_ar` as keyof Post;
  const trKey = `${field}_tr` as keyof Post;
  const oldKey = field as keyof Post;

  return (
    (post[langKey] as string) ||
    (post[enKey] as string) ||
    (post[arKey] as string) ||
    (post[trKey] as string) ||
    (post[oldKey] as string) ||
    ''
  );
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const t = await getTranslations('blog');
  const locale = await getLocale();

  function formatDate(d?: string) {
    if (!d) return "";
    try {
      return new Intl.DateTimeFormat(locale, { month: "short", day: "2-digit" }).format(new Date(d));
    } catch {
      return "";
    }
  }

  const resolvedSearchParams = await searchParams;
  const page = Math.max(1, Number(resolvedSearchParams?.page ?? 1));
  const offset = (page - 1) * PAGE_SIZE;
  const end = offset + PAGE_SIZE;

  const [posts, total] = await Promise.all([
    sanityClient.fetch<Post[]>(paginatedPostsQuery, { offset, end }, { next: { revalidate: 60 } }),
    sanityClient.fetch<number>(postsCountQuery, {}, { next: { revalidate: 60 } }),
  ]);

  const totalPages = Math.max(1, Math.ceil((total as number) / PAGE_SIZE));

  return (
    <main className="px-0 bg-white dark:bg-[#0a0f1a] min-h-screen">
      {/* Hero */}
      <section className="relative w-full bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 text-white overflow-hidden -mt-16 md:-mt-24">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-white rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        <div className="mx-auto max-w-7xl px-6 pt-24 md:pt-32 pb-14 relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-md px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-white/90 mb-4">
            {t('insightsUpdates')}
          </span>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl tracking-tight">{t('title')}</h1>
          <p className="mt-3 max-w-2xl text-white/80 font-light">
            {t('subtitle')}
          </p>
        </div>
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-[#0a0f1a]" />
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const postTitle = getLocalizedField(post, 'title', locale);
            const postSlug = getLocalizedField(post, 'slug', locale);
            const postExcerpt = getLocalizedField(post, 'excerpt', locale);
            const img = post.mainImageUrl || "";
            const date = formatDate(post.publishedAt);
            const category = post.category;
            const authorName = post.author?.name;
            const authorImg = post.author?.imageUrl;
            const isRTL = locale === 'ar' || /[\u0600-\u06FF]/.test(postTitle);

            return (
              <li key={post._id} className="group card-hover overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-700/50 bg-white dark:bg-slate-800/60 shadow-sm">
                {/* صورة */}
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  {img ? (
                    <Image
                      src={img}
                      alt={postTitle}
                      fill
                      sizes="(min-width:1024px) 360px, 92vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />

                  {(category || date) && (
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-3">
                      <span className="rounded-full bg-white/90 dark:bg-slate-800/90 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-200 backdrop-blur">
                        {category ?? t('article')}
                      </span>
                      {date && (
                        <span className="rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
                          {date}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* النص */}
                <div className="p-5">
                  <Link href={`/blog/${postSlug}`} className="block">
                    <h2
                      dir={isRTL ? "rtl" : "ltr"}
                      className="line-clamp-2 text-lg font-bold leading-snug text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      {postTitle}
                    </h2>
                  </Link>

                  {postExcerpt && (
                    <p className="mt-2 line-clamp-3 text-sm text-gray-500 dark:text-gray-400">{postExcerpt}</p>
                  )}

                  {/* الكاتب */}
                  {(authorName || authorImg) && (
                    <div className="mt-4 flex items-center gap-3">
                      <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-indigo-500 to-violet-500">
                        {authorImg && (
                          <Image
                            src={authorImg}
                            alt={authorName ?? "Author"}
                            fill
                            sizes="32px"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{authorName ?? "DVN LOG"}</div>
                    </div>
                  )}

                  <div className="mt-4">
                    <Link
                      href={`/blog/${postSlug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                    >
                      {t('readMore')}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="rtl:rotate-180">
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {/* Prev */}
            <Link
              href={page > 1 ? (page - 1 === 1 ? "/blog" : `/blog?page=${page - 1}`) : "/blog"}
              className={`rounded-xl border border-slate-200/80 dark:border-slate-700/50 bg-white dark:bg-slate-800/60 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 ${page === 1 ? "pointer-events-none opacity-40" : "hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-indigo-400 transition-colors"}`}
              aria-disabled={page === 1}
            >
              {t('prev')}
            </Link>

            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1;
              const href = p === 1 ? "/blog" : `/blog?page=${p}`;
              const active = p === page;
              return (
                <Link
                  key={p}
                  href={href}
                  className={`rounded-xl border px-3 py-1.5 text-sm transition-all ${active ? "border-indigo-500 bg-indigo-600 font-semibold text-white shadow-sm" : "border-slate-200/80 dark:border-slate-700/50 bg-white dark:bg-slate-800/60 text-gray-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-indigo-400"}`}
                  aria-current={active ? "page" : undefined}
                >
                  {p}
                </Link>
              );
            })}

            {/* Next */}
            <Link
              href={page < totalPages ? `/blog?page=${page + 1}` : `/blog?page=${totalPages}`}
              className={`rounded-xl border border-slate-200/80 dark:border-slate-700/50 bg-white dark:bg-slate-800/60 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 ${page === totalPages ? "pointer-events-none opacity-40" : "hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-indigo-400 transition-colors"}`}
              aria-disabled={page === totalPages}
            >
              {t('next')}
            </Link>
          </nav>
        )}
      </section>
    </main>
  );
}
