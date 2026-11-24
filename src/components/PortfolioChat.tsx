"use client";

import Link from "next/link";
import {
  ArrowUp,
  Award,
  Briefcase,
  Check,
  Copy,
  Cpu,
  Download,
  FileSearch,
  Layers,
  Mail,
  RotateCcw,
  Sparkles,
  Square,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ChatAnswer } from "./ChatAnswer";
import { usePortfolioConversation } from "./ChatProvider";
import type { PortfolioSource } from "@/lib/portfolio-context";
import { cv } from "@/data/experience";
import { site } from "@/data/profile";
import { FIT_PREFIX } from "@/lib/fit-check";

/** Verified questions the assistant answers well. Kept exported for other surfaces. */
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

const topics: { icon: LucideIcon; title: string; hint: string; q: string }[] = [
  {
    icon: Briefcase,
    title: "Current role",
    hint: "Where he works and what he owns",
    q: "What’s his current role?",
  },
  {
    icon: Cpu,
    title: "Azure AI work",
    hint: "Copilots, RAG and document AI",
    q: "Show Azure AI projects",
  },
  {
    icon: Layers,
    title: "Tech stack",
    hint: "Backend, web, mobile, cloud",
    q: "What’s his stack?",
  },
  {
    icon: Award,
    title: "Certifications",
    hint: "Microsoft and DataCamp, verifiable",
    q: "Does he have AI-102?",
  },
];

const followUps = [
  "Is he open to work?",
  "How do I contact him?",
  "Tell me about OKDE",
  "devops experience",
  "mobile apps?",
  "Where did Mikias go to university?",
  "datacamp certifications",
  "What’s his current role?",
  "Show Azure AI projects",
  "What’s his stack?",
];

const greeting = `Hi, I’m ${site.name.split(" ")[0]}’s AI assistant. I answer from his real portfolio records, so you can skip the scrolling. What would you like to know?`;

function Avatar({ size = 36 }: { size?: number }) {
  return (
    <span
      className="btn-grad relative inline-grid shrink-0 place-items-center rounded-full text-on-accent"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <Sparkles style={{ width: size * 0.5, height: size * 0.5 }} />
    </span>
  );
}

