export default function ContactStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="rounded-xl border p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">Let’s move your next shipment</h3>
          <p className="text-sm text-gray-600 mt-1">Quick quote, clear plan, fast execution.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="mailto:hello@dvnlog.com" className="btn btn-outline">Email</a>
          <a href="tel:+00000000000" className="btn btn-outline">Call</a>
          <a href="/contact" className="btn btn-primary">Request a Quote</a>
        </div>
      </div>
    </section>
  );
}
