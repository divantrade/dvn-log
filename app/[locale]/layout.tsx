import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, isRTL, type Locale } from '@/i18n/config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Providers from '@/components/Providers';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  const rtl = isRTL(locale as Locale);

  return (
    <div dir={rtl ? 'rtl' : 'ltr'} className={rtl ? 'font-arabic' : ''}>
      <NextIntlClientProvider messages={messages}>
        <Providers>
          <Header />
          <main className="pt-16 md:pt-24">
            {children}
          </main>
          <Footer />
        </Providers>
      </NextIntlClientProvider>
    </div>
  );
}
