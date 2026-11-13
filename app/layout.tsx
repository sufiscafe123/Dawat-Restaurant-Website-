import type { Metadata, Viewport } from "next";
import { DM_Sans, Forum } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const forum = Forum({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-forum",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dawat Restaurant - Amazing & Delicious Food",
    template: "%s | Dawat Restaurant, Kheda",
  },
  description:
    "Dawat Restaurant - Best Non-Veg, Mughlai, BBQ & Seafood in Kheda, Gujarat. Open daily 1:00 PM to 1:00 AM on NH-8 Kajipura.",
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#0d0c0a",
};

/** Shared by the public website (app/(site)) and the admin panel (app/admin). */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${forum.variable}`}>
      <body id="top">{children}</body>
    </html>
  );
}
