"use client";

import { useState, type FormEvent } from "react";
import { getBrowserClient } from "@/lib/supabase";
import { Field, Panel, useToast } from "./ui";

/** Shows who is signed in and lets them change their password. */
export default function AccountPanel({ email }: { email: string }) {
  const toast = useToast();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  const changePassword = async (e: FormEvent) => {
    e.preventDefault();
    if (password.length < 10) return toast.show("error", "Use at least 10 characters for the new password.");
    if (password !== confirm) return toast.show("error", "The two passwords do not match.");
    setBusy(true);
    const { error } = await getBrowserClient().auth.updateUser({ password });
    setBusy(false);
    if (error) return toast.show("error", error.message);
    setPassword("");
    setConfirm("");
    toast.show("success", "Password changed.");
  };

  return (
    <div className="admin-stack">
      <div className="admin-page-head">
        <h1>Account</h1>
        <p>
          Signed in as <strong>{email}</strong>
        </p>
      </div>

      <Panel title="Change password" description="Use a long password that you don't use anywhere else.">
        <form className="admin-grid" onSubmit={changePassword}>
          <Field label="New password">
            <input type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Field>
          <Field label="Repeat new password">
            <input type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          </Field>
          <div className="admin-field is-wide">
            <button type="submit" className="admin-btn is-primary" disabled={busy || !password}>
              {busy ? "Saving…" : "Change password"}
            </button>
          </div>
        </form>
      </Panel>

      {toast.view}
    </div>
  );
}
