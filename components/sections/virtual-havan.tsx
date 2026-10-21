"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Volume2, VolumeX, ArrowRight, CheckCircle, Wind, Brain, Sparkles, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const AUDIO_URL = "https://drive.google.com/uc?export=download&id=1tXdBULB1a1F-MV2tDWGOMrc8HS_sOYxZ"

export function VirtualHavanSection() {
  const { t } = useI18n()

  return (
    <section id="virtual-havan" className="py-20 lg:py-32 bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t("havan.title")}
          </h2>
          <p className="text-lg opacity-80 mb-4">{t("havan.subtitle")}</p>
          <p className="opacity-60">{t("havan.description")}</p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <BenefitCard
            icon={<Wind className="w-6 h-6" />}
            title={t("havan.benefits.air")}
            description={t("havan.benefits.airDesc")}
          />
          <BenefitCard
            icon={<Brain className="w-6 h-6" />}
            title={t("havan.benefits.mental")}
            description={t("havan.benefits.mentalDesc")}
          />
          <BenefitCard
            icon={<Sparkles className="w-6 h-6" />}
            title={t("havan.benefits.positive")}
            description={t("havan.benefits.positiveDesc")}
          />
        </div>

        {/* Guided Havan Experience */}
        <GuidedHavan />
      </div>
    </section>
  )
}

function BenefitCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-background/10 backdrop-blur-sm rounded-2xl p-6 border border-background/20 hover:bg-background/15 transition-colors">
      <div className="w-12 h-12 rounded-xl bg-accent/20 text-accent flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-serif text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm opacity-70 leading-relaxed">{description}</p>
    </div>
  )
}

