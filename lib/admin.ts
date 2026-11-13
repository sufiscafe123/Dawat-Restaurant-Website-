"use client";

import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { getBrowserClient, isSupabaseConfigured } from "./supabase";

export type AdminState =
  | { status: "loading" }
  | { status: "not-configured" }
  | { status: "signed-out" }
  | { status: "not-admin"; session: Session }
  | { status: "ready"; session: Session };

/** Tracks the admin login and checks (in Supabase) that the user is an admin. */
export function useAdmin(): AdminState {
  const [state, setState] = useState<AdminState>(
    isSupabaseConfigured ? { status: "loading" } : { status: "not-configured" },
  );

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    const supabase = getBrowserClient();
    let active = true;

    const check = async (session: Session | null) => {
      if (!session) {
        if (active) setState({ status: "signed-out" });
        return;
      }
      const { data } = await supabase.rpc("is_admin");
      if (active) setState(data === true ? { status: "ready", session } : { status: "not-admin", session });
    };

    // Supabase recommends not awaiting other Supabase calls inside this callback,
    // so the check runs on the next tick.
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setTimeout(() => void check(session), 0);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return state;
}

/** Asks the website to show the latest saved content immediately. */
export async function refreshWebsite(): Promise<boolean> {
  const { data } = await getBrowserClient().auth.getSession();
  const token = data.session?.access_token;
  if (!token) return false;
  const res = await fetch("/api/revalidate", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.ok;
}

/** Saves a block of website content (restaurant details, About text…). */
export async function saveContent(key: string, value: unknown): Promise<string | null> {
  const { error } = await getBrowserClient()
    .from("site_content")
    .upsert({ key, value, updated_at: new Date().toISOString() });
  if (error) return error.message;
  await refreshWebsite();
  return null;
}

/** Loads a block of website content, or null if it was never saved. */
export async function loadContent(key: string): Promise<unknown> {
  const { data, error } = await getBrowserClient().from("site_content").select("value").eq("key", key).maybeSingle();
  if (error) throw new Error(error.message);
  return data?.value ?? null;
}

/** "Chicken & Mutton Starters" → "chicken-mutton-starters" */
export function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^\w\s-]/g, " ")
      .trim()
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "") || "category"
  );
}
