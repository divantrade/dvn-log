/**
 * Server Component — no imports, no client code.
 * صفحة رئيسية بسيطة وآمنة بدون أي مكونات خارجية.
 */
export default function Page() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">DVN LOG</h1>
          <p className="mt-4 text-gray-600 max-w-2xl">
            Safe, fast delivery to every corner of the world. Ocean, air, road and rail transport services with real-time tracking.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="/track" className="inline-block rounded-md bg-black px-5 py-2.5 text-white">Track shipment</a>
            <a href="/services" className="inline-block rounded-md border px-5 py-2.5">Our services</a>
          </div>
        </div>
      </section>

      {/* Services snapshot */}
      <section className="border-t">
        <div className="mx-auto max-w-7xl px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-4 rounded-lg border">
            <h3 className="font-semibold">Ocean Freight</h3>
            <p className="text-sm text-gray-600 mt-2">FCL/LCL and project cargo.</p>
          </div>
          <div className="p-4 rounded-lg border">
            <h3 className="font-semibold">Air Freight</h3>
            <p className="text-sm text-gray-600 mt-2">Fast lanes, global coverage.</p>
          </div>
          <div className="p-4 rounded-lg border">
            <h3 className="font-semibold">Road Transport</h3>
            <p className="text-sm text-gray-600 mt-2">FTL/LTL across the region.</p>
          </div>
          <div className="p-4 rounded-lg border">
            <h3 className="font-semibold">Rail & Multimodal</h3>
            <p className="text-sm text-gray-600 mt-2">Balanced speed & cost.</p>
          </div>
        </div>
      </section>

      {/* Testimonials placeholder */}
      <section className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <h2 className="text-2xl font-semibold">What clients say</h2>
          <ul className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700">
            <li className="p-4 border rounded-lg">“Reliable partner. On-time deliveries.”</li>
            <li className="p-4 border rounded-lg">“Great communications & tracking.”</li>
            <li className="p-4 border rounded-lg">“Handled our project cargo flawlessly.”</li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="flex items-center justify-between gap-6 flex-col md:flex-row">
            <div>
              <h3 className="text-xl font-semibold">Ready to move?</h3>
              <p className="text-gray-600 mt-2">Get a quote or start tracking in seconds.</p>
            </div>
            <div className="flex gap-3">
              <a href="/services" className="inline-block rounded-md bg-black px-5 py-2.5 text-white">Get a quote</a>
              <a href="/track" className="inline-block rounded-md border px-5 py-2.5">Track shipment</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
