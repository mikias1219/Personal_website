"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { MAX_ANSWER, MAX_QUESTION, prepareHistory } from "@/lib/chat-history";
import type { PortfolioSource } from "@/lib/portfolio-context";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: PortfolioSource[];
  lookup?: boolean;
  notice?: string;
  stopped?: boolean;
}

interface ChatState {
  messages: ChatMessage[];
  busy: boolean;
  error: string;
  announcement: string;
  panelOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
  openWithQuestion: (question: string) => void;
  send: (question: string) => void;
  stop: () => void;
  reset: () => void;
  retry: () => void;
}

const ChatContext = createContext<ChatState | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const controller = useRef<AbortController | null>(null);
  const generation = useRef(0);
  const active = useRef(false);
  const pendingQuestion = useRef<string | null>(null);

  useEffect(() => () => controller.current?.abort(), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPanelOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  async function request(question: string, previous: ChatMessage[]) {
    const content = question.trim();
    if (active.current || !content) return;
    if (content.length > MAX_QUESTION) {
      setError("Please keep your question under 2,000 characters.");
      return;
    }
    const requestId = ++generation.current;
    const history = prepareHistory([
      ...previous,
      { id: crypto.randomUUID(), role: "user" as const, content },
    ]);
    const id = crypto.randomUUID();
    const abort = new AbortController();
    controller.current = abort;
    active.current = true;
    setMessages([...history, { id, role: "assistant", content: "" }]);
    setError("");
    setBusy(true);
    setAnnouncement("Preparing an answer from Mikias’s portfolio…");
    let answer = "";
    const update = (changes: Partial<ChatMessage>) => {
      if (requestId === generation.current)
        setMessages((m) =>
          m.map((item) => (item.id === id ? { ...item, ...changes } : item)),
        );
    };
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map(({ role, content }) => ({ role, content })),
        }),
        signal: abort.signal,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data.error || "Could not reach the assistant. Please try again.",
        );
      }
      const reader = res.body?.getReader();
      if (!reader) throw new Error("No answer was received.");
      const decoder = new TextDecoder();
      let buffer = "";
      let completed = false;
      const consume = (line: string) => {
        if (!line.trim() || requestId !== generation.current) return;
        const event = JSON.parse(line);
        if (event.type === "error")
          throw new Error(event.error || "The answer was interrupted.");
        if (event.type === "fallback") {
          answer = String(event.text).slice(0, MAX_ANSWER);
          update({ content: answer, sources: event.sources, lookup: true });
        }
        if (event.type === "text") {
          answer += String(event.text);
          if (answer.length > MAX_ANSWER)
            throw new Error(
              "This answer reached the display limit. Ask a more focused follow-up.",
            );
          update({ content: answer });
        }
        if (event.type === "sources") update({ sources: event.sources });
        if (event.type === "notice") update({ notice: event.message });
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
      if (requestId === generation.current)
        setAnnouncement("Answer ready. You can ask a follow-up question.");
    } catch (e) {
      if (requestId !== generation.current) return;
      if (abort.signal.aborted) {
        update({ stopped: true });
        setAnnouncement("Answer stopped.");
      } else {
        setError(
          e instanceof Error ? e.message : "The assistant is unavailable.",
        );
        update({ stopped: true });
        setAnnouncement(
          "The answer could not be completed. You can try again.",
        );
      }
    } finally {
      if (requestId === generation.current) {
        setBusy(false);
        active.current = false;
        controller.current = null;
      }
    }
  }

  function sendLatest(q: string) {
    void request(q, messages);
  }

  useEffect(() => {
    if (!panelOpen || !pendingQuestion.current || busy || active.current) return;
    const q = pendingQuestion.current;
    pendingQuestion.current = null;
    void request(q, messages);
  }, [panelOpen, busy, messages]);

  function reset() {
    generation.current++;
    controller.current?.abort();
    controller.current = null;
    active.current = false;
    setBusy(false);
    setMessages([]);
    setError("");
    setAnnouncement("New conversation started.");
  }

  function retry() {
    const index = messages.findLastIndex((m) => m.role === "user");
    if (index >= 0) void request(messages[index].content, messages.slice(0, index));
  }

  const openWithQuestion = useCallback((question: string) => {
    pendingQuestion.current = question;
    setPanelOpen(true);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        messages,
        busy,
        error,
        announcement,
        panelOpen,
        openPanel: () => setPanelOpen(true),
        closePanel: () => setPanelOpen(false),
        openWithQuestion,
        send: sendLatest,
        stop: () => controller.current?.abort(),
        reset,
        retry,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function usePortfolioConversation() {
  const state = useContext(ChatContext);
  if (!state) throw new Error("Portfolio chat requires ChatProvider.");
  return state;
}

export function useChatPanel() {
  const state = usePortfolioConversation();
  return {
    open: state.panelOpen,
    openPanel: state.openPanel,
    closePanel: state.closePanel,
    openWithQuestion: state.openWithQuestion,
  };
}
