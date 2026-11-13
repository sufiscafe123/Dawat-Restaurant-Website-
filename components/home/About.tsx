"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ButtonLink } from "../Button";
import { useAbout, useSite } from "@/components/SiteProvider";
import { primaryTel } from "@/lib/site";

/** Moves layered images opposite to the cursor for a subtle depth effect. */
function useParallax() {
  const bannerRef = useRef<HTMLImageElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layers: [HTMLElement | null, number][] = [
      [bannerRef.current, 1],
      [floatRef.current, 1.75],
    ];

    const onMove = (e: MouseEvent) => {
      const x = 5 - (e.clientX / window.innerWidth) * 10;
      const y = 5 - (e.clientY / window.innerHeight) * 10;
      for (const [el, speed] of layers) {
        if (el) el.style.transform = `translate3d(${x * speed}px, ${y * speed}px, 0)`;
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return { bannerRef, floatRef };
}

export default function About() {
  const { bannerRef, floatRef } = useParallax();
  const site = useSite();
  const about = useAbout();
  const PRIMARY_TEL = primaryTel(site);

  return (
    <section className="section about text-center" aria-labelledby="about-label" id="about">
      <div className="container">
        <div className="about-content">
          <p className="label-2 section-subtitle" id="about-label">
            Our Story
          </p>

          <h2 className="headline-1 section-title">{site.tagline}</h2>

          <p className="section-text">{about.homeText}</p>

          <div className="contact-label">Book Through Call</div>

          <a href={PRIMARY_TEL} className="body-1 contact-number hover-underline">
            {site.phones.primary.label}
          </a>

          <ButtonLink href="/menu" label="Explore Menu" />
        </div>

        <figure className="about-banner">
          <Image
            ref={bannerRef}
            src="/images/about-main.webp"
            width={570}
            height={570}
            alt="I Love Dawat sign in the garden"
            className="w-100 img-square"
          />

          <div ref={floatRef} className="abs-img abs-img-1 has-before">
            <Image
              src="/images/about-overlay.webp"
              width={285}
              height={285}
              alt="Outdoor seating at Dawat Restaurant"
              className="w-100 img-square"
            />
          </div>

          <div className="abs-img abs-img-2 has-before">
            <Image src="/images/badge-2.png" width={133} height={134} alt="" />
          </div>
        </figure>

        <Image src="/images/shape-3.png" width={197} height={194} alt="" className="shape" />
      </div>
    </section>
  );
}
