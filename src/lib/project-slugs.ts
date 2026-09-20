export const CASE_STUDY_SLUGS = [
  "business-chatbot-ai",
  "doro",
  "tesda-e-assess",
] as const;

export function projectSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
