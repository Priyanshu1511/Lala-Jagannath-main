"use client"

import { useI18n } from "@/lib/i18n"

const principles = [
  { key: "truth", icon: "☀️" },
  { key: "purity", icon: "💧" },
  { key: "discipline", icon: "🎯" },
  { key: "service", icon: "🙏" },
]

export function PhilosophySection() {
  const { t, language } = useI18n()

  return (
    <section id="philosophy" className="py-20 lg:py-32 bg-card relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)`,
          backgroundSize: '30px 30px',
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                {t("philosophy.title")}
              </h2>
              <p className="text-lg text-accent font-medium">
                {t("philosophy.subtitle")}
              </p>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              {t("philosophy.description")}
            </p>

            {/* Sanskrit Motto */}
            <div className="bg-primary/10 rounded-2xl p-6 border-l-4 border-primary">
              <p className="font-serif text-2xl text-primary mb-2">
                {t("philosophy.motto")}
              </p>
              <p className="text-muted-foreground italic">
                {language === "en" ? `"${t("philosophy.mottoMeaning")}"` : `"${t("philosophy.mottoMeaning")}"`}
              </p>
            </div>

            {/* Principles Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {principles.map((principle) => (
                <div
                  key={principle.key}
                  className="bg-background rounded-xl p-5 border border-border hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl" role="img" aria-hidden="true">
                      {principle.icon}
                    </span>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-foreground">
                        {t(`philosophy.principles.${principle.key}` as const)}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t(`philosophy.principles.${principle.key}Desc` as const)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="aspect-square max-w-md mx-auto relative">
              {/* Mandala-like design */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
              <div className="absolute inset-4 rounded-full border-2 border-primary/30" />
              <div className="absolute inset-8 rounded-full border-2 border-primary/40" />
              <div className="absolute inset-12 rounded-full border-2 border-primary/50" />
              <div className="absolute inset-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20" />
              
              {/* Center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="font-serif text-7xl text-primary">ॐ</span>
                  <p className="mt-4 text-lg font-medium text-foreground">Arya Samaj</p>
                  <p className="text-sm text-muted-foreground">
                    {language === "en" ? "Since 1875" : "1875 से"}
                  </p>
                </div>
              </div>

              {/* Corner Elements */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-accent rounded-full" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-accent rounded-full" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-accent rounded-full" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-accent rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
