import Link from 'next/link'
import { redirect } from 'next/navigation'
import { BookOpenText, CalendarDays, FileText, HelpCircle, Image, LayoutDashboard, LogOut, MessageSquare, Settings, ShieldCheck, Stethoscope, Users, Flower2, Search } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import AdminSignOut from './components/sign-out'

const modules = [
  { title: 'Homepage sections', description: 'Manage section headings and publication state.', href: '/admin/sections', icon: LayoutDashboard },
  { title: 'Services & treatments', description: 'Edit services displayed on the website.', href: '/admin/services', icon: Stethoscope },
  { title: 'Doctors', description: 'Manage profiles and biographies.', href: '/admin/doctors', icon: Users },
  { title: 'Yoga tutorials', description: 'Manage yoga learning content.', href: '/admin/yoga', icon: Flower2 },
  { title: 'Articles', description: 'Manage knowledge-centre articles.', href: '/admin/articles', icon: BookOpenText },
  { title: 'Testimonials', description: 'Manage approved testimonials.', href: '/admin/testimonials', icon: MessageSquare },
  { title: 'FAQs', description: 'Update common questions and answers.', href: '/admin/faqs', icon: HelpCircle },
  { title: 'Appointments', description: 'Review appointment enquiries.', href: '/admin/appointments', icon: CalendarDays },
  { title: 'Contact messages', description: 'Review contact form submissions.', href: '/admin/messages', icon: MessageSquare },
  { title: 'SEO settings', description: 'Manage search and social metadata.', href: '/admin/seo', icon: Search },
  { title: 'Website settings', description: 'Manage global site settings.', href: '/admin/settings', icon: Settings },
]

export default async function AdminDashboardPage() {
  let supabase
  try {
    supabase = await createClient()
  } catch {
    redirect('/admin/login?error=configuration')
  }

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: membership, error: membershipError } = await supabase
    .from('admin_members')
    .select('role')
    .eq('user_id', user.id)
    .maybeSingle()

  if (membershipError || !membership || !['owner', 'admin', 'editor'].includes(membership.role)) {
    await supabase.auth.signOut()
    redirect('/admin/login?error=not_admin')
  }

  const countTables = ['site_sections', 'services', 'doctors', 'articles', 'appointment_requests', 'contact_messages'] as const
  const counts = await Promise.all(countTables.map(async (table) => {
    const result = await supabase.from(table).select('*', { count: 'exact', head: true })
    return { table, count: result.count ?? 0 }
  }))
  const labels: Record<(typeof countTables)[number], string> = {
    site_sections: 'Sections', services: 'Services', doctors: 'Doctors', articles: 'Articles', appointment_requests: 'Appointments', contact_messages: 'Messages',
  }

  return (
    <main className="min-h-screen bg-[#fbf8f2] text-stone-900">
      <header className="border-b border-purple-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-800 text-white"><ShieldCheck size={21} /></div><div><p className="font-serif text-lg font-semibold">Lala Jagannath</p><p className="text-xs text-stone-500">Website administration</p></div></div>
          <div className="flex items-center gap-3"><span className="hidden text-sm text-stone-600 sm:block">{user.email} · <span className="capitalize">{membership.role}</span></span><AdminSignOut /></div>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-700">Control centre</p><h1 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">Dashboard overview</h1><p className="mt-2 text-sm text-stone-600">Manage your website content and review incoming enquiries.</p></div><Link href="/" target="_blank" className="rounded-xl border border-purple-200 bg-white px-4 py-2.5 text-sm font-semibold text-purple-800 transition hover:bg-purple-50">View public website ↗</Link></div>
        <section aria-label="Database counts" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {counts.map(({ table, count }) => <div key={table} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"><p className="text-sm text-stone-500">{labels[table]}</p><p className="mt-2 text-3xl font-semibold text-purple-900">{count}</p><p className="mt-1 text-xs text-stone-400">Database records</p></div>)}
        </section>
        <div className="mb-4 mt-10 flex items-center gap-2"><Image size={20} className="text-purple-800"/><h2 className="font-serif text-2xl font-semibold">Content management</h2></div>
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map(({ title, description, href, icon: Icon }) => <Link key={href} href={href} className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-purple-300 hover:shadow-md"><div className="flex items-start justify-between gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-800 group-hover:bg-purple-800 group-hover:text-white"><Icon size={21}/></div><span className="text-stone-300 transition group-hover:text-purple-700">↗</span></div><h3 className="mt-4 font-semibold">{title}</h3><p className="mt-1 text-sm leading-6 text-stone-500">{description}</p></Link>)}
        </section>
        <p className="mt-8 text-xs leading-5 text-stone-500">Dashboard counts are read from Supabase. If a table has no read permission or does not exist, its count may show as zero; verify the migration and RLS policies.</p>
      </div>
    </main>
  )
}
