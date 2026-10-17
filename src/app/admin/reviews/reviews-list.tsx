"use client";

import { useState, useTransition } from "react";
import { Check, MessageSquareText, Star, Trash2, X } from "lucide-react";

import {
  deleteReview,
  moderateReview,
} from "../../../lib/reviews/actions";
import { NotificationModal } from "../../../components/ui/notification-modal";
import type { ActionResult, AdminReview, ReviewStatus } from "../../../lib/reviews/types";

type ConfirmationRequest = {
  action: () => void;
  confirmLabel: string;
  message: string;
  title: string;
};

export default function ReviewsList({ reviews }: { reviews: AdminReview[] }) {
  const [isPending, startTransition] = useTransition();
  const [notification, setNotification] = useState<ActionResult | null>(null);
  const [confirmation, setConfirmation] = useState<ConfirmationRequest | null>(null);
  const [rejection, setRejection] = useState<AdminReview | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  function runAction(action: () => Promise<ActionResult>) {
    startTransition(async () => {
      setNotification(await action());
    });
  }

  function moderate(review: AdminReview, status: ReviewStatus) {
    if (status === "rejected") {
      setRejection(review);
      setRejectionReason(review.moderation_reason ?? "");
      return;
    }

    runAction(() => moderateReview(review.id, status));
  }

  function confirmRejection() {
    if (!rejection) {
      return;
    }

    const reviewId = rejection.id;
    const reason = rejectionReason;
    setRejection(null);
    runAction(() => moderateReview(reviewId, "rejected", reason));
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
        onConfirm={() => {
          confirmation?.action();
          setConfirmation(null);
        }}
      />

      <NotificationModal
        open={Boolean(rejection)}
        tone="warning"
        title="Reject this review?"
        message="Add a short internal reason. This note stays in the private moderation archive."
        confirmLabel="Reject review"
        confirmPending={isPending}
        onClose={() => setRejection(null)}
        onConfirm={confirmRejection}
      >
        <div className="space-y-2">
          <label htmlFor="rejection-reason" className="text-sm font-medium text-foreground">
            Internal reason
          </label>
          <textarea
            id="rejection-reason"
            value={rejectionReason}
            onChange={(event) => setRejectionReason(event.target.value)}
            maxLength={2_000}
            rows={4}
            className="w-full resize-y border border-outline bg-background px-3 py-2 text-base leading-6 text-foreground placeholder:text-muted-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground sm:text-sm"
            placeholder="Why should this review remain unpublished?"
          />
        </div>
      </NotificationModal>

      <NotificationModal
        open={Boolean(notification?.message)}
        tone={notification?.ok ? "success" : "error"}
        title={notification?.ok ? "Review updated" : "Review action failed"}
        message={notification?.message ?? ""}
        onClose={() => setNotification(null)}
      />

      {reviews.length === 0 ? (
        <div className="border border-dashed border-outline-strong p-7 text-center">
          <MessageSquareText className="mx-auto size-6 text-muted" aria-hidden="true" />
          <p className="mt-3 text-sm leading-6 text-muted">No reviews match this filter.</p>
        </div>
      ) : (
        reviews.map((review) => (
          <ReviewCard
            key={review.id}
            disabled={isPending}
            review={review}
            onDelete={() => {
              setConfirmation({
                action: () => runAction(() => deleteReview(review.id)),
                confirmLabel: "Delete review",
                message: "This permanently removes the review and cannot be undone.",
                title: "Delete this review?",
              });
            }}
            onModerate={(status) => moderate(review, status)}
          />
        ))
      )}
    </div>
  );
}

function ReviewCard({
  disabled,
  onDelete,
  onModerate,
  review,
}: {
  disabled: boolean;
  onDelete: () => void;
  onModerate: (status: ReviewStatus) => void;
  review: AdminReview;
}) {
  return (
    <article className="border border-outline bg-surface p-5 sm:p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-lg font-semibold tracking-[-0.03em] text-foreground">
              {review.display_name_consent ? review.client_name : "Private client"}
            </h2>
            <StatusBadge status={review.status} />
            {review.verified_client ? (
              <span className="border border-outline px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                Verified
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-sm text-muted">{review.project_name}</p>
        </div>
        <div className="font-mono text-[11px] leading-5 text-muted sm:text-right">
          <p>Submitted {formatDate(review.submitted_at)}</p>
          {review.published_at ? <p>Published {formatDate(review.published_at)}</p> : null}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-1" aria-label={`${review.rating} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            className={`size-4 ${index < review.rating ? "fill-current text-foreground" : "text-muted-soft"}`}
            aria-hidden="true"
          />
        ))}
        <span className="ml-2 font-mono text-xs text-muted">{review.rating}/5</span>
      </div>

      <blockquote className="mt-5 border-l-2 border-outline-strong pl-4 text-base leading-7 text-foreground">
        {review.review_text}
      </blockquote>

      {review.moderation_reason ? (
        <p className="mt-5 bg-surface-soft p-3 text-sm leading-6 text-muted">
          <span className="font-medium text-foreground">Internal note:</span> {review.moderation_reason}
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-2 border-t border-outline/70 pt-4">
        {review.status !== "published" ? (
          <ActionButton disabled={disabled} icon={Check} onClick={() => onModerate("published")}>
            Publish
          </ActionButton>
        ) : null}
        {review.status !== "pending" ? (
          <ActionButton disabled={disabled} icon={MessageSquareText} onClick={() => onModerate("pending")}>
            Return to pending
          </ActionButton>
        ) : null}
        {review.status !== "rejected" ? (
          <ActionButton disabled={disabled} icon={X} onClick={() => onModerate("rejected")}>
            Reject
          </ActionButton>
        ) : null}
        <ActionButton danger disabled={disabled} icon={Trash2} onClick={onDelete}>
          Delete
        </ActionButton>
      </div>
    </article>
  );
}

function ActionButton({
  children,
  danger = false,
  disabled,
  icon: Icon,
  onClick,
}: {
  children: React.ReactNode;
  danger?: boolean;
  disabled: boolean;
  icon: typeof Check;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex min-h-10 items-center gap-2 border px-3 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground disabled:cursor-not-allowed disabled:opacity-55 ${
        danger
          ? "border-red-800/40 text-red-900 hover:bg-red-50 dark:text-red-100 dark:hover:bg-red-950/30"
          : "border-outline-strong text-foreground hover:bg-surface-soft"
      }`}
    >
      <Icon className="size-4" aria-hidden="true" />
      {children}
    </button>
  );
}

function StatusBadge({ status }: { status: ReviewStatus }) {
  const styles = {
    pending: "border-amber-800/30 bg-amber-50 text-amber-950 dark:bg-amber-950/20 dark:text-amber-100",
    published: "border-[#7aa891] bg-[#e8f4ed] text-[#153b2d] dark:border-[#86c9ad] dark:bg-[#17372d] dark:text-[#ecfff5]",
    rejected: "border-red-800/30 bg-red-50 text-red-950 dark:bg-red-950/20 dark:text-red-100",
  } as const;

  return (
    <span className={`border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] ${styles[status]}`}>
      {status}
    </span>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-PH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