export function PortfolioChat({
  variant = "drawer",
  headingId = "chat-title",
  autofocus = false,
  onClose,
  closeIcon: CloseIcon = X,
  closeLabel = "Close chat",
  dragProps,
}: {
  variant?: "hero" | "drawer";
  headingId?: string;
  autofocus?: boolean;
  onClose?: () => void;
  closeIcon?: LucideIcon;
  closeLabel?: string;
  /** Pointer handlers that make the header a drag handle for the floating window. */
  dragProps?: React.HTMLAttributes<HTMLElement>;
}) {
  const { messages, busy, error, announcement, send, stop, reset, retry } =
    usePortfolioConversation();
  const [input, setInput] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [fitMode, setFitMode] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
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

  // Auto-grow the textarea up to a limit.
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, fitMode ? 160 : 96)}px`;
  }, [input, fitMode]);

  function submit(text?: string) {
    const raw = (text ?? input).trim();
    if (!raw || busy) return;
    const question = fitMode
      ? `${FIT_PREFIX} Say honestly how Mikias fits, using only his portfolio facts:\n\n${raw}`.slice(
          0,
          2000,
        )
      : raw;
    send(question);
    setInput("");
    setFitMode(false);
  }

  async function copy(id: string, content: string) {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 1500);
    } catch {
      /* clipboard unavailable */
    }
  }

  const asked = new Set(
    messages.filter((m) => m.role === "user").map((m) => m.content),
  );
  const last = messages.at(-1);
  const finished =
    !!last && last.role === "assistant" && !busy && !!last.content;
  const suggestions = finished
    ? followUps.filter((s) => !asked.has(s)).slice(0, 3)
    : [];

  return (
    <section
      className="flex h-full min-h-0 flex-col"
      aria-labelledby={headingId}
    >
      <header
        {...dragProps}
        className={`relative flex items-center gap-3 border-b border-line px-4 py-3.5 ${
          dragProps ? "cursor-grab touch-none select-none active:cursor-grabbing" : ""
        }`}
      >
        {dragProps ? (
          <span
            className="absolute left-1/2 top-1.5 h-1 w-10 -translate-x-1/2 rounded-full bg-line"
            aria-hidden
          />
        ) : null}
        <Avatar />
        <div className="min-w-0 flex-1">
          <h2 className="text-[0.95rem] font-semibold" id={headingId}>
            Ask Mikias’s AI
          </h2>
          <p className="flex items-center gap-1.5 text-xs text-muted">
            <span className="size-1.5 rounded-full bg-ok" aria-hidden />
            AI assistant · answers from his real records
          </p>
        </div>
        <div className="flex items-center gap-1">
          {messages.length > 0 && !busy ? (
            <button
              type="button"
              className="inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-xs font-medium text-muted transition hover:bg-surface-2 hover:text-text"
              onClick={reset}
            >
              <RotateCcw className="size-3.5" aria-hidden /> New chat
            </button>
          ) : null}
          {onClose ? (
            <button
              type="button"
              className="inline-grid size-10 place-items-center rounded-full transition hover:bg-surface-2"
              aria-label={closeLabel}
              onClick={onClose}
            >
              <CloseIcon className="size-4" />
            </button>
          ) : null}
        </div>
      </header>

      <div
        className="chat-scroll flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain p-4"
        ref={logRef}
        role="log"
        aria-live="off"
        aria-label="Conversation"
        tabIndex={0}
      >
        <div className="msg-in flex items-start gap-2.5">
          <Avatar size={28} />
          <div className="max-w-[88%] rounded-2xl rounded-tl-md bg-surface-2 px-4 py-3 text-sm leading-relaxed">
            {greeting}
          </div>
        </div>

        {messages.length === 0 ? (
          <div className="msg-in space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Popular questions
            </p>
            <div
              className="grid gap-2 sm:grid-cols-2"
              role="group"
              aria-label="Popular questions"
            >
              {topics.map((t) => (
                <button
                  key={t.title}
                  type="button"
                  className="group flex items-start gap-3 rounded-2xl border border-line bg-surface p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-accent/60 hover:bg-accent-soft disabled:opacity-50"
                  onClick={() => send(t.q)}
                  disabled={busy}
                >
                  <span className="inline-grid size-9 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent transition group-hover:bg-accent group-hover:text-on-accent">
                    <t.icon className="size-4" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">
                      {t.title}
                    </span>
                    <span className="block text-xs text-muted">{t.hint}</span>
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-2xl border border-dashed border-accent/50 bg-accent-soft/60 p-3 text-left transition hover:bg-accent-soft"
              onClick={() => {
                setFitMode(true);
                inputRef.current?.focus();
              }}
            >
              <span className="inline-grid size-9 shrink-0 place-items-center rounded-xl bg-accent text-on-accent">
                <FileSearch className="size-4" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold">
                  Hiring? Paste a job description
                </span>
                <span className="block text-xs text-muted">
                  Get an honest fit check against his real experience
                </span>
              </span>
            </button>
          </div>
        ) : null}

        {messages.map((m, index) => {
          const isLast = index === messages.length - 1;
          const streaming = isLast && busy && m.role === "assistant";
          return m.role === "user" ? (
            <div
              className="msg-in btn-grad ml-auto max-w-[88%] whitespace-pre-wrap break-words rounded-2xl rounded-br-md px-4 py-2.5 text-sm font-medium text-on-accent"
              key={m.id}
            >
              <span className="sr-only">You: </span>
              {m.content.startsWith(FIT_PREFIX)
                ? "📄 Job description fit check"
                : m.content}
            </div>
          ) : (
            <div className="msg-in flex items-start gap-2.5" key={m.id}>
              <Avatar size={28} />
              <div className="group/msg min-w-0 max-w-[88%] rounded-2xl rounded-tl-md bg-surface-2 px-4 py-3 text-sm">
                <span className="sr-only">Assistant: </span>
                {m.content ? (
                  <div className={streaming ? "stream-cursor" : ""}>
                    <ChatAnswer content={m.content} />
                  </div>
                ) : m.stopped ? (
                  <p className="text-muted">The answer was stopped.</p>
                ) : (
                  <span
                    className="inline-flex items-center gap-1.5 py-1.5"
                    role="status"
                    aria-label="Finding an answer"
                  >
                    {[0, 1, 2].map((n) => (
                      <i
                        key={n}
                        className="typing-dot size-2 rounded-full bg-accent"
                        style={{ animationDelay: `${n * 150}ms` }}
                      />
                    ))}
                    <span className="ml-1 text-xs text-muted">
                      Checking portfolio…
                    </span>
                  </span>
                )}
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
                {m.content && !streaming ? (
                  <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-line/70 pt-2.5">
                    {m.sources?.map((s: PortfolioSource) =>
                      s.href.endsWith(".pdf") ? (
                        <a
                          key={s.href}
                          href={s.href}
                          download={cv.filename}
                          className="inline-flex items-center gap-1 rounded-full border border-line bg-surface px-2.5 py-1 text-xs font-semibold text-accent no-underline transition hover:border-accent"
                        >
                          <Download className="size-3" aria-hidden />
                          {s.label}
                        </a>
                      ) : (
                        <Link
                          key={s.href}
                          href={s.href}
                          className="inline-flex items-center gap-1 rounded-full border border-line bg-surface px-2.5 py-1 text-xs font-semibold text-accent no-underline transition hover:border-accent"
                          onClick={onClose}
                        >
                          {s.label} →
                        </Link>
                      ),
                    )}
                    <button
                      type="button"
                      className="ml-auto inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs text-muted transition hover:bg-surface hover:text-text"
                      onClick={() => void copy(m.id, m.content)}
                      aria-label={
                        copiedId === m.id ? "Copied" : "Copy this answer"
                      }
                    >
                      {copiedId === m.id ? (
                        <Check className="size-3.5 text-ok" />
                      ) : (
                        <Copy className="size-3.5" />
                      )}
                      {copiedId === m.id ? "Copied" : "Copy"}
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}

        {error ? (
          <div
            className="rounded-xl border border-danger/30 bg-danger/10 px-3 py-2 text-sm"
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
              download the CV
            </a>
            .
          </div>
        ) : null}
      </div>

      {finished ? (
        <div className="border-t border-line/70 px-4 pb-1 pt-3">
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Suggested questions"
          >
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                className="rounded-full border border-line bg-surface px-3 py-1.5 text-left text-xs text-muted transition hover:border-accent hover:text-text disabled:opacity-50"
                onClick={() => send(s)}
                disabled={busy}
              >
                {s}
              </button>
            ))}
            <a
              href={cv.url}
              download={cv.filename}
              className="btn-grad inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-on-accent no-underline"
            >
              <Download className="size-3.5" aria-hidden /> CV
            </a>
            <Link
              href="/#contact"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium no-underline transition hover:border-accent"
            >
              <Mail className="size-3.5" aria-hidden /> Contact
            </Link>
          </div>
        </div>
      ) : null}

      <form
        className="m-3 mb-2 rounded-2xl border border-line bg-surface p-1.5 shadow-sm focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/15"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        {fitMode ? (
          <div className="flex items-center justify-between px-2.5 pb-1 pt-1.5 text-xs font-semibold text-accent">
            <span className="inline-flex items-center gap-1.5">
              <FileSearch className="size-3.5" aria-hidden /> Fit check · paste
              the job description
            </span>
            <button
              type="button"
              className="text-muted underline"
              onClick={() => setFitMode(false)}
            >
              Cancel
            </button>
          </div>
        ) : null}
        <div className="flex items-end gap-2">
          <label htmlFor={inputId} className="sr-only">
            Ask Mikias’s AI assistant
          </label>
          <textarea
            ref={inputRef}
            id={inputId}
            value={input}
            rows={fitMode ? 4 : 1}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                submit();
              }
            }}
            maxLength={fitMode ? 1800 : 2000}
            placeholder={
              fitMode
                ? "Paste the role requirements here…"
                : "Ask anything about Mikias…"
            }
            autoComplete="off"
            enterKeyHint="send"
            className="max-h-40 min-h-10 min-w-0 flex-1 resize-none border-0 bg-transparent px-2.5 py-2 text-sm outline-none focus:outline-none focus-visible:outline-none placeholder:text-muted"
          />
          <button
            className="btn-grad inline-grid size-10 shrink-0 place-items-center rounded-xl text-on-accent transition active:scale-95 disabled:cursor-not-allowed disabled:bg-surface-2 disabled:bg-none disabled:text-muted disabled:shadow-none"
            type={busy ? "button" : "submit"}
            disabled={!busy && !input.trim()}
            onClick={busy ? () => stop() : undefined}
            aria-label={busy ? "Stop answer" : "Send question"}
          >
            {busy ? (
              <Square className="size-3.5 fill-current" />
            ) : (
              <ArrowUp className="size-5" />
            )}
          </button>
        </div>
      </form>
      <p className="px-4 pb-3 text-center text-[0.7rem] text-muted">
        AI can miss details.{" "}
        <Link href="/#contact" className="underline" onClick={onClose}>
          Email Mikias
        </Link>{" "}
        to confirm anything important.
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
