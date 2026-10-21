-- Lala Jagannath dynamic CMS extension. Safe to run after the initial CMS migration.
create extension if not exists pgcrypto;

-- Extend existing tables without dropping data.
alter table public.admin_members add column if not exists active boolean not null default true;
alter table public.site_sections add column if not exists subtitle_hi text;
alter table public.site_sections add column if not exists body_hi text;
alter table public.site_sections add column if not exists video_url text;
alter table public.site_sections add column if not exists button_label_en text;
alter table public.site_sections add column if not exists button_label_hi text;
alter table public.site_sections add column if not exists button_url text;
alter table public.site_sections add column if not exists seo_title text;
alter table public.site_sections add column if not exists seo_description text;
alter table public.site_sections add column if not exists content jsonb not null default '{}'::jsonb;
alter table public.doctors add column if not exists specialty text;
alter table public.doctors add column if not exists bio_hi text;
alter table public.doctors add column if not exists slug text unique;
alter table public.services add column if not exists slug text unique;
alter table public.services add column if not exists seo_title text;
alter table public.services add column if not exists seo_description text;
alter table public.yoga_tutorials add column if not exists category text;
alter table public.yoga_tutorials add column if not exists difficulty text;
alter table public.yoga_tutorials add column if not exists image_url text;
alter table public.yoga_tutorials add column if not exists video_url text;
alter table public.yoga_tutorials add column if not exists display_order integer not null default 0;
alter table public.testimonials add column if not exists image_url text;
alter table public.testimonials add column if not exists location text;
alter table public.testimonials add column if not exists rating integer not null default 5 check (rating between 1 and 5);
alter table public.testimonials add column if not exists updated_at timestamptz not null default now();
alter table public.faqs add column if not exists is_published boolean not null default false;
alter table public.faqs add column if not exists updated_at timestamptz not null default now();

