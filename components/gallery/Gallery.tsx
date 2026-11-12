"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IoChevronBack, IoChevronForward, IoCloseOutline, IoExpandOutline } from "react-icons/io5";
import { galleryCategories, galleryImages, type GalleryCategory } from "@/lib/data";

type Filter = GalleryCategory | "all";

export default function Gallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const images = useMemo(
    () => (filter === "all" ? galleryImages : galleryImages.filter((img) => img.category === filter)),
    [filter],
  );

  const counts = useMemo(() => {
    const result: Record<Filter, number> = { all: galleryImages.length, food: 0, ambience: 0 };
    for (const img of galleryImages) result[img.category]++;
    return result;
  }, []);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setOpenIndex((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length],
  );

  // Keyboard controls + lock page scroll while the lightbox is open.
  useEffect(() => {
    if (openIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };

    document.body.classList.add("nav-active");
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("nav-active");
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, close, step]);

  const current = openIndex === null ? null : images[openIndex];

  return (
    <>
      <div className="gallery-filters" role="tablist" aria-label="Filter photos">
        {galleryCategories.map(({ id, label }) => (
          <button
            key={id}
            role="tab"
            aria-selected={filter === id}
            className={`gallery-filter${filter === id ? " active" : ""}`}
            onClick={() => setFilter(id)}
          >
            {label}
            <span className="gallery-filter-count">{counts[id]}</span>
          </button>
        ))}
      </div>

      <ul className="gallery-grid">
        {images.map((img, i) => (
          <li key={img.src} className={`gallery-item${img.layout ? ` is-${img.layout}` : ""}`}>
            <button className="gallery-tile" onClick={() => setOpenIndex(i)} aria-label={`View photo: ${img.caption}`}>
              <Image
                src={img.src}
                width={img.width}
                height={img.height}
                alt={img.caption}
                sizes={img.layout === "large" ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
              />
              <span className="gallery-overlay">
                <IoExpandOutline aria-hidden="true" />
                <span className="gallery-caption">{img.caption}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {current && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={current.caption} onClick={close}>
          <button className="lightbox-btn lightbox-close" aria-label="Close" onClick={close}>
            <IoCloseOutline />
          </button>

          <button
            className="lightbox-btn lightbox-prev"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
          >
            <IoChevronBack />
          </button>

          <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
            <Image
              key={current.src}
              src={current.src}
              width={current.width}
              height={current.height}
              alt={current.caption}
              sizes="90vw"
              className="lightbox-img"
            />
            <figcaption className="lightbox-caption">
              <span>{current.caption}</span>
              <span className="lightbox-counter">
                {(openIndex ?? 0) + 1} / {images.length}
              </span>
            </figcaption>
          </figure>

          <button
            className="lightbox-btn lightbox-next"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
          >
            <IoChevronForward />
          </button>
        </div>
      )}
    </>
  );
}
