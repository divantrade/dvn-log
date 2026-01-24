export default function AboutLeadership() {
  const leaders = [
    {
      name: "Sarah Chen",
      title: "Chief Executive Officer",
      bio: "20+ years in global logistics, former VP at Maersk. Expert in digital transformation and sustainable supply chains.",
      initials: "SC"
    },
    {
      name: "Michael Rodriguez",
      title: "Chief Operations Officer",
      bio: "15+ years optimizing freight networks across Asia-Pacific. Specialized in multimodal transport solutions.",
      initials: "MR"
    },
    {
      name: "Dr. Emma Thompson",
      title: "Head of Compliance",
      bio: "Former customs official with deep expertise in international trade regulations and risk management.",
      initials: "ET"
    }
  ];

  return (
    <section className="py-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Leadership team</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Experienced professionals dedicated to delivering exceptional logistics solutions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {leaders.map((leader, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center"
          >
            {/* Avatar */}
            <div className="w-20 h-20 bg-gradient-to-br from-[#1e40af] to-[#3b82f6] rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">
              {leader.initials}
            </div>

            {/* Name & Title */}
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {leader.name}
            </h3>
            <p className="text-[#1e40af] dark:text-blue-400 font-medium mb-4">
              {leader.title}
            </p>

            {/* Bio */}
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
              {leader.bio}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
