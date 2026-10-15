import "server-only";

import { headers } from "next/headers";

import { createPublicSupabaseClient } from "./public-client";
import { consumeRateLimit } from "./rate-limit";
import { hashReviewToken, isReviewTokenFormat } from "./validation";

export type ReviewInvitationContext = {
  client_name: string;
  project_name: string;
};

export async function getReviewInvitationContext(token: string) {
  if (!isReviewTokenFormat(token)) {
    return null;
  }

  const requestHeaders = await headers();
  if (!(await consumeRateLimit("review-validation", requestHeaders))) {
    return null;
  }

  const supabase = createPublicSupabaseClient();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase.rpc("get_review_invitation_context", {
    p_token_hash: hashReviewToken(token),
  });

  if (error || !Array.isArray(data) || data.length === 0) {
    return null;
  }

  const context = data[0] as Partial<ReviewInvitationContext>;
  if (!context.client_name || !context.project_name) {
    return null;
  }

  return {
    client_name: context.client_name,
    project_name: context.project_name,
  } satisfies ReviewInvitationContext;
}
