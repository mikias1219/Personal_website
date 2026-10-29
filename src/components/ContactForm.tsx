"use client";
import { useState, useRef } from "react";
import { contactSchema } from "@/lib/validation";
import { site } from "@/data/profile";
type Fields = "name" | "email" | "message";
export function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<Partial<Record<Fields, string>>>({});
  const [error, setError] = useState("");
  const statusRef = useRef<HTMLParagraphElement>(null);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const parsed = contactSchema.safeParse(
      Object.fromEntries(new FormData(form)),
    );
    if (!parsed.success) {
      const e = parsed.error.flatten().fieldErrors;
      setErrors({
        name: e.name?.[0],
        email: e.email?.[0],
        message: e.message?.[0],
      });
      const key = (["name", "email", "message"] as const).find(
        (k) => e[k]?.length,
      );
      if (key) form.querySelector<HTMLElement>(`[name="${key}"]`)?.focus();
      return;
    }
    setErrors({});
    setError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not send.");
      setStatus("success");
      form.reset();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not send.");
      setStatus("error");
    }
    statusRef.current?.focus();
  }
  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="form-row">
        {(["name", "email"] as const).map((name) => (
          <div className="field" key={name}>
            <label htmlFor={`contact-${name}`}>
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
            />
            {errors[name] && (
              <p id={`${name}-error`} className="form-error">
                {errors[name]}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="field">
        <label htmlFor="contact-message">What are you working on?</label>
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
        />
        {errors.message && (
          <p id="message-error" className="form-error">
            {errors.message}
          </p>
        )}
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="company">Leave this empty</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <button
        type="submit"
        className="button button-primary"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending…" : "Send message ↗"}
      </button>
      <p
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className={`form-status ${status === "error" ? "form-error" : ""}`}
      >
        {status === "success" ? (
          "Thanks — your message has been sent."
        ) : status === "error" ? (
          <>
            {error}{" "}
            <a className="text-link" href={`mailto:${site.email}`}>
              Email {site.email}
            </a>
          </>
        ) : status === "sending" ? (
          "Sending your message…"
        ) : (
          ""
        )}
      </p>
    </form>
  );
}
