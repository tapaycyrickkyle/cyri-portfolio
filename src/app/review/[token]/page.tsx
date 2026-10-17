import type { Metadata } from "next";

import ReviewForm from "./review-form";
import { getReviewInvitationContext } from "../../../lib/reviews/public";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Client feedback | Cyrick.Tapay",
  description: "Private client feedback form.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    googleBot: {
      index: false,
      follow: false,
      noarchive: true,
      nosnippet: true,
    },
  },
  alternates: null,
  openGraph: null,
  twitter: null,
};

export default async function ClientReviewPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const invitation = await getReviewInvitationContext(token);

  return (
    <main className="min-h-screen bg-background px-4 pb-10 pt-16 text-foreground sm:px-6 sm:pb-16 sm:pt-24">
      <div className="mx-auto w-full max-w-2xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Cyrick.Tapay</p>
        {invitation ? (
          <div className="mt-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Private client feedback</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.06em] text-foreground sm:text-5xl">
              How did the project go?
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted">
              Thank you for working with me. Your feedback helps me improve the way I build practical digital solutions.
            </p>
            <ReviewForm
              clientName={invitation.client_name}
              projectName={invitation.project_name}
              token={token}
            />
          </div>
        ) : (
          <div className="mt-8 border border-outline bg-surface p-6 sm:p-8">
            <h1 className="text-2xl font-semibold tracking-[-0.05em] text-foreground sm:text-3xl">
              This feedback link is not available.
            </h1>
            <p className="mt-4 text-sm leading-7 text-muted">
              The link may have expired, already been used, or been withdrawn. Please contact the person who sent it if you need a new invitation.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
