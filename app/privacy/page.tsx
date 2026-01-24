import { Metadata } from 'next';
import NavHeightObserver from '../_components/NavHeightObserver';

export const metadata: Metadata = {
  title: 'Privacy Policy - DVN LOG',
  description: 'Learn about how DVN LOG collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">
      <NavHeightObserver />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-blue-100 text-lg">Last updated: January 2025</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-slate dark:prose-invert max-w-none">

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">1. Information We Collect</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              At DVN LOG, we collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-300 space-y-2">
              <li>Contact information (name, email address, phone number)</li>
              <li>Shipping and billing addresses</li>
              <li>Company information for business accounts</li>
              <li>Shipment tracking inquiries</li>
              <li>Communication preferences</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">2. How We Use Your Information</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-300 space-y-2">
              <li>Process and track your shipments</li>
              <li>Communicate with you about our services</li>
              <li>Provide customer support</li>
              <li>Send you updates about your shipments</li>
              <li>Improve our services and website</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">3. Information Sharing</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-300 space-y-2">
              <li>Shipping partners and carriers to fulfill deliveries</li>
              <li>Customs authorities as required by law</li>
              <li>Service providers who assist our operations</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">4. Data Security</h2>
            <p className="text-slate-600 dark:text-slate-300">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security assessments.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">5. Your Rights</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-300 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">6. Contact Us</h2>
            <p className="text-slate-600 dark:text-slate-300">
              If you have any questions about this Privacy Policy, please contact us at:
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
