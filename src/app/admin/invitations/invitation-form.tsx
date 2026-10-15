"use client";

import { useActionState, useState } from "react";
import { Copy, Link2, Plus } from "lucide-react";

import { createInvitation } from "../../../lib/reviews/actions";
import type { ActionResult } from "../../../lib/reviews/types";

const initialActionState: ActionResult = {
  message: "",
  ok: false,
};

export default function InvitationForm() {
  const [expiration, setExpiration] = useState("30");
  const [state, formAction, pending] = useActionState(createInvitation, initialActionState);
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    if (!state.link) {
      return;
    }

    try {
      await navigator.clipboard.writeText(state.link);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1_800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section aria-labelledby="create-invitation-heading" className="border border-outline bg-surface p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center border border-outline bg-surface-soft">
          <Plus className="size-4" aria-hidden="true" />
        </span>
        <div>
          <h2 id="create-invitation-heading" className="text-xl font-semibold tracking-[-0.04em] text-foreground">
            Create an invitation
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted">Only include information you are comfortable using to identify the project to the invited client.</p>
        </div>
      </div>

      <form action={formAction} className="mt-6 grid gap-5 md:grid-cols-2">
        <Field label="Client name" name="clientName" required />
        <Field label="Client email (optional)" name="clientEmail" type="email" autoComplete="off" />
        <Field label="Project or service" name="projectName" required />

        <div className="space-y-2">
          <label htmlFor="invitation-expiration" className="text-sm font-medium text-foreground">
            Link expiration
          </label>
          <select
            id="invitation-expiration"
            name="expiration"
            value={expiration}
            onChange={(event) => setExpiration(event.target.value)}
            className="min-h-11 w-full border border-outline bg-background px-3 py-2 text-base text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground sm:text-sm"
          >
            <option value="7">7 days</option>
            <option value="14">14 days</option>
            <option value="30">30 days</option>
            <option value="custom">Custom date</option>
          </select>
        </div>

        {expiration === "custom" ? (
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="custom-expiration" className="text-sm font-medium text-foreground">
              Custom expiration date
            </label>
            <input
              id="custom-expiration"
              name="customExpiration"
              type="date"
              required
              className="min-h-11 border border-outline bg-background px-3 py-2 text-base text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground sm:text-sm"
            />
          </div>
        ) : (
          <input type="hidden" name="customExpiration" value="" />
        )}

        <div className="space-y-2 md:col-span-2">
          <label htmlFor="invitation-notes" className="text-sm font-medium text-foreground">
            Internal notes (optional)
          </label>
          <textarea
            id="invitation-notes"
            name="internalNotes"
            rows={3}
            maxLength={2_000}
            placeholder="Context for your own moderation workflow"
            className="w-full resize-y border border-outline bg-background px-3 py-2 text-base leading-6 text-foreground placeholder:text-muted-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground sm:text-sm"
          />
        </div>

        {state.message ? (
          <p
            role={state.ok ? "status" : "alert"}
            className={`md:col-span-2 border px-3 py-2 text-sm leading-6 ${
              state.ok
                ? "border-emerald-800/30 bg-emerald-50 text-emerald-950 dark:bg-emerald-950/20 dark:text-emerald-100"
                : "border-red-800/30 bg-red-50 text-red-950 dark:bg-red-950/20 dark:text-red-100"
            }`}
          >
            {state.message}
          </p>
        ) : null}

        {state.link ? (
          <div className="space-y-3 border border-outline-strong bg-background p-4 md:col-span-2">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Link2 className="size-4" aria-hidden="true" />
              Private review link
            </div>
            <p className="break-all font-mono text-xs leading-6 text-muted">{state.link}</p>
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex min-h-10 items-center gap-2 border border-outline-strong px-3 text-sm text-foreground transition-colors hover:bg-surface-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            >
              <Copy className="size-4" aria-hidden="true" />
              {copied ? "Copied" : "Copy link"}
            </button>
          </div>
        ) : null}

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex min-h-11 items-center gap-2 border border-foreground bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-surface-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground disabled:cursor-not-allowed disabled:opacity-55"
          >
            <Plus className="size-4" aria-hidden="true" />
            {pending ? "Creating…" : "Create private link"}
          </button>
        </div>
      </form>
    </section>
  );
}

function Field({
  autoComplete,
  label,
  name,
  required = false,
  type = "text",
}: {
  autoComplete?: string;
  label: string;
  name: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={`invitation-${name}`} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={`invitation-${name}`}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        maxLength={name === "clientEmail" ? 320 : 160}
        className="min-h-11 w-full border border-outline bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground sm:text-sm"
      />
    </div>
  );
}
