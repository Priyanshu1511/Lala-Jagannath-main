
"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Phone,
  Users,
  Award,
  Play,
  X,
  Leaf,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"
import { useCmsSection, useCmsSetting } from "@/lib/cms/context"

export function HeroSection() {
  const { t, language } = useI18n()
  const cms = useCmsSection("hero")
  const phone = useCmsSetting("site.contact_phone", "+91 99999 99999")
  const [showVideo, setShowVideo] = useState(false)

  // Set this CMS setting to a real MP4 URL or your video URL.
  const videoUrl = useCmsSetting("site.hero_video_url", "")

  const heroImage =
    cms?.image_url || "/pic/Yoga class in a bright hall (2).png"

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-[#fcfaf5] pt-24 lg:pt-28"
    >
      {/* Soft, warm background — does not cover the hero photo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#e8dfc9]/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#dce8d2]/35 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-16">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          {/* Left: content */}
          <div className="relative z-10 space-y-6 lg:space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d9c9b3] bg-white/80 px-4 py-2 text-sm font-medium text-[#6b4590] shadow-sm">
              <Award className="h-4 w-4" />
              {language === "en"
                ? "25+ Years of Excellence"
                : "25+ वर्षों की उत्कृष्टता"}
            </div>

            <div className="space-y-4">
              <h1 className="max-w-2xl font-serif text-4xl font-bold leading-[1.12] tracking-tight text-[#26212a] sm:text-5xl lg:text-[3.65rem]">
                {(language === "en" ? cms?.title_en : cms?.title_hi) ||
                  t("hero.title")}
              </h1>

              <p className="max-w-xl text-lg leading-relaxed text-[#b96e35] sm:text-xl">
                {(language === "en"
                  ? cms?.subtitle_en
                  : cms?.subtitle_hi) || t("hero.subtitle")}
              </p>
            </div>

            <p className="max-w-xl text-base leading-8 text-[#635d65] sm:text-lg">
              {(language === "en" ? cms?.body_en : cms?.body_hi) ||
                t("hero.description")}
            </p>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-xl bg-[#68409a] px-6 text-base shadow-lg shadow-[#68409a]/20 transition hover:bg-[#563381]"
              >
                <Link href={cms?.button_url || "#contact"}>
                  {(language === "en"
                    ? cms?.button_label_en
                    : cms?.button_label_hi) || t("hero.cta")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-xl border-[#e4dcd3] bg-white/80 px-5 text-base text-[#342d38] hover:bg-white"
              >
                <a href={`tel:${phone.replace(/[^+\d]/g, "")}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  {t("hero.callNow")}
                </a>
              </Button>
            </div>

            <div className="flex items-center gap-3 border-t border-[#e9e1d7] pt-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8efdf]">
                <Leaf className="h-5 w-5 text-[#54764b]" />
              </div>
              <p className="max-w-sm text-sm leading-6 text-[#716971]">
                {language === "en"
                  ? "A welcoming space for natural wellness, mindful movement and holistic living."
                  : "प्राकृतिक स्वास्थ्य, योग और संतुलित जीवनशैली के लिए आपका स्वागत है।"}
              </p>
            </div>
          </div>

          {/* Right: sharp image with subtle styling */}
          <div className="relative mx-auto w-full max-w-2xl lg:mx-0">
            <div className="absolute -inset-3 rounded-[2rem] bg-[#e7dece]/50 blur-xl" />

            <div className="relative h-[390px] overflow-hidden rounded-[1.75rem] border border-white/70 bg-[#e9e2d6] shadow-2xl shadow-[#514332]/15 sm:h-[480px] lg:h-[540px]">
              <Image
                src={heroImage}
                alt="Lala Jagannath Prakritik Chikitsalay wellness and yoga"
                fill
                priority
                unoptimized
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center"
              />

              {/* Only a very subtle bottom shade; the photo stays clear */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/25 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 sm:bottom-7 sm:left-7 sm:right-7">
                <button
                  type="button"
                  onClick={() => setShowVideo(true)}
                  className="inline-flex items-center gap-3 rounded-full border border-white/80 bg-white/95 py-2 pl-2 pr-5 shadow-lg transition hover:-translate-y-0.5 hover:bg-white"
                  aria-label="Watch our story"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#68409a] text-white">
                    <Play className="ml-0.5 h-4 w-4" />
                  </span>
                  <span className="text-sm font-semibold text-[#342d38]">
                    {language === "en"
                      ? "Watch Our Story"
                      : "हमारी कहानी देखें"}
                  </span>
                </button>

                <div className="hidden items-center gap-3 rounded-2xl border border-white/70 bg-white/95 p-3 shadow-lg sm:flex">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f8eadb]">
                    <Users className="h-5 w-5 text-[#c7834c]" />
                  </span>
                  <div>
                    <p className="font-serif text-sm font-bold text-[#342d38]">
                      {language === "en" ? "Personalized Care" : "व्यक्तिगत देखभाल"}
                    </p>
                    <p className="text-xs text-[#756b76]">
                      {language === "en" ? "Your wellness journey" : "आपकी स्वास्थ्य यात्रा"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating experience badge */}
            <div className="absolute -left-3 top-6 flex items-center gap-3 rounded-2xl border border-[#eee6dc] bg-white/95 p-3 shadow-xl sm:-left-6 sm:top-10 sm:p-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eee7f5] font-serif text-lg font-bold text-[#68409a]">
                25+
              </span>
              <div>
                <p className="font-semibold text-[#302832]">
                  {language === "en" ? "Years" : "वर्ष"}
                </p>
                <p className="text-sm text-[#756b76]">
                  {language === "en" ? "Experience" : "अनुभव"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video popup */}
      {showVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
          onClick={() => setShowVideo(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Our story video"
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowVideo(false)}
              className="mb-3 ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-white text-black"
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </button>

            {videoUrl ? (
              <video
                key={videoUrl}
                controls
                autoPlay
                playsInline
                className="max-h-[80vh] w-full rounded-2xl bg-black"
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support video playback.
              </video>
            ) : (
              <div className="rounded-2xl bg-white p-8 text-center">
                <Play className="mx-auto mb-3 h-10 w-10 text-[#68409a]" />
                <h2 className="text-xl font-semibold text-[#302832]">
                  {language === "en" ? "Our Story" : "हमारी कहानी"}
                </h2>
                <p className="mt-2 text-[#756b76]">
                  {language === "en"
                    ? "Add your clinic introduction video URL to the site.hero_video_url CMS setting to enable playback."
                    : "वीडियो चलाने के लिए site.hero_video_url सेटिंग में अपने केंद्र के परिचय वीडियो का URL जोड़ें।"}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
