"use client";

import React, { useState, useEffect } from "react";
import { soundManager } from "../lib/sound";

const NAV_LINKS = [
  { id: "about",      label: "About"      },
  { id: "skills",     label: "Skills"      },
  { id: "projects",   label: "Projects"    },
  { id: "experience", label: "Experience"  },
  { id: "activity",   label: "Activity"    },
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
          ? "bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/60 shadow-[0_1px_20px_rgba(0,0,0,0.4)]"
          : "bg-zinc-950/40 backdrop-blur-md border-b border-zinc-800/30"
      } px-6 sm:px-10 py-0 flex items-center justify-between h-14`}
    >
      {/* Logo / Brand */}
      <button
        onClick={() => handleLinkClick("about")}
        className="font-orbitron text-[11px] font-black tracking-[0.25em] text-white uppercase hover:text-indigo-400 transition-colors duration-300 cursor-pointer shrink-0"
      >
        AG<span className="text-indigo-400">.</span>
      </button>

      {/* Navigation center links */}
      <div className="hidden md:flex items-center gap-1 font-space text-[9.5px] font-bold tracking-[0.15em] uppercase">
        {NAV_LINKS.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleLinkClick(item.id)}
              className={`relative px-3 py-[18px] cursor-pointer transition-colors duration-200 group ${
                isActive ? "text-white" : "text-zinc-500 hover:text-zinc-200"
              }`}
            >
              {item.label}

              {/* Animated underline — slides in from left on hover, stays solid when active */}
              <span
                className={`absolute bottom-0 left-3 right-3 h-[2px] bg-indigo-500 rounded-full transition-all duration-300 origin-left ${
                  isActive
                    ? "scale-x-100 opacity-100"
                    : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-60"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Right side: Audio + CTA */}
      <div className="flex items-center gap-2.5">
        {/* Sound toggle */}
        <button
          onClick={handleSoundToggle}
          onMouseEnter={() => soundManager.playClick(1000)}
          title="Toggle Ambient Audio"
          className={`px-3 py-1.5 border font-space text-[8.5px] font-bold tracking-widest rounded-sm transition-all duration-200 cursor-pointer ${
            isMuted
              ? "border-zinc-800 text-zinc-600 bg-transparent hover:border-zinc-600 hover:text-zinc-400"
              : "border-indigo-500/40 text-indigo-400 bg-indigo-950/10 hover:border-indigo-400"
          }`}
        >
          {isMuted ? "🔇 Muted" : "🔊 Audio"}
        </button>

        {/* Get In Touch CTA — frosted glass, matches hero design system */}
        <button
          onClick={() => handleLinkClick("contact")}
          onMouseEnter={() => soundManager.playClick(1000)}
          className="hidden sm:flex items-center gap-1.5 h-8 px-4 bg-zinc-900/60 hover:bg-indigo-950/30 backdrop-blur-sm border border-zinc-700/60 hover:border-indigo-500/60 text-zinc-300 hover:text-white font-space text-[8.5px] font-bold tracking-[0.18em] uppercase rounded-sm transition-all duration-300 hover:shadow-[0_0_14px_rgba(99,102,241,0.2)] cursor-pointer"
        >
          Get In Touch
        </button>
      </div>
    </nav>
  );
}
