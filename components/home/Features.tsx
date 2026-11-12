import Image from "next/image";
import { SectionHeading } from "../Button";
import { features } from "@/lib/data";

export default function Features() {
  return (
    <section className="section features text-center" aria-label="features" id="features">
      <div className="container">
        <SectionHeading subtitle="Why Choose Us" title="Our Strength" />

        <ul className="grid-list">
          {features.map((feature) => (
            <li key={feature.title} className="feature-item">
              <div className="feature-card">
                <div className="card-icon">
                  <Image src={feature.icon} width={100} height={80} alt="" />
                </div>
                <h3 className="title-2 card-title">{feature.title}</h3>
                <p className="label-1 card-text">{feature.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <Image src="/images/shape-7.png" width={208} height={178} alt="" className="shape shape-1" />
        <Image src="/images/shape-8.png" width={120} height={115} alt="" className="shape shape-2" />
      </div>
    </section>
  );
}
