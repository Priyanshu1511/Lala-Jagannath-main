"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const config: Record<string,{table:string;title:string;fields:string[]}> = {
 services:{table:"services",title:"Services",fields:["title_en","title_hi","description_en","description_hi","image_url","display_order","is_published"]},
 doctors:{table:"doctors",title:"Doctors",fields:["name","title","bio_en","bio_hi","image_url","display_order","is_published"]},
 yoga:{table:"yoga_tutorials",title:"Yoga tutorials",fields:["name","sanskrit_name","description_en","description_hi","steps","breathing_guidance","benefits","precautions","media_url","duration_minutes","slug","seo_title","seo_description","is_published"]},
 articles:{table:"articles",title:"Articles",fields:["title","slug","excerpt","body","image_url","seo_title","seo_description","is_published"]},
 testimonials:{table:"testimonials",title:"Testimonials",fields:["display_name","quote","language","display_order","is_published"]},
 faqs:{table:"faqs",title:"FAQs",fields:["question_en","question_hi","answer_en","answer_hi","display_order","is_published"]},
 appointments:{table:"appointment_requests",title:"Appointment enquiries",fields:["name","phone","email","requested_date","message","status"]},
 messages:{table:"contact_messages",title:"Contact messages",fields:["name","email","subject","message","status"]},
 seo:{table:"site_settings",title:"SEO & site settings",fields:["setting_key","value"]},
 settings:{table:"site_settings",title:"Website settings",fields:["setting_key","value"]},
};
type Row = Record<string,unknown> & {id:string};
export default function ResourcePage(){
 const params=useParams<{resource:string}>(); const router=useRouter(); const resource=params.resource; const cfg=config[resource];
 const [rows,setRows]=useState<Row[]>([]); const [loading,setLoading]=useState(true); const [error,setError]=useState(""); const [notice,setNotice]=useState("");
 const [editing,setEditing]=useState<Row|null>(null); const [json,setJson]=useState("{}"); const [search,setSearch]=useState("");
 async function load(){
   if(!cfg){setLoading(false);return;} setLoading(true);setError("");
   try{const sb=createClient();const {data:{user}}=await sb.auth.getUser();if(!user){router.replace("/admin/login");return;}
    const {data:member}=await sb.from("admin_members").select("user_id").eq("user_id",user.id).maybeSingle();if(!member){await sb.auth.signOut();router.replace("/admin/login");return;}
    const {data,error}=await sb.from(cfg.table).select("*").order("created_at",{ascending:false}).limit(100);if(error)throw error;setRows((data||[]) as Row[]);
   }catch(e){setError(e instanceof Error?e.message:"Unable to load records");}finally{setLoading(false);}
 }
 useEffect(()=>{load();},[resource]);
 function startEdit(row?:Row){const value=row?Object.fromEntries(cfg.fields.filter(k=>k in row).map(k=>[k,row[k]])):Object.fromEntries(cfg.fields.map(k=>[k,k==="is_published"?false:k==="display_order"?0:k==="status"?"new":k==="value"?{}:""]));setEditing(row||null);setJson(JSON.stringify(value,null,2));setNotice("");}
 async function save(){try{const parsed=JSON.parse(json);const sb=createClient();const result=editing?await sb.from(cfg.table).update({...parsed,updated_at:new Date().toISOString()}).eq("id",editing.id):await sb.from(cfg.table).insert(parsed);if(result.error)throw result.error;setNotice("Record saved.");setEditing(null);await load();}catch(e){setError(e instanceof Error?e.message:"Invalid JSON or save failed");}}
 async function del(row:Row){if(!confirm("Delete this record? This cannot be undone."))return;const {error}=await createClient().from(cfg.table).delete().eq("id",row.id);if(error)setError(error.message);else{setNotice("Record deleted.");await load();}}
 if(!cfg)return <main className="p-8"><Link href="/admin">← Dashboard</Link><h1 className="mt-4 text-2xl font-semibold">Unknown admin page</h1></main>;
 const filtered=rows.filter(r=>JSON.stringify(r).toLowerCase().includes(search.toLowerCase()));
 return <div className="min-h-screen md:flex"><aside className="border-b bg-white p-5 md:min-h-screen md:w-60 md:border-b-0 md:border-r"><Link href="/admin" className="text-sm text-[#785b8e]">← Dashboard</Link><h1 className="mt-3 text-xl font-semibold">{cfg.title}</h1><p className="mt-2 text-sm text-gray-500">Manage records stored in Supabase.</p></aside><main className="min-w-0 flex-1 p-5 md:p-9">
 <p className="text-sm text-[#9278a5]">Content / {cfg.title}</p><div className="mt-1 flex flex-wrap items-center justify-between gap-3"><h2 className="text-3xl font-semibold">{cfg.title}</h2>{!["appointments","messages"].includes(resource)&&<button onClick={()=>startEdit()} className="rounded-xl bg-[#56396f] px-4 py-2.5 text-sm font-semibold text-white">+ Add record</button>}</div>
 <p className="mt-2 text-sm text-gray-500">Showing up to 100 records. Use Edit to update fields as JSON.</p>
 {notice&&<p className="mt-4 rounded-xl bg-green-50 p-3 text-sm text-green-800">{notice}</p>}{error&&<p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
 {editing!==null || (!editing && json!=="{}") ? <section className="mt-5 rounded-2xl border bg-white p-5"><div className="mb-3 flex items-center justify-between"><h3 className="font-semibold">{editing?"Edit record":"New record"}</h3><button onClick={()=>{setEditing(null);setJson("{}")}} className="text-sm">Cancel</button></div><p className="mb-2 text-xs text-gray-500">JSON fields: {cfg.fields.join(", ")}</p><textarea value={json} onChange={e=>setJson(e.target.value)} rows={12} spellCheck={false} className="w-full rounded-xl border p-3 font-mono text-sm"/><button onClick={save} className="mt-3 rounded-xl bg-[#56396f] px-4 py-2.5 text-sm font-semibold text-white">Save record</button></section>:null}
 <div className="mt-6 rounded-2xl border bg-white"><div className="border-b p-4"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search records…" className="w-full rounded-xl border px-3 py-2 text-sm md:max-w-sm"/></div>
 {loading?<p className="p-6 text-sm text-gray-500">Loading records…</p>:filtered.length===0?<p className="p-6 text-sm text-gray-500">No records found.</p>:<div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-[#faf8f4]"><tr><th className="p-4">Record</th><th className="p-4">Status</th><th className="p-4">Actions</th></tr></thead><tbody>{filtered.map(row=><tr key={row.id} className="border-t"><td className="max-w-xl p-4"><div className="font-medium">{String(row.title_en||row.title||row.name||row.display_name||row.question_en||row.setting_key||row.id)}</div><div className="mt-1 truncate text-xs text-gray-500">{String(row.slug||row.email||row.phone||row.section_key||"")}</div></td><td className="p-4">{String(row.is_published===true?"Published":row.is_published===false?"Draft":row.status||"—")}</td><td className="p-4"><div className="flex gap-2"><button onClick={()=>startEdit(row)} className="rounded-lg border px-3 py-1.5">Edit</button><button onClick={()=>del(row)} className="rounded-lg border border-red-200 px-3 py-1.5 text-red-700">Delete</button></div></td></tr>)}</tbody></table></div>}</div>
 </main></div>
}
