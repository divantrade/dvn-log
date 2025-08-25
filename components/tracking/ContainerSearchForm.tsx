"use client";
import { useState } from "react";
import type { ContainerTracking } from "@/lib/tracking/types";

const ISO_RE = /^[A-Z]{4}\d{7}$/i;

export function ContainerSearchForm({ onResult }: { onResult: (data: ContainerTracking|null) => void }) {
  const [containerNo, setContainerNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    onResult(null);
    if (!ISO_RE.test(containerNo)) {
      setError("Please enter a valid ISO 6346 container number (4 letters + 7 digits).");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/tracking/container", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ containerNo }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Request failed");
      onResult(json as ContainerTracking);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 max-w-md">
      <label className="text-sm font-medium">Container number</label>
      <input
        className="border rounded px-3 py-2"
        placeholder="MSCU1234567"
        value={containerNo}
        onChange={(e) => setContainerNo(e.target.value.trim())}
      />
      {error && <div className="text-sm text-red-600">{error}</div>}
      <button disabled={loading} className="px-4 py-2 rounded bg-black text-white disabled:opacity-60">
        {loading ? "Tracking..." : "Track"}
      </button>
    </form>
  );
}
