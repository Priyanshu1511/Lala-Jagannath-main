# Lala Jagannath Dynamic CMS Setup

## 1. Environment
The supplied `.env.local` is configured with the Supabase project URL and publishable key provided in the conversation. It is git-ignored. Never add a Supabase service-role/secret key to `NEXT_PUBLIC_*` variables. The publishable key is intended for browser use; RLS remains the actual data security boundary. If you prefer not to ship local environment files, use `.env.example` and create `.env.local` locally.

## 2. Install
Use Node.js 22 LTS or a compatible newer LTS. This project ships with a pnpm lockfile; use pnpm to keep dependency resolution consistent. From this folder run:

```powershell
corepack enable
pnpm install
pnpm dev
```

## 3. Database
In Supabase SQL Editor run migrations in order: first `supabase/migrations/202610210001_admin_cms.sql` if this is a new database, then `supabase/migrations/202610210002_complete_dynamic_cms.sql`. If you already ran the earlier schema from our conversation, run only migration 002. The base migration is idempotent for table creation but policies may need review if your database has differently named existing policies. Do not rerun a different project's migration blindly. The second migration adds fields/tables without dropping existing records.

## 4. Admin user
Create a user in Supabase Authentication > Users. Copy its Auth UUID, then run:

```sql
insert into public.admin_members (user_id, role, active)
values ('YOUR-AUTH-USER-UUID', 'owner', true)
on conflict (user_id) do update set role='owner', active=true;
```

Open `http://localhost:3000/admin/login`. The dashboard checks Auth and the membership record.

## 5. CMS modules
The admin uses `/admin/[resource]` pages for sections, services, doctors, yoga tutorials, articles, testimonials, FAQs, enquiries, SEO, and settings. CRUD requests use the publishable client and rely on RLS. URL fields include a media upload control backed by the public `cms-media` Supabase Storage bucket; uploads are restricted to active CMS administrators. A user needs an active membership. Appointment/contact records are restricted to owner/admin roles.

## 6. Public frontend
The public homepage fetches published section records and uses their order/visibility to render existing section components. Published services, doctors, testimonials, and FAQs override the original static arrays when records exist. Section headings/subtitles are read from `site_sections`. Contact submissions are inserted into `contact_messages`. If a table query fails, existing section fallbacks remain where applicable.

## Limitations to verify
- The base migration creates the base tables (`admin_members`, `site_sections`, `services`, `doctors`, `yoga_tutorials`, `articles`, `testimonials`, `faqs`, `appointment_requests`, `contact_messages`, `site_settings`).
- The initial public components still contain some design copy and local media fallbacks. This change connects CMS-supported fields and records, but not every decorative label, breathing exercise step, nav item, or footer string is database-driven yet.
- Test live Supabase auth/RLS in your project and run `npm run typecheck` and `npm run build` locally before production deployment.
