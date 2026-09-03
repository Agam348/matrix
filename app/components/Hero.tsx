"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundManager } from "../lib/sound";
import AnimatedShaderHero from "@/components/ui/animated-shader-hero";
import HangingIdCard from "@/components/ui/hanging-id-card";
import Image from "next/image";
import { Terminal, X, RefreshCw, Eye } from "lucide-react";

const TERMINAL_LINES = [
  "SYS_BOOT // ACCESSING SECURITY NODE...",
  "ESTABLISHING SECURE HANDSHAKE PROTOCOL... [OK]",
  "RETRIEVING ENCRYPTED IDENTITY NODES... [DECRYPTED]",
  "",
  "==================================================",
  "  DIGITAL CONSOLE PROFILE // AGAMPREET SINGH",
  "==================================================",
  "ACADEMIC CREDENTIALS:",
  "  > MTECH FYIP COMPUTER SCIENCE & ENG • GNDU (2024-2029)",
  "  > BS DATA SCIENCE • IIT MADRAS (2024-2028)",
  "",
  "WORK EXPERIENCE NODES:",
  "  > JUNIOR DEVELOPER • TALPHA (AUG 2025 - PRESENT)",
  "    Mutual fund research, quantitative screening & capital markets gateway.",
  "  > DEVELOPER • GURMAT DARBAR (APR 2026 - PRESENT)",
  "    Worked on the design and development of the official website.",
  "  > WEB DEVELOPER • VTAP (MAR 2026 - APR 2026)",
  "    Built responsive websites for German tech company using HTML, CSS & JS.",
  "",
  "SYSTEM ARCHITECTURES:",
  "  > MOBILE: FLUTTER, DART, HYBRID WIDGET DEPLOYMENT",
  "  > WEB: NEXT.JS, REACT.JS, TAILWIND CSS, GLSL SHADERS",
  "  > ANALYTICS: PYTHON, DATA MODELLING, FINANCIAL FORECASTS",
  "",
  "OPERATIONS & LEADERSHIP NODES:",
  "  > FINANCE HEAD • CESS: DIRECTED sponsorship metrics",
  "    and event budgets for 170+ regional hackathon participants.",
  "  > HACKATHONS: 3x Hackathon Winner, 1x International Hackathon.",
  "",
  "SYSTEM PHILOSOPHY & VISION:",
  "  \"To predict the future, engineer it. Build clean,",
  "   high-performance interfaces aligned with empirical metrics.\"",
  "==================================================",
  "PROCESS COMPLETE // SECURE READOUT SHUTDOWN IDLE."
];

