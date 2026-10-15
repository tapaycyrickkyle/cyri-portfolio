import { NextResponse, type NextRequest } from "next/server";

import { createPublicSupabaseClient } from "../../../../lib/reviews/public-client";
import { consumeRateLimit } from "../../../../lib/reviews/rate-limit";
import { hashReviewToken, parseReviewSubmission } from "../../../../lib/reviews/validation";

export const dynamic = "force-dynamic";

const responseHeaders = {
  "Cache-Control": "no-store",
};

function jsonResponse(body: Record<string, unknown>, status: number) {
  return NextResponse.json(body, {
    headers: responseHeaders,
    status,
  });
}

function isSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  const requestOrigin = request.nextUrl?.origin;
  if (origin && requestOrigin) {
    return origin === requestOrigin;
  }

  const referer = request.headers.get("referer");
  if (!referer || !requestOrigin) {
    return false;
  }

  try {
    return new URL(referer).origin === requestOrigin;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return jsonResponse({ error: "This request is not allowed." }, 403);
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 20_000) {
    return jsonResponse({ error: "The review is too large." }, 413);
  }

  if (!(await consumeRateLimit("review-submit", request.headers))) {
    return jsonResponse({ error: "Please try again later." }, 429);
  }

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return jsonResponse({ error: "Enter the requested review details." }, 400);
  }

  const parsed = parseReviewSubmission(input);
  if ("error" in parsed) {
    return jsonResponse({ error: parsed.error }, 400);
  }

  const supabase = createPublicSupabaseClient();
  if (!supabase) {
    return jsonResponse({ error: "The review service is temporarily unavailable." }, 503);
  }

  const { error } = await supabase.rpc("submit_client_review", {
    p_display_name_consent: parsed.data.displayNameConsent,
    p_rating: parsed.data.rating,
    p_review_text: parsed.data.reviewText,
    p_token_hash: hashReviewToken(parsed.data.token),
  });

  if (error) {
    return jsonResponse({ error: "This review link is not available." }, 400);
  }

  return jsonResponse({ ok: true }, 201);
}
