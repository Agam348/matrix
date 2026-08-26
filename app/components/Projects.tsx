"use client";

import React from "react";
import { motion } from "framer-motion";
import { soundManager } from "../lib/sound";
import { WovenCanvas } from "@/components/ui/woven-light-hero";
import { ExternalLink } from "lucide-react";

interface Project {
  title: string;
  desc: string;
  role: string;
  tech: string[];
  stats: string;
  link?: string;
}

const PROJECTS_DATA: Project[] = [
  {
    title: "Gurmat Darbar",
    role: "Developer",
    desc: "Developed the official website and contributed to the Android mobile application. Focused on implementing clean user flows, UI/UX design and cross-platform integrations.",
    tech: ["Flutter", "Dart", "Next.js", "React.js", "UI/UX Design"],
    stats: "Web & Android App",
    link: "https://www.gurmatdarbar.com/",
  },
  {
    title: "VTAP Website & Platforms",
    role: "Web Developer",
    desc: "Worked on the development and optimization of the VTAP website and built responsive user interfaces for client websites.",
    tech: ["Next.js", "React.js", "Tailwind CSS", "NFC Integrations", "Web Development"],
    stats: "Web Platform",
  },
];

export default function Projects() {
  const handleCardHover = (index: number | null) => {
    if (typeof window !== "undefined" && !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    if (index !== null) {
      soundManager.playClick(1000 + index * 25);
    }
  };

  return (
    <section
      id="projects"
      className="relative w-full min-h-screen py-24 px-6 sm:px-12 overflow-hidden flex items-center justify-center border-y border-zinc-900/60 bg-zinc-950/10 z-0"
    >
      {/* 1. Full-screen WebGL Woven Silk Canvas Backdrop */}
      <WovenCanvas />

      {/* 2. Dark glass overlay */}
      <div className="absolute inset-0 bg-[#09090b]/85 backdrop-blur-[1px] z-0 pointer-events-none" />

      {/* Ambient glow blobs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-600/5 blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-violet-600/5 blur-[80px] pointer-events-none z-0" />

      {/* 3. Foreground content wrapper */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        
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
            Selected software applications and platforms
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {PROJECTS_DATA.map((project, index) => {
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                onMouseEnter={() => handleCardHover(index)}
                onMouseLeave={() => handleCardHover(null)}
                className="mobile-no-hover group relative p-6 flex flex-col justify-between min-h-[260px] border border-zinc-800/60 hover:border-indigo-500/40 bg-zinc-900/20 hover:bg-indigo-950/10 rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.08)] cursor-default"
              >
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-xl pointer-events-none">
                  <div className="absolute top-0 right-0 w-px h-8 bg-gradient-to-b from-indigo-500/40 to-transparent" />
                  <div className="absolute top-0 right-0 h-px w-8 bg-gradient-to-l from-indigo-500/40 to-transparent" />
                </div>

                <div className="space-y-3">
                  {/* Meta stats */}
                  <div className="flex items-center justify-between text-[9px] font-space tracking-widest text-zinc-600 font-bold uppercase select-none">
                    <span className="px-2 py-0.5 border border-zinc-800 rounded-sm bg-zinc-950/60">{project.stats}</span>
                    <span className="text-indigo-400/70 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                      Active
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-space text-base font-bold text-white group-hover:text-indigo-100 transition-colors duration-300 flex items-center gap-1.5">
                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-indigo-400 flex items-center gap-1.5 transition-colors"
                          onClick={(e) => {
                            soundManager.playClick(900);
                            e.stopPropagation();
                          }}
                        >
                          {project.title}
                          <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
                        </a>
                      ) : (
                        project.title
                      )}
                    </h3>
                    <div className="font-space text-[10px] font-bold text-indigo-400/70 uppercase tracking-wider">
                      {project.role}
                    </div>
                  </div>

                  <p className="font-sora text-xs leading-relaxed text-zinc-500">
                    {project.desc}
                  </p>
                </div>

                {/* Badges */}
                <div className="mt-6 pt-4 border-t border-zinc-800/40 flex flex-wrap gap-1.5 items-center">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 border border-indigo-900/50 bg-indigo-950/30 text-[9px] font-space font-medium tracking-wider rounded-sm text-indigo-300/70 group-hover:text-indigo-300 group-hover:border-indigo-700/50 transition-colors duration-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
