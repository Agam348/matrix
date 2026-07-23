"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundManager } from "../lib/sound";
import { X, GraduationCap, Award, MapPin, Globe } from "lucide-react";

interface Token {
  text: string;
  type: "keyword" | "string" | "key" | "punctuation" | "text" | "number";
}

const CODE_TOKENS: Token[][] = [
  [
    { text: "const ", type: "keyword" },
    { text: "developer", type: "key" },
    { text: " = ", type: "punctuation" },
    { text: "{", type: "punctuation" }
  ],
  [
    { text: "  name", type: "key" },
    { text: ": ", type: "punctuation" },
    { text: '"Agampreet Singh"', type: "string" },
    { text: ",", type: "punctuation" }
  ],
  [
    { text: "  role", type: "key" },
    { text: ": ", type: "punctuation" },
    { text: '"Full-Stack Developer"', type: "string" },
    { text: ",", type: "punctuation" }
  ],
  [
    { text: "  education", type: "key" },
    { text: ": ", type: "punctuation" },
    { text: "[", type: "punctuation" },
    { text: '"IIT Madras"', type: "string" },
    { text: ", ", type: "punctuation" },
    { text: '"Guru Nanak Dev University"', type: "string" },
    { text: "],", type: "punctuation" }
  ],
  [
    { text: "  skills", type: "key" },
    { text: ": ", type: "punctuation" },
    { text: "[", type: "punctuation" },
    { text: '"React"', type: "string" },
    { text: ", ", type: "punctuation" },
    { text: '"Next.js"', type: "string" },
    { text: ", ", type: "punctuation" },
    { text: '"Flutter"', type: "string" },
    { text: ", ", type: "punctuation" },
    { text: '"Python"', type: "string" },
    { text: ", ", type: "punctuation" },
    { text: '"Java"', type: "string" },
    { text: ", ", type: "punctuation" },
    { text: '"AI"', type: "string" },
    { text: "],", type: "punctuation" }
  ],
  [
    { text: "  achievements", type: "key" },
    { text: ": ", type: "punctuation" },
    { text: "{", type: "punctuation" }
  ],
  [
    { text: "    hackathons", type: "key" },
    { text: ": ", type: "punctuation" },
    { text: '"3x Winner"', type: "string" },
    { text: ",", type: "punctuation" }
  ],
  [
    { text: "    international", type: "key" },
    { text: ": ", type: "punctuation" },
    { text: '"Global Hackathon Winner"', type: "string" }
  ],
  [
    { text: "  ", type: "text" },
    { text: "},", type: "punctuation" }
  ],
  [
    { text: "  currentFocus", type: "key" },
    { text: ": ", type: "punctuation" },
    { text: "[", type: "punctuation" },
    { text: '"Full-Stack"', type: "string" },
    { text: ", ", type: "punctuation" },
    { text: '"AI"', type: "string" },
    { text: ", ", type: "punctuation" },
    { text: '"Scalable Apps"', type: "string" },
    { text: "],", type: "punctuation" }
  ],
  [
    { text: "  status", type: "key" },
    { text: ": ", type: "punctuation" },
    { text: '"Open to Opportunities 🚀"', type: "string" }
  ],
  [
    { text: "};", type: "punctuation" }
  ]
];

type LenisControls = {
  scrollTo: (target: string) => void;
  start: () => void;
  stop: () => void;
};

const getLenisControls = (): LenisControls | undefined => {
  const lenis = (window as unknown as { lenis?: unknown }).lenis;

  if (!lenis || typeof lenis !== "object") return undefined;

  const controls = lenis as Partial<LenisControls>;
  if (
    typeof controls.scrollTo === "function" &&
    typeof controls.start === "function" &&
    typeof controls.stop === "function"
  ) {
    return controls as LenisControls;
  }

  return undefined;
};

