const steps = [
  { n: "01", t: "Brief", d: "Origin, destination, commodity, dims/weight, target date." },
  { n: "02", t: "Plan",  d: "Route, transit time, costs, and compliance checks." },
  { n: "03", t: "Move",  d: "Execution with milestone tracking and proactive updates." },
  { n: "04", t: "Deliver", d: "Final delivery, docs, and post-shipment review." },
];

export default function Process() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 border-t">
      <h2 className="text-xl font-semibold">How we work</h2>
      <ol className="mt-6 grid gap-6 md:grid-cols-4">
        {steps.map(s => (
          <li key={s.n} className="rounded-lg border p-5">
            <div className="text-xs text-gray-500">{s.n}</div>
            <div className="mt-1 font-medium">{s.t}</div>
            <p className="mt-2 text-sm text-gray-600">{s.d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
