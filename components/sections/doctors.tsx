"use client"

import Image from "next/image"
import { useI18n } from "@/lib/i18n"
import { Award, Stethoscope, Heart, Users } from "lucide-react"

const doctors = [
  {
    id: "female",
    name: { en: "Dr. Minakshi Sharma", hi: "डॉ. मिनाक्षी शर्मा" },
    image: "",
    description: {
      en: "Specialist in women's wellness, naturopathy, and holistic healing",
      hi: "महिला स्वास्थ्य, प्राकृतिक चिकित्सा और समग्र उपचार विशेषज्ञ",
    },
    specialties: {
      en: ["Women's Health", "Naturopathy", "Holistic Healing"],
      hi: ["महिला स्वास्थ्य", "प्राकृतिक चिकित्सा", "समग्र उपचार"],
    },
  },
  {
    id: "male",
    name: { en: "Dr. Jitendra Kumar Sharma", hi: "डॉ. जितेंद्र कुमार शर्मा" },
    image: "",
    description: {
      en: "Expert in naturopathy, yoga therapy, and chronic disease treatment",
      hi: "प्राकृतिक चिकित्सा, योग चिकित्सा और दीर्घकालिक रोगों के विशेषज्ञ",
    },
    specialties: {
      en: ["Naturopathy", "Yoga Therapy", "Chronic Disease"],
      hi: ["प्राकृतिक चिकित्सा", "योग चिकित्सा", "दीर्घकालिक रोग"],
    },
  },
]

export function DoctorsSection() {
  const { language } = useI18n()

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-secondary/50 to-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-accent blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Stethoscope className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {language === "en" ? "Expert Care" : "विशेषज्ञ देखभाल"}
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {language === "en" ? "Meet Our Doctors" : "हमारे चिकित्सक"}
          </h2>
          <p className="text-lg text-muted-foreground">
            {language === "en"
              ? "Experienced practitioners dedicated to your holistic well-being"
              : "आपके समग्र स्वास्थ्य के लिए समर्पित अनुभवी चिकित्सक"}
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="group relative bg-card rounded-3xl overflow-hidden border border-border shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Image Section */}
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={doctor.image}
                  alt={doctor.name[language]}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  {language === "en" ? "Expert" : "विशेषज्ञ"}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8 space-y-4">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                    {doctor.name[language]}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {doctor.description[language]}
                  </p>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2">
                  {doctor.specialties[language].map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      {language === "en" ? "50,000+ Patients" : "50,000+ रोगी"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-accent" />
                    <span className="text-sm text-muted-foreground">
                      {language === "en" ? "25+ Years" : "25+ वर्ष"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