export default function Hero() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [visibleText, setVisibleText] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleScrollTo = (id: string) => {
    soundManager.playClick(900);
    const lenis = (window as unknown as { lenis?: { scrollTo: (target: string | number) => void; stop: () => void; start: () => void } }).lenis;
    if (lenis) {
      lenis.scrollTo(`#${id}`);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const openTerminal = () => {
    soundManager.playBeep(700, 0.15);
    setTimeout(() => soundManager.playBeep(950, 0.08), 80);
    setIsTerminalOpen(true);
    setVisibleText([]);
    setCurrentLineIndex(0);
    setCurrentCharIndex(0);
    setIsFinished(false);
  };

  const closeTerminal = () => {
    soundManager.playBeep(350, 0.25);
    setIsTerminalOpen(false);
  };

  const restartTerminalSequence = () => {
    soundManager.playBeep(600, 0.1);
    setVisibleText([]);
    setCurrentLineIndex(0);
    setCurrentCharIndex(0);
    setIsFinished(false);
  };

  // Keyboard shortcut listener to close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isTerminalOpen) {
        closeTerminal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isTerminalOpen]);

  // Pause Lenis smooth scrolling when the terminal console overlay is active
  useEffect(() => {
    const lenis = (window as unknown as { lenis?: { scrollTo: (target: string | number) => void; stop: () => void; start: () => void } }).lenis;
    if (!lenis) return;
    
    if (isTerminalOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
    
    return () => {
      lenis.start();
    };
  }, [isTerminalOpen]);

  // Terminal Typing Typewriter effect logic
  useEffect(() => {
    if (!isTerminalOpen) return;
    
    if (currentLineIndex < TERMINAL_LINES.length) {
      const currentLine = TERMINAL_LINES[currentLineIndex];
      
      if (currentCharIndex < currentLine.length) {
        const timer = setTimeout(() => {
          setVisibleText(prev => {
            const next = [...prev];
            if (!next[currentLineIndex]) {
              next[currentLineIndex] = "";
            }
            next[currentLineIndex] += currentLine[currentCharIndex];
            return next;
          });
          setCurrentCharIndex(prev => prev + 1);
          
          // Play a mechanical sound every few character ticks
          if (currentCharIndex % 3 === 0) {
            soundManager.playBeep(850 + Math.random() * 300, 0.012);
          }
        }, 6); // Extremely snappy and high-tech typewriter speed
        return () => clearTimeout(timer);
      } else {
        // Line typed completely, transition to the next line
        const timer = setTimeout(() => {
          if (currentLineIndex + 1 < TERMINAL_LINES.length) {
            setCurrentLineIndex(prev => prev + 1);
            setCurrentCharIndex(0);
            soundManager.playBeep(500, 0.015); // Confirmation tick
          } else {
            setIsFinished(true);
            soundManager.playBeep(980, 0.08); // Success sound
            setCurrentLineIndex(prev => prev + 1);
          }
        }, 40); 
        return () => clearTimeout(timer);
      }
    }
  }, [isTerminalOpen, currentLineIndex, currentCharIndex]);

  return (
    <>
      <AnimatedShaderHero className="relative min-h-screen w-full flex flex-col items-center justify-center bg-transparent">
        
        {/* Overlay section container */}
        <section
          id="home"
          className="w-full min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center pt-14 pb-6 sm:pt-24 sm:pb-16 px-5 sm:px-8 lg:px-12 overflow-hidden select-none"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-center w-full z-10 max-w-6xl mx-auto">
            
            {/* Left Side: Premium Text Intro */}
            <div className="md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left space-y-4 sm:space-y-5 md:space-y-6 w-full">
              
              {/* Mobile Compact Profile Avatar (Option 2: Mobile-only, clean circular photo with subtle glow) */}
              <div className="flex md:hidden relative mb-1 animate-fade-in-up">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 p-0.5 rounded-full bg-gradient-to-tr from-indigo-500/70 via-zinc-700/60 to-cyan-400/70 shadow-[0_0_28px_rgba(99,102,241,0.35)]">
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-zinc-950 border border-zinc-800">
                    <Image
                      src="/profile.jpg"
                      alt="Agampreet Singh"
                      fill
                      sizes="96px"
                      className="object-cover"
                      priority
                    />
                  </div>
                  {/* Subtle active status indicator dot */}
                  <span className="absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#09090b] shadow-sm" />
                </div>
              </div>

              <div className="space-y-2.5 sm:space-y-3 md:space-y-4 w-full">
                {/* Scholar label above name */}
                <p className="font-space text-xs sm:text-sm text-zinc-400 tracking-[0.15em] sm:tracking-[0.18em] uppercase animate-fade-in-up animation-delay-100 font-medium">
                  IIT Madras & Guru Nanak Dev University
                </p>
                
                <h1 className="font-orbitron text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-tight text-white select-none leading-none animate-fade-in-up animation-delay-200">
                  AGAMPREET <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-indigo-200 to-zinc-400">
                    SINGH
                  </span>
                </h1>
                
                <p className="font-space text-sm sm:text-base lg:text-lg text-zinc-200 font-bold tracking-wide max-w-lg mx-auto md:mx-0 animate-fade-in-up animation-delay-400 leading-snug sm:leading-relaxed">
                  Building modern digital experiences through code, design and technology.
                </p>
              </div>

              {/* Concise biography intro */}
              <p className="font-sora text-sm sm:text-base leading-relaxed text-zinc-300 max-w-md mx-auto md:mx-0 animate-fade-in-up animation-delay-600">
                I build responsive web and mobile applications with React, Next.js, Flutter and Python. Passionate about AI and solving real-world challenges through user-focused software.
              </p>

              {/* Action CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center md:justify-start w-full sm:w-auto pt-1 sm:pt-2 animate-fade-in-up animation-delay-800">
                <button
                  onClick={() => handleScrollTo("experience")}
                  onMouseEnter={() => soundManager.playHoverClick(1000)}
                  className="h-11 sm:h-12 w-full sm:w-auto px-7 flex items-center justify-center gap-2.5 border border-zinc-800 hover:border-zinc-600 bg-[#0c0d12]/90 hover:bg-zinc-900 backdrop-blur-sm text-zinc-100 hover:text-white rounded-xl font-space text-xs font-bold tracking-[0.14em] uppercase transition-all duration-300 cursor-pointer shrink-0 active:scale-[0.98] shadow-sm"
                >
                  <Eye className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors shrink-0" />
                  <span>VIEW EXPERIENCE</span>
                </button>
                
                <button
                  onClick={openTerminal}
                  onMouseEnter={() => soundManager.playHoverClick(1000)}
                  className="h-11 sm:h-12 w-full sm:w-auto px-7 flex items-center justify-center gap-2.5 border border-cyan-500/80 hover:border-cyan-400 bg-[#0c0d12]/90 hover:bg-zinc-900/90 text-cyan-400 hover:text-cyan-300 rounded-xl font-space text-xs font-bold tracking-[0.14em] uppercase transition-all duration-300 cursor-pointer shrink-0 active:scale-[0.98] shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_22px_rgba(6,182,212,0.4)]"
                >
                  <span className="font-mono font-bold text-cyan-400 text-sm tracking-tight leading-none">&gt;_</span>
                  <span className="whitespace-nowrap">ACCESS TERMINAL</span>
                </button>
              </div>

              {/* Mobile Credential Highlights Ribbon (Balances and fills the lower screen void on mobile) */}
              <div className="grid grid-cols-3 gap-2 w-full pt-3 pb-1 md:hidden animate-fade-in-up animation-delay-900">
                <div className="flex flex-col items-center justify-center py-2.5 px-1.5 rounded-xl bg-zinc-950/70 border border-zinc-800/90 shadow-sm backdrop-blur-md">
                  <span className="font-orbitron text-sm font-black text-indigo-400">3x</span>
                  <span className="font-space text-[8.5px] font-bold text-zinc-300 uppercase tracking-wider text-center mt-0.5">
                    Hackathons
                  </span>
                  <span className="text-[7.5px] font-mono text-zinc-500">Won</span>
                </div>

                <div className="flex flex-col items-center justify-center py-2.5 px-1.5 rounded-xl bg-zinc-950/70 border border-zinc-800/90 shadow-sm backdrop-blur-md">
                  <span className="font-orbitron text-sm font-black text-cyan-400">Dual</span>
                  <span className="font-space text-[8.5px] font-bold text-zinc-300 uppercase tracking-wider text-center mt-0.5">
                    Degree
                  </span>
                  <span className="text-[7.5px] font-mono text-zinc-500">IITM + GNDU</span>
                </div>

                <div className="flex flex-col items-center justify-center py-2.5 px-1.5 rounded-xl bg-zinc-950/70 border border-zinc-800/90 shadow-sm backdrop-blur-md">
                  <span className="font-orbitron text-sm font-black text-emerald-400">Full</span>
                  <span className="font-space text-[8.5px] font-bold text-zinc-300 uppercase tracking-wider text-center mt-0.5">
                    Stack & AI
                  </span>
                  <span className="text-[7.5px] font-mono text-zinc-500">React • Flutter</span>
                </div>
              </div>

            </div>

            {/* Right Side: Hanging Draggable Cyber ID Card (Exclusive to Laptops & Desktops) */}
            <div className="hidden md:flex md:col-span-5 w-full h-[360px] lg:h-[400px] xl:h-[450px] items-center justify-center relative select-none overflow-visible">
              <HangingIdCard />
            </div>

          </div>

          {/* Downward Scroll Prompter (Visible on both mobile & desktop) */}
          <button
            onClick={() => handleScrollTo("about")}
            className="absolute bottom-2 sm:bottom-4 md:bottom-6 flex flex-col items-center gap-1.5 sm:gap-2 group cursor-pointer transition-all z-10 opacity-90 hover:opacity-100"
          >
            <span className="font-space text-[8.5px] sm:text-[9px] font-bold tracking-[0.22em] text-zinc-400 group-hover:text-zinc-200 transition-colors">
              SCROLL TO EXPLORE
            </span>
            <div className="w-4 h-7 sm:w-5 sm:h-8 rounded-full border border-zinc-700/80 group-hover:border-zinc-400 bg-zinc-950/40 transition-colors flex justify-center p-1 sm:p-1.5 shadow-sm">
              <div className="w-1 h-1.5 rounded-full bg-zinc-300 group-hover:bg-white animate-bounce" />
            </div>
          </button>

        </section>
      </AnimatedShaderHero>

      {/* FULL SCREEN RETRO-FUTURISTIC TERMINAL BOOT-UP READOUT OVERLAY */}
      <AnimatePresence>
        {isTerminalOpen && (
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black backdrop-blur-none p-4 sm:p-6 select-none"
          >
            {/* Scanning terminal CRT grid line overlay effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,6px_100%] pointer-events-none z-10 opacity-30" />
            
            {/* Glowing spot lamp ambient backdrop behind terminal console */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

            {/* Terminal Window frame */}
            <motion.div
              data-lenis-prevent
              initial={{ scale: 0.95, y: 15, filter: "blur(6px)" }}
              animate={{ scale: 1, y: 0, filter: "blur(0)" }}
              exit={{ scale: 0.95, y: 15, filter: "blur(6px)" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl h-[85vh] max-h-[600px] bg-zinc-950 border border-zinc-900 rounded-2xl flex flex-col overflow-hidden shadow-2xl z-20"
            >
              
              {/* Console Header Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/40 border-b border-zinc-900/60 select-none">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="font-space text-[10px] font-extrabold tracking-widest text-zinc-400">
                    AGAMPREET_SINGH // SECURE_SHELL // PORT_8080
                  </span>
                </div>
                
                {/* Control Action nodes */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={restartTerminalSequence}
                    title="Restart Sequence"
                    className="p-1 rounded text-zinc-650 hover:text-white transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>
                  <button
                    onClick={closeTerminal}
                    title="Close Console"
                    className="p-1 rounded text-zinc-650 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Console Body Terminal readout outputs */}
              <div 
                data-lenis-prevent
                className="flex-1 p-5 sm:p-6 overflow-y-auto font-mono text-[10px] sm:text-xs leading-relaxed text-zinc-350 space-y-1.5 scrollbar-thin select-text selection:bg-indigo-950 selection:text-indigo-300"
              >
                {visibleText.map((line, idx) => (
                  <div key={idx} className={`${
                    !line ? "" :
                    line.startsWith("==") || line.startsWith("--") ? "text-zinc-600 font-bold" :
                    line.includes("ACADEMIC") || line.includes("WORK EXPERIENCE") || line.includes("SYSTEM ARCHITECTURES") || line.includes("OPERATIONS") || line.includes("SYSTEM PHILOSOPHY") ? "text-indigo-400 font-extrabold tracking-wider pt-2" :
                    line.includes("[OK]") || line.includes("[DECRYPTED]") ? "text-emerald-400 font-bold" :
                    "text-zinc-300"
                  }`}>
                    {line || <span className="block h-2" />}
                  </div>
                ))}
                
                {/* Blinking CLI cursor node */}
                {!isFinished && (
                  <div className="flex items-center gap-0.5">
                    <span className="w-1.5 h-3.5 bg-indigo-400 animate-pulse inline-block" />
                  </div>
                )}
              </div>

              {/* Console Footer Control Node */}
              <div className="px-4 py-3 bg-zinc-900/20 border-t border-zinc-900/60 select-none flex items-center justify-between text-[8px] font-mono text-zinc-650">
                <span className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${isFinished ? "bg-emerald-500" : "bg-indigo-500 animate-ping"}`} />
                  {isFinished ? "STATUS: CONSOLE_READ_READY" : "STATUS: TRANSMITTING_DATA_NODES"}
                </span>
                <span>PRESS [ESC] TO CLOSE SESSION</span>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
