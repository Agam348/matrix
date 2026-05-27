"use client";

import React from "react";
import dynamic from "next/dynamic";
import { soundManager } from "../lib/sound";
import AnimatedShaderHero from "@/components/ui/animated-shader-hero";
import { LiquidButton, MetalButton } from "@/components/ui/liquid-glass-button";

import HangingIdCard from "@/components/ui/hanging-id-card";

export default function Hero() {
  const handleScrollTo = (id: string) => {
    soundManager.playClick(900);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatedShaderHero className="relative min-h-screen w-full flex flex-col items-center justify-center">
      
      {/* Overlay section container */}
      <section
        id="home"
        className="w-full flex flex-col items-center justify-center pt-28 pb-16 px-6 sm:px-12 overflow-hidden select-none"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full z-10 max-w-6xl mx-auto">
          
          {/* Left Side: Premium Text Intro */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            {/* Animated High-tech Trust Badge */}
            <div className="animate-fade-in-down">
              <div className="flex items-center gap-2 px-4 py-2 bg-indigo-950/20 backdrop-blur-md border border-indigo-500/25 rounded-full text-xs font-space tracking-widest font-semibold uppercase text-indigo-300">
                <span className="text-indigo-400">✨</span>
                <span>Double Academic Path</span>
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="font-orbitron text-5xl sm:text-7xl font-extrabold uppercase tracking-tight text-white select-none leading-none animate-fade-in-up animation-delay-200">
                AGAMPREET <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-indigo-200 to-zinc-400 font-extrabold">
                  SINGH
                </span>
              </h1>
              
              <p className="font-space text-base sm:text-lg text-zinc-300 font-semibold tracking-wide max-w-xl animate-fade-in-up animation-delay-400">
                Computer Science & Engineering Scholar at GNDU <br className="hidden sm:inline" />
                & Data Science Scholar at IIT Madras
              </p>
            </div>

            <p className="font-sora text-sm sm:text-base leading-relaxed text-zinc-400 max-w-lg animate-fade-in-up animation-delay-600">
              Engineering modern web applications and mobile frameworks. Building clean, structured code and exploring data analytics to solve practical real-world problems.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row gap-5 items-center justify-center lg:justify-start w-full sm:w-auto pt-4 animate-fade-in-up animation-delay-800">
              <LiquidButton
                onClick={() => handleScrollTo("projects")}
                onMouseEnter={() => soundManager.playClick(1000)}
                className="text-white border border-zinc-700 hover:border-zinc-500 rounded-full font-space text-xs font-bold tracking-wider hover:scale-105 transition-all duration-300 uppercase cursor-pointer"
                size="xl"
              >
                View My Work
              </LiquidButton>
              <MetalButton
                onClick={() => handleScrollTo("about")}
                onMouseEnter={() => soundManager.playClick(1000)}
                variant="default"
                className="font-space text-xs font-bold tracking-wider uppercase h-12 w-full sm:w-auto px-8"
              >
                Read Biography
              </MetalButton>
            </div>

          </div>

          {/* Right Side: Hanging Draggable Cyber ID Card */}
          <div className="lg:col-span-5 w-full h-[380px] lg:h-[450px] flex items-center justify-center relative select-none">
            {/* Subtle glow layer behind card */}
            <div className="absolute w-64 h-64 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
            <HangingIdCard />
          </div>

        </div>

        {/* Downward Scroll Prompter */}
        <button
          onClick={() => handleScrollTo("about")}
          className="absolute bottom-6 flex flex-col items-center gap-2 group cursor-pointer transition-opacity z-10"
        >
          <span className="font-space text-[9px] font-bold tracking-[0.2em] text-zinc-500 group-hover:text-zinc-300 transition-colors">
            SCROLL TO EXPLORE
          </span>
          <div className="w-5 h-8 rounded-full border border-zinc-700 group-hover:border-zinc-500 transition-colors flex justify-center p-1.5">
            <div className="w-1 h-1 rounded-full bg-zinc-500 group-hover:bg-zinc-300 animate-bounce" />
          </div>
        </button>

      </section>

    </AnimatedShaderHero>
  );
}
