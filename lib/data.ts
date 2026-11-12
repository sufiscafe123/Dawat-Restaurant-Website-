/**
 * All page content lives here, so sections render from data
 * instead of repeated markup.
 */

export type HeroSlide = {
  image: string;
  subtitle: string;
  title: [string, string];
  text: string;
};

export const heroSlides: HeroSlide[] = [
  {
    image: "/images/hero-slider-1.jpg",
    subtitle: "Taste That Touches Your Heart",
    title: ["For the love of", "delicious food"],
    text: "Famous for authentic Non-Veg cuisine, Mughlai flavors, BBQ & special Raan Biryani",
  },
  {
    image: "/images/hero-slider-2.jpg",
    subtitle: "Rooftop & Outdoor Seating",
    title: ["Flavors Inspired by", "Royal Traditions"],
    text: "Spacious down-to-earth ambiance with massive free parking space",
  },
  {
    image: "/images/hero-slider-3.jpg",
    subtitle: "Amazing & Delicious",
    title: ["Where every flavor", "tells a story"],
    text: "Come with family & feel the joy of mouthwatering food",
  },
];

export const services = [
  { image: "/images/service-1.jpg", title: "Dawat Special Starter" },
  { image: "/images/service-2.jpg", title: "Sizzling BBQ & Tandoori" },
  { image: "/images/service-3.jpg", title: "Seafood & Specials" },
];

export type FeaturedDish = {
  image: string;
  name: string;
  price: number;
  description: string;
  badge?: string;
};

export const featuredDishes: FeaturedDish[] = [
  {
    image: "/images/menu-1.png",
    name: "Dawat Sp. Chicken Handi",
    price: 380,
    badge: "Popular",
    description:
      "Rich, slow-simmered handi gravy with tender chicken cuts, crushed black pepper & fresh coriander.",
  },
  {
    image: "/images/menu-2.png",
    name: "Mutton Mughlai Rogan Josh",
    price: 440,
    description:
      "Classic Kashmiri-style tender lamb cooked in royal gravy infused with whole spices and ratan jot.",
  },
  {
    image: "/images/menu-3.png",
    name: "Tandoori Chicken Platter",
    price: 360,
    description:
      "Whole spring chicken steeped in curd, Kashmiri chili marinade, roasted in a clay tandoor.",
  },
  {
    image: "/images/menu-4.png",
    name: "Hyderabadi Dum Biryani",
    price: 320,
    badge: "Chef Signature",
    description:
      "Dum-cooked long basmati rice layered with caramelized onions, fresh mint, pure ghee & spiced meat.",
  },
  {
    image: "/images/menu-5.png",
    name: "Coastal Fried Fish / Pomfret",
    price: 490,
    description:
      "Fresh coastal catch crusted in aromatic ground spices, pan-seared to crispy golden perfection.",
  },
  {
    image: "/images/menu-6.png",
    name: "Royal Shahi Tukda",
    price: 160,
    description:
      "Crispy ghee-fried bread dipped in cardamom syrup, topped with thick saffron rabri and silver vark.",
  },
];

export const features = [
  {
    icon: "/images/features-icon-1.png",
    title: "Authentic Halal Cuisine",
    text: "Finest Non-Veg, rich Mughlai gravies, sizzling BBQ & seafood.",
  },
  {
    icon: "/images/features-icon-2.png",
    title: "Outdoor & Rooftop",
    text: "Spacious open-air garden and rooftop dining for family & friends.",
  },
  {
    icon: "/images/features-icon-3.png",
    title: "Master BBQ Chefs",
    text: "Specialized in charcoal tandoori items, kebabs & Raan Biryani.",
  },
  {
    icon: "/images/features-icon-4.png",
    title: "Massive Free Parking",
    text: "Huge convenient free parking space right on NH-8 highway.",
  },
];

/* ---------------- Gallery page ---------------- */

export type GalleryCategory = "food" | "ambience";

export type GalleryImage = {
  src: string;
  width: number;
  height: number;
  caption: string;
  category: GalleryCategory;
  /** Tile size in the grid: "large" = 2×2, "tall" = 1×2, default = 1×1. */
  layout?: "large" | "tall";
};

export const galleryCategories: { id: GalleryCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "food", label: "Food & Drinks" },
  { id: "ambience", label: "Ambience" },
];

