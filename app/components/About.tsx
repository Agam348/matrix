"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundManager } from "../lib/sound";
import { X, GraduationCap, Award, MapPin, Globe } from "lucide-react";
import dynamic from "next/dynamic";

// High-performance client-side dynamic import for the 3D Spline Canvas
// SSR is disabled to guarantee zero compilation crashes on Next.js server-side operations
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[#09090b] flex flex-col items-center justify-center text-zinc-650 font-space text-[9px] tracking-[0.2em] uppercase select-none">
      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping mb-3 shrink-0" />
      RETRIEVING 3D GEOMETRY NODES...
    </div>
  ),
});

export default function About() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleScrollTo = (id: string) => {
    soundManager.playClick(900);
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(`#${id}`);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const openCredentials = () => {
    soundManager.playBeep(750, 0.15);
    setTimeout(() => soundManager.playBeep(900, 0.08), 80);
    setIsModalOpen(true);
  };

  const closeCredentials = () => {
    soundManager.playBeep(350, 0.2);
    setIsModalOpen(false);
  };

  // Keyboard shortcut listener to close credentials on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        closeCredentials();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  // Pause Lenis smooth scrolling when the education overlay is active to prevent background scrolling
  useEffect(() => {
    const lenis = (window as any).lenis;
    if (!lenis) return;
    
    if (isModalOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
    
    return () => {
      lenis.start();
    };
  }, [isModalOpen]);

  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex items-end bg-[#09090b] overflow-hidden select-none"
    >
      
      {/* 3D Spline Interactive scene embedded in the background (hue-rotated by 115deg to shift glowing green elements to glowing neon blue/indigo) */}
      <div className="absolute inset-0 z-0 w-full h-full select-none" style={{ filter: "hue-rotate(115deg) saturate(1.2)" }}>
        <Spline 
          scene="https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode" 
          className="w-full h-full"
        />
      </div>

      {/* Top Gradient Blend: Cross-fades the Hero section background into the 3D Spline scene */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#09090b] via-[#09090b]/80 to-transparent z-[2] pointer-events-none" />

      {/* Bottom Gradient Blend: Cross-fades the 3D Spline scene back into the portfolio canvas */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-transparent z-[2] pointer-events-none" />

      {/* Dark Ambient Layer to maintain contrast and legibility */}
      <div className="absolute inset-0 bg-black/40 z-[1] pointer-events-none" />

      {/* Accent glow blobs for visual richness */}
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/6 blur-[120px] pointer-events-none z-[2]" />
      <div className="absolute top-1/2 right-1/3 w-72 h-72 rounded-full bg-violet-600/5 blur-[90px] pointer-events-none z-[2]" />

      {/* Content Container (Aligned exactly with portfolio grid margins, full-screen laptop height) */}
      <div className="relative z-10 pointer-events-none w-full max-w-7xl mx-auto px-6 sm:px-12 pb-24 md:pb-36 pt-32 min-h-screen flex items-end justify-start">
        
        {/* Content Block (Left-anchored text layout matching Sentinel AI typography clamps) */}
        <div className="w-full max-w-2xl flex flex-col items-start text-left pb-4 md:pb-12">
          
          {/* Staggered Title via viewport triggers */}
          <motion.div 
            initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="flex items-center gap-3 mb-2 md:mb-4"
          >
            <span className="w-1 h-10 bg-gradient-to-b from-indigo-400 via-violet-400 to-indigo-600 rounded-full shrink-0" />
            <h2 className="font-space text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase tracking-tight select-none leading-none">
              <span className="text-white">ABOUT </span><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">ME</span>
            </h2>
          </motion.div>

          {/* Staggered Subtitle Tagline */}
          <motion.p 
            initial={{ opacity: 0, y: 20, filter: "blur(2px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-indigo-200 to-zinc-300 text-[clamp(1rem,2vw,1.4rem)] font-semibold mb-3 md:mb-6 leading-snug"
          >
            Bridging Systems Engineering & Analytical Intelligence.
          </motion.p>

          {/* Staggered Description Biography */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="text-zinc-400 text-[clamp(0.75rem,1.2vw,0.95rem)] leading-relaxed font-light mb-6 md:mb-8 max-w-xl"
          >
            Pursuing a BTech in CSE at GNDU and a BS in Data Science at IIT Madras — merging software engineering with data-driven analysis to build minimal, secure, and meaningful tools.
          </motion.p>

          {/* Interactive CTA Buttons (Staggered Animation) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
            className="flex flex-wrap gap-3 font-space text-[8.5px] font-bold uppercase tracking-[0.2em]"
          >
            <button 
              onClick={openCredentials}
              onMouseEnter={() => soundManager.playClick(1000)}
              className="pointer-events-auto h-12 px-8 flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-400 active:scale-[0.97] transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.35)] text-white rounded-sm cursor-pointer select-none font-bold text-[9px] tracking-[0.2em] uppercase"
            >
              Education
            </button>
            
            <button 
              onClick={() => handleScrollTo("contact")}
              onMouseEnter={() => soundManager.playClick(1000)}
              className="pointer-events-auto bg-zinc-950/40 hover:bg-zinc-900/60 backdrop-blur-sm border border-zinc-600/60 hover:border-zinc-400/80 active:scale-[0.97] transition-all text-zinc-200 hover:text-white px-6 py-3.5 md:px-8 md:py-4 rounded-sm cursor-pointer select-none font-bold"
            >
              Contact Me
            </button>
          </motion.div>

          {/* Trust Ticker Bar — independent full-width strip with structural border */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
            className="mt-8 md:mt-10 w-full border-t border-b border-zinc-800/60 bg-zinc-950/40 backdrop-blur-sm py-2.5 px-4 flex items-center gap-3 pointer-events-auto"
          >
            {/* Pulse dot */}
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 animate-pulse" />
            <p className="text-zinc-400 text-[10px] md:text-[11px] font-space font-medium tracking-[0.18em] uppercase whitespace-nowrap">
              Finance Head&nbsp;•&nbsp;CESS GNDU&nbsp;&nbsp;/&nbsp;&nbsp;Tarn Taran, Punjab&nbsp;&nbsp;/&nbsp;&nbsp;2× Hackathon Winner
            </p>
          </motion.div>

        </div>
      </div>

      {/* FULL SCREEN ACADEMIC TIMELINE / DOSSIER GLASS CONSOLE OVERLAY */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6 select-none animate-fade-in"
          >
            {/* CRT monitor scanlines grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.04),rgba(0,255,0,0.01),rgba(0,0,255,0.04))] bg-[size:100%_4px,6px_100%] pointer-events-none z-10 opacity-25" />
            
            {/* Spotlight ambient backdrop backing */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

            {/* Dossier Terminal Frame */}
            <motion.div
              data-lenis-prevent
              initial={{ scale: 0.95, y: 15, filter: "blur(6px)" }}
              animate={{ scale: 1, y: 0, filter: "blur(0)" }}
              exit={{ scale: 0.95, y: 15, filter: "blur(6px)" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl h-[85vh] max-h-[580px] bg-zinc-950 border border-zinc-900 rounded-2xl flex flex-col overflow-hidden shadow-2xl z-20"
            >
              
              {/* Header Bar */}
              <div className="flex items-center justify-between px-5 py-4 bg-zinc-900/30 border-b border-zinc-900/60 select-none">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-indigo-400" />
                  <span className="font-space text-[10px] font-extrabold tracking-widest text-zinc-400 uppercase">
                    EDUCATION
                  </span>
                </div>
                
                <button
                  onClick={closeCredentials}
                  title="Close Dossier"
                  className="p-1 rounded text-zinc-650 hover:text-red-400 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Dossier Body with detailed academics list */}
              <div 
                data-lenis-prevent
                className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-8 scrollbar-thin select-text selection:bg-indigo-950 selection:text-indigo-300"
              >
                
                {/* Academic Timeline Segment */}
                <div className="space-y-4">
                  <h3 className="font-space text-[9px] font-bold text-indigo-400 uppercase tracking-widest border-b border-zinc-900/60 pb-1.5 select-none">
                    Academics & Research Nodes
                  </h3>

                  <div className="space-y-6">
                    <div className="relative pl-5 border-l border-zinc-900">
                      <div className="absolute left-[-4.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-500 border-2 border-zinc-950" />
                      <h4 className="font-space text-xs font-bold text-white leading-tight">
                        BTech in Computer Science & Engineering (CSE)
                      </h4>
                      <p className="font-sora text-[10px] text-zinc-500 mt-0.5">
                        Guru Nanak Dev University (GNDU) • 2024 - 2028
                      </p>
                      <p className="font-sora text-[10px] text-zinc-400 mt-2 leading-relaxed">
                        Focusing on high-performance data systems, discrete algorithms, computational complexity, and secure mobile hybrids.
                      </p>
                    </div>

                    <div className="relative pl-5 border-l border-zinc-900">
                      <div className="absolute left-[-4.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-400 border-2 border-zinc-950" />
                      <h4 className="font-space text-xs font-bold text-white leading-tight">
                        BS in Data Science & Applications
                      </h4>
                      <p className="font-sora text-[10px] text-zinc-500 mt-0.5">
                        Indian Institute of Technology, Madras (IITM) • 2024 - 2028
                      </p>
                      <p className="font-sora text-[10px] text-zinc-400 mt-2 leading-relaxed">
                        Curriculum spanning statistical programming, computational finance forecasting, statistical modeling, database design, and algorithmic execution.
                      </p>
                    </div>

                    <div className="relative pl-5 border-l border-zinc-900">
                      <div className="absolute left-[-4.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-600 border-2 border-zinc-950" />
                      <h4 className="font-space text-xs font-bold text-white leading-tight">
                        Aspire Leaders Program Scholar
                      </h4>
                      <p className="font-sora text-[10px] text-zinc-500 mt-0.5">
                        Aspire Institute (Harvard University Founded) • Aug - Oct 2025
                      </p>
                      <p className="font-sora text-[10px] text-zinc-400 mt-2 leading-relaxed">
                        Global leadership scholarship involving rigorous cross-cultural case analyses and statistical systems alignment metrics.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Operations & Leadership Segment */}
                <div className="space-y-4">
                  <h3 className="font-space text-[9px] font-bold text-zinc-450 uppercase tracking-widest border-b border-zinc-900/60 pb-1.5 select-none">
                    Operations & Leadership
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Award className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <h4 className="font-space text-xs font-bold text-white leading-tight">
                          Finance Head • CESS GNDU
                        </h4>
                        <p className="font-sora text-[10px] text-zinc-400 leading-relaxed">
                          Directed resource allocations, sponsorship funds, and event budgets for 170+ regional hackathon sprinters and dev participants.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Core Dossier Details Segment */}
                <div className="space-y-4">
                  <h3 className="font-space text-[9px] font-bold text-zinc-450 uppercase tracking-widest border-b border-zinc-900/60 pb-1.5 select-none">
                    System Dossier Metadata
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4 font-sora text-[10px] text-zinc-400">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-zinc-650 shrink-0" />
                      <div>
                        <span className="text-zinc-550 block text-[8px] uppercase font-space tracking-wider">Origin</span>
                        <span className="font-bold text-zinc-300">Tarn Taran, Punjab</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-zinc-650 shrink-0" />
                      <div>
                        <span className="text-zinc-550 block text-[8px] uppercase font-space tracking-wider">Languages</span>
                        <span className="font-bold text-zinc-300">English, Punjabi, Hindi</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Console Footer */}
              <div className="px-5 py-4 bg-zinc-900/20 border-t border-zinc-900/60 select-none flex items-center justify-between text-[8px] font-mono text-zinc-650">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  DOSSIER_ACCESS_SECURE_MODE
                </span>
                <span>PRESS [ESC] TO DISCONNECT SESSION</span>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
