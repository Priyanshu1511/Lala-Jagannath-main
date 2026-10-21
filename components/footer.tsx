"use client"

import Link from "next/link"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { useI18n } from "@/lib/i18n"

export function Footer() {
  const { t, language } = useI18n()

  const quickLinks = [
    { label: t("nav.home"), href: "#home" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.mindHealing"), href: "#mind-healing" },
    { label: t("nav.virtualHavan"), href: "#virtual-havan" },
  ]

  const services = [
    { label: t("services.yoga.title"), href: "#services" },
    { label: t("services.diet.title"), href: "#services" },
    { label: t("services.physio.title"), href: "#services" },
    { label: t("services.panchkarma.title"), href: "#services" },
  ]

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-serif text-2xl">ॐ</span>
              </div>
              <div>
                <p className="font-serif text-lg font-semibold leading-tight">
                  {language === "en" ? "Lala Jagannath" : "लाला जगन्नाथ"}
                </p>
                <p className="text-sm opacity-80">
                  {language === "en" ? "Prakritik Chikitsalay" : "प्राकृतिक चिकित्सालय"}
                </p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">{t("footer.tagline")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-80 hover:opacity-100 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">{t("footer.services")}</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.href}
                    className="text-sm opacity-80 hover:opacity-100 hover:text-accent transition-colors"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">{t("footer.contact")}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 opacity-80 shrink-0" />
                <span className="text-sm opacity-80">{t("contact.addressText")}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 opacity-80 shrink-0" />
                <a
                  href="tel:+919999999999"
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  +91 99999 99999
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 opacity-80 shrink-0" />
                <a
                  href="mailto:info@lalajagannath.com"
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  info@lalajagannath.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 mt-0.5 opacity-80 shrink-0" />
                <span className="text-sm opacity-80">{t("contact.hoursText")}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/20">
          <p className="text-sm opacity-60 text-center">{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  )
}
