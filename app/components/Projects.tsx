"use client";

import React from "react";
import { motion } from "framer-motion";
import { WovenCanvas } from "@/components/ui/woven-light-hero";
import { Sparkles, Terminal, Code2 } from "lucide-react";

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative w-full min-h-[70vh] py-24 px-6 sm:px-12 overflow-hidden flex items-center justify-center border-y border-zinc-900/60 bg-zinc-950/10 z-0 select-none"
    >
      {/* 1. Full-screen WebGL Woven Silk Canvas Backdrop */}
      <WovenCanvas />

      {/* 2. Dark glass overlay */}
      <div className="absolute inset-0 bg-[#09090b]/85 backdrop-blur-[1px] z-0 pointer-events-none" />

      {/* Ambient glow blobs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-600/5 blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-violet-600/5 blur-[80px] pointer-events-none z-0" />

      {/* 3. Foreground content wrapper */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Title block */}
        <motion.div
          initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full text-left mb-12 border-b border-zinc-800/40 pb-5"
        >
          <div className="flex items-center gap-3 mb-1">
            <span className="w-1 h-6 bg-gradient-to-b from-indigo-400 to-violet-500 rounded-full shrink-0" />
            <h2 className="font-orbitron text-3xl sm:text-4xl font-extrabold tracking-widest uppercase">
              <span className="text-white">PROJ</span><span className="text-indigo-400">ECTS</span>
            </h2>
          </div>
          <p className="font-space text-xs text-zinc-500 mt-2 uppercase tracking-wider pl-4">
            Production applications & digital architecture
          </p>
        </motion.div>

        {/* Coming Soon Cyber Hologram Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full relative p-8 sm:p-12 rounded-2xl border border-indigo-500/20 bg-gradient-to-b from-zinc-900/60 to-zinc-950/80 backdrop-blur-md shadow-[0_0_50px_rgba(99,102,241,0.08)] flex flex-col items-center text-center overflow-hidden"
        >
          {/* Cyber scanner grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b20_1px,transparent_1px),linear-gradient(to_bottom,#18181b20_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

          {/* Top telemetry bar */}
          <div className="relative z-10 flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-950/20 text-amber-300 font-space text-[10px] tracking-widest uppercase font-semibold mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>DEPLOYMENT PIPELINE // ACTIVE</span>
          </div>

          {/* Holographic Icon Badge */}
          <div className="relative z-10 w-16 h-16 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.2)] mb-6">
            <Code2 className="w-8 h-8 text-indigo-400 animate-pulse" />
          </div>

          {/* Main Title */}
          <h3 className="relative z-10 font-orbitron text-2xl sm:text-4xl font-black tracking-wider uppercase text-white mb-4">
            COMING <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-amber-300">SOON</span>
          </h3>

          {/* Subtitle Description */}
          <p className="relative z-10 max-w-xl text-sm font-space text-zinc-400 leading-relaxed mb-8">
            Next-generation full-stack software applications, real-time 3D WebGL interfaces and capital market platforms are currently in active development.
          </p>

          {/* Interactive Progress Bar */}
          <div className="relative z-10 w-full max-w-md space-y-2">
            <div className="flex items-center justify-between text-[10px] font-space text-zinc-500 uppercase tracking-widest">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3 h-3 text-indigo-400" />
                SYS_PIPELINE: COMPILING_REPOSITORIES
              </span>
              <span className="text-indigo-400 font-bold">88.4%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-zinc-800/80 overflow-hidden p-0.5 border border-zinc-700/40">
              <motion.div
                initial={{ width: "0%" }}
                whileInView={{ width: "88.4%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-sky-400 to-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
              />
            </div>
          </div>

          {/* Bottom Tags */}
          <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-2">
            {["Next.js 16", "WebGL2 Shaders", "Three.js", "Financial APIs", "Microservices"].map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded border border-zinc-800 bg-zinc-900/40 text-[10px] font-space font-medium text-zinc-400 tracking-wider uppercase flex items-center gap-1"
              >
                <Sparkles className="w-2.5 h-2.5 text-indigo-400" />
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
