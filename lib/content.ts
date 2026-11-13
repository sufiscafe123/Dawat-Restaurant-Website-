import { cache } from "react";
import { MENU_ICONS, menuCategories as DEFAULT_MENU, type MenuCategory, type MenuIcon } from "./menu";
import {
  buildSite,
  DEFAULT_ABOUT,
  DEFAULT_SETTINGS,
  mergeWithDefaults,
  type AboutContent,
  type Site,
} from "./site";
import { createServerClient } from "./supabase";

/**
 * Loads editable content from Supabase for the public website.
 * Anything missing (not set up yet, network error, empty table) falls back to the
 * defaults in lib/site.ts and lib/menu.ts, so the website always works.
 */

async function getContentRow(key: string): Promise<unknown> {
  const supabase = createServerClient();
  if (!supabase) return null;
  const { data, error } = await supabase.from("site_content").select("value").eq("key", key).maybeSingle();
  if (error) {
    console.warn(`[content] Could not load "${key}" from Supabase:`, error.message);
    return null;
  }
  return data?.value ?? null;
}

export const getSite = cache(async (): Promise<Site> => {
  const saved = await getContentRow("settings");
  return buildSite(mergeWithDefaults(DEFAULT_SETTINGS, saved));
});

export const getAbout = cache(async (): Promise<AboutContent> => {
  const saved = await getContentRow("about");
  return mergeWithDefaults(DEFAULT_ABOUT, saved);
});

type CategoryRow = {
  slug: string;
  title: string;
  icon: string;
  menu_items: { name: string; price: number | null; image: string | null; position: number; is_available: boolean }[];
};

export const getMenu = cache(async (): Promise<MenuCategory[]> => {
  const supabase = createServerClient();
  if (!supabase) return DEFAULT_MENU;

  const { data, error } = await supabase
    .from("menu_categories")
    .select("slug, title, icon, position, menu_items(name, price, image, position, is_available)")
    .order("position")
    .order("position", { referencedTable: "menu_items" });

  if (error) {
    console.warn("[content] Could not load menu from Supabase:", error.message);
    return DEFAULT_MENU;
  }
  // Nothing imported yet → keep showing the built-in menu.
  if (!data || data.length === 0) return DEFAULT_MENU;

  return (data as CategoryRow[]).map((c) => ({
    id: c.slug,
    title: c.title,
    icon: (MENU_ICONS as readonly string[]).includes(c.icon) ? (c.icon as MenuIcon) : "restaurant",
    items: c.menu_items
      .filter((i) => i.is_available)
      .map((i) => ({
        name: i.name,
        ...(i.price === null ? {} : { price: i.price }),
        ...(i.image ? { image: i.image } : {}),
      })),
  }));
});
