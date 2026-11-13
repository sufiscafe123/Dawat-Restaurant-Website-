/**
 * Restaurant details and About Us text.
 *
 * The values below are the DEFAULTS. Once the admin panel saves changes they are
 * stored in Supabase (table `site_content`) and override these defaults.
 */

/* ---------------- Restaurant details (editable in admin) ---------------- */

export type SiteSettings = {
  name: string;
  tagline: string;
  hours: string;
  address: {
    /** One line, used in the top bar. */
    short: string;
    /** Two lines, used in the header menu and contact boxes. */
    line1: string;
    line2: string;
    /** Full address, used in the footer and Contact page. */
    full: string;
  };
  /** Phone numbers as shown to customers, e.g. "+91 83208 12121". */
  phones: { primary: string; secondary: string; tertiary: string };
  whatsappNumber: string;
  social: { facebook: string; instagram: string };
  /** What Google Maps should search for to show the restaurant pin. */
  mapQuery: string;
};

export const DEFAULT_SETTINGS: SiteSettings = {
  name: "Dawat Restaurant",
  tagline: "Taste That Touches Your Heart",
  hours: "1:00 PM – 1:00 AM",
  address: {
    short: "NH-8, Kajipura, Opp. Sumar Logistics, Kheda, Gujarat — 387120",
    line1: "NH-8, Kajipura, Opp. Sumar Logistics,",
    line2: "Nearby Coca-Cola, Kheda, Gujarat — 387120",
    full: "NH-8, Kajipura, Opposite Sumar Logistics, Nearby Coca-Cola, Kheda, Gujarat — 387120",
  },
  phones: {
    primary: "+91 83208 12121",
    secondary: "+91 79849 05342",
    tertiary: "+91 95370 05566",
  },
  whatsappNumber: "+91 83208 12121",
  social: {
    facebook: "https://www.facebook.com/p/Dawat-Restaurant-Kheda-100063700326190/",
    instagram: "https://www.instagram.com/dawatrestaurant_/",
  },
  mapQuery: "Dawat Restaurant Kajipura Kheda Gujarat",
};

/* ---------------- About Us text (editable in admin) ---------------- */

export type AboutContent = {
  /** Short paragraph in the home page "Our Story" section. */
  homeText: string;
  /** Intro line under "About Dawat" on the About page. */
  heroText: string;
  storyTitle: string;
  storyParagraphs: string[];
  highlights: { value: string; label: string }[];
};

export const DEFAULT_ABOUT: AboutContent = {
  homeText:
    "Welcome to Dawat Restaurant in Kheda, Gujarat. Serving authentic culinary perfection since 2019! Famous for our irresistible Non-Vegetarian delicacies, authentic Mughlai cuisine, charcoal-fired BBQ, signature Raan Biryani, and fresh seafood specialties. Relax in our down-to-earth ambiance featuring spacious outdoor and rooftop seating, backed by massive free parking space right on NH-8.",
  heroText:
    "A family restaurant on NH-8 Kajipura, Kheda, serving authentic Mughlai, charcoal BBQ and seafood since 2019.",
  storyTitle: "Where Every Flavor Tells a Story",
  storyParagraphs: [
    "Dawat began in 2019 with a simple idea: bring the royal flavours of Mughlai cooking and the smoky magic of charcoal BBQ to Kheda, at a place where families and friends feel at home.",
    "Today we are known for our irresistible non-vegetarian delicacies, our signature Raan Biryani and fresh seafood specialties. Every dish is prepared fresh, with whole spices, real charcoal and recipes we have perfected over the years.",
    "Whether you dine under the stars in our open-air garden, enjoy the breeze on the rooftop, or stop by on the highway, you will always find a warm welcome and plenty of free parking right on NH-8.",
  ],
  highlights: [
    { value: "2019", label: "Serving Kheda since" },
    { value: "12 hrs", label: "Open daily, 1 PM – 1 AM" },
    { value: "Rooftop", label: "& open-air garden seating" },
    { value: "Free", label: "Spacious highway parking" },
  ],
};

/* ---------------- Ready-to-use values for the pages ---------------- */

type Phone = { label: string; tel: string };

export type Site = Omit<SiteSettings, "phones" | "social"> & {
  phones: { primary: Phone; secondary: Phone; tertiary: Phone };
  whatsapp: string;
  social: SiteSettings["social"] & { maps: string; mapEmbed: string };
};

/** "+91 83208 12121" → "+918320812121" */
const toTel = (label: string) => label.replace(/[^\d+]/g, "");

const phone = (label: string): Phone => ({ label, tel: toTel(label) });

const WHATSAPP_MESSAGE = "Hello Dawat Restaurant, I would like to reserve a table / order food";

/** Turns the editable settings into everything the pages need (tel: links, map URLs…). */
export function buildSite(settings: SiteSettings): Site {
  const mapQuery = encodeURIComponent(settings.mapQuery).replace(/%20/g, "+");
  const waDigits = settings.whatsappNumber.replace(/\D/g, "");

  return {
    ...settings,
    phones: {
      primary: phone(settings.phones.primary),
      secondary: phone(settings.phones.secondary),
      tertiary: phone(settings.phones.tertiary),
    },
    whatsapp: `https://wa.me/${waDigits}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
    social: {
      ...settings.social,
      maps: `https://maps.google.com/?q=${mapQuery}`,
      mapEmbed: `https://maps.google.com/maps?q=${mapQuery}&output=embed`,
    },
  };
}

export const telHref = (tel: string) => `tel:${tel}`;

/** tel: link for the main booking number. */
export const primaryTel = (site: Site) => telHref(site.phones.primary.tel);

/* ---------------- Merging saved values over defaults ---------------- */

type Json = Record<string, unknown>;

const isObject = (v: unknown): v is Json => typeof v === "object" && v !== null && !Array.isArray(v);

/**
 * Deep-merges `saved` over `defaults`, keeping only keys and value types that exist
 * in the defaults, so a half-filled or outdated row can never break the website.
 */
export function mergeWithDefaults<T>(defaults: T, saved: unknown): T {
  if (Array.isArray(defaults)) {
    return (Array.isArray(saved) && saved.length > 0 ? saved : defaults) as T;
  }
  if (isObject(defaults)) {
    const out: Json = { ...defaults };
    if (isObject(saved)) {
      for (const key of Object.keys(defaults)) {
        out[key] = mergeWithDefaults(defaults[key], saved[key]);
      }
    }
    return out as T;
  }
  return (typeof saved === typeof defaults && saved !== "" ? saved : defaults) as T;
}
