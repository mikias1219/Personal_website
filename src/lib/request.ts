import { SITE_URL } from "./config";
/** Loopback previews are explicit and can never bypass hosted Vercel policy. */
export function isLocalPreview(req: Request) {
  if (process.env.VERCEL || process.env.LOCAL_PREVIEW !== "1") return false;
  const hostname = new URL(req.url).hostname;
  return (
    hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]"
  );
}
export function allowedOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (req.headers.get("sec-fetch-site") === "cross-site") return false;
  if (!origin) return true;
  const allowed = new Set([new URL(SITE_URL).origin]);
  // These origins come from Vercel, never from visitor-controlled Host headers.
  for (const host of [
    process.env.VERCEL_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
  ]) {
    if (host && /^[a-zA-Z0-9.-]+$/.test(host)) allowed.add(`https://${host}`);
  }
  const url = new URL(req.url);
  const loopback = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  if (
    isLocalPreview(req) ||
    (process.env.NODE_ENV !== "production" && loopback)
  )
    for (const hostname of ["localhost", "127.0.0.1", "[::1]"])
      allowed.add(
        `${url.protocol}//${hostname}${url.port ? `:${url.port}` : ""}`,
      );
  return allowed.has(origin);
}
export function corsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("origin");
  return {
    Vary: "Origin",
    "Cache-Control": "no-store",
    ...(origin && allowedOrigin(req)
      ? {
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        }
      : {}),
  };
}
export class BodyError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
export async function readJson(
  req: Request,
  maxBytes: number,
): Promise<unknown> {
  if (!req.headers.get("content-type")?.includes("application/json"))
    throw new BodyError(415, "Use application/json.");
  if (Number(req.headers.get("content-length") || 0) > maxBytes)
    throw new BodyError(413, "Request is too large.");
  const reader = req.body?.getReader();
  if (!reader) throw new BodyError(400, "Request body is required.");
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > maxBytes) {
        await reader.cancel();
        throw new BodyError(413, "Request is too large.");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const body = new Uint8Array(length);
  let offset = 0;
  for (const c of chunks) {
    body.set(c, offset);
    offset += c.byteLength;
  }
  try {
    return JSON.parse(new TextDecoder().decode(body));
  } catch {
    throw new BodyError(400, "Invalid JSON.");
  }
}
