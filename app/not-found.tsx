import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center px-6">
      <div className="text-center">
        {/* 404 Icon */}
        <div className="mb-8">
          <svg
            className="w-32 h-32 mx-auto text-blue-600 dark:text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Error Code */}
        <h1 className="text-8xl font-bold text-slate-900 dark:text-white mb-4">404</h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-4">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
          Sorry, the page you are looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Contact Support
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Quick Links:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/services" className="text-blue-600 dark:text-blue-400 hover:underline">
              Our Services
            </Link>
            <Link href="/tracking" className="text-blue-600 dark:text-blue-400 hover:underline">
              Track Shipment
            </Link>
            <Link href="/about" className="text-blue-600 dark:text-blue-400 hover:underline">
              About Us
            </Link>
            <Link href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline">
              Blog
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
