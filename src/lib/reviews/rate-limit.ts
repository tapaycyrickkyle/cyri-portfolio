import "server-only";

import { createPublicSupabaseClient } from "./public-client";
import { getClientIdentifier, getRateLimitBucket } from "./validation";

export async function consumeRateLimit(
  scope: "admin-login" | "review-validation" | "review-submit",
  headers: Pick<Headers, "get">,
) {
  const bucket = getRateLimitBucket(scope, getClientIdentifier(headers));
  const supabase = createPublicSupabaseClient();

  if (!bucket || !supabase) {
    return false;
  }

  const { data, error } = await supabase.rpc("consume_review_rate_limit", {
    p_bucket_key: bucket,
    p_scope: scope,
  });

  return !error && data === true;
}
