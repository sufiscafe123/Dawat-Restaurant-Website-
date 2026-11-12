import Image from "next/image";
import Link from "next/link";
import { ButtonLink, SectionHeading } from "../Button";
import { featuredDishes, formatPrice } from "@/lib/data";

export default function FeaturedMenu() {
  return (
    <section className="section menu" aria-label="menu" id="menu">
      <div className="container">
        <SectionHeading subtitle="Special Selection" title="Delicious Menu" center />

        <ul className="grid-list">
          {featuredDishes.map((dish) => (
            <li key={dish.name}>
              <div className="menu-card hover:card">
                <figure className="card-banner img-holder" style={{ "--width": 100, "--height": 100 } as React.CSSProperties}>
                  <Image src={dish.image} width={100} height={100} alt={dish.name} className="img-cover" />
                </figure>

                <div>
                  <div className="title-wrapper">
                    <h3 className="title-3">
                      <Link href="/menu" className="card-title">
                        {dish.name}
                      </Link>
                    </h3>

                    {dish.badge && <span className="badge label-1">{dish.badge}</span>}

                    <span className="span title-2">{formatPrice(dish.price)}</span>
                  </div>

                  <p className="card-text label-1">{dish.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <p className="menu-text text-center">
          Daily open from <span className="span">1:00 PM</span> to <span className="span">1:00 AM</span> on NH-8
          Kajipura, Kheda
        </p>

        <ButtonLink href="/menu" label="View Full Menu" />

        <Image src="/images/shape-5.png" width={921} height={1036} alt="" className="shape shape-2 move-anim" />
        <Image src="/images/shape-6.png" width={343} height={345} alt="" className="shape shape-3 move-anim" />
      </div>
    </section>
  );
}
