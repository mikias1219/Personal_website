import test from "node:test";
import assert from "node:assert/strict";
import { portfolioLookup } from "../src/lib/portfolio-lookup";
test("offline portfolio lookup uses confirmed records and qualifies pending facts", () => {
  assert.ok(
    portfolioLookup("What is your current job?").text.includes("Apr 2026"),
  );
  assert.ok(
    portfolioLookup("Explain AI GTP").text.includes("awaiting confirmation"),
  );
  assert.ok(portfolioLookup("Have you got DP-100?").text.includes("Active"));
  assert.ok(
    portfolioLookup("Tell me about Knowledge Hub").sources.some(
      (s) => s.href === "/work/knowledge-hub",
    ),
  );
  assert.ok(
    portfolioLookup("What is your favorite food?").text.includes(
      "I don't have that information",
    ),
  );
});
