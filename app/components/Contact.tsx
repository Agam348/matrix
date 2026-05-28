"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { soundManager } from "../lib/sound";
import { Perspective, Highlight } from "@/components/ui/perspective-highlight";
import { Mail, Phone, Send, Check } from "lucide-react";

interface FormState {
  name: string;
  email: string;
  message: string;
}

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
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      soundManager.playBeep(330, 0.2);
      setErrorMessage("Please fill out all fields before submitting.");
      return;
    }

    setIsSubmitting(true);
    soundManager.playBeep(600, 0.1);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      soundManager.playBeep(880, 0.2);
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="relative py-32 px-6 sm:px-12 max-w-5xl mx-auto flex flex-col justify-center items-center w-full bg-transparent overflow-hidden"
    >
      {/* Ambient glow blobs for depth */}
      <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-indigo-600/4 blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-0 w-60 h-60 rounded-full bg-violet-600/4 blur-[80px] pointer-events-none -z-10" />

      {/* Title block */}
      <div className="w-full text-left mb-16 border-b border-zinc-800/40 pb-5">
        <motion.div
          initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-1"
        >
          <span className="w-1 h-6 bg-gradient-to-b from-indigo-400 to-pink-500 rounded-full shrink-0" />
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
          Get in touch for opportunities or collaboration
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 w-full items-stretch">
        
        {/* Left Side: Borderless, Floating Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-7 w-full h-full relative"
        >
          <Perspective className="w-full h-full">
            <div className="p-2 flex flex-col justify-center bg-transparent relative w-full h-full min-h-[360px]">
              
              {isSuccess ? (
                <div className="flex-grow flex flex-col justify-center items-center text-center space-y-4 min-h-[300px]">
                  <div className="w-12 h-12 rounded-full bg-indigo-950/30 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Check className="w-5 h-5" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-space text-sm font-bold text-white block">
                      <Highlight color="green">Message Sent Successfully</Highlight>
                    </h3>
                    <p className="font-sora text-xs text-zinc-450 max-w-xs mx-auto leading-relaxed">
                      Thank you for reaching out. I will get back to you shortly.
                    </p>
                  </div>
                  
                  <button
                    onClick={() => {
                      setForm({ name: "", email: "", message: "" });
                      setIsSuccess(false);
                      setErrorMessage("");
                      soundManager.playBeep(600, 0.1);
                    }}
                    className="mt-4 px-4 py-2 border border-zinc-900 hover:border-zinc-700 bg-zinc-950/40 text-zinc-400 hover:text-white rounded-md font-space text-[9px] font-bold tracking-widest cursor-pointer uppercase select-none transition-all duration-300"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6 flex-grow flex flex-col justify-center">
                  <div className="space-y-1">
                    <label className="font-space text-[9px] font-bold text-zinc-550 uppercase tracking-widest block">
                      <Highlight color="green">Your Name</Highlight>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-1 py-3 bg-transparent border-b border-zinc-900 rounded-none text-white text-xs font-sora focus:outline-none focus:border-indigo-500 placeholder-zinc-700 transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-space text-[9px] font-bold text-zinc-550 uppercase tracking-widest block">
                      <Highlight color="purple">Your Email</Highlight>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleInputChange}
                      placeholder="johndoe@example.com"
                      className="w-full px-1 py-3 bg-transparent border-b border-zinc-900 rounded-none text-white text-xs font-sora focus:outline-none focus:border-indigo-500 placeholder-zinc-700 transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-space text-[9px] font-bold text-zinc-550 uppercase tracking-widest block">
                      <Highlight color="red">Your Message</Highlight>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleInputChange}
                      placeholder="Write your message here..."
                      rows={4}
                      className="w-full px-1 py-3 bg-transparent border-b border-zinc-900 rounded-none text-white text-xs font-sora focus:outline-none focus:border-indigo-500 placeholder-zinc-700 transition-colors resize-none"
                    />
                  </div>

                  {errorMessage && (
                    <div className="font-sora text-[10px] text-red-400 bg-red-950/10 px-3 py-1.5 rounded border border-red-950/20">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-space text-[10px] font-bold tracking-widest rounded-sm transition-all duration-300 cursor-pointer uppercase disabled:opacity-50 flex items-center justify-center gap-1.5 hover:shadow-[0_0_20px_rgba(99,102,241,0.35)]"
                  >
                    <Send className="w-3 h-3 shrink-0" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </Perspective>
        </motion.div>

        {/* Right: Modern Social Dossier - Fully borderless floating tags! */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="md:col-span-5 flex flex-col justify-between gap-6"
        >
          {[
            {
              platform: "LinkedIn",
              id: "in/Agam17",
              link: "https://www.linkedin.com/in/Agam17",
              desc: "Professional networking and connections.",
              icon: <LinkedinIcon className="w-4 h-4 text-indigo-400" />,
            },
            {
              platform: "Instagram",
              id: "@agampreetsingh382",
              link: "https://www.instagram.com/agampreetsingh382/",
              desc: "Direct social photographic media channel.",
              icon: <InstagramIcon className="w-4 h-4 text-pink-400" />,
            },
            {
              platform: "GitHub",
              id: "github.com/Agam348",
              link: "https://github.com/Agam348",
              desc: "Source code repositories and history log.",
              icon: <GithubIcon className="w-4 h-4 text-zinc-400" />,
            },
            {
              platform: "Email",
              id: "agampreetsingh382@gmail.com",
              link: "mailto:agampreetsingh382@gmail.com",
              desc: "Direct corporate electronic messaging.",
              icon: <Mail className="w-4 h-4 text-indigo-400" />,
            },
            {
              platform: "Cellular",
              id: "+91 83601 03038",
              link: "tel:+918360103038",
              desc: "Direct cellular voice communications.",
              icon: <Phone className="w-4 h-4 text-zinc-400" />,
            },
          ].map((social) => (
            <a
              key={social.platform}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundManager.playClick(1000)}
              className="group flex flex-col justify-center p-3 border border-zinc-800/50 hover:border-indigo-500/30 bg-zinc-900/10 hover:bg-indigo-950/10 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.06)]"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-sm bg-zinc-900 border border-zinc-800 group-hover:border-indigo-900/60 shrink-0 transition-colors duration-300">
                  {social.icon}
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-space text-[8px] font-bold text-zinc-500 group-hover:text-zinc-400 tracking-widest uppercase transition-colors">
                    {social.platform}
                  </h3>
                  <div className="font-space text-xs font-bold text-white group-hover:text-indigo-300 transition-colors duration-300">
                    {social.id}
                  </div>
                </div>
              </div>
              <p className="font-sora text-[10px] text-zinc-600 group-hover:text-zinc-500 mt-2 pl-9 transition-colors">
                {social.desc}
              </p>
            </a>
          ))}
        </motion.div>

      </div>

    </section>
  );
}
