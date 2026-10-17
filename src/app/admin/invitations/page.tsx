import type { Metadata } from "next";

import { DismissibleNotification } from "../../../components/ui/notification-modal";
import AdminShell from "../admin-shell";
import InvitationForm from "./invitation-form";
import InvitationList from "./invitation-list";
import { requireAdmin } from "../../../lib/reviews/auth";
import { getAdminInvitations } from "../../../lib/reviews/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Review invitations | Cyrick.Tapay",
};

export default async function AdminInvitationsPage() {
  const { user } = await requireAdmin();
  const invitations = await getAdminInvitations();

  return (
    <AdminShell email={user.email ?? "Administrator"}>
      <div className="space-y-8">
        <div className="border-b border-outline pb-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Client feedback</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.06em] text-foreground sm:text-4xl">
            Review invitations
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted sm:text-base">
            Generate a private, single-use link for a client. The raw link is shown only when it is created or regenerated.
          </p>
        </div>

        <InvitationForm />

        <section aria-labelledby="invitation-list-heading" className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 id="invitation-list-heading" className="text-xl font-semibold tracking-[-0.04em] text-foreground">
                Invitation history
              </h2>
              <p className="mt-1 text-sm text-muted">Tokens are never displayed or returned from the invitation list.</p>
            </div>
          </div>
          {invitations ? (
            <InvitationList invitations={invitations} />
          ) : (
            <DismissibleNotification
              tone="warning"
              title="Invitation data is unavailable"
              message="Confirm that the Supabase migration has been run and that this account is allowlisted."
            />
          )}
        </section>
      </div>
    </AdminShell>
  );
}
