"use client";

import { useEffect, useState } from "react";
import { loadContent, saveContent } from "@/lib/admin";
import { buildSite, DEFAULT_SETTINGS, mergeWithDefaults, type SiteSettings } from "@/lib/site";
import { Field, Panel, SaveBar, useToast, useUnsavedWarning } from "./ui";

/** Restaurant details: phone numbers, WhatsApp, address, hours, social links, map. */
export default function SettingsEditor() {
  const toast = useToast();
  const [saved, setSaved] = useState<SiteSettings | null>(null);
  const [form, setForm] = useState<SiteSettings | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadContent("settings")
      .then((value) => {
        const merged = mergeWithDefaults(DEFAULT_SETTINGS, value);
        setSaved(merged);
        setForm(merged);
      })
      .catch((err: Error) => toast.show("error", `Could not load details: ${err.message}`));
  }, [toast.show]);

  const dirty = Boolean(form && saved && JSON.stringify(form) !== JSON.stringify(saved));
  useUnsavedWarning(dirty);

  if (!form) return <p className="admin-muted">Loading restaurant details…</p>;

  /** Updates one field, e.g. set("phones", "primary", "+91 …"). */
  const set = (...args: [...string[], string]) => {
    const value = args.pop() as string;
    setForm((prev) => {
      const next = structuredClone(prev!) as Record<string, unknown>;
      let target = next;
      for (const key of args.slice(0, -1)) target = target[key] as Record<string, unknown>;
      target[args[args.length - 1]] = value;
      return next as SiteSettings;
    });
  };

  const save = async () => {
    const trimmed = JSON.parse(JSON.stringify(form), (_k, v) => (typeof v === "string" ? v.trim() : v)) as SiteSettings;
    if (!trimmed.phones.primary || !trimmed.whatsappNumber) {
      toast.show("error", "The main phone number and WhatsApp number cannot be empty.");
      return;
    }
    setSaving(true);
    const error = await saveContent("settings", trimmed);
    setSaving(false);
    if (error) return toast.show("error", `Could not save: ${error}`);
    setSaved(trimmed);
    setForm(trimmed);
    toast.show("success", "Restaurant details saved. The website is updated.");
  };

  const preview = buildSite(form);

  return (
    <div className="admin-stack">
      <div className="admin-page-head">
        <h1>Restaurant Details</h1>
        <p>Phone numbers, address, timings and links shown across the whole website.</p>
      </div>

      <Panel title="Restaurant">
        <div className="admin-grid">
          <Field label="Restaurant name">
            <input value={form.name} onChange={(e) => set("name", e.target.value)} />
          </Field>
          <Field label="Tagline" hint="Shown on the home page and in the footer.">
            <input value={form.tagline} onChange={(e) => set("tagline", e.target.value)} />
          </Field>
          <Field label="Opening hours" hint='Example: "1:00 PM – 1:00 AM"'>
            <input value={form.hours} onChange={(e) => set("hours", e.target.value)} />
          </Field>
        </div>
      </Panel>

      <Panel title="Phone & WhatsApp" description="Write numbers the way customers should see them, e.g. +91 83208 12121.">
        <div className="admin-grid">
          <Field label="Main booking number" hint="Used for every “Call” and “Book Table” button.">
            <input type="tel" value={form.phones.primary} onChange={(e) => set("phones", "primary", e.target.value)} />
          </Field>
          <Field label="Second number">
            <input type="tel" value={form.phones.secondary} onChange={(e) => set("phones", "secondary", e.target.value)} />
          </Field>
          <Field label="Third number">
            <input type="tel" value={form.phones.tertiary} onChange={(e) => set("phones", "tertiary", e.target.value)} />
          </Field>
          <Field label="WhatsApp number" hint="Online table bookings and the WhatsApp button go to this number.">
            <input type="tel" value={form.whatsappNumber} onChange={(e) => set("whatsappNumber", e.target.value)} />
          </Field>
        </div>
      </Panel>

      <Panel title="Address">
        <div className="admin-grid">
          <Field label="Full address" hint="Footer, Contact and About pages." wide>
            <input value={form.address.full} onChange={(e) => set("address", "full", e.target.value)} />
          </Field>
          <Field label="Short address (one line)" hint="Top bar of every page." wide>
            <input value={form.address.short} onChange={(e) => set("address", "short", e.target.value)} />
          </Field>
          <Field label="Address – line 1" hint="Menu drawer and booking box.">
            <input value={form.address.line1} onChange={(e) => set("address", "line1", e.target.value)} />
          </Field>
          <Field label="Address – line 2">
            <input value={form.address.line2} onChange={(e) => set("address", "line2", e.target.value)} />
          </Field>
          <Field
            label="Google Maps search"
            hint="What Google Maps searches to show the restaurant pin on the map."
            wide
          >
            <input value={form.mapQuery} onChange={(e) => set("mapQuery", e.target.value)} />
          </Field>
          <div className="admin-field is-wide">
            <a href={preview.social.maps} target="_blank" rel="noopener noreferrer" className="admin-link-btn">
              Test this map search ↗
            </a>
          </div>
        </div>
      </Panel>

      <Panel title="Social media">
        <div className="admin-grid">
          <Field label="Instagram link">
            <input type="url" value={form.social.instagram} onChange={(e) => set("social", "instagram", e.target.value)} />
          </Field>
          <Field label="Facebook link">
            <input type="url" value={form.social.facebook} onChange={(e) => set("social", "facebook", e.target.value)} />
          </Field>
        </div>
      </Panel>

      <SaveBar dirty={dirty} saving={saving} onSave={save} onReset={() => setForm(saved)} />
      {toast.view}
    </div>
  );
}
