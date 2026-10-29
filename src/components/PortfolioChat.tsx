"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { PortfolioSource } from "@/lib/portfolio-context";
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: PortfolioSource[];
  lookup?: boolean;
}
const suggestions = [
  "What have you built with Azure AI?",
  "Tell me about Knowledge Hub",
  "What is your current role?",
];
export function PortfolioChat({ autofocus = false }: { autofocus?: boolean }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const controller = useRef<AbortController | null>(null);
  useEffect(() => {
    if (autofocus) inputRef.current?.focus();
    return () => controller.current?.abort();
  }, [autofocus]);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, busy]);
  async function send(question: string) {
    if (busy || !question.trim()) return;
    const content = question.trim();
    if (content.length > 2000) {
      setError("Please keep your question under 2,000 characters.");
      return;
    }
    const user: Message = { id: crypto.randomUUID(), role: "user", content };
    const id = crypto.randomUUID();
    const history = [...messages.filter((m) => m.content), user].slice(-11);
    setMessages([...history, { id, role: "assistant", content: "" }]);
    setInput("");
    setError("");
    setBusy(true);
    setAnnouncement("Finding an answer…");
    controller.current = new AbortController();
    let answer = "";
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map(({ role, content }) => ({ role, content })),
        }),
        signal: controller.current.signal,
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Could not reach the assistant.");
      }
      const reader = res.body?.getReader();
      if (!reader) throw new Error("No answer was received.");
      const decoder = new TextDecoder();
      let buffer = "";
      let completed = false;
      const consume = (line: string) => {
        if (!line.trim()) return;
        const event = JSON.parse(line);
        if (event.type === "error") throw new Error(event.error);
        if (event.type === "fallback") {
          answer = event.text;
          setMessages((m) =>
            m.map((item) =>
              item.id === id
                ? {
                    ...item,
                    content: answer,
                    sources: event.sources,
                    lookup: true,
                  }
                : item,
            ),
          );
        }
        if (event.type === "text") {
          answer += event.text;
          setMessages((m) =>
            m.map((item) =>
              item.id === id ? { ...item, content: answer } : item,
            ),
          );
        }
        if (event.type === "sources")
          setMessages((m) =>
            m.map((item) =>
              item.id === id ? { ...item, sources: event.sources } : item,
            ),
          );
        if (event.type === "done") completed = true;
      };
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";
          for (const line of lines) consume(line);
        }
        buffer += decoder.decode();
        if (buffer) consume(buffer);
      } finally {
        await reader.cancel().catch(() => {});
        reader.releaseLock();
      }
      if (!completed || !answer.trim())
        throw new Error("The answer was interrupted. Please try again.");
      setAnnouncement(`Answer: ${answer}`);
    } catch (e) {
      if (e instanceof Error && e.name === "AbortError")
        setAnnouncement("Answer stopped.");
      else {
        setError(
          e instanceof Error ? e.message : "The assistant is unavailable.",
        );
        setAnnouncement("Could not complete the answer.");
      }
      if (!answer) setMessages((m) => m.filter((item) => item.id !== id));
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
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
            <p className="muted">Projects, experience, tools — ask away.</p>
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
              <p className="message-text">
                {m.content || "Finding an answer…"}
              </p>
              {m.sources && (
                <div className="source-chips">
                  <span className="mono muted">Explore related work</span>
                  {m.sources.map((s) => (
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
          {error} <Link href="/contact">Contact Mikias ↗</Link>
        </div>
      )}
      <form
        className="chat-form"
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
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
          onClick={busy ? () => controller.current?.abort() : undefined}
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
