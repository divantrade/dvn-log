import { ShipTracking } from "../types";

export async function trackShip(query: { imo?: string; mmsi?: string; name?: string }): Promise<ShipTracking> {
  const now = new Date();
  const base: ShipTracking = {
    query,
    position: { lat: 25.27, lng: 55.30, speedKn: 12.3, courseDeg: 145, ts: now.toISOString() },
    nextPort: { name: "Jebel Ali", eta: new Date(now.getTime() + 1000*60*60*18).toISOString() },
    trail: [
      { lat: 25.00, lng: 55.10, ts: new Date(now.getTime()-1000*60*30).toISOString() },
      { lat: 25.15, lng: 55.20, ts: new Date(now.getTime()-1000*60*15).toISOString() },
    ],
    lastUpdated: now.toISOString(),
  };
  return base;
}
