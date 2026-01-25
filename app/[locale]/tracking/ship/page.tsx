"use client";
import { useState } from "react";
import { useTranslations } from 'next-intl';
import { ShipSearchForm } from "@/components/tracking/ShipSearchForm";
import { ShipResultCard } from "@/components/tracking/ShipResultCard";
import { MapPlaceholder } from "@/components/tracking/MapPlaceholder";
import type { ShipTracking } from "@/lib/tracking/types";

export default function ShipTrackingPage() {
  const t = useTranslations('tracking');
  const [data, setData] = useState<ShipTracking | null>(null);
  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">{t('shipTracking')}</h1>
      <ShipSearchForm onResult={setData} />
      {data && (
        <section className="space-y-4">
          <ShipResultCard data={data} />
          <MapPlaceholder note={`${t('mapComingSoon')} — ${t('showPosition')}.`} />
        </section>
      )}
    </main>
  );
}
