"use client";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";
export type CmsSection = { id:string; section_key:string; title_en:string; title_hi:string; subtitle_en:string|null; subtitle_hi?:string|null; body_en:string|null; body_hi?:string|null; image_url:string|null; video_url?:string|null; button_label_en?:string|null; button_label_hi?:string|null; button_url?:string|null; display_order:number; is_published:boolean; content?:Record<string, unknown> };
type CmsContextValue = { configured: boolean; settings: any[]; sections: CmsSection[]; doctors: any[]; services: any[]; testimonials: any[]; faqs: any[]; loading: boolean; refresh: () => Promise<void> };
const CmsContext = createContext<CmsContextValue | null>(null);
export function CmsProvider({children}:{children:ReactNode}) {
 const [settings,setSettings]=useState<any[]>([]); const [sections,setSections]=useState<CmsSection[]>([]); const [doctors,setDoctors]=useState<any[]>([]); const [services,setServices]=useState<any[]>([]); const [testimonials,setTestimonials]=useState<any[]>([]); const [faqs,setFaqs]=useState<any[]>([]); const [loading,setLoading]=useState(true); const [configured,setConfigured]=useState(false);
 const refresh=async()=>{ const supabase=createClient(); const [a,b,c,d,e,f]=await Promise.all([supabase.from('site_sections').select('*').eq('is_published',true).order('display_order'),supabase.from('doctors').select('*').eq('is_published',true).order('display_order'),supabase.from('services').select('*').eq('is_published',true).order('display_order'),supabase.from('testimonials').select('*').eq('is_published',true).order('display_order'),supabase.from('faqs').select('*').eq('is_published',true).order('display_order'),supabase.from('site_settings').select('setting_key,value')]); setConfigured(!a.error); setSections(a.data||[]);setSettings(f.data||[]);setDoctors(b.data||[]);setServices(c.data||[]);setTestimonials(d.data||[]);setFaqs(e.data||[]);setLoading(false); };
 useEffect(()=>{ refresh().catch(()=>setLoading(false)); },[]);
 const value=useMemo(()=>({configured,settings,sections,doctors,services,testimonials,faqs,loading,refresh}),[configured,settings,sections,doctors,services,testimonials,faqs,loading]); return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}
export function useCms(){ return useContext(CmsContext); }
export function useCmsSection(key:string){ const cms=useCms(); return cms?.sections.find(s=>s.section_key===key); }

export function useCmsSetting(key:string, fallback:string){const cms=useCms();const item=cms?.settings.find((x:any)=>x.setting_key===key);const v=item?.value; if(typeof v==='string')return v; if(v&&typeof v==='object'&&typeof v.value==='string')return v.value; return fallback;}
