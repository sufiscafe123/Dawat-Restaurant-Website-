"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { useAdmin } from "@/lib/admin";
import { getBrowserClient } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();
  const admin = useAdmin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ kind: "error" | "info"; text: string } | null>(null);

  // Already signed in as admin → go straight to the dashboard.
  useEffect(() => {
    if (admin.status === "ready") router.replace("/admin");
  }, [admin.status, router]);

  const signIn = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    const { error } = await getBrowserClient().auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) {
      setMessage({ kind: "error", text: "Wrong email or password. Please try again." });
      return;
    }
    router.replace("/admin");
  };

  const resetPassword = async () => {
    if (!email.trim()) {
      setMessage({ kind: "error", text: "Type your email above first, then click “Forgot password?”." });
      return;
    }
    setBusy(true);
    const { error } = await getBrowserClient().auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/admin/reset`,
    });
    setBusy(false);
    setMessage(
      error
        ? { kind: "error", text: error.message }
        : { kind: "info", text: "If this email is an admin account, a password reset link has been sent to it." },
    );
  };

  return (
    <main className="admin-login">
      <form className="admin-login-card" onSubmit={signIn}>
        <Image src="/images/logo.svg" width={160} height={50} alt="Dawat Restaurant" className="admin-login-logo" priority />
        <h1>Admin Panel</h1>
        <p className="admin-muted">Sign in to update the menu, prices and restaurant details.</p>

        {admin.status === "not-configured" ? (
          <p className="admin-alert is-error">
            Supabase is not connected. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to
            .env.local and restart the website.
          </p>
        ) : (
          <>
            {admin.status === "not-admin" && (
              <p className="admin-alert is-error">This account is not an admin. Sign in with the admin email.</p>
            )}

            <label className="admin-field">
              <span className="admin-field-label">Email</span>
              <input
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="admin-field">
              <span className="admin-field-label">Password</span>
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            {message && <p className={`admin-alert is-${message.kind}`}>{message.text}</p>}

            <button type="submit" className="admin-btn is-primary is-block" disabled={busy}>
              {busy ? "Please wait…" : "Sign in"}
            </button>

            <button type="button" className="admin-link-btn" onClick={resetPassword} disabled={busy}>
              Forgot password?
            </button>
          </>
        )}

        <Link href="/" className="admin-link-btn">
          ← Back to website
        </Link>
      </form>
    </main>
  );
}