/** Add new photos here: put the file in public/images and list it below. */
export const galleryImages: GalleryImage[] = [
  { src: "/images/about-main.webp", width: 1312, height: 1199, caption: "I ❤ Dawat", category: "ambience", layout: "large" },
  { src: "/images/about-overlay.webp", width: 1222, height: 1287, caption: "AC Hall", category: "ambience", layout: "tall" },
  { src: "/images/special-dish-banner.jpg", width: 940, height: 900, caption: "Charcoal Grilled Wings", category: "food" },
  { src: "/images/menu-2.png", width: 300, height: 300, caption: "Mutton Mughlai", category: "food" },
  { src: "/images/service-2.jpg", width: 285, height: 336, caption: "Sizzling BBQ", category: "food" },
  { src: "/images/menu-7.png", width: 300, height: 300, caption: "Chicken Bullet", category: "food" },
  { src: "/images/menu-10.png", width: 300, height: 300, caption: "Fish & Prawns", category: "food" },
  { src: "/images/menu-12.png", width: 300, height: 300, caption: "Paneer Sizzler", category: "food" },
];

/** Facilities shown on the About and Gallery pages. */
export type FacilityIcon = "kids" | "swing" | "garden" | "ac" | "parking" | "cafe";

export const facilities: { icon: FacilityIcon; title: string; text: string }[] = [
  { icon: "kids", title: "Kids Play Area", text: "A safe, fun play zone so little ones stay busy while you enjoy your meal." },
  { icon: "swing", title: "Jhula (Swings)", text: "Swings in the garden for kids and the young at heart." },
  { icon: "garden", title: "Garden Area", text: "Open-air garden seating under the lights, perfect for family evenings." },
  { icon: "ac", title: "AC Hall", text: "Cool, comfortable air-conditioned hall for dining in every season." },
  { icon: "parking", title: "Free Parking", text: "Huge free parking space right on the NH-8 highway." },
  { icon: "cafe", title: "Sufi's Cafe Nearby", text: "Round off your meal with a visit to our Sufi's Cafe, just nearby." },
];

/* ---------------- Full menu page ---------------- */

export type MenuIcon = "flame" | "restaurant" | "water" | "leaf";

export type MenuItem = {
  name: string;
  price: number;
  badge: string;
  image: string;
  description: string;
};

export type MenuCategory = {
  id: string;
  navLabel: string;
  title: string;
  tag: string;
  icon: MenuIcon;
  items: MenuItem[];
};

