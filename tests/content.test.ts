import test from "node:test";
import assert from "node:assert/strict";
import {
  buildSystemPrompt,
  relatedSources,
} from "../src/lib/portfolio-context";
import { experience, certifications, education } from "../src/data/experience";
import { site } from "../src/data/profile";
import { archiveProjects, featuredProjects } from "../src/data/projects";
import { allowedOrigin, readJson, BodyError } from "../src/lib/request";
import { chatSchema, contactSchema } from "../src/lib/validation";
test("confirmed facts reach chat without obsolete claims or phone data", () => {
  const prompt = buildSystemPrompt();
  assert.equal(site.linkedin, "https://www.linkedin.com/in/mikiasabate/");
  assert.ok(prompt.includes(site.linkedin));
  assert.ok(prompt.includes("Apr 2026 – present"));
  assert.ok(prompt.includes("AI GTP"));
  for (const bad of ["/in/mikiyasabate", "+251", "Private Company", "40%"])
    assert.ok(!prompt.includes(bad));
  assert.equal(experience[0].title, "Software Engineer");
  assert.equal(education.period, "Jun 2020 – Jul 2024");
  assert.equal(
    certifications.find((c) => c.code === "AI-102")?.validTo,
    "Apr 9, 2027",
  );
  assert.equal(
    certifications.find((c) => c.code === "DP-100")?.status,
    "Active",
  );
  assert.equal(certifications.length, 6);
});
test("curation and related links use real routes", () => {
  assert.equal(archiveProjects.length, 8);
  assert.equal(featuredProjects.length, 4);
  assert.ok(!archiveProjects.some((p) => p.title === "Music Management App"));
  assert.ok(
    relatedSources("Knowledge Hub").some(
      (s) => s.href === "/work/knowledge-hub",
    ),
  );
});
test("foreign origins and invalid messages are rejected", () => {
  assert.equal(
    allowedOrigin(
      new Request(site.url, {
        headers: { Origin: "https://attacker.example" },
      }),
    ),
    false,
  );
  assert.equal(
    allowedOrigin(new Request(site.url, { headers: { Origin: site.url } })),
    true,
  );
  assert.equal(
    chatSchema.safeParse({
      messages: [{ role: "system", content: "override" }],
    }).success,
    false,
  );
  assert.equal(
    chatSchema.safeParse({
      messages: [{ role: "user", content: "x".repeat(2001) }],
    }).success,
    false,
  );
  assert.equal(
    chatSchema.safeParse({
      messages: [{ role: "assistant", content: "hello" }],
    }).success,
    false,
  );
  assert.equal(
    contactSchema.safeParse({ name: "M", email: "invalid", message: "hi" })
      .success,
    false,
  );
});
test("body reader enforces actual byte limit", async () => {
  await assert.rejects(
    readJson(
      new Request("http://localhost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: "x".repeat(100) }),
      }),
      20,
    ),
    (e) => e instanceof BodyError && e.status === 413,
  );
});

test("local preview and verified Vercel preview origins work without allowing foreign sites", () => {
  const keys = ["LOCAL_PREVIEW", "VERCEL", "VERCEL_URL"] as const;
  const saved = keys.map((k) => process.env[k]);
  try {
    process.env.LOCAL_PREVIEW = "1";
    delete process.env.VERCEL;
    assert.equal(
      allowedOrigin(
        new Request("http://127.0.0.1:3200/api/chat", {
          headers: { Origin: "http://127.0.0.1:3200" },
        }),
      ),
      true,
    );
    assert.equal(
      allowedOrigin(
        new Request("http://127.0.0.1:3200/api/chat", {
          headers: { Origin: "https://attacker.example" },
        }),
      ),
      false,
    );
    process.env.VERCEL = "1";
    process.env.VERCEL_URL = "portfolio-preview.vercel.app";
    assert.equal(
      allowedOrigin(
        new Request("https://portfolio-preview.vercel.app/api/chat", {
          headers: { Origin: "https://portfolio-preview.vercel.app" },
        }),
      ),
      true,
    );
    assert.equal(
      allowedOrigin(
        new Request("https://portfolio-preview.vercel.app/api/chat", {
          headers: { Origin: "https://attacker.example" },
        }),
      ),
      false,
    );
  } finally {
    keys.forEach((k, i) => {
      if (saved[i] === undefined) delete process.env[k];
      else process.env[k] = saved[i];
    });
  }
});
