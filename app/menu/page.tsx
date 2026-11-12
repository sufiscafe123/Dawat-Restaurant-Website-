import type { Metadata } from "next";
import { ButtonLink } from "@/components/Button";
import MenuCategorySection from "@/components/menu/MenuCategorySection";
import MenuNav from "@/components/menu/MenuNav";
import { menuCategories } from "@/lib/data";
import { PRIMARY_TEL, site } from "@/lib/site";
import "./menu.css";

export const metadata: Metadata = {
  title: "Our Menu",
  description: `Explore the authentic menu of Dawat Restaurant in Kheda, Gujarat. Famous for Mughlai, BBQ, Sizzlers, Seafood & Chicken specialties. Call ${site.phones.primary.label} for bookings.`,
};

export default function MenuPage() {
  const phone = site.phones.primary.label;

  return (
    <>
      <section className="page-hero text-center" style={{ backgroundImage: "url('/images/hero-slider-1.jpg')" }}>
        <div className="container">
          <p className="label-2 section-subtitle">{site.tagline}</p>
          <h1 className="display-1 hero-title">Our Complete Menu</h1>
          <p className="body-2 hero-text">
            Authentic Non-Veg, Mughlai curries, sizzling tandoori starters, fresh coastal seafood &amp; sizzlers
            prepared fresh daily at Dawat Restaurant, Kheda.
          </p>

          <div className="btn-group">
            <ButtonLink href={PRIMARY_TEL} label={`Call to Order: ${phone}`} hoverLabel="Call Now" />
            <ButtonLink href={PRIMARY_TEL} label="Book Table" variant="secondary" />
          </div>
        </div>
      </section>

      <MenuNav categories={menuCategories.map(({ id, navLabel }) => ({ id, label: navLabel }))} />

      <section className="section menu-details">
        <div className="container">
          {menuCategories.map((category) => (
            <MenuCategorySection key={category.id} category={category} />
          ))}

          <div className="order-cta-box text-center">
            <p className="label-2 section-subtitle">Ready To Experience Authentic Taste?</p>
            <h2 className="headline-1 order-cta-title">Book Your Table or Order Now</h2>
            <p className="body-2 order-cta-text">
              Enjoy rooftop dining, spacious outdoor garden seating, or quick highway delivery across Kheda, Gujarat.
            </p>
            <div className="btn-group">
              <ButtonLink href={PRIMARY_TEL} label={`Book Table (${phone})`} hoverLabel="Call Now to Book" variant="secondary" />
              <ButtonLink href="/" label="Back To Home" hoverLabel="Home Page" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
