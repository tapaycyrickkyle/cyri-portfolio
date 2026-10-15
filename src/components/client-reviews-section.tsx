import { Star } from "lucide-react";

import { getPublishedReviews } from "../lib/reviews/data";
import Reveal from "./reveal";

export default async function ClientReviewsSection() {
  const reviews = await getPublishedReviews();

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className="section-shell" aria-labelledby="client-feedback-heading">
      <Reveal>
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Client feedback</p>
          <h2 id="client-feedback-heading" className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            Work should make things clearer.
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted sm:text-base md:text-lg">
            A few words from clients who chose to share their experience.
          </p>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {reviews.map((review, index) => (
          <Reveal key={review.id} delay={index * 80}>
            <article className="surface-card flex h-full flex-col p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-1" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }, (_, starIndex) => (
                    <Star
                      key={starIndex}
                      className={`size-4 ${starIndex < review.rating ? "fill-current text-foreground" : "text-muted-soft"}`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                {review.verified_client ? (
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">Verified client</span>
                ) : null}
              </div>
              <blockquote className="mt-5 flex-1 text-base leading-7 text-foreground sm:text-lg sm:leading-8">
                “{review.review_text}”
              </blockquote>
              <footer className="mt-6 border-t border-outline/60 pt-4">
                <p className="text-sm font-medium text-foreground">{review.client_name ?? "Client feedback"}</p>
                <p className="mt-1 font-mono text-[11px] text-muted">{review.project_name}</p>
              </footer>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
