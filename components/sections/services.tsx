"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"
import { useCms } from "@/lib/cms/context"

const services = [
  {
    key: "yoga",
    image: "/pic/Yoga class in a bright hall (2).png",
  },
  {
    key: "diet",
    image: "/pic/Ayurvedic Medicines_ (1).jpg",
  },
  {
    key: "physio",
    image: "https://raw.githubusercontent.com/Priyanshu1511/Lala-Jagannath-main/refs/heads/main/Best%20Ayurvedic%20Treatment%20for%20Paralysis%20in%20India.jpg",
  },
  {
    key: "panchkarma",
    image: "https://raw.githubusercontent.com/Priyanshu1511/Lala-Jagannath-main/refs/heads/main/Panchakarma%20Treatments%20in%20Rishikesh.jpg",
  },
  {
    key: "acupuncture",
    image: "https://raw.githubusercontent.com/Priyanshu1511/Lala-Jagannath-main/refs/heads/main/Discover%20Wellness_%20Your%20Path%20to%20Holistic%20Healing%20at%20Nirvana%20Naturopathy.jpg",
  },
  {
    key: "meditation",
    image: "/pic/Discover Wellness_ Your Path to Holistic Healing at Nirvana Naturopathy (1).jpg",
  },
]

export function ServicesSection() {
  const { t, language } = useI18n()
  const cms = useCms()
  const section = cms?.sections.find(s => s.section_key === "services")
  const visibleServices = cms?.services.length ? cms.services.map((s:any) => ({key:s.id, title:language === "en" ? s.title_en : (s.title_hi || s.title_en), description:language === "en" ? (s.description_en || "") : (s.description_hi || s.description_en || ""), image:s.image_url || "/pic/Ayurvedic Medicines_ (1).jpg", dynamic:true})) : services.map(s=>({...s,dynamic:false}))

  return (
    <section id="services" className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-accent blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-medium text-primary">
              {language === "en" ? "Our Therapies" : "हमारी चिकित्सा"}
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {(language === "en" ? section?.title_en : section?.title_hi) || t("services.title")}
          </h2>
          <p className="text-lg text-muted-foreground">{(language === "en" ? section?.subtitle_en : section?.subtitle_hi) || t("services.subtitle")}</p>
        </div>

        {/* Services Grid with Images */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleServices.map((service:any) => (
            <div
              key={service.key}
              className="group relative rounded-3xl overflow-hidden h-80 cursor-pointer"
            >
              {/* Background Image */}
              <Image
                src={service.image}
                unoptimized
                alt={service.dynamic ? service.title : t(`services.${service.key}.title` as const)}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="font-serif text-2xl font-bold text-white mb-2">
                  {service.dynamic ? service.title : t(`services.${service.key}.title` as const)}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-2">
                  {service.dynamic ? service.description : t(`services.${service.key}.description` as const)}
                </p>
                
                {/* Hover Button */}
                <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <Button variant="secondary" size="sm" className="gap-2">
                    {t("services.learnMore")}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
