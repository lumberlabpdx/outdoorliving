import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "./database.types";

let client: SupabaseClient<Database> | undefined;

// The site only inserts rows as an anonymous visitor, so the client keeps no auth session.
// supabase-js is loaded on first use to keep it out of the initial page bundle.
export async function getSupabase(): Promise<SupabaseClient<Database>> {
  if (client) return client;

  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase is not configured: set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY",
    );
  }

  const { createClient } = await import("@supabase/supabase-js");
  client = createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
  return client;
}
