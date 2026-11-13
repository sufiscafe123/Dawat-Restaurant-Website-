"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { refreshWebsite, slugify } from "@/lib/admin";
import { MENU_ICONS, menuCategories as DEFAULT_MENU } from "@/lib/menu";
import { getBrowserClient, MENU_IMAGES_BUCKET } from "@/lib/supabase";
import { SaveBar, useToast, useUnsavedWarning } from "./ui";

type Category = { id: string; slug: string; title: string; icon: string; position: number };

type Item = {
  id: string;
  category_id: string;
  name: string;
  price: number | null;
  image: string | null;
  position: number;
  is_available: boolean;
};

const ICON_LABELS: Record<(typeof MENU_ICONS)[number], string> = {
  leaf: "Leaf (veg)",
  soup: "Soup bowl",
  flame: "Flame (tandoor / BBQ)",
  noodles: "Noodles bowl",
  restaurant: "Plate & cutlery",
  crown: "Crown (royal / special)",
  fish: "Fish (seafood)",
  star: "Star (signature)",
  bread: "Bread",
  dessert: "Ice cream (dessert)",
};

const MAX_PHOTO_MB = 5;

/** Same list with positions set from the order, so lists can be compared and saved. */
const withPositions = (items: Item[]) => items.map((it, i) => ({ ...it, position: i }));

