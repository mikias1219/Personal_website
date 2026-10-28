import React, { useEffect, useRef, useState } from 'react';
import { FiAlertCircle, FiMessageCircle, FiSend, FiX } from 'react-icons/fi';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTIONS = [
  'What do you do at IE Network Solutions?',
  'Which AI projects have you built?',
  'What are your main skills?',
  'Are you open to work?',
];

const GREETING: Message = {
  role: 'assistant',
  content:
    'Hi! I’m an assistant trained on Mikias’s CV and portfolio. Ask me about his experience, skills, projects or how to reach him.',
};

const ChatBot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Deep-link support: /#chatbot opens the panel directly.
  useEffect(() => {
    if (window.location.hash === '#chatbot') setOpen(true);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, busy, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = async (text: string) => {
    const question = text.trim();
    if (!question || busy) return;
    setError(null);
    setInput('');
    const next: Message[] = [...messages, { role: 'user', content: question }];
    setMessages(next);
    setBusy(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.slice(-8) }),
      });
      const data = (await res.json().catch(() => ({}))) as { reply?: string; error?: string };
      if (!res.ok || !data.reply) {
        throw new Error(data.error ?? 'The assistant is unavailable right now.');
      }
      setMessages((m) => [...m, { role: 'assistant', content: data.reply! }]);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setMessages((m) => [...m, { role: 'assistant', content: message }]);
      setError(message);
    } finally {
      setBusy(false);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void send(input);
  };

  return (
    <div className="chatbot" id="chatbot">
      <div className={`chat-panel${open ? ' is-open' : ''}`} aria-hidden={!open}>
        <div className="chat-head">
          <FiMessageCircle aria-hidden="true" />
          <p>
            <strong>Ask about Mikias</strong>
            <span className="muted">Answered from his CV & portfolio</span>
          </p>
          <button type="button" className="icon-btn icon-btn--sm" onClick={() => setOpen(false)} aria-label="Close chat">
            <FiX aria-hidden="true" />
          </button>
        </div>

        <div className="chat-scroll" ref={scrollRef} role="log" aria-live="polite" aria-label="Assistant messages">
          {messages.map((m, i) => (
            <div key={i} className={`chat-msg chat-msg--${m.role}`}>
              <p>{m.content}</p>
            </div>
          ))}
          {busy && (
            <div className="chat-msg chat-msg--assistant" aria-hidden="true">
              <p><span className="chat-typing" /> thinking…</p>
            </div>
          )}
          {error && (
            <p className="chat-error" role="alert">
              <FiAlertCircle aria-hidden="true" /> The assistant is unavailable right now — email{' '}
              <a href={`mailto:mikiyasabate003@gmail.com`}>mikiyasabate003@gmail.com</a> instead.
            </p>
          )}
        </div>

        {messages.length === 1 && !busy && (
          <ul className="chat-suggestions" aria-label="Suggested questions">
            {SUGGESTIONS.map((s) => (
              <li key={s}>
                <button type="button" className="chat-chip" onClick={() => void send(s)}>{s}</button>
              </li>
            ))}
          </ul>
        )}

        <form className="chat-form" onSubmit={onSubmit}>
          <label htmlFor="chat-input" className="sr-only">Ask a question</label>
          <input
            id="chat-input"
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about Mikias…"
            disabled={busy}
            maxLength={500}
          />
          <button type="submit" className="btn btn-primary btn-sm" disabled={busy || !input.trim()} aria-label="Send message">
            <FiSend aria-hidden="true" />
          </button>
        </form>
      </div>

      <button
        type="button"
        className={`chat-fab${open ? ' is-hidden' : ''}`}
        onClick={() => setOpen(true)}
        aria-label="Open chat assistant"
        aria-expanded={open}
      >
        <FiMessageCircle aria-hidden="true" />
      </button>
    </div>
  );
};

export default ChatBot;
