"use client"

import { useI18n } from "@/lib/i18n"
import { 
  Bone, 
  Brain, 
  Heart, 
  Salad, 
  Droplets,
  Scale,
  Info,
  CheckCircle2
} from "lucide-react"

const conditions = [
  {
    icon: Bone,
    name: { en: "Joint Pain & Arthritis", hi: "जोड़ों का दर्द और गठिया" },
    description: { 
      en: "Relief from chronic joint pain, arthritis, and mobility issues through natural therapies", 
      hi: "प्राकृतिक चिकित्सा से जोड़ों के दर्द, गठिया और गतिशीलता की समस्याओं से राहत" 
    },
  },
  {
    icon: Brain,
    name: { en: "Paralysis Recovery", hi: "लकवा रिकवरी" },
    description: { 
      en: "Comprehensive rehabilitation programs for paralysis and stroke recovery", 
      hi: "लकवा और स्ट्रोक रिकवरी के लिए व्यापक पुनर्वास कार्यक्रम" 
    },
  },
  {
    icon: Heart,
    name: { en: "Stress, Anxiety & Anger", hi: "तनाव, चिंता और क्रोध" },
    description: { 
      en: "Mental wellness programs for stress management and emotional balance", 
      hi: "तनाव प्रबंधन और भावनात्मक संतुलन के लिए मानसिक स्वास्थ्य कार्यक्रम" 
    },
  },
  {
    icon: Salad,
    name: { en: "Digestive Problems", hi: "पाचन समस्याएं" },
    description: { 
      en: "Natural solutions for digestive disorders, acidity, and gut health", 
      hi: "पाचन विकार, अम्लता और आंत स्वास्थ्य के लिए प्राकृतिक समाधान" 
    },
  },
  {
    icon: Droplets,
    name: { en: "Skin Disorders", hi: "त्वचा रोग" },
    description: { 
      en: "Treatment for eczema, psoriasis, and other skin conditions", 
      hi: "एक्जिमा, सोरायसिस और अन्य त्वचा रोगों का उपचार" 
    },
  },
  {
    icon: Scale,
    name: { en: "Obesity & Lifestyle Diseases", hi: "मोटापा और जीवनशैली रोग" },
    description: { 
      en: "Weight management and lifestyle modification programs", 
      hi: "वजन प्रबंधन और जीवनशैली संशोधन कार्यक्रम" 
    },
  },
]

export function ConditionsSection() {
  const { language } = useI18n()

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 mb-6">
            <CheckCircle2 className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">
              {language === "en" ? "Natural Healing" : "प्राकृतिक उपचार"}
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {language === "en" ? "Conditions We Treat" : "हम किन रोगों का उपचार करते हैं"}
          </h2>
          <p className="text-lg text-muted-foreground">
            {language === "en"
              ? "Comprehensive natural therapy programs for various health conditions"
              : "विभिन्न स्वास्थ्य समस्याओं के लिए व्यापक प्राकृतिक चिकित्सा कार्यक्रम"}
          </p>
        </div>

        {/* Conditions Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {conditions.map((condition, index) => {
            const Icon = condition.icon
            return (
              <div
                key={index}
                className="group relative bg-card rounded-2xl border border-border p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Background Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Content */}
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                    {condition.name[language]}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {condition.description[language]}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Disclaimer */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-secondary/50 backdrop-blur-sm rounded-2xl p-6 border border-border flex gap-4 items-start">
            <div className="shrink-0 w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Info className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-foreground font-medium mb-1">
                {language === "en" ? "Important Note" : "महत्वपूर्ण सूचना"}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {language === "en"
                  ? "Natural therapies help manage and improve these conditions, but results may vary depending on individual health. Consult our doctors for a personalized treatment plan."
                  : "प्राकृतिक उपचार इन समस्याओं में सुधार करने में सहायक होते हैं, लेकिन परिणाम व्यक्ति की स्थिति पर निर्भर करते हैं। व्यक्तिगत उपचार योजना के लिए हमारे डॉक्टरों से परामर्श करें।"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
