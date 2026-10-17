export const REVIEW_STATUSES = ["pending", "published", "rejected"] as const;

export type ReviewStatus = (typeof REVIEW_STATUSES)[number];

export type InvitationStatus = "active" | "used" | "expired" | "revoked";

export type PublicReview = {
  id: string;
  client_name: string | null;
  project_name: string;
  rating: number;
  review_text: string;
  verified_client: boolean;
  published_at: string;
};

export type AdminReview = {
  id: string;
  invitation_id: string;
  client_name: string;
  project_name: string;
  rating: number;
  review_text: string;
  display_name_consent: boolean;
  status: ReviewStatus;
  verified_client: boolean;
  moderation_reason: string | null;
  submitted_at: string;
  published_at: string | null;
  updated_at: string;
};

export type AdminInvitation = {
  id: string;
  client_name: string;
  project_name: string;
  internal_notes: string | null;
  expires_at: string;
  used_at: string | null;
  revoked_at: string | null;
  created_by: string | null;
  created_at: string;
};

export type InvitationWithStatus = AdminInvitation & {
  status: InvitationStatus;
};

export type AdminSummary = {
  total_submitted: number;
  pending_reviews: number;
  published_reviews: number;
  rejected_reviews: number;
  active_invitations: number;
  used_invitations: number;
  expired_invitations: number;
  revoked_invitations: number;
};

export type ActionResult = {
  ok: boolean;
  message: string;
  link?: string;
};
