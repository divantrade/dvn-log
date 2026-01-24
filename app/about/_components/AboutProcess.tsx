export default function AboutProcess() {
  const steps = [
    {
      number: "01",
      title: "Quote & booking",
      description: "Get instant quotes and book shipments through our platform or dedicated account manager",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      number: "02",
      title: "Documentation & compliance",
      description: "We handle all customs paperwork, permits, and regulatory requirements for your trade lane",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      number: "03",
      title: "Pickup & consolidation",
      description: "Strategic pickup scheduling and cargo consolidation to optimize costs and transit times",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
        </svg>
      )
    },
    {
      number: "04",
      title: "Real-time tracking",
      description: "Monitor your shipment with live updates, milestone notifications, and exception alerts",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      number: "05",
      title: "Final delivery",
      description: "Coordinated last-mile delivery with proof of delivery and performance analytics",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How we work</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Our streamlined 5-step process ensures your cargo moves efficiently from origin to destination
        </p>
      </div>

      <div className="relative">
        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-[#1e40af] rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">
                    {step.number}
                  </div>
                  <div className="w-12 h-12 bg-[#1e40af]/10 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-[#1e40af] dark:text-blue-400 mb-4">
                    {step.icon}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-0.5 bg-[#1e40af]/20 dark:bg-blue-900/40 mx-4"></div>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Timeline */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-[#1e40af] rounded-full flex items-center justify-center text-white font-bold">
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-0.5 h-16 bg-[#1e40af]/20 dark:bg-blue-900/40 mx-auto mt-4"></div>
                )}
              </div>
              <div className="flex-1 pt-1">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-[#1e40af]/10 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-[#1e40af] dark:text-blue-400 mr-3">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
