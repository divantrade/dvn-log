import Link from "next/link";

export default function TrackingIndexPage() {
  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-semibold">Tracking</h1>
      <p className="text-muted-foreground">Choose what you want to track.</p>
      <div className="flex gap-3">
        <Link className="px-4 py-2 rounded bg-black text-white" href="/tracking/container">Track Container</Link>
        <Link className="px-4 py-2 rounded border" href="/tracking/ship">Track Ship</Link>
      </div>
    </main>
  );
}
