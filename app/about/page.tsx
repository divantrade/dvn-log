export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 space-y-10">
      <section>
        <h1 className="text-2xl font-semibold">About DVN Logistics</h1>
        <p className="text-gray-600 mt-2 max-w-3xl">
          We help companies move cargo reliably across ocean, air, road and rail with clear pricing and real-time visibility.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border p-6">
          <div className="text-2xl font-bold">2017</div>
          <div className="text-sm text-gray-600 mt-1">Founded</div>
        </div>
        <div className="rounded-xl border p-6">
          <div className="text-2xl font-bold">50+</div>
          <div className="text-sm text-gray-600 mt-1">Countries</div>
        </div>
        <div className="rounded-xl border p-6">
          <div className="text-2xl font-bold">24/7</div>
          <div className="text-sm text-gray-600 mt-1">Operations</div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border p-6">
          <h2 className="font-medium">Mission</h2>
          <p className="text-sm text-gray-600 mt-2">
            Deliver dependable logistics with clarity, care, and accountability.
          </p>
        </div>
        <div className="rounded-xl border p-6">
          <h2 className="font-medium">Values</h2>
          <ul className="text-sm text-gray-600 mt-2 list-disc pl-4 space-y-1">
            <li>Reliability by design</li>
            <li>Clear communication</li>
            <li>Customer-first decisions</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
