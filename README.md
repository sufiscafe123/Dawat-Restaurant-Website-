# Dawat Restaurant — Kheda, Gujarat

Website for Dawat Restaurant (Mughlai, BBQ, Seafood), built with **Next.js (App Router) + TypeScript**.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Project structure

```
app/
  layout.tsx        Shared shell: fonts, metadata, topbar, header, footer, floating buttons
  page.tsx          Home page (composes the sections below)
  menu/, about/, gallery/, contact/   Other pages
  globals.css       Design tokens + all shared styles
components/
  Button.tsx        Animated button/link + section heading
  Header.tsx        Sticky header, mobile nav
  Topbar.tsx, Footer.tsx, Preloader.tsx, FloatingActions.tsx
  home/             Hero, Services, About, SpecialDish, FeaturedMenu, Features, Testimonial, Reservation
  menu/             MenuBrowser (category tabs, one category at a time)
  gallery/          Photo grid + lightbox
lib/
  site.ts           Address, hours, phone numbers, social links — edit here once
  menu.ts           Full menu: 18 categories, 245 dishes, prices, photos
  data.ts           Hero slides, home Delicious Menu dishes, features, gallery, facilities
  nav.ts            Header navigation links
public/images/      All images
```

## Common edits

- **Change a price or add a dish:** edit `lib/menu.ts`.
- **Change the home page Delicious Menu dishes:** edit `featuredDishNames` in `lib/data.ts` (prices and photos come from `lib/menu.ts`).
- **Change phone / address / hours:** edit `lib/site.ts`.
- **Reservation form:** opens WhatsApp with the booking details pre-filled for the primary number.
- **Dish photos:** put them in `public/images/menu/` and add `image: "/images/menu/..."` to the dish in `lib/menu.ts`.

Design based on the Grilli template (MIT, © 2022 codewithsadee). Powered by Safvan & Saad.
