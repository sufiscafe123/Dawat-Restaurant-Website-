# Dawat Restaurant — Kheda, Gujarat

Website for Dawat Restaurant (Mughlai, BBQ, Seafood), built with **Next.js (App Router) + TypeScript**,
with an **admin panel** (Supabase) for changing the menu, prices and restaurant details.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000   (admin: http://localhost:3000/admin)
npm run build    # production build
npm start        # serve the production build
```

## Admin panel – one-time setup

1. **Environment** – `.env.local` must contain (see `.env.example`):
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://jtvdcezvsdcgwvuxomqa.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_…
   ```
   Add the same two values in your hosting settings (e.g. Vercel → Project → Settings → Environment Variables).
2. **Database** – Supabase Dashboard → **SQL Editor** → New query → paste all of `supabase/schema.sql` → **Run**.
3. **Admin login** – Supabase Dashboard → **Authentication → Users → Add user → Create new user**:
   enter the admin email (the one listed in `supabase/schema.sql`) and a password, tick **Auto Confirm User**.
4. **Close public sign-ups** – Authentication → Sign In / Providers → turn off **Allow new users to sign up**.
5. Open `/admin`, sign in, go to **Menu & Prices** and click **Import current menu** (one time).

Only emails in the `admin_users` table can change anything; everyone else can only read.

## What the admin can change

| Tab | What it changes |
|---|---|
| Menu & Prices | Categories (add, rename, icon, reorder, delete) and dishes (name, price or “As Per Size”, photo upload, show/hide, reorder, delete) |
| Restaurant Details | Name, tagline, opening hours, 3 phone numbers, WhatsApp number, addresses, Google Maps pin, Instagram, Facebook |
| About Us | Home page “Our Story” text, About page intro, story heading and paragraphs, highlights strip |
| Account | Change the admin password |

Saving refreshes the website straight away. If Supabase is ever unreachable, the website falls back to the
built-in content in `lib/site.ts` and `lib/menu.ts`, so it never goes blank.

## Project structure

```
app/
  layout.tsx          Root: fonts, metadata, global CSS
  (site)/layout.tsx   Public website shell: topbar, header, footer (loads details from Supabase)
  (site)/page.tsx     Home page; also about/, contact/, gallery/, menu/
  admin/              Admin panel: login/, reset/ (password reset), page.tsx (dashboard)
  api/revalidate/     Refreshes the website after an admin saves (admins only)
  globals.css         Design tokens + shared styles
components/
  admin/              MenuEditor, SettingsEditor, AboutEditor, AccountPanel, ui helpers
  home/, menu/, gallery/  Website sections
  SiteProvider.tsx    Shares restaurant details with client components
lib/
  content.ts          Loads details, About text and menu from Supabase (with fallback)
  site.ts             Default restaurant details + About text, and helpers
  menu.ts             Default menu (18 categories, 245 dishes)
  supabase.ts         Supabase clients
  admin.ts            Admin login state, saving, refresh
supabase/schema.sql   Database tables, security rules and photo storage
public/images/        All images
```

Design based on the Grilli template (MIT, © 2022 codewithsadee). Powered by Safvan & Saad.
