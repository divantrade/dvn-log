import { sanityClient, urlFor } from "@/lib/sanity/client";
import { postBySlugQuery, relatedPostsQuery } from "@/lib/sanity/queries";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60;

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await sanityClient.fetch(postBySlugQuery, { slug: params.slug }, { cache: "force-cache" });
  if (!post) return <main><h1 className="text-2xl font-semibold">Post not found</h1></main>;

  const related = await sanityClient.fetch(relatedPostsQuery, { slug: params.slug }, { cache: "force-cache" });

  return (
    <main className="space-y-10">
      <article className="prose dark:prose-invert max-w-none">
        <h1>{post.title}</h1>
        {post.coverImage && (
          <Image src={urlFor(post.coverImage).width(1200).height(630).url()} alt={post.title} width={1200} height={630} />
        )}
        <PortableText value={post.body} />
      </article>

      {!!related?.length && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Related posts</h2>
          <ul className="grid gap-6 md:grid-cols-3">
            {related.map((p: any) => (
              <li key={p._id} className="border rounded p-4">
                <Link href={`/blog/${p.slug}`} className="font-medium hover:underline">{p.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
