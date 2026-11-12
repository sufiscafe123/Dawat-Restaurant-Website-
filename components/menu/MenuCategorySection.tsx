import Image from "next/image";
import type { IconType } from "react-icons";
import { IoCallOutline, IoFlameOutline, IoLeafOutline, IoRestaurantOutline, IoWaterOutline } from "react-icons/io5";
import { formatPrice, type MenuCategory, type MenuIcon, type MenuItem } from "@/lib/data";
import { PRIMARY_TEL } from "@/lib/site";

const icons: Record<MenuIcon, IconType> = {
  flame: IoFlameOutline,
  restaurant: IoRestaurantOutline,
  water: IoWaterOutline,
  leaf: IoLeafOutline,
};

function DishCard({ item }: { item: MenuItem }) {
  return (
    <div className="menu-dish-card">
      <div className="dish-img-box">
        <Image src={item.image} width={110} height={110} alt={item.name} />
      </div>

      <div className="menu-dish-info">
        <span className="menu-dish-badge">{item.badge}</span>
        <div className="menu-dish-header">
          <h3 className="menu-dish-title">{item.name}</h3>
          <span className="menu-dish-price">{formatPrice(item.price, 2)}</span>
        </div>
        <p className="menu-dish-desc">{item.description}</p>
        <a href={PRIMARY_TEL} className="menu-dish-action">
          <span>Order on Call</span>
          <IoCallOutline aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

export default function MenuCategorySection({ category }: { category: MenuCategory }) {
  const Icon = icons[category.icon];

  return (
    <div id={category.id} className="menu-category-block">
      <div className="menu-section-header">
        <h2 className="menu-section-title">
          <Icon aria-hidden="true" />
          {category.title}
        </h2>
        <span className="menu-section-tag">
          {category.tag} • {category.items.length} Selections
        </span>
      </div>

      <ul className="grid-list">
        {category.items.map((item) => (
          <li key={item.name}>
            <DishCard item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