export default function About() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Parallax rotation states
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateY = (x - xc) / 25; // subtle tilt
    const rotateX = -(y - yc) / 20;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  // Typing animation states
  const [typedCharCount, setTypedCharCount] = useState(0);

  // Flatten the token list to compute indices for typing
  interface FlatToken {
    text: string;
    type: "keyword" | "string" | "key" | "punctuation" | "text" | "number";
    lineIdx: number;
    tokenIdx: number;
    start: number;
    end: number;
  }

  const flatTokens = useMemo(() => {
    let currentLength = 0;
    const list: FlatToken[] = [];
    CODE_TOKENS.forEach((line, lineIdx) => {
      line.forEach((token, tokenIdx) => {
        const start = currentLength;
        const end = currentLength + token.text.length;
        list.push({
          ...token,
          lineIdx,
          tokenIdx,
          start,
          end,
        });
        currentLength = end;
      });
      currentLength += 1; // for newline
    });
    return { list, totalLength: currentLength };
  }, []);

  const codeBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (codeBodyRef.current) {
      codeBodyRef.current.scrollTop = codeBodyRef.current.scrollHeight;
    }
  }, [typedCharCount]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTypedCharCount((prev) => {
        if (prev >= flatTokens.totalLength) {
          clearInterval(timer);
          return prev;
        }
        return prev + 2; // Type speed: 2 characters per tick
      });
    }, 15); // Interval tick: 15ms

    return () => clearInterval(timer);
  }, [flatTokens.totalLength]);

  const getColorClass = (type: string) => {
    switch (type) {
      case "keyword":
        return "text-[#A855F7]";
      case "string":
        return "text-[#22C55E]";
      case "key":
        return "text-[#60A5FA]";
      case "number":
        return "text-[#F59E0B]";
      case "punctuation":
        return "text-white";
      default:
        return "text-zinc-400";
    }
  };

  const handleScrollTo = (id: string) => {
    soundManager.playClick(900);
    const lenis = getLenisControls();
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
    const lenis = getLenisControls();
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
      className="relative min-h-0 md:min-h-screen w-full flex items-end bg-[#09090b] overflow-hidden select-none"
    >
      

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
      <div className="relative z-10 pointer-events-none w-full max-w-7xl mx-auto px-6 sm:px-12 pb-16 md:pb-36 pt-24 md:pt-32 min-h-0 md:min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Side: Content Block (Left-anchored text layout matching Sentinel AI typography clamps) */}
        <div className="lg:col-span-7 w-full flex flex-col items-start text-left pb-4 md:pb-12">
          
          {/* Staggered Title via viewport triggers */}
          <motion.div 
            initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="flex items-center gap-3 mb-2 md:mb-4"
          >
            <span className="w-1 h-10 bg-gradient-to-b from-indigo-400 via-violet-400 to-indigo-600 rounded-full shrink-0" />
            <h2 className="font-space text-[clamp(2.15rem,11vw,4.5rem)] font-black uppercase tracking-tight select-none leading-none">
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
            Pursuing an MTECH FYIP in CSE at GNDU and a BS in Data Science at IIT Madras — merging software engineering with data-driven analysis to build minimal, secure, and meaningful tools.
          </motion.p>

          {/* Interactive CTA Buttons (Staggered Animation) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
            className="flex w-full flex-col sm:w-auto sm:flex-row flex-wrap gap-3 font-space text-[8.5px] font-bold uppercase tracking-[0.2em]"
          >
            <button 
              onClick={openCredentials}
              onMouseEnter={() => soundManager.playHoverClick(1000)}
              className="pointer-events-auto h-12 w-full sm:w-auto px-8 flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-400 active:scale-[0.97] transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.35)] text-white rounded-sm cursor-pointer select-none font-bold text-[9px] tracking-[0.2em] uppercase"
            >
              Education
            </button>
            
            <button 
              onClick={() => handleScrollTo("contact")}
              onMouseEnter={() => soundManager.playHoverClick(1000)}
              className="pointer-events-auto w-full sm:w-auto bg-zinc-950/40 hover:bg-zinc-900/60 backdrop-blur-sm border border-zinc-600/60 hover:border-zinc-400/80 active:scale-[0.97] transition-all text-zinc-200 hover:text-white px-6 py-3.5 md:px-8 md:py-4 rounded-sm cursor-pointer select-none font-bold"
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
            className="mt-8 md:mt-10 w-full border-t border-b border-zinc-800/60 bg-zinc-950/40 backdrop-blur-sm py-2.5 px-4 flex items-start md:items-center gap-3 pointer-events-auto overflow-hidden"
          >
            {/* Pulse dot */}
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 animate-pulse" />
            <p className="text-zinc-400 text-[9px] md:text-[11px] font-space font-medium tracking-[0.14em] md:tracking-[0.18em] uppercase whitespace-normal break-words">
              3x Hackathon Winner&nbsp;&nbsp;|&nbsp;&nbsp;1x International Hackathon Winner
            </p>
          </motion.div>

        </div>

        {/* Right Side: Animated Code Snippet Card */}
        <div className="lg:col-span-5 w-full flex justify-center lg:justify-end items-center pointer-events-auto">
          <div className="relative w-full max-w-[480px] h-[420px]">
            {/* Deep blue glowing backplate (12% opacity, blur-2xl) */}
            <div className="absolute -inset-4 bg-sky-500/12 rounded-3xl blur-2xl pointer-events-none z-0" />

            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              animate={{
                y: [0, -6, 0],
                borderColor: [
                  "rgba(99, 102, 241, 0.2)",
                  "rgba(56, 189, 248, 0.4)",
                  "rgba(99, 102, 241, 0.2)"
                ],
                boxShadow: [
                  "0 0 30px rgba(99, 102, 241, 0.08)",
                  "0 0 40px rgba(56, 189, 248, 0.15)",
                  "0 0 30px rgba(99, 102, 241, 0.08)"
                ]
              }}
              transition={{
                y: {
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                borderColor: {
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                boxShadow: {
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                opacity: { duration: 0.6, ease: "easeOut" },
                scale: { duration: 0.6, ease: "easeOut" }
              }}
              style={{
                transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                transformStyle: "preserve-3d",
                transition: "transform 0.15s ease-out",
              }}
              className="relative z-10 w-full h-full bg-zinc-950/75 backdrop-blur-md border border-zinc-900 rounded-2xl flex flex-col overflow-hidden select-none"
            >
              {/* Soft ambient glow behind card */}
              <div className="absolute -inset-px bg-gradient-to-r from-indigo-500/10 to-sky-500/10 rounded-2xl blur-md opacity-40 pointer-events-none" />

              {/* macOS window title bar */}
              <div className="relative z-10 flex items-center justify-between px-4 py-3 bg-zinc-900/40 border-b border-zinc-900/60 select-none">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                  <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                </div>
                <span className="text-[10px] font-space font-medium tracking-wider text-zinc-500">
                  developer.ts
                </span>
                <div className="w-[28px]" />
              </div>

              {/* Code Body */}
              <div ref={codeBodyRef} className="relative z-10 flex-1 p-5 overflow-y-auto font-mono text-[10px] sm:text-xs leading-relaxed text-zinc-350 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden select-text selection:bg-indigo-950 selection:text-indigo-300 animate-pulse-none">
                {CODE_TOKENS.map((line, lineIdx) => {
                  const lineStart = flatTokens.list.find(t => t.lineIdx === lineIdx)?.start ?? 0;
                  const lineEnd = [...flatTokens.list].reverse().find(t => t.lineIdx === lineIdx)?.end ?? 0;
                  const isActiveLine = typedCharCount > lineStart && typedCharCount <= lineEnd;
                  const isLastLine = lineIdx === CODE_TOKENS.length - 1;
                  const isFinishedTyping = typedCharCount >= flatTokens.totalLength - 1;

                  // Only render the line if we have typed past its start
                  if (typedCharCount <= lineStart && lineIdx > 0) return null;

                  return (
                    <div key={lineIdx} className="min-h-[1.5rem] flex items-center flex-wrap">
                      {/* Line Number */}
                      <span className="w-6 text-zinc-700 select-none pr-2 text-right text-[8px] sm:text-[10px]">
                        {lineIdx + 1}
                      </span>
                      
                      {/* Line Content */}
                      <span className="flex-1 flex flex-wrap items-center">
                        {line.map((token, tokenIdx) => {
                          const flatToken = flatTokens.list.find(t => t.lineIdx === lineIdx && t.tokenIdx === tokenIdx);
                          if (!flatToken) return null;
                          if (typedCharCount <= flatToken.start) return null;

                          const isTokenBeingTyped = typedCharCount > flatToken.start && typedCharCount < flatToken.end;
                          const tokenText = isTokenBeingTyped 
                            ? flatToken.text.slice(0, typedCharCount - flatToken.start)
                            : flatToken.text;

                          return (
                            <span key={tokenIdx} className={getColorClass(flatToken.type)}>
                              {tokenText}
                            </span>
                          );
                        })}
                        
                        {/* Blinking Cursor on active line */}
                        {(isActiveLine || (isLastLine && isFinishedTyping)) && (
                          <span className="w-1.5 h-3.5 bg-[#60A5FA] animate-pulse ml-0.5 inline-block align-middle shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>

            </motion.div>
          </div>
        </div>

      </div>

      {/* FULL SCREEN ACADEMIC TIMELINE / DOSSIER GLASS CONSOLE OVERLAY */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black backdrop-blur-none p-4 sm:p-6 select-none"
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
                        MTECH FYIP Computer Science and Engineering
                      </h4>
                      <p className="font-sora text-[10px] text-zinc-500 mt-0.5">
                        Guru Nanak Dev University, Amritsar • Aug 2024 - Dec 2029
                      </p>
                      <p className="font-sora text-[10px] text-zinc-400 mt-2 leading-relaxed">
                        Five-Year Integrated Program focusing on high-performance data systems, discrete algorithms, computational complexity, and secure mobile hybrids.
                      </p>
                    </div>

                    <div className="relative pl-5 border-l border-zinc-900">
                      <div className="absolute left-[-4.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-400 border-2 border-zinc-950" />
                      <h4 className="font-space text-xs font-bold text-white leading-tight">
                        BS in Data Science
                      </h4>
                      <p className="font-sora text-[10px] text-zinc-500 mt-0.5">
                        IIT Madras (Indian Institute of Technology, Madras) • May 2024 - Dec 2028
                      </p>
                      <p className="font-sora text-[10px] text-zinc-400 mt-2 leading-relaxed">
                        Curriculum spanning statistical programming, computational finance forecasting, statistical modeling, database design, and algorithmic execution.
                      </p>
                    </div>

                    <div className="relative pl-5 border-l border-zinc-900">
                      <div className="absolute left-[-4.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-600 border-2 border-zinc-950" />
                      <h4 className="font-space text-xs font-bold text-white leading-tight">
                        Awards & Activities
                      </h4>
                      <p className="font-sora text-[10px] text-zinc-500 mt-0.5">
                        Hackathons & Competitions
                      </p>
                      <p className="font-sora text-[10px] text-zinc-400 mt-2 leading-relaxed">
                        3x Hackathon Winner and 1x International Hackathon competitor. Passionate about solving real-world challenges through innovative software.
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
