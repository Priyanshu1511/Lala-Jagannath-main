"use client"

import { ArrowRight, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"

const programs = [
  { key: "prenatal", icon: "🤰" },
  { key: "postnatal", icon: "👶" },
  { key: "menstrual", icon: "🌸" },
  { key: "menopause", icon: "🌺" },
]

export function LadiesWellnessSection() {
  const { t } = useI18n()

  return (
    <section id="ladies-wellness" className="py-20 lg:py-32 bg-gradient-to-br from-pink-50 via-background to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Visual */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-pink-100 to-purple-100 overflow-hidden relative">
              {/* Decorative Elements */}
              <div className="absolute top-8 left-8 w-24 h-24 rounded-full bg-pink-200/50" />
              <div className="absolute bottom-8 right-8 w-32 h-32 rounded-full bg-purple-200/50" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-32 h-32 rounded-full bg-white/80 flex items-center justify-center shadow-lg">
                  <Heart className="w-12 h-12 text-pink-500" />
                </div>
              </div>
              
              {/* Lotus petals */}
              <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
                <path d="M50 20 Q60 35 50 50 Q40 35 50 20" fill="currentColor" className="text-pink-400" />
                <path d="M50 20 Q60 35 50 50 Q40 35 50 20" fill="currentColor" className="text-pink-400" transform="rotate(60 50 50)" />
                <path d="M50 20 Q60 35 50 50 Q40 35 50 20" fill="currentColor" className="text-pink-400" transform="rotate(120 50 50)" />
                <path d="M50 20 Q60 35 50 50 Q40 35 50 20" fill="currentColor" className="text-pink-400" transform="rotate(180 50 50)" />
                <path d="M50 20 Q60 35 50 50 Q40 35 50 20" fill="currentColor" className="text-pink-400" transform="rotate(240 50 50)" />
                <path d="M50 20 Q60 35 50 50 Q40 35 50 20" fill="currentColor" className="text-pink-400" transform="rotate(300 50 50)" />
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-sm font-medium mb-4">
                <Heart className="w-4 h-4" />
                {t("ladies.subtitle")}
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                {t("ladies.title")}
              </h2>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              {t("ladies.description")}
            </p>

            {/* Programs */}
            <div className="grid sm:grid-cols-2 gap-4">
              {programs.map((program) => (
                <div
                  key={program.key}
                  className="bg-white rounded-xl p-5 border border-pink-100 hover:border-pink-200 hover:shadow-lg transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl" role="img" aria-hidden="true">
                      {program.icon}
                    </span>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-pink-600 transition-colors">
                        {t(`ladies.programs.${program.key}` as const)}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button asChild size="lg" className="bg-pink-600 hover:bg-pink-700 text-white">
              <a href="#contact">
                {t("nav.bookAppointment")}
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
