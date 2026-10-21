"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Section = { id: string; section_key: string; title_en: string; title_hi: string; subtitle_en: string | null; body_en: string | null; image_url: string | null; display_order: number; is_published: boolean };
const empty = { section_key:"hero", title_en:"", title_hi:"", subtitle_en:"", body_en:"", image_url:"", display_order:0, is_published:false };
const known = ["hero","about","doctors","services","conditions","mind-healing","virtual-havan","philosophy","ladies-wellness","testimonials","faq","contact"];
export default function SectionsPage() {
  const router = useRouter(); const [rows,setRows]=useState<Section[]>([]); const [form,setForm]=useState(empty);
  const [editId,setEditId]=useState<string|null>(null); const [loading,setLoading]=useState(true); const [saving,setSaving]=useState(false); const [notice,setNotice]=useState(""); const [error,setError]=useState("");
  async function refresh() {
    setLoading(true); setError("");
    try {
      const sb=createClient(); const {data:{user}}=await sb.auth.getUser();
      if(!user){router.replace("/admin/login");return;}
      const {data:member}=await sb.from("admin_members").select("user_id").eq("user_id",user.id).maybeSingle();
      if(!member){await sb.auth.signOut();router.replace("/admin/login");return;}
      const {data,error}=await sb.from("site_sections").select("*").order("display_order");
      if(error) throw error; setRows((data||[]) as Section[]);
    } catch(e){setError(e instanceof Error?e.message:"Unable to load sections");} finally{setLoading(false);}
  }
  useEffect(()=>{refresh();},[]);
  async function save(e:FormEvent){e.preventDefault();setSaving(true);setNotice("");setError("");
    try { const sb=createClient(); const payload={...form,subtitle_en:form.subtitle_en||null,body_en:form.body_en||null,image_url:form.image_url||null,updated_at:new Date().toISOString()};
      const result=editId?await sb.from("site_sections").update(payload).eq("id",editId):await sb.from("site_sections").insert(payload);
      if(result.error) throw result.error; setNotice(form.is_published?"Section saved and marked published.":"Draft saved."); setForm(empty);setEditId(null);await refresh();
    }catch(e){setError(e instanceof Error?e.message:"Save failed");}finally{setSaving(false);}
  }
  function edit(r:Section){setEditId(r.id);setForm({section_key:r.section_key,title_en:r.title_en,title_hi:r.title_hi,subtitle_en:r.subtitle_en||"",body_en:r.body_en||"",image_url:r.image_url||"",display_order:r.display_order,is_published:r.is_published});window.scrollTo({top:0,behavior:"smooth"});}
  async function remove(r:Section){if(!confirm(`Delete section "${r.title_en}"?`))return;const {error}=await createClient().from("site_sections").delete().eq("id",r.id);if(error)setError(error.message);else{setNotice("Section deleted.");await refresh();}}
  async function publish(r:Section){const {error}=await createClient().from("site_sections").update({is_published:!r.is_published,updated_at:new Date().toISOString()}).eq("id",r.id);if(error)setError(error.message);else{setNotice(r.is_published?"Section moved to draft.":"Section published.");await refresh();}}
  return <div className="min-h-screen md:flex">
    <aside className="border-b border-[#e8dfd2] bg-white p-5 md:min-h-screen md:w-60 md:border-b-0 md:border-r"><Link href="/admin" className="text-sm text-[#785b8e]">← Dashboard</Link><h1 className="mt-3 text-xl font-semibold">Homepage sections</h1><p className="mt-2 text-sm text-gray-500">Manage section metadata and publication status.</p></aside>
    <main className="min-w-0 flex-1 p-5 md:p-9"><div className="mb-6"><p className="text-sm text-[#9278a5]">Content / Homepage</p><h2 className="mt-1 text-3xl font-semibold">Section editor</h2><p className="mt-2 text-sm text-gray-500">Save drafts, publish sections and set their display order.</p></div>
      {notice&&<p className="mb-4 rounded-xl bg-green-50 p-3 text-sm text-green-800">{notice}</p>}{error&&<p className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <form onSubmit={save} className="mb-8 grid gap-4 rounded-2xl border border-[#e8dfd2] bg-white p-5 md:grid-cols-2">
        <div className="md:col-span-2"><h3 className="font-semibold">{editId?"Edit section":"Add homepage section"}</h3></div>
        <label className="text-sm">Section key<select required value={form.section_key} onChange={e=>setForm({...form,section_key:e.target.value})} className="mt-1 block w-full rounded-xl border p-3">{known.map(k=><option key={k}>{k}</option>)}</select></label>
        <label className="text-sm">Display order<input type="number" value={form.display_order} onChange={e=>setForm({...form,display_order:Number(e.target.value)})} className="mt-1 block w-full rounded-xl border p-3"/></label>
        <label className="text-sm">Heading (English)<input required value={form.title_en} onChange={e=>setForm({...form,title_en:e.target.value})} className="mt-1 block w-full rounded-xl border p-3"/></label>
        <label className="text-sm">Heading (Hindi)<input required value={form.title_hi} onChange={e=>setForm({...form,title_hi:e.target.value})} className="mt-1 block w-full rounded-xl border p-3"/></label>
        <label className="text-sm md:col-span-2">Subtitle<input value={form.subtitle_en} onChange={e=>setForm({...form,subtitle_en:e.target.value})} className="mt-1 block w-full rounded-xl border p-3"/></label>
        <label className="text-sm md:col-span-2">Body text<textarea rows={4} value={form.body_en} onChange={e=>setForm({...form,body_en:e.target.value})} className="mt-1 block w-full rounded-xl border p-3"/></label>
        <label className="text-sm md:col-span-2">Image URL<input type="url" value={form.image_url} onChange={e=>setForm({...form,image_url:e.target.value})} placeholder="https://…" className="mt-1 block w-full rounded-xl border p-3"/></label>
        {form.image_url&&<div className="md:col-span-2"><p className="mb-2 text-xs text-gray-500">Image preview</p><img src={form.image_url} alt="Section preview" className="max-h-48 rounded-xl object-cover"/></div>}
        <label className="flex items-center gap-2 text-sm md:col-span-2"><input type="checkbox" checked={form.is_published} onChange={e=>setForm({...form,is_published:e.target.checked})}/> Published</label>
        <div className="flex flex-wrap gap-2 md:col-span-2"><button disabled={saving} className="rounded-xl bg-[#56396f] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50">{saving?"Saving…":form.is_published?"Save & publish":"Save draft"}</button><button type="button" onClick={()=>{setForm(empty);setEditId(null)}} className="rounded-xl border px-5 py-2.5 text-sm">Clear</button></div>
      </form>
      <div className="overflow-hidden rounded-2xl border border-[#e8dfd2] bg-white"><div className="border-b p-4 font-semibold">Existing sections <span className="ml-2 text-sm font-normal text-gray-500">{rows.length} records</span></div>{loading?<p className="p-6 text-sm text-gray-500">Loading sections…</p>:rows.length===0?<p className="p-6 text-sm text-gray-500">No section records yet. Run the SQL migration and add the sections.</p>:<div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-[#faf8f4] text-gray-500"><tr><th className="p-4">Section</th><th className="p-4">Order</th><th className="p-4">Status</th><th className="p-4">Actions</th></tr></thead><tbody>{rows.map(r=><tr key={r.id} className="border-t"><td className="p-4"><div className="font-medium">{r.title_en}</div><div className="text-xs text-gray-500">{r.section_key} · {r.title_hi}</div></td><td className="p-4">{r.display_order}</td><td className="p-4"><span className={`rounded-full px-2.5 py-1 text-xs ${r.is_published?"bg-green-50 text-green-700":"bg-amber-50 text-amber-700"}`}>{r.is_published?"Published":"Draft"}</span></td><td className="p-4"><div className="flex flex-wrap gap-2"><button onClick={()=>edit(r)} className="rounded-lg border px-3 py-1.5">Edit</button><button onClick={()=>publish(r)} className="rounded-lg border px-3 py-1.5">{r.is_published?"Unpublish":"Publish"}</button><button onClick={()=>remove(r)} className="rounded-lg border border-red-200 px-3 py-1.5 text-red-700">Delete</button></div></td></tr>)}</tbody></table></div>}</div>
    </main>
  </div>;
}
