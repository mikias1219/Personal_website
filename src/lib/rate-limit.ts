import { createHash } from "node:crypto";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
const local = new Map<string, { count: number; reset: number }>();
const limiters = new Map<string, Ratelimit>();
export class RateLimitUnavailable extends Error {}
export async function rateLimit(req: Request, bucket: "chat" | "contact") {
  const ip = process.env.VERCEL
    ? req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
    : "local";
  const key = createHash("sha256").update(`${bucket}:${ip}`).digest("hex");
  const max = bucket === "chat" ? 15 : 5;
  if (
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    let limiter = limiters.get(bucket);
    if (!limiter) {
      limiter = new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(max, "10 m"),
        prefix: `portfolio:${bucket}`,
        analytics: false,
      });
      limiters.set(bucket, limiter);
    }
    try {
      const result = await limiter.limit(key);
      return {
        allowed: result.success,
        retryAfter: Math.max(1, Math.ceil((result.reset - Date.now()) / 1000)),
      };
    } catch {
      throw new RateLimitUnavailable(
        "Rate limiting is temporarily unavailable.",
      );
    }
  }
  if (process.env.NODE_ENV === "production")
    throw new RateLimitUnavailable("Rate limiting is not configured.");
  const now = Date.now();
  for (const [k, v] of local) if (v.reset <= now) local.delete(k);
  let entry = local.get(key);
  if (!entry) {
    entry = { count: 0, reset: now + 600000 };
    local.set(key, entry);
  }
  entry.count++;
  return {
    allowed: entry.count <= max,
    retryAfter: Math.max(1, Math.ceil((entry.reset - now) / 1000)),
  };
}
