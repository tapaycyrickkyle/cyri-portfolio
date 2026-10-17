"use client";

import { useState } from "react";

import { Icon } from "./portfolio-icon";
import {
  NotificationModal,
  type NotificationTone,
} from "./ui/notification-modal";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

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

type ContactNotification = {
  tone: NotificationTone;
  title: string;
  message: string;
};

export default function ContactForm({ email, endpoint }: ContactFormProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [notification, setNotification] = useState<ContactNotification | null>(null);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = form.name.trim();
    const senderEmail = form.email.trim();
    const message = form.message.trim();

    if (!name || !senderEmail || !message) {
      setNotification({
        tone: "warning",
        title: "Complete the form",
        message: "Please fill in your name, email, and message first.",
      });
      return;
    }

    if (!endpoint) {
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
        setNotification({
          tone: "error",
          title: "Message not sent",
          message: "Something went wrong while sending. Please try again or use the email link.",
        });
        return;
      }

      setForm(initialState);
      setNotification({
        tone: "success",
        title: "Message sent",
        message: "Thank you for reaching out. Your message has been received.",
      });
    } catch {
      setNotification({
        tone: "error",
        title: "Message not sent",
        message: "Message could not be sent right now. Please try again or use the email link.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setNotification({
        tone: "success",
        title: "Email copied",
        message: "The email address is ready to paste.",
      });

      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setNotification({
        tone: "error",
        title: "Copy unavailable",
        message: "Copy is not available here. Please use the email address directly.",
      });
    }
  }

  return (
    <>
      <NotificationModal
        open={Boolean(notification)}
        tone={notification?.tone ?? "info"}
        title={notification?.title ?? "Contact"}
        message={notification?.message ?? ""}
        onClose={() => setNotification(null)}
      />

      <form
        action={endpoint}
        method="POST"
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-soft"
            >
              Name
            </label>
            <Input
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
            <Input
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
          <Textarea
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
          <Button
            type="submit"
            disabled={!endpoint || isSubmitting}
            suppressHydrationWarning
            className="primary-button w-full justify-center sm:flex-1 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
          <Button
            type="button"
            onClick={handleCopy}
            suppressHydrationWarning
            variant="outline"
            className="secondary-button w-full sm:w-auto"
          >
            <Icon name={copied ? "check" : "copy"} className="size-4" />
            {copied ? "Copied" : "Copy Email"}
          </Button>
        </div>

      </form>
    </>
  );
}
