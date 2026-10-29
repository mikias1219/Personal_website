"use client";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
const Chat = dynamic(
  () => import("./PortfolioChat").then((m) => m.PortfolioChat),
  {
    loading: () => (
      <p className="chat-loading" role="status">
        Loading the assistant…
      </p>
    ),
  },
);
export function ChatLauncher() {
  const pathname = usePathname();
  return pathname === "/" ? null : <FloatingChat key={pathname} />;
}
function FloatingChat() {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (open) dialog.current?.showModal();
    else dialog.current?.close();
  }, [open]);
  return (
    <>
      <button
        ref={launcher}
        className="chat-launcher"
        aria-label="Open Ask my portfolio"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        ✳ <span>Ask my portfolio</span>
      </button>
      <dialog
        ref={dialog}
        className="chat-dialog"
        aria-labelledby="chat-dialog-title"
        onCancel={() => {
          setOpen(false);
          launcher.current?.focus();
        }}
        onClose={() => {
          setOpen(false);
          launcher.current?.focus();
        }}
      >
        <div className="chat-dialog-title">
          <h2 id="chat-dialog-title">Ask my portfolio</h2>
          <button
            className="icon-button"
            aria-label="Close assistant"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>
        {open && <Chat autofocus />}
      </dialog>
    </>
  );
}
