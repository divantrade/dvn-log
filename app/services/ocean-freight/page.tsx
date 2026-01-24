import Link from "next/link";
import Image from "next/image";
import NavHeightObserver from "../../_components/NavHeightObserver";
import ShipImg from "@/images/aerial-view-container-cargo-ship-sea.jpg";

export default function OceanFreightPage() {
  return (
    <main className="px-0 bg-white dark:bg-slate-900">
      <NavHeightObserver />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-6 pt-10">
        <nav className="text-sm text-slate-600 dark:text-slate-400" aria-label="Breadcrumb">
          <Link href="/services" className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Services
          </Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span className="text-slate-900 dark:text-white font-medium">Ocean Freight</span>
        </nav>
      </div>

      {/* Split "hero" like Road Transport */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          {/* LEFT — image (sticky like road page) */}
          <div className="relative">
            <div className="sticky top-8">
              <div className="relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-slate-200 dark:ring-slate-700">
                <Image
                  src={ShipImg}
                  alt="Container ship at sea"
                  priority
                  className="h-[420px] w-full object-cover transition-transform duration-700"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />
              </div>

              {/* Quote block under image (same place/feel as road) */}
              <div className="mt-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-semibold">Get a tailored quotation</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Share lanes and volumes — we'll propose a simple, clear plan.</p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-white font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Get a Quote
                    </Link>
                    <Link
                      href="/services"
                      className="inline-flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-600 px-4 py-2.5 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      Explore Services
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — concise copy + bullets (mirrors road) */}
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-400">
              Ocean Freight
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Move by sea with clarity and control
            </h1>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Reliable FCL/LCL on core trade lanes with documented processes and
              straightforward handoffs. We keep paperwork simple and milestones visible so
              your cargo keeps moving—without overselling.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Door-to-door delivery & port handling",
                "FCL and LCL options across major lanes",
                "Reefer & special equipment (OT/FR/ISO)",
                "Customs paperwork & documentation",
                "Space & schedule optimization",
                "Milestone visibility & support",
              ].map((txt) => (
                <div key={txt} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <span className="text-slate-800 dark:text-slate-200">{txt}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 transition-colors"
              >
                Get a Quote
              </Link>
              <Link
                href="/tracking"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-600 px-5 py-3 font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                Track Container
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service Options — same 3-card pattern as road page */}
      <section className="mx-auto max-w-7xl px-6 pb-4">
        <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">Service Options</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Full Container Load (FCL)",
              desc:
                "Dedicated boxes for direct routes and predictable schedules—fewer handoffs, more control.",
            },
            {
              title: "Less than Container Load (LCL)",
              desc:
                "Shared capacity for smaller consignments with regular cut-offs and consolidated handling.",
            },
            {
              title: "Special Equipment",
              desc:
                "Reefer, open-top, flat-rack, and ISO tank with route checks and handling guidance.",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-3 h-2 w-8 rounded-full bg-blue-600/80" />
              <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">{c.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Additional capabilities — mirrors road "extra" section */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">Additional capabilities</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {[
            {
              k: "Port drayage & deconsolidation",
              d: "Smooth first/last-mile moves with clear handoffs to road/rail.",
            },
            {
              k: "Exception handling",
              d: "Early signals for rollovers, docs, and inspections with clear actions.",
            },
            {
              k: "Dangerous goods (on request)",
              d: "Route and line review with documentation guidance where applicable.",
            },
            {
              k: "Reporting",
              d: "Simple milestone tracking and on-request status summaries.",
            },
          ].map((f) => (
            <div key={f.k} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5">
              <div className="mb-2 flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-blue-600" />
                <h3 className="font-semibold text-slate-900 dark:text-white">{f.k}</h3>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-400">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA band — same tone */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-2xl bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] p-8 text-white">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-2xl font-bold">Planning an ocean shipment?</h3>
              <p className="mt-1 text-white/85">
                Share origin, destination, and estimated volumes — we'll outline a clear plan.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 font-semibold text-blue-700 hover:bg-blue-50 transition-colors"
              >
                Request Quote
              </Link>
              <Link
                href="/tracking"
                className="inline-flex items-center justify-center rounded-lg border border-white/70 px-5 py-3 font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Track Container
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
