'use client';

import { useTranslations } from 'next-intl';

export default function AboutLeadership() {
  const t = useTranslations('aboutPage.leadership');

  const leaderKeys = ['ceo', 'coo', 'compliance'] as const;

  const gradients = [
    'from-indigo-500 to-violet-500',
    'from-blue-500 to-cyan-500',
    'from-emerald-500 to-teal-500',
  ];

  return (
    <section>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{t('title')}</h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {leaderKeys.map((key, index) => (
          <div
            key={index}
            className="card-hover bg-white dark:bg-slate-800/60 rounded-2xl p-8 border border-slate-200/80 dark:border-slate-700/50 text-center"
          >
            {/* Avatar */}
            <div className={`w-20 h-20 bg-gradient-to-br ${gradients[index]} rounded-2xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-6 shadow-lg`}>
              {t(`members.${key}.initials`)}
            </div>

            {/* Name & Title */}
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
              {t(`members.${key}.name`)}
            </h3>
            <p className="text-indigo-600 dark:text-indigo-400 font-medium text-sm mb-4">
              {t(`members.${key}.title`)}
            </p>

            {/* Bio */}
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
              {t(`members.${key}.bio`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
