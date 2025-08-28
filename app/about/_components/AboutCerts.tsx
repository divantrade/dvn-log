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
    <section className="py-16 bg-gray-50">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Certifications & compliance</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Maintaining the highest standards of quality, security, and environmental responsibility
        </p>
      </div>

      {/* Certifications */}
      <div className="mb-16">
        <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Our certifications</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
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
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {cert.name}
              </h4>
              <p className="text-sm text-gray-600">
                {cert.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Areas */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Compliance areas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {compliance.map((area, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-[#1e40af]/10 rounded-lg flex items-center justify-center text-[#1e40af] mr-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                {area.title}
              </h4>
              <ul className="space-y-2">
                {area.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="text-[#1e40af] mr-3 mt-1">•</span>
                    <span className="text-gray-600">{item}</span>
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
