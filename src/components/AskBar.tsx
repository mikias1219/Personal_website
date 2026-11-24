"use client";

import { ArrowRight, Download, Sparkles } from "lucide-react";
import { useState } from "react";
import { Container } from "./ui";
import { agentActions, starters } from "./PortfolioChat";
import { useChatPanel } from "./ChatProvider";
import { cv } from "@/data/experience";

export function AskBar() {
  const [value, setValue] = useState("");
  const { openWithQuestion } = useChatPanel();

  function submit(question?: string) {
    const q = (question ?? value).trim();
    if (!q) return;
    openWithQuestion(q);
    setValue("");
  }

  return (
    <div className="border-b border-line bg-surface">
      <Container>
        <section
          id="ask"
          className="scroll-mt-24 py-10 md:py-12"
          aria-labelledby="ask-title"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-grid size-10 place-items-center rounded-full bg-accent text-on-accent">
              <Sparkles className="size-5" aria-hidden />
            </span>
            <div>
              <h2
                id="ask-title"
                className="text-xl font-semibold tracking-tight md:text-2xl"
              >
                Ask the hiring agent
              </h2>
              <p className="text-sm text-muted md:text-base">
                Short answers for recruiters. Download the CV or paste a role.
              </p>
            </div>
          </div>

          <form
            className="mt-6 flex items-center gap-2 rounded-full border border-line bg-bg p-1.5 shadow-card focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/15"
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <label htmlFor="ask-input" className="sr-only">
              Ask the hiring agent about Mikias
            </label>
            <input
              id="ask-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              maxLength={2000}
              placeholder="Ask a short question or paste a role…"
              className="min-h-11 flex-1 border-0 bg-transparent px-4 text-base outline-none placeholder:text-muted"
              autoComplete="off"
            />
            <button
              type="submit"
              className="inline-grid size-11 shrink-0 place-items-center rounded-full bg-accent text-on-accent transition hover:brightness-110 disabled:opacity-40"
              disabled={!value.trim()}
              aria-label="Ask question"
            >
              <ArrowRight className="size-5" />
            </button>
          </form>

          <div
            className="mt-4 flex flex-wrap gap-2"
            role="group"
            aria-label="Agent actions"
          >
            <a
              href={cv.url}
              download={cv.filename}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-2 text-sm font-semibold text-on-accent"
            >
              <Download className="size-3.5" /> Download CV
            </a>
            {agentActions
              .filter((a) => a.kind === "ask")
              .map((a) => (
                <button
                  key={a.id}
                  type="button"
                  className="rounded-full border border-line bg-bg px-3.5 py-2 text-left text-sm text-muted transition hover:border-text hover:text-text"
                  onClick={() => submit(a.prompt)}
                >
                  {a.label}
                </button>
              ))}
            {starters.slice(0, 3).map((q) => (
              <button
                key={q}
                type="button"
                className="rounded-full border border-line bg-bg px-3.5 py-2 text-left text-sm text-muted transition hover:border-text hover:text-text"
                onClick={() => submit(q)}
              >
                {q}
              </button>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
