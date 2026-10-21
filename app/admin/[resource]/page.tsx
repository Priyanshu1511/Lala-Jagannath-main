import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ResourceManager } from "@/components/admin/resource-manager";
import { resources } from "@/lib/cms/resources";
export default async function ResourcePage({params}:{params:Promise<{resource:string}>}){const {resource}=await params;const config=resources[resource];if(!config)notFound();const supabase=await createClient();const {data:{user}}=await supabase.auth.getUser();if(!user)redirect('/admin/login');const {data:member}=await supabase.from('admin_members').select('role').eq('user_id',user.id).maybeSingle();if(!member||!['owner','admin','editor'].includes(member.role))redirect('/admin/login');if(config.private&&!['owner','admin'].includes(member.role))redirect('/admin');return <ResourceManager resourceKey={resource} config={config} role={member.role}/>;}
