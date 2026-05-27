"use client";

import React from "react";
import { soundManager } from "../lib/sound";
import { ShaderAnimation } from "@/components/ui/shader-lines";

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full min-h-screen py-24 px-6 sm:px-12 overflow-hidden flex items-center justify-center border-y border-zinc-900/60 bg-zinc-950/10 z-0"
    >
      {/* 1. Full-screen WebGL Shader Lines Backdrop (Covers entire viewport screen) */}
      <ShaderAnimation />

      {/* 2. Ambient dark overlay to protect text legibility */}
      <div className="absolute inset-0 bg-[#09090b]/85 backdrop-blur-[1px] z-0 pointer-events-none" />

      {/* 3. Foreground content grid */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Title Header */}
        <div className="w-full text-left mb-12 border-b border-zinc-800/60 pb-4">
          <h2 className="font-space text-2xl font-bold text-white tracking-tight">
            About Me
          </h2>
          <p className="font-sora text-xs text-zinc-500 mt-1 uppercase tracking-wider">
            Academic foundations and leadership credentials
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full">
          {/* Left: Biography Narrative */}
          <div className="md:col-span-7 space-y-6 flex flex-col justify-center pr-2">
            <h3 className="font-space text-lg font-semibold text-zinc-200">
              Bridging Software Systems & Analytical Intelligence
            </h3>
            <p className="font-sora text-sm leading-relaxed text-zinc-400">
              I am currently pursuing a dual academic path: a **BTech in Computer Science and Engineering** at Guru Nanak Dev University, Amritsar, combined with a **BS in Data Science and Applications** at the Indian Institute of Technology, Madras. 
            </p>
            <p className="font-sora text-sm leading-relaxed text-zinc-400">
              My journey merges standard software architecture principles with modern statistical analysis and data analytics. I am passionate about building practical software tools, mobile applications, and web platforms that solve real-world problems.
            </p>
            <p className="font-sora text-sm leading-relaxed text-zinc-400">
              Beyond engineering, I enjoy organizing technical events and teams. Serving as the **Finance Head of CESS**, I have managed resources and budgets for large hackathons and tech festivals.
            </p>
          </div>

          {/* Right: Structured Linear Cards */}
          <div className="md:col-span-5 flex flex-col gap-4 justify-between">
            
            {/* Card 1: Education */}
            <div 
              onMouseEnter={() => soundManager.playClick(1000)}
              className="linear-card p-5 relative overflow-hidden group border border-zinc-800 bg-zinc-900/10 rounded-xl"
            >
              <h4 className="font-space text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">
                Education
              </h4>
              <div className="space-y-4">
                <div className="space-y-0.5">
                  <div className="font-space text-xs font-bold text-white">
                    BTech in Computer Science & Engineering (CSE)
                  </div>
                  <div className="font-sora text-[10px] text-zinc-500">
                    GNDU Amritsar • 2024 - 2028
                  </div>
                </div>
                <div className="space-y-0.5">
                  <div className="font-space text-xs font-bold text-white">
                    BS in Data Science & Applications
                  </div>
                  <div className="font-sora text-[10px] text-zinc-500">
                    IIT Madras • May 2024 - Aug 2028
                  </div>
                </div>
                <div className="space-y-0.5">
                  <div className="font-space text-xs font-bold text-white">
                    Aspire Leaders Program
                  </div>
                  <div className="font-sora text-[10px] text-zinc-500">
                    Aspire Institute • Aug 2025 - Oct 2025
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Personal Profile Facts */}
            <div 
              onMouseEnter={() => soundManager.playClick(1000)}
              className="linear-card p-5 relative overflow-hidden group border border-zinc-800 bg-zinc-900/10 rounded-xl"
            >
              <h4 className="font-space text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-ping shrink-0" />
                Key Details
              </h4>
              <ul className="space-y-2 font-sora text-xs text-zinc-400">
                <li className="flex justify-between border-b border-zinc-800/40 pb-1.5">
                  <span className="text-zinc-500">Origin</span>
                  <span className="font-semibold text-zinc-300">Tarn Taran, Punjab</span>
                </li>
                <li className="flex justify-between border-b border-zinc-800/40 pb-1.5">
                  <span className="text-zinc-500">Languages</span>
                  <span className="font-semibold text-zinc-300">English, Punjabi, Hindi</span>
                </li>
                <li className="flex justify-between pb-0">
                  <span className="text-zinc-500">Key Awards</span>
                  <span className="font-semibold text-zinc-300">2x Hackathon Winner</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