export const menuCategories: MenuCategory[] = [
  {
    id: "soups",
    navLabel: "Hot Soups",
    title: "Hot & Aromatic Soups",
    tag: "Freshly Prepared",
    icon: "flame",
    items: [
      {
        name: "Dawat Sp. Soup",
        price: 130,
        badge: "Chef Signature",
        image: "/images/menu-5.png",
        description:
          "Steaming chef special soup loaded with tender chicken, Asian mushrooms, fresh seasonal greens & fried wontons.",
      },
      {
        name: "Chicken Manchow Soup",
        price: 120,
        badge: "Classic Favorite",
        image: "/images/menu-9.png",
        description:
          "Spicy garlic soy chicken soup infused with coriander and topped with crunchy golden fried noodles.",
      },
      {
        name: "Chicken Hot & Sour Soup",
        price: 120,
        badge: "Tangy & Spicy",
        image: "/images/menu-5.png",
        description:
          "Bold and tangy dark broth simmered with shredded chicken, bamboo shoots, egg drops and chili oil.",
      },
      {
        name: "Chicken Lemon Coriander Soup",
        price: 120,
        badge: "Refreshing & Light",
        image: "/images/menu-9.png",
        description:
          "Zesty clear lemon broth delicately seasoned with fresh farm coriander leaves and shredded chicken.",
      },
      {
        name: "Chicken Sweet Corn Soup",
        price: 120,
        badge: "Mild & Sweet",
        image: "/images/menu-5.png",
        description:
          "Velvety crushed American sweet corn broth gently cooked with shredded chicken and fragrant white pepper.",
      },
      {
        name: "Chicken Mongolian Hot Pot Soup",
        price: 130,
        badge: "Spicy Hot Pot",
        image: "/images/menu-9.png",
        description:
          "Robust Mongolian style spiced hot pot soup packed with slow-cooked chicken, scallions and fiery red chilies.",
      },
    ],
  },
  {
    id: "starters",
    navLabel: "Starters & Main Course",
    title: "Starter & Main Course (Chicken)",
    tag: "Chef Specialties",
    icon: "restaurant",
    items: [
      {
        name: "Chicken Crispy",
        price: 340,
        badge: "Top Bestseller",
        image: "/images/menu-2.png",
        description:
          "Crispy golden spiced chicken strips tossed in chef's special glaze, toasted sesame seeds & spring onions.",
      },
      {
        name: "Chicken Shanghai",
        price: 340,
        badge: "Indo-Chinese",
        image: "/images/menu-8.png",
        description:
          "Juicy chicken chunks wok-tossed in sweet and spicy Shanghai sauce with crunchy bell peppers and ginger.",
      },
      {
        name: "Chicken China Town",
        price: 360,
        badge: "Spicy Wok",
        image: "/images/menu-8.png",
        description:
          "Authentic street-style spicy chicken preparation with burnt garlic, red chilies, scallions and dark soy glaze.",
      },
      {
        name: "Chicken Bullet",
        price: 390,
        badge: "Fiery & Crispy",
        image: "/images/menu-7.png",
        description:
          "Crispy fried chicken nuggets tossed with roasted red chili flakes, curry leaves, crushed pepper & garlic cloves.",
      },
      {
        name: "Chicken Darjeeling",
        price: 330,
        badge: "Himalayan Spices",
        image: "/images/menu-2.png",
        description:
          "Tender chicken pieces coated with aromatic hill herbs, black cardamom and ginger sauce.",
      },
      {
        name: "Chicken Hong Kong",
        price: 330,
        badge: "Sweet & Tangy",
        image: "/images/menu-7.png",
        description:
          "Chicken morsels tossed in classic Hong Kong style mild spiced gravy with baby corn, peppers and cashews.",
      },
    ],
  },
  {
    id: "seafood",
    navLabel: "Seafood Specials",
    title: "Seafood & Fresh Catch Specials",
    tag: "Fresh Coastal Flavors",
    icon: "water",
    items: [
      {
        name: "Dawat Special Starter",
        price: 430,
        badge: "Signature Masterpiece",
        image: "/images/menu-1.png",
        description:
          "Succulent tandoori chicken & mutton skewers infused with charcoal smoke, royal Mughlai herbs and butter glaze.",
      },
      {
        name: "Fish / Prawn's Butter Garlic",
        price: 430,
        badge: "Rich & Velvety",
        image: "/images/menu-4.png",
        description:
          "Fresh coastal prawns and fish simmered in a velvety golden butter sauce infused with roasted minced garlic.",
      },
      {
        name: "Fish / Prawn's Chilly Flexs",
        price: 430,
        badge: "Spicy Favorite",
        image: "/images/menu-10.png",
        description:
          "Tender fish and jumbo prawns pan-seared with crushed spicy chili flakes, garlic flakes and scallions.",
      },
      {
        name: "Crunchy Fish",
        price: 430,
        badge: "Crispy Delight",
        image: "/images/menu-6.png",
        description:
          "Golden crisp seasoned fish fillets fried to crunchy perfection, served with garlic tartar dip & fresh lemon.",
      },
      {
        name: "Fish / Prawn's Bullet",
        price: 460,
        badge: "Fiery Catch",
        image: "/images/menu-10.png",
        description:
          "Bite-sized juicy seafood morsels fried and coated in intense spicy bullet masala with crispy curry leaves.",
      },
      {
        name: "Fish / Prawn's Ginger",
        price: 430,
        badge: "Aromatic Herbs",
        image: "/images/menu-4.png",
        description:
          "Fresh prawns and fish sautéed with julienned fresh ginger, spring onions, light soy and coriander.",
      },
      {
        name: "Fish / Prawn's Mongolian",
        price: 430,
        badge: "Mongolian Spices",
        image: "/images/menu-10.png",
        description:
          "Sweet and spicy Mongolian glazed prawns and fish tossed with caramelized onions and peppers.",
      },
      {
        name: "Prawn's Salt & Pepper",
        price: 430,
        badge: "Crisp & Seasoned",
        image: "/images/menu-6.png",
        description:
          "Crisp battered prawns tossed with sea salt, cracked peppercorns, scallions and green chili slices.",
      },
    ],
  },
  {
    id: "veg",
    navLabel: "Veg. Dawat Special & Sizzlers",
    title: "Veg. Dawat Special & Sizzlers",
    tag: "Pure Veg Delicacies",
    icon: "leaf",
    items: [
      {
        name: "Veg. Barbeque Platter",
        price: 980,
        badge: "Grand Platter",
        image: "/images/menu-3.png",
        description:
          "Grand platter with paneer tikka, grilled mushrooms, capsicum, roasted sweet corn, pineapple & mint dip.",
      },
      {
        name: "Veg. Chinese Sizzler",
        price: 799,
        badge: "Sizzling Sensation",
        image: "/images/menu-11.png",
        description:
          "Sizzling cast-iron skillet loaded with noodles, fried rice, crisp baby corn, grilled paneer & garlic sauce.",
      },
      {
        name: "Veg. Paneer Barbeque Sizzler",
        price: 870,
        badge: "Smoky BBQ",
        image: "/images/menu-12.png",
        description:
          "Charcoal marinated paneer skewers served over a bed of smoky peppers, butter glaze and barbecue gravy.",
      },
      {
        name: "Paneer Stick Sizzler",
        price: 870,
        badge: "Chef Recommendation",
        image: "/images/menu-12.png",
        description:
          "Skewered spiced cottage cheese grilled to tender perfection, served with herb butter, onions and lemon.",
      },
    ],
  },
];

export const formatPrice = (value: number, decimals = 0) =>
  `₹${value.toFixed(decimals)}`;
