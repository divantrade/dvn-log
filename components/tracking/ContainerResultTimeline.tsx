import type { ContainerTracking } from "@/lib/tracking/types";

export function ContainerResultTimeline({ data }: { data: ContainerTracking }) {
  return (
    <div className="border rounded p-4">
      <div className="font-medium mb-2">{data.containerNo}</div>
      <div className="text-sm text-muted-foreground mb-4">
        {data.vessel?.name} • ETA {data.eta ? new Date(data.eta).toLocaleString() : "—"}
      </div>
      <ul className="space-y-2">
        {data.events.map((e, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-black inline-block" />
            <div className="text-sm">
              <div className="font-medium">{e.type} <span className="text-muted-foreground">• {e.location || "—"}</span></div>
              <div className="text-muted-foreground">{new Date(e.ts).toLocaleString()} {e.note ? `— ${e.note}` : ""}</div>
            </div>
          </li>
        ))}
      </ul>
      <div className="text-xs text-muted-foreground mt-3">Last updated: {new Date(data.lastUpdated).toLocaleString()}</div>
    </div>
  );
}
