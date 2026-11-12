"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { ButtonLink } from "../Button";
import { heroSlides } from "@/lib/data";

const AUTO_SLIDE_MS = 7000;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = heroSlides.length;

  const next = useCallback(() => setCurrent((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setCurrent((i) => (i - 1 + count) % count), [count]);

  // Auto-advance; restarts after every manual change so slides never jump early.
  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(next, AUTO_SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [current, paused, next]);

  const pauseProps = {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
  };

  return (
    <section className="hero text-center" aria-label="home" id="home">
      <ul className="hero-slider">
        {heroSlides.map((slide, i) => {
          const isActive = i === current;
          // Only the visible slide is the page's <h1>.
          const Heading = isActive ? "h1" : "h2";

          return (
          <li key={slide.image} className={`slider-item${isActive ? " active" : ""}`} aria-hidden={!isActive}>
            <div className="slider-bg">
              <Image
                src={slide.image}
                width={1880}
                height={950}
                alt=""
                className="img-cover"
                priority={i === 0}
                sizes="100vw"
              />
            </div>

            <p className="label-2 section-subtitle slider-reveal">{slide.subtitle}</p>

            <Heading className="display-1 hero-title slider-reveal">
              {slide.title[0]} <br />
              {slide.title[1]}
            </Heading>

            <p className="body-2 hero-text slider-reveal">{slide.text}</p>

            <ButtonLink href="/menu" label="View Our Menu" className="slider-reveal" />
          </li>
          );
        })}
      </ul>

      <button className="slider-btn prev" aria-label="slide to previous" onClick={prev} {...pauseProps}>
        <IoChevronBack />
      </button>

      <button className="slider-btn next" aria-label="slide to next" onClick={next} {...pauseProps}>
        <IoChevronForward />
      </button>

      <Link href="#reservation" className="hero-btn has-after">
        <Image src="/images/hero-icon.png" width={48} height={48} alt="" />
        <span className="label-2 text-center span">Book A Table</span>
      </Link>
    </section>
  );
}
