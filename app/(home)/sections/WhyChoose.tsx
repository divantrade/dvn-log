const points = [
  { title: "Reliable by Design", desc: "ISO-aligned processes with documented SOPs." },
  { title: "Global Network", desc: "Coordinated routes across 50+ countries." },
  { title: "Real-Time Visibility", desc: "Milestone tracking and proactive alerts." },
  { title: "Customs & Compliance", desc: "Trade, security, and documentation handled end-to-end." },
  { title: "Single Point of Contact", desc: "One dedicated team for every shipment." },
  { title: "Risk & Exceptions", desc: "Early detection and clear escalation paths." },
];

export default function WhyChoose() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 border-t">
      <h2 className="text-xl font-semibold">Why shippers choose DVN</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {points.map((p) => (
          <div key={p.title} className="rounded-lg border p-5">
            <div className="font-medium">{p.title}</div>
            <p className="text-sm text-gray-600 mt-2">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
