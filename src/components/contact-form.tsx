"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { Icon } from "./portfolio-icon";

type FormState = {
  name: string;
  email: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  message: "",
};

type ContactFormProps = {
  email: string;
  endpoint?: string;
};

export default function ContactForm({ email, endpoint }: ContactFormProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [feedback, setFeedback] = useState("");
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!showSuccessModal) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setShowSuccessModal(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showSuccessModal]);

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
    setFeedback("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = form.name.trim();
    const senderEmail = form.email.trim();
    const message = form.message.trim();

    if (!name || !senderEmail || !message) {
      setFeedback("Please fill in your name, email, and message first.");
      return;
    }

    if (!endpoint) {
      setFeedback("Add your Formspree endpoint first to enable direct form submissions.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email: senderEmail,
          message,
          _subject: `Portfolio inquiry from ${name}`,
        }),
      });

      if (!response.ok) {
        setFeedback("Something went wrong while sending. Please try again or use the email link.");
        return;
      }

      setForm(initialState);
      setFeedback("");
      setShowSuccessModal(true);
    } catch {
      setFeedback("Message could not be sent right now. Please try again or use the email link.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setFeedback("Email copied to clipboard.");

      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setFeedback("Copy is not available here. Please use the email address directly.");
    }
  }

  const successModal = showSuccessModal ? (
    <div
      className="contact-success-overlay fixed inset-0 z-[999] grid place-items-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-success-title"
      onClick={() => setShowSuccessModal(false)}
    >
      <div
        className="dialog-panel contact-success-modal relative w-full max-w-[min(92vw,30rem)] overflow-hidden border border-outline bg-surface p-5 text-center shadow-[var(--shadow-panel)] sm:p-7"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close success message"
          className="contact-success-close"
          onClick={() => setShowSuccessModal(false)}
        >
          <span aria-hidden="true" className="contact-success-close-glyph">&times;</span>
        </button>

        <div className="contact-success-icon">
          <Icon name="check" className="size-6" />
        </div>

        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-soft">
          Message sent
        </p>
        <h3
          id="contact-success-title"
          className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-foreground"
        >
          The message is sent successfully.
        </h3>
        <p className="mx-auto mt-3 max-w-[26rem] text-sm leading-7 text-muted sm:text-base">
          Thank you for reaching out. Your message has been received.
        </p>

        <button
          type="button"
          className="primary-button mt-6 w-full justify-center"
          onClick={() => setShowSuccessModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  ) : null;

  return (
    <>
      {isMounted && successModal ? createPortal(successModal, document.body) : null}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-soft"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="Your Name"
              suppressHydrationWarning
              className="form-field"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-soft"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="your@email.com"
              suppressHydrationWarning
              className="form-field"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="message"
            className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-soft"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={form.message}
            onChange={(event) => updateField("message", event.target.value)}
            placeholder="Tell me about your project..."
            maxLength={1200}
            suppressHydrationWarning
            className="form-field resize-none"
          />
          <div className="flex flex-col items-start gap-2 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <span className="ml-auto shrink-0 text-right font-mono text-[11px] uppercase tracking-[0.18em] text-muted-soft">
              {form.message.length}/1200
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={!endpoint || isSubmitting}
            suppressHydrationWarning
            className="primary-button w-full justify-center sm:flex-1 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
          <button
            type="button"
            onClick={handleCopy}
            suppressHydrationWarning
            className="secondary-button w-full sm:w-auto"
          >
            <Icon name={copied ? "check" : "copy"} className="size-4" />
            {copied ? "Copied" : "Copy Email"}
          </button>
        </div>

        <p className="min-h-6 text-sm text-muted">
          {feedback ||
            (endpoint
              ? "This form sends directly through Formspree."
              : "Add your Formspree endpoint to enable direct form submissions.")}
        </p>
      </form>
    </>
  );
}
