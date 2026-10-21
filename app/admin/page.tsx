"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const nav = [
  ["Overview", "/admin"], ["Homepage sections", "/admin/sections"], ["Services", "/admin/services"],
  ["Doctors", "/admin/doctors"], ["Yoga", "/admin/yoga"], ["Articles", "/admin/articles"],
  ["Testimonials", "/admin/testimonials"], ["FAQs", "/admin/faqs"], ["Appointments", "/admin/appointments"],
  ["Messages", "/admin/messages"], ["SEO", "/admin/seo"], ["Settings", "/admin/settings"],
];

export default function AdminDashboard() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [counts, setCounts] = useState<Record<string, number | string>>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let live = true;
    async function load() {
      try {
        const sb = createClient();
        const { data: { user } } = await sb.auth.getUser();
        if (!user) { router.replace("/admin/login"); return; }
        const { data: member, error: roleError } = await sb.from("admin_members").select("user_id,role").eq("user_id", user.id).maybeSingle();
        if (roleError || !member) { await sb.auth.signOut(); router.replace("/admin/login"); return; }
        setEmail(user.email || "");
        const tables = ["site_sections","services","doctors","yoga_tutorials","articles","testimonials","faqs","appointment_requests","contact_messages"];
        const results = await Promise.all(tables.map(async table => {
          const { count, error } = await sb.from(table).select("id", { count: "exact", head: true });
          return [table, error ? "—" : (count ?? 0)] as const;
        }));
        if (live) setCounts(Object.fromEntries(results));
      } catch (e) { if (live) setError(e instanceof Error ? e.message : "Could not load dashboard"); }
      finally { if (live) setLoading(false); }
    }
    load(); return () => { live = false; };
  }, [router]);

  async function logout() {
    try { await createClient().auth.signOut(); } finally { router.replace("/admin/login"); }
  }
  const cards = [
    ["Homepage sections","site_sections","/admin/sections"],["Services","services","/admin/services"],["Doctors","doctors","/admin/doctors"],
    ["Yoga tutorials","yoga_tutorials","/admin/yoga"],["Articles","articles","/admin/articles"],["Testimonials","testimonials","/admin/testimonials"],
    ["FAQs","faqs","/admin/faqs"],["Appointment enquiries","appointment_requests","/admin/appointments"],["Contact messages","contact_messages","/admin/messages"],
  ];
  return <div className="min-h-screen md:flex">
    <aside className="w-full border-b border-[#e8dfd2] bg-white p-5 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
      <Link href="/" className="text-xs font-semibold uppercase tracking-[.18em] text-[#9278a5]">Lala Jagannath</Link>
      <h1 className="mb-6 mt-2 text-xl font-semibold">Website CMS</h1>
      <nav className="grid grid-cols-2 gap-1 md:grid-cols-1">{nav.map(([label,href])=><Link key={href} href={href} className={`rounded-xl px-3 py-2.5 text-sm ${href==="/admin" ? "bg-[#56396f] text-white" : "text-[#594b63] hover:bg-[#f4eff7]"}`}>{label}</Link>)}</nav>
      <button onClick={logout} className="mt-6 w-full rounded-xl border border-[#e8dfd2] px-3 py-2 text-sm hover:bg-gray-50">Sign out</button>
    </aside>
    <main className="min-w-0 flex-1 p-5 md:p-9">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div><p className="text-sm text-[#9278a5]">Administration / Overview</p><h2 className="mt-1 text-3xl font-semibold">Dashboard</h2><p className="mt-2 text-sm text-gray-500">Manage content that powers the website.</p></div>
        <div className="rounded-xl bg-white px-4 py-2 text-sm shadow-sm">{email || "Checking session…"}</div>
      </div>
      {error && <p className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{cards.map(([label,key,href])=><Link href={href} key={key} className="group rounded-2xl border border-[#e8dfd2] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md"><div className="flex items-center justify-between"><span className="text-sm text-gray-500">{label}</span><span className="text-[#9278a5]">↗</span></div><div className="mt-3 text-3xl font-semibold">{loading ? "…" : (counts[key] ?? "—")}</div><p className="mt-2 text-xs text-gray-500">Records in Supabase</p></Link>)}</div>
      <section className="mt-8 rounded-2xl border border-[#e8dfd2] bg-white p-5"><h3 className="font-semibold">Quick actions</h3><div className="mt-4 flex flex-wrap gap-3"><Link className="rounded-xl bg-[#56396f] px-4 py-2.5 text-sm font-medium text-white" href="/admin/sections">Manage homepage</Link><Link className="rounded-xl border px-4 py-2.5 text-sm" href="/admin/settings">Website settings</Link><Link className="rounded-xl border px-4 py-2.5 text-sm" href="/">View public website</Link></div><p className="mt-4 text-xs leading-5 text-gray-500">Counts and content depend on your Supabase migration and administrator membership. Run the migration before using the CMS.</p></section>
    </main>
  </div>;
}
