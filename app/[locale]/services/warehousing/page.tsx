'use client';

import { useTranslations } from 'next-intl';
import NavHeightObserver from "../../_components/NavHeightObserver";
import PageHero from "../../_components/PageHero";
import ServicePageLayout from "../_components/ServicePageLayout";
import WarehouseImg from "@/images/distribution-warehouse-interior-with-workers-wearing-hardhats-reflective-jackets-walking-storage-area.jpg";

export default function WarehousingPage() {
  const t = useTranslations('servicesPage.warehousing');

  const serviceOptions = [
    { title: t('serviceOptions.storage.title'), desc: t('serviceOptions.storage.desc') },
    { title: t('serviceOptions.pickPack.title'), desc: t('serviceOptions.pickPack.desc') },
    { title: t('serviceOptions.crossDock.title'), desc: t('serviceOptions.crossDock.desc') }
  ];

  const additionalCapabilities = [
    { title: t('additionalCapabilities.specialized.title'), desc: t('additionalCapabilities.specialized.desc') },
    { title: t('additionalCapabilities.valueAdded.title'), desc: t('additionalCapabilities.valueAdded.desc') },
    { title: t('additionalCapabilities.inventory.title'), desc: t('additionalCapabilities.inventory.desc') },
    { title: t('additionalCapabilities.locations.title'), desc: t('additionalCapabilities.locations.desc') }
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
        image={WarehouseImg}
        imageAlt="Distribution warehouse interior"
      />
      <ServicePageLayout
        serviceName={t('title')}
        heroImage={WarehouseImg}
        heroImageAlt="Professional warehousing services"
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
