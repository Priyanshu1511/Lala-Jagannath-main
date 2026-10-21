# Lala Jagannath Admin CMS setup

## What is dynamic in this delivery
- `/admin/login` signs in with Supabase Auth and checks `admin_members`.
- `/admin` reads counts from the CMS tables.
- `/admin/sections` creates, edits, publishes, drafts and deletes section configuration records.
- The homepage reads published `site_sections` records to determine which existing section components render and their order. If Supabase is not configured or the query fails, it falls back to the original homepage order.
- Existing rich content inside the legacy homepage components is still hardcoded. This change makes homepage section visibility/order dynamic; it does not yet replace every doctor's/service/FAQ component data with database-driven records.

## Setup
1. Use Node.js 22 LTS or newer compatible with the installed Next.js version.
2. Copy `.env.example` to `.env.local` and fill in your Supabase Project URL and publishable/anon key.
3. Install packages using the project's chosen package manager. The repository includes `pnpm-lock.yaml`, so prefer `pnpm install --frozen-lockfile` when pnpm/Corepack is available. Do not mix npm and pnpm lockfiles.
4. Run `supabase/migrations/202610210001_admin_cms.sql` in the Supabase SQL Editor.
5. In Supabase Authentication, create the first user yourself. Then run the following SQL in SQL Editor, replacing the UUID with that user's Auth UID:

   ```sql
   insert into public.admin_members (user_id, role)
   values ('REPLACE-WITH-AUTH-USER-UUID', 'owner');
   ```

   Never expose a public administrator registration route. Only trusted project owners should execute this SQL.
6. Run `pnpm dev` (or `npm run dev` if using npm consistently), then visit `/admin/login`.

## Security notes
- Do not expose Supabase service-role/secret keys to the browser.
- Public content reads are restricted by RLS to published rows.
- Enquiry inserts have basic length validation in RLS; add server-side rate limiting / CAPTCHA before public production launch.
- Admin login UI checks membership, while RLS policies enforce database authorization. For sensitive server mutations, add server-side session verification as you expand the CMS.
- The `site_sections` table controls section visibility/order, not the inner text/images of the old components yet.

## Deployment
Add the two public Supabase environment variables in Vercel project settings, run the SQL migration, provision the owner, then redeploy. Test the build and login in Preview before Production.
