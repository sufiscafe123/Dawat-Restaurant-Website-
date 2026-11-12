import type { IconType } from "react-icons";
import { GiTreeSwing } from "react-icons/gi";
import { MdOutlineChildCare } from "react-icons/md";
import { TbAirConditioning, TbCoffee, TbParking, TbTrees } from "react-icons/tb";
import { SectionHeading } from "./Button";
import { facilities, type FacilityIcon } from "@/lib/data";

const icons: Record<FacilityIcon, IconType> = {
  kids: MdOutlineChildCare,
  swing: GiTreeSwing,
  garden: TbTrees,
  ac: TbAirConditioning,
  parking: TbParking,
  cafe: TbCoffee,
};

/** Kids play area, jhula, garden, AC hall, parking and Sufi's Cafe. */
export default function Facilities() {
  return (
    <section className="section facilities text-center" aria-labelledby="facilities-label">
      <div className="container">
        <SectionHeading subtitle="Fun For The Whole Family" title="Facilities at Dawat" id="facilities-label" center />

        <ul className="facilities-list">
          {facilities.map(({ icon, title, text }) => {
            const Icon = icons[icon];
            return (
              <li key={title} className="facility-card">
                <div className="facility-icon">
                  <Icon aria-hidden="true" />
                </div>
                <h3 className="title-3 facility-title">{title}</h3>
                <p className="facility-text">{text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
