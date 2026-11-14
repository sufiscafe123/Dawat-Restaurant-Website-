/**
 * All page content lives here, so sections render from data
 * instead of repeated markup.
 */

export type HeroSlide = {
  image: string;
  subtitle: string;
  title: [string, string];
  text: string;
};

export const heroSlides: HeroSlide[] = [
  {
    image: "/images/hero-slider-1.jpg",
    subtitle: "Taste That Touches Your Heart",
    title: ["For the love of", "delicious food"],
    text: "Famous for authentic Non-Veg cuisine, Mughlai flavors, BBQ & special Raan Biryani",
  },
  {
    image: "/images/hero-slider-2.jpg",
    subtitle: "Rooftop & Outdoor Seating",
    title: ["Flavors Inspired by", "Royal Traditions"],
    text: "Spacious down-to-earth ambiance with massive free parking space",
  },
  {
    image: "/images/hero-slider-3.jpg",
    subtitle: "Amazing & Delicious",
    title: ["Where every flavor", "tells a story"],
    text: "Come with family & feel the joy of mouthwatering food",
  },
];

export const services = [
  { image: "/images/service-1.jpg", title: "Dawat Special Starter" },
  { image: "/images/service-2.jpg", title: "Sizzling BBQ & Tandoori" },
  { image: "/images/service-3.jpg", title: "Seafood & Specials" },
];

/**
 * Dishes shown in the home page "Delicious Menu" section, in this order.
 * Names must match lib/menu.ts exactly; price and photo are taken from the menu,
 * so they always match the Menu page.
 */
export const featuredDishNames = [
  "Chicken Barbeque Sizzler",
  "Chicken Malai Tikka Sizzler",
  "Leg Dhamaka",
  "Raan Biryani",
  "Sea Food Platter",
  "Barbeque Platter",
];

export const features = [
  {
    icon: "/images/features-icon-1.png",
    title: "Authentic Halal Cuisine",
    text: "Finest Non-Veg, rich Mughlai gravies, sizzling BBQ & seafood.",
  },
  {
    icon: "/images/features-icon-2.png",
    title: "Outdoor & Rooftop",
    text: "Spacious open-air garden and rooftop dining for family & friends.",
  },
  {
    icon: "/images/features-icon-3.png",
    title: "Master BBQ Chefs",
    text: "Specialized in charcoal tandoori items, kebabs & Raan Biryani.",
  },
  {
    icon: "/images/features-icon-4.png",
    title: "Massive Free Parking",
    text: "Huge convenient free parking space right on NH-8 highway.",
  },
];

/* ---------------- Gallery page ---------------- */

export type GalleryCategory = "food" | "ambience";

export type GalleryImage = {
  src: string;
  width: number;
  height: number;
  caption: string;
  category: GalleryCategory;
  /** Tile size in the grid: "large" = 2×2, "tall" = 1×2, default = 1×1. */
  layout?: "large" | "tall";
};

export const galleryCategories: { id: GalleryCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "food", label: "Food & Drinks" },
  { id: "ambience", label: "Ambience" },
];

/** Add new photos here: put the file in public/images and list it below. */
export const galleryImages: GalleryImage[] = [
  { src: "/images/about-main.webp", width: 1312, height: 1199, caption: "I ❤ Dawat", category: "ambience", layout: "large" },
  { src: "/images/about-overlay.webp", width: 1222, height: 1287, caption: "AC Hall", category: "ambience", layout: "tall" },
  { src: "/images/special-dish-banner.jpg", width: 940, height: 900, caption: "Charcoal Grilled Wings", category: "food" },
  { src: "/images/menu-2.png", width: 300, height: 300, caption: "Mutton Mughlai", category: "food" },
  { src: "/images/service-2.jpg", width: 285, height: 336, caption: "Sizzling BBQ", category: "food" },
  { src: "/images/menu-7.png", width: 300, height: 300, caption: "Chicken Bullet", category: "food" },
  { src: "/images/menu-10.png", width: 300, height: 300, caption: "Fish & Prawns", category: "food" },
  { src: "/images/menu-12.png", width: 300, height: 300, caption: "Paneer Sizzler", category: "food" },
];

/** Facilities shown on the About and Gallery pages. */
export type FacilityIcon = "kids" | "swing" | "garden" | "ac" | "parking" | "cafe";

export const facilities: { icon: FacilityIcon; title: string; text: string }[] = [
  { icon: "kids", title: "Kids Play Area", text: "A safe, fun play zone so little ones stay busy while you enjoy your meal." },
  { icon: "swing", title: "Jhula (Swings)", text: "Swings in the garden for kids and the young at heart." },
  { icon: "garden", title: "Garden Area", text: "Open-air garden seating under the lights, perfect for family evenings." },
  { icon: "ac", title: "AC Hall", text: "Cool, comfortable air-conditioned hall for dining in every season." },
  { icon: "parking", title: "Free Parking", text: "Huge free parking space right on the NH-8 highway." },
  { icon: "cafe", title: "Sufi's Cafe Nearby", text: "Round off your meal with a visit to our Sufi's Cafe, just nearby." },
];

