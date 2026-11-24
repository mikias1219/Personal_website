"use client";

import { ArrowUp, RotateCcw, Sparkles, Square, X, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ChatAnswer } from "./ChatAnswer";
import { usePortfolioConversation } from "./ChatProvider";
import { cv } from "@/data/experience";
import { site } from "@/data/profile";
import { FIT_PREFIX } from "@/lib/fit-check";

const greeting = `Hi, I’m ${site.name.split(" ")[0]}’s AI assistant. Ask me anything about his experience, projects or skills.`;

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
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const inputId =
    variant === "drawer" ? "floating-question" : "portfolio-question";

  useEffect(() => {
    if (autofocus) inputRef.current?.focus();
  }, [autofocus]);

  useEffect(() => {
    const log = logRef.current;
    if (log && messages.length > 0)
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
    el.style.height = `${Math.min(el.scrollHeight, 96)}px`;
  }, [input]);

  function submit() {
    const question = input.trim();
    if (!question || busy) return;
    send(question);
    setInput("");
  }

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
                ? "Job description fit check"
                : m.content}
            </div>
          ) : (
            <div className="msg-in flex items-start gap-2.5" key={m.id}>
              <Avatar size={28} />
              <div className="min-w-0 max-w-[88%] rounded-2xl rounded-tl-md bg-surface-2 px-4 py-3 text-sm">
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

      <form
        className="m-3 rounded-2xl border border-line bg-surface p-1.5 shadow-sm focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/15"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <div className="flex items-end gap-2">
          <label htmlFor={inputId} className="sr-only">
            Ask Mikias’s AI assistant
          </label>
          <textarea
            ref={inputRef}
            id={inputId}
            value={input}
            rows={1}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                submit();
              }
            }}
            maxLength={2000}
            placeholder="Type your question…"
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
