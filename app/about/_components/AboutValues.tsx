export default function AboutValues() {
  const values = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      title: "Real-time tracking",
      description: "Complete visibility from pickup to delivery with milestone updates and exception alerts."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Documentation & compliance",
      description: "Expert handling of customs, permits, and regulatory requirements across all trade lanes."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Global carrier network",
      description: "Strategic partnerships with 150+ carriers ensuring capacity and competitive rates worldwide."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "24/7 exception handling",
      description: "Proactive monitoring and immediate response to delays, disruptions, or documentation issues."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Speed & efficiency",
      description: "Optimized routing and streamlined processes to minimize transit times and costs."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Data-driven insights",
      description: "Analytics and reporting to optimize your supply chain performance and reduce costs."
    }
  ];

  return (
    <section className="py-16">
      {/* Who we are */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Who we are</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl">
          We serve manufacturers, retailers, and distributors who need reliable, compliant logistics solutions across ocean, air, road, and rail. Our core value is transforming supply chain complexity into predictable, transparent operations that drive your business forward.
        </p>
        <ul className="mt-8 space-y-3 text-gray-700 dark:text-gray-300">
          <li className="flex items-start">
            <span className="text-[#1e40af] dark:text-blue-400 mr-3">•</span>
            <span>Complete visibility from origin to destination with real-time milestone tracking</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#1e40af] dark:text-blue-400 mr-3">•</span>
            <span>Full compliance management across all regulatory requirements and trade lanes</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#1e40af] dark:text-blue-400 mr-3">•</span>
            <span>Optimized speed and cost through strategic carrier partnerships and route planning</span>
          </li>
        </ul>
      </div>

      {/* What sets us apart */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">What sets us apart</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-slate-700"
            >
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#1e40af]/10 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-[#1e40af] dark:text-blue-400">
                  {value.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
