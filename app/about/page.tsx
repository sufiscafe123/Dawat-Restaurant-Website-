import type { Metadata } from "next";
import Image from "next/image";
import { IoCallOutline, IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import { ButtonLink, SectionHeading } from "@/components/Button";
import Facilities from "@/components/Facilities";
import Features from "@/components/home/Features";
import { PRIMARY_TEL, site, telHref } from "@/lib/site";
import "./about.css";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The story of Dawat Restaurant on NH-8 Kajipura, Kheda — serving authentic Mughlai, charcoal BBQ, Raan Biryani and seafood since 2019, with rooftop & garden seating and free parking.",
};

const highlights = [
  { value: "2019", label: "Serving Kheda since" },
  { value: "12 hrs", label: "Open daily, 1 PM – 1 AM" },
  { value: "Rooftop", label: "& open-air garden seating" },
  { value: "Free", label: "Spacious highway parking" },
];

const specialties = [
  {
    image: "/images/service-1.jpg",
    title: "Royal Mughlai",
    text: "Rich, slow-simmered gravies like Chicken Handi and Mutton Rogan Josh, cooked with whole spices the traditional way.",
  },
  {
    image: "/images/service-2.jpg",
    title: "Charcoal BBQ & Tandoor",
    text: "Kebabs, tikkas and tandoori platters fired over real charcoal for that smoky, unforgettable flavour.",
  },
  {
    image: "/images/service-3.jpg",
    title: "Biryani & Seafood",
    text: "Our signature Raan Biryani, fragrant Dum Biryani and fresh coastal fish and prawns, prepared daily.",
  },
];


export default function AboutPage() {
  const { primary, secondary, tertiary } = site.phones;

  return (
    <>
      {/* Page hero */}
      <section className="page-hero text-center" style={{ backgroundImage: "url('/images/about-main.webp')" }}>
        <div className="container">
          <p className="label-2 section-subtitle">{site.tagline}</p>
          <h1 className="display-1 hero-title">About Dawat</h1>
          <p className="body-2 hero-text">
            A family restaurant on NH-8 Kajipura, Kheda, serving authentic Mughlai, charcoal BBQ and seafood
            since 2019.
          </p>
        </div>
      </section>

      {/* Our story */}
      <section className="section about-story" aria-labelledby="story-label">
        <div className="container about-story-grid">
          <figure className="about-story-media">
            <Image
              src="/images/about-overlay.webp"
              width={570}
              height={570}
              alt="Outdoor seating at Dawat Restaurant"
              className="about-story-main img-square"
            />
            <div className="about-story-badge">
              <span className="about-story-badge-year">2019</span>
              <span className="about-story-badge-text">Since</span>
            </div>
          </figure>

          <div className="about-story-content">
            <SectionHeading subtitle="Our Story" title="Where Every Flavor Tells a Story" id="story-label" />

            <p className="section-text">
              Dawat began in 2019 with a simple idea: bring the royal flavours of Mughlai cooking and the smoky
              magic of charcoal BBQ to Kheda, at a place where families and friends feel at home.
            </p>
            <p className="section-text">
              Today we are known for our irresistible non-vegetarian delicacies, our signature Raan Biryani and
              fresh seafood specialties. Every dish is prepared fresh, with whole spices, real charcoal and
              recipes we have perfected over the years.
            </p>
            <p className="section-text">
              Whether you dine under the stars in our open-air garden, enjoy the breeze on the rooftop, or stop by
              on the highway, you will always find a warm welcome and plenty of free parking right on NH-8.
            </p>

            <div className="btn-group about-story-actions">
              <ButtonLink href="/menu" label="Explore Menu" />
              <ButtonLink href={PRIMARY_TEL} label="Book A Table" hoverLabel={primary.label} variant="secondary" />
            </div>
          </div>
        </div>
      </section>

      {/* Highlights strip */}
      <section className="about-highlights bg-black-10" aria-label="Highlights">
        <div className="container">
          <ul className="about-highlights-list">
            {highlights.map((item) => (
              <li key={item.label} className="about-highlight">
                <p className="about-highlight-value">{item.value}</p>
                <p className="about-highlight-label">{item.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What we're known for */}
      <section className="section about-specialties text-center" aria-label="Our specialties">
        <div className="container">
          <SectionHeading subtitle="What We Serve" title="Known For" center>
            <p className="section-text about-specialties-intro">
              Three kitchens of flavour under one roof, each cooked the way it should be.
            </p>
          </SectionHeading>

          <ul className="about-specialties-list">
            {specialties.map((item) => (
              <li key={item.title} className="about-specialty-card">
                <div className="about-specialty-img">
                  <Image src={item.image} width={285} height={336} alt={item.title} className="img-cover" />
                </div>
                <div className="about-specialty-body">
                  <h3 className="title-2 about-specialty-title">{item.title}</h3>
                  <p className="about-specialty-text">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Kids play area, jhula, garden, AC hall, parking, cafe */}
      <Facilities />

      {/* Our strength (shared with home page) */}
      <Features />

      {/* Visit us */}
      <section className="section about-visit bg-black-10" aria-labelledby="visit-label">
        <div className="container about-visit-grid">
          <div className="about-visit-info">
            <SectionHeading subtitle="Visit Us" title="Find Dawat" id="visit-label" />

            <ul className="about-visit-list">
              <li>
                <IoLocationOutline aria-hidden="true" />
                <div>
                  <p className="about-visit-label">Address</p>
                  <address>{site.address.full}</address>
                </div>
              </li>
              <li>
                <IoTimeOutline aria-hidden="true" />
                <div>
                  <p className="about-visit-label">Opening Hours</p>
                  <p>Daily : {site.hours} (Open Everyday)</p>
                </div>
              </li>
              <li>
                <IoCallOutline aria-hidden="true" />
                <div>
                  <p className="about-visit-label">Call &amp; Bookings</p>
                  <p>
                    <a href={PRIMARY_TEL}>{primary.label}</a>
                    {" / "}
                    <a href={telHref(secondary.tel)}>{secondary.label}</a>
                    {" / "}
                    <a href={telHref(tertiary.tel)}>{tertiary.label}</a>
                  </p>
                </div>
              </li>
            </ul>

            <div className="btn-group about-visit-actions">
              <ButtonLink href={site.social.maps} label="Get Directions" />
              <ButtonLink href={PRIMARY_TEL} label="Call Now" variant="secondary" />
            </div>
          </div>

          <div className="about-visit-map">
            <iframe
              src={site.social.mapEmbed}
              title="Map showing Dawat Restaurant, Kajipura, Kheda"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
