'use client';

import { useTranslations } from 'next-intl';

export default function AboutProcess() {
  const t = useTranslations('aboutPage.process');

  const steps = [
    {
      number: "01",
      key: "step1",
      gradient: 'from-blue-500 to-cyan-500',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      number: "02",
      key: "step2",
      gradient: 'from-indigo-500 to-purple-500',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      number: "03",
      key: "step3",
      gradient: 'from-emerald-500 to-teal-500',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
        </svg>
      )
    },
    {
      number: "04",
      key: "step4",
      gradient: 'from-amber-500 to-orange-500',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      number: "05",
      key: "step5",
      gradient: 'from-violet-500 to-fuchsia-500',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      )
    }
  ];

  return (
    <section>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{t('title')}</h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className="relative">
        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`w-14 h-14 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center text-white font-bold text-lg mb-3 shadow-lg`}>
                    {step.number}
                  </div>
                  <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3 border border-slate-200 dark:border-slate-700">
                    {step.icon}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-px bg-gradient-to-r from-indigo-300 to-transparent dark:from-indigo-600 mx-4"></div>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-5 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                  {t(`${step.key}.title`)}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  {t(`${step.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Timeline */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className={`w-12 h-12 bg-gradient-to-br ${step.gradient} rounded-xl flex items-center justify-center text-white font-bold shadow-lg`}>
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-px h-12 bg-gradient-to-b from-indigo-300 to-transparent dark:from-indigo-600 mx-auto mt-3"></div>
                )}
              </div>
              <div className="flex-1 pt-1">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400 me-3 border border-slate-200 dark:border-slate-700">
                    {step.icon}
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    {t(`${step.key}.title`)}
                  </h3>
                </div>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                  {t(`${step.key}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
