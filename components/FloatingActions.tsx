"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IoCallOutline, IoChevronUpOutline, IoLogoWhatsapp } from "react-icons/io5";
import { PRIMARY_TEL, site } from "@/lib/site";

/** Call / WhatsApp / back-to-top buttons pinned to the bottom-right corner. */
export default function FloatingActions() {
  const pathname = usePathname();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY >= 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Call / WhatsApp shortcuts are hidden on the home page.
  const showContactButtons = pathname !== "/";

  return (
    <div className="floating-actions-group">
      {showContactButtons && (
      <>
      <a
        href={PRIMARY_TEL}
        className="floating-action-btn call-btn"
        aria-label="Call Dawat Restaurant"
        title={`Call Us: ${site.phones.primary.label}`}
      >
        <IoCallOutline aria-hidden="true" />
      </a>

      <a
        href={site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-action-btn whatsapp-btn"
        aria-label="Chat on WhatsApp"
        title="WhatsApp Us"
      >
        <IoLogoWhatsapp aria-hidden="true" />
      </a>
      </>
      )}

      <a
        href="#top"
        className={`floating-action-btn back-top-btn${showTop ? " active" : ""}`}
        aria-label="Back to top"
        title="Back to top"
      >
        <IoChevronUpOutline aria-hidden="true" />
      </a>
    </div>
  );
}
