export default function TrackPage({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  const q = (searchParams?.q || "").trim();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 space-y-6">
      <h1 className="text-2xl font-semibold">Track a shipment</h1>
      <p className="text-gray-600">
        Enter your tracking or reference number below.
      </p>

      <form method="get" action="/track" className="flex gap-3">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="e.g. DVN-2025-000123"
          className="w-full rounded-md border px-3 py-2 text-sm"
          required
        />
        <button
          type="submit"
          className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white"
        >
          Search
        </button>
      </form>

      {q ? (
        <div className="rounded-lg border p-4">
          <div className="text-sm text-gray-600">Result for:</div>
          <div className="font-mono text-lg">{q}</div>
          <p className="mt-3 text-sm text-gray-600">
            This is a placeholder result. We can later connect this to your
            tracking API or redirect to the carrier page.
          </p>
        </div>
      ) : null}
    </div>
  );
}
