'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function AdminSignOut() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  async function signOut() {
    setLoading(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.replace('/admin/login')
    router.refresh()
  }
  return <button onClick={signOut} disabled={loading} className="inline-flex items-center gap-2 rounded-xl border border-stone-200 px-3 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-50 disabled:opacity-60"><LogOut size={16}/>{loading ? 'Signing out…' : 'Sign out'}</button>
}
