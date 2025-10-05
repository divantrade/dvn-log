const items = [
  { href: "/services/sea",  title: "Ocean Freight",  desc: "Global maritime shipping solutions" },
  { href: "/services/air",  title: "Air Cargo",      desc: "Fast express air freight services" },
  { href: "/services/road", title: "Road Transport", desc: "Reliable ground transportation network" },
  { href: "/services/rail", title: "Rail Freight",   desc: "Efficient railway cargo solutions" },
  { href: "/services/warehouse", title: "Warehousing", desc: "Secure storage and distribution" },
  { href: "/services/multimodal", title: "Multimodal", desc: "Integrated transport solutions" },
  { href: "/services/project", title: "Project Cargo", desc: "Specialized heavy cargo handling" },
  { href: "/services/customs", title: "Customs & Compliance", desc: "Compliance and clearance services" },
];

export default function Services() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h2 className="text-xl font-semibold">Special Services — For Your Company</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((it) => (
          <a key={it.title} href={it.href} className="rounded-lg border p-5 hover:bg-gray-50">
            <div className="font-medium">{it.title}</div>
            <div className="text-sm text-gray-600 mt-2">{it.desc}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
