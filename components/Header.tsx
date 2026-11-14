"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { ButtonLink } from "./Button";
import { navLinks } from "@/lib/nav";
import { PRIMARY_TEL, site, telHref } from "@/lib/site";

function Logo() {
  return (
    <Link href="/" className="logo">
      <Image src="/images/logo.svg" width={160} height={50} alt="Dawat Restaurant - Home" priority />
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Sticky header: show background after 50px, hide while scrolling down.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const isScrolled = y >= 50;
      setScrolled(isScrolled);
      setHidden(isScrolled && y > lastY);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    document.body.classList.toggle("nav-active", navOpen);
  }, [navOpen]);

  // Close the mobile menu after navigating.
  useEffect(() => setNavOpen(false), [pathname]);

  const toggleNav = () => setNavOpen((open) => !open);
  const closeNav = () => setNavOpen(false);
  const isActive = (href: string) => href === pathname;

  const headerClass = ["header", scrolled && "active", hidden && "hide"].filter(Boolean).join(" ");
  const { primary, secondary, tertiary } = site.phones;

  return (
    <header className={headerClass}>
      <div className="container">
        <Logo />

        <nav className={`navbar${navOpen ? " active" : ""}`} aria-label="Main">
          <button className="close-btn" aria-label="close menu" onClick={closeNav}>
            <IoCloseOutline aria-hidden="true" />
          </button>

          <Logo />

          <ul className="navbar-list">
            {navLinks.map(({ href, label }) => (
              <li key={href} className="navbar-item">
                <Link
                  href={href}
                  onClick={closeNav}
                  className={`navbar-link hover-underline${isActive(href) ? " active" : ""}`}
                  aria-current={isActive(href) ? "page" : undefined}
                >
                  <div className="separator" />
                  <span className="span">{label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="text-center">
            <p className="headline-1 navbar-title">Visit Us</p>

            <address className="body-4">
              {site.address.line1}
              <br />
              {site.address.line2}
            </address>

            <p className="body-4 navbar-text">Open: {site.hours} Daily</p>

            <a href={telHref(secondary.tel)} className="body-4 sidebar-link">
              {secondary.label} / {tertiary.label}
            </a>

            <div className="separator" />

            <p className="contact-label">Booking Request</p>

            <a href={PRIMARY_TEL} className="body-1 contact-number hover-underline">
              {primary.label}
            </a>
          </div>
        </nav>

        <ButtonLink href={PRIMARY_TEL} label="Book Table" variant="secondary" />

        <button className="nav-open-btn" aria-label="open menu" aria-expanded={navOpen} onClick={toggleNav}>
          <span className="line line-1" />
          <span className="line line-2" />
          <span className="line line-3" />
        </button>

        <div className={`overlay${navOpen ? " active" : ""}`} onClick={closeNav} />
      </div>
    </header>
  );
}
