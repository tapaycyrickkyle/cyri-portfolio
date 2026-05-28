"use client";

import { useState } from "react";

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

export default function ContactForm({ email }: { email: string }) {
  const [form, setForm] = useState<FormState>(initialState);
  const [feedback, setFeedback] = useState("");
  const [copied, setCopied] = useState(false);

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
    setFeedback("");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = form.name.trim();
    const senderEmail = form.email.trim();
    const message = form.message.trim();

    if (!name || !senderEmail || !message) {
      setFeedback("Please fill in your name, email, and message first.");
      return;
    }

    const subject = `Portfolio inquiry from ${name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${senderEmail}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setFeedback("Your email app should open with a pre-filled draft.");
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

  return (
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
          <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-soft">
            {form.message.length}/1200
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          suppressHydrationWarning
          className="primary-button w-full justify-center sm:flex-1"
        >
          Send Message
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
        {feedback || "Sending opens your default mail app with a ready-made message."}
      </p>
    </form>
  );
}
