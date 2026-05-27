"use client";

import React, { useState, useEffect } from "react";
import { soundManager } from "../lib/sound";

export default function Navbar() {
  const [isMuted, setIsMuted] = useState(true);

  // Sync mute state on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMuted(soundManager.getMuted());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleSoundToggle = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    soundManager.setMute(nextMute);
    soundManager.playBeep(nextMute ? 300 : 600, 0.1);
  };

  const handleLinkClick = (id: string) => {
    soundManager.playClick(800);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-zinc-950/50 backdrop-blur-md border-b border-zinc-800/80 px-6 py-4 flex items-center justify-between transition-all">
      


      {/* Navigation center links */}
      <div className="hidden md:flex items-center gap-6 font-space text-[10px] font-bold tracking-wider text-zinc-400">
        {[
          { id: "about", label: "About" },
          { id: "skills", label: "Tech Stack" },
          { id: "projects", label: "Projects" },
          { id: "experience", label: "Experience" },
          { id: "activity", label: "Activity" },
          { id: "contact", label: "Contact" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => handleLinkClick(item.id)}
            className="hover:text-white transition-all cursor-pointer py-1"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Navigation Right: Sound & Socials */}
      <div className="flex items-center gap-3">
        {/* Sound toggle button */}
        <button
          onClick={handleSoundToggle}
          onMouseEnter={() => soundManager.playClick(1000)}
          className={`px-3 py-1.5 border font-space text-[9px] font-bold tracking-widest rounded transition-all cursor-pointer ${
            isMuted
              ? "border-zinc-800 text-zinc-500 bg-zinc-900/10 hover:border-zinc-700 hover:text-zinc-300"
              : "border-indigo-500/30 text-indigo-400 bg-indigo-950/10 hover:border-indigo-400 hover:bg-indigo-950/20"
          }`}
          title="Toggle Ambient Audio"
        >
          {isMuted ? "🔇 Audio: Muted" : "🔊 Audio: On"}
        </button>

        {/* Action button */}
        <button
          onClick={() => handleLinkClick("contact")}
          className="hidden sm:inline-block px-4 py-1.5 bg-white text-black text-[10px] font-space font-bold tracking-wider rounded hover:bg-zinc-200 transition-all cursor-pointer"
        >
          Get In Touch
        </button>
      </div>

    </nav>
  );
}
