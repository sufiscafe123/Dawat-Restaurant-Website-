import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "../Button";
import { services } from "@/lib/data";

export default function Services() {
  return (
    <section className="section service bg-black-10 text-center" aria-label="service">
      <div className="container">
        <SectionHeading subtitle="Taste That Touches Your Heart" title="Our Famous Specialties">
          <p className="section-text">
            Celebrated across Gujarat for rich authentic Mughlai gravies, sizzling charcoal BBQ, signature
            tender Raan Biryani, and fresh seafood specialties.
          </p>
        </SectionHeading>

        <ul className="grid-list">
          {services.map((service, i) => (
            <li key={service.title}>
              <div className="service-card">
                <Link href="/menu" className={`has-before hover:shine${i === 0 ? " shine-auto" : ""}`}>
                  <figure className="card-banner img-holder" style={{ "--width": 285, "--height": 336 } as React.CSSProperties}>
                    <Image src={service.image} width={285} height={336} alt={service.title} className="img-cover" />
                  </figure>
                </Link>

                <div className="card-content">
                  <h3 className="title-4 card-title">
                    <Link href="/menu">{service.title}</Link>
                  </h3>
                  <Link href="/menu" className="btn-text hover-underline label-2">
                    View Menu
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <Image src="/images/shape-1.png" width={246} height={412} alt="" className="shape shape-1 move-anim" />
        <Image src="/images/shape-2.png" width={343} height={345} alt="" className="shape shape-2 move-anim" />
      </div>
    </section>
  );
}
