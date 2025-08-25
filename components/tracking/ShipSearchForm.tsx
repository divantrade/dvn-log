"use client";
import { useState } from "react";
import type { ShipTracking } from "@/lib/tracking/types";

export function ShipSearchForm({ onResult }: { onResult: (data: ShipTracking|null) => void }) {
  const [imo, setImo] = useState("");
  const [mmsi, setMmsi] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    onResult(null);
    if (!imo && !mmsi && !name) {
      setError("Provide IMO, MMSI, or vessel name.");
      return;
    }
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (imo) params.set("imo", imo);
      if (mmsi) params.set("mmsi", mmsi);
      if (name) params.set("name", name);
      const res = await fetch(`/api/tracking/ship?${params.toString()}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Request failed");
      onResult(json as ShipTracking);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3 max-w-2xl sm:grid-cols-3">
      <div className="sm:col-span-1">
        <label className="text-sm font-medium">IMO</label>
        <input className="border rounded px-3 py-2 w-full" placeholder="9303809" value={imo} onChange={(e)=>setImo(e.target.value.trim())}/>
      </div>
      <div className="sm:col-span-1">
        <label className="text-sm font-medium">MMSI</label>
        <input className="border rounded px-3 py-2 w-full" placeholder="538002399" value={mmsi} onChange={(e)=>setMmsi(e.target.value.trim())}/>
      </div>
      <div className="sm:col-span-1">
        <label className="text-sm font-medium">Name</label>
        <input className="border rounded px-3 py-2 w-full" placeholder="Ever Given" value={name} onChange={(e)=>setName(e.target.value)}/>
      </div>
      {error && <div className="text-sm text-red-600 sm:col-span-3">{error}</div>}
      <div className="sm:col-span-3">
        <button disabled={loading} className="px-4 py-2 rounded bg-black text-white disabled:opacity-60">
          {loading ? "Tracking..." : "Track"}
        </button>
      </div>
    </form>
  );
}
