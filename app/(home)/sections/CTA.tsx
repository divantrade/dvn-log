export default function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 border-t">
      <div className="rounded-2xl border p-8 md:p-10 text-center">
        <h3 className="text-2xl font-semibold">Ready to ship with DVN?</h3>
        <p className="text-gray-600 max-w-xl mx-auto mt-2">
          Tell us what you’re moving and from where to where. We’ll reply with a clear plan.
        </p>
        <div className="flex items-center justify-center gap-3 mt-6">
          <a href="/contact" className="rounded-md bg-black text-white px-4 py-2 text-sm font-medium">
            Request a quote
          </a>
          <a href="/track" className="rounded-md border px-4 py-2 text-sm font-medium">
            Track shipment
          </a>
        </div>
      </div>
    </section>
  );
}
