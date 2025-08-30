// app/blog/page.tsx
import Image from "next/image";
import Link from "next/link";
import { safeSanityServerFetch } from "@/lib/sanity/client";
import { paginatedPostsQuery, postsCountQuery } from "@/lib/sanity/queries";

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
  author?: { name?: string; imageUrl?: string };
};

function formatDate(d?: string) {
  if (!d) return "";
  try {
    return new Intl.DateTimeFormat("en", { month: "short", day: "2-digit" }).format(new Date(d));
  } catch {
    return "";
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = Math.max(1, Number(resolvedSearchParams?.page ?? 1));
  const offset = (page - 1) * PAGE_SIZE;
  const end = offset + PAGE_SIZE;

  const [posts, total] = await Promise.all([
    safeSanityServerFetch(paginatedPostsQuery, { offset, end }, { cache: "force-cache" }),
    safeSanityServerFetch(postsCountQuery, {}, { cache: "force-cache" }),
  ]);

  // Handle empty data gracefully
  const safePosts = Array.isArray(posts) ? posts : [];
  const safeTotal = typeof total === 'number' ? total : 0;
  const totalPages = Math.max(1, Math.ceil(safeTotal / PAGE_SIZE));

  return (
    <main className="px-0">
      {/* Hero */}
      <section className="relative w-full bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] text-white">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <p className="text-xs/6 font-semibold uppercase tracking-[0.2em] opacity-80">
            Insights & Updates
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Blog</h1>
          <p className="mt-3 max-w-2xl text-white/80">
            Practical logistics articles, market updates, and how-tos to help you ship smarter.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        {safePosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto max-w-md">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Blog Coming Soon</h2>
              <p className="text-gray-600 mb-6">
                We're working on bringing you valuable insights and updates about logistics and shipping. Check back soon for our latest articles!
              </p>
              <Link 
                href="/" 
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {safePosts.map((post: Post) => {
            const img = post.mainImageUrl || "";
            const date = formatDate(post.publishedAt);
            const category = post.category;
            const authorName = post.author?.name;
            const authorImg = post.author?.imageUrl;
            const isRTL = /[\u0600-\u06FF]/.test(post.title ?? "");

            return (
              <li key={post._id} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
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
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200" />
                  )}

                  {(category || date) && (
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-3">
                      <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-slate-700 backdrop-blur">
                        {category ?? "Article"}
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
                      className="line-clamp-2 text-lg font-semibold leading-snug text-slate-900 hover:underline"
                    >
                      {post.title}
                    </h2>
                  </Link>

                  {post.excerpt && (
                    <p className="mt-2 line-clamp-3 text-sm text-slate-600">{post.excerpt}</p>
                  )}

                  {/* الكاتب */}
                  {(authorName || authorImg) && (
                    <div className="mt-4 flex items-center gap-3">
                      <div className="relative h-8 w-8 overflow-hidden rounded-full bg-slate-200">
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
                      <div className="text-sm text-slate-600">{authorName ?? "DVN LOG"}</div>
                    </div>
                  )}

                  <div className="mt-4">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-[#1e3a8a] hover:underline"
                    >
                      Read more
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
          </ul>
        )}

        {/* Pagination */}
        {safePosts.length > 0 && totalPages > 1 && (
          <nav className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {/* Prev */}
            <Link
              href={page > 1 ? (page - 1 === 1 ? "/blog" : `/blog?page=${page - 1}`) : "/blog"}
              className={`rounded-lg border px-3 py-1.5 text-sm ${page === 1 ? "pointer-events-none opacity-40" : "hover:bg-slate-50"}`}
              aria-disabled={page === 1}
            >
              Prev
            </Link>

            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1;
              const href = p === 1 ? "/blog" : `/blog?page=${p}`;
              const active = p === page;
              return (
                <Link
                  key={p}
                  href={href}
                  className={`rounded-lg border px-3 py-1.5 text-sm ${active ? "bg-slate-100 font-semibold" : "hover:bg-slate-50"}`}
                  aria-current={active ? "page" : undefined}
                >
                  {p}
                </Link>
              );
            })}

            {/* Next */}
            <Link
              href={page < totalPages ? `/blog?page=${page + 1}` : `/blog?page=${totalPages}`}
              className={`rounded-lg border px-3 py-1.5 text-sm ${page === totalPages ? "pointer-events-none opacity-40" : "hover:bg-slate-50"}`}
              aria-disabled={page === totalPages}
            >
              Next
            </Link>
          </nav>
        )}
      </section>
    </main>
  );
}
