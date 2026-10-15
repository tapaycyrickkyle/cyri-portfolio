"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import { SITE_URL } from "../site";
import { requireAdmin } from "./auth";
import type { ActionResult, ReviewStatus } from "./types";
import {
  generateReviewToken,
  hashReviewToken,
  parseInvitationForm,
} from "./validation";

const failedAction = (message = "The requested action could not be completed."): ActionResult => ({
  message,
  ok: false,
});

const successfulAction = (message: string, link?: string): ActionResult => ({
  link,
  message,
  ok: true,
});

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

function refreshReviewSurfaces() {
  revalidateTag("published-reviews", "max");
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/reviews");
}

export async function createInvitation(
  _previousState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const { supabase, user } = await requireAdmin();
  const parsed = parseInvitationForm(formData);

  if ("error" in parsed) {
    return failedAction(parsed.error);
  }

  const token = generateReviewToken();
  const { error } = await supabase.from("review_invitations").insert({
    ...parsed.data,
    created_by: user.id,
    token_hash: hashReviewToken(token),
  });

  if (error) {
    return failedAction("The invitation could not be created. Check the database setup and try again.");
  }

  revalidatePath("/admin");
  revalidatePath("/admin/invitations");

  return successfulAction(
    "Invitation created. Copy the private link below and share it directly with the client.",
    `${SITE_URL}/review/${token}`,
  );
}

export async function revokeInvitation(invitationId: string): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  if (!isUuid(invitationId)) {
    return failedAction();
  }

  const { data, error } = await supabase
    .from("review_invitations")
    .update({ revoked_at: new Date().toISOString() })
    .eq("id", invitationId)
    .is("used_at", null)
    .is("revoked_at", null)
    .select("id")
    .maybeSingle();

  if (error || !data) {
    return failedAction("This invitation is no longer active.");
  }

  revalidatePath("/admin");
  revalidatePath("/admin/invitations");
  return successfulAction("Invitation revoked.");
}

export async function regenerateInvitation(invitationId: string): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  if (!isUuid(invitationId)) {
    return failedAction();
  }

  const token = generateReviewToken();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1_000).toISOString();
  const { error } = await supabase.rpc("regenerate_review_invitation", {
    p_expires_at: expiresAt,
    p_invitation_id: invitationId,
    p_token_hash: hashReviewToken(token),
  });

  if (error) {
    return failedAction("The invitation could not be regenerated. It may already have been used.");
  }

  revalidatePath("/admin");
  revalidatePath("/admin/invitations");
  return successfulAction(
    "A replacement invitation was created. The previous link is no longer active.",
    `${SITE_URL}/review/${token}`,
  );
}

export async function moderateReview(
  reviewId: string,
  requestedStatus: ReviewStatus,
  reason = "",
): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  if (!isUuid(reviewId) || !["pending", "published", "rejected"].includes(requestedStatus)) {
    return failedAction();
  }

  const moderationReason = reason.trim().slice(0, 2_000);
  if (requestedStatus === "rejected" && !moderationReason) {
    return failedAction("Add a short internal reason before rejecting this review.");
  }

  const { data, error } = await supabase
    .from("client_reviews")
    .update({
      moderation_reason:
        requestedStatus === "rejected"
          ? moderationReason
          : requestedStatus === "pending"
            ? moderationReason || "Unpublished for further review."
            : null,
      published_at:
        requestedStatus === "published" ? new Date().toISOString() : null,
      status: requestedStatus,
      updated_at: new Date().toISOString(),
    })
    .eq("id", reviewId)
    .select("id")
    .maybeSingle();

  if (error || !data) {
    return failedAction("The review could not be updated.");
  }

  refreshReviewSurfaces();
  return successfulAction(
    requestedStatus === "published"
      ? "Review published."
      : requestedStatus === "rejected"
        ? "Review rejected and retained for internal records."
        : "Review unpublished and returned to pending moderation.",
  );
}

export async function deleteReview(reviewId: string): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  if (!isUuid(reviewId)) {
    return failedAction();
  }

  const { data, error } = await supabase
    .from("client_reviews")
    .delete()
    .eq("id", reviewId)
    .select("id")
    .maybeSingle();

  if (error || !data) {
    return failedAction("The review could not be deleted.");
  }

  refreshReviewSurfaces();
  return successfulAction("Review deleted.");
}

export async function logoutAdmin() {
  const { createSupabaseServerClient } = await import("../supabase/server");
  const supabase = await createSupabaseServerClient();
  await supabase?.auth.signOut();
  const { redirect } = await import("next/navigation");
  redirect("/admin/login");
}