export default function MenuEditor() {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [savedItems, setSavedItems] = useState<Item[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Item[]>([]);
  const [catForm, setCatForm] = useState({ title: "", icon: "restaurant" });
  const [newCategory, setNewCategory] = useState("");
  const [search, setSearch] = useState("");
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const focusId = useRef<string | null>(null);

  const selected = categories.find((c) => c.id === selectedId) ?? null;

  const savedForSelected = useMemo(
    () =>
      withPositions(
        savedItems.filter((i) => i.category_id === selectedId).sort((a, b) => a.position - b.position),
      ),
    [savedItems, selectedId],
  );

  const itemsDirty = JSON.stringify(withPositions(draft)) !== JSON.stringify(savedForSelected);
  const catDirty = Boolean(selected && (catForm.title !== selected.title || catForm.icon !== selected.icon));
  useUnsavedWarning(itemsDirty || catDirty);

  /* ---------------- Loading ---------------- */

  const load = useCallback(async () => {
    const supabase = getBrowserClient();
    const [cats, items] = await Promise.all([
      supabase.from("menu_categories").select("id, slug, title, icon, position").order("position"),
      supabase
        .from("menu_items")
        .select("id, category_id, name, price, image, position, is_available")
        .order("position")
        .range(0, 4999),
    ]);
    if (cats.error || items.error) {
      toast.show("error", `Could not load the menu: ${(cats.error ?? items.error)!.message}`);
      setLoading(false);
      return;
    }
    setCategories(cats.data as Category[]);
    setSavedItems(items.data as Item[]);
    setSelectedId((prev) => prev ?? (cats.data[0] as Category | undefined)?.id ?? null);
    setLoading(false);
  }, [toast.show]);

  useEffect(() => {
    void load();
  }, [load]);

  // Start editing a fresh copy whenever the selected category (or its saved items) changes.
  useEffect(() => {
    setDraft(savedForSelected);
  }, [savedForSelected]);

  useEffect(() => {
    if (selected) setCatForm({ title: selected.title, icon: selected.icon });
  }, [selected]);

  // Focus a newly added dish / scroll to a search result.
  useEffect(() => {
    const id = focusId.current ?? highlightId;
    if (!id) return;
    const el = document.getElementById(`item-${id}`);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    if (focusId.current) el.querySelector<HTMLInputElement>("input[data-name]")?.focus();
    focusId.current = null;
  }, [draft, highlightId]);

  const confirmDiscard = () =>
    !(itemsDirty || catDirty) || window.confirm("You have unsaved changes in this category. Discard them?");

  const selectCategory = (id: string, highlight: string | null = null) => {
    if (id !== selectedId && !confirmDiscard()) return;
    setSelectedId(id);
    setHighlightId(highlight);
  };

  /* ---------------- Import the built-in menu (first time only) ---------------- */

  const importDefaultMenu = async () => {
    if (!window.confirm("Import the current website menu (18 categories, 245 dishes) into the admin panel?")) return;
    setBusy("import");
    const supabase = getBrowserClient();
    const { data: cats, error } = await supabase
      .from("menu_categories")
      .insert(DEFAULT_MENU.map((c, i) => ({ slug: c.id, title: c.title, icon: c.icon, position: i })))
      .select("id, slug");
    if (error || !cats) {
      setBusy(null);
      return toast.show("error", `Import failed: ${error?.message}`);
    }
    const idBySlug = new Map(cats.map((c) => [c.slug as string, c.id as string]));
    const rows = DEFAULT_MENU.flatMap((c) =>
      c.items.map((item, i) => ({
        category_id: idBySlug.get(c.id)!,
        name: item.name,
        price: item.price ?? null,
        image: item.image ?? null,
        position: i,
      })),
    );
    for (let i = 0; i < rows.length; i += 100) {
      const { error: itemsError } = await supabase.from("menu_items").insert(rows.slice(i, i + 100));
      if (itemsError) {
        setBusy(null);
        return toast.show("error", `Import stopped: ${itemsError.message}`);
      }
    }
    await load();
    await refreshWebsite();
    setBusy(null);
    toast.show("success", `Imported ${cats.length} categories and ${rows.length} dishes.`);
  };

  /* ---------------- Categories ---------------- */

  const addCategory = async (e: FormEvent) => {
    e.preventDefault();
    const title = newCategory.trim();
    if (!title || !confirmDiscard()) return;
    let slug = slugify(title);
    for (let n = 2; categories.some((c) => c.slug === slug); n++) slug = `${slugify(title)}-${n}`;

    setBusy("category");
    const position = Math.max(-1, ...categories.map((c) => c.position)) + 1;
    const { data, error } = await getBrowserClient()
      .from("menu_categories")
      .insert({ slug, title, icon: "restaurant", position })
      .select("id, slug, title, icon, position")
      .single();
    setBusy(null);
    if (error) return toast.show("error", `Could not add category: ${error.message}`);
    setCategories((prev) => [...prev, data as Category]);
    setSelectedId((data as Category).id);
    setNewCategory("");
    await refreshWebsite();
    toast.show("success", `Category “${title}” added. Now add its dishes.`);
  };

  const saveCategory = async () => {
    if (!selected) return;
    const title = catForm.title.trim();
    if (!title) return toast.show("error", "Category name cannot be empty.");
    setBusy("category");
    const { error } = await getBrowserClient()
      .from("menu_categories")
      .update({ title, icon: catForm.icon })
      .eq("id", selected.id);
    setBusy(null);
    if (error) return toast.show("error", `Could not save category: ${error.message}`);
    setCategories((prev) => prev.map((c) => (c.id === selected.id ? { ...c, title, icon: catForm.icon } : c)));
    await refreshWebsite();
    toast.show("success", "Category saved.");
  };

  const moveCategory = async (index: number, dir: -1 | 1) => {
    const other = categories[index + dir];
    const current = categories[index];
    if (!other) return;
    setBusy("category");
    const supabase = getBrowserClient();
    const results = await Promise.all([
      supabase.from("menu_categories").update({ position: other.position }).eq("id", current.id),
      supabase.from("menu_categories").update({ position: current.position }).eq("id", other.id),
    ]);
    setBusy(null);
    const failed = results.find((r) => r.error);
    if (failed) return toast.show("error", `Could not move category: ${failed.error!.message}`);
    setCategories((prev) => {
      const next = [...prev];
      next[index] = { ...other, position: current.position };
      next[index + dir] = { ...current, position: other.position };
      return next;
    });
    await refreshWebsite();
  };

  const deleteCategory = async () => {
    if (!selected) return;
    const count = savedForSelected.length;
    const ok = window.confirm(
      `Delete the category “${selected.title}”${count ? ` and its ${count} dishes` : ""}? This cannot be undone.`,
    );
    if (!ok) return;
    setBusy("category");
    const { error } = await getBrowserClient().from("menu_categories").delete().eq("id", selected.id);
    setBusy(null);
    if (error) return toast.show("error", `Could not delete category: ${error.message}`);
    const rest = categories.filter((c) => c.id !== selected.id);
    setCategories(rest);
    setSavedItems((prev) => prev.filter((i) => i.category_id !== selected.id));
    setSelectedId(rest[0]?.id ?? null);
    await refreshWebsite();
    toast.show("success", `Category “${selected.title}” deleted.`);
  };

  /* ---------------- Dishes ---------------- */

  const updateItem = (id: string, patch: Partial<Item>) =>
    setDraft((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));

  const moveItem = (index: number, dir: -1 | 1) =>
    setDraft((prev) => {
      if (!prev[index + dir]) return prev;
      const next = [...prev];
      [next[index], next[index + dir]] = [next[index + dir], next[index]];
      return next;
    });

  const addItem = () => {
    if (!selected) return;
    const id = crypto.randomUUID();
    focusId.current = id;
    setDraft((prev) => [
      ...prev,
      { id, category_id: selected.id, name: "", price: null, image: null, position: prev.length, is_available: true },
    ]);
  };

  const deleteItem = async (item: Item) => {
    const isSaved = savedItems.some((i) => i.id === item.id);
    if (!isSaved) {
      setDraft((prev) => prev.filter((i) => i.id !== item.id));
      return;
    }
    if (!window.confirm(`Delete “${item.name || "this dish"}” from the menu? This cannot be undone.`)) return;
    setBusy(item.id);
    const { error } = await getBrowserClient().from("menu_items").delete().eq("id", item.id);
    setBusy(null);
    if (error) return toast.show("error", `Could not delete: ${error.message}`);
    // Keep any other unsaved edits in this category.
    setDraft((prev) => prev.filter((i) => i.id !== item.id));
    setSavedItems((prev) => prev.filter((i) => i.id !== item.id));
    await refreshWebsite();
    toast.show("success", `“${item.name}” deleted.`);
  };

  const uploadPhoto = async (item: Item, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !selected) return;
    if (!file.type.startsWith("image/")) return toast.show("error", "Please choose an image file (JPG, PNG or WEBP).");
    if (file.size > MAX_PHOTO_MB * 1024 * 1024) return toast.show("error", `Photo is too big. Maximum ${MAX_PHOTO_MB} MB.`);

    setBusy(item.id);
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
    const path = `${selected.slug}/${slugify(item.name || "dish")}-${Date.now()}.${ext}`;
    const supabase = getBrowserClient();
    const { error } = await supabase.storage.from(MENU_IMAGES_BUCKET).upload(path, file, {
      cacheControl: "31536000",
      contentType: file.type,
    });
    setBusy(null);
    if (error) return toast.show("error", `Upload failed: ${error.message}`);
    const { data } = supabase.storage.from(MENU_IMAGES_BUCKET).getPublicUrl(path);
    updateItem(item.id, { image: data.publicUrl });
    toast.show("success", "Photo uploaded. Click “Save changes” to show it on the website.");
  };

  const saveItems = async () => {
    if (!selected) return;
    const rows = withPositions(draft).map((it) => ({ ...it, name: it.name.trim() }));
    const missing = rows.find((r) => !r.name);
    if (missing) {
      setHighlightId(missing.id);
      return toast.show("error", "Every dish needs a name. Fill it in or delete the empty row.");
    }
    setBusy("save");
    const { error } = await getBrowserClient().from("menu_items").upsert(rows);
    setBusy(null);
    if (error) return toast.show("error", `Could not save: ${error.message}`);
    setSavedItems((prev) => [...prev.filter((i) => i.category_id !== selected.id), ...rows]);
    await refreshWebsite();
    toast.show("success", `${selected.title} saved. The website menu is updated.`);
  };

  /* ---------------- Search across all dishes ---------------- */

  const results = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (q.length < 2) return [];
    const titleById = new Map(categories.map((c) => [c.id, c.title]));
    return savedItems
      .filter((i) => i.name.toLowerCase().includes(q))
      .slice(0, 30)
      .map((i) => ({ ...i, categoryTitle: titleById.get(i.category_id) ?? "" }));
  }, [search, savedItems, categories]);

  /* ---------------- Render ---------------- */

  if (loading) return <p className="admin-muted">Loading menu…</p>;

  if (categories.length === 0) {
    return (
      <div className="admin-stack">
        <div className="admin-page-head">
          <h1>Menu &amp; Prices</h1>
        </div>
        <div className="admin-empty">
          <h2>Start with your current menu</h2>
          <p>
            The website is showing the built-in menu (18 categories, 245 dishes). Import it once to start editing
            names, prices and photos here.
          </p>
          <button type="button" className="admin-btn is-primary" onClick={importDefaultMenu} disabled={busy === "import"}>
            {busy === "import" ? "Importing…" : "Import current menu"}
          </button>
        </div>
        {toast.view}
      </div>
    );
  }

  const shownCount = draft.filter((i) => i.is_available).length;

  return (
    <div className="admin-stack">
      <div className="admin-page-head is-split">
        <div>
          <h1>Menu &amp; Prices</h1>
          <p>
            {categories.length} categories · {savedItems.length} dishes. Changes go live when you click “Save changes”.
          </p>
        </div>
        <div className="admin-search">
          <input
            type="search"
            placeholder="Search any dish…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search dishes"
          />
          {results.length > 0 && (
            <ul className="admin-search-results">
              {results.map((r) => (
                <li key={r.id}>
                  <button
                    type="button"
                    onClick={() => {
                      selectCategory(r.category_id, r.id);
                      setSearch("");
                    }}
                  >
                    <span>{r.name}</span>
                    <small>
                      {r.categoryTitle} · {r.price === null ? "As Per Size" : `₹${r.price}`}
                    </small>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="admin-menu">
        {/* Category list */}
        <aside className="admin-cats">
          <ul>
            {categories.map((c, i) => (
              <li key={c.id} className={c.id === selectedId ? "is-active" : ""}>
                <button type="button" className="admin-cat-name" onClick={() => selectCategory(c.id)}>
                  <span>{c.title}</span>
                  <small>{savedItems.filter((it) => it.category_id === c.id).length}</small>
                </button>
                <span className="admin-cat-move">
                  <button type="button" aria-label={`Move ${c.title} up`} onClick={() => moveCategory(i, -1)} disabled={i === 0 || !!busy}>
                    ↑
                  </button>
                  <button
                    type="button"
                    aria-label={`Move ${c.title} down`}
                    onClick={() => moveCategory(i, 1)}
                    disabled={i === categories.length - 1 || !!busy}
                  >
                    ↓
                  </button>
                </span>
              </li>
            ))}
          </ul>

          <form className="admin-cat-add" onSubmit={addCategory}>
            <input
              placeholder="New category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              aria-label="New category name"
            />
            <button type="submit" className="admin-btn is-ghost is-small" disabled={!newCategory.trim() || !!busy}>
              + Add
            </button>
          </form>
        </aside>

        {/* Selected category */}
        {selected && (
          <section className="admin-items">
            <div className="admin-cat-edit">
              <label className="admin-field">
                <span className="admin-field-label">Category name</span>
                <input value={catForm.title} onChange={(e) => setCatForm((f) => ({ ...f, title: e.target.value }))} />
              </label>
              <label className="admin-field">
                <span className="admin-field-label">Icon</span>
                <select value={catForm.icon} onChange={(e) => setCatForm((f) => ({ ...f, icon: e.target.value }))}>
                  {MENU_ICONS.map((icon) => (
                    <option key={icon} value={icon}>
                      {ICON_LABELS[icon]}
                    </option>
                  ))}
                </select>
              </label>
              <div className="admin-cat-edit-actions">
                <button type="button" className="admin-btn is-ghost is-small" onClick={saveCategory} disabled={!catDirty || !!busy}>
                  Save category
                </button>
                <a
                  href={`/menu#${selected.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="admin-btn is-ghost is-small"
                >
                  View on website ↗
                </a>
                <button type="button" className="admin-btn is-ghost is-small is-danger" onClick={deleteCategory} disabled={!!busy}>
                  Delete category
                </button>
              </div>
            </div>

            <div className="admin-items-head">
              <span>
                {draft.length} dishes · {shownCount} shown on website
              </span>
              <span className="admin-muted">Leave the price empty for “As Per Size”.</span>
            </div>

            <ul className="admin-item-list">
              {draft.map((item, i) => (
                <li
                  key={item.id}
                  id={`item-${item.id}`}
                  className={`admin-item${item.is_available ? "" : " is-hidden"}${highlightId === item.id ? " is-highlight" : ""}`}
                >
                  <div className="admin-item-photo">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image} alt="" />
                    ) : (
                      <span className="admin-item-nophoto">No photo</span>
                    )}
                    <div className="admin-item-photo-actions">
                      <label className="admin-link-btn">
                        {busy === item.id ? "Uploading…" : item.image ? "Change" : "Upload"}
                        <input type="file" accept="image/*" hidden onChange={(e) => uploadPhoto(item, e)} disabled={!!busy} />
                      </label>
                      {item.image && (
                        <button type="button" className="admin-link-btn is-danger" onClick={() => updateItem(item.id, { image: null })}>
                          Remove
                        </button>
                      )}
                    </div>
                  </div>

                  <label className="admin-item-name">
                    <span className="sr-only">Dish name</span>
                    <input
                      data-name
                      placeholder="Dish name"
                      value={item.name}
                      onChange={(e) => updateItem(item.id, { name: e.target.value })}
                    />
                  </label>

                  <label className="admin-item-price">
                    <span aria-hidden="true">₹</span>
                    <input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      step={1}
                      placeholder="As Per Size"
                      aria-label={`Price of ${item.name || "dish"}`}
                      value={item.price ?? ""}
                      onChange={(e) =>
                        updateItem(item.id, {
                          price: e.target.value === "" ? null : Math.max(0, Math.round(Number(e.target.value))),
                        })
                      }
                    />
                  </label>

                  <label className="admin-item-toggle" title="Show this dish on the website">
                    <input
                      type="checkbox"
                      checked={item.is_available}
                      onChange={(e) => updateItem(item.id, { is_available: e.target.checked })}
                    />
                    <span>{item.is_available ? "Shown" : "Hidden"}</span>
                  </label>

                  <div className="admin-item-actions">
                    <button type="button" aria-label="Move up" onClick={() => moveItem(i, -1)} disabled={i === 0}>
                      ↑
                    </button>
                    <button type="button" aria-label="Move down" onClick={() => moveItem(i, 1)} disabled={i === draft.length - 1}>
                      ↓
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete ${item.name || "dish"}`}
                      className="is-danger"
                      onClick={() => deleteItem(item)}
                      disabled={busy === item.id}
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <button type="button" className="admin-btn is-ghost admin-add-item" onClick={addItem}>
              + Add dish to {selected.title}
            </button>

            <SaveBar dirty={itemsDirty} saving={busy === "save"} onSave={saveItems} onReset={() => setDraft(savedForSelected)} />
          </section>
        )}
      </div>

      {toast.view}
    </div>
  );
}
