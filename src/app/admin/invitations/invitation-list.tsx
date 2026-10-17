"use client";

import { useState, useTransition } from "react";
import { Check, Copy, RefreshCw, ShieldAlert, X } from "lucide-react";

import {
  regenerateInvitation,
  revokeInvitation,
} from "../../../lib/reviews/actions";
import { NotificationModal } from "../../../components/ui/notification-modal";
import type {
  ActionResult,
  InvitationStatus,
  InvitationWithStatus,
} from "../../../lib/reviews/types";

const statusLabels: Record<InvitationStatus, string> = {
  active: "Active",
  expired: "Expired",
  revoked: "Revoked",
  used: "Used",
};

type ConfirmationRequest = {
  action: () => Promise<ActionResult>;
  confirmLabel: string;
  message: string;
  title: string;
};

export default function InvitationList({
  invitations,
}: {
  invitations: InvitationWithStatus[];
}) {
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<ActionResult | null>(null);
  const [notification, setNotification] = useState<ActionResult | null>(null);
  const [confirmation, setConfirmation] = useState<ConfirmationRequest | null>(null);
  const [copied, setCopied] = useState(false);

  function runAction(action: () => Promise<ActionResult>) {
    startTransition(async () => {
      const result = await action();
      setFeedback(result);
      setNotification(result);
      setCopied(false);
    });
  }

  function confirmAction() {
    if (!confirmation) {
      return;
    }

    const { action } = confirmation;
    setConfirmation(null);
    runAction(action);
  }

  async function copyLink(link?: string) {
    if (!link) {
      return;
    }

    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1_800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="space-y-4">
      <NotificationModal
        open={Boolean(confirmation)}
        tone="warning"
        title={confirmation?.title ?? "Confirm action"}
        message={confirmation?.message ?? "Confirm this action to continue."}
        confirmLabel={confirmation?.confirmLabel ?? "Confirm"}
        confirmPending={isPending}
        onClose={() => setConfirmation(null)}
        onConfirm={confirmAction}
      />

      <NotificationModal
        open={Boolean(notification?.message)}
        tone={notification?.ok ? "success" : "error"}
        title={notification?.ok ? "Invitation updated" : "Invitation action failed"}
        message={notification?.message ?? ""}
        onClose={() => setNotification(null)}
      />

      {feedback?.link ? (
        <div className="space-y-3 border border-outline-strong bg-surface p-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">Replacement link</p>
          <p className="break-all font-mono text-xs leading-6 text-muted">{feedback.link}</p>
          <button
            type="button"
            onClick={() => copyLink(feedback.link)}
            className="inline-flex min-h-10 items-center gap-2 border border-outline-strong px-3 text-sm text-foreground transition-colors hover:bg-surface-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            <Copy className="size-4" aria-hidden="true" />
            {copied ? "Copied" : "Copy link"}
          </button>
        </div>
      ) : null}

      {invitations.length === 0 ? (
        <p className="border border-dashed border-outline-strong p-5 text-sm leading-6 text-muted">
          No invitations have been created yet.
        </p>
      ) : (
        <div className="grid gap-4">
          {invitations.map((invitation) => (
            <InvitationCard
              key={invitation.id}
              invitation={invitation}
              disabled={isPending}
              onRegenerate={() => {
                setConfirmation({
                  action: () => regenerateInvitation(invitation.id),
                  confirmLabel: "Regenerate link",
                  message: "The current link will stop working and a replacement link will be created.",
                  title: "Regenerate this invitation?",
                });
              }}
              onRevoke={() => {
                setConfirmation({
                  action: () => revokeInvitation(invitation.id),
                  confirmLabel: "Revoke invitation",
                  message: "The client will no longer be able to use this private review link.",
                  title: "Revoke this invitation?",
                });
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function InvitationCard({
  disabled,
  invitation,
  onRegenerate,
  onRevoke,
}: {
  disabled: boolean;
  invitation: InvitationWithStatus;
  onRegenerate: () => void;
  onRevoke: () => void;
}) {
  const canRevoke = invitation.status === "active";
  const canRegenerate = invitation.status === "expired" || invitation.status === "revoked";

  return (
    <article className="border border-outline bg-surface p-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-lg font-semibold tracking-[-0.03em] text-foreground">{invitation.client_name}</h3>
            <span className={`inline-flex items-center gap-1.5 border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] ${statusClass(invitation.status)}`}>
              {invitation.status === "active" ? <Check className="size-3" aria-hidden="true" /> : <ShieldAlert className="size-3" aria-hidden="true" />}
              {statusLabels[invitation.status]}
            </span>
          </div>
          <p className="mt-1 text-sm text-muted">{invitation.project_name}{invitation.client_email ? ` · ${invitation.client_email}` : ""}</p>
        </div>
        <div className="text-left font-mono text-[11px] leading-5 text-muted sm:text-right">
          <p>Created {formatDate(invitation.created_at)}</p>
          <p>Expires {formatDate(invitation.expires_at)}</p>
          {invitation.used_at ? <p>Used {formatDate(invitation.used_at)}</p> : null}
        </div>
      </div>

      {invitation.internal_notes ? (
        <p className="mt-4 border-l-2 border-outline-strong pl-3 text-sm leading-6 text-muted">{invitation.internal_notes}</p>
      ) : null}

      {canRevoke || canRegenerate ? (
        <div className="mt-5 flex flex-wrap gap-2 border-t border-outline/70 pt-4">
          {canRevoke ? (
            <button
              type="button"
              disabled={disabled}
              onClick={onRevoke}
              className="inline-flex min-h-10 items-center gap-2 border border-red-800/40 px-3 text-sm text-red-900 transition-colors hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground disabled:cursor-not-allowed disabled:opacity-55 dark:text-red-100 dark:hover:bg-red-950/30"
            >
              <X className="size-4" aria-hidden="true" />
              Revoke
            </button>
          ) : null}
          {canRegenerate ? (
            <button
              type="button"
              disabled={disabled}
              onClick={onRegenerate}
              className="inline-flex min-h-10 items-center gap-2 border border-outline-strong px-3 text-sm text-foreground transition-colors hover:bg-surface-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground disabled:cursor-not-allowed disabled:opacity-55"
            >
              <RefreshCw className="size-4" aria-hidden="true" />
              Regenerate link
            </button>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-PH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function statusClass(status: InvitationStatus) {
  if (status === "active") {
    return "border-[#7aa891] bg-[#e8f4ed] text-[#153b2d] dark:border-[#86c9ad] dark:bg-[#17372d] dark:text-[#ecfff5]";
  }

  if (status === "used") {
    return "border-blue-800/30 bg-blue-50 text-blue-950 dark:bg-blue-950/20 dark:text-blue-100";
  }

  return "border-outline bg-surface-soft text-muted";
}
