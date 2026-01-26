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
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  mainImageUrl?: string;
  category?: string;
  language?: string;
  author?: { name?: string; imageUrl?: string };
};

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
    sanityClient.fetch<Post[]>(paginatedPostsQuery, { offset, end, language: locale }, { cache: "force-cache" }),
    sanityClient.fetch<number>(postsCountQuery, { language: locale }, { cache: "force-cache" }),
  ]);

  const totalPages = Math.max(1, Math.ceil((total as number) / PAGE_SIZE));

  return (
    <main className="px-0 bg-white dark:bg-slate-900 min-h-screen">
      {/* Hero */}
      <section className="relative w-full bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] text-white">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <p className="text-xs/6 font-semibold uppercase tracking-[0.2em] opacity-80">
            {t('insightsUpdates')}
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{t('title')}</h1>
          <p className="mt-3 max-w-2xl text-white/80">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const img = post.mainImageUrl || "";
            const date = formatDate(post.publishedAt);
            const category = post.category;
            const authorName = post.author?.name;
            const authorImg = post.author?.imageUrl;
            const isRTL = /[\u0600-\u06FF]/.test(post.title ?? "");

            return (
              <li key={post._id} className="group overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm transition hover:shadow-md">
                {/* صورة */}
                <div className="relative aspect-[16/10] w-full">
                  {img ? (
                    <Image
                      src={img}
                      alt={post.title}
                      fill
                      sizes="(min-width:1024px) 360px, 92vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800" />
                  )}

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
                <div className="p-4">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <h2
                      dir={isRTL ? "rtl" : "ltr"}
                      className="line-clamp-2 text-lg font-semibold leading-snug text-slate-900 dark:text-white hover:underline"
                    >
                      {post.title}
                    </h2>
                  </Link>

                  {post.excerpt && (
                    <p className="mt-2 line-clamp-3 text-sm text-slate-600 dark:text-slate-400">{post.excerpt}</p>
                  )}

                  {/* الكاتب */}
                  {(authorName || authorImg) && (
                    <div className="mt-4 flex items-center gap-3">
                      <div className="relative h-8 w-8 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-600">
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
                      <div className="text-sm text-slate-600 dark:text-slate-400">{authorName ?? "DVN LOG"}</div>
                    </div>
                  )}

                  <div className="mt-4">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-[#1e3a8a] dark:text-blue-400 hover:underline"
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
              className={`rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 ${page === 1 ? "pointer-events-none opacity-40" : "hover:bg-slate-50 dark:hover:bg-slate-700"}`}
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
                  className={`rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-sm ${active ? "bg-slate-100 dark:bg-slate-700 font-semibold text-slate-900 dark:text-white" : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"}`}
                  aria-current={active ? "page" : undefined}
                >
                  {p}
                </Link>
              );
            })}

            {/* Next */}
            <Link
              href={page < totalPages ? `/blog?page=${page + 1}` : `/blog?page=${totalPages}`}
              className={`rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 ${page === totalPages ? "pointer-events-none opacity-40" : "hover:bg-slate-50 dark:hover:bg-slate-700"}`}
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
