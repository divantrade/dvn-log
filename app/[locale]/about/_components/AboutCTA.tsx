'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function AboutCTA() {
  const t = useTranslations('aboutPage.cta');

  return (
    <section className="cta-modern rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 text-white py-14 px-6 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl" />
      </div>

      <div className="text-center max-w-4xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {t('title')}
        </h2>
        <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto font-light">
          {t('subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-white/90 transition-all duration-300 hover:shadow-xl hover:scale-105 min-w-[180px]"
          >
            {t('getQuote')}
          </Link>
          <Link
            href="/tracking"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 min-w-[180px]"
          >
            {t('trackShipment')}
          </Link>
        </div>

        <div className="mt-8 pt-8 border-t border-white/20">
          <p className="text-white/70 text-sm">
            {t('contact')}{" "}
            <a href="tel:+905010644068" className="text-white font-semibold hover:underline">
              +90 501 064 40 68
            </a>{" "}
            {t('orEmail')}{" "}
            <a href="mailto:info@dvnlog.com" className="text-white font-semibold hover:underline">
              info@dvnlog.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
