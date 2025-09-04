// app/api/tracking/container/route.ts
import { NextRequest, NextResponse } from "next/server";
import { trackContainer } from "@/lib/tracking/providers/mockContainer";
import type { ContainerTracking } from "@/lib/tracking/types";

type CacheEntry = { data: ContainerTracking; expires: number };

const cache = new Map<string, CacheEntry>();
const TTL_MS = 1000 * 120; // 2 minutes
const RATE_LIMIT: Record<string, { count: number; reset: number }> = Object.create(null);

function ipFrom(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}

function rateLimit(ip: string) {
  const now = Date.now();
  const windowMs = 1000 * 60 * 5; // 5 minutes
  const max = 20;
  let bucket = RATE_LIMIT[ip];
  if (!bucket || now > bucket.reset) bucket = { count: 0, reset: now + windowMs };
  bucket.count += 1;
  RATE_LIMIT[ip] = bucket;
  if (bucket.count > max) return { ok: false as const, reset: new Date(bucket.reset).toISOString() };
  return { ok: true as const };
}

function validateContainerNo(s: string): boolean {
  return /^[A-Z]{4}\d{7}$/i.test(s);
}

function getCache(key: string) {
  const hit = cache.get(key);
  if (hit && hit.expires > Date.now()) return hit.data;
  if (hit) cache.delete(key);
  return null;
}

function setCache(key: string, data: ContainerTracking) {
  cache.set(key, { data, expires: Date.now() + TTL_MS });
}

async function handle(containerNo: string) {
  if (!validateContainerNo(containerNo)) {
    return NextResponse.json(
      { error: "Invalid container number (ISO 6346 expected: 4 letters + 7 digits)" },
      { status: 400 }
    );
  }

  const key = `container:${containerNo.toUpperCase()}`;
  const cached = getCache(key);
  if (cached) {
    return NextResponse.json(cached, {
      headers: {
        "x-cache": "HIT",
        "Cache-Control": "private, max-age=0, must-revalidate",
      },
    });
  }

  const data = await trackContainer(containerNo);
  setCache(key, data);
  return NextResponse.json(data, {
    headers: {
      "x-cache": "MISS",
      "Cache-Control": "private, max-age=0, must-revalidate",
    },
  });
}

export async function GET(req: NextRequest) {
  const ip = ipFrom(req);
  const rl = rateLimit(ip);
  if (!rl.ok) return NextResponse.json({ error: "Too many requests", reset: rl.reset }, { status: 429 });

  const { searchParams } = new URL(req.url);
  const containerNo = searchParams.get("containerNo");
  if (!containerNo) return NextResponse.json({ error: "Provide containerNo" }, { status: 400 });
  return handle(containerNo);
}

export async function POST(req: NextRequest) {
  const ip = ipFrom(req);
  const rl = rateLimit(ip);
  if (!rl.ok) return NextResponse.json({ error: "Too many requests", reset: rl.reset }, { status: 429 });

  const body = await req.json().catch(() => ({} as any));
  const containerNo = body?.containerNo as string | undefined;
  if (!containerNo) return NextResponse.json({ error: "Provide containerNo" }, { status: 400 });
  return handle(containerNo);
}
