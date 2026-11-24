"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { PortfolioChat } from "./PortfolioChat";
import { useChatPanel } from "./ChatProvider";

export function ChatLauncher() {
  const { open, openPanel, closePanel } = useChatPanel();
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [showFab, setShowFab] = useState(true);

  useEffect(() => {
    const ask = document.getElementById("ask");
    if (!ask) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowFab(!entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(ask);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => closePanel();
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, [closePanel]);

  return (
    <>
      <button
        type="button"
        className={`fixed bottom-4 right-4 z-30 btn-grad inline-flex min-h-12 items-center gap-2 rounded-full px-5 font-semibold text-on-accent transition duration-200 hover:-translate-y-0.5 md:bottom-6 md:right-6 ${
          open || !showFab
            ? "pointer-events-none translate-y-3 opacity-0"
            : "opacity-100"
        }`}
        onClick={openPanel}
        aria-haspopup="dialog"
      >
        <Sparkles className="size-5" />
        Ask AI
      </button>

      <dialog
        ref={dialogRef}
        className="fixed inset-auto bottom-0 right-0 z-40 m-0 h-[min(46rem,92dvh)] w-full max-w-none overflow-visible border-0 bg-transparent p-0 text-text open:flex sm:bottom-6 sm:right-6 sm:h-[min(41rem,100dvh-3rem)] sm:w-[min(27rem,100vw-2.5rem)] sm:max-w-[27rem]"
        aria-labelledby={titleId}
        onClick={(e) => {
          if (e.target === dialogRef.current) closePanel();
        }}
        onCancel={(e) => {
          e.preventDefault();
          closePanel();
        }}
      >
        <div className="flex h-full w-full flex-col overflow-hidden rounded-t-3xl border border-line bg-surface shadow-card sm:rounded-3xl sm:shadow-[0_30px_80px_-20px_rgb(0_0_0/0.6)]">
          <PortfolioChat
            variant="drawer"
            headingId={titleId}
            autofocus={open}
            onClose={closePanel}
          />
        </div>
      </dialog>
    </>
  );
}

export { useChatPanel };
