'use client';

import { useTranslations } from 'next-intl';
import NavHeightObserver from "../../_components/NavHeightObserver";
import PageHero from "../../_components/PageHero";
import ServicePageLayout from "../_components/ServicePageLayout";
import TrainImg from "@/images/close-up-train-with-containers.jpg";

export default function RailFreightPage() {
  const t = useTranslations('servicesPage.railFreight');

  const serviceOptions = [
    { title: t('serviceOptions.block.title'), desc: t('serviceOptions.block.desc') },
    { title: t('serviceOptions.intermodal.title'), desc: t('serviceOptions.intermodal.desc') },
    { title: t('serviceOptions.crossBorder.title'), desc: t('serviceOptions.crossBorder.desc') }
  ];

  const additionalCapabilities = [
    { title: t('additionalCapabilities.sustainable.title'), desc: t('additionalCapabilities.sustainable.desc') },
    { title: t('additionalCapabilities.terminal.title'), desc: t('additionalCapabilities.terminal.desc') },
    { title: t('additionalCapabilities.route.title'), desc: t('additionalCapabilities.route.desc') },
    { title: t('additionalCapabilities.equipment.title'), desc: t('additionalCapabilities.equipment.desc') }
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
        image={TrainImg}
        imageAlt="Freight train with containers"
      />
      <ServicePageLayout
        serviceName={t('title')}
        heroImage={TrainImg}
        heroImageAlt="Professional rail freight services"
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
