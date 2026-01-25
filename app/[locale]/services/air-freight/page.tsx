'use client';

import { useTranslations } from 'next-intl';
import NavHeightObserver from "../../_components/NavHeightObserver";
import PageHero from "../../_components/PageHero";
import ServicePageLayout from "../_components/ServicePageLayout";
import AirImg from "@/images/plane-airport-sunset.jpg";

export default function AirFreightPage() {
  const t = useTranslations('servicesPage.airFreight');

  const serviceOptions = [
    { title: t('serviceOptions.express.title'), desc: t('serviceOptions.express.desc') },
    { title: t('serviceOptions.economy.title'), desc: t('serviceOptions.economy.desc') },
    { title: t('serviceOptions.dg.title'), desc: t('serviceOptions.dg.desc') }
  ];

  const additionalCapabilities = [
    { title: t('additionalCapabilities.tempControl.title'), desc: t('additionalCapabilities.tempControl.desc') },
    { title: t('additionalCapabilities.specialized.title'), desc: t('additionalCapabilities.specialized.desc') },
    { title: t('additionalCapabilities.network.title'), desc: t('additionalCapabilities.network.desc') },
    { title: t('additionalCapabilities.tracking.title'), desc: t('additionalCapabilities.tracking.desc') }
  ];

  const features = [
    t('features.f1'),
    t('features.f2'),
    t('features.f3'),
    t('features.f4'),
    t('features.f5'),
    t('features.f6')
  ];

  return (
    <main className="px-0">
      <NavHeightObserver />
      <PageHero
        title={t('title')}
        subtitle={t('heroSubtitle')}
        image={AirImg}
        imageAlt="Airplane at airport"
      />
      <ServicePageLayout
        serviceName={t('title')}
        heroImage={AirImg}
        heroImageAlt="Professional air freight services"
        serviceCategory={t('category')}
        title={t('mainTitle')}
        description={t('description')}
        features={features}
        serviceOptions={serviceOptions}
        additionalCapabilities={additionalCapabilities}
        ctaTitle={t('cta.title')}
        ctaDescription={t('cta.description')}
      />
    </main>
  );
}
