import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "./Button";
import { getSite } from "@/lib/content";
import { primaryTel, telHref } from "@/lib/site";

const pageLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menus" },
  { href: "/about", label: "About Us" },
  { href: "/gallery", label: "Gallery" },
  { href: "/#features", label: "Specialties" },
  { href: "/#reservation", label: "Book Table" },
  { href: "/contact", label: "Contact Us" },
];

export default async function Footer() {
  const site = await getSite();
  const { primary, secondary, tertiary } = site.phones;

  const socialLinks = [
    { href: site.social.facebook, label: "Facebook" },
    { href: site.social.instagram, label: "Instagram" },
    { href: site.social.maps, label: "Google Map Location" },
  ];

  return (
    <footer
      id="contact"
      className="footer section has-bg-image text-center"
      style={{ backgroundImage: "url('/images/footer-bg.jpg')" }}
    >
      <div className="container">
        <div className="footer-top grid-list">
          <div className="footer-brand has-before has-after">
            <Link href="/" className="logo">
              <Image src="/images/logo.svg" width={160} height={50} alt="Dawat Restaurant Home" />
            </Link>

            <address className="body-4">{site.address.full}</address>

            <a href={primaryTel(site)} className="body-4 contact-link">
              Primary: {primary.label}
            </a>
            <a href={telHref(secondary.tel)} className="body-4 contact-link">
              Booking: {secondary.label} / {tertiary.label}
            </a>

            <p className="body-4">Daily : {site.hours} (Open Daily)</p>

            <div className="wrapper">
              <div className="separator" />
              <div className="separator" />
              <div className="separator" />
            </div>

            <p className="title-1">{site.tagline}</p>

            <p className="label-1">
              Follow us &amp; stay updated with our latest <span className="span">Specials &amp; Offers.</span>
            </p>

            <div className="footer-cta">
              <ButtonLink href={site.social.instagram} label="Follow on Instagram" variant="secondary" />
            </div>
          </div>

          <ul className="footer-list">
            {pageLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="label-2 footer-link hover-underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="footer-list">
            {socialLinks.map(({ href, label }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="label-2 footer-link hover-underline">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {new Date().getFullYear()} {site.name}, Kheda, Gujarat. All Rights Reserved | Powered by{" "}
            <span className="credit">Safvan &amp; Saad</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
