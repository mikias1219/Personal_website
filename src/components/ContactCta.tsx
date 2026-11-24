"use client";

import { Mail, Sparkles } from "lucide-react";
import { site } from "@/data/profile";
import { useChatPanel } from "./ChatProvider";

export function ContactCta() {
  const { openPanel } = useChatPanel();
  return (
    <div className="btn-grad relative overflow-hidden rounded-[1.75rem] p-7 text-on-accent md:p-10">
      <div
        className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-white/20 blur-3xl"
        aria-hidden
      />
      <div className="relative flex flex-wrap items-center justify-between gap-6">
        <div className="max-w-xl">
          <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Hiring for a product or AI engineer?
          </h3>
          <p className="mt-2 text-[0.95rem] opacity-90">
            Ask the assistant first for instant answers, or email me directly.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={openPanel}
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-black/25 px-5 font-semibold backdrop-blur transition hover:bg-black/35"
            aria-haspopup="dialog"
          >
            <Sparkles className="size-4" aria-hidden /> Ask the AI
          </button>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 font-semibold text-slate-900 no-underline transition hover:bg-white/90"
          >
            <Mail className="size-4" aria-hidden /> Email me
          </a>
        </div>
      </div>
    </div>
  );
}
