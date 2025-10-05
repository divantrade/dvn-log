const items = [
  { title: "Sea & Air Freight", desc: "Flexible routes and transit times." },
  { title: "Customs Clearance", desc: "End-to-end paperwork, done right." },
  { title: "Door-to-Door", desc: "From pickup to delivery, we handle it." },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 border-t">
      <h2 className="text-xl font-semibold mb-6">What you get</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((it) => (
          <div key={it.title} className="rounded-lg border p-5">
            <div className="font-medium">{it.title}</div>
            <p className="text-sm text-gray-600 mt-2">{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
