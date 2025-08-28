import Link from "next/link";
import { sanityClient } from "@/lib/sanity/client";
import { paginatedPostsQuery, postsCountQuery } from "@/lib/sanity/queries";

export const revalidate = 60;

const PAGE_SIZE = 9;

export default async function BlogPage({ searchParams }: { searchParams?: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const page = Math.max(1, Number(params?.page ?? 1));
  const offset = (page - 1) * PAGE_SIZE;
  const end = offset + PAGE_SIZE;

  const [posts, total] = await Promise.all([
    sanityClient.fetch(paginatedPostsQuery, { offset, end }, { cache: "force-cache" }),
    sanityClient.fetch(postsCountQuery, {}, { cache: "force-cache" }),
  ]);

  const totalPages = Math.max(1, Math.ceil((total as number) / PAGE_SIZE));

  return (
    <main className="space-y-8">
      <h1 className="text-3xl font-semibold">Blog</h1>
      <ul className="grid gap-6 md:grid-cols-3">
        {posts.map((post: any) => (
          <li key={post._id} className="border rounded p-4">
            <Link href={`/blog/${post.slug}`} className="font-medium hover:underline">{post.title}</Link>
            {post.excerpt && <p className="text-sm text-muted-foreground mt-2">{post.excerpt}</p>}
          </li>
        ))}
      </ul>
      <nav className="flex gap-2">
        {Array.from({ length: totalPages }).map((_, i) => {
          const p = i + 1;
          const href = p === 1 ? "/blog" : `/blog?page=${p}`;
          const active = p === page;
          return (
            <a key={p} href={href} className={`px-3 py-1 border rounded ${active ? "bg-gray-100" : ""}`}>{p}</a>
          );
        })}
      </nav>
    </main>
  );
}
