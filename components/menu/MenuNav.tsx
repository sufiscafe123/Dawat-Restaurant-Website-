"use client";

import { useEffect, useState } from "react";

type NavItem = { id: string; label: string };

/** Sticky category bar that highlights the section currently in view. */
export default function MenuNav({ categories }: { categories: NavItem[] }) {
  const [activeId, setActiveId] = useState(categories[0]?.id);

  useEffect(() => {
    const sections = categories
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      // A thin band just below the sticky header decides the active section.
      { rootMargin: "-180px 0px -60% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [categories]);

  return (
    <nav className="menu-nav-sticky" aria-label="Menu categories">
      <div className="container">
        <div className="menu-nav-scroll">
          {categories.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`menu-nav-link${activeId === id ? " active" : ""}`}
              aria-current={activeId === id ? "true" : undefined}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
