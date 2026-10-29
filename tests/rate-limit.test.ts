import test from "node:test";
import assert from "node:assert/strict";
test("local rate limiter enforces the chat request boundary", async () => {
  const { rateLimit } = await import("../src/lib/rate-limit");
  const keys = ["UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN"] as const;
  const saved = keys.map((k) => process.env[k]);
  keys.forEach((k) => delete process.env[k]);
  try {
    const req = new Request("http://localhost/api/chat");
    for (let i = 0; i < 15; i++)
      assert.equal((await rateLimit(req, "chat")).allowed, true);
    const blocked = await rateLimit(req, "chat");
    assert.equal(blocked.allowed, false);
    assert.ok(blocked.retryAfter > 0);
  } finally {
    keys.forEach((k, i) => {
      if (saved[i] !== undefined) process.env[k] = saved[i];
    });
  }
});
