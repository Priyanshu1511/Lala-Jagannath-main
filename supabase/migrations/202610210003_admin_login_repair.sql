-- Non-destructive admin-login compatibility repair. Safe to run more than once.
-- The application checks role only; active is deliberately not required.
alter table public.admin_members enable row level security;

drop policy if exists "admins can view own membership" on public.admin_members;
drop policy if exists "users can view own active membership" on public.admin_members;
drop policy if exists "admins view own membership" on public.admin_members;
create policy "admins view own membership"
  on public.admin_members
  for select
  to authenticated
  using (user_id = auth.uid());
