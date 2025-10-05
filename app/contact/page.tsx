export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 space-y-6">
      <h1 className="text-2xl font-semibold">Contact DVN</h1>
      <p className="text-gray-600">Tell us about your shipment. We’ll reply quickly.</p>

      <div className="rounded-lg border p-5 space-y-3">
        <div>
          <div className="text-sm text-gray-600">Email</div>
          <a className="font-medium underline" href="mailto:hello@dvnlog.com">
            hello@dvnlog.com
          </a>
        </div>
        <div>
          <div className="text-sm text-gray-600">Phone / WhatsApp</div>
          <a className="font-medium underline" href="tel:+00000000000">
            +00 000 000 000
          </a>
        </div>
        <div>
          <div className="text-sm text-gray-600">Office</div>
          <div className="font-medium">DVN Logistics</div>
          <div className="text-sm text-gray-600">City, Country</div>
        </div>
      </div>

      <div className="rounded-lg border p-5">
        <h2 className="text-lg font-medium">Quick note</h2>
        <p className="text-sm text-gray-600 mt-2">
          You can also send us a brief with origin, destination, commodity,
          weight/volume, and target date — we’ll prepare a quote.
        </p>
      </div>
    </div>
  );
}
