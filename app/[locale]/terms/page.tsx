import { Metadata } from 'next';
import NavHeightObserver from '../_components/NavHeightObserver';

export const metadata: Metadata = {
  title: 'Terms of Service - DVN LOG',
  description: 'Read the terms and conditions for using DVN LOG logistics services.',
};

export default function TermsPage() {
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
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Terms of Service</h1>
          <p className="text-white/80 text-lg font-light">Last updated: January 2025</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-[#0a0f1a]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-14">
        <div className="prose prose-slate dark:prose-invert max-w-none">

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-500 dark:text-gray-400">
              By accessing and using DVN LOG services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Services Description</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              DVN LOG provides comprehensive logistics services including:
            </p>
            <ul className="list-disc pl-6 text-gray-500 dark:text-gray-400 space-y-2">
              <li>Ocean freight forwarding (FCL and LCL)</li>
              <li>Air freight services</li>
              <li>Road and rail transportation</li>
              <li>Warehousing and distribution</li>
              <li>Customs clearance and compliance</li>
              <li>Project cargo handling</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. User Responsibilities</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              As a user of our services, you agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-500 dark:text-gray-400 space-y-2">
              <li>Provide accurate and complete information for all shipments</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Properly package and label all goods</li>
              <li>Not ship prohibited or restricted items</li>
              <li>Pay all fees and charges in a timely manner</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Liability Limitations</h2>
            <p className="text-gray-500 dark:text-gray-400">
              DVN LOG liability for loss or damage to goods is limited according to international conventions and applicable laws. We recommend obtaining appropriate cargo insurance for valuable shipments. Our liability shall not exceed the declared value of the goods or the limits set by applicable international conventions.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Payment Terms</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Payment terms are as agreed upon in individual contracts or quotations. Unless otherwise specified, invoices are due within 30 days of issuance. Late payments may incur interest charges and suspension of services.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Claims and Disputes</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Claims for loss or damage must be submitted in writing within 7 days of delivery. All disputes shall be governed by Turkish law and subject to the jurisdiction of Istanbul courts, unless otherwise agreed in writing.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Modifications</h2>
            <p className="text-gray-500 dark:text-gray-400">
              DVN LOG reserves the right to modify these terms at any time. Changes will be effective upon posting to our website. Continued use of our services after any modifications indicates your acceptance of the updated terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Contact Information</h2>
            <p className="text-gray-500 dark:text-gray-400">
              For questions about these Terms of Service, please contact us:
            </p>
            <div className="mt-4 p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/50">
              <p className="text-gray-700 dark:text-gray-300"><strong>Email:</strong> info@dvnlog.com</p>
              <p className="text-gray-700 dark:text-gray-300"><strong>Phone:</strong> +90 501 064 40 68</p>
              <p className="text-gray-700 dark:text-gray-300"><strong>Address:</strong> Beycenter Residence, Cumhuriyet Mahallesi, Esenyurt, İstanbul, Turkey</p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
