import Link from "next/link";
import PageHero from "../../_components/PageHero";
import NavHeightObserver from "../../_components/NavHeightObserver";
import TrainImg from "@/images/close-up-train-with-containers.jpg";

export default function RailFreightPage() {
  return (
    <main className="px-0">
      <NavHeightObserver />
      <PageHero title={"Rail Freight"} subtitle={"Efficient intermodal rail corridors and stable lead times."} image={TrainImg} imageAlt="Freight train with containers" />
      <div className="mx-auto max-w-7xl px-6 py-12 space-y-8">
      <nav className="text-sm text-neutral-600 dark:text-neutral-400"><Link href="/services" className="hover:underline">Services</Link> / Rail Freight</nav>

      <section className="grid gap-4">
        <h2 className="text-xl font-medium text-[var(--brand-primary)]">Capabilities</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
          <li>Block train and intermodal solutions</li>
          <li>Secure routings and transit stability</li>
          <li>Customs and terminal coordination</li>
          <li>Door‑to‑door with first/last mile</li>
        </ul>
      </section>

      <section className="rounded-xl border border-neutral-200/70 dark:border-neutral-800/70 p-6 bg-neutral-50 dark:bg-neutral-950">
        <h3 className="font-medium">Optimize with rail</h3>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Lower emissions and predictable lead times.</p>
        <div className="mt-3 flex gap-3">
          <Link href="/contact" className="px-4 py-2 rounded-md bg-[var(--brand-bg)] text-[var(--brand-fg)]">Contact Us</Link>
          <Link href="/tracking" className="px-4 py-2 rounded-md border border-[var(--brand-primary-600)]">Track Shipment</Link>
        </div>
      </section>
      </div>
    </main>
  );
}
