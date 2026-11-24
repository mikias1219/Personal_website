import test from "node:test";
import assert from "node:assert/strict";
import { portfolioLookup } from "../src/lib/portfolio-lookup";
test("offline portfolio lookup uses confirmed records and qualifies pending facts", () => {
  assert.ok(
    portfolioLookup("What is your current job?").text.includes("Nov 2026"),
  );
  assert.ok(
    portfolioLookup("Explain AI GTP").text.includes("Pending confirmation"),
  );
  assert.ok(portfolioLookup("Have you got DP-100?").text.includes("DP-100"));
  assert.ok(
    portfolioLookup("Tell me about OKDE").sources.some(
      (s) => s.href === "/work/okde",
    ),
  );
  assert.ok(
    /don.t have that|not documented|isn.t documented/i.test(
      portfolioLookup("What is your favorite food?").text,
    ),
  );
});
test("misspelled questions still find the closest trusted records", () => {
  const project = portfolioLookup("Tell me about Selamnew Colaboration");
  assert.ok(project.text.includes("Selamnew Collaboration"));
  assert.ok(
    project.sources.some((s) => s.href === "/work/selamnew-collaboration"),
  );
  assert.ok(
    portfolioLookup("Waht certifcate do you have?").text.includes("AI-102"),
  );
  assert.ok(
    portfolioLookup("Your skils and technolgies").text.includes("NestJS"),
  );
});
