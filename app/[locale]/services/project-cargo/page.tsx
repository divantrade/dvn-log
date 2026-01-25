'use client';

import { useTranslations } from 'next-intl';
import NavHeightObserver from "../../_components/NavHeightObserver";
import PageHero from "../../_components/PageHero";
import ServicePageLayout from "../_components/ServicePageLayout";
import ProjectImg from "@/images/718.jpg";

export default function ProjectCargoPage() {
  const t = useTranslations('servicesPage.projectCargo');

  const serviceOptions = [
    { title: t('serviceOptions.heavyLift.title'), desc: t('serviceOptions.heavyLift.desc') },
    { title: t('serviceOptions.routePlanning.title'), desc: t('serviceOptions.routePlanning.desc') },
    { title: t('serviceOptions.regulatory.title'), desc: t('serviceOptions.regulatory.desc') }
  ];

  const additionalCapabilities = [
    { title: t('additionalCapabilities.engineering.title'), desc: t('additionalCapabilities.engineering.desc') },
    { title: t('additionalCapabilities.site.title'), desc: t('additionalCapabilities.site.desc') },
    { title: t('additionalCapabilities.equipment.title'), desc: t('additionalCapabilities.equipment.desc') },
    { title: t('additionalCapabilities.risk.title'), desc: t('additionalCapabilities.risk.desc') }
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
        image={ProjectImg}
        imageAlt="Heavy project cargo operations"
      />
      <ServicePageLayout
        serviceName={t('title')}
        heroImage={ProjectImg}
        heroImageAlt="Professional project cargo services"
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
