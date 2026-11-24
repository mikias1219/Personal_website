"use client";

import Link from "next/link";
import {
  Copy,
  Download,
  Mail,
  RefreshCw,
  Send,
  Square,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ChatAnswer } from "./ChatAnswer";
import { usePortfolioConversation } from "./ChatProvider";
import type { PortfolioSource } from "@/lib/portfolio-context";
import { cv } from "@/data/experience";

export const starters = [
  "What’s his current role?",
  "Show Azure AI projects",
  "What’s his stack?",
];

export const agentActions = [
  {
    id: "cv",
    label: "Download CV",
    href: cv.url,
    kind: "link" as const,
    icon: Download,
  },
  {
    id: "hire",
    label: "Contact / hire",
    prompt: "How do I contact him to hire?",
    kind: "ask" as const,
    icon: Mail,
  },
  {
    id: "fit",
    label: "Fit check",
    prompt: "Ask me one question to check if Mikias fits my role",
    kind: "ask" as const,
  },
];

const greeting =
  "I’m Mikias’s hiring agent. Ask a short question, download his CV, or paste a role for a quick fit check.";

export function PortfolioChat({
  variant = "drawer",
  headingId = "chat-title",
  autofocus = false,
  onClose,
}: {
  variant?: "hero" | "drawer";
  headingId?: string;
  autofocus?: boolean;
  onClose?: () => void;
}) {
  const { messages, busy, error, announcement, send, stop, reset, retry } =
    usePortfolioConversation();
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const inputId =
    variant === "drawer" ? "floating-question" : "portfolio-question";

  useEffect(() => {
    if (autofocus) inputRef.current?.focus();
  }, [autofocus]);

  useEffect(() => {
    const log = logRef.current;
    if (log)
      log.scrollTo({
        top: log.scrollHeight,
        behavior: busy ? "instant" : "smooth",
      });
  }, [messages, busy]);

  function submit() {
    const question = input.trim();
    if (!question || busy) return;
    send(question);
    setInput("");
  }

  async function copyLast() {
    const last = [...messages]
      .reverse()
      .find((m) => m.role === "assistant" && m.content);
    if (!last) return;
    await navigator.clipboard.writeText(last.content);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  const asked = new Set(
    messages.filter((m) => m.role === "user").map((m) => m.content),
  );
  const last = messages.at(-1);
  const finished =
    !!last && last.role === "assistant" && !busy && !!last.content;
  const suggestions =
    messages.length === 0
      ? starters
      : finished
        ? starters.filter((s) => !asked.has(s)).slice(0, 3)
        : [];

  return (
    <section
      className="flex h-full min-h-0 flex-col"
      aria-labelledby={headingId}
    >
      <header className="flex items-center gap-3 border-b border-line px-4 py-3">
        <div className="inline-grid size-9 place-items-center rounded-full bg-accent text-on-accent">
          <span className="text-sm font-bold" aria-hidden>
            AI
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-semibold" id={headingId}>
            Hiring agent
          </h2>
          <p className="text-xs text-muted">Short answers from portfolio facts</p>
        </div>
        <div className="flex items-center gap-1">
          {messages.length > 0 && !busy ? (
            <button
              type="button"
              className="inline-flex min-h-10 items-center gap-1 rounded-full px-3 text-sm text-muted hover:bg-surface-2 hover:text-text"
              onClick={reset}
            >
              <RefreshCw className="size-3.5" /> New
            </button>
          ) : null}
          {finished ? (
            <button
              type="button"
              className="inline-grid size-10 place-items-center rounded-full hover:bg-surface-2"
              aria-label={copied ? "Copied" : "Copy answer"}
              onClick={() => void copyLast()}
            >
              <Copy className="size-4" />
            </button>
          ) : null}
          {onClose ? (
            <button
              type="button"
              className="inline-grid size-10 place-items-center rounded-full hover:bg-surface-2"
              aria-label="Close chat"
              onClick={onClose}
            >
              <X className="size-4" />
            </button>
          ) : null}
        </div>
      </header>

      <div
        className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain p-4"
        ref={logRef}
        role="log"
        aria-live="off"
        aria-label="Conversation"
        tabIndex={0}
      >
        <div className="max-w-[92%] rounded-2xl rounded-bl-md bg-surface-2 px-4 py-3 text-sm">
          {greeting}
        </div>

        {messages.length === 0 ? (
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Quick actions"
          >
            {agentActions.map((action) =>
              action.kind === "link" ? (
                <a
                  key={action.id}
                  href={action.href}
                  download={cv.filename}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg px-3 py-2 text-xs font-medium text-text hover:border-accent hover:text-accent"
                >
                  {action.icon ? <action.icon className="size-3.5" /> : null}
                  {action.label}
                </a>
              ) : (
                <button
                  key={action.id}
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg px-3 py-2 text-xs font-medium text-text hover:border-accent hover:text-accent disabled:opacity-50"
                  onClick={() => send(action.prompt)}
                  disabled={busy}
                >
                  {action.icon ? <action.icon className="size-3.5" /> : null}
                  {action.label}
                </button>
              ),
            )}
          </div>
        ) : null}

        {messages.map((m) =>
          m.role === "user" ? (
            <div
              className="ml-auto max-w-[92%] rounded-2xl rounded-br-md bg-accent px-4 py-3 text-sm font-medium text-on-accent"
              key={m.id}
            >
              <span className="sr-only">You: </span>
              {m.content}
            </div>
          ) : (
            <div
              className="max-w-[92%] rounded-2xl rounded-bl-md bg-surface-2 px-4 py-3 text-sm"
              key={m.id}
            >
              <span className="sr-only">Assistant: </span>
              {m.content ? (
                <ChatAnswer content={m.content} />
              ) : m.stopped ? (
                <p className="text-muted">The answer was stopped.</p>
              ) : (
                <span
                  className="inline-flex gap-1 py-1"
                  role="status"
                  aria-label="Finding an answer"
                >
                  <i className="size-1.5 animate-pulse rounded-full bg-muted" />
                  <i className="size-1.5 animate-pulse rounded-full bg-muted [animation-delay:150ms]" />
                  <i className="size-1.5 animate-pulse rounded-full bg-muted [animation-delay:300ms]" />
                </span>
              )}
              {m.lookup ? (
                <p className="mt-2 text-xs text-muted">
                  From portfolio records
                </p>
              ) : null}
              {m.notice ? (
                <p className="mt-2 text-xs text-muted">{m.notice}</p>
              ) : null}
              {m.stopped && m.content && !busy ? (
                <p className="mt-2 text-xs text-muted">
                  Stopped early.{" "}
                  <button
                    type="button"
                    className="font-semibold text-accent underline"
                    onClick={retry}
                  >
                    Try again
                  </button>
                </p>
              ) : null}
              {m.sources && m.sources.length > 0 && !!m.content ? (
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line pt-2 text-xs">
                  <span className="text-muted">Next</span>
                  {m.sources.map((s: PortfolioSource) =>
                    s.href.endsWith(".pdf") ? (
                      <a
                        key={s.href}
                        href={s.href}
                        download={cv.filename}
                        className="font-semibold text-accent underline-offset-2 hover:underline"
                      >
                        {s.label}
                      </a>
                    ) : (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="font-semibold text-accent underline-offset-2 hover:underline"
                        onClick={onClose}
                      >
                        {s.label}
                      </Link>
                    ),
                  )}
                </div>
              ) : null}
            </div>
          ),
        )}
      </div>

      {error ? (
        <div
          className="mx-4 mb-2 rounded-xl bg-danger/10 px-3 py-2 text-sm"
          role="alert"
        >
          {error}{" "}
          <button
            type="button"
            className="font-semibold text-accent underline"
            onClick={retry}
          >
            Try again
          </button>{" "}
          or{" "}
          <a
            href={cv.url}
            download={cv.filename}
            className="font-semibold text-accent underline"
          >
            download CV
          </a>
          .
        </div>
      ) : null}

      {suggestions.length > 0 ? (
        <div
          className="flex flex-wrap gap-2 px-4 pb-3"
          role="group"
          aria-label="Suggested questions"
        >
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              className="rounded-full border border-line bg-bg px-3 py-2 text-left text-xs text-muted hover:border-text hover:text-text disabled:opacity-50"
              onClick={() => send(s)}
              disabled={busy}
            >
              {s}
            </button>
          ))}
        </div>
      ) : null}

      {finished ? (
        <div
          className="flex flex-wrap gap-2 px-4 pb-2"
          role="group"
          aria-label="Agent actions"
        >
          <a
            href={cv.url}
            download={cv.filename}
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-2 text-xs font-semibold text-on-accent"
          >
            <Download className="size-3.5" /> Download CV
          </a>
          <Link
            href="/#contact"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-2 text-xs font-medium hover:border-accent"
          >
            <Mail className="size-3.5" /> Contact
          </Link>
        </div>
      ) : null}

      <form
        className="mx-3 mb-2 flex items-center gap-2 rounded-full border border-line bg-bg py-1 pl-4 pr-1 focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/15"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <label htmlFor={inputId} className="sr-only">
          Ask the hiring agent
        </label>
        <input
          ref={inputRef}
          id={inputId}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={2000}
          placeholder="Ask a short question or paste a role…"
          autoComplete="off"
          enterKeyHint="send"
          className="min-h-10 min-w-0 flex-1 border-0 bg-transparent text-sm outline-none placeholder:text-muted"
        />
        <button
          className="inline-grid size-10 place-items-center rounded-full bg-accent text-on-accent disabled:opacity-40"
          type={busy ? "button" : "submit"}
          disabled={!busy && !input.trim()}
          onClick={busy ? () => stop() : undefined}
          aria-label={busy ? "Stop answer" : "Send question"}
        >
          {busy ? (
            <Square className="size-3.5 fill-current" />
          ) : (
            <Send className="size-4" />
          )}
        </button>
      </form>
      <p className="px-4 pb-3 text-center text-[0.7rem] text-muted">
        Short answers from portfolio facts.{" "}
        <Link href="/#contact" className="underline">
          Email Mikias
        </Link>{" "}
        for anything missing.
      </p>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
    </section>
  );
}
