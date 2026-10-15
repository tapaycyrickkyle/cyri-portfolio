"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "../../../lib/supabase/server";
import { consumeRateLimit } from "../../../lib/reviews/rate-limit";

export type LoginActionState = {
  error: string | null;
};

export const initialLoginActionState: LoginActionState = { error: null };

export async function loginAdmin(
  _previousState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  const requestHeaders = await headers();
  if (!(await consumeRateLimit("admin-login", requestHeaders))) {
    return { error: "Sign-in is temporarily unavailable. Try again shortly." };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { error: "Admin sign-in is not configured yet." };
  }

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError) {
    await supabase.auth.signOut();
    return { error: "The email or password is not valid." };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    await supabase.auth.signOut();
    return { error: "The email or password is not valid." };
  }

  const { data: admin, error: adminError } = await supabase
    .from("review_admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (adminError || !admin) {
    await supabase.auth.signOut();
    return { error: "The email or password is not valid." };
  }

  redirect("/admin");
}
