'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function AboutCTA() {
  const t = useTranslations('aboutPage.cta');

  return (
    <section className="py-16 bg-gradient-to-r from-[#1e40af] to-[#1e3a8a] rounded-2xl text-white">
      <div className="text-center max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          {t('title')}
        </h2>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#1e40af] font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1e40af] min-w-[180px] min-h-[44px]"
          >
            {t('getQuote')}
          </Link>
          <Link
            href="/tracking"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#1e40af] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1e40af] min-w-[180px] min-h-[44px]"
          >
            {t('trackShipment')}
          </Link>
        </div>

        <div className="mt-8 pt-8 border-t border-white/20">
          <p className="text-white/80 text-sm">
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
