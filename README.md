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
  menu/page.tsx     Full menu page
  menu/menu.css     Menu-page-only styles
  globals.css       Design tokens + all shared styles
components/
  Button.tsx        Animated button/link + section heading
  Header.tsx        Sticky header, mobile nav
  Topbar.tsx, Footer.tsx, Preloader.tsx, FloatingActions.tsx
  home/             Hero, Services, About, SpecialDish, FeaturedMenu, Features, Testimonial, Reservation
  menu/             MenuNav (scroll-spy category bar), MenuCategorySection
lib/
  site.ts           Address, hours, phone numbers, social links — edit here once
  data.ts           All dishes, prices, features, hero slides
  nav.ts            Header navigation links
public/images/      All images
```

## Common edits

- **Change a price or add a dish:** edit `lib/data.ts` (`menuCategories` for the menu page, `featuredDishes` for the home page).
- **Change phone / address / hours:** edit `lib/site.ts`.
- **Reservation form:** opens WhatsApp with the booking details pre-filled for the primary number.

Design based on the Grilli template (MIT, © 2022 codewithsadee). Powered by Safvan & Saad.
