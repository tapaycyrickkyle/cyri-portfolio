import "server-only";

import { unstable_cache } from "next/cache";

import { requireAdmin } from "./auth";
import { createPublicSupabaseClient } from "./public-client";
import type {
  AdminInvitation,
  AdminReview,
  AdminSummary,
  InvitationStatus,
  InvitationWithStatus,
  PublicReview,
  ReviewStatus,
} from "./types";

const getCachedPublishedReviews = unstable_cache(
  async (): Promise<PublicReview[]> => {
    const supabase = createPublicSupabaseClient();
    if (!supabase) {
      return [];
    }

    const { data, error } = await supabase.rpc("get_published_client_reviews");
    if (error || !Array.isArray(data)) {
      return [];
    }

    return data as PublicReview[];
  },
  ["published-client-reviews"],
  { revalidate: 300, tags: ["published-reviews"] },
);

export async function getPublishedReviews() {
  return getCachedPublishedReviews();
}

function invitationStatus(invitation: AdminInvitation, now = Date.now()): InvitationStatus {
  if (invitation.revoked_at) {
    return "revoked";
  }

  if (invitation.used_at) {
    return "used";
  }

  if (new Date(invitation.expires_at).getTime() <= now) {
    return "expired";
  }

  return "active";
}

export async function getAdminSummary(): Promise<AdminSummary | null> {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase.rpc("get_review_dashboard_summary");

  if (error || !Array.isArray(data) || !data[0]) {
    return null;
  }

  const summary = data[0] as Record<string, unknown>;
  return {
    active_invitations: Number(summary.active_invitations ?? 0),
    expired_invitations: Number(summary.expired_invitations ?? 0),
    pending_reviews: Number(summary.pending_reviews ?? 0),
    published_reviews: Number(summary.published_reviews ?? 0),
    rejected_reviews: Number(summary.rejected_reviews ?? 0),
    revoked_invitations: Number(summary.revoked_invitations ?? 0),
    total_submitted: Number(summary.total_submitted ?? 0),
    used_invitations: Number(summary.used_invitations ?? 0),
  };
}

export async function getAdminReviews(status?: ReviewStatus) {
  const { supabase } = await requireAdmin();
  let query = supabase
    .from("client_reviews")
    .select(
      "id, invitation_id, client_name, project_name, rating, review_text, display_name_consent, status, verified_client, moderation_reason, submitted_at, published_at, updated_at",
    )
    .order("submitted_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;
  if (error || !Array.isArray(data)) {
    return null;
  }

  return data as AdminReview[];
}

export async function getAdminInvitations(): Promise<InvitationWithStatus[] | null> {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("review_invitations")
    .select(
      "id, client_name, client_email, project_name, internal_notes, expires_at, used_at, revoked_at, created_by, created_at",
    )
    .order("created_at", { ascending: false });

  if (error || !Array.isArray(data)) {
    return null;
  }

  return (data as AdminInvitation[]).map((invitation) => ({
    ...invitation,
    status: invitationStatus(invitation),
  }));
}

export function formatInvitationDate(value: string) {
  return new Intl.DateTimeFormat("en-PH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
