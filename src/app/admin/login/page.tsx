import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getCurrentAdmin } from "../../../lib/reviews/auth";
import AdminLoginForm from "./login-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin sign in",
  description: "Private administrator sign in.",
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

export default async function AdminLoginPage() {
  if (await getCurrentAdmin()) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12 text-foreground">
      <section className="w-full max-w-md border border-outline bg-surface p-6 sm:p-8">
        <div className="space-y-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-soft">
            Private workspace
          </p>
          <h1 className="text-3xl font-semibold tracking-[-0.05em] text-foreground">
            Admin sign in
          </h1>
          <p className="text-sm leading-6 text-muted">
            This area is limited to explicitly authorized administrators. There is no public administrator registration.
          </p>
        </div>

        <div className="mt-8">
          <AdminLoginForm />
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex text-sm text-muted underline decoration-outline-strong underline-offset-4 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          Return to portfolio
        </Link>
      </section>
    </main>
  );
}
