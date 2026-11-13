-- =====================================================================
-- Dawat Restaurant – admin panel database setup
-- Run this ONCE in Supabase: Dashboard → SQL Editor → New query → Run.
-- Safe to run again (it only creates what is missing).
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. Admins: only emails listed here can change the website.
-- ---------------------------------------------------------------------
create table if not exists public.admin_users (
  email text primary key
);

insert into public.admin_users (email)
values ('dawatadmin12@gmail.com')
on conflict (email) do nothing;

-- Nobody can read or change this table from the website directly.
alter table public.admin_users enable row level security;

-- Returns true when the signed-in user is an admin.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

grant execute on function public.is_admin() to anon, authenticated;

-- ---------------------------------------------------------------------
-- 2. Website content (restaurant details, About Us text).
-- ---------------------------------------------------------------------
create table if not exists public.site_content (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 3. Menu
-- ---------------------------------------------------------------------
create table if not exists public.menu_categories (
  id         uuid primary key default gen_random_uuid(),
  slug       text not null unique,
  title      text not null,
  icon       text not null default 'restaurant',
  position   integer not null default 0,
  created_at timestamptz not null default now()
);

-- An older "menu_items" table with a different layout (no category_id) is kept
-- safely as "menu_items_old" (nothing is deleted) so the new table can be created.
do $$
declare
  old_name text := 'menu_items_old';
  idx record;
begin
  if exists (
       select 1 from information_schema.tables
       where table_schema = 'public' and table_name = 'menu_items'
     )
     and not exists (
       select 1 from information_schema.columns
       where table_schema = 'public' and table_name = 'menu_items' and column_name = 'category_id'
     )
  then
    if exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = old_name) then
      old_name := 'menu_items_old_' || to_char(now(), 'YYYYMMDDHH24MISS');
    end if;

    execute format('alter table public.menu_items rename to %I', old_name);

    -- Rename its indexes too (e.g. menu_items_pkey) so the new table can use those names.
    for idx in select indexname from pg_indexes where schemaname = 'public' and tablename = old_name loop
      execute format('alter index public.%I rename to %I', idx.indexname, old_name || '_' || idx.indexname);
    end loop;

    raise notice 'Old menu_items table renamed to %', old_name;
  end if;
end $$;

create table if not exists public.menu_items (
  id           uuid primary key default gen_random_uuid(),
  category_id  uuid not null references public.menu_categories (id) on delete cascade,
  name         text not null,
  price        integer check (price is null or price >= 0), -- null = "As Per Size"
  image        text,
  position     integer not null default 0,
  is_available boolean not null default true,
  created_at   timestamptz not null default now()
);

create index if not exists menu_items_category_position_idx
  on public.menu_items (category_id, position);

-- ---------------------------------------------------------------------
-- 4. Security: everyone can read, only admins can write.
-- ---------------------------------------------------------------------
alter table public.site_content    enable row level security;
alter table public.menu_categories enable row level security;
alter table public.menu_items      enable row level security;

drop policy if exists "Public can read site content" on public.site_content;
create policy "Public can read site content" on public.site_content
  for select using (true);

drop policy if exists "Admins manage site content" on public.site_content;
create policy "Admins manage site content" on public.site_content
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Public can read menu categories" on public.menu_categories;
create policy "Public can read menu categories" on public.menu_categories
  for select using (true);

drop policy if exists "Admins manage menu categories" on public.menu_categories;
create policy "Admins manage menu categories" on public.menu_categories
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Public can read menu items" on public.menu_items;
create policy "Public can read menu items" on public.menu_items
  for select using (true);

drop policy if exists "Admins manage menu items" on public.menu_items;
create policy "Admins manage menu items" on public.menu_items
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------
-- 5. Photo storage for menu items (public to view, admins to upload).
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('menu-images', 'menu-images', true)
on conflict (id) do nothing;

drop policy if exists "Admins upload menu images" on storage.objects;
create policy "Admins upload menu images" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'menu-images' and public.is_admin());

drop policy if exists "Admins update menu images" on storage.objects;
create policy "Admins update menu images" on storage.objects
  for update to authenticated
  using (bucket_id = 'menu-images' and public.is_admin());

drop policy if exists "Admins delete menu images" on storage.objects;
create policy "Admins delete menu images" on storage.objects
  for delete to authenticated
  using (bucket_id = 'menu-images' and public.is_admin());
