import { Metadata } from 'next';
import NavHeightObserver from '../_components/NavHeightObserver';

export const metadata: Metadata = {
  title: 'Terms of Service - DVN LOG',
  description: 'Read the terms and conditions for using DVN LOG logistics services.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">
      <NavHeightObserver />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-blue-100 text-lg">Last updated: January 2025</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-slate dark:prose-invert max-w-none">

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-slate-600 dark:text-slate-300">
              By accessing and using DVN LOG services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">2. Services Description</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              DVN LOG provides comprehensive logistics services including:
            </p>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-300 space-y-2">
              <li>Ocean freight forwarding (FCL and LCL)</li>
              <li>Air freight services</li>
              <li>Road and rail transportation</li>
              <li>Warehousing and distribution</li>
              <li>Customs clearance and compliance</li>
              <li>Project cargo handling</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">3. User Responsibilities</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              As a user of our services, you agree to:
            </p>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-300 space-y-2">
              <li>Provide accurate and complete information for all shipments</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Properly package and label all goods</li>
              <li>Not ship prohibited or restricted items</li>
              <li>Pay all fees and charges in a timely manner</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">4. Liability Limitations</h2>
            <p className="text-slate-600 dark:text-slate-300">
              DVN LOG liability for loss or damage to goods is limited according to international conventions and applicable laws. We recommend obtaining appropriate cargo insurance for valuable shipments. Our liability shall not exceed the declared value of the goods or the limits set by applicable international conventions.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">5. Payment Terms</h2>
            <p className="text-slate-600 dark:text-slate-300">
              Payment terms are as agreed upon in individual contracts or quotations. Unless otherwise specified, invoices are due within 30 days of issuance. Late payments may incur interest charges and suspension of services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">6. Claims and Disputes</h2>
            <p className="text-slate-600 dark:text-slate-300">
              Claims for loss or damage must be submitted in writing within 7 days of delivery. All disputes shall be governed by Turkish law and subject to the jurisdiction of Istanbul courts, unless otherwise agreed in writing.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">7. Modifications</h2>
            <p className="text-slate-600 dark:text-slate-300">
              DVN LOG reserves the right to modify these terms at any time. Changes will be effective upon posting to our website. Continued use of our services after any modifications indicates your acceptance of the updated terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">8. Contact Information</h2>
            <p className="text-slate-600 dark:text-slate-300">
              For questions about these Terms of Service, please contact us:
            </p>
            <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <p className="text-slate-700 dark:text-slate-300"><strong>Email:</strong> info@dvnlog.com</p>
              <p className="text-slate-700 dark:text-slate-300"><strong>Phone:</strong> +90 501 064 40 68</p>
              <p className="text-slate-700 dark:text-slate-300"><strong>Address:</strong> Beycenter Residence, Cumhuriyet Mahallesi, Esenyurt, İstanbul, Turkey</p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
