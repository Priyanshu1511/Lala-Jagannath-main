"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    name: { en: "Rajesh Kumar Verma", hi: "राजेश कुमार वर्मा" },
    location: { en: "Panipat, Haryana", hi: "पानीपत, हरियाणा" },
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    text: {
      en: "After years of chronic back pain, the naturopathy treatment here gave me a new life. The doctors are incredibly knowledgeable and caring. I recommend this center to everyone.",
      hi: "कई सालों की पीठ दर्द के बाद, यहां की प्राकृतिक चिकित्सा ने मुझे नया जीवन दिया। डॉक्टर बहुत जानकार और देखभाल करने वाले हैं। मैं इस केंद्र की सभी को सिफारिश करता हूं।",
    },
    rating: 5,
  },
  {
    name: { en: "Sunita Devi Sharma", hi: "सुनीता देवी शर्मा" },
    location: { en: "Delhi NCR", hi: "दिल्ली एनसीआर" },
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&q=80",
    text: {
      en: "The yoga therapy program transformed my health completely. I feel more energetic and peaceful than ever before. Dr. Minakshi Sharma is truly exceptional!",
      hi: "योग चिकित्सा कार्यक्रम ने मेरे स्वास्थ्य को पूरी तरह बदल दिया। मैं पहले से कहीं अधिक ऊर्जावान और शांत महसूस करती हूं। डॉ. मिनाक्षी शर्मा वास्तव में असाधारण हैं!",
    },
    rating: 5,
  },
  {
    name: { en: "Amit Singh Chauhan", hi: "अमित सिंह चौहान" },
    location: { en: "Karnal, Haryana", hi: "करनाल, हरियाणा" },
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    text: {
      en: "The Panchkarma treatment was life-changing. The detox program helped me lose 15 kg and improve my digestion significantly. Worth every penny!",
      hi: "पंचकर्म उपचार जीवन बदलने वाला था। डिटॉक्स कार्यक्रम ने मुझे 15 किलो वजन कम करने और पाचन में काफी सुधार करने में मदद की। हर पैसे के लायक!",
    },
    rating: 5,
  },
  {
    name: { en: "Priya Gupta", hi: "प्रिया गुप्ता" },
    location: { en: "Sonipat, Haryana", hi: "सोनीपत, हरियाणा" },
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    text: {
      en: "As a working professional, the stress management program was exactly what I needed. The meditation sessions are truly transformative. Thank you to the entire team!",
      hi: "एक कामकाजी पेशेवर के रूप में, तनाव प्रबंधन कार्यक्रम ठीक वही था जो मुझे चाहिए था। ध्यान सत्र वास्तव में परिवर्तनकारी हैं। पूरी टीम का धन्यवाद!",
    },
    rating: 5,
  },
  {
    name: { en: "Ramesh Chand Agarwal", hi: "रमेश चंद अग्रवाल" },
    location: { en: "Kurukshetra, Haryana", hi: "कुरुक्षेत्र, हरियाणा" },
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    text: {
      en: "I came here for paralysis recovery after a stroke. The physiotherapy and acupuncture treatments helped me regain mobility. Dr. Jitendra is a miracle worker!",
      hi: "मैं स्ट्रोक के बाद लकवा रिकवरी के लिए यहां आया था। फिजियोथेरेपी और एक्यूपंक्चर उपचार ने मुझे गतिशीलता वापस पाने में मदद की। डॉ. जितेंद्र चमत्कारी हैं!",
    },
    rating: 5,
  },
]

export function TestimonialsSection() {
  const { language } = useI18n()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section className="py-20 lg:py-32 bg-primary text-primary-foreground overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-accent blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-background blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-6">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className="text-sm font-medium">
              {language === "en" ? "Patient Stories" : "रोगियों की कहानियां"}
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {language === "en" ? "What Our Patients Say" : "हमारे रोगी क्या कहते हैं"}
          </h2>
          <p className="opacity-80 text-lg">
            {language === "en"
              ? "Thousands of lives transformed through natural healing"
              : "प्राकृतिक उपचार से हजारों जीवन बदले"}
          </p>
        </div>

        {/* Testimonial Slider */}
        <div className="relative max-w-4xl mx-auto">
          {/* Quote Icon */}
          <div className="absolute -top-4 left-0 lg:-left-8 opacity-20">
            <Quote className="w-16 h-16" />
          </div>

          {/* Cards Container */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full shrink-0 px-4">
                  <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12">
                    {/* Rating */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-accent text-accent"
                        />
                      ))}
                    </div>

                    {/* Text */}
                    <p className="text-xl lg:text-2xl leading-relaxed mb-8 font-light">
                      &ldquo;{testimonial.text[language]}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent/50">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name[language]}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">
                          {testimonial.name[language]}
                        </p>
                        <p className="opacity-70">{testimonial.location[language]}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={goToPrevious}
              className="w-12 h-12 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false)
                    setCurrentIndex(index)
                  }}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    index === currentIndex
                      ? "w-8 bg-accent"
                      : "bg-primary-foreground/30 hover:bg-primary-foreground/50"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="w-12 h-12 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Note about placeholder content */}
        <p className="text-center mt-8 text-sm opacity-50">
          {language === "en" 
            ? "* Testimonial images are placeholders and will be replaced with actual patient photos with consent."
            : "* प्रशंसापत्र छवियां प्लेसहोल्डर हैं और सहमति के साथ वास्तविक रोगी फ़ोटो से बदली जाएंगी।"}
        </p>
      </div>
    </section>
  )
}
