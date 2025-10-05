export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-12 pb-10">
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          DVN Logistics — Shipping made simple
        </h1>
        <p className="text-gray-600 max-w-2xl">
          Reliable freight, clear pricing, and fast support for your business.
        </p>
        <div className="flex gap-3">
          <a
            href="/track"
            className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium"
          >
            Track a shipment
          </a>
          <a
            href="/contact"
            className="inline-flex items-center rounded-md bg-black text-white px-4 py-2 text-sm font-medium"
          >
            Get a quote
          </a>
        </div>
      </div>
    </section>
  );
}
