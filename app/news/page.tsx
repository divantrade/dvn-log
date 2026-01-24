import { Metadata } from 'next';
import Link from 'next/link';
import NavHeightObserver from '../_components/NavHeightObserver';

export const metadata: Metadata = {
  title: 'News - DVN LOG',
  description: 'Stay updated with the latest news and updates from DVN LOG.',
};

const newsItems = [
  {
    date: 'January 2025',
    title: 'DVN LOG Expands Operations in Mediterranean Region',
    excerpt: 'We are excited to announce the expansion of our services across the Mediterranean region, strengthening our network in key ports.',
    category: 'Company News',
  },
  {
    date: 'December 2024',
    title: 'New Partnership with Major Shipping Lines',
    excerpt: 'DVN LOG has established strategic partnerships with leading shipping lines to offer enhanced ocean freight services.',
    category: 'Partnerships',
  },
  {
    date: 'November 2024',
    title: 'Launch of Enhanced Tracking System',
    excerpt: 'Our new real-time tracking system provides customers with more accurate and detailed shipment information.',
    category: 'Technology',
  },
  {
    date: 'October 2024',
    title: 'DVN LOG Achieves ISO Certification',
    excerpt: 'We are proud to announce that DVN LOG has achieved ISO 9001:2015 certification for quality management.',
    category: 'Achievements',
  },
];

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">
      <NavHeightObserver />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">News & Updates</h1>
          <p className="text-xl text-blue-100">Stay informed about DVN LOG&apos;s latest developments</p>
        </div>
      </div>

      {/* News Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {newsItems.map((item, index) => (
              <article
                key={index}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm text-slate-500 dark:text-slate-400">{item.date}</span>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h2>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">{item.excerpt}</p>
                  <button className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors inline-flex items-center gap-1">
                    Read more
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Stay Updated</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-8">
            Subscribe to our newsletter for the latest news and industry insights.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Back to Blog */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            Looking for more insights about logistics and shipping?
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 font-semibold rounded-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-colors"
          >
            Visit Our Blog
          </Link>
        </div>
      </section>
    </main>
  );
}
