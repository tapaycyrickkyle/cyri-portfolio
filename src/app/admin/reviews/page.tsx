import type { Metadata } from "next";
import Link from "next/link";

import { DismissibleNotification } from "../../../components/ui/notification-modal";
import AdminShell from "../admin-shell";
import ReviewsList from "./reviews-list";
import { requireAdmin } from "../../../lib/reviews/auth";
import { getAdminReviews } from "../../../lib/reviews/data";
import { REVIEW_STATUSES, type ReviewStatus } from "../../../lib/reviews/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Client reviews | Cyrick.Tapay",
};

export default async function AdminReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string | string[] }>;
}) {
  const { user } = await requireAdmin();
  const params = await searchParams;
  const requestedStatus = Array.isArray(params.status) ? params.status[0] : params.status;
  const status = isReviewStatus(requestedStatus) ? requestedStatus : undefined;
  const reviews = await getAdminReviews(status);

  return (
    <AdminShell email={user.email ?? "Administrator"}>
      <div className="space-y-8">
        <div className="border-b border-outline pb-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Private moderation</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.06em] text-foreground sm:text-4xl">
            Client reviews
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted sm:text-base">
            Read submitted feedback, retain moderation history, and publish only what is appropriate for the public portfolio.
          </p>
        </div>

        <nav aria-label="Review status filter" className="flex flex-wrap gap-2 border-b border-outline pb-4">
          <ReviewFilter href="/admin/reviews" active={!status} label="All" />
          {REVIEW_STATUSES.map((item) => (
            <ReviewFilter
              key={item}
              href={`/admin/reviews?status=${item}`}
              active={status === item}
              label={capitalize(item)}
            />
          ))}
        </nav>

        {reviews ? (
          <ReviewsList reviews={reviews} />
        ) : (
          <DismissibleNotification
            tone="warning"
            title="Review data is unavailable"
            message="Confirm that the Supabase migration has been run and that this account is allowlisted."
          />
        )}
      </div>
    </AdminShell>
  );
}

function ReviewFilter({
  active,
  href,
  label,
}: {
  active: boolean;
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`inline-flex min-h-9 items-center border px-3 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground ${
        active
          ? "border-foreground bg-foreground text-background"
          : "border-outline text-muted hover:border-outline-strong hover:bg-surface-soft hover:text-foreground"
      }`}
    >
      {label}
    </Link>
  );
}

function isReviewStatus(value: string | undefined): value is ReviewStatus {
  return value !== undefined && REVIEW_STATUSES.includes(value as ReviewStatus);
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
