import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  IoCallOutline,
  IoChevronDown,
  IoLocationOutline,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoWhatsapp,
  IoNavigateOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { ButtonLink, SectionHeading } from "@/components/Button";
import Reservation from "@/components/home/Reservation";
import { PRIMARY_TEL, site, telHref } from "@/lib/site";
import "./contact.css";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Call ${site.phones.primary.label}, WhatsApp us or visit Dawat Restaurant on NH-8 Kajipura, Kheda. Open daily ${site.hours}. Book your table online.`,
};

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: "What are your opening hours?",
    a: <>We are open every day of the week, from {site.hours}.</>,
  },
  {
    q: "How can I book a table?",
    a: (
      <>
        Call us on {site.phones.primary.label}, send us a WhatsApp message, or fill the reservation form on this
        page. It sends your booking details to us on WhatsApp.
      </>
    ),
  },
  {
    q: "Can I book for a family function or big party?",
    a: <>Yes. Choose “Family / Big Party” in the form or call us, and we will arrange seating for your group.</>,
  },
  {
    q: "Is the restaurant good for kids?",
    a: <>Absolutely. We have a kids play area, jhula (swings) and an open garden, so the whole family can relax.</>,
  },
  {
    q: "Is parking available?",
    a: <>Yes, we have a huge free parking space right on the NH-8 highway.</>,
  },
  {
    q: "Is your food halal?",
    a: <>Yes, we serve authentic halal Non-Veg, Mughlai, BBQ and seafood, along with veg specials and sizzlers.</>,
  },
];

export default function ContactPage() {
  const { primary, secondary, tertiary } = site.phones;

  const cards = [
    {
      icon: IoCallOutline,
      title: "Call Us",
      body: (
        <>
          <a href={PRIMARY_TEL}>{primary.label}</a>
          <a href={telHref(secondary.tel)}>{secondary.label}</a>
          <a href={telHref(tertiary.tel)}>{tertiary.label}</a>
        </>
      ),
      action: { href: PRIMARY_TEL, label: "Call Now" },
    },
    {
      icon: IoLogoWhatsapp,
      title: "WhatsApp",
      body: <p>Message us to book a table or ask about today&apos;s specials.</p>,
      action: { href: site.whatsapp, label: "Chat Now" },
    },
    {
      icon: IoLocationOutline,
      title: "Visit Us",
      body: <address>{site.address.full}</address>,
      action: { href: site.social.maps, label: "Get Directions" },
    },
    {
      icon: IoTimeOutline,
      title: "Opening Hours",
      body: (
        <>
          <p className="contact-card-highlight">Daily : {site.hours}</p>
          <p>Open all 7 days, lunch &amp; dinner</p>
        </>
      ),
      action: { href: "#reservation", label: "Book A Table" },
    },
  ];

  return (
    <>
      {/* Page hero */}
      <section className="page-hero text-center" style={{ backgroundImage: "url('/images/about-overlay.webp')" }}>
        <div className="container">
          <p className="label-2 section-subtitle">We&apos;d Love To Host You</p>
          <h1 className="display-1 hero-title">Contact Us</h1>
          <p className="body-2 hero-text">
            Call, WhatsApp or drop by. Book a table for dinner, a family function or a big celebration.
          </p>
          <div className="btn-group">
            <ButtonLink href={PRIMARY_TEL} label={`Call ${primary.label}`} hoverLabel="Call Now" />
            <ButtonLink href={site.whatsapp} label="WhatsApp Us" variant="secondary" />
          </div>
        </div>
      </section>

      {/* Quick contact cards */}
      <section className="section contact-cards-section" aria-label="Ways to reach us">
        <div className="container">
          <ul className="contact-cards">
            {cards.map(({ icon: Icon, title, body, action }) => {
              const external = action.href.startsWith("http");
              return (
                <li key={title} className="contact-card">
                  <div className="contact-card-icon">
                    <Icon aria-hidden="true" />
                  </div>
                  <h2 className="title-2 contact-card-title">{title}</h2>
                  <div className="contact-card-body">{body}</div>
                  <a
                    href={action.href}
                    className="btn-text hover-underline label-2 contact-card-link"
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {action.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Booking form (sends to WhatsApp) */}
      <Reservation standalone />

      {/* Map + social */}
      <section className="section contact-map-section" aria-labelledby="map-label">
        <div className="container">
          <SectionHeading subtitle="Find Us" title="Right On NH-8, Kajipura" id="map-label" center>
            <p className="section-text contact-map-intro">
              Opposite Sumar Logistics, near Coca-Cola, Kheda. Easy to reach from the highway, with plenty of free
              parking.
            </p>
          </SectionHeading>

          <div className="contact-map">
            <iframe
              src={site.social.mapEmbed}
              title="Map showing Dawat Restaurant, Kajipura, Kheda"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a href={site.social.maps} target="_blank" rel="noopener noreferrer" className="contact-map-btn">
              <IoNavigateOutline aria-hidden="true" />
              Open in Google Maps
            </a>
          </div>

          <div className="contact-social">
            <p className="label-2 contact-social-label">Follow Dawat</p>
            <div className="contact-social-links">
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <IoLogoInstagram aria-hidden="true" />
                <span>Instagram</span>
              </a>
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <IoLogoFacebook aria-hidden="true" />
                <span>Facebook</span>
              </a>
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <IoLogoWhatsapp aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section contact-faq bg-black-10" aria-labelledby="faq-label">
        <div className="container">
          <SectionHeading subtitle="Good To Know" title="Frequently Asked Questions" id="faq-label" center />

          <div className="faq-list">
            {faqs.map(({ q, a }, i) => (
              <details key={q} className="faq-item" open={i === 0}>
                <summary className="faq-question">
                  <span>{q}</span>
                  <IoChevronDown aria-hidden="true" />
                </summary>
                <p className="faq-answer">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
