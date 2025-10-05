"use client";
import { useState } from "react";

type Mode = "container" | "ship";

export default function ClientTracking() {
  const [mode, setMode] = useState<Mode>("container");
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const tabs: { key: Mode; label: string; placeholder: string }[] = [
    { key: "container", label: "Container Number", placeholder: "e.g., MSKU1234567" },
    { key: "ship", label: "Ship Name", placeholder: "e.g., EVER GIVEN" },
  ];

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    setLoading(true);
    setResult(null);
    // محاكاة استعلام — بدون أي API خارجية
    setTimeout(() => {
      setResult({
        type: mode,
        id: q.trim(),
        status: "In Transit",
        eta: "2025-09-02T14:30:00Z",
        location: mode === "container" ? "Mediterranean Sea" : "Eastern Mediterranean",
        route: [
          { port: "Shanghai", date: "2025-08-20", status: "Departed" },
          { port: "Singapore", date: "2025-08-25", status: "Transited" },
          { port: "Suez Canal", date: "2025-08-28", status: "Transited" },
          { port: "Rotterdam", date: "2025-09-02", status: "Expected" },
        ],
      });
      setLoading(false);
    }, 900);
  }

  const providers = [
    { name: "MarineTraffic", url: "https://www.marinetraffic.com/" },
    { name: "VesselFinder", url: "https://www.vesselfinder.com/" },
    { name: "FleetMon", url: "https://www.fleetmon.com/" },
  ];

  return (
    <div className="min-h-[60vh]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 text-white">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Track Your Shipment</h1>
          <p className="mt-2 max-w-2xl text-blue-100">
            Real-time tracking for containers and vessels (placeholder demo).
          </p>
        </div>
      </section>

      {/* Card */}
      <section className="mx-auto max-w-5xl px-4 -mt-10">
        <div className="card shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="border-b flex">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setMode(t.key)}
                className={`px-4 py-3 text-sm border-b-2 ${
                  t.key === mode
                    ? "border-blue-600 text-blue-700 bg-blue-50"
                    : "border-transparent text-gray-600 hover:bg-gray-50"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Form */}
          <div className="p-6 md:p-8">
            <form onSubmit={submit} className="grid gap-3">
              <label className="text-sm text-gray-700">
                {mode === "container" ? "Container Number" : "Ship Name"}
              </label>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={tabs.find(t=>t.key===mode)!.placeholder}
                className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-400"
                required
              />
              <button type="submit" className="btn btn-primary mt-2" disabled={loading}>
                {loading ? "Searching…" : "Track Shipment"}
              </button>
            </form>

            {/* Result */}
            {result && (
              <div className="rounded-xl border p-4 mt-6">
                <div className="text-sm text-gray-600">Result for:</div>
                <div className="font-mono text-lg">{result.id}</div>
                <div className="mt-2 text-sm">
                  Status: <span className="font-medium">{result.status}</span> — ETA: {result.eta}
                </div>
                <div className="mt-4">
                  <div className="text-sm font-medium mb-2">Route</div>
                  <ol className="grid gap-2 md:grid-cols-2">
                    {result.route.map((r: any, i: number) => (
                      <li key={i} className="rounded-md border p-3">
                        <div className="font-medium">{r.port}</div>
                        <div className="text-xs text-gray-600">{r.date} — {r.status}</div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}

            {/* External trackers */}
            <div className="mt-8">
              <div className="text-sm font-medium mb-2">Quick links</div>
              <div className="flex flex-wrap gap-2">
                {providers.map(p => (
                  <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                    {p.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
