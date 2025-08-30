import { safeSanityServerFetch } from "@/lib/sanity/client";
import { postBySlugQuery, relatedPostsQuery } from "@/lib/sanity/queries";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import NavHeightObserver from "../../_components/NavHeightObserver";

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

function formatDate(d?: string) {
  if (!d) return "";
  try {
    return new Intl.DateTimeFormat("en", { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    }).format(new Date(d));
  } catch {
    return "";
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, related] = await Promise.all([
    safeSanityServerFetch(postBySlugQuery, { slug }, { cache: "force-cache" }),
    safeSanityServerFetch(relatedPostsQuery, { slug }, { cache: "force-cache" })
  ]);
  
  // Handle empty data gracefully
  const safePost = post && typeof post === 'object' && post._id ? post : null;
  const safeRelated = Array.isArray(related) ? related : [];
  
  if (!safePost) {
    return (
      <main className="px-0">
        <NavHeightObserver />
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h1 className="text-2xl font-semibold text-slate-900">Post not found</h1>
          <Link href="/blog" className="mt-4 inline-block text-blue-600 hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  const publishedDate = formatDate(safePost.publishedAt);
  const isRTL = /[\u0600-\u06FF]/.test(safePost.title ?? "");

  return (
    <main className="px-0">
      <NavHeightObserver />
      
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <Link href="/blog" className="inline-flex items-center text-slate-300 hover:text-white mb-6 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
          
          <h1 className={`text-3xl font-bold sm:text-4xl mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
            {safePost.title}
          </h1>
          <div className="flex items-center gap-4 text-slate-300">
            <span>{publishedDate}</span>
            {safePost.category && <span className="px-2 py-1 bg-blue-600 rounded text-sm">{safePost.category}</span>}
            {safePost.author?.name && <span>By {safePost.author.name}</span>}
          </div>
        </div>
      </section>

      {/* Main Image */}
      {safePost.mainImageUrl && (
        <section className="mx-auto max-w-4xl px-6 py-8">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={safePost.mainImageUrl}
              alt={safePost.title || "Blog post image"}
              fill
              className="object-cover"
            />
          </div>
        </section>
      )}

      {/* Content */}
      <article className="mx-auto max-w-4xl px-6 py-8">
        <div className={`prose prose-lg max-w-none ${isRTL ? 'prose-rtl' : ''}`}>
          {safePost.body && (
            <PortableText 
              value={safePost.body} 
              components={{
                types: {
                  image: ({ value }: { value: any }) => (
                    <div className="my-8">
                      <Image
                        src={value.asset?.url || ''}
                        alt={value.alt || ''}
                        width={800}
                        height={400}
                        className="rounded-lg"
                      />
                    </div>
                  ),
                },
              }}
            />
          )}
        </div>

        {/* Tags */}
        {safePost.tags && safePost.tags.length > 0 && (
          <div className="mt-8 pt-8 border-t border-slate-200">
            <h3 className="text-sm font-semibold text-slate-600 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {safePost.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Related Posts */}
      {safeRelated && safeRelated.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 py-12 border-t border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Related Posts</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {safeRelated.slice(0, 2).map((relatedPost: any) => (
                <article key={relatedPost._id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
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
                    <h3 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2">
                      <Link href={`/blog/${relatedPost.slug}`} className="hover:text-blue-600 transition-colors">
                        {relatedPost.title}
                      </Link>
                    </h3>
                    {relatedPost.excerpt && (
                      <p className="text-slate-600 text-sm line-clamp-3 mb-4">
                        {relatedPost.excerpt}
                      </p>
                    )}
                    <Link
                      href={`/blog/${relatedPost.slug}`}
                      className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline"
                    >
                      Read more
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
        </section>
      )}
    </main>
  );
}
