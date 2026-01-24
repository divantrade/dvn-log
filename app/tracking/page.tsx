'use client';

import { useState } from 'react';
import Link from 'next/link';
import NavHeightObserver from '../_components/NavHeightObserver';

export default function TrackingPage() {
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
        status: 'In Transit',
        location: 'Mediterranean Sea',
        coordinates: { lat: 35.8617, lng: 14.3754 },
        vessel: trackingType === 'container' ? 'MSC OSCAR' : trackingNumber,
        eta: '2025-09-02T14:30:00Z',
        lastUpdate: new Date().toISOString(),
        route: [
          { port: 'Shanghai', date: '2025-08-20', status: 'Departed' },
          { port: 'Singapore', date: '2025-08-25', status: 'Transited' },
          { port: 'Suez Canal', date: '2025-08-28', status: 'Transited' },
          { port: 'Rotterdam', date: '2025-09-02', status: 'Expected' }
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
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <NavHeightObserver />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Track Your Shipment
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Real-time tracking with satellite precision. Monitor containers and vessels worldwide with accurate location data.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Tracking Form */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 mb-12">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
              Enter Tracking Information
            </h2>
            
            {/* Tracking Type Selector */}
            <div className="flex bg-slate-100 dark:bg-slate-700 rounded-xl p-1 mb-6">
              <button
                onClick={() => setTrackingType('container')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  trackingType === 'container'
                    ? 'bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <span>Container Number</span>
                </div>
              </button>
              <button
                onClick={() => setTrackingType('ship')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  trackingType === 'ship'
                    ? 'bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                  <span>Ship Name</span>
                </div>
              </button>
            </div>

            {/* Input Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {trackingType === 'container' ? 'Container Number' : 'Ship Name'}
              </label>
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder={trackingType === 'container' ? 'e.g., MSKU1234567' : 'e.g., MSC OSCAR'}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg"
              />
            </div>

            {/* Track Button */}
            <button
              onClick={handleTrack}
              disabled={!trackingNumber.trim() || isTracking}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
            >
              {isTracking ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Tracking...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Track Shipment</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tracking Results */}
        {trackingResult && (
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Status Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Shipment Status</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Status:</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {trackingResult.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Current Location:</span>
                  <span className="font-medium">{trackingResult.location}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Vessel:</span>
                  <span className="font-medium">{trackingResult.vessel}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">ETA:</span>
                  <span className="font-medium">
                    {new Date(trackingResult.eta).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Live Location</h3>
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl h-64 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-12 h-12 text-blue-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-blue-800 font-medium">Interactive Map</p>
                  <p className="text-blue-600 text-sm">Lat: {trackingResult.coordinates.lat}</p>
                  <p className="text-blue-600 text-sm">Lng: {trackingResult.coordinates.lng}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Route Timeline */}
        {trackingResult && (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-12">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Route Timeline</h3>
            <div className="space-y-4">
              {trackingResult.route.map((stop: any, index: number) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`w-4 h-4 rounded-full ${
                    stop.status === 'Departed' || stop.status === 'Transited' 
                      ? 'bg-green-500' 
                      : stop.status === 'Expected' 
                        ? 'bg-blue-500' 
                        : 'bg-slate-300'
                  }`}></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-900">{stop.port}</span>
                      <span className="text-sm text-slate-600">{stop.date}</span>
                    </div>
                    <span className={`text-sm ${
                      stop.status === 'Departed' || stop.status === 'Transited' 
                        ? 'text-green-600' 
                        : stop.status === 'Expected' 
                          ? 'text-blue-600' 
                          : 'text-slate-500'
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
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <h3 className="text-xl font-bold text-slate-900 mb-6">
            Advanced Satellite Tracking Resources
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {satelliteProviders.map((provider, index) => (
              <a
                key={index}
                href={provider.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {provider.name}
                  </h4>
                </div>
                <p className="text-sm text-slate-600">{provider.description}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
