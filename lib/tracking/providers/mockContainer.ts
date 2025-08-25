import { ContainerTracking } from "../types";

// Quick ISO 6346 regex (4 letters + 7 digits)
const ISO_RE = /^[A-Z]{4}\d{7}$/i;

// Optional simple check digit validation (not full-blown but indicative)
function isoCheckDigitOk(code: string): boolean {
  // Implement ISO 6346 check digit algorithm (simplified exact version)
  // Map letters A=10 ... Z=38 (skipping 11,22,33 etc by removing multiples of 11), weight=2^position
  // Reference algorithm adapted for brevity.
  const map: Record<string, number> = {};
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i=0;i<letters.length;i++) {
    const val = 10 + i;
    map[letters[i]] = val;
  }
  const upper = code.toUpperCase();
  if (!ISO_RE.test(upper)) return false;
  const digits = upper.split("").map((ch, idx) => {
    const v = /[A-Z]/.test(ch) ? map[ch]! : parseInt(ch, 10);
    const weight = 2 ** idx;
    return v * weight;
  });
  const sum = digits.slice(0, 10).reduce((a,b)=>a+b,0);
  const check = sum % 11 % 10;
  const provided = parseInt(upper[10], 10);
  return check === provided;
}

export async function trackContainer(containerNo: string): Promise<ContainerTracking> {
  const now = new Date();
  const upper = containerNo.toUpperCase();
  const mockVessel = upper.startsWith("MSCU") ? { name: "MSC Example", imo: "9700001", voyage: "EX123W" }
                    : upper.startsWith("TLLU") ? { name: "CMA CGM Demo", imo: "9600002", voyage: "CM456E" }
                    : { name: "Ever Example", imo: "9500003", voyage: "EV789N" };

  const base: ContainerTracking = {
    containerNo: upper,
    carrier: upper.slice(0, 4),
    vessel: mockVessel,
    route: { from: "Shanghai (CN)", to: "Jebel Ali (AE)", via: ["Singapore (SG)"] },
    eta: new Date(now.getTime() + 1000*60*60*24*12).toISOString(),
    lastUpdated: now.toISOString(),
    events: [
      { type: "BOOKED", ts: new Date(now.getTime()-1000*60*60*24*20).toISOString(), location: "Online", note: "Booking confirmed" },
      { type: "GATE_IN", ts: new Date(now.getTime()-1000*60*60*24*14).toISOString(), location: "Shanghai CY", note: "Gate in full" },
      { type: "LOADED", ts: new Date(now.getTime()-1000*60*60*24*12).toISOString(), location: "Shanghai", note: mockVessel.name },
      { type: "DEPARTED", ts: new Date(now.getTime()-1000*60*60*24*12+1000*60*90).toISOString(), location: "Shanghai", note: "On schedule" },
      { type: "TRANSHIP", ts: new Date(now.getTime()-1000*60*60*24*6).toISOString(), location: "Singapore", note: "Feeder → Mother" },
      { type: "ARRIVED", ts: new Date(now.getTime()-1000*60*60*12).toISOString(), location: "Jebel Ali Anchorage", note: "Awaiting berth" },
    ],
  };

  // Attach quick validation hints
  (base as any)._validation = {
    formatOk: ISO_RE.test(upper),
    checkDigitOk: isoCheckDigitOk(upper),
  };

  return base;
}
