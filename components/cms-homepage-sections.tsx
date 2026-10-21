"use client";
import { useCms } from "@/lib/cms/context";
import type { ComponentType } from "react";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { DoctorsSection } from "@/components/sections/doctors";
import { ServicesSection } from "@/components/sections/services";
import { ConditionsSection } from "@/components/sections/conditions";
import { MindHealingSection } from "@/components/sections/mind-healing";
import { VirtualHavanSection } from "@/components/sections/virtual-havan";
import { PhilosophySection } from "@/components/sections/philosophy";
import { LadiesWellnessSection } from "@/components/sections/ladies-wellness";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { FAQSection } from "@/components/sections/faq";
import { ContactSection } from "@/components/sections/contact";
const sectionMap:Record<string,ComponentType>={hero:HeroSection,about:AboutSection,doctors:DoctorsSection,services:ServicesSection,conditions:ConditionsSection,"mind-healing":MindHealingSection,"virtual-havan":VirtualHavanSection,philosophy:PhilosophySection,"ladies-wellness":LadiesWellnessSection,testimonials:TestimonialsSection,faq:FAQSection,contact:ContactSection};
const fallback=["hero","about","doctors","services","conditions","mind-healing","virtual-havan","philosophy","ladies-wellness","testimonials","faq","contact"];
export function CmsHomepageSections(){const cms=useCms();const keys=cms?.configured?cms.sections.map(s=>s.section_key).filter(k=>!!sectionMap[k]):fallback;return <>{keys.map(key=>{const Section=sectionMap[key];return <Section key={key}/>})}</>}
