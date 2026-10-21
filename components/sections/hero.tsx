"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Phone, Users, Star, Award, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"

export function HeroSection() {
  const { t, language } = useI18n()

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 lg:pt-0 overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1920&q=80"
          alt="Natural healing background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-accent/15 rounded-full blur-3xl" />
      
      {/* Lotus Pattern SVG */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none hidden lg:block">
        <svg
          width="400"
          height="400"
          viewBox="0 0 100 100"
          className="text-primary"
          fill="currentColor"
        >
          <path d="M50 10 C60 30, 80 40, 90 50 C80 60, 60 70, 50 90 C40 70, 20 60, 10 50 C20 40, 40 30, 50 10 Z" />
          <circle cx="50" cy="50" r="10" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {language === "en" ? "25+ Years of Excellence" : "25+ वर्षों की उत्कृष्टता"}
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                {t("hero.title")}
              </h1>
              <p className="text-lg sm:text-xl text-accent font-medium">
                {t("hero.subtitle")}
              </p>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
              {t("hero.description")}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-base shadow-lg shadow-primary/25">
                <Link href="#contact">
                  {t("hero.cta")}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base bg-background/50 backdrop-blur-sm">
                <a href="tel:+919999999999">
                  <Phone className="mr-2 w-5 h-5" />
                  {t("hero.callNow")}
                </a>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-3 bg-card/50 backdrop-blur-sm rounded-full px-4 py-2 border border-border">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background flex items-center justify-center text-white text-xs font-medium"
                    >
                      {i}L
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t("hero.trustedBy")}</p>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual - Image Card */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://raw.githubusercontent.com/Priyanshu1511/Lala-jagannath/refs/heads/main/pic/tub.jpg"
                  alt="Natural therapy treatment"
                  width={600}
                  height={500}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>

              {/* Floating Stats Card - Top Left */}
              <div className="absolute -top-6 -left-6 bg-card rounded-2xl p-4 shadow-xl border border-border animate-bounce" style={{ animationDuration: "3s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-serif text-xl font-bold text-primary">25+</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {language === "en" ? "Years" : "वर्ष"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {language === "en" ? "Experience" : "अनुभव"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Stats Card - Bottom Right */}
              <div className="absolute -bottom-6 -right-6 bg-card rounded-2xl p-4 shadow-xl border border-border animate-bounce" style={{ animationDuration: "4s", animationDelay: "1s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">1,00,000+</p>
                    <p className="text-sm text-muted-foreground">
                      {language === "en" ? "Patients Healed" : "रोगी स्वस्थ"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Watch Video Button */}
              <div className="absolute bottom-6 left-6">
                <button className="flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-full pl-2 pr-5 py-2 shadow-lg hover:bg-white transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <Play className="w-4 h-4 text-primary-foreground ml-0.5" />
                  </div>
                  <span className="font-medium text-foreground text-sm">
                    {language === "en" ? "Watch Our Story" : "हमारी कहानी देखें"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </section>
  )
}
