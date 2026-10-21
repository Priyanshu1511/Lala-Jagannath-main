# Admin login repair

## 1. Install dependencies

Use Node.js 22 LTS or a compatible version for this Next.js project. Run `npm install` from the project root.

## 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in the Supabase Project URL and publishable key (or legacy anon key). Restart the development server after editing environment variables.

## 3. Database requirements

Run the project's SQL migration that creates `public.admin_members`. The table must include `user_id uuid` referencing `auth.users(id)` and `role` with allowed values `owner`, `admin`, and `editor`. Do not add an `active` column unless you also update the schema and application consistently.

Create a user in Supabase Authentication -> Users, copy the user's exact UUID, and run:

```sql
insert into public.admin_members (user_id, role)
values ('REPLACE-WITH-AUTH-USER-UUID', 'owner')
on conflict (user_id) do update set role = 'owner';
```

The `admin_members` table needs RLS enabled and an authenticated SELECT policy allowing users to read their own membership row, e.g. `using (user_id = auth.uid())`. Do not enable public access to this table.

## 4. Run and log in

```bash
npm run dev
```

Visit http://localhost:3000/admin/login. Use the email and password from Supabase Authentication. The `/admin` server page calls `auth.getUser()` and checks `admin_members` before showing the dashboard.

## Troubleshooting

- `Invalid login credentials`: reset/set the password for the Auth user and verify email.
- Redirects to login with `not_admin`: verify the exact UUID row in `public.admin_members` and the SELECT RLS policy.
- Supabase configuration error: check `.env.local`, variable spelling, and restart `npm run dev`.
- Missing `admin_members` or relation errors: run the migration in the same Supabase project whose URL is in `.env.local`.
