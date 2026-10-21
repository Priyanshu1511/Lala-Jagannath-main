"use client";

import type { FormEvent } from "react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, Eye, Plus, RefreshCw, Save, Search, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Field, Resource } from "@/lib/cms/resources";

type Row = Record<string, any> & { id?: string; created_at?: string };
function emptyRecord(config: Resource): Row {
  const record: Row = {};
  for (const field of config.fields) {
    if (field.type === "checkbox") record[field.name] = false;
    else if (field.type === "json") record[field.name] = "[]";
    else if (field.type === "number") record[field.name] = 0;
    else record[field.name] = "";
  }
  return record;
}
function display(value: unknown) {
  if (value === null || value === undefined || value === "") return "—";
  return typeof value === "object" ? JSON.stringify(value) : String(value);
}

export function ResourceManager({ resourceKey, config }: { resourceKey: string; config: Resource; role: string }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [selected, setSelected] = useState<Row | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");
  const supabase = createClient();

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    let query = supabase.from(config.table).select("*").limit(200);
    if (["site_sections", "services", "doctors", "testimonials", "faqs"].includes(config.table)) {
      query = supabase.from(config.table).select("*").order("display_order", { ascending: true }).limit(200);
    }
    const { data, error: queryError } = await query;
    if (queryError) setError(queryError.message);
    else setRows((data || []) as Row[]);
    setLoading(false);
  }, [config.table, supabase]);

  useEffect(() => { void load(); }, [load]);
  const filtered = rows.filter((row) => JSON.stringify(row).toLowerCase().includes(search.toLowerCase()));
  const fields = config.fields;

  function startNew() { setSelected(emptyRecord(config)); setError(""); setNotice(""); }
  function edit(row: Row) { setSelected({ ...row }); setError(""); setNotice(""); }
  function setField(field: Field, value: unknown) { setSelected((previous) => previous ? { ...previous, [field.name]: value } : previous); }

  async function uploadMedia(field: Field, file: File) {
    setUploading(field.name);
    setError("");
    try {
      if (file.size > 50 * 1024 * 1024) throw new Error("File must be smaller than 50 MB.");
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
      const path = `${resourceKey}/${crypto.randomUUID()}-${safeName}`;
      const { error: uploadError } = await supabase.storage.from("cms-media").upload(path, file, {
        cacheControl: "3600", upsert: false, contentType: file.type,
      });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from("cms-media").getPublicUrl(path);
      setField(field, data.publicUrl);
      setNotice("Media uploaded. Save the record to store its URL.");
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Media upload failed. Check the cms-media bucket and policies.");
    } finally { setUploading(null); }
  }

  async function save(event: FormEvent) {
    event.preventDefault();
    if (!selected) return;
    setBusy(true); setError(""); setNotice("");
    const payload: Row = {};
    for (const field of fields) {
      let value = selected[field.name];
      if (field.type === "number") value = value === "" || value === null ? null : Number(value);
      if (field.type === "json" && typeof value === "string") {
        try { value = JSON.parse(value); }
        catch { setError(`${field.label} must contain valid JSON.`); setBusy(false); return; }
      }
      if (typeof value === "string") value = value.trim();
      if (field.required && (value === null || value === undefined || value === "")) {
        setError(`${field.label} is required.`); setBusy(false); return;
      }
      if (value !== "" && value !== undefined) payload[field.name] = value;
      else if (field.type === "checkbox") payload[field.name] = false;
      else payload[field.name] = null;
    }
    if (!config.private) payload.updated_at = new Date().toISOString();
    const result = selected.id
      ? await supabase.from(config.table).update(payload).eq("id", selected.id)
      : await supabase.from(config.table).insert(payload);
    if (result.error) setError(result.error.message);
    else { setNotice("Saved successfully."); setSelected(null); await load(); }
    setBusy(false);
  }

  async function remove(row: Row) {
    if (!row.id || !window.confirm("Delete this record permanently?")) return;
    setError("");
    const { error: deleteError } = await supabase.from(config.table).delete().eq("id", row.id);
    if (deleteError) setError(deleteError.message);
    else { setNotice("Record deleted."); if (selected?.id === row.id) setSelected(null); await load(); }
  }

  const recordTitle = (row: Row) => display(row.title_en || row.title || row.name || row.display_name || row.question_en || row.section_key || row.setting_key || row.id);
  return (
    <main className="max-w-7xl mx-auto p-5 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin" className="p-2 rounded-lg border bg-white" aria-label="Back to dashboard"><ArrowLeft size={18} /></Link>
        <div><p className="text-xs uppercase tracking-[.2em] text-purple-700">Content manager</p><h1 className="font-serif text-3xl sm:text-4xl">{config.title}</h1></div>
      </div>
      <p className="text-stone-600 mb-6">{config.description}</p>
      {config.private && <div className="mb-5 rounded-xl border border-amber-300 bg-amber-50 text-amber-900 p-3 text-sm">Private enquiries. Do not copy personal details into logs or public content.</div>}
      {error && <div role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 text-red-800 p-3 text-sm">{error}</div>}
      {notice && <div role="status" className="mb-4 rounded-xl border border-green-200 bg-green-50 text-green-800 p-3 text-sm">{notice}</div>}
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(320px,.9fr)] gap-5 items-start">
        <section className="rounded-2xl border bg-white p-4 sm:p-5">
          <div className="flex flex-wrap gap-3 justify-between mb-4">
            <div className="relative flex-1 min-w-[160px]"><Search className="absolute left-3 top-3 text-stone-400" size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search records" className="w-full rounded-xl border px-9 py-2.5 text-sm" /></div>
            <button onClick={startNew} className="rounded-xl bg-purple-800 text-white px-4 py-2.5 flex gap-2 items-center text-sm"><Plus size={16} /> Add new</button>
            <button onClick={() => void load()} className="rounded-xl border px-3 py-2.5" aria-label="Refresh records"><RefreshCw size={16} /></button>
          </div>
          {loading ? <p className="py-10 text-center text-stone-500">Loading database records…</p> : filtered.length === 0 ? <div className="py-12 text-center"><p className="font-medium">No records found</p><p className="text-sm text-stone-500 mt-1">Add a record or adjust your search.</p></div> : <div className="space-y-2">{filtered.map((row, index) => <div key={row.id || index} className={`rounded-xl border p-3 flex items-center gap-3 ${selected?.id === row.id ? "border-purple-400 bg-purple-50" : "border-stone-200"}`}><button onClick={() => edit(row)} className="min-w-0 flex-1 text-left"><span className="block truncate font-medium">{recordTitle(row)}</span><span className="text-xs text-stone-500">{row.is_published === true ? "Published" : row.is_published === false ? "Draft" : display(row.status || row.role || row.created_at)}</span></button><button onClick={() => edit(row)} className="text-sm text-purple-800 px-2">Edit</button>{config.canDelete !== false && <button onClick={() => void remove(row)} className="text-red-600 p-2" aria-label="Delete record"><Trash2 size={16} /></button>}</div>)}</div>}
          <p className="text-xs text-stone-400 mt-4">Showing up to 200 records. Access is enforced by Supabase RLS.</p>
        </section>
        <section className="rounded-2xl border bg-white p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4"><h2 className="font-serif text-2xl">{selected?.id ? "Edit record" : "Create record"}</h2>{selected && <button onClick={() => setSelected(null)} className="text-sm text-stone-500">Close</button>}</div>
          {!selected ? <div className="py-12 text-center text-stone-500"><Eye className="mx-auto mb-3" /><p>Select a record to edit or click Add new.</p></div> : <form onSubmit={save} className="space-y-4">
            {fields.map((field) => <label key={field.name} className={`block text-sm font-medium ${field.type === "checkbox" ? "flex items-center gap-3" : ""}`}>
              {field.type === "checkbox" ? <><input type="checkbox" checked={!!selected[field.name]} onChange={(event) => setField(field, event.target.checked)} className="h-4 w-4 accent-purple-800" />{field.label}</> : <>
                {field.label}{field.required && <span className="text-red-600"> *</span>}
                {field.type === "textarea" || field.type === "json" ? <textarea required={field.required} rows={field.type === "json" ? 4 : 3} value={typeof selected[field.name] === "object" ? JSON.stringify(selected[field.name], null, 2) : selected[field.name] ?? ""} onChange={(event) => setField(field, event.target.value)} className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2.5 font-normal" placeholder={field.type === "json" ? "Valid JSON required" : ""} /> : <>
                  <input required={field.required} type={field.type === "number" ? "number" : field.type === "url" ? "url" : field.type === "email" ? "email" : field.type === "date" ? "date" : "text"} value={selected[field.name] ?? ""} onChange={(event) => setField(field, field.type === "number" ? (event.target.value === "" ? "" : Number(event.target.value)) : event.target.value)} className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2.5 font-normal" />
                  {(field.name.endsWith("_url") || field.name === "media_url") && <div className="mt-2"><input type="file" accept={field.name === "video_url" ? "video/mp4,video/webm,audio/mpeg,audio/ogg" : "image/*,video/mp4,video/webm"} disabled={uploading !== null} onChange={(event) => { const file = event.target.files?.[0]; if (file) void uploadMedia(field, file); event.currentTarget.value = ""; }} className="block w-full text-xs text-stone-500 file:mr-3 file:rounded-lg file:border-0 file:bg-purple-50 file:px-3 file:py-2 file:text-purple-800" />{uploading === field.name && <span className="text-xs text-purple-800">Uploading…</span>}</div>}
                </>}
              </>}
            </label>)}
            <div className="flex gap-3 pt-2"><button disabled={busy || uploading !== null} className="flex-1 rounded-xl bg-purple-800 text-white py-3 flex items-center justify-center gap-2 disabled:opacity-60"><Save size={16} />{busy ? "Saving…" : "Save changes"}</button><button type="button" onClick={() => setSelected(null)} className="rounded-xl border px-4 py-3">Cancel</button></div>
          </form>}
        </section>
      </div>
    </main>
  );
}
