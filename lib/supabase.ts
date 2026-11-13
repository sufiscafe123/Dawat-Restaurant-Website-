import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

/** True when the Supabase URL and key are set (in .env.local or the hosting settings). */
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY);

export const MENU_IMAGES_BUCKET = "menu-images";

/** Read-only client for server components (no login session). */
export function createServerClient(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  return createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

let browserClient: SupabaseClient | null = null;

/** Client for the admin panel in the browser (keeps the admin signed in). */
export function getBrowserClient(): SupabaseClient {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.");
  }
  browserClient ??= createClient(SUPABASE_URL, SUPABASE_KEY);
  return browserClient;
}
