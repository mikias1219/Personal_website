"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChatAnswer } from "./ChatAnswer";
import { usePortfolioConversation } from "./ChatProvider";
import { Icon } from "./Icon";
import type { PortfolioSource } from "@/lib/portfolio-context";

/** Starter and follow-up questions. Sending one is the same as typing it. */
export const starters = [
  "Who is Mikias and what does he do?",
  "What has he built with Azure AI?",
  "What’s his tech stack?",
  "Which certifications does he hold?",
  "Is he open to work, and how do I reach him?",
];

const greeting =
  "Hi, I’m an AI assistant that knows Mikias’s work. Ask about his projects, experience, skills or certifications and I’ll answer from his portfolio.";

export function PortfolioChat({
  variant = "hero",
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
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const inputId = variant === "drawer" ? "floating-question" : "portfolio-question";

  useEffect(() => {
    if (autofocus) inputRef.current?.focus();
  }, [autofocus]);
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTo({ top: log.scrollHeight, behavior: busy ? "instant" : "smooth" });
  }, [messages, busy]);

  function submit() {
    const question = input.trim();
    if (!question || busy) return;
    send(question);
    setInput("");
  }

  const asked = new Set(
    messages.filter((m) => m.role === "user").map((m) => m.content),
  );
  const last = messages.at(-1);
  const finished = !!last && last.role === "assistant" && !busy && !!last.content;
  const suggestions =
    messages.length === 0
      ? starters
      : finished
        ? starters.filter((s) => !asked.has(s)).slice(0, 3)
        : [];

  return (
    <section
      className={`chat chat-${variant}`}
      aria-labelledby={headingId}
      id={variant === "hero" ? "ask" : undefined}
    >
      <header className="chat-head">
        <span className="chat-mark" aria-hidden="true">
          <Icon name="spark" />
        </span>
        <div>
          <h2 className="chat-title" id={headingId}>
            Ask about Mikias
          </h2>
          <p className="chat-sub">AI assistant · answers from his portfolio</p>
        </div>
        <div className="chat-head-actions">
          {messages.length > 0 && !busy && (
            <button type="button" className="chat-new" onClick={reset}>
              <Icon name="refresh" width={16} height={16} /> New chat
            </button>
          )}
          {onClose && (
            <button
              type="button"
              className="icon-button"
              aria-label="Close chat"
              onClick={onClose}
            >
              <Icon name="close" />
            </button>
          )}
        </div>
      </header>

      <div
        className="chat-log"
        ref={logRef}
        role="log"
        aria-live="off"
        aria-label="Conversation"
        tabIndex={0}
      >
        <div className="msg msg-assistant">
          <p className="msg-answer">{greeting}</p>
        </div>
        {messages.map((m) =>
          m.role === "user" ? (
            <div className="msg msg-user" key={m.id}>
              <span className="sr-only">You: </span>
              {m.content}
            </div>
          ) : (
            <div className="msg msg-assistant" key={m.id}>
              <span className="sr-only">Assistant: </span>
              {m.content ? (
                <ChatAnswer content={m.content} />
              ) : m.stopped ? (
                <p className="msg-note">The answer was stopped.</p>
              ) : (
                <span className="typing" role="status" aria-label="Finding an answer">
                  <i />
                  <i />
                  <i />
                </span>
              )}
              {m.lookup && (
                <p className="msg-note">
                  The AI service is unavailable, so this answer comes from
                  saved portfolio facts.
                </p>
              )}
              {m.notice && <p className="msg-note">{m.notice}</p>}
              {m.stopped && m.content && !busy && (
                <p className="msg-note">
                  Stopped early.{" "}
                  <button type="button" className="text-link" onClick={retry}>
                    Try again
                  </button>
                </p>
              )}
              {m.sources && m.sources.length > 0 && !!m.content && (
                <div className="msg-sources">
                  <span>See also</span>
                  {m.sources.map((s: PortfolioSource) => (
                    <Link key={s.href} href={s.href}>
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ),
        )}
      </div>

      {error && (
        <div className="chat-error" role="alert">
          {error}{" "}
          <button type="button" onClick={retry}>
            Try again
          </button>{" "}
          or <Link href="/#contact">email Mikias</Link>.
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="chat-suggest" role="group" aria-label="Suggested questions">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              className="chip"
              onClick={() => send(s)}
              disabled={busy}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        className="chat-form"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <label htmlFor={inputId} className="sr-only">
          Your question about Mikias
        </label>
        <input
          ref={inputRef}
          id={inputId}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={2000}
          placeholder="Ask anything about Mikias…"
          autoComplete="off"
          enterKeyHint="send"
        />
        <button
          className="chat-send"
          type={busy ? "button" : "submit"}
          disabled={!busy && !input.trim()}
          onClick={busy ? () => stop() : undefined}
          aria-label={busy ? "Stop answer" : "Send question"}
        >
          <Icon name={busy ? "stop" : "send"} />
        </button>
      </form>
      <p className="chat-note">
        AI can make mistakes. Check the linked work or{" "}
        <Link href="/#contact">ask Mikias directly</Link>.
      </p>
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>
    </section>
  );
}
