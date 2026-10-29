"use client";
import { useState, useRef } from "react";
import { site } from "@/data/profile";
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
      const key = (["name", "email", "message"] as const).find(
        (k) => issues[k],
      );
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
      {status === "error" && emailDraft && (
        <a className="button button-secondary" href={emailDraft}>
          Send with your email app ↗
        </a>
      )}
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
