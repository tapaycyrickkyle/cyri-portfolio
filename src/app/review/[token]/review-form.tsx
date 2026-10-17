"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Send, Star } from "lucide-react";

export default function ReviewForm({
  clientName,
  projectName,
  token,
}: {
  clientName: string;
  projectName: string;
  token: string;
}) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (rating < 1 || rating > 5) {
      setError("Choose a rating from 1 to 5 stars.");
      return;
    }

    if (reviewText.trim().length < 20) {
      setError("Please share at least 20 characters of feedback.");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/reviews/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          displayNameConsent: true,
          rating,
          reviewText,
          token,
        }),
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Review submission failed.");
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setError("This review could not be submitted right now. Please try again later or request a new link.");
    }
  }

  if (status === "success") {
    return (
      <section className="mt-8 border border-[#7aa891] bg-[#e8f4ed] p-6 text-[#153b2d] dark:border-[#86c9ad] dark:bg-[#17372d] dark:text-[#ecfff5]" role="status">
        <CheckCircle2 className="size-6" aria-hidden="true" />
        <h2 className="mt-4 text-xl font-semibold tracking-[-0.04em]">Thank you for your feedback.</h2>
        <p className="mt-2 text-sm leading-6">Your response was submitted for review. You can close this page now.</p>
      </section>
    );
  }

  return (
    <form onSubmit={submitReview} className="mt-8 space-y-6 border border-outline bg-surface p-5 sm:p-8">
      <div className="grid gap-4 border-b border-outline pb-5 sm:grid-cols-2">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Client</p>
          <p className="mt-1 text-sm font-medium text-foreground">{clientName}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Project</p>
          <p className="mt-1 text-sm font-medium text-foreground">{projectName}</p>
        </div>
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-foreground">How would you rate the experience?</legend>
        <div className="mt-3 flex flex-wrap gap-2" aria-label="Rating from 1 to 5 stars">
          {Array.from({ length: 5 }, (_, index) => {
            const value = index + 1;
            const selected = value <= rating;
            return (
              <button
                key={value}
                type="button"
                aria-label={`${value} ${value === 1 ? "star" : "stars"}`}
                aria-pressed={rating === value}
                onClick={() => setRating(value)}
                className="flex size-11 items-center justify-center border border-outline transition-colors hover:border-outline-strong hover:bg-surface-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              >
                <Star className={`size-5 ${selected ? "fill-current text-foreground" : "text-muted"}`} aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="space-y-2">
        <label htmlFor="review-text" className="text-sm font-medium text-foreground">
          Your feedback
        </label>
        <textarea
          id="review-text"
          value={reviewText}
          onChange={(event) => setReviewText(event.target.value)}
          minLength={20}
          maxLength={5_000}
          required
          rows={7}
          placeholder="What was useful, clear, or valuable about the work?"
          className="w-full resize-y border border-outline bg-background px-3 py-3 text-base leading-7 text-foreground placeholder:text-muted-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        />
        <p className="text-right font-mono text-[11px] text-muted">{reviewText.length}/5000</p>
      </div>

      {error ? (
        <p role="alert" className="border border-red-800/30 bg-red-50 px-3 py-2 text-sm leading-6 text-red-950 dark:bg-red-950/20 dark:text-red-100">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex min-h-11 items-center gap-2 border border-foreground bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-surface-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground disabled:cursor-not-allowed disabled:opacity-55"
      >
        <Send className="size-4" aria-hidden="true" />
        {status === "submitting" ? "Submitting…" : "Submit feedback"}
      </button>
    </form>
  );
}