create table if not exists public.seo_settings (
  id uuid primary key default gen_random_uuid(), page_key text not null unique,
  title text, description text, canonical_url text, og_image text,
  no_index boolean not null default false, updated_at timestamptz not null default now()
);
create table if not exists public.yoga_poses (
  id uuid primary key default gen_random_uuid(), name text not null, sanskrit_name text,
  description_en text, description_hi text, steps jsonb not null default '[]'::jsonb,
  breathing_guidance text, benefits text, precautions text, image_url text, animation_url text,
  video_url text, duration_minutes integer, category text, difficulty text,
  slug text unique, seo_title text, seo_description text,
  display_order integer not null default 0, is_published boolean not null default false,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index if not exists site_sections_public_order_idx on public.site_sections(is_published, display_order);
create index if not exists seo_settings_page_key_idx on public.seo_settings(page_key);
create index if not exists yoga_poses_public_order_idx on public.yoga_poses(is_published, display_order);

-- Ensure all homepage section records exist, retaining existing records/content.
insert into public.site_sections(section_key,title_en,title_hi,display_order,is_published) values
('hero','Welcome to Lala Jagannath','लाला जगन्नाथ में आपका स्वागत है',1,true),
('about','About our centre','हमारे केंद्र के बारे में',2,true),
('doctors','Our doctors','हमारे चिकित्सक',3,true),
('services','Our therapies','हमारी चिकित्सा',4,true),
('conditions','Conditions we support','स्वास्थ्य समस्याएँ',5,true),
('mind-healing','Mind healing','मन की चिकित्सा',6,true),
('virtual-havan','Virtual havan','वर्चुअल हवन',7,true),
('philosophy','Our philosophy','हमारा दर्शन',8,true),
('ladies-wellness','Ladies wellness','महिला स्वास्थ्य',9,true),
('testimonials','Patient stories','अनुभव',10,true),
('faq','Frequently asked questions','अक्सर पूछे जाने वाले प्रश्न',11,true),
('contact','Contact us','संपर्क करें',12,true)
on conflict (section_key) do nothing;

alter table public.seo_settings enable row level security;
alter table public.yoga_poses enable row level security;

-- Helper checks membership without exposing membership data to anonymous users.
create or replace function public.is_site_admin(allowed_roles text[] default array['owner','admin','editor'])
returns boolean language sql stable security definer set search_path = public, auth
as $$ select exists (select 1 from public.admin_members m where m.user_id = auth.uid() and m.active = true and m.role = any(allowed_roles)); $$;
revoke all on function public.is_site_admin(text[]) from public;
grant execute on function public.is_site_admin(text[]) to authenticated;

-- Restrict membership listing to self; membership creation is only via trusted SQL/dashboard.
drop policy if exists "admins can view own membership" on public.admin_members;
create policy "users can view own active membership" on public.admin_members for select to authenticated using (user_id = auth.uid());

-- Rebuild management policies to use the security-definer helper and role gates.
do $$ declare t text; begin
  foreach t in array array['site_sections','site_settings','doctors','services','yoga_tutorials','articles','testimonials','faqs','seo_settings','yoga_poses'] loop
    execute format('drop policy if exists %I on public.%I', 'admins manage '||t, t);
    execute format('drop policy if exists %I on public.%I', 'cms managers manage '||t, t);
    execute format('create policy %I on public.%I for all to authenticated using (public.is_site_admin(array[''owner'',''admin'',''editor''])) with check (public.is_site_admin(array[''owner'',''admin'',''editor'']))', 'cms managers manage '||t, t);
  end loop;
end $$;

-- Public can only read published rows; private submissions are owner/admin-only.
drop policy if exists "public reads published site_sections" on public.site_sections;
create policy "public reads published site_sections" on public.site_sections for select to anon, authenticated using (is_published = true);
drop policy if exists "public reads published doctors" on public.doctors;
create policy "public reads published doctors" on public.doctors for select to anon, authenticated using (is_published = true);
drop policy if exists "public reads published services" on public.services;
create policy "public reads published services" on public.services for select to anon, authenticated using (is_published = true);
drop policy if exists "public reads published yoga_tutorials" on public.yoga_tutorials;
create policy "public reads published yoga_tutorials" on public.yoga_tutorials for select to anon, authenticated using (is_published = true);
drop policy if exists "public reads published articles" on public.articles;
create policy "public reads published articles" on public.articles for select to anon, authenticated using (is_published = true);
drop policy if exists "public reads published testimonials" on public.testimonials;
create policy "public reads published testimonials" on public.testimonials for select to anon, authenticated using (is_published = true);
drop policy if exists "public reads published faqs" on public.faqs;
create policy "public reads published faqs" on public.faqs for select to anon, authenticated using (is_published = true);
drop policy if exists "public reads published yoga poses" on public.yoga_poses;
create policy "public reads published yoga poses" on public.yoga_poses for select to anon, authenticated using (is_published = true);
drop policy if exists "public reads published seo settings" on public.seo_settings;
create policy "public reads published seo settings" on public.seo_settings for select to anon, authenticated using (page_key = 'home');

-- Submissions are private to owner/admin, not editors.
do $$ begin
  drop policy if exists "admins manage appointment_requests" on public.appointment_requests;
  drop policy if exists "admins manage contact_messages" on public.contact_messages;
  drop policy if exists "private managers manage appointment_requests" on public.appointment_requests;
  drop policy if exists "private managers manage contact_messages" on public.contact_messages;
  create policy "private managers manage appointment_requests" on public.appointment_requests for all to authenticated using (public.is_site_admin(array['owner','admin'])) with check (public.is_site_admin(array['owner','admin']));
  create policy "private managers manage contact_messages" on public.contact_messages for all to authenticated using (public.is_site_admin(array['owner','admin'])) with check (public.is_site_admin(array['owner','admin']));
end $$;


-- Public read media bucket; only active CMS admins may upload/update/delete objects.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('cms-media', 'cms-media', true, 52428800, array['image/jpeg','image/png','image/webp','image/gif','video/mp4','video/webm','audio/mpeg','audio/ogg'])
on conflict (id) do update set public = true, file_size_limit = 52428800, allowed_mime_types = excluded.allowed_mime_types;
drop policy if exists "public can read CMS media" on storage.objects;
create policy "public can read CMS media" on storage.objects for select to anon, authenticated using (bucket_id = 'cms-media');
drop policy if exists "CMS admins upload media" on storage.objects;
create policy "CMS admins upload media" on storage.objects for insert to authenticated with check (bucket_id = 'cms-media' and public.is_site_admin(array['owner','admin','editor']));
drop policy if exists "CMS admins update media" on storage.objects;
create policy "CMS admins update media" on storage.objects for update to authenticated using (bucket_id = 'cms-media' and public.is_site_admin(array['owner','admin','editor'])) with check (bucket_id = 'cms-media' and public.is_site_admin(array['owner','admin','editor']));
drop policy if exists "CMS admins delete media" on storage.objects;
create policy "CMS admins delete media" on storage.objects for delete to authenticated using (bucket_id = 'cms-media' and public.is_site_admin(array['owner','admin','editor']));
