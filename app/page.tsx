import Image from "next/image";
import Link from "next/link";
import { sanityClient, urlFor } from "@/lib/sanity/client";
import { partnersQuery, latestPostsQuery } from "@/lib/sanity/queries";

export const revalidate = 60;

export default async function HomePage() {
  const [partners, posts] = await Promise.all([
    sanityClient.fetch(partnersQuery, {}, { cache: "force-cache" }),
    sanityClient.fetch(latestPostsQuery, {}, { cache: "force-cache" }),
  ]);

  return (
    <main className="space-y-10">
      <section className="py-10">
        <h1 className="text-3xl font-semibold">DVN LOG</h1>
        <p className="text-muted-foreground mt-2">Ocean • Air • Road • Rail logistics.</p>
        <div className="mt-6 flex gap-3">
          <Link href="/services" className="px-4 py-2 rounded bg-black text-white">Explore Services</Link>
          <Link href="/tracking" className="px-4 py-2 rounded border">Track Shipment</Link>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Partners</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          {partners?.length ? partners.map((p: any) => (
            <a key={p._id} href={p.websiteUrl ?? "#"} className="flex items-center justify-center">
              {p.logo ? (
                <Image
                  src={urlFor(p.logo).width(220).height(120).fit("contain").url()}
                  alt={p.name}
                  width={220}
                  height={120}
                />
              ) : (
                <span className="text-sm">{p.name}</span>
              )}
            </a>
          )) : <div className="text-sm text-muted-foreground">No partners yet.</div>}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Latest articles</h2>
        <ul className="grid gap-6 md:grid-cols-3">
          {posts?.length ? posts.map((post: any) => (
            <li key={post._id} className="border rounded p-4">
              <Link href={`/blog/${post.slug}`} className="font-medium hover:underline">{post.title}</Link>
              {post.excerpt && <p className="text-sm text-muted-foreground mt-2">{post.excerpt}</p>}
            </li>
          )) : <div className="text-sm text-muted-foreground">No posts yet.</div>}
        </ul>
      </section>
    </main>
  );
}
