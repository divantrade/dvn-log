'use client';

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import PageHero from "../../_components/PageHero";
import NavHeightObserver from "../../_components/NavHeightObserver";
import TruckImg from "@/images/full-shot-man-walking-by-trucks-fleet.jpg";

export default function RoadTransportPage() {
  const t = useTranslations('servicesPage.roadTransport');
  const tCommon = useTranslations('servicesPage.common');
  const tBreadcrumb = useTranslations('servicesPage');

  return (
    <main className="px-0 bg-white dark:bg-slate-900">
      <NavHeightObserver />
      <PageHero
        title={t('title')}
        subtitle={t('heroSubtitle')}
        image={TruckImg}
        imageAlt="Truck fleet on the road"
      />

      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Breadcrumb */}
        <nav className="text-sm text-slate-600 dark:text-slate-400 mb-12" aria-label="Breadcrumb">
          <Link href="/services" className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {tBreadcrumb('breadcrumb')}
          </Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span className="text-slate-900 dark:text-white font-medium">{t('title')}</span>
        </nav>

        {/* Main Content Layout */}
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 items-center">

          {/* Left: Primary Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
              <Image
                src={TruckImg}
                alt="Professional road transport services"
                width={700}
                height={600}
                className="object-cover w-full h-[600px] transition-transform duration-700 group-hover:scale-105"
                priority={true}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
            </div>
          </div>

          {/* Right: Content */}
          <div className="text-right space-y-6 rtl:text-left">

            {/* Prominent Quote Box */}
            <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl text-blue-200 mb-4">"</div>
              <blockquote className="text-xl font-medium leading-relaxed mb-4">
                {t('quote')}
              </blockquote>
              <div className="text-blue-200 text-sm font-medium">— {t('quoteAuthor')}</div>
            </div>

            {/* Grouped Text Content */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3 leading-tight">
                {t('mainTitle')}
              </h1>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {t('description')}
              </p>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{tCommon('serviceOptions')}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-end rtl:justify-start items-center">
                    <span className="text-slate-600 dark:text-slate-300">{t('serviceOptions.ftl.title')}</span>
                    <div className="w-3 h-3 bg-blue-500 rounded-full ms-3"></div>
                  </div>
                  <div className="flex justify-end rtl:justify-start items-center">
                    <span className="text-slate-600 dark:text-slate-300">{t('serviceOptions.ltl.title')}</span>
                    <div className="w-3 h-3 bg-green-500 rounded-full ms-3"></div>
                  </div>
                  <div className="flex justify-end rtl:justify-start items-center">
                    <span className="text-slate-600 dark:text-slate-300">{t('serviceOptions.crossBorder.title')}</span>
                    <div className="w-3 h-3 bg-orange-500 rounded-full ms-3"></div>
                  </div>
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center w-full mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
              >
                {tCommon('getQuote')}
                <svg className="w-4 h-4 ms-2 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
