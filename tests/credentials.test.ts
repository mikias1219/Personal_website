import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { certifications } from "../src/data/experience";
test("all six supplied credential identifiers have real issuer verification links", () => {
  assert.equal(certifications.length, 6);
  assert.equal(new Set(certifications.map((c) => c.credentialId)).size, 6);
  for (const id of [
    "9CBA5A4FC0E8DBE8",
    "E13F0127DECF94B4",
    "DEA0012533890898",
    "AIEDA0015379738598",
    "AEDS0019404147147",
    "DE0012274611368",
  ])
    assert.ok(
      certifications.some(
        (c) => c.credentialId === id && c.verifyUrl.includes(id),
      ),
    );
  assert.equal(
    certifications.filter((c) => c.issuer === "Microsoft").length,
    2,
  );
  assert.equal(certifications.filter((c) => c.issuer === "DataCamp").length, 4);
  const dp100 = certifications.find((c) => c.code === "DP-100")!;
  assert.equal(dp100.status, "Active");
  assert.equal(dp100.validTo, "Jun 3, 2027");
  assert.equal(dp100.confirmation, undefined);
});
test("PDF download links reference actual PDF files and honest provenance", () => {
  for (const c of certifications.filter((c) => c.pdfUrl)) {
    const bytes = readFileSync(`public${c.pdfUrl}`);
    assert.equal(bytes.subarray(0, 5).toString(), "%PDF-");
    assert.equal(c.pdfKind, "issuer-record-print");
    assert.ok(c.previewUrl && existsSync(`public${c.previewUrl}`));
  }
  for (const c of certifications.filter((c) => c.issuer === "DataCamp"))
    assert.equal(c.pdfUrl, undefined);
});
