'use client';

import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import NavHeightObserver from '../_components/NavHeightObserver';

export default function TrackingPage() {
  const t = useTranslations('tracking');
  const [trackingType, setTrackingType] = useState<'container' | 'ship'>('container');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [trackingResult, setTrackingResult] = useState<any>(null);

  const handleTrack = async () => {
    if (!trackingNumber.trim()) return;

    setIsTracking(true);
    // Simulate API call
    setTimeout(() => {
      setTrackingResult({
        id: trackingNumber,
        type: trackingType,
        status: t('inTransit'),
        location: 'Mediterranean Sea',
        coordinates: { lat: 35.8617, lng: 14.3754 },
        vessel: trackingType === 'container' ? 'MSC OSCAR' : trackingNumber,
        eta: '2025-09-02T14:30:00Z',
        lastUpdate: new Date().toISOString(),
        route: [
          { port: 'Shanghai', date: '2025-08-20', status: t('departed') },
          { port: 'Singapore', date: '2025-08-25', status: t('transited') },
          { port: 'Suez Canal', date: '2025-08-28', status: t('transited') },
          { port: 'Rotterdam', date: '2025-09-02', status: t('expected') }
        ]
      });
      setIsTracking(false);
    }, 2000);
  };

  const satelliteProviders = [
    {
      name: 'MarineTraffic',
      url: `https://www.marinetraffic.com/en/ais/home/centerx:14.3754/centery:35.8617/zoom:10`,
      description: 'Real-time vessel positions via AIS'
    },
    {
      name: 'VesselFinder',
      url: `https://www.vesselfinder.com/`,
      description: 'Global ship tracking and maritime data'
    },
    {
      name: 'FleetMon',
      url: `https://www.fleetmon.com/`,
      description: 'Professional vessel tracking'
    }
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0f1a]">
      <NavHeightObserver />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 text-white py-20 -mt-16 md:-mt-24 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 right-1/4 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-56 h-56 bg-white rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10 pt-16 md:pt-24">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-md px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-white/90 mb-4">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span></span>
              Live Tracking
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              {t('title')}
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto font-light">
              {t('subtitle')}
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-[#0a0f1a]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* Tracking Form */}
        <div className="bg-white dark:bg-slate-800/60 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-700/50 p-8 mb-12">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              {t('enterInfo')}
            </h2>

            {/* Tracking Type Selector */}
            <div className="flex bg-slate-100 dark:bg-slate-700/60 rounded-xl p-1 mb-6">
              <button
                onClick={() => setTrackingType('container')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  trackingType === 'container'
                    ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-gray-500 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <span>{t('containerNumber')}</span>
                </div>
              </button>
              <button
                onClick={() => setTrackingType('ship')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  trackingType === 'ship'
                    ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-gray-500 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                  <span>{t('shipName')}</span>
                </div>
              </button>
            </div>

            {/* Input Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {trackingType === 'container' ? t('containerNumber') : t('shipName')}
              </label>
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder={trackingType === 'container' ? t('containerPlaceholder') : t('shipPlaceholder')}
                className="w-full px-4 py-3 border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-lg"
              />
            </div>

            {/* Track Button */}
            <button
              onClick={handleTrack}
              disabled={!trackingNumber.trim() || isTracking}
              className="w-full text-white py-4 px-6 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 hover:scale-[1.01] hover:shadow-lg active:scale-[0.99]"
              style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}
            >
              {isTracking ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{t('tracking')}</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>{t('trackButton')}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tracking Results */}
        {trackingResult && (
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Status Card */}
            <div className="card-hover bg-white dark:bg-slate-800/60 rounded-2xl shadow-lg border border-slate-200/80 dark:border-slate-700/50 p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('shipmentStatus')}</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">{t('status')}:</span>
                  <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 rounded-full text-sm font-medium">
                    {trackingResult.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">{t('currentLocation')}:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{trackingResult.location}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">{t('vessel')}:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{trackingResult.vessel}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">{t('eta')}:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {new Date(trackingResult.eta).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="card-hover bg-white dark:bg-slate-800/60 rounded-2xl shadow-lg border border-slate-200/80 dark:border-slate-700/50 p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('liveLocation')}</h3>
              <div className="bg-gradient-to-br from-indigo-100 to-violet-200 dark:from-indigo-900/30 dark:to-violet-800/30 rounded-xl h-64 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-indigo-800 dark:text-indigo-300 font-medium">{t('interactiveMap')}</p>
                  <p className="text-indigo-600 dark:text-indigo-400 text-sm">Lat: {trackingResult.coordinates.lat}</p>
                  <p className="text-indigo-600 dark:text-indigo-400 text-sm">Lng: {trackingResult.coordinates.lng}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Route Timeline */}
        {trackingResult && (
          <div className="bg-white dark:bg-slate-800/60 rounded-2xl shadow-lg border border-slate-200/80 dark:border-slate-700/50 p-6 mb-12">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t('routeTimeline')}</h3>
            <div className="space-y-4">
              {trackingResult.route.map((stop: any, index: number) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`w-4 h-4 rounded-full ring-4 ${
                    stop.status === t('departed') || stop.status === t('transited')
                      ? 'bg-emerald-500 ring-emerald-500/20'
                      : stop.status === t('expected')
                        ? 'bg-indigo-500 ring-indigo-500/20'
                        : 'bg-slate-300 dark:bg-slate-600 ring-slate-300/20'
                  }`}></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900 dark:text-white">{stop.port}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{stop.date}</span>
                    </div>
                    <span className={`text-sm ${
                      stop.status === t('departed') || stop.status === t('transited')
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : stop.status === t('expected')
                          ? 'text-indigo-600 dark:text-indigo-400'
                          : 'text-gray-500 dark:text-gray-500'
                    }`}>
                      {stop.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Satellite Tracking Resources */}
        <div className="bg-white dark:bg-slate-800/60 rounded-2xl shadow-lg border border-slate-200/80 dark:border-slate-700/50 p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            {t('satelliteResources')}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {satelliteProviders.map((provider, index) => (
              <a
                key={index}
                href={provider.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group card-hover p-5 border border-slate-200/80 dark:border-slate-700/50 rounded-2xl hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {provider.name}
                  </h4>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{provider.description}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
