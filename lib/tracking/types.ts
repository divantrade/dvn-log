export type ContainerEventType =
  | "BOOKED" | "GATE_IN" | "LOADED" | "DEPARTED" | "TRANSHIP" | "ARRIVED"
  | "DISCHARGED" | "GATE_OUT" | "DELIVERED" | "EXCEPTION";

export interface ContainerTracking {
  containerNo: string;
  carrier?: string;
  vessel?: { name: string; imo?: string; voyage?: string };
  route?: { from?: string; to?: string; via?: string[] };
  eta?: string;
  lastUpdated: string;
  events: Array<{ type: ContainerEventType; ts: string; location?: string; note?: string }>;
}

export interface ShipTracking {
  query: { imo?: string; mmsi?: string; name?: string };
  position?: { lat: number; lng: number; speedKn?: number; courseDeg?: number; ts: string };
  nextPort?: { name: string; eta?: string };
  trail?: Array<{ lat: number; lng: number; ts: string }>;
  lastUpdated: string;
}
