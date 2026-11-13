"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { getBrowserClient, isSupabaseConfigured } from "@/lib/supabase";

/** Page opened from the "reset password" email: lets the admin choose a new password. */
export default function AdminResetPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    const supabase = getBrowserClient();
    // The link in the email signs the user in for this one purpose.
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => setReady(Boolean(session)));
    return () => sub.subscription.unsubscribe();
  }, []);

  const save = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 10) return setError("Use at least 10 characters.");
    if (password !== confirm) return setError("The two passwords do not match.");
    setBusy(true);
    const { error } = await getBrowserClient().auth.updateUser({ password });
    setBusy(false);
    if (error) return setError(error.message);
    router.replace("/admin");
  };

  return (
    <main className="admin-login">
      <form className="admin-login-card" onSubmit={save}>
        <h1>Set a new password</h1>
        {!ready ? (
          <p className="admin-muted">
            Open this page using the link in the password reset email. If the link has expired, request a new one
            from the sign-in page.
          </p>
        ) : (
          <>
            <label className="admin-field">
              <span className="admin-field-label">New password</span>
              <input type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <label className="admin-field">
              <span className="admin-field-label">Repeat new password</span>
              <input type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
            </label>
            {error && <p className="admin-alert is-error">{error}</p>}
            <button type="submit" className="admin-btn is-primary is-block" disabled={busy}>
              {busy ? "Saving…" : "Save new password"}
            </button>
          </>
        )}
        <Link href="/admin/login" className="admin-link-btn">
          ← Back to sign in
        </Link>
      </form>
    </main>
  );
}
