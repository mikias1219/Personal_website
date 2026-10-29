"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChatAnswer } from "./ChatAnswer";
import { usePortfolioConversation } from "./ChatProvider";
import type { PortfolioSource } from "@/lib/portfolio-context";

/** Suggestions from the trusted records; sending one is like asking the question. */
const suggestions = [
  "Tell me everything about your background — roles, skills and education.",
  "What have you built with Azure AI?",
  "Walk me through Knowledge Hub or OKDE.",
  "Which certifications do you hold, and are they verified?",
];

export function PortfolioChat({ autofocus = false }: { autofocus?: boolean }) {
  const { messages, busy, error, announcement, send, stop, reset, retry } =
    usePortfolioConversation();
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autofocus) inputRef.current?.focus();
  }, [autofocus]);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, busy]);

  function submit() {
    const question = input.trim();
    if (!question || busy) return;
    send(question);
    setInput("");
  }

  return (
    <div className="portfolio-chat">
      <div className="chat-topbar">
        <span className="signal" />
        <p>Ask my portfolio</p>
        <span className="mono muted">GROUNDED IN THE WORK</span>
      </div>
      <div
        className="chat-messages"
        ref={scrollRef}
        aria-label="Conversation"
        role="region"
        tabIndex={0}
      >
        {messages.length === 0 ? (
          <div className="chat-welcome">
            <span className="chat-spark" aria-hidden="true">
              ✳
            </span>
            <h3>What would you like to know?</h3>
            <p className="muted">
              Projects, experience, skills, certifications — every answer comes
              from the recorded facts.
            </p>
          </div>
        ) : (
          messages.map((m) => (
            <div className={`chat-message ${m.role}`} key={m.id}>
              <p className="mono">
                {m.role === "user"
                  ? "YOU"
                  : m.lookup
                    ? "PORTFOLIO LOOKUP"
                    : "PORTFOLIO ASSISTANT"}
              </p>
              {m.lookup && (
                <p className="lookup-note">
                  AI service unavailable. This answer uses saved portfolio
                  facts.
                </p>
              )}
              {m.notice && <p className="chat-notice">{m.notice}</p>}
              {m.role === "assistant" ? (
                <ChatAnswer content={m.content} />
              ) : (
                <p className="message-text">{m.content}</p>
              )}
              {m.role === "assistant" && !m.content && (
                <p className="message-text muted">Finding an answer…</p>
              )}
              {m.stopped && !m.content && (
                <p className="chat-notice">The answer was stopped.</p>
              )}
              {m.stopped && m.content && !busy && (
                <div className="chat-retry-row">
                  <button className="chat-retry" onClick={retry}>
                    Try again ↻
                  </button>
                </div>
              )}
              {m.sources && (
                <div className="source-chips">
                  <span className="mono muted">Explore related work</span>
                  {m.sources.map((s: PortfolioSource) => (
                    <Link key={s.href} href={s.href}>
                      {s.label} ↗
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
      {messages.length === 0 && (
        <div className="chat-suggestions">
          {suggestions.map((s) => (
            <button key={s} onClick={() => send(s)} disabled={busy}>
              {s} ↗
            </button>
          ))}
        </div>
      )}
      {error && (
        <div className="chat-error" role="alert">
          {error}{" "}
          <button className="chat-retry" onClick={retry}>
            Try again ↻
          </button>{" "}
          <Link href="/#contact">Contact Mikias ↗</Link>
        </div>
      )}
      {messages.length > 0 && !busy && (
        <div className="chat-reset-row">
          <button
            className="chat-retry"
            onClick={reset}
            aria-label="Start a new conversation"
          >
            New conversation
          </button>
        </div>
      )}
      <form
        className="chat-form"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <label
          htmlFor={autofocus ? "floating-question" : "portfolio-question"}
          className="sr-only"
        >
          Your question about Mikias
        </label>
        <input
          ref={inputRef}
          id={autofocus ? "floating-question" : "portfolio-question"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={2000}
          placeholder="Ask about my work…"
          autoComplete="off"
        />
        <button
          className="chat-send"
          type={busy ? "button" : "submit"}
          disabled={!busy && !input.trim()}
          onClick={busy ? () => stop() : undefined}
          aria-label={busy ? "Stop answer" : "Send question"}
        >
          {busy ? "■" : "↑"}
        </button>
      </form>
      <div className="chat-disclaimer mono">
        Answers can be imperfect. Check the linked work.
      </div>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
    </div>
  );
}
