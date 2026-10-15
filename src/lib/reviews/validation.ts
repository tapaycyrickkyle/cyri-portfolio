import "server-only";

import { createHash, createHmac, randomBytes } from "node:crypto";

const TOKEN_PATTERN = /^[A-Za-z0-9_-]{43}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type InvitationData = {
  client_email: string | null;
  client_name: string;
  expires_at: string;
  internal_notes: string | null;
  project_name: string;
};

type InvitationParseResult =
  | { data: InvitationData; error?: never }
  | { data?: never; error: string };

type ReviewSubmissionData = {
  displayNameConsent: boolean;
  rating: number;
  reviewText: string;
  token: string;
};

type ReviewSubmissionParseResult =
  | { data: ReviewSubmissionData; error?: never }
  | { data?: never; error: string };

export const REVIEW_TEXT_MIN_LENGTH = 20;
export const REVIEW_TEXT_MAX_LENGTH = 5_000;

function readString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidDate(value: Date) {
  return !Number.isNaN(value.getTime());
}

export function generateReviewToken() {
  return randomBytes(32).toString("base64url");
}

export function isReviewTokenFormat(token: string) {
  return TOKEN_PATTERN.test(token);
}

export function hashReviewToken(token: string) {
  return createHash("sha256").update(token, "utf8").digest("hex");
}

export function parseInvitationForm(formData: FormData): InvitationParseResult {
  const clientName = readString(formData.get("clientName"));
  const clientEmail = readString(formData.get("clientEmail"));
  const projectName = readString(formData.get("projectName"));
  const internalNotes = readString(formData.get("internalNotes"));
  const expiration = readString(formData.get("expiration"));
  const customExpiration = readString(formData.get("customExpiration"));

  if (!clientName || clientName.length > 160) {
    return { error: "Enter a client name no longer than 160 characters." };
  }

  if (clientEmail && (clientEmail.length > 320 || !EMAIL_PATTERN.test(clientEmail))) {
    return { error: "Enter a valid client email address or leave it blank." };
  }

  if (!projectName || projectName.length > 160) {
    return { error: "Enter a project or service name no longer than 160 characters." };
  }

  if (internalNotes.length > 2_000) {
    return { error: "Internal notes must be 2,000 characters or fewer." };
  }

  let expiresAt: Date;
  if (expiration === "7" || expiration === "14" || expiration === "30") {
    expiresAt = new Date(Date.now() + Number(expiration) * 24 * 60 * 60 * 1_000);
  } else if (expiration === "custom") {
    expiresAt = new Date(`${customExpiration}T23:59:59.999Z`);
  } else {
    return { error: "Choose a valid invitation expiration period." };
  }

  const maximumExpiration = new Date(Date.now() + 366 * 24 * 60 * 60 * 1_000);
  if (
    !isValidDate(expiresAt) ||
    expiresAt.getTime() <= Date.now() + 60 * 60 * 1_000 ||
    expiresAt.getTime() > maximumExpiration.getTime()
  ) {
    return { error: "Choose an expiration date within the next year." };
  }

  return {
    data: {
      client_email: clientEmail || null,
      client_name: clientName,
      expires_at: expiresAt.toISOString(),
      internal_notes: internalNotes || null,
      project_name: projectName,
    },
  };
}

export function parseReviewSubmission(input: unknown): ReviewSubmissionParseResult {
  if (!input || typeof input !== "object") {
    return { error: "Enter the requested review details." };
  }

  const value = input as Record<string, unknown>;
  const token = typeof value.token === "string" ? value.token.trim() : "";
  const reviewText =
    typeof value.reviewText === "string" ? value.reviewText.trim() : "";
  const rating = Number(value.rating);
  const displayNameConsent = value.displayNameConsent === true;

  if (!isReviewTokenFormat(token)) {
    return { error: "This review link is not available." };
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { error: "Choose a rating from 1 to 5 stars." };
  }

  if (
    reviewText.length < REVIEW_TEXT_MIN_LENGTH ||
    reviewText.length > REVIEW_TEXT_MAX_LENGTH
  ) {
    return {
      error: `Feedback must be between ${REVIEW_TEXT_MIN_LENGTH} and ${REVIEW_TEXT_MAX_LENGTH} characters.`,
    };
  }

  return {
    data: {
      displayNameConsent,
      rating,
      reviewText,
      token,
    },
  };
}

export function getClientIdentifier(headers: Pick<Headers, "get">) {
  const forwardedFor = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return (
    forwardedFor ||
    headers.get("x-real-ip")?.trim() ||
    "unknown-client"
  );
}

export function getRateLimitBucket(scope: string, identifier: string) {
  const secret = process.env.REVIEW_RATE_LIMIT_SECRET?.trim();
  if (!secret) {
    return null;
  }

  return createHmac("sha256", secret)
    .update(`${scope}:${identifier}`, "utf8")
    .digest("hex");
}
