"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Sparkles, X } from "lucide-react";
import { PortfolioChat } from "./PortfolioChat";
import { useChatPanel, usePortfolioConversation } from "./ChatProvider";

const POS_KEY = "chat-window-offset";
const MARGIN = 8;
const DESKTOP = "(min-width: 640px)";

type Offset = { x: number; y: number };

function readOffset(): Offset {
  try {
    const v = JSON.parse(localStorage.getItem(POS_KEY) || "null");
    if (v && Number.isFinite(v.x) && Number.isFinite(v.y)) return v;
  } catch {
    /* storage unavailable */
  }
  return { x: 0, y: 0 };
}

/**
 * Persistent assistant. The hero chat is the "home" window. Once it scrolls out of
 * view, a floating window appears automatically: draggable by its header, position
 * remembered, minimizes to a pinned bar, and the bar itself can be dismissed.
 * The page keeps scrolling behind it (non-modal).
 */
export function ChatLauncher() {
  const { open, openPanel, closePanel } = useChatPanel();
  const { busy, messages } = usePortfolioConversation();
  const titleId = useId();
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [heroInView, setHeroInView] = useState(true);
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
  const [barHidden, setBarHidden] = useState(false);
  const [dragging, setDragging] = useState(false);
  const dismissed = useRef(false); // user minimized it: do not auto-open again
  const drag = useRef<{
    px: number;
    py: number;
    start: Offset;
    base: DOMRect;
  } | null>(null);
  const openRef = useRef(openPanel);
  useEffect(() => {
    openRef.current = openPanel;
  });

  const heroVisible = pathname === "/" && heroInView;
  const expanded = open && !heroVisible;
  const showBar = !heroVisible && !open && !barHidden;

  // Restore the remembered position after mount.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOffset(readOffset());
  }, []);

  // Watch the hero chat; auto-open the floating window when it scrolls away.
  useEffect(() => {
    const ask = document.getElementById("ask");
    if (!ask) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroInView(entry.isIntersecting);
        if (
          !entry.isIntersecting &&
          !dismissed.current &&
          window.matchMedia(DESKTOP).matches
        )
          openRef.current();
      },
      { threshold: 0.35 },
    );
    observer.observe(ask);
    return () => observer.disconnect();
  }, [pathname]);

  // Hero chat already visible: use it instead of a second window.
  useEffect(() => {
    if (open && heroVisible) {
      closePanel();
      document.getElementById("portfolio-question")?.focus();
    }
  }, [open, heroVisible, closePanel]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (expanded && !dialog.open) dialog.show();
    if (!expanded && dialog.open) dialog.close();
  }, [expanded]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => closePanel();
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, [closePanel]);

  // Bringing the window back (Ask AI / ⌘K / bar) also un-hides the bar.
  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBarHidden(false);
    }
  }, [open]);

  const clamp = useCallback((o: Offset, base: DOMRect): Offset => {
    const minX = MARGIN - base.left;
    const maxX = innerWidth - MARGIN - base.right;
    const minY = MARGIN - base.top;
    const maxY = innerHeight - MARGIN - base.bottom;
    return {
      x: Math.min(Math.max(o.x, minX), Math.max(minX, maxX)),
      y: Math.min(Math.max(o.y, minY), Math.max(minY, maxY)),
    };
  }, []);

  // Keep the window on screen if the viewport shrinks.
  useEffect(() => {
    function onResize() {
      const el = dialogRef.current;
      if (!el || !el.open) return;
      const r = el.getBoundingClientRect();
      const base = new DOMRect(r.left - offset.x, r.top - offset.y, r.width, r.height);
      setOffset((o) => clamp(o, base));
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [offset.x, offset.y, clamp]);

  const dragProps = {
    onPointerDown(e: React.PointerEvent<HTMLElement>) {
      if (e.button !== 0 || !window.matchMedia(DESKTOP).matches) return;
      if ((e.target as HTMLElement).closest("button,a,input,textarea")) return;
      const el = dialogRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      drag.current = {
        px: e.clientX,
        py: e.clientY,
        start: offset,
        base: new DOMRect(r.left - offset.x, r.top - offset.y, r.width, r.height),
      };
      e.currentTarget.setPointerCapture(e.pointerId);
      setDragging(true);
    },
    onPointerMove(e: React.PointerEvent<HTMLElement>) {
      const d = drag.current;
      if (!d) return;
      setOffset(
        clamp(
          { x: d.start.x + e.clientX - d.px, y: d.start.y + e.clientY - d.py },
          d.base,
        ),
      );
    },
    onPointerUp(e: React.PointerEvent<HTMLElement>) {
      if (!drag.current) return;
      drag.current = null;
      setDragging(false);
      e.currentTarget.releasePointerCapture(e.pointerId);
      setOffset((o) => {
        try {
          localStorage.setItem(POS_KEY, JSON.stringify(o));
        } catch {
          /* ignore */
        }
        return o;
      });
    },
    onDoubleClick(e: React.MouseEvent<HTMLElement>) {
      if ((e.target as HTMLElement).closest("button,a")) return;
      setOffset({ x: 0, y: 0 });
      try {
        localStorage.removeItem(POS_KEY);
      } catch {
        /* ignore */
      }
    },
    title: "Drag to move · double-click to reset",
  };

  function minimize() {
    dismissed.current = true;
    closePanel();
  }

  const hasChat = messages.length > 0;

  return (
    <>
      <div
        className={`fixed bottom-4 right-4 z-30 flex w-[min(20rem,calc(100vw-2rem))] items-center gap-1 transition duration-300 md:bottom-6 md:right-6 ${
          showBar
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
        aria-hidden={!showBar}
      >
        <button
          type="button"
          onClick={() => {
            dismissed.current = false;
            openPanel();
          }}
          aria-haspopup="dialog"
          aria-expanded={expanded}
          tabIndex={showBar ? 0 : -1}
          className="glass group flex min-w-0 flex-1 items-center gap-3 rounded-full py-2 pl-2 pr-4 text-left shadow-card transition duration-300 hover:-translate-y-0.5 hover:border-accent/60"
        >
          <span className="btn-grad inline-grid size-10 shrink-0 place-items-center rounded-full text-on-accent">
            <Sparkles className="size-5" aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold">
              {busy
                ? "Finding an answer…"
                : hasChat
                  ? "Continue chat"
                  : "Ask Mikias’s AI"}
            </span>
            <span className="block truncate text-xs text-muted">
              {busy ? (
                <span className="inline-flex gap-1 align-middle" aria-hidden>
                  {[0, 1, 2].map((n) => (
                    <i
                      key={n}
                      className="typing-dot size-1.5 rounded-full bg-accent"
                      style={{ animationDelay: `${n * 150}ms` }}
                    />
                  ))}
                </span>
              ) : (
                "Roles, projects, stack, fit check"
              )}
            </span>
          </span>
          <kbd className="hidden rounded bg-surface-2 px-1.5 py-0.5 text-[0.65rem] font-semibold text-muted sm:inline">
            ⌘K
          </kbd>
        </button>
        <button
          type="button"
          onClick={() => setBarHidden(true)}
          tabIndex={showBar ? 0 : -1}
          aria-label="Hide chat bar (⌘K brings it back)"
          className="glass inline-grid size-9 shrink-0 place-items-center rounded-full text-muted shadow-card transition hover:text-text"
        >
          <X className="size-4" aria-hidden />
        </button>
      </div>

      <dialog
        ref={dialogRef}
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
          transition: dragging ? "none" : "transform 0.2s ease",
        }}
        className="fixed inset-auto bottom-0 right-0 z-40 m-0 h-[min(46rem,85dvh)] w-full max-w-none overflow-visible border-0 bg-transparent p-0 text-text open:flex sm:bottom-6 sm:right-6 sm:h-[min(41rem,100dvh-3rem)] sm:w-[min(27rem,100vw-2.5rem)] sm:max-w-[27rem]"
        aria-labelledby={titleId}
        onKeyDown={(e) => {
          // Non-modal dialogs do not get the native Escape handling.
          if (e.key === "Escape") {
            e.stopPropagation();
            minimize();
          }
        }}
      >
        <div
          className={`flex h-full w-full flex-col overflow-hidden rounded-t-3xl border bg-surface sm:rounded-3xl ${
            dragging
              ? "border-accent/60 shadow-[0_40px_100px_-20px_rgb(0_0_0/0.7)]"
              : "border-line shadow-[0_30px_80px_-20px_rgb(0_0_0/0.55)]"
          }`}
        >
          <PortfolioChat
            variant="drawer"
            headingId={titleId}
            autofocus={expanded}
            onClose={minimize}
            closeIcon={ChevronDown}
            closeLabel="Minimize chat"
            dragProps={dragProps}
          />
        </div>
      </dialog>
    </>
  );
}

export { useChatPanel };
