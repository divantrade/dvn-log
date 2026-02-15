import { Metadata } from 'next';
import NavHeightObserver from '../_components/NavHeightObserver';

export const metadata: Metadata = {
  title: 'Cookie Policy - DVN LOG',
  description: 'Learn about how DVN LOG uses cookies and similar technologies.',
};

const cookieTypes = [
  {
    title: 'Essential Cookies',
    description: 'These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.',
    gradient: 'from-indigo-500 to-violet-500',
  },
  {
    title: 'Analytics Cookies',
    description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and services.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Functional Cookies',
    description: 'These cookies enable the website to provide enhanced functionality and personalization, such as remembering your language preferences or login details.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    title: 'Marketing Cookies',
    description: 'These cookies may be set through our site by our advertising partners. They may be used to build a profile of your interests and show you relevant ads on other sites.',
    gradient: 'from-amber-500 to-orange-500',
  },
];

export default function CookiesPage() {
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
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Cookie Policy</h1>
          <p className="text-white/80 text-lg font-light">Last updated: January 2025</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-[#0a0f1a]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-14">
        <div className="prose prose-slate dark:prose-invert max-w-none">

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What Are Cookies?</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Types of Cookies We Use</h2>

            <div className="space-y-4">
              {cookieTypes.map((cookie, index) => (
                <div key={index} className="card-hover p-5 bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${cookie.gradient}`} />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{cookie.title}</h3>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 ps-6">
                    {cookie.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Managing Cookies</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              You can control and manage cookies in various ways:
            </p>
            <ul className="list-disc pl-6 text-gray-500 dark:text-gray-400 space-y-2">
              <li>Most browsers allow you to refuse or accept cookies through their settings</li>
              <li>You can delete cookies that have already been set</li>
              <li>You can set your browser to notify you when a cookie is being set</li>
              <li>Note that disabling certain cookies may affect website functionality</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Third-Party Cookies</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Some cookies are placed by third-party services that appear on our pages. We do not control the dissemination of these cookies. You should check the third-party websites for more information about these cookies.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Updates to This Policy</h2>
            <p className="text-gray-500 dark:text-gray-400">
              We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h2>
            <p className="text-gray-500 dark:text-gray-400">
              If you have any questions about our use of cookies, please contact us:
            </p>
            <div className="mt-4 p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/50">
              <p className="text-gray-700 dark:text-gray-300"><strong>Email:</strong> info@dvnlog.com</p>
              <p className="text-gray-700 dark:text-gray-300"><strong>Phone:</strong> +90 501 064 40 68</p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
