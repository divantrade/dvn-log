import Link from 'next/link';
import Image from 'next/image';
import { StaticImageData } from 'next/image';

interface ServiceOption {
  title: string;
  desc: string;
}

interface AdditionalCapability {
  title: string;
  desc: string;
}

interface ServicePageLayoutProps {
  // Breadcrumb
  serviceName: string;
  
  // Hero image section
  heroImage: StaticImageData;
  heroImageAlt: string;
  
  // Main content
  serviceCategory: string;
  title: string;
  description: string;
  features: string[];
  
  // Service options (3-card grid)
  serviceOptions: ServiceOption[];
  
  // Additional capabilities (2-column grid)
  additionalCapabilities: AdditionalCapability[];
  
  // Bottom CTA
  ctaTitle: string;
  ctaDescription: string;
}

export default function ServicePageLayout({
  serviceName,
  heroImage,
  heroImageAlt,
  serviceCategory,
  title,
  description,
  features,
  serviceOptions,
  additionalCapabilities,
  ctaTitle,
  ctaDescription,
}: ServicePageLayoutProps) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 space-y-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-600 mb-8" aria-label="Breadcrumb">
        <Link href="/services" className="hover:underline hover:text-blue-600 transition-colors">
          Services
        </Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="text-slate-900 font-medium">{serviceName}</span>
      </nav>

      {/* Split "hero" like Road Transport */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          {/* LEFT — image (sticky like road page) */}
          <div className="relative">
            <div className="sticky top-8">
              <div className="relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-slate-200">
                <Image
                  src={heroImage}
                  alt={heroImageAlt}
                  priority
                  className="h-[420px] w-full object-cover transition-transform duration-700"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />
              </div>

              {/* Quote block under image (same place/feel as road) */}
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">Get a tailored quotation</h3>
                    <p className="text-sm text-slate-600">Share lanes and volumes — we'll propose a simple, clear plan.</p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 font-semibold text-blue-700 hover:bg-blue-50"
                    >
                      Request Quote
                    </Link>
                    <Link
                      href="/tracking"
                      className="inline-flex items-center justify-center rounded-lg border border-white/70 px-5 py-3 font-semibold hover:bg-white/10"
                    >
                      Track Container
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — concise copy + bullets (mirrors road) */}
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700/80">
              {serviceCategory}
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {title}
            </h1>
            <p className="text-slate-700 leading-relaxed">
              {description}
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((txt) => (
                <div key={txt} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-700">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <span className="text-slate-800">{txt}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Get a Quote
              </Link>
              <Link
                href="/tracking"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-800 hover:bg-slate-50"
              >
                Track Container
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service Options — same 3-card pattern as road page */}
      <section className="mx-auto max-w-7xl px-6 pb-4">
        <h2 className="mb-6 text-xl font-bold text-slate-900">Service Options</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {serviceOptions.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-3 h-2 w-8 rounded-full bg-blue-600/80" />
              <h3 className="mb-2 text-lg font-semibold text-slate-900">{c.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Additional capabilities — mirrors road "extra" section */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <h2 className="mb-6 text-xl font-bold text-slate-900">Additional capabilities</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {additionalCapabilities.map((capability) => (
            <div
              key={capability.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-3 h-2 w-8 rounded-full bg-slate-400/60" />
              <h3 className="mb-2 text-lg font-semibold text-slate-900">{capability.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{capability.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA band — same tone */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-2xl bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] p-8 text-white">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-bold">{ctaTitle}</h2>
              <p className="mt-2 text-blue-100">{ctaDescription}</p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 font-semibold text-blue-700 hover:bg-blue-50"
              >
                Request Quote
              </Link>
              <Link
                href="/tracking"
                className="inline-flex items-center justify-center rounded-lg border border-white/70 px-5 py-3 font-semibold hover:bg-white/10"
              >
                Track Container
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
