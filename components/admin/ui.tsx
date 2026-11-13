"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/** Labelled form field wrapper. */
export function Field({
  label,
  hint,
  children,
  wide = false,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <label className={`admin-field${wide ? " is-wide" : ""}`}>
      <span className="admin-field-label">{label}</span>
      {children}
      {hint && <span className="admin-field-hint">{hint}</span>}
    </label>
  );
}

/** A titled card that groups related fields. */
export function Panel({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="admin-panel">
      <header className="admin-panel-header">
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </header>
      <div className="admin-panel-body">{children}</div>
    </section>
  );
}

export type Toast = { kind: "success" | "error"; text: string } | null;

/** Small status message that hides itself after a few seconds. */
export function useToast() {
  const [toast, setToast] = useState<Toast>(null);
  const timer = useRef<number | undefined>(undefined);

  const show = useCallback((kind: "success" | "error", text: string) => {
    window.clearTimeout(timer.current);
    setToast({ kind, text });
    timer.current = window.setTimeout(() => setToast(null), kind === "error" ? 8000 : 3500);
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const view = toast ? (
    <div className={`admin-toast is-${toast.kind}`} role={toast.kind === "error" ? "alert" : "status"}>
      {toast.text}
    </div>
  ) : null;

  return { show, view };
}

/** Sticky bar with the Save button, shown under each editor. */
export function SaveBar({
  dirty,
  saving,
  onSave,
  onReset,
  label = "Save changes",
}: {
  dirty: boolean;
  saving: boolean;
  onSave: () => void;
  onReset?: () => void;
  label?: string;
}) {
  return (
    <div className={`admin-savebar${dirty ? " is-dirty" : ""}`}>
      <span>{dirty ? "You have unsaved changes" : "All changes saved"}</span>
      <div className="admin-savebar-actions">
        {onReset && (
          <button type="button" className="admin-btn is-ghost" onClick={onReset} disabled={!dirty || saving}>
            Undo changes
          </button>
        )}
        <button type="button" className="admin-btn is-primary" onClick={onSave} disabled={!dirty || saving}>
          {saving ? "Saving…" : label}
        </button>
      </div>
    </div>
  );
}

/** Warn before closing the tab with unsaved changes. */
export function useUnsavedWarning(dirty: boolean) {
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);
}
