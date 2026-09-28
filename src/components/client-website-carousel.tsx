import type { ClientWebsiteItem } from "./portfolio-content";
import { Icon } from "./portfolio-icon";

export default function ClientWebsiteCarousel({
  websites,
}: {
  websites: ClientWebsiteItem[];
}) {
  if (websites.length === 0) {
    return null;
  }

  const hasMoreWebsites = websites.length > 5;

  return (
    <div className="client-websites-list">
      <div
        className={`client-websites-list-items ${
          hasMoreWebsites ? "client-websites-list-items-scrollable" : ""
        }`}
        role="list"
        aria-label="Business websites"
        tabIndex={hasMoreWebsites ? 0 : undefined}
      >
        {websites.map((website, index) => (
          <article key={website.title} className="client-website-list-item" role="listitem">
            <span className="client-website-list-index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="client-website-list-copy">
              <a
                href={website.href}
                target="_blank"
                rel="noreferrer"
                className="client-website-list-title"
              >
                {website.title}
              </a>
              <p>{website.category}</p>
            </div>

            <a
              href={website.href}
              target="_blank"
              rel="noreferrer"
              className="client-website-list-link"
            >
              Visit Website
              <Icon name="arrow" className="size-4" />
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
