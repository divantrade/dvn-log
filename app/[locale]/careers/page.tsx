import { Metadata } from 'next';
import Link from 'next/link';
import NavHeightObserver from '../_components/NavHeightObserver';

export const metadata: Metadata = {
  title: 'Careers - DVN LOG',
  description: 'Join the DVN LOG team. Explore career opportunities in global logistics.',
};

const openPositions = [
  {
    title: 'Operations Manager',
    department: 'Operations',
    location: 'Istanbul, Turkey',
    type: 'Full-time',
    description: 'Lead and optimize our daily logistics operations, ensuring efficient cargo handling and customer satisfaction.',
  },
  {
    title: 'Sales Representative',
    department: 'Sales',
    location: 'Istanbul, Turkey',
    type: 'Full-time',
    description: 'Drive business growth by building relationships with new and existing clients in the freight forwarding industry.',
  },
  {
    title: 'Customs Specialist',
    department: 'Compliance',
    location: 'Istanbul, Turkey',
    type: 'Full-time',
    description: 'Handle customs documentation and ensure compliance with international trade regulations.',
  },
  {
    title: 'Customer Service Representative',
    department: 'Customer Service',
    location: 'Remote',
    type: 'Full-time',
    description: 'Provide exceptional support to our clients, tracking shipments and resolving inquiries.',
  },
];

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">
      <NavHeightObserver />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Build your career with a leading global logistics company. We&apos;re always looking for talented individuals to join our growing team.
          </p>
        </div>
      </div>

      {/* Why Join Us */}
      <section className="py-16 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-12">Why Work at DVN LOG?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Global Exposure</h3>
              <p className="text-slate-600 dark:text-slate-300">Work with international clients and partners across multiple continents.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Career Growth</h3>
              <p className="text-slate-600 dark:text-slate-300">Opportunities for professional development and advancement.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Great Team</h3>
              <p className="text-slate-600 dark:text-slate-300">Collaborate with experienced professionals in a supportive environment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-12">Open Positions</h2>
          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{position.title}</h3>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        {position.department}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        {position.location}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                        {position.type}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 mt-3">{position.description}</p>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors whitespace-nowrap"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900 dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Don&apos;t See a Perfect Fit?</h2>
          <p className="text-slate-300 mb-8">
            We&apos;re always interested in meeting talented people. Send us your CV and we&apos;ll keep you in mind for future opportunities.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
