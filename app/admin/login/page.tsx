"use client";
import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LockKeyhole, LoaderCircle } from "lucide-react";
export default function AdminLoginPage(){
 const router=useRouter(); const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [busy,setBusy]=useState(false); const [error,setError]=useState("");
 async function submit(e:FormEvent){
  e.preventDefault(); setBusy(true); setError("");
  try {
   const supabase=createClient();
   const {data:authData,error:authError}=await supabase.auth.signInWithPassword({email:email.trim(),password});
   if(authError) throw new Error(`Sign-in failed: ${authError.message}`);
   if(!authData.user) throw new Error("Supabase did not return a signed-in user. Check the project URL and key.");
   const {data:membership,error:memberError}=await supabase
    .from("admin_members").select("role").eq("user_id",authData.user.id).maybeSingle();
   if(memberError) throw new Error(`Signed in, but administrator lookup failed: ${memberError.message}. Check that admin_members exists and its SELECT RLS policy allows users to read their own membership.`);
   if(!membership || !["owner","admin","editor"].includes(membership.role)) {
    await supabase.auth.signOut();
    throw new Error("Your email/password are valid, but this user has no owner/admin/editor row in public.admin_members for this Supabase project.");
   }
   // Force a fresh server request after Supabase has written its auth cookies.
   window.location.assign("/admin");
  } catch(err){setError(err instanceof Error?err.message:"Unable to sign in. Check the browser console and terminal.");}
  finally{setBusy(false);}
 }
 return <main className="min-h-screen bg-[#faf7f0] flex items-center justify-center p-5"><div className="w-full max-w-md bg-white border border-purple-100 rounded-3xl shadow-xl p-8"><div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 grid place-items-center mb-6"><LockKeyhole/></div><p className="uppercase tracking-[.22em] text-xs font-semibold text-purple-700">Lala Jagannath</p><h1 className="font-serif text-3xl mt-2 mb-2">Administrator login</h1><p className="text-sm text-stone-600 mb-7">Sign in with the account created in Supabase Authentication.</p><form onSubmit={submit} className="space-y-4"><label className="block text-sm font-medium">Email<input type="email" autoComplete="username" required value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"/></label><label className="block text-sm font-medium">Password<input type="password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)} className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"/></label>{error&&<div role="alert" className="rounded-xl bg-red-50 text-red-800 border border-red-200 p-3 text-sm">{error}</div>}<button disabled={busy} className="w-full rounded-xl bg-purple-800 hover:bg-purple-900 disabled:opacity-60 text-white font-semibold py-3 flex justify-center items-center gap-2">{busy&&<LoaderCircle className="animate-spin h-4 w-4"/>}{busy?"Signing in…":"Sign in securely"}</button></form><p className="text-xs text-stone-500 mt-6">Access is restricted to active administrator accounts. Registration is disabled.</p></div></main>
}
