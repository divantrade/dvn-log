'use client';

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import NavHeightObserver from "../../_components/NavHeightObserver";
import ShipImg from "@/images/aerial-view-container-cargo-ship-sea.jpg";

export default function OceanFreightPage() {
  const t = useTranslations('servicesPage.oceanFreight');
  const tCommon = useTranslations('servicesPage.common');
  const tBreadcrumb = useTranslations('servicesPage');

  const features = [
    t('features.f1'),
    t('features.f2'),
    t('features.f3'),
    t('features.f4'),
    t('features.f5'),
    t('features.f6'),
  ];

  const serviceOptions = [
    { title: t('serviceOptions.fcl.title'), desc: t('serviceOptions.fcl.desc') },
    { title: t('serviceOptions.lcl.title'), desc: t('serviceOptions.lcl.desc') },
    { title: t('serviceOptions.special.title'), desc: t('serviceOptions.special.desc') },
  ];

  const additionalCapabilities = [
    { title: t('additionalCapabilities.drayage.title'), desc: t('additionalCapabilities.drayage.desc') },
    { title: t('additionalCapabilities.exception.title'), desc: t('additionalCapabilities.exception.desc') },
    { title: t('additionalCapabilities.dg.title'), desc: t('additionalCapabilities.dg.desc') },
    { title: t('additionalCapabilities.reporting.title'), desc: t('additionalCapabilities.reporting.desc') },
  ];

  return (
    <main className="px-0 bg-white dark:bg-slate-900">
      <NavHeightObserver />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-6 pt-10">
        <nav className="text-sm text-slate-600 dark:text-slate-400" aria-label="Breadcrumb">
          <Link href="/services" className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {tBreadcrumb('breadcrumb')}
          </Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span className="text-slate-900 dark:text-white font-medium">{t('title')}</span>
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
                    <h4 className="text-slate-900 dark:text-white font-semibold">{tCommon('getTailoredQuote')}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{tCommon('shareLanesVolumes')}</p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-white font-semibold hover:bg-blue-700 transition-colors"
                    >
                      {tCommon('getQuote')}
                    </Link>
                    <Link
                      href="/services"
                      className="inline-flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-600 px-4 py-2.5 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      {tCommon('exploreServices')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — concise copy + bullets (mirrors road) */}
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-400">
              {t('category')}
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              {t('mainTitle')}
            </h1>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              {t('description')}
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((txt) => (
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
                {tCommon('getQuote')}
              </Link>
              <Link
                href="/tracking"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-600 px-5 py-3 font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                {tCommon('trackContainer')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service Options — same 3-card pattern as road page */}
      <section className="mx-auto max-w-7xl px-6 pb-4">
        <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">{tCommon('serviceOptions')}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {serviceOptions.map((c) => (
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
        <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">{tCommon('additionalCapabilities')}</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {additionalCapabilities.map((f) => (
            <div key={f.title} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5">
              <div className="mb-2 flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-blue-600" />
                <h3 className="font-semibold text-slate-900 dark:text-white">{f.title}</h3>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA band — same tone */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-2xl bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] p-8 text-white">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-2xl font-bold">{t('cta.title')}</h3>
              <p className="mt-1 text-white/85">
                {t('cta.description')}
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 font-semibold text-blue-700 hover:bg-blue-50 transition-colors"
              >
                {tCommon('requestQuote')}
              </Link>
              <Link
                href="/tracking"
                className="inline-flex items-center justify-center rounded-lg border border-white/70 px-5 py-3 font-semibold text-white hover:bg-white/10 transition-colors"
              >
                {tCommon('trackContainer')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
