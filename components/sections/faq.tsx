"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { useCms } from "@/lib/cms/context"
import { cn } from "@/lib/utils"

const faqs = [
  { q: "q1", a: "a1" },
  { q: "q2", a: "a2" },
  { q: "q3", a: "a3" },
]

export function FAQSection() {
  const { t, language } = useI18n()
  const cms = useCms()
  const section = cms?.sections.find(s => s.section_key === "faq")
  const visibleFaqs = cms?.faqs.length ? cms.faqs.map((x:any)=>({q:language === "en" ? x.question_en : (x.question_hi || x.question_en), a:language === "en" ? x.answer_en : (x.answer_hi || x.answer_en), dynamic:true})) : faqs.map(f=>({...f,dynamic:false}))
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20 lg:py-32 bg-secondary">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
            {(language === "en" ? section?.title_en : section?.title_hi) || t("faq.title")}
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {visibleFaqs.map((faq:any, index:number) => (
            <div
              key={index}
              className="bg-card rounded-2xl border border-border overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left"
                aria-expanded={openIndex === index}
              >
                <span className="font-medium text-foreground pr-4">
                  {faq.dynamic ? faq.q : t(`faq.${faq.q}` as const)}
                </span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid transition-all duration-300",
                  openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-muted-foreground leading-relaxed">
                    {faq.dynamic ? faq.a : t(`faq.${faq.a}` as const)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: t(`faq.${faq.q}` as const),
              acceptedAnswer: {
                "@type": "Answer",
                text: t(`faq.${faq.a}` as const),
              },
            })),
          }),
        }}
      />
    </section>
  )
}
