import Image from "next/image";
import Link from "next/link";
import { ButtonLink, SectionHeading } from "../Button";
import { getMenu, getSite } from "@/lib/content";
import { featuredDishNames } from "@/lib/data";
import { formatMenuPrice } from "@/lib/menu";

/** Home page "Delicious Menu": the chosen dishes, with live names, prices and photos from the menu. */
export default async function FeaturedMenu() {
  const [menu, site] = await Promise.all([getMenu(), getSite()]);

  const dishes = featuredDishNames.flatMap((name) => {
    for (const category of menu) {
      const item = category.items.find((i) => i.name === name);
      if (item) return [{ ...item, category: category.title, categoryId: category.id }];
    }
    return []; // Dish removed or renamed in the menu → simply not shown.
  });

  return (
    <section className="section menu" aria-label="menu" id="menu">
      <div className="container">
        <SectionHeading subtitle="Special Selection" title="Delicious Menu" center />

        <ul className="grid-list">
          {dishes.map((dish) => (
            <li key={dish.name}>
              <div className="menu-card hover:card">
                <figure className="card-banner img-holder" style={{ "--width": 100, "--height": 100 } as React.CSSProperties}>
                  {dish.image && (
                    <Image src={dish.image} width={100} height={100} alt={dish.name} className="img-cover" />
                  )}
                </figure>

                <div>
                  <div className="title-wrapper">
                    <h3 className="title-3">
                      <Link href={`/menu#${dish.categoryId}`} className="card-title">
                        {dish.name}
                      </Link>
                    </h3>

                    <span className="span title-2">{formatMenuPrice(dish.price)}</span>
                  </div>

                  <p className="card-text label-1">{dish.category}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <p className="menu-text text-center">
          Daily open <span className="span">{site.hours}</span> on NH-8 Kajipura, Kheda
        </p>

        <ButtonLink href="/menu" label="View Full Menu" />

        <Image src="/images/shape-5.png" width={921} height={1036} alt="" className="shape shape-2 move-anim" />
        <Image src="/images/shape-6.png" width={343} height={345} alt="" className="shape shape-3 move-anim" />
      </div>
    </section>
  );
}
