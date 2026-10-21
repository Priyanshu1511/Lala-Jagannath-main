"use client"

import Image from "next/image"
import { Award, Users, Stethoscope, Heart, CheckCircle2 } from "lucide-react"
import { useI18n } from "@/lib/i18n"

const stats = [
  { key: "experience", value: "25+", icon: Award },
  { key: "patients", value: "1,00,000+", icon: Users },
  { key: "therapies", value: "50+", icon: Stethoscope },
  { key: "doctors", value: "15+", icon: Heart },
]

export function AboutSection() {
  const { t, language } = useI18n()

  const highlights = language === "en" 
    ? ["Vedic Healing Traditions", "Modern Natural Therapies", "Personalized Treatment", "Holistic Wellness"]
    : ["वैदिक उपचार परंपराएं", "आधुनिक प्राकृतिक चिकित्सा", "व्यक्तिगत उपचार", "समग्र स्वास्थ्य"]

  return (
    <section id="about" className="py-20 lg:py-32 bg-card relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-accent blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Visual with Real Image */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://raw.githubusercontent.com/Priyanshu1511/Lala-jagannath/refs/heads/main/pic/WhatsApp.jpg"
                alt="Lala Jagannath Prakritik Chikitsalay"
                width={600}
                height={450}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
            </div>

            {/* Om Symbol Overlay */}
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-card shadow-xl border border-border flex items-center justify-center">
              <span className="font-serif text-4xl text-primary">ॐ</span>
            </div>

            {/* Floating Mission Card */}
            <div className="absolute -bottom-8 -right-4 lg:-right-8 bg-card rounded-2xl shadow-xl border border-border p-6 max-w-xs">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-serif text-lg font-semibold text-foreground">{t("about.mission")}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed line-clamp-3">
                    {t("about.missionText")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <Award className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">{t("about.subtitle")}</span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              {t("about.title")}
            </h2>

            {/* Description */}
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t("about.description")}
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-3">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-foreground text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <div
                    key={stat.key}
                    className="bg-secondary rounded-2xl p-4 text-center hover:shadow-lg transition-shadow group"
                  >
                    <Icon className="w-6 h-6 mx-auto text-primary mb-2 group-hover:scale-110 transition-transform" />
                    <p className="font-serif text-xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {t(`about.${stat.key}` as const)}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
