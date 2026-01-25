"use client";
import { useState } from "react";
import { useTranslations } from 'next-intl';
import { ContainerSearchForm } from "@/components/tracking/ContainerSearchForm";
import { ContainerResultTimeline } from "@/components/tracking/ContainerResultTimeline";
import { MapPlaceholder } from "@/components/tracking/MapPlaceholder";
import type { ContainerTracking } from "@/lib/tracking/types";

export default function ContainerTrackingPage() {
  const t = useTranslations('tracking');
  const [data, setData] = useState<ContainerTracking | null>(null);
  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">{t('containerTracking')}</h1>
      <ContainerSearchForm onResult={setData} />
      {data && (
        <section className="space-y-4">
          <ContainerResultTimeline data={data} />
          <MapPlaceholder note={`${t('mapComingSoon')} — ${t('showRoute')}.`} />
        </section>
      )}
    </main>
  );
}
