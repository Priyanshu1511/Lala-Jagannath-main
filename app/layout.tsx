import type { Metadata } from "next"
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

export const metadata: Metadata = {
  title: "Lala Jagannath Prakritik Chikitsalay | Natural Healing & Yoga Therapy in Panipat | लाला जगन्नाथ प्राकृतिक चिकित्सालय",
  description:
    "Best naturopathy hospital in Panipat offering yoga therapy, detox, stress relief, anger control, chakra healing & havan. प्राकृतिक चिकित्सा, योग, क्रोध नियंत्रण, चक्र जागरण, हवन के लाभ। 25+ years experience, 1,00,000+ patients healed.",
  keywords: [
    "naturopathy hospital Panipat",
    "yoga therapy",
    "detox center",
    "stress relief",
    "anger management",
    "chakra healing",
    "havan benefits",
    "प्राकृतिक चिकित्सा",
    "योग",
    "क्रोध नियंत्रण",
    "चक्र जागरण",
    "हवन के लाभ",
    "Arya Samaj",
    "Vedic healing",
    "natural treatment",
    "holistic wellness",
  ],
  authors: [{ name: "Lala Jagannath Prakritik Chikitsalay" }],
  creator: "Lala Jagannath Prakritik Chikitsalay",
  openGraph: {
    title: "Lala Jagannath Prakritik Chikitsalay | Natural Healing & Yoga Therapy",
    description:
      "Experience natural healing rooted in Vedic wisdom. Yoga therapy, naturopathy, chakra healing & more.",
    type: "website",
    locale: "en_IN",
    alternateLocale: "hi_IN",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
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
              url: "https://lalajagannath.com",
              telephone: "+91-XXXXXXXXXX",
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
