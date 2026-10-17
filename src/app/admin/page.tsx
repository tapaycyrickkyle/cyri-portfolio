import Link from "next/link";
import { ArrowRight, ClipboardList, Link2, MessageSquareText } from "lucide-react";

import { DismissibleNotification } from "../../components/ui/notification-modal";
import AdminShell from "./admin-shell";
import { getAdminSummary } from "../../lib/reviews/data";
import { requireAdmin } from "../../lib/reviews/auth";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin overview | Cyrick.Tapay",
};

const summaryCards = [
  { key: "total_submitted", label: "Submitted reviews" },
  { key: "pending_reviews", label: "Pending moderation" },
  { key: "published_reviews", label: "Published reviews" },
  { key: "rejected_reviews", label: "Rejected reviews" },
  { key: "active_invitations", label: "Active invitations" },
  { key: "used_invitations", label: "Used invitations" },
  { key: "expired_invitations", label: "Expired invitations" },
  { key: "revoked_invitations", label: "Revoked invitations" },
] as const;

export default async function AdminOverviewPage() {
  const { user } = await requireAdmin();
  const summary = await getAdminSummary();

  return (
    <AdminShell email={user.email ?? "Administrator"}>
      <div className="space-y-8">
        <div className="flex flex-col justify-between gap-4 border-b border-outline pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              Private workspace
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.06em] text-foreground sm:text-4xl">
              Review administration
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted sm:text-base">
              Create private feedback invitations, review submissions, and publish only the responses you approve.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex min-h-10 items-center gap-2 self-start border border-outline-strong px-3 text-sm text-foreground transition-colors hover:bg-surface-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground sm:self-auto"
          >
            View portfolio
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        {summary ? (
          <section aria-labelledby="summary-heading" className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h2 id="summary-heading" className="text-lg font-semibold tracking-[-0.03em] text-foreground">
                Current activity
              </h2>
              <span className="font-mono text-xs text-muted">Live database counts</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {summaryCards.map(({ key, label }) => (
                <article key={key} className="border border-outline bg-surface p-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{label}</p>
                  <p className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-foreground">
                    {summary[key]}
                  </p>
                </article>
              ))}
            </div>
          </section>
        ) : (
          <DismissibleNotification
            tone="warning"
            title="Database setup is not available yet"
            message="Run the supplied Supabase migration and configure the server environment variables before using the private review workspace."
          />
        )}

        <section aria-labelledby="actions-heading" className="space-y-4">
          <h2 id="actions-heading" className="text-lg font-semibold tracking-[-0.03em] text-foreground">
            Manage feedback
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <AdminActionCard
              href="/admin/invitations"
              icon={Link2}
              title="Review invitations"
              description="Create a single-use private link for a client and track its status."
            />
            <AdminActionCard
              href="/admin/reviews?status=pending"
              icon={ClipboardList}
              title="Moderate pending reviews"
              description="Read new submissions and decide whether they belong on the portfolio."
            />
            <AdminActionCard
              href="/admin/reviews"
              icon={MessageSquareText}
              title="Review archive"
              description="Inspect published, rejected, and unpublished feedback retained internally."
            />
          </div>
        </section>
      </div>
    </AdminShell>
  );
}

function AdminActionCard({
  description,
  href,
  icon: Icon,
  title,
}: {
  description: string;
  href: string;
  icon: typeof Link2;
  title: string;
}) {
  return (
    <Link
      href={href}
      className="group border border-outline bg-surface p-5 transition-colors hover:border-outline-strong hover:bg-surface-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
    >
      <Icon className="size-5 text-muted transition-colors group-hover:text-foreground" aria-hidden="true" />
      <h3 className="mt-5 text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
      <span className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-foreground">
        Open
        <ArrowRight className="size-3.5" aria-hidden="true" />
      </span>
    </Link>
  );
}
