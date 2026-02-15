import Image from "next/image";
import ISO14001 from "@/images/certifications/iso-14001.png";
import ISO45001 from "@/images/certifications/iso-45001.png";
import ISO9001 from "@/images/certifications/iso-9001.png";
import GDP from "@/images/certifications/gdp.png";

export default function AboutCerts() {
  const certifications = [
    {
      name: "ISO 14001",
      description: "Environmental Management Systems",
      image: ISO14001,
      alt: "ISO 14001 Environmental Management certification"
    },
    {
      name: "ISO 45001",
      description: "Occupational Health & Safety",
      image: ISO45001,
      alt: "ISO 45001 Occupational Health and Safety certification"
    },
    {
      name: "ISO 9001",
      description: "Quality Management Systems",
      image: ISO9001,
      alt: "ISO 9001 Quality Management certification"
    },
    {
      name: "GDP",
      description: "Good Distribution Practice",
      image: GDP,
      alt: "GDP Good Distribution Practice certification"
    }
  ];

  const compliance = [
    {
      title: "Customs & Trade",
      items: ["AEO Authorized Economic Operator", "C-TPAT Certified", "ISPS Code Compliant"]
    },
    {
      title: "Security Standards",
      items: ["TSA Known Shipper", "TAPA FSR Level A", "24/7 Security Monitoring"]
    },
    {
      title: "Quality Systems",
      items: ["ISO 9001:2015", "Temperature Controlled", "Pharma GDP Certified"]
    }
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Certifications & Compliance</h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Maintaining the highest standards of quality, security, and environmental responsibility
        </p>
      </div>

      {/* Certifications */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">Our Certifications</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="card-hover bg-white dark:bg-slate-800/60 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/50 text-center"
            >
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 relative">
                  <Image
                    src={cert.image}
                    alt={cert.alt}
                    fill
                    className="object-contain"
                    sizes="64px"
                  />
                </div>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {cert.name}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {cert.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Areas */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">Compliance Areas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {compliance.map((area, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800/60 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/50"
            >
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-lg flex items-center justify-center text-white me-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                {area.title}
              </h4>
              <ul className="space-y-2">
                {area.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="text-indigo-600 dark:text-indigo-400 me-3 mt-0.5 flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
