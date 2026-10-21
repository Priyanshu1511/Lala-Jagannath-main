# Admin login repair

This repair removes the application's dependency on the optional `admin_members.active` column and makes login errors explicit. It does not reset passwords, delete data, or recreate users.

## Apply
1. Back up your current project and extract this ZIP into a new folder.
2. Keep your own `.env.local` in the project root with the correct Supabase URL and publishable/anon key.
3. In Supabase SQL Editor, run `supabase/migrations/202610210003_admin_login_repair.sql`.
4. Confirm the signed-in user's UUID has a row in `public.admin_members` with role `owner`, `admin`, or `editor`.
5. Run `npm install` (or `pnpm install` if using pnpm), then `npm run dev` / `pnpm dev`.
6. Open `/admin/login`. The page now shows distinct messages for credential failures, membership lookup failures, and missing membership.

## Verify membership (read-only)
```sql
select u.id, u.email, m.role
from auth.users u
left join public.admin_members m on m.user_id = u.id
where lower(u.email) = lower('YOUR-ADMIN-EMAIL');
```

If `role` is null, use the UUID returned by this query to insert the intended administrator membership. Do not share passwords or secret/service-role keys.

This source patch has not been tested against your live Supabase project; verify the browser error and server output after applying it.
