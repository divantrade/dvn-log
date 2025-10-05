export default function FinalCTA() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-14 border-t">
        <div className="rounded-2xl border p-8 md:p-10 text-center">
          <h3 className="text-2xl font-semibold">Let's optimize your next shipment</h3>
          <p className="text-gray-600 max-w-xl mx-auto mt-2">
            Get a personalized quote and discover how we can streamline your logistics.
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <a href="/contact" className="rounded-md bg-black text-white px-4 py-2 text-sm font-medium">
              Get Quote
            </a>
            <a href="/services" className="rounded-md border px-4 py-2 text-sm font-medium">
              Our Services
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-lg border p-6 text-center">
            <div className="text-3xl font-bold">2017</div>
            <div className="text-sm text-gray-600 mt-1">Since</div>
          </div>
          <div className="rounded-lg border p-6 text-center">
            <div className="text-3xl font-bold">50+</div>
            <div className="text-sm text-gray-600 mt-1">Countries</div>
          </div>
          <div className="rounded-lg border p-6 text-center">
            <div className="text-3xl font-bold">24/7</div>
            <div className="text-sm text-gray-600 mt-1">Operations</div>
          </div>
        </div>
      </section>
    </>
  );
}
