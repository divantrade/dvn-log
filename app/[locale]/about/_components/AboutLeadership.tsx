'use client';

import { useTranslations } from 'next-intl';

export default function AboutLeadership() {
  const t = useTranslations('aboutPage.leadership');

  const leaderKeys = ['ceo', 'coo', 'compliance'] as const;

  return (
    <section className="py-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t('title')}</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {leaderKeys.map((key, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center"
          >
            {/* Avatar */}
            <div className="w-20 h-20 bg-gradient-to-br from-[#1e40af] to-[#3b82f6] rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">
              {t(`members.${key}.initials`)}
            </div>

            {/* Name & Title */}
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {t(`members.${key}.name`)}
            </h3>
            <p className="text-[#1e40af] dark:text-blue-400 font-medium mb-4">
              {t(`members.${key}.title`)}
            </p>

            {/* Bio */}
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
              {t(`members.${key}.bio`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
