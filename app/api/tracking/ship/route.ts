import { NextRequest, NextResponse } from "next/server";
import { trackShip } from "@/lib/tracking/providers/mockShip";
import type { ShipTracking } from "@/lib/tracking/types";

type CacheEntry = { data: ShipTracking; expires: number };
const cache = new Map<string, CacheEntry>();
const TTL_MS = 1000 * 120;
const RATE_LIMIT: Record<string, { count: number; reset: number }> = {};

function ipFrom(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}

function rateLimit(ip: string) {
  const now = Date.now();
  const windowMs = 1000 * 60 * 5;
  const max = 20;
  const bucket = RATE_LIMIT[ip] ?? { count: 0, reset: now + windowMs };
  if (now > bucket.reset) { bucket.count = 0; bucket.reset = now + windowMs; }
  bucket.count += 1;
  RATE_LIMIT[ip] = bucket;
  if (bucket.count > max) return { ok: false, reset: new Date(bucket.reset).toISOString() };
  return { ok: true };
}

function getCache(key: string) {
  const hit = cache.get(key);
  if (hit && hit.expires > Date.now()) return hit.data;
  if (hit) cache.delete(key);
  return null;
}

function setCache(key: string, data: ShipTracking) {
  cache.set(key, { data, expires: Date.now() + TTL_MS });
}

async function handle(query: { imo?: string; mmsi?: string; name?: string }) {
  if (!query.imo && !query.mmsi && !query.name) {
    return NextResponse.json({ error: "Provide one of: imo, mmsi, or name" }, { status: 400 });
  }
  const key = `ship:${query.imo || query.mmsi || query.name}`;
  const cached = getCache(key);
  if (cached) return NextResponse.json(cached, { headers: { "x-cache": "HIT" } });

  const data = await trackShip(query);
  setCache(key, data);
  return NextResponse.json(data, { headers: { "x-cache": "MISS" } });
}

export async function GET(req: NextRequest) {
  const ip = ipFrom(req);
  const rl = rateLimit(ip);
  if (!rl.ok) return NextResponse.json({ error: "Too many requests", reset: rl.reset }, { status: 429 });

  const { searchParams } = new URL(req.url);
  const q = {
    imo: searchParams.get("imo") || undefined,
    mmsi: searchParams.get("mmsi") || undefined,
    name: searchParams.get("name") || undefined,
  };
  return handle(q);
}

export async function POST(req: NextRequest) {
  const ip = ipFrom(req);
  const rl = rateLimit(ip);
  if (!rl.ok) return NextResponse.json({ error: "Too many requests", reset: rl.reset }, { status: 429 });

  const body = await req.json().catch(() => ({}));
  const q = { imo: body?.imo, mmsi: body?.mmsi, name: body?.name };
  return handle(q);
}
