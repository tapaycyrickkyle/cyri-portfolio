"use client";

import { useActionState } from "react";
import { LogIn } from "lucide-react";

import {
  type LoginActionState,
  loginAdmin,
} from "./actions";

const initialLoginActionState: LoginActionState = { error: null };

export default function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(
    loginAdmin,
    initialLoginActionState,
  );

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="admin-email" className="text-sm font-medium text-foreground">
          Email address
        </label>
        <input
          id="admin-email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className="min-h-11 w-full border border-outline bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground sm:text-sm"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="admin-password" className="text-sm font-medium text-foreground">
          Password
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="min-h-11 w-full border border-outline bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground sm:text-sm"
        />
      </div>

      {state.error ? (
        <p role="alert" className="border border-red-800/40 bg-red-50 px-3 py-2 text-sm leading-6 text-red-900 dark:bg-red-950/30 dark:text-red-100">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-11 w-full items-center justify-center gap-2 border border-foreground bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-surface-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground disabled:cursor-not-allowed disabled:opacity-55"
      >
        <LogIn className="size-4" aria-hidden="true" />
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
