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

const categoryGradients: Record<string, string> = {
  'Company News': 'from-blue-500 to-cyan-500',
  'Partnerships': 'from-indigo-500 to-purple-500',
  'Technology': 'from-violet-500 to-fuchsia-500',
  'Achievements': 'from-emerald-500 to-teal-500',
};

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0f1a]">
      <NavHeightObserver />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 text-white py-16 -mt-16 md:-mt-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 right-1/4 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-56 h-56 bg-white rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 pt-20 md:pt-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-md px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-white/90 mb-4">
            Latest Updates
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">News & Updates</h1>
          <p className="text-xl text-white/80 font-light">Stay informed about DVN LOG&apos;s latest developments</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-[#0a0f1a]" />
      </div>

      {/* News Grid */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {newsItems.map((item, index) => (
              <article
                key={index}
                className="card-hover bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/50 rounded-2xl overflow-hidden"
              >
                {/* Gradient accent bar */}
                <div className={`h-1 bg-gradient-to-r ${categoryGradients[item.category] || 'from-indigo-500 to-violet-500'}`} />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{item.date}</span>
                    <span className={`px-3 py-1 bg-gradient-to-r ${categoryGradients[item.category] || 'from-indigo-500 to-violet-500'} text-white text-xs font-medium rounded-full`}>
                      {item.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h2>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">{item.excerpt}</p>
                  <button className="text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors inline-flex items-center gap-1.5">
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
      <section className="py-14 mesh-gradient">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Stay Updated</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Subscribe to our newsletter for the latest news and industry insights.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
            <button
              type="submit"
              className="px-6 py-3 text-white font-semibold rounded-xl transition-all hover:scale-105 hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Back to Blog */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Looking for more insights about logistics and shipping?
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 font-semibold rounded-xl hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all"
          >
            Visit Our Blog
          </Link>
        </div>
      </section>
    </main>
  );
}
