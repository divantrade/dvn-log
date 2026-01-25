'use client';

import { useTranslations } from 'next-intl';

export default function AboutValues() {
  const t = useTranslations('aboutPage');

  const valueKeys = ['tracking', 'compliance', 'network', 'exception', 'speed', 'insights'] as const;

  const icons = {
    tracking: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    compliance: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    network: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    exception: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    speed: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    insights: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  };

  return (
    <section className="py-16">
      {/* Who we are */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t('whoWeAre.title')}</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl">
          {t('whoWeAre.description')}
        </p>
        <ul className="mt-8 space-y-3 text-gray-700 dark:text-gray-300">
          <li className="flex items-start">
            <span className="text-[#1e40af] dark:text-blue-400 me-3 rtl:me-0 rtl:ms-3">•</span>
            <span>{t('whoWeAre.bullet1')}</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#1e40af] dark:text-blue-400 me-3 rtl:me-0 rtl:ms-3">•</span>
            <span>{t('whoWeAre.bullet2')}</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#1e40af] dark:text-blue-400 me-3 rtl:me-0 rtl:ms-3">•</span>
            <span>{t('whoWeAre.bullet3')}</span>
          </li>
        </ul>
      </div>

      {/* What sets us apart */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">{t('values.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {valueKeys.map((key) => (
            <div
              key={key}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-slate-700"
            >
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#1e40af]/10 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-[#1e40af] dark:text-blue-400">
                  {icons[key]}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t(`values.${key}.title`)}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t(`values.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
