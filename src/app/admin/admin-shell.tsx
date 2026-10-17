import Link from "next/link";
import {
  LayoutDashboard,
  Link2,
  LogOut,
  MessageSquareText,
} from "lucide-react";

import { logoutAdmin } from "../../lib/reviews/actions";

const navigation = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/invitations", label: "Review invitations", icon: Link2 },
  { href: "/admin/reviews", label: "Client reviews", icon: MessageSquareText },
];

export default function AdminShell({
  children,
  email,
}: Readonly<{
  children: React.ReactNode;
  email: string;
}>) {
  return (
    <div className="private-workspace min-h-screen bg-background text-foreground">
      <header className="border-b border-outline bg-surface">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/admin"
              className="font-mono text-sm font-semibold tracking-[-0.04em] text-foreground"
            >
              Cyrick.Tapay / Admin
            </Link>
            <div className="flex items-center gap-3 text-xs text-muted">
              <span className="max-w-[14rem] truncate" title={email}>
                {email}
              </span>
              <form action={logoutAdmin}>
                <button
                  type="submit"
                  className="inline-flex min-h-9 items-center gap-2 border border-outline-strong px-3 font-mono text-[11px] uppercase tracking-[0.12em] text-foreground transition-colors hover:bg-surface-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                >
                  <LogOut className="size-4" aria-hidden="true" />
                  Log out
                </button>
              </form>
            </div>
          </div>

          <nav aria-label="Admin navigation" className="flex flex-wrap gap-2">
            {navigation.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex min-h-10 items-center gap-2 border border-transparent px-3 text-sm text-muted transition-colors hover:border-outline-strong hover:bg-surface-strong hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              >
                <Icon className="size-4" aria-hidden="true" />
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        {children}
      </main>
    </div>
  );
}
