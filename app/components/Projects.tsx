"use client";

import React from "react";
import { soundManager } from "../lib/sound";
import { WovenCanvas } from "@/components/ui/woven-light-hero";

interface Project {
  title: string;
  desc: string;
  role: string;
  tech: string[];
  stats: string;
}

const PROJECTS_DATA: Project[] = [
  {
    title: "Gurmat Darbar App",
    role: "Mobile Developer",
    desc: "Designed and developed a cross-platform mobile application dedicated to Gurmat Darbar. Integrated custom widget layouts and responsive screens to streamline the user interface.",
    tech: ["Flutter", "Dart", "UI/UX Design", "Mobile Development"],
    stats: "Mobile Application",
  },
  {
    title: "Tischtap (VTAP Internship)",
    role: "Web Developer Intern",
    desc: "Contributed to building the user interface of Tischtap, a smart QR & NFC-based restaurant platform. Built responsive interfaces for digital menus and dining ordering flows.",
    tech: ["Next.js", "React.js", "Tailwind CSS", "NFC Integrations"],
    stats: "Web Platform",
  },
  {
    title: "CESS Tech Fest Platform",
    role: "Finance Head & Organizer",
    desc: "Managed the budgeting, resource allocation, and logistical workflow for a 3-day Tech Fest and 30+ hour Hackathon. Maintained operational metrics for 170+ participants across 50 teams.",
    tech: ["Excel", "Google Sheets", "Financial Modeling", "Leadership"],
    stats: "Event Management",
  },
  {
    title: "Hackathon Solutions",
    role: "Full Stack Developer",
    desc: "Built collaborative web and data prototypes during intensive 36-hour coding sprints. Focused on responsive layouts and localized API integrations. Winner of 2 local hackathons.",
    tech: ["Python", "JavaScript", "React JS", "Git / GitHub"],
    stats: "Award-Winning Prototypes",
  },
];

export default function Projects() {
  const handleCardHover = (index: number | null) => {
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

      {/* 2. Dark glass overlay to keep text completely readable */}
      <div className="absolute inset-0 bg-[#09090b]/85 backdrop-blur-[1px] z-0 pointer-events-none" />

      {/* 3. Foreground content wrapper */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Title block */}
        <div className="w-full text-left mb-12 border-b border-zinc-800/60 pb-4">
          <h2 className="font-space text-2xl font-bold text-white tracking-tight">
            Projects
          </h2>
          <p className="font-sora text-xs text-zinc-500 mt-1 uppercase tracking-wider">
            Selected software applications and platforms
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {PROJECTS_DATA.map((project, index) => {
            return (
              <div
                key={project.title}
                onMouseEnter={() => handleCardHover(index)}
                onMouseLeave={() => handleCardHover(null)}
                className="linear-card p-6 flex flex-col justify-between min-h-[260px] border border-zinc-800 bg-zinc-900/10 rounded-xl"
              >
                <div className="space-y-3">
                  {/* Meta stats */}
                  <div className="flex items-center justify-between text-[9px] font-space tracking-widest text-zinc-500 font-bold uppercase select-none">
                    <span>{project.stats}</span>
                    <span className="text-indigo-400/80">Active Track</span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-space text-base font-bold text-white">
                      {project.title}
                    </h3>
                    <div className="font-space text-[10px] font-bold text-zinc-400 uppercase">
                      Role: {project.role}
                    </div>
                  </div>

                  <p className="font-sora text-xs leading-relaxed text-zinc-400">
                    {project.desc}
                  </p>
                </div>

                {/* Badges */}
                <div className="mt-6 pt-4 border-t border-zinc-800/50 flex flex-wrap gap-1.5 items-center">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 border border-zinc-800 bg-zinc-950/40 text-[9px] font-space font-medium tracking-wider rounded text-zinc-500"
                    >
                      {t}
                    </span>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
