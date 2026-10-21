"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault(); setBusy(true); setError("");
    try {
      const supabase = createClient();
      const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError || !data.user) throw authError || new Error("Login failed");
      const { data: admin, error: roleError } = await supabase
        .from("admin_members").select("user_id, role").eq("user_id", data.user.id).maybeSingle();
      if (roleError || !admin) {
        await supabase.auth.signOut();
        throw new Error("This account is not authorized as a website administrator.");
      }
      router.replace("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in. Check Supabase configuration.");
    } finally { setBusy(false); }
  }

  return <main className="flex min-h-screen items-center justify-center px-4 py-10">
    <form onSubmit={submit} className="w-full max-w-md rounded-3xl border border-[#e8dfd2] bg-white p-8 shadow-xl">
      <Link href="/" className="text-sm text-[#785b8e]">← Back to website</Link>
      <div className="mt-6 mb-7">
        <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#9278a5]">Lala Jagannath</p>
        <h1 className="mt-2 text-3xl font-semibold">Administrator login</h1>
        <p className="mt-2 text-sm text-gray-500">Sign in with an authorized Supabase account.</p>
      </div>
      <label className="mb-1 block text-sm font-medium">Email</label>
      <input required type="email" autoComplete="username" value={email} onChange={e=>setEmail(e.target.value)} className="mb-4 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#785b8e]" />
      <label className="mb-1 block text-sm font-medium">Password</label>
      <input required type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} className="mb-4 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#785b8e]" />
      {error && <p role="alert" className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <button disabled={busy} className="w-full rounded-xl bg-[#56396f] px-4 py-3 font-semibold text-white transition hover:bg-[#422956] disabled:opacity-60">{busy ? "Signing in…" : "Sign in securely"}</button>
      <p className="mt-4 text-xs leading-5 text-gray-500">There is no public registration link. An administrator must be provisioned through the secure setup procedure.</p>
    </form>
  </main>;
}
