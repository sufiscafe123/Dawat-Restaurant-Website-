"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AboutEditor from "@/components/admin/AboutEditor";
import AccountPanel from "@/components/admin/AccountPanel";
import MenuEditor from "@/components/admin/MenuEditor";
import SettingsEditor from "@/components/admin/SettingsEditor";
import { useAdmin } from "@/lib/admin";
import { getBrowserClient } from "@/lib/supabase";

const TABS = [
  { id: "menu", label: "Menu & Prices" },
  { id: "details", label: "Restaurant Details" },
  { id: "about", label: "About Us" },
  { id: "account", label: "Account" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function AdminDashboardPage() {
  const router = useRouter();
  const admin = useAdmin();
  const [tab, setTab] = useState<TabId>("menu");

  // Remember the open tab in the address (/admin#details) so a refresh keeps it.
  useEffect(() => {
    const fromHash = window.location.hash.slice(1);
    if (TABS.some((t) => t.id === fromHash)) setTab(fromHash as TabId);
  }, []);

  useEffect(() => {
    if (admin.status === "signed-out" || admin.status === "not-admin" || admin.status === "not-configured") {
      router.replace("/admin/login");
    }
  }, [admin.status, router]);

  if (admin.status !== "ready") {
    return (
      <main className="admin-login">
        <p className="admin-muted">Checking your login…</p>
      </main>
    );
  }

  const openTab = (id: TabId) => {
    setTab(id);
    window.history.replaceState(null, "", `#${id}`);
  };

  const signOut = async () => {
    await getBrowserClient().auth.signOut();
    router.replace("/admin/login");
  };

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <div className="admin-topbar-inner">
          <Link href="/admin" className="admin-brand">
            <Image src="/images/logo.svg" width={120} height={38} alt="Dawat Restaurant" />
            <span>Admin</span>
          </Link>

          <nav className="admin-tabs" aria-label="Admin sections">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`admin-tab${tab === t.id ? " is-active" : ""}`}
                aria-current={tab === t.id ? "page" : undefined}
                onClick={() => openTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </nav>

          <div className="admin-topbar-actions">
            <a href="/" target="_blank" rel="noopener noreferrer" className="admin-btn is-ghost is-small">
              View website ↗
            </a>
            <button type="button" className="admin-btn is-ghost is-small" onClick={signOut}>
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="admin-main">
        {tab === "menu" && <MenuEditor />}
        {tab === "details" && <SettingsEditor />}
        {tab === "about" && <AboutEditor />}
        {tab === "account" && <AccountPanel email={admin.session.user.email ?? ""} />}
      </main>
    </div>
  );
}
