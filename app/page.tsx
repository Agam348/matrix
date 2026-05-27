"use client";

import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import BackgroundGrid from "./components/BackgroundGrid";
import CustomCursor from "./components/CustomCursor";
import { DottedSurface } from "@/components/ui/dotted-surface";
import Hero from "./components/Hero";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Activity from "./components/Activity";
import Contact from "./components/Contact";
import { soundManager } from "./lib/sound";

export default function Home() {
  // Trigger baseline system sound initialization on first click
  useEffect(() => {
    const handleFirstInteraction = () => {
      soundManager.startDrone();
      window.removeEventListener("click", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction);

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      soundManager.stopDrone();
    };
  }, []);

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center bg-[#09090b] select-none text-zinc-100 overflow-x-hidden">
      {/* Background Layer */}
      <BackgroundGrid />

      {/* Interactive Custom Mouse Cursor */}
      <CustomCursor />

      {/* Global Navigation controls */}
      <Navbar />

      {/* Hero Landing - Edge-to-Edge full laptop width */}
      <Hero />

      {/* Dynamic sections assembly */}
      <div className="w-full max-w-7xl mx-auto z-10 space-y-4">
        {/* Biography */}
        <About />

        {/* Tech Stack */}
        <TechStack />

        {/* Projects */}
        <Projects />

        {/* Experience Path */}
        <Experience />

        {/* Contribution Matrix */}
        <Activity />

        {/* Communication Nodes */}
        <Contact />
      </div>

      {/* Page Footer (WebGL Undulating 3D Particle Wave Backdrop) */}
      <footer className="relative w-full h-[280px] flex flex-col items-center justify-center border-t border-zinc-900 bg-zinc-950/15 overflow-hidden z-0 select-none text-center font-space text-[10px] text-zinc-600 tracking-wider">
        
        {/* Ambient Dark Overlay to protect legibility and provide depth */}
        <div className="absolute inset-0 bg-[#09090b]/40 backdrop-blur-[0.5px] z-0 pointer-events-none" />

        {/* WebGL 3D Dotted Surface Backdrop (Rendered over the dark overlay for full visual brightness!) */}
        <DottedSurface className="absolute inset-0 w-full h-full pointer-events-none z-0" />

        {/* Copyright Texts */}
        <div className="relative z-10 space-y-2">
          <div className="text-white font-orbitron font-bold tracking-widest text-[11px] mb-2 uppercase drop-shadow-[0_0_10px_rgba(99,102,241,0.4)]">
            MATRIX // OUTPOST
          </div>
          <div>© 2026 AGAMPREET SINGH. ALL RIGHTS RESERVED.</div>
          <div className="text-[9px] text-zinc-700 mt-1">BUILT WITH NEXT.JS, REACT THREE FIBER & TAILWIND CSS</div>
        </div>

      </footer>
    </main>
  );
}
