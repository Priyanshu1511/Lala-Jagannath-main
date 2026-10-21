"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Phone, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const navLinks = [
  { key: "nav.home", href: "#home" },
  { key: "nav.about", href: "#about" },
  { key: "nav.services", href: "#services" },
  { key: "nav.mindHealing", href: "#mind-healing" },
  { key: "nav.virtualHavan", href: "#virtual-havan" },
  { key: "nav.philosophy", href: "#philosophy" },
  { key: "nav.ladiesWellness", href: "#ladies-wellness" },
  { key: "nav.contact", href: "#contact" },
] as const

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage, t } = useI18n()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en")
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-serif text-xl">ॐ</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-serif text-lg font-semibold text-foreground leading-tight">
                {language === "en" ? "Lala Jagannath" : "लाला जगन्नाथ"}
              </p>
              <p className="text-xs text-muted-foreground">
                {language === "en" ? "Prakritik Chikitsalay" : "प्राकृतिक चिकित्सालय"}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t(link.key)}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border hover:bg-secondary transition-colors text-sm"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">{language === "en" ? "हिन्दी" : "EN"}</span>
            </button>

            {/* Call Button */}
            <a
              href="tel:+919999999999"
              className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="sr-only md:not-sr-only">{t("hero.callNow")}</span>
            </a>

            {/* Book Appointment Button */}
            <Button asChild className="hidden sm:inline-flex">
              <Link href="#contact">{t("nav.bookAppointment")}</Link>
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-secondary transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300",
            isOpen ? "max-h-[500px] pb-4" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-2 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-muted-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors"
              >
                {t(link.key)}
              </Link>
            ))}
            <Button asChild className="mt-2 mx-4">
              <Link href="#contact" onClick={() => setIsOpen(false)}>
                {t("nav.bookAppointment")}
              </Link>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  )
}
