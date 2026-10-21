"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, RotateCcw, CheckCircle, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"
import { cn } from "@/lib/utils"

type BreathingPhase = "inhale" | "hold" | "exhale" | "idle"

const AUDIO_URL = "https://drive.google.com/uc?export=download&id=1tXdBULB1a1F-MV2tDWGOMrc8HS_sOYxZ"

export function MindHealingSection() {
  const { t } = useI18n()

  return (
    <section id="mind-healing" className="py-20 lg:py-32 bg-gradient-to-br from-secondary via-background to-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("mindHealing.title")}
          </h2>
          <p className="text-lg text-muted-foreground">{t("mindHealing.subtitle")}</p>
        </div>

        {/* Tools Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          <ChakraActivation />
          <AngerManagement />
        </div>
      </div>
    </section>
  )
}

function ChakraActivation() {
  const { t, locale } = useI18n()
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<BreathingPhase>("idle")
  const [cycleCount, setCycleCount] = useState(0)
  const [isSoundOn, setIsSoundOn] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const timeoutRefs = useRef<NodeJS.Timeout[]>([])

  const phaseDurations = {
    inhale: 4000,
    hold: 4000,
    exhale: 6000,
  }

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio(AUDIO_URL)
    audioRef.current.loop = true
    audioRef.current.preload = "auto"

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
        audioRef.current = null
      }
      // Clear all timeouts
      timeoutRefs.current.forEach(clearTimeout)
    }
  }, [])

  // Control audio
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

  // Breathing cycle
  useEffect(() => {
    if (!isActive) {
      setPhase("idle")
      // Clear existing timeouts
      timeoutRefs.current.forEach(clearTimeout)
      timeoutRefs.current = []
      return
    }

    const runCycle = () => {
      setPhase("inhale")
      
      const inhaleTimeout = setTimeout(() => {
        setPhase("hold")
        
        const holdTimeout = setTimeout(() => {
          setPhase("exhale")
          
          const exhaleTimeout = setTimeout(() => {
            setCycleCount(prev => prev + 1)
            runCycle()
          }, phaseDurations.exhale)
          
          timeoutRefs.current.push(exhaleTimeout)
        }, phaseDurations.hold)
        
        timeoutRefs.current.push(holdTimeout)
      }, phaseDurations.inhale)
      
      timeoutRefs.current.push(inhaleTimeout)
    }

    runCycle()

    return () => {
      timeoutRefs.current.forEach(clearTimeout)
      timeoutRefs.current = []
    }
  }, [isActive])

  const handleStart = () => {
    setIsActive(true)
    setCycleCount(0)
  }

  const handleStop = () => {
    setIsActive(false)
    setPhase("idle")
  }

  const toggleSound = () => {
    setIsSoundOn(!isSoundOn)
  }

  const getCircleScale = () => {
    switch (phase) {
      case "inhale":
        return "scale-100"
      case "hold":
        return "scale-100"
      case "exhale":
        return "scale-75"
      default:
        return "scale-75"
    }
  }

  const getPhaseText = () => {
    switch (phase) {
      case "inhale":
        return t("mindHealing.chakra.inhale")
      case "hold":
        return t("mindHealing.chakra.hold")
      case "exhale":
        return t("mindHealing.chakra.exhale")
      default:
        return t("mindHealing.chakra.instruction")
    }
  }

  return (
    <div className="bg-card rounded-3xl border border-border p-8 shadow-lg">
      <div className="text-center mb-8">
        <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
          {t("mindHealing.chakra.title")}
        </h3>
        <p className="text-muted-foreground">{t("mindHealing.chakra.description")}</p>
      </div>

      {/* Rhythm Message - Only shown when active */}
      {isActive && (
        <div className="p-4 mb-6 bg-primary/10 border border-primary/30 rounded-xl text-center">
          <p className="text-sm font-medium text-primary">
            {locale === "hi" 
              ? "ताल के साथ चलें। श्वास लें... रोकें... छोड़ें।"
              : "Follow the rhythm. Breathe in... hold... release."
            }
          </p>
        </div>
      )}

      {/* Breathing Circle */}
      <div className="relative w-64 h-64 mx-auto mb-8">
        {/* Outer Glow */}
        <div
          className={cn(
            "absolute inset-0 rounded-full bg-primary/20 transition-all duration-1000",
            isActive && "animate-pulse"
          )}
        />
        
        {/* Main Circle */}
        <div
          className={cn(
            "absolute inset-4 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center transition-all",
            getCircleScale(),
            phase === "inhale" && "duration-[4000ms]",
            phase === "hold" && "duration-[4000ms]",
            phase === "exhale" && "duration-[6000ms]",
            phase === "idle" && "duration-500"
          )}
        >
          <div className="text-center text-primary-foreground">
            <p className="font-serif text-xl font-semibold">{getPhaseText()}</p>
            {isActive && (
              <p className="text-sm opacity-80 mt-1">
                {locale === "hi" ? `चक्र ${cycleCount + 1}` : `Cycle ${cycleCount + 1}`}
              </p>
            )}
          </div>
        </div>

        {/* Chakra Points */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <div
            key={angle}
            className={cn(
              "absolute w-3 h-3 rounded-full transition-all duration-500",
              isActive ? "bg-accent" : "bg-muted",
              isActive && "animate-pulse"
            )}
            style={{
              top: `${50 + 45 * Math.sin((angle * Math.PI) / 180)}%`,
              left: `${50 + 45 * Math.cos((angle * Math.PI) / 180)}%`,
              transform: "translate(-50%, -50%)",
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Instruction */}
      <p className="text-center text-sm text-muted-foreground mb-6">
        {t("mindHealing.chakra.instruction")}
      </p>

      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-4">
        {!isActive ? (
          <Button onClick={handleStart} size="lg">
            <Play className="w-5 h-5 mr-2" />
            {t("mindHealing.chakra.start")}
          </Button>
        ) : (
          <Button onClick={handleStop} variant="outline" size="lg">
            <Pause className="w-5 h-5 mr-2" />
            {t("mindHealing.chakra.stop")}
          </Button>
        )}

        <Button
          variant="outline"
          size="lg"
          onClick={toggleSound}
        >
          {isSoundOn ? (
            <>
              <Volume2 className="w-5 h-5 mr-2" />
              {locale === "hi" ? "ध्वनि चालू" : "Sound ON"}
            </>
          ) : (
            <>
              <VolumeX className="w-5 h-5 mr-2" />
              {locale === "hi" ? "ध्वनि बंद" : "Sound OFF"}
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

function AngerManagement() {
  const { t, locale } = useI18n()
  const [isActive, setIsActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isSoundOn, setIsSoundOn] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const steps = [
    t("mindHealing.anger.step1"),
    t("mindHealing.anger.step2"),
    t("mindHealing.anger.step3"),
    t("mindHealing.anger.step4"),
  ]

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio(AUDIO_URL)
    audioRef.current.loop = true
    audioRef.current.preload = "auto"

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
        audioRef.current = null
      }
    }
  }, [])

  // Control audio
  useEffect(() => {
    if (!audioRef.current) return

    if (isActive && isSoundOn && !isComplete) {
      audioRef.current.play().catch((err) => {
        console.log("[v0] Audio play error:", err)
      })
    } else {
      audioRef.current.pause()
    }
  }, [isActive, isSoundOn, isComplete])

  useEffect(() => {
    if (!isActive || isComplete) return

    if (currentStep >= steps.length) {
      setIsComplete(true)
      return
    }

    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1)
    }, 5000)

    return () => clearTimeout(timer)
  }, [isActive, currentStep, steps.length, isComplete])

  const handleStart = () => {
    setIsActive(true)
    setCurrentStep(0)
    setIsComplete(false)
  }

  const handleReset = () => {
    setIsActive(false)
    setCurrentStep(0)
    setIsComplete(false)
  }

  const toggleSound = () => {
    setIsSoundOn(!isSoundOn)
  }

  return (
    <div className="bg-card rounded-3xl border border-border p-8 shadow-lg">
      <div className="text-center mb-8">
        <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
          {t("mindHealing.anger.title")}
        </h3>
        <p className="text-muted-foreground">{t("mindHealing.anger.description")}</p>
      </div>

      {/* Rhythm Message - Only shown when active */}
      {isActive && !isComplete && (
        <div className="p-4 mb-6 bg-primary/10 border border-primary/30 rounded-xl text-center animate-pulse">
          <p className="text-sm font-medium text-primary">
            {locale === "hi" 
              ? "ताल के साथ चलें। श्वास लें... रोकें... छोड़ें।"
              : "Follow the rhythm. Breathe in... hold... release."
            }
          </p>
        </div>
      )}

      {/* Progress Steps */}
      <div className="space-y-4 mb-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center gap-4 p-4 rounded-xl transition-all duration-500",
              index < currentStep && "bg-green-50 border border-green-200",
              index === currentStep && isActive && !isComplete && "bg-primary/10 border border-primary/30 scale-105",
              index > currentStep && "bg-muted/50"
            )}
          >
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all",
                index < currentStep && "bg-green-500 text-white",
                index === currentStep && isActive && !isComplete && "bg-primary text-primary-foreground",
                index > currentStep && "bg-muted text-muted-foreground"
              )}
            >
              {index < currentStep ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                index + 1
              )}
            </div>
            <p
              className={cn(
                "flex-1 transition-colors",
                index <= currentStep ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {step}
            </p>
          </div>
        ))}
      </div>

      {/* Completion Message */}
      {isComplete && (
        <div className="text-center p-4 mb-6 bg-green-50 border border-green-200 rounded-xl">
          <CheckCircle className="w-8 h-8 mx-auto text-green-500 mb-2" />
          <p className="font-medium text-green-700">{t("mindHealing.anger.complete")}</p>
        </div>
      )}

      {/* Instruction */}
      <p className="text-center text-sm text-muted-foreground mb-6">
        {t("mindHealing.anger.instruction")}
      </p>

      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-4">
        {!isActive ? (
          <Button onClick={handleStart} size="lg">
            <Play className="w-5 h-5 mr-2" />
            {t("mindHealing.anger.start")}
          </Button>
        ) : (
          <Button onClick={handleReset} variant="outline" size="lg">
            <RotateCcw className="w-5 h-5 mr-2" />
            {locale === "hi" ? "पुनः आरंभ करें" : "Reset"}
          </Button>
        )}

        <Button
          variant="outline"
          size="lg"
          onClick={toggleSound}
        >
          {isSoundOn ? (
            <>
              <Volume2 className="w-5 h-5 mr-2" />
              {locale === "hi" ? "ध्वनि चालू" : "Sound ON"}
            </>
          ) : (
            <>
              <VolumeX className="w-5 h-5 mr-2" />
              {locale === "hi" ? "ध्वनि बंद" : "Sound OFF"}
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
