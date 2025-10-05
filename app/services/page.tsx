const services = [
  { href: "/services/sea", label: "Sea Freight", desc: "FCL & LCL with reliable schedules." },
  { href: "/services/air", label: "Air Freight", desc: "Fast transit for time-critical cargo." },
  { href: "/services/customs", label: "Customs Clearance", desc: "Documentation & brokerage handled." },
  { href: "/services/warehouse", label: "Warehousing", desc: "Storage, consolidation, & distribution." },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-2xl font-semibold">Our Services</h1>
      <p className="text-gray-600 mt-2 max-w-2xl">
        Core logistics solutions tailored to your trade lanes and cargo profile.
      </p>

      <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 mt-8">
        {services.map((s) => (
          <li key={s.href} className="rounded-lg border p-5">
            <a href={s.href} className="block">
              <div className="font-medium">{s.label}</div>
              <div className="text-sm text-gray-600 mt-2">{s.desc}</div>
              <div className="text-xs text-gray-500 mt-3">Learn more →</div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
