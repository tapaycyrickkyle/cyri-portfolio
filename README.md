This is a [Next.js](https://nextjs.org) portfolio project.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contact Form Setup

This project is ready to send contact form submissions through Formspree.

1. Create a form at [Formspree](https://formspree.io/).
2. Copy the endpoint they give you, which looks like `https://formspree.io/f/xxxxx`.
3. Create a local `.env.local` file.
4. Add this line:

```env
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/yourFormId
```

If the endpoint is missing, the contact form stays visible but direct submission is disabled and the copy-email fallback still works.

Keep real environment values only in `.env.local`. Do not place real endpoints, keys, or secrets in `.env.example` because that file is intended to be committed as a safe template.

## Deployment

This is a standard Next.js server application for Vercel. Connect the GitHub repository to Vercel, select the Next.js framework preset, and use the default build settings. Pushes to `main` can be configured to create the production deployment automatically.

Add the production environment variables in the Vercel project settings before deploying. Keep local values in `.env.local`; never commit secrets.
