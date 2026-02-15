'use client';

import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import { useTranslations } from 'next-intl';

interface ServiceOption {
  title: string;
  desc: string;
}

interface AdditionalCapability {
  title: string;
  desc: string;
}

interface ServicePageLayoutProps {
  serviceName: string;
  heroImage: StaticImageData;
  heroImageAlt: string;
  serviceCategory: string;
  title: string;
  description: string;
  features: string[];
  serviceOptions: ServiceOption[];
  additionalCapabilities: AdditionalCapability[];
  ctaTitle: string;
  ctaDescription: string;
}

export default function ServicePageLayout({
  serviceName, heroImage, heroImageAlt, serviceCategory, title, description, features, serviceOptions, additionalCapabilities, ctaTitle, ctaDescription,
}: ServicePageLayoutProps) {
  const t = useTranslations('servicesPage');

  return (
    <div className="mx-auto max-w-7xl px-6 py-14 space-y-12 bg-white dark:bg-[#0a0f1a]">
      <nav className="text-sm text-slate-600 dark:text-slate-400 mb-8" aria-label="Breadcrumb">
        <Link href="/services" className="hover:underline hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{t('breadcrumb')}</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="text-slate-900 dark:text-white font-medium">{serviceName}</span>
      </nav>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div className="relative">
            <div className="sticky top-8">
              <div className="relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-slate-200/50 dark:ring-slate-700/50">
                <Image src={heroImage} alt={heroImageAlt} priority className="h-[420px] w-full object-cover transition-transform duration-700" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />
              </div>
              <div className="mt-6 rounded-2xl border border-slate-200/80 dark:border-slate-700/50 bg-white dark:bg-slate-800/60 p-5 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{t('common.getTailoredQuote')}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('common.shareLanesVolumes')}</p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Link href="/contact" className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>{t('common.getQuote')}</Link>
                    <Link href="/services" className="inline-flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-600 px-4 py-2.5 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">{t('common.exploreServices')}</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em]" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(59, 130, 246, 0.1))', color: '#6366f1' }}>{serviceCategory}</span>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">{title}</h1>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((txt) => (
                <div key={txt} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex-shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                  </span>
                  <span className="text-slate-700 dark:text-slate-200">{txt}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 pt-2">
              <Link href="/contact" className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:scale-105" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>{t('common.getQuote')}</Link>
              <Link href="/tracking" className="inline-flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-600 px-5 py-3 font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">{t('common.trackContainer')}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-4">
        <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">{t('common.serviceOptions')}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {serviceOptions.map((c) => (
            <div key={c.title} className="card-hover rounded-2xl border border-slate-200/80 dark:border-slate-700/50 bg-white dark:bg-slate-800/60 p-6">
              <div className="mb-3 h-2 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
              <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">{c.title}</h3>
              <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">{t('common.additionalCapabilities')}</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {additionalCapabilities.map((capability) => (
            <div key={capability.title} className="rounded-2xl border border-slate-200/80 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/40 p-6">
              <div className="mb-3 h-2 w-8 rounded-full bg-gradient-to-r from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-500" />
              <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">{capability.title}</h3>
              <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">{capability.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-14">
        <div className="cta-modern rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none"><div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full blur-3xl" /></div>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center relative z-10">
            <div>
              <h2 className="text-2xl font-bold">{ctaTitle}</h2>
              <p className="mt-2 text-white/80">{ctaDescription}</p>
            </div>
            <div className="flex gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 font-semibold text-indigo-700 hover:bg-white/90 transition-all duration-300 hover:shadow-xl hover:scale-105">{t('common.requestQuote')}</Link>
              <Link href="/tracking" className="inline-flex items-center justify-center rounded-xl border border-white/30 px-5 py-3 font-semibold text-white hover:bg-white/10 transition-colors">{t('common.trackContainer')}</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
