import "server-only";

import { createClient } from "@supabase/supabase-js";

import { getSupabaseConfig } from "../supabase/config";

export function createPublicSupabaseClient() {
  const config = getSupabaseConfig();

  if (!config) {
    return null;
  }

  return createClient(config.url, config.publishableKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}
