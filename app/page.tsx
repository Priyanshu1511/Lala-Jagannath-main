"use client"

import { useEffect, useState } from "react"
import type { ComponentType } from "react"
import { I18nProvider } from "@/lib/i18n"
import { createClient } from "@/lib/supabase/client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingButtons } from "@/components/floating-buttons"
import { HeroSection } from "@/components/sections/hero"
import { AboutSection } from "@/components/sections/about"
import { DoctorsSection } from "@/components/sections/doctors"
import { ServicesSection } from "@/components/sections/services"
import { ConditionsSection } from "@/components/sections/conditions"
import { MindHealingSection } from "@/components/sections/mind-healing"
import { VirtualHavanSection } from "@/components/sections/virtual-havan"
import { PhilosophySection } from "@/components/sections/philosophy"
import { LadiesWellnessSection } from "@/components/sections/ladies-wellness"
import { TestimonialsSection } from "@/components/sections/testimonials"
import { FAQSection } from "@/components/sections/faq"
import { ContactSection } from "@/components/sections/contact"

const sectionComponents: Record<string, ComponentType> = {
  hero: HeroSection, about: AboutSection, doctors: DoctorsSection, services: ServicesSection,
  conditions: ConditionsSection, "mind-healing": MindHealingSection, "virtual-havan": VirtualHavanSection,
  philosophy: PhilosophySection, "ladies-wellness": LadiesWellnessSection, testimonials: TestimonialsSection,
  faq: FAQSection, contact: ContactSection,
}
const fallbackOrder = Object.keys(sectionComponents)

export default function Home() {
  const [sectionKeys, setSectionKeys] = useState<string[]>(fallbackOrder)
  useEffect(() => {
    let active = true
    try {
      const supabase = createClient()
      supabase.from("site_sections").select("section_key,display_order,is_published").eq("is_published", true).order("display_order")
        .then(({ data, error }) => {
          if (!active || error || !data?.length) return
          const keys = data.map(row => row.section_key).filter(key => Boolean(sectionComponents[key]))
          if (keys.includes("hero")) setSectionKeys(keys)
        })
    } catch {
      // Keep the original complete homepage available if Supabase is not configured.
    }
    return () => { active = false }
  }, [])
  return (
    <I18nProvider>
      <div className="min-h-screen">
        <Navbar />
        <main>
          {sectionKeys.map(key => {
            const Section = sectionComponents[key]
            return Section ? <Section key={key} /> : null
          })}
        </main>
        <Footer />
        <FloatingButtons />
      </div>
    </I18nProvider>
  )
}
