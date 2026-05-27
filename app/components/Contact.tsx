"use client";

import React, { useState } from "react";
import { soundManager } from "../lib/sound";
import { Perspective, Highlight } from "@/components/ui/perspective-highlight";

interface FormState {
  name: string;
  email: string;
  message: string;
}

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
    
    // Simulate simple clean form response
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      soundManager.playBeep(880, 0.2);
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="py-24 px-6 sm:px-12 max-w-5xl mx-auto flex flex-col justify-center items-center w-full min-h-screen"
    >
      {/* Title block */}
      <div className="w-full text-left mb-12 border-b border-zinc-800/80 pb-4">
        <h2 className="font-space text-2xl font-bold text-white tracking-tight">
          Contact
        </h2>
        <p className="font-sora text-xs text-zinc-500 mt-1 uppercase tracking-wider">
          Get in touch for opportunities or collaboration
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full items-stretch">
        
        <Perspective className="md:col-span-7 w-full h-full relative">
          <div className="linear-card p-6 flex flex-col justify-center border border-zinc-800 bg-zinc-900/10 rounded-xl relative w-full h-full">
            
            {isSuccess ? (
              <div className="flex-1 flex flex-col justify-center items-center text-center space-y-4 min-h-[300px]">
                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-200 text-lg">
                  ✓
                </div>
                <div className="space-y-3">
                  <h3 className="font-space text-base font-bold text-white block">
                    <Highlight color="green">Message Sent Successfully</Highlight>
                  </h3>
                  <p className="font-sora text-xs text-zinc-400">
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
                  className="mt-4 px-4 py-2 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white rounded font-space text-[10px] font-bold tracking-widest cursor-pointer uppercase select-none"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5 flex-1 flex flex-col justify-center">
                <div className="space-y-1">
                  <label className="font-space text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                    <Highlight color="green">Your Name</Highlight>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full px-3 py-2.5 bg-zinc-950/60 border border-zinc-800 rounded text-white text-xs font-sora focus:outline-none focus:border-zinc-500 focus:ring-0 placeholder-zinc-750 transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-space text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                    <Highlight color="purple">Your Email</Highlight>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    placeholder="johndoe@example.com"
                    className="w-full px-3 py-2.5 bg-zinc-950/60 border border-zinc-800 rounded text-white text-xs font-sora focus:outline-none focus:border-zinc-500 focus:ring-0 placeholder-zinc-750 transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-space text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                    <Highlight color="red">Your Message</Highlight>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleInputChange}
                    placeholder="Write your message here..."
                    rows={4}
                    className="w-full px-3 py-2.5 bg-zinc-950/60 border border-zinc-800 rounded text-white text-xs font-sora focus:outline-none focus:border-zinc-500 focus:ring-0 placeholder-zinc-750 transition-colors resize-none"
                  />
                </div>

                {errorMessage && (
                  <div className="font-sora text-[10px] text-red-400 bg-red-950/10 px-3 py-1.5 rounded border border-red-950/30">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-white text-black hover:bg-zinc-200 font-space text-xs font-bold tracking-widest rounded transition-all cursor-pointer uppercase disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </Perspective>

        {/* Right: Modern Social Dossier Cards */}
        <div className="md:col-span-5 flex flex-col justify-between gap-3">
          {[
            {
              platform: "LinkedIn",
              id: "in/Agam17",
              link: "https://www.linkedin.com/in/Agam17",
              desc: "Professional network connection.",
              icon: "💼",
            },
            {
              platform: "GitHub",
              id: "github.com/Agam348",
              link: "https://github.com/Agam348",
              desc: "Code repositories and repositories log.",
              icon: "🐙",
            },
            {
              platform: "Email",
              id: "agampreetsingh382@gmail.com",
              link: "mailto:agampreetsingh382@gmail.com",
              desc: "Standard direct email messaging.",
              icon: "✉️",
            },
            {
              platform: "Cellular",
              id: "+91 83601 03038",
              link: "tel:+918360103038",
              desc: "Direct cellular phone call.",
              icon: "📱",
            },
          ].map((social) => (
            <a
              key={social.platform}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundManager.playClick(1000)}
              className="linear-card p-4 flex flex-col justify-center flex-1 border border-zinc-800 bg-zinc-900/10 rounded-xl group"
            >
              <div className="flex items-center gap-3">
                <span className="text-base select-none">{social.icon}</span>
                <div className="space-y-0.5">
                  <h3 className="font-space text-[10px] font-bold text-zinc-500 group-hover:text-zinc-300">
                    {social.platform}
                  </h3>
                  <div className="font-space text-xs font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {social.id}
                  </div>
                </div>
              </div>
              <p className="font-sora text-[10px] text-zinc-500 mt-2">
                {social.desc}
              </p>
            </a>
          ))}
        </div>

      </div>

    </section>
  );
}
