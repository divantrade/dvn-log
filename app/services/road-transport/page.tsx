import Link from "next/link";
import PageHero from "../../_components/PageHero";
import NavHeightObserver from "../../_components/NavHeightObserver";
import TruckImg from "@/images/full-shot-man-walking-by-trucks-fleet.jpg";

export default function RoadTransportPage() {
  return (
    <main className="px-0">
      <NavHeightObserver />
      <PageHero title={"Road Transport"} subtitle={"FTL/LTL across regions with optimized transit and coverage."} image={TruckImg} imageAlt="Truck fleet on the road" />
      <div className="mx-auto max-w-7xl px-6 py-12 space-y-8">
      <nav className="text-sm text-neutral-600 dark:text-neutral-400"><Link href="/services" className="hover:underline">Services</Link> / Road Transport</nav>

      <section className="grid gap-4">
        <h2 className="text-xl font-medium text-[var(--brand-primary)]">Capabilities</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
          <li>FTL and LTL across major corridors</li>
          <li>Time‑definite and economy options</li>
          <li>Cross‑border and customs coordination</li>
          <li>GPS visibility and POD management</li>
        </ul>
      </section>

      <section className="rounded-xl border border-neutral-200/70 dark:border-neutral-800/70 p-6 bg-neutral-50 dark:bg-neutral-950">
        <h3 className="font-medium">Plan your road move</h3>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">We’ll match equipment and transit to your lanes.</p>
        <div className="mt-3 flex gap-3">
          <Link href="/contact" className="px-4 py-2 rounded-md bg-[var(--brand-bg)] text-[var(--brand-fg)]">Contact Us</Link>
          <Link href="/tracking" className="px-4 py-2 rounded-md border border-[var(--brand-primary-600)]">Track Shipment</Link>
        </div>
      </section>
      </div>
    </main>
  );
}
