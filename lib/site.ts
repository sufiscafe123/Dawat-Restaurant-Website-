/**
 * Central restaurant info. Update contact details here and they
 * change everywhere on the site.
 */
export const site = {
  name: "Dawat Restaurant",
  tagline: "Taste That Touches Your Heart",
  address: {
    short: "NH-8, Kajipura, Opp. Sumar Logistics, Kheda, Gujarat — 387120",
    line1: "NH-8, Kajipura, Opp. Sumar Logistics,",
    line2: "Nearby Coca-Cola, Kheda, Gujarat — 387120",
    full: "NH-8, Kajipura, Opposite Sumar Logistics, Nearby Coca-Cola, Kheda, Gujarat — 387120",
  },
  hours: "1:00 PM – 1:00 AM",
  phones: {
    primary: { label: "+91 83208 12121", tel: "+918320812121" },
    secondary: { label: "+91 79849 05342", tel: "+917984905342" },
    tertiary: { label: "+91 95370 05566", tel: "+919537005566" },
  },
  whatsapp:
    "https://wa.me/918320812121?text=Hello%20Dawat%20Restaurant%2C%20I%20would%20like%20to%20reserve%20a%20table%20%2F%20order%20food",
  social: {
    facebook: "https://www.facebook.com/p/Dawat-Restaurant-Kheda-100063700326190/",
    instagram: "https://www.instagram.com/dawatrestaurant_/",
    maps: "https://maps.google.com/?q=Dawat+Restaurant+Kajipura+Kheda+Gujarat",
    mapEmbed: "https://maps.google.com/maps?q=Dawat+Restaurant+Kajipura+Kheda+Gujarat&output=embed",
  },
} as const;

export const telHref = (tel: string) => `tel:${tel}`;
export const PRIMARY_TEL = telHref(site.phones.primary.tel);
