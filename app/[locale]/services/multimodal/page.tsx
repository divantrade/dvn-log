'use client';

import { useTranslations } from 'next-intl';
import NavHeightObserver from "../../_components/NavHeightObserver";
import PageHero from "../../_components/PageHero";
import ServicePageLayout from "../_components/ServicePageLayout";
import MultimodalImg from "@/images/aerial-view-container-cargo-ship-sea.jpg";

export default function MultimodalPage() {
  const t = useTranslations('servicesPage.multimodal');

  const serviceOptions = [
    { title: t('serviceOptions.oceanRoad.title'), desc: t('serviceOptions.oceanRoad.desc') },
    { title: t('serviceOptions.railRoad.title'), desc: t('serviceOptions.railRoad.desc') },
    { title: t('serviceOptions.airRoad.title'), desc: t('serviceOptions.airRoad.desc') }
  ];

  const additionalCapabilities = [
    { title: t('additionalCapabilities.route.title'), desc: t('additionalCapabilities.route.desc') },
    { title: t('additionalCapabilities.singleWindow.title'), desc: t('additionalCapabilities.singleWindow.desc') },
    { title: t('additionalCapabilities.handover.title'), desc: t('additionalCapabilities.handover.desc') },
    { title: t('additionalCapabilities.visibility.title'), desc: t('additionalCapabilities.visibility.desc') }
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
        image={MultimodalImg}
        imageAlt="Multimodal transport operations"
      />
      <ServicePageLayout
        serviceName={t('title')}
        heroImage={MultimodalImg}
        heroImageAlt="Professional multimodal transport services"
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
