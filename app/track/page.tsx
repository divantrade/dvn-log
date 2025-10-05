export default function TrackPage({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  const q = (searchParams?.q || "").trim();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 space-y-6">
      <h1 className="text-2xl font-semibold">Track your shipment</h1>
      <p className="text-gray-600 max-w-2xl">
        Enter your shipment number below to check its status.
      </p>

      <form method="get" action="/track" className="space-y-3">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="e.g. DVN-2025-000123"
          className="w-full border rounded-md p-3 text-sm focus:outline-none focus:ring focus:border-blue-400"
          required
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>

      {q ? (
        <div className="rounded-xl border p-4">
          <div className="text-sm text-gray-600">Result for:</div>
          <div className="font-mono text-lg">{q}</div>
          <p className="mt-3 text-sm text-gray-600">
            Live carrier integration coming soon. For now, share your number via
            <a href="/contact" className="underline"> Contact</a>.
          </p>
        </div>
      ) : null}
    </div>
  );
}
