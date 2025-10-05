const services = [
  { href: "/services/sea", label: "Sea Freight" },
  { href: "/services/air", label: "Air Freight" },
  { href: "/services/customs", label: "Customs" },
  { href: "/services/warehouse", label: "Warehousing" },
];

export default function Services() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 border-t">
      <h2 className="text-xl font-semibold mb-6">Core services</h2>
      <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {services.map((s) => (
          <li key={s.href}>
            <a className="block rounded-lg border p-4 hover:bg-gray-50" href={s.href}>
              <div className="font-medium">{s.label}</div>
              <div className="text-xs text-gray-600 mt-1">Learn more →</div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
