import type { ShipTracking } from "@/lib/tracking/types";

export function ShipResultCard({ data }: { data: ShipTracking }) {
  const pos = data.position;
  return (
    <div className="border rounded p-4">
      <div className="font-medium mb-2">Vessel</div>
      <div className="text-sm text-muted-foreground mb-4">
        {data.query.imo ? `IMO ${data.query.imo}` : data.query.mmsi ? `MMSI ${data.query.mmsi}` : data.query.name}
      </div>
      {pos ? (
        <div className="text-sm">
          <div>Position: {pos.lat.toFixed(3)}, {pos.lng.toFixed(3)}</div>
          <div>Speed: {pos.speedKn ?? "—"} kn • Course: {pos.courseDeg ?? "—"}°</div>
          <div>Time: {new Date(pos.ts).toLocaleString()}</div>
        </div>
      ) : <div className="text-sm">No position data.</div>}
      {data.nextPort && <div className="text-sm mt-2">Next port: {data.nextPort.name} • ETA {data.nextPort.eta ? new Date(data.nextPort.eta).toLocaleString() : "—"}</div>}
      <div className="text-xs text-muted-foreground mt-3">Last updated: {new Date(data.lastUpdated).toLocaleString()}</div>
    </div>
  );
}
