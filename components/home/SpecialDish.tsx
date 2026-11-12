import Image from "next/image";
import { ButtonLink } from "../Button";

export default function SpecialDish() {
  return (
    <section className="special-dish text-center" aria-labelledby="dish-label">
      <div className="special-dish-banner">
        <Image
          src="/images/special-dish-banner.jpg"
          width={940}
          height={900}
          alt="Dawat Special Starter"
          className="img-cover"
        />
      </div>

      <div className="special-dish-content bg-black-10">
        <div className="container">
          <Image src="/images/badge-1.png" width={28} height={41} alt="" className="badge" />

          <p className="section-subtitle label-2" id="dish-label">
            Special Dish
          </p>

          <h2 className="headline-1 section-title">Dawat Special Starter</h2>

          <p className="section-text">
            Succulent tandoori chicken &amp; mutton skewers infused with charcoal smoke, royal Mughlai herbs and
            butter glaze. Our signature masterpiece, crafted for true meat lovers.
          </p>

          <div className="wrapper">
            <span className="span body-1">₹430</span>
          </div>

          <ButtonLink href="/menu" label="View All Specials" />
        </div>
      </div>

      <Image src="/images/shape-4.png" width={179} height={359} alt="" className="shape shape-1" />
      <Image src="/images/shape-9.png" width={351} height={462} alt="" className="shape shape-2" />
    </section>
  );
}
