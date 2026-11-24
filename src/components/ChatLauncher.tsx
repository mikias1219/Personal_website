"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { PortfolioChat } from "./PortfolioChat";

/**
 * A floating "Ask about Mikias" button that opens the same conversation in a
 * drawer. It hides while the main chat on the home page is on screen.
 */
export function ChatLauncher() {
  const pathname = usePathname();
  return <FloatingChat key={pathname} />;
}

function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [mainChatVisible, setMainChatVisible] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) dialog.current?.showModal();
    else if (dialog.current?.open) dialog.current.close();
  }, [open]);

  useEffect(() => {
    const target = document.getElementById("ask");
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setMainChatVisible(entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <button
        ref={launcher}
        type="button"
        className={`chat-launcher ${mainChatVisible ? "is-hidden" : ""}`.trim()}
        aria-haspopup="dialog"
        inert={mainChatVisible}
        onClick={() => setOpen(true)}
      >
        <Icon name="spark" /> Ask about Mikias
      </button>
      <dialog
        ref={dialog}
        className="chat-drawer"
        aria-labelledby="drawer-chat-title"
        onClick={(event) => {
          const target = event.target as HTMLElement;
          if (target === dialog.current || target.closest("a")) setOpen(false);
        }}
        onCancel={(event) => {
          event.preventDefault();
          setOpen(false);
          launcher.current?.focus();
        }}
        onClose={() => {
          setOpen(false);
          launcher.current?.focus();
        }}
      >
        {open && (
          <PortfolioChat
            variant="drawer"
            headingId="drawer-chat-title"
            autofocus
            onClose={() => setOpen(false)}
          />
        )}
      </dialog>
    </>
  );
}
