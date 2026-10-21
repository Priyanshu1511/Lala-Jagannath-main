"use client"

import { I18nProvider } from "@/lib/i18n"
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

export default function Home() {
  return (
    <I18nProvider>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <DoctorsSection />
          <ServicesSection />
          <ConditionsSection />
          <MindHealingSection />
          <VirtualHavanSection />
          <PhilosophySection />
          <LadiesWellnessSection />
          <TestimonialsSection />
          <FAQSection />
          <ContactSection />
        </main>
        <Footer />
        <FloatingButtons />
      </div>
    </I18nProvider>
  )
}
