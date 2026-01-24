import { Metadata } from 'next';
import NavHeightObserver from '../_components/NavHeightObserver';

export const metadata: Metadata = {
  title: 'Cookie Policy - DVN LOG',
  description: 'Learn about how DVN LOG uses cookies and similar technologies.',
};

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">
      <NavHeightObserver />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-blue-100 text-lg">Last updated: January 2025</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-slate dark:prose-invert max-w-none">

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">What Are Cookies?</h2>
            <p className="text-slate-600 dark:text-slate-300">
              Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Types of Cookies We Use</h2>

            <div className="space-y-6">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Essential Cookies</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Analytics Cookies</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and services.
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Functional Cookies</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  These cookies enable the website to provide enhanced functionality and personalization, such as remembering your language preferences or login details.
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Marketing Cookies</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  These cookies may be set through our site by our advertising partners. They may be used to build a profile of your interests and show you relevant ads on other sites.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Managing Cookies</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              You can control and manage cookies in various ways:
            </p>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-300 space-y-2">
              <li>Most browsers allow you to refuse or accept cookies through their settings</li>
              <li>You can delete cookies that have already been set</li>
              <li>You can set your browser to notify you when a cookie is being set</li>
              <li>Note that disabling certain cookies may affect website functionality</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Third-Party Cookies</h2>
            <p className="text-slate-600 dark:text-slate-300">
              Some cookies are placed by third-party services that appear on our pages. We do not control the dissemination of these cookies. You should check the third-party websites for more information about these cookies.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Updates to This Policy</h2>
            <p className="text-slate-600 dark:text-slate-300">
              We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Contact Us</h2>
            <p className="text-slate-600 dark:text-slate-300">
              If you have any questions about our use of cookies, please contact us:
            </p>
            <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <p className="text-slate-700 dark:text-slate-300"><strong>Email:</strong> info@dvnlog.com</p>
              <p className="text-slate-700 dark:text-slate-300"><strong>Phone:</strong> +90 501 064 40 68</p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
