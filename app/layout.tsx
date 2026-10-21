import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { Playfair_Display, Noto_Sans_Devanagari } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

const notoSans = Noto_Sans_Devanagari({
  subsets: ["devanagari", "latin"],
  variable: "--font-sans",
  display: "swap",
})

const baseMetadata: Metadata = {
  title: "Lala Jagannath Prakritik Chikitsalay | Natural Healing & Yoga Therapy | लाला जगन्नाथ प्राकृतिक चिकित्सालय",
  description: "Natural healing, yoga therapy and wellness information from Lala Jagannath Prakritik Chikitsalay.",
  keywords: ["naturopathy", "yoga therapy", "natural wellness", "प्राकृतिक चिकित्सा", "योग"],
  authors: [{ name: "Lala Jagannath Prakritik Chikitsalay" }],
  creator: "Lala Jagannath Prakritik Chikitsalay",
  openGraph: { title: "Lala Jagannath Prakritik Chikitsalay", description: "Natural healing and yoga learning resources.", type: "website", locale: "en_IN", alternateLocale: "hi_IN" },
  robots: { index: true, follow: true },
  icons: { icon: [{ url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" }, { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" }, { url: "/icon.svg", type: "image/svg+xml" }], apple: "/apple-icon.png" },
}
export async function generateMetadata(): Promise<Metadata> {
  try {
    const supabase = await createClient()
    const { data } = await supabase.from("seo_settings").select("title,description,canonical_url,og_image,no_index").eq("page_key", "home").maybeSingle()
    if (!data) return baseMetadata
    return { ...baseMetadata, title: data.title || baseMetadata.title, description: data.description || baseMetadata.description, alternates: data.canonical_url ? { canonical: data.canonical_url } : undefined, openGraph: { ...baseMetadata.openGraph, title: data.title || "Lala Jagannath Prakritik Chikitsalay", description: data.description || "Natural healing and yoga learning resources.", images: data.og_image ? [data.og_image] : undefined }, robots: { index: !data.no_index, follow: !data.no_index } }
  } catch { return baseMetadata }
}

export const viewport = {
  themeColor: "#6b21a8",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${notoSans.variable} bg-background`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              name: "Lala Jagannath Prakritik Chikitsalay",
              alternateName: "लाला जगन्नाथ प्राकृतिक चिकित्सालय",
              description:
                "Natural healing center offering yoga therapy, naturopathy, and Vedic wellness treatments",
              url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Panipat",
                addressRegion: "Haryana",
                addressCountry: "IN",
              },
              medicalSpecialty: ["Naturopathy", "Yoga Therapy", "Alternative Medicine"],
              availableService: [
                "Yoga Therapy",
                "Diet Therapy",
                "Physiotherapy",
                "Panchkarma",
                "Meditation",
                "Acupuncture",
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
