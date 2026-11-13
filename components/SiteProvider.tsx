"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { AboutContent, Site } from "@/lib/site";

type SiteData = { site: Site; about: AboutContent };

const SiteContext = createContext<SiteData | null>(null);

/** Shares the restaurant details (loaded on the server) with client components. */
export function SiteProvider({ value, children }: { value: SiteData; children: ReactNode }) {
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

function useSiteData(): SiteData {
  const data = useContext(SiteContext);
  if (!data) throw new Error("useSite must be used inside <SiteProvider>");
  return data;
}

export const useSite = () => useSiteData().site;
export const useAbout = () => useSiteData().about;
