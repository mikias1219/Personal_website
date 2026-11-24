import test from "node:test";
import assert from "node:assert/strict";
import { FIT_PREFIX, fitCheckReply, isFitCheck } from "../src/lib/fit-check";

test("fit check compares a pasted role to confirmed skills and flags gaps", () => {
  const raw = `${FIT_PREFIX} Say honestly how Mikias fits:\n\nNestJS, Next.js, Azure OpenAI, React Native, plus Kubernetes and Java.`;
  assert.ok(isFitCheck(raw));
  const r = fitCheckReply(raw);
  assert.match(r.text, /NestJS/);
  assert.match(r.text, /React Native/);
  assert.match(r.text, /Not listed in his records:\*\* Java, Kubernetes|Not listed[^]*Java/);
  assert.match(r.text, /Kubernetes/);
  assert.ok(r.sources.length > 0);
  assert.ok(!/years of experience|salary/i.test(r.text.replace(/says nothing about[^.]*\./i, "")));
});
