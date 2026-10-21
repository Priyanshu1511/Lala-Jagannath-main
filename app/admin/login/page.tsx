'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LockKeyhole, Mail, Eye, EyeOff, ArrowLeft, LoaderCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const supabase = createClient()
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

      if (signInError) throw signInError

      // The protected server page verifies admin_members before displaying the dashboard.
      router.replace('/admin')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in. Check your credentials and Supabase configuration.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fbf7ef] px-4 py-10 text-[#2c1d35]">
      <div aria-hidden="true" className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-purple-200/50 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-amber-100/70 blur-3xl" />
      <section className="relative w-full max-w-md rounded-3xl border border-purple-100 bg-white/90 p-7 shadow-xl shadow-purple-950/10 backdrop-blur sm:p-9">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-purple-800 transition hover:text-purple-950">
          <ArrowLeft size={16} /> Back to website
        </Link>
        <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-800 text-white shadow-lg shadow-purple-900/20">
          <LockKeyhole size={26} />
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-purple-700">Lala Jagannath</p>
        <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight">Admin sign in</h1>
        <p className="mt-2 text-sm leading-6 text-stone-600">Sign in with the email and password registered in Supabase Authentication.</p>

        <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold">Email address</label>
            <div className="flex items-center gap-3 rounded-xl border border-stone-200 bg-white px-3.5 focus-within:border-purple-500 focus-within:ring-4 focus-within:ring-purple-100">
              <Mail size={18} className="shrink-0 text-stone-400" />
              <input id="email" name="email" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@example.com" className="min-w-0 flex-1 bg-transparent py-3.5 text-sm outline-none placeholder:text-stone-400" />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-semibold">Password</label>
            <div className="flex items-center gap-3 rounded-xl border border-stone-200 bg-white px-3.5 focus-within:border-purple-500 focus-within:ring-4 focus-within:ring-purple-100">
              <LockKeyhole size={18} className="shrink-0 text-stone-400" />
              <input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="min-w-0 flex-1 bg-transparent py-3.5 text-sm outline-none placeholder:text-stone-400" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="text-stone-500 hover:text-purple-800">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>
          </div>
          {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-800">{error}</div>}
          <button disabled={loading} type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-800 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-900/15 transition hover:bg-purple-900 disabled:cursor-not-allowed disabled:opacity-60">
            {loading && <LoaderCircle size={17} className="animate-spin" />}{loading ? 'Signing in…' : 'Sign in securely'}
          </button>
        </form>
        <p className="mt-6 text-center text-xs leading-5 text-stone-500">Restricted to authorized administrators. Access is verified on the server.</p>
      </section>
    </main>
  )
}
