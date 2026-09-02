"use client";

import React, { useState, useEffect } from "react";
import { soundManager } from "../lib/sound";

const NAV_LINKS = [
  { id: "about",      label: "About"      },
  { id: "skills",     label: "Skills"      },
  { id: "experience", label: "Experience"  },
  { id: "contact",    label: "Contact"     },
];

export default function Navbar() {
  const [isMuted,   setIsMuted]   = useState(true);
  const [activeId,  setActiveId]  = useState<string>("");
  const [scrolled,  setScrolled]  = useState(false);

  // Sync mute state on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsMuted(soundManager.getMuted()), 0);
    return () => clearTimeout(timer);
  }, []);

  // Track scroll to darken navbar + highlight active section
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine which section is currently in view
      let current = "";
      for (const { id } of NAV_LINKS) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= 120) current = id;
        }
      }
      setActiveId(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSoundToggle = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    soundManager.setMute(nextMute);
    soundManager.playBeep(nextMute ? 300 : 600, 0.1);
  };

  const handleLinkClick = (id: string) => {
    soundManager.playClick(800);
    const lenis = (window as unknown as { lenis?: { scrollTo: (target: string | number) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo(`#${id}`);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-zinc-950/85 backdrop-blur-xl border-b border-zinc-800/70 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-zinc-950/45 backdrop-blur-md border-b border-zinc-800/35"
      } px-6 sm:px-12 lg:px-16 flex items-center justify-between h-14 sm:h-16`}
    >
      {/* Brand logo (Strong) */}
      <button
        onClick={() => handleLinkClick("home")}
        onMouseEnter={() => soundManager.playHoverClick(900)}
        className="flex items-center gap-2.5 font-oxanium text-base sm:text-lg font-extrabold tracking-[0.22em] text-white hover:text-indigo-400 transition-colors cursor-pointer group"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 group-hover:bg-cyan-400 shadow-[0_0_12px_rgba(99,102,241,0.9)] transition-colors duration-300" />
        <span>APS</span>
      </button>

      {/* Navigation center links (Medium / Quieter) */}
      <div className="hidden md:flex items-center gap-1 font-space text-[11px] sm:text-xs font-medium tracking-[0.12em] uppercase">
        {NAV_LINKS.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleLinkClick(item.id)}
              className={`relative px-3.5 py-1.5 cursor-pointer transition-colors duration-200 group ${
                isActive ? "text-white font-bold" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {item.label}

              {/* Animated underline */}
              <span
                className={`absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-300 origin-left ${
                  isActive
                    ? "scale-x-100 opacity-100 shadow-[0_0_8px_rgba(99,102,241,0.8)]"
                    : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-70"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Right side: Audio + CTA (Strong) */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Sound toggle */}
        <button
          onClick={handleSoundToggle}
          onMouseEnter={() => soundManager.playHoverClick(1000)}
          title="Toggle Ambient Audio"
          className={`h-8 sm:h-9 px-3 border font-space text-[9.5px] sm:text-[10.5px] font-bold tracking-wider rounded-lg transition-all duration-300 cursor-pointer flex items-center justify-center ${
            isMuted
              ? "border-zinc-800 text-zinc-500 bg-zinc-900/30 hover:border-zinc-600 hover:text-zinc-300 hover:bg-zinc-800/40"
              : "border-indigo-500/50 text-indigo-400 bg-indigo-950/20 hover:border-indigo-400 hover:shadow-[0_0_12px_rgba(99,102,241,0.25)]"
          }`}
        >
          {isMuted ? "🔇 Muted" : "🔊 Audio"}
        </button>

        {/* Get In Touch CTA */}
        <button
          onClick={() => handleLinkClick("contact")}
          onMouseEnter={() => soundManager.playHoverClick(1000)}
          className="hidden sm:flex items-center justify-center gap-2 h-8 sm:h-9 px-4 sm:px-5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 hover:border-zinc-500 text-zinc-100 hover:text-white font-space text-[10px] sm:text-[11px] font-bold tracking-[0.14em] uppercase rounded-lg transition-all duration-300 shadow-sm cursor-pointer"
        >
          Get In Touch
        </button>
      </div>
    </nav>
  );
}

