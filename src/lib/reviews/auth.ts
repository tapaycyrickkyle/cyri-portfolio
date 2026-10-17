import "server-only";

import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "../supabase/server";

export async function getCurrentAdmin() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return null;
    }

    const { data: admin, error } = await supabase
      .from("review_admins")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error || !admin) {
      return null;
    }

    return { supabase, user };
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  return admin;
}
