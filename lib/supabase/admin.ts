import { createClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return { supabase, user: null, membership: null };
  const { data: membership } = await supabase.from("admin_members").select("user_id, role").eq("user_id", user.id).maybeSingle();
  if (!membership || !["owner", "admin", "editor"].includes(membership.role)) return { supabase, user: null, membership: null };
  return { supabase, user, membership };
}
