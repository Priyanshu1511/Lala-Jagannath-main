"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"

const services = [
  {
    key: "yoga",
    image: "https://raw.githubusercontent.com/Priyanshu1511/Lala-jagannath/refs/heads/main/pic/yoga.jpg",
  },
  {
    key: "diet",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
  },
  {
    key: "physio",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  },
  {
    key: "panchkarma",
    image: "https://raw.githubusercontent.com/Priyanshu1511/Lala-jagannath/refs/heads/main/pic/massage.jpg",
  },
  {
    key: "acupuncture",
    image: "https://raw.githubusercontent.com/Priyanshu1511/Lala-jagannath/refs/heads/main/pic/cupping.jpg",
  },
  {
    key: "meditation",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
  },
]

export function ServicesSection() {
  const { t, language } = useI18n()

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
            {t("services.title")}
          </h2>
          <p className="text-lg text-muted-foreground">{t("services.subtitle")}</p>
        </div>

        {/* Services Grid with Images */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.key}
              className="group relative rounded-3xl overflow-hidden h-80 cursor-pointer"
            >
              {/* Background Image */}
              <Image
                src={service.image}
                alt={t(`services.${service.key}.title` as const)}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="font-serif text-2xl font-bold text-white mb-2">
                  {t(`services.${service.key}.title` as const)}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-2">
                  {t(`services.${service.key}.description` as const)}
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
