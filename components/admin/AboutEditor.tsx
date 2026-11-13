"use client";

import { useEffect, useState } from "react";
import { loadContent, saveContent } from "@/lib/admin";
import { DEFAULT_ABOUT, mergeWithDefaults, type AboutContent } from "@/lib/site";
import { Field, Panel, SaveBar, useToast, useUnsavedWarning } from "./ui";

/** About Us text on the About page and the home page "Our Story" section. */
export default function AboutEditor() {
  const toast = useToast();
  const [saved, setSaved] = useState<AboutContent | null>(null);
  const [form, setForm] = useState<AboutContent | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadContent("about")
      .then((value) => {
        const merged = mergeWithDefaults(DEFAULT_ABOUT, value);
        setSaved(merged);
        setForm(merged);
      })
      .catch((err: Error) => toast.show("error", `Could not load About text: ${err.message}`));
  }, [toast.show]);

  const dirty = Boolean(form && saved && JSON.stringify(form) !== JSON.stringify(saved));
  useUnsavedWarning(dirty);

  if (!form) return <p className="admin-muted">Loading About Us…</p>;

  const update = (patch: Partial<AboutContent>) => setForm((prev) => ({ ...prev!, ...patch }));

  const setParagraph = (i: number, text: string) =>
    update({ storyParagraphs: form.storyParagraphs.map((p, j) => (j === i ? text : p)) });

  const setHighlight = (i: number, key: "value" | "label", text: string) =>
    update({ highlights: form.highlights.map((h, j) => (j === i ? { ...h, [key]: text } : h)) });

  const save = async () => {
    const clean: AboutContent = {
      ...form,
      homeText: form.homeText.trim(),
      heroText: form.heroText.trim(),
      storyTitle: form.storyTitle.trim(),
      storyParagraphs: form.storyParagraphs.map((p) => p.trim()).filter(Boolean),
      highlights: form.highlights
        .map((h) => ({ value: h.value.trim(), label: h.label.trim() }))
        .filter((h) => h.value || h.label),
    };
    if (!clean.storyParagraphs.length) return toast.show("error", "Add at least one story paragraph.");

    setSaving(true);
    const error = await saveContent("about", clean);
    setSaving(false);
    if (error) return toast.show("error", `Could not save: ${error}`);
    setSaved(clean);
    setForm(clean);
    toast.show("success", "About Us saved. The website is updated.");
  };

  return (
    <div className="admin-stack">
      <div className="admin-page-head">
        <h1>About Us</h1>
        <p>Text on the About page and in the “Our Story” section of the home page.</p>
      </div>

      <Panel title="Home page – Our Story">
        <Field label="Paragraph" wide>
          <textarea rows={5} value={form.homeText} onChange={(e) => update({ homeText: e.target.value })} />
        </Field>
      </Panel>

      <Panel title="About page – top banner">
        <Field label="Intro line under “About Dawat”" wide>
          <textarea rows={2} value={form.heroText} onChange={(e) => update({ heroText: e.target.value })} />
        </Field>
      </Panel>

      <Panel title="About page – Our Story">
        <div className="admin-stack is-tight">
          <Field label="Heading" wide>
            <input value={form.storyTitle} onChange={(e) => update({ storyTitle: e.target.value })} />
          </Field>

          {form.storyParagraphs.map((text, i) => (
            <div key={i} className="admin-repeat">
              <Field label={`Paragraph ${i + 1}`} wide>
                <textarea rows={4} value={text} onChange={(e) => setParagraph(i, e.target.value)} />
              </Field>
              <button
                type="button"
                className="admin-btn is-ghost is-small is-danger"
                onClick={() => update({ storyParagraphs: form.storyParagraphs.filter((_, j) => j !== i) })}
                disabled={form.storyParagraphs.length <= 1}
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            className="admin-btn is-ghost is-small"
            onClick={() => update({ storyParagraphs: [...form.storyParagraphs, ""] })}
          >
            + Add paragraph
          </button>
        </div>
      </Panel>

      <Panel title="About page – highlights strip" description='Big gold value with a small label, e.g. "2019" / "Serving Kheda since".'>
        <div className="admin-stack is-tight">
          {form.highlights.map((h, i) => (
            <div key={i} className="admin-repeat is-row">
              <Field label="Value">
                <input value={h.value} onChange={(e) => setHighlight(i, "value", e.target.value)} />
              </Field>
              <Field label="Label">
                <input value={h.label} onChange={(e) => setHighlight(i, "label", e.target.value)} />
              </Field>
              <button
                type="button"
                className="admin-btn is-ghost is-small is-danger"
                onClick={() => update({ highlights: form.highlights.filter((_, j) => j !== i) })}
                disabled={form.highlights.length <= 1}
              >
                Remove
              </button>
            </div>
          ))}
          {form.highlights.length < 6 && (
            <button
              type="button"
              className="admin-btn is-ghost is-small"
              onClick={() => update({ highlights: [...form.highlights, { value: "", label: "" }] })}
            >
              + Add highlight
            </button>
          )}
        </div>
      </Panel>

      <SaveBar dirty={dirty} saving={saving} onSave={save} onReset={() => setForm(saved)} />
      {toast.view}
    </div>
  );
}
