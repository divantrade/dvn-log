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

const benefitGradients = [
  'from-blue-500 to-cyan-500',
  'from-indigo-500 to-purple-500',
  'from-violet-500 to-fuchsia-500',
];

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0f1a]">
      <NavHeightObserver />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 text-white py-20 -mt-16 md:-mt-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 right-1/4 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-56 h-56 bg-white rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 pt-16 md:pt-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-md px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-white/90 mb-4">
            Careers
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Join Our Team</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto font-light">
            Build your career with a leading global logistics company. We&apos;re always looking for talented individuals to join our growing team.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-[#0a0f1a]" />
      </div>

      {/* Why Join Us */}
      <section className="py-14 mesh-gradient">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">Why Work at DVN LOG?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                ),
                title: 'Global Exposure',
                desc: 'Work with international clients and partners across multiple continents.',
                gradient: benefitGradients[0],
              },
              {
                icon: (
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ),
                title: 'Career Growth',
                desc: 'Opportunities for professional development and advancement.',
                gradient: benefitGradients[1],
              },
              {
                icon: (
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: 'Great Team',
                desc: 'Collaborate with experienced professionals in a supportive environment.',
                gradient: benefitGradients[2],
              },
            ].map((benefit, index) => (
              <div key={index} className="card-hover text-center p-8 bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/50 shadow-sm">
                <div className={`w-14 h-14 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">Open Positions</h2>
          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <div
                key={index}
                className="card-hover bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/50 rounded-2xl p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{position.title}</h3>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-200">
                        {position.department}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-slate-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300">
                        {position.location}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200">
                        {position.type}
                      </span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 mt-3">{position.description}</p>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 text-white font-semibold rounded-xl transition-all whitespace-nowrap hover:scale-105 hover:shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}
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
      <section className="py-14 px-6">
        <div className="cta-modern max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 p-10 md:p-14 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4">Don&apos;t See a Perfect Fit?</h2>
            <p className="text-white/80 mb-8 font-light max-w-xl mx-auto">
              We&apos;re always interested in meeting talented people. Send us your CV and we&apos;ll keep you in mind for future opportunities.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-indigo-700 font-semibold rounded-xl transition-all hover:scale-105 hover:shadow-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
