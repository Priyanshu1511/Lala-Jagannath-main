"use client"

import { I18nProvider } from "@/lib/i18n"
import { CmsProvider } from "@/lib/cms/context"
import { CmsHomepageSections } from "@/components/cms-homepage-sections"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingButtons } from "@/components/floating-buttons"

export default function Home() {
  return (
    <I18nProvider>
      <CmsProvider>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <CmsHomepageSections />
        </main>
        <Footer />
        <FloatingButtons />
      </div>
      </CmsProvider>
    </I18nProvider>
  )
}
