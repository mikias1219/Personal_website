"use client";

import { ArrowRight, Mail } from "lucide-react";
import { useRef, useState } from "react";
import { site } from "@/data/profile";
import { Button } from "./ui";

type Fields = "name" | "email" | "message";

export function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<Partial<Record<Fields, string>>>({});
  const [error, setError] = useState("");
  const [emailDraft, setEmailDraft] = useState<string | null>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      message: String(data.get("message") || "").trim(),
      company: String(data.get("company") || ""),
    };
    const issues: Partial<Record<Fields, string>> = {};
    if (values.name.length < 2)
      issues.name = "Please enter at least 2 characters.";
    const email = form.querySelector<HTMLInputElement>("[name=email]");
    if (!values.email || !email?.validity.valid)
      issues.email = "Please enter a valid email address.";
    if (values.message.length < 10)
      issues.message = "Please write at least 10 characters.";
    if (Object.keys(issues).length) {
      setErrors(issues);
      const key = (["name", "email", "message"] as const).find((k) => issues[k]);
      if (key) form.querySelector<HTMLElement>(`[name="${key}"]`)?.focus();
      return;
    }
    setEmailDraft(
      `mailto:${site.email}?subject=${encodeURIComponent(`Portfolio enquiry from ${values.name}`)}&body=${encodeURIComponent(`${values.message}\n\nFrom: ${values.name}\nReply to: ${values.email}`)}`,
    );
    setErrors({});
    setError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error || "Could not send.");
      setStatus("success");
      form.reset();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not send.");
      setStatus("error");
    }
    statusRef.current?.focus();
  }

  return (
    <form
      className="grid gap-4 rounded-2xl border border-line bg-surface p-5 shadow-card md:p-6"
      onSubmit={submit}
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {(["name", "email"] as const).map((name) => (
          <div className="grid gap-1.5" key={name}>
            <label htmlFor={`contact-${name}`} className="text-sm font-semibold">
              {name === "name" ? "Your name" : "Email address"}
            </label>
            <input
              id={`contact-${name}`}
              name={name}
              type={name === "email" ? "email" : "text"}
              autoComplete={name}
              required
              maxLength={name === "email" ? 254 : 100}
              aria-invalid={!!errors[name]}
              aria-describedby={errors[name] ? `${name}-error` : undefined}
              className="min-h-12 rounded-xl border border-line bg-bg px-3.5 outline-none focus:border-accent focus:ring-4 focus:ring-accent/15"
            />
            {errors[name] ? (
              <p id={`${name}-error`} className="text-sm text-danger">
                {errors[name]}
              </p>
            ) : null}
          </div>
        ))}
      </div>
      <div className="grid gap-1.5">
        <label htmlFor="contact-message" className="text-sm font-semibold">
          What are you working on?
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          minLength={10}
          maxLength={5000}
          placeholder="A role, a product idea, a problem to solve…"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="min-h-32 resize-y rounded-xl border border-line bg-bg px-3.5 py-3 outline-none focus:border-accent focus:ring-4 focus:ring-accent/15"
        />
        {errors.message ? (
          <p id="message-error" className="text-sm text-danger">
            {errors.message}
          </p>
        ) : null}
      </div>
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="company">Leave this empty</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? (
            "Sending…"
          ) : (
            <>
              Send message <ArrowRight className="size-4" />
            </>
          )}
        </Button>
        {status === "error" && emailDraft ? (
          <Button href={emailDraft} variant="secondary">
            Send with your email app <Mail className="size-4" />
          </Button>
        ) : null}
      </div>
      <p
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className={`min-h-5 text-sm ${status === "error" ? "text-danger" : "text-muted"}`}
      >
        {status === "success"
          ? "Thanks — your message has been sent."
          : status === "error"
            ? (
              <>
                {error}{" "}
                <a className="font-semibold text-accent underline" href={`mailto:${site.email}`}>
                  Email {site.email}
                </a>
              </>
            )
            : status === "sending"
              ? "Sending your message…"
              : ""}
      </p>
    </form>
  );
}