function GuidedHavan() {
  const { t, locale } = useI18n()
  const [isActive, setIsActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isSoundOn, setIsSoundOn] = useState(true)
  const [isAudioLoaded, setIsAudioLoaded] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const steps = [
    t("havan.guided.step1"),
    t("havan.guided.step2"),
    t("havan.guided.step3"),
    t("havan.guided.step4"),
  ]

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio(AUDIO_URL)
    audioRef.current.loop = true
    audioRef.current.preload = "auto"
    
    audioRef.current.addEventListener("canplaythrough", () => {
      setIsAudioLoaded(true)
    })

    audioRef.current.addEventListener("error", (e) => {
      console.log("[v0] Audio load error:", e)
      setIsAudioLoaded(true) // Allow experience even if audio fails
    })
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
        audioRef.current = null
      }
    }
  }, [])

  // Control audio based on isActive and isSoundOn
  useEffect(() => {
    if (!audioRef.current) return

    if (isActive && isSoundOn) {
      audioRef.current.play().catch((err) => {
        console.log("[v0] Audio play error:", err)
      })
    } else {
      audioRef.current.pause()
    }
  }, [isActive, isSoundOn])

  const handleStart = () => {
    setIsActive(true)
    setCurrentStep(0)
  }

  const handleStop = () => {
    setIsActive(false)
    setCurrentStep(0)
  }

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      // Complete - stop everything
      setIsActive(false)
      setCurrentStep(0)
    }
  }

  const toggleSound = () => {
    setIsSoundOn(!isSoundOn)
  }

  const isLastStep = currentStep === steps.length - 1

  return (
    <div className="bg-background/5 backdrop-blur-sm rounded-3xl border border-background/20 overflow-hidden">
      <div className="p-8 lg:p-12">
        <h3 className="font-serif text-2xl font-semibold text-center mb-8">
          {t("havan.guided.title")}
        </h3>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Fire Animation */}
          <div className="relative aspect-square max-w-sm mx-auto">
            {/* Fire Glow */}
            <div
              className={cn(
                "absolute inset-0 rounded-full blur-3xl transition-all duration-1000",
                isActive ? "bg-orange-500/30 scale-100" : "bg-orange-500/10 scale-75"
              )}
            />

            {/* Fire Container */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Base */}
              <div className="absolute bottom-8 w-48 h-8 bg-gradient-to-t from-amber-900 to-amber-700 rounded-full" />

              {/* Fire SVG */}
              <svg
                viewBox="0 0 100 120"
                className={cn(
                  "w-48 h-64 transition-all duration-500",
                  isActive ? "opacity-100 scale-100" : "opacity-50 scale-90"
                )}
              >
                {/* Outer Flame */}
                <path
                  d="M50 10 C30 40, 20 60, 25 80 C28 95, 40 105, 50 105 C60 105, 72 95, 75 80 C80 60, 70 40, 50 10"
                  fill="url(#outerFlame)"
                  className={isActive ? "animate-pulse" : ""}
                >
                  <animate
                    attributeName="d"
                    dur="0.5s"
                    repeatCount="indefinite"
                    values="
                      M50 10 C30 40, 20 60, 25 80 C28 95, 40 105, 50 105 C60 105, 72 95, 75 80 C80 60, 70 40, 50 10;
                      M50 8 C28 38, 18 58, 23 78 C26 93, 38 103, 50 103 C62 103, 74 93, 77 78 C82 58, 72 38, 50 8;
                      M50 10 C30 40, 20 60, 25 80 C28 95, 40 105, 50 105 C60 105, 72 95, 75 80 C80 60, 70 40, 50 10
                    "
                  />
                </path>

                {/* Inner Flame */}
                <path
                  d="M50 30 C38 50, 32 65, 35 80 C37 90, 43 98, 50 98 C57 98, 63 90, 65 80 C68 65, 62 50, 50 30"
                  fill="url(#innerFlame)"
                >
                  <animate
                    attributeName="d"
                    dur="0.4s"
                    repeatCount="indefinite"
                    values="
                      M50 30 C38 50, 32 65, 35 80 C37 90, 43 98, 50 98 C57 98, 63 90, 65 80 C68 65, 62 50, 50 30;
                      M50 28 C36 48, 30 63, 33 78 C35 88, 41 96, 50 96 C59 96, 65 88, 67 78 C70 63, 64 48, 50 28;
                      M50 30 C38 50, 32 65, 35 80 C37 90, 43 98, 50 98 C57 98, 63 90, 65 80 C68 65, 62 50, 50 30
                    "
                  />
                </path>

                {/* Core */}
                <ellipse
                  cx="50"
                  cy="85"
                  rx="8"
                  ry="12"
                  fill="url(#coreFlame)"
                >
                  <animate
                    attributeName="ry"
                    dur="0.3s"
                    repeatCount="indefinite"
                    values="12;14;12"
                  />
                </ellipse>

                {/* Gradients */}
                <defs>
                  <linearGradient id="outerFlame" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="50%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#fbbf24" />
                  </linearGradient>
                  <linearGradient id="innerFlame" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="50%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#fde047" />
                  </linearGradient>
                  <linearGradient id="coreFlame" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#fde047" />
                    <stop offset="100%" stopColor="#fff" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Sparks */}
              {isActive && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-orange-400 rounded-full animate-ping"
                      style={{
                        top: `${30 + Math.random() * 20}%`,
                        left: `${40 + Math.random() * 20}%`,
                        animationDelay: `${i * 0.3}s`,
                        animationDuration: "1.5s",
                      }}
                    />
                  ))}
                </>
              )}
            </div>

            {/* Om Symbol */}
            <div
              className={cn(
                "absolute top-4 left-1/2 -translate-x-1/2 font-serif text-4xl transition-all duration-500",
                isActive ? "text-accent opacity-100" : "text-accent/50 opacity-50"
              )}
            >
              ॐ
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-6">
            {/* Rhythm Message - Only shown when active */}
            {isActive && (
              <div className="p-4 bg-accent/20 border border-accent/30 rounded-xl text-center animate-pulse">
                <p className="text-sm font-medium">
                  {locale === "hi" 
                    ? "मंत्र के साथ ध्यान करें... शांति... एकाग्रता..."
                    : "Meditate with the mantra... Peace... Focus..."
                  }
                </p>
              </div>
            )}

            {/* Step Indicators */}
            <div className="space-y-3">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl transition-all duration-300",
                    index < currentStep && isActive && "bg-green-500/20 border border-green-500/30",
                    index === currentStep && isActive && "bg-accent/20 border border-accent/30 scale-105",
                    (index > currentStep || !isActive) && "bg-background/5 border border-background/10"
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold",
                      index < currentStep && isActive && "bg-green-500 text-white",
                      index === currentStep && isActive && "bg-accent text-foreground",
                      (index > currentStep || !isActive) && "bg-background/20 text-background/60"
                    )}
                  >
                    {index < currentStep && isActive ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <p
                    className={cn(
                      "flex-1 text-sm",
                      (index <= currentStep && isActive) ? "opacity-100" : "opacity-50"
                    )}
                  >
                    {step}
                  </p>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-4">
              {!isActive ? (
                <Button
                  onClick={handleStart}
                  size="lg"
                  className="bg-accent text-foreground hover:bg-accent/90"
                >
                  <Play className="w-5 h-5 mr-2" />
                  {t("havan.guided.start")}
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleNextStep}
                    size="lg"
                    className="bg-accent text-foreground hover:bg-accent/90"
                  >
                    {isLastStep ? t("havan.guided.complete") : t("havan.guided.next")}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button
                    onClick={handleStop}
                    variant="outline"
                    size="lg"
                    className="border-background/30 text-background hover:bg-background/10"
                  >
                    <Pause className="w-5 h-5 mr-2" />
                    {locale === "hi" ? "रोकें" : "Stop"}
                  </Button>
                </>
              )}

              <Button
                variant="outline"
                size="lg"
                onClick={toggleSound}
                className="border-background/30 text-background hover:bg-background/10"
              >
                {isSoundOn ? (
                  <>
                    <Volume2 className="w-5 h-5 mr-2" />
                    {t("havan.soundOn")}
                  </>
                ) : (
                  <>
                    <VolumeX className="w-5 h-5 mr-2" />
                    {t("havan.soundOff")}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-accent/20 border-t border-accent/30 p-6 text-center">
        <Button
          asChild
          size="lg"
          className="bg-accent text-foreground hover:bg-accent/90"
        >
          <a href="#contact">
            {t("havan.cta")}
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </Button>
      </div>
    </div>
  )
}
