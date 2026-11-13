import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { SUPABASE_KEY, SUPABASE_URL, isSupabaseConfigured } from "@/lib/supabase";

/**
 * Called by the admin panel after saving, so the public pages show the change straight away.
 * Only a signed-in admin (checked in Supabase with their own login token) can trigger it.
 */
export async function POST(request: Request) {
  if (!isSupabaseConfigured) {
    return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });
  }

  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${token}` } },
  });

  const { data: isAdmin, error } = await supabase.rpc("is_admin");
  if (error || isAdmin !== true) {
    return NextResponse.json({ error: "Not allowed" }, { status: 403 });
  }

  revalidatePath("/", "layout");
  return NextResponse.json({ revalidated: true });
}
