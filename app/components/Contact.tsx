"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { soundManager } from "../lib/sound";
import { Perspective, Highlight } from "@/components/ui/perspective-highlight";
import { WovenCanvas } from "@/components/ui/woven-light-hero";
import { Mail, Phone, ExternalLink, Check, ArrowUpRight } from "lucide-react";

interface FormState {
  name: string;
  email: string;
  message: string;
}

const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastWhatsappUrl, setLastWhatsappUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      soundManager.playBeep(330, 0.2);
      setErrorMessage("Please fill out all fields before sending.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);
    soundManager.playBeep(600, 0.1);

    // Build the formatted WhatsApp message
    const formattedText = `👋 Hi Agampreet, I'm reaching out from your portfolio!\n\n👤 Name: ${form.name.trim()}\n📧 Email: ${form.email.trim()}\n\n💬 Message: ${form.message.trim()}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=918360103038&text=${encodeURIComponent(formattedText)}`;
    
    setLastWhatsappUrl(whatsappUrl);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      soundManager.playBeep(880, 0.2);

      // Open WhatsApp chat in a new tab
      if (typeof window !== "undefined") {
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      }
    }, 700);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-16 md:py-24 px-6 sm:px-12 rounded-3xl border border-zinc-900/60 bg-zinc-950/20 flex flex-col justify-center items-center overflow-hidden z-0 shadow-2xl scroll-mt-24 sm:scroll-mt-28"
    >
      {/* 1. Full-screen WebGL Woven Silk 26,000 Particle Torus Knot Backdrop */}
      <WovenCanvas />

      {/* 2. Dark glass overlay */}
      <div className="absolute inset-0 bg-[#09090b]/85 backdrop-blur-[0.5px] z-0 pointer-events-none" />

      {/* 3. Foreground content wrapper */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        {/* Title block */}
        <div className="w-full text-left mb-10 md:mb-16 border-b border-zinc-800/40 pb-5">
          <motion.div
            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-1"
          >
            <span className="w-1 h-6 bg-gradient-to-b from-indigo-400 to-emerald-400 rounded-full shrink-0" />
            <h2 className="font-orbitron text-3xl sm:text-4xl font-extrabold tracking-widest uppercase">
              <span className="text-white">CON</span><span className="text-indigo-400">TACT</span>
            </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-space text-xs text-zinc-500 mt-2 uppercase tracking-wider pl-4"
          >
            Get in touch directly via WhatsApp or social channels
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 w-full items-stretch">
        
        {/* Left Side: Direct WhatsApp Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-7 w-full h-full relative"
        >
          {/* Subtle feathered dark gradient behind form column for perfect text contrast (no visible box edges) */}
          <div className="absolute -inset-6 sm:-inset-10 bg-gradient-to-r from-[#09090b]/95 via-[#09090b]/80 to-transparent rounded-3xl pointer-events-none z-0 blur-md" />

          <Perspective className="w-full h-full relative z-10" disabled>
            <div className="p-0 md:p-2 flex flex-col justify-center bg-transparent relative w-full h-full min-h-[360px]">
              
              {isSuccess ? (
                <div className="flex-grow flex flex-col justify-center items-center text-center space-y-4 min-h-[300px]">
                  <div className="w-14 h-14 rounded-full bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                    <Check className="w-7 h-7" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-space text-sm font-bold text-white block">
                      <Highlight color="green">WhatsApp Chat Ready</Highlight>
                    </h3>
                    <p className="font-sora text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                      WhatsApp has been launched with your formatted message. If the tab didn&apos;t open automatically, click the button below:
                    </p>
                  </div>

                  {lastWhatsappUrl && (
                    <a
                      href={lastWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 h-11 px-6 bg-white hover:bg-zinc-200 active:scale-[0.99] text-zinc-950 font-space text-xs font-bold tracking-wider uppercase rounded-xl transition-all duration-200 cursor-pointer shadow-sm"
                    >
                      <WhatsappIcon className="w-4 h-4 text-[#25D366]" />
                      <span>Open WhatsApp Directly</span>
                    </a>
                  )}
                  
                  <button
                    onClick={() => {
                      setForm({ name: "", email: "", message: "" });
                      setIsSuccess(false);
                      setErrorMessage("");
                      setLastWhatsappUrl("");
                      soundManager.playBeep(600, 0.1);
                    }}
                    className="mt-2 px-4 py-2 border border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 text-zinc-400 hover:text-white rounded-lg font-space text-[10px] font-bold tracking-widest cursor-pointer uppercase select-none transition-all duration-300"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5 flex-grow flex flex-col justify-center">
                  <div className="space-y-1.5">
                    <label className="font-space text-[9px] font-bold uppercase tracking-widest block">
                      <Highlight color="green">Your Name</Highlight>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      placeholder="Agampreet Singh"
                      className="w-full px-3.5 py-2.5 bg-zinc-900/40 focus:bg-zinc-900/90 border border-zinc-800 focus:border-[#00d9ff] focus:ring-1 focus:ring-[#00d9ff]/30 focus:shadow-[0_0_14px_rgba(0,217,255,0.18)] rounded-lg text-zinc-100 text-xs font-sora focus:outline-none placeholder-zinc-400 transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-space text-[9px] font-bold uppercase tracking-widest block">
                      <Highlight color="purple">Your Email</Highlight>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleInputChange}
                      placeholder="agampreetsingh382@gmail.com"
                      className="w-full px-3.5 py-2.5 bg-zinc-900/40 focus:bg-zinc-900/90 border border-zinc-800 focus:border-[#00d9ff] focus:ring-1 focus:ring-[#00d9ff]/30 focus:shadow-[0_0_14px_rgba(0,217,255,0.18)] rounded-lg text-zinc-100 text-xs font-sora focus:outline-none placeholder-zinc-400 transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-space text-[9px] font-bold uppercase tracking-widest block">
                      <Highlight color="red">Your Message</Highlight>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleInputChange}
                      placeholder="Write your message here..."
                      rows={4}
                      className="w-full px-3.5 py-2.5 bg-zinc-900/40 focus:bg-zinc-900/90 border border-zinc-800 focus:border-[#00d9ff] focus:ring-1 focus:ring-[#00d9ff]/30 focus:shadow-[0_0_14px_rgba(0,217,255,0.18)] rounded-lg text-zinc-100 text-xs font-sora focus:outline-none placeholder-zinc-400 transition-all duration-200 resize-none"
                    />
                  </div>

                  {errorMessage && (
                    <div className="font-sora text-[10px] text-red-400 bg-red-950/20 px-3 py-1.5 rounded border border-red-900/30">
                      {errorMessage}
                    </div>
                  )}

                  {/* Clean Minimalist Action Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onMouseEnter={() => soundManager.playHoverClick(1000)}
                    className="w-full h-11 bg-white hover:bg-zinc-200 active:scale-[0.99] text-zinc-950 font-space text-xs font-bold tracking-wider uppercase rounded-xl flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer disabled:opacity-50 shadow-sm"
                  >
                    <WhatsappIcon className="w-4 h-4 text-[#25D366]" />
                    <span>{isSubmitting ? "Opening WhatsApp..." : "Send Message on WhatsApp"}</span>
                  </button>
                </form>
              )}
            </div>
          </Perspective>
        </motion.div>

        {/* Right: Modern Social Dossier with glowing hover effects */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="md:col-span-5 flex flex-col justify-between gap-3.5"
        >
          {[
            {
              platform: "LinkedIn",
              id: "linkedin.com/in/Agam17",
              link: "https://www.linkedin.com/in/Agam17",
              desc: "Professional profile and connections.",
              icon: <LinkedinIcon className="w-4 h-4 text-blue-400" />,
              tagColor: "text-blue-400",
              isPrimary: true,
            },
            {
              platform: "GitHub",
              id: "github.com/Agam348",
              link: "https://github.com/Agam348",
              desc: "Projects, code and development work.",
              icon: <GithubIcon className="w-4 h-4 text-zinc-300" />,
              tagColor: "text-zinc-400",
              isPrimary: true,
            },
            {
              platform: "Email",
              id: "agampreetsingh382@gmail.com",
              link: "https://mail.google.com/mail/?view=cm&fs=1&to=agampreetsingh382@gmail.com",
              desc: "Direct email contact.",
              icon: <Mail className="w-4 h-4 text-indigo-400" />,
              tagColor: "text-indigo-400",
              isPrimary: true,
            },
            {
              platform: "Instagram",
              id: "@agampreetsingh382",
              link: "https://www.instagram.com/agampreetsingh382/",
              desc: "Personal and creative updates.",
              icon: <InstagramIcon className="w-4 h-4 text-pink-400" />,
              tagColor: "text-pink-400",
              isPrimary: true,
            },
            {
              platform: "Phone",
              id: "+91 83601 03038",
              link: "tel:+918360103038",
              desc: "Direct phone contact.",
              icon: <Phone className="w-4 h-4 text-emerald-400" />,
              tagColor: "text-emerald-400",
              isPrimary: true,
            },
          ].map((social) => (
            <a
              key={social.platform}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundManager.playHoverClick(1000)}
              className="group flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-zinc-950/70 hover:bg-zinc-900/80 backdrop-blur-md border border-zinc-800/80 hover:border-indigo-500/70 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.22)] transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-zinc-900/90 border border-zinc-800 group-hover:border-indigo-500/50 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 shadow-inner">
                  {social.icon}
                </div>
                <div className="min-w-0 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className={`font-space text-[8.5px] font-bold tracking-widest uppercase ${social.tagColor} block`}>
                      {social.platform}
                    </span>
                  </div>
                  <div className="font-space text-xs sm:text-sm font-bold text-white group-hover:text-indigo-300 transition-colors duration-300 truncate">
                    {social.id}
                  </div>
                  <p className="font-sora text-[10px] text-zinc-500 group-hover:text-zinc-400 transition-colors truncate">
                    {social.desc}
                  </p>
                </div>
              </div>

              <div className="w-7 h-7 rounded-md bg-zinc-900/60 border border-zinc-800/80 group-hover:border-indigo-500/50 group-hover:bg-indigo-950/40 flex items-center justify-center text-zinc-500 group-hover:text-cyan-300 shrink-0 ml-3 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </a>
          ))}
        </motion.div>

        </div>

      </div>

    </section>
  );
}

