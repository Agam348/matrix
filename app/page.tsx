"use client";

import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import BackgroundGrid from "./components/BackgroundGrid";
import CustomCursor from "./components/CustomCursor";
import IntroLoader from "./components/IntroLoader";
import MobileBlockGate from "./components/MobileBlockGate";
import { DottedSurface } from "@/components/ui/dotted-surface";
import Hero from "./components/Hero";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Activity from "./components/Activity";
import Contact from "./components/Contact";
import { soundManager } from "./lib/sound";
import Lenis from "lenis";

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

  // Initialize high-performance Lenis smooth scrolling engine on pointer devices.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const isMobileWidth = window.matchMedia("(max-width: 1024px)").matches;

    if (prefersReducedMotion || isCoarsePointer || isMobileWidth) {
      (window as unknown as { lenis: unknown }).lenis = undefined;
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium cubic easeOutExpo easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
    });

    (window as unknown as { lenis: unknown }).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      (window as unknown as { lenis: unknown }).lenis = undefined;
    };
  }, []);

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center bg-[#09090b] select-none text-zinc-100 overflow-x-hidden">
      {/* 1. Mobile Experience Gate (Visible strictly on mobile / tablet screens < 1024px) */}
      <MobileBlockGate />

      {/* 2. Full-Fidelity Desktop & Laptop Portfolio Experience (Rendered on screens >= 1024px) */}
      <div className="hidden lg:flex flex-col items-center w-full">
        <IntroLoader />

        {/* Background Layer */}
        <BackgroundGrid />

        {/* Interactive Custom Mouse Cursor with trailing radial glow backplate */}
        <CustomCursor />

        {/* Global Navigation controls */}
        <Navbar />

        {/* Hero Landing - Edge-to-Edge full laptop width */}
        <Hero />

        {/* Full-Screen Immersive Biography Landing */}
        <About />

        {/* Dynamic sections assembly with expanded premium organic vertical spacing */}
        <div className="w-full max-w-7xl mx-auto z-10 space-y-32 sm:space-y-40">
          {/* Tech Stack */}
          <TechStack />

          {/* Projects with high-end screenshot mockups */}
          <Projects />

          {/* Experience Path */}
          <Experience />

          {/* Contribution Matrix with live GitHub API events sync */}
          <Activity />

          {/* Communication Nodes */}
          <Contact />
        </div>

        {/* Page Footer (Centered premium typographic footer over 3D Dotted Surface) */}
        <footer className="relative w-full border-t border-zinc-900/40 bg-zinc-950/10 py-20 mt-32 overflow-hidden z-10 select-none text-zinc-500 font-space text-[10px] tracking-wider">
          {/* Ambient Dark Overlay to protect legibility and provide depth */}
          <div className="absolute inset-0 bg-[#09090b]/80 backdrop-blur-[0.5px] z-0 pointer-events-none" />

          {/* WebGL 3D Dotted Surface Backdrop */}
          <DottedSurface className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40" />

          {/* Content Container (Centered layout) */}
          <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center justify-center text-center space-y-4">
            {/* Copyright notice */}
            <div className="text-[10px] text-zinc-400 font-bold tracking-[0.2em] font-space uppercase">
              © 2026 AGAMPREET SINGH. ALL RIGHTS RESERVED.
            </div>

            {/* Social Links divided by high-tech slashes */}
            <div className="flex items-center justify-center flex-wrap gap-4 text-[9px] font-bold font-space tracking-[0.25em] text-zinc-650 uppercase">
              <a
                href="https://github.com/Agam348"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-white transition-colors duration-300"
              >
                GITHUB
              </a>
              <span className="text-zinc-800 font-normal select-none">{"//"}</span>
              <a
                href="https://www.linkedin.com/in/Agam17"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-white transition-colors duration-300"
              >
                LINKEDIN
              </a>
              <span className="text-zinc-800 font-normal select-none">{"//"}</span>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=agampreetsingh173@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-white transition-colors duration-300"
              >
                MAIL
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
