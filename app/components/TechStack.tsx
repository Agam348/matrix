"use client";

import React, { useState } from "react";
import { soundManager } from "../lib/sound";
import CyberneticGridShader from "@/components/ui/cybernetic-grid-shader";

interface TechItem {
  name: string;
  desc: string;
  category: "languages" | "web" | "mobile" | "tools";
  icon: string;
}

const TECH_DATA: TechItem[] = [
  // Programming Languages
  {
    name: "Python",
    desc: "Used for data analysis, statistical modeling, and scripting.",
    category: "languages",
    icon: "🐍",
  },
  {
    name: "Java",
    desc: "Object-oriented programming, structures, and systems logic.",
    category: "languages",
    icon: "☕",
  },
  {
    name: "JavaScript",
    desc: "Dynamic application scripts, React builds, and interactive logic.",
    category: "languages",
    icon: "💛",
  },
  // Web Development
  {
    name: "React JS",
    desc: "Component lifecycle management and responsive interfaces.",
    category: "web",
    icon: "⚛️",
  },
  {
    name: "Next JS",
    desc: "Server-side rendering, routing optimization, and fast loading.",
    category: "web",
    icon: "▲",
  },
  {
    name: "Tailwind CSS",
    desc: "Utility-first frameworks for rapid, clean styling layouts.",
    category: "web",
    icon: "🎨",
  },
  // Mobile Development
  {
    name: "Flutter",
    desc: "Cross-platform mobile applications and custom widget UI/UX.",
    category: "mobile",
    icon: "📱",
  },
  // Tools
  {
    name: "Git & GitHub",
    desc: "Version tracking, code reviews, and remote repositories.",
    category: "tools",
    icon: "🐙",
  },
  {
    name: "Canva",
    desc: "Graphic asset creation, branding layouts, and deck styling.",
    category: "tools",
    icon: "✨",
  },
];

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredTech =
    activeCategory === "all"
      ? TECH_DATA
      : TECH_DATA.filter((t) => t.category === activeCategory);

  const handleCategoryChange = (category: string) => {
    soundManager.playBeep(600, 0.08);
    setActiveCategory(category);
  };

  return (
    <section
      id="skills"
      className="relative w-full min-h-screen py-24 px-6 sm:px-12 overflow-hidden flex items-center justify-center border-y border-zinc-900/60 bg-zinc-950/10 z-0"
    >
      {/* 1. Full-screen WebGL Cybernetic Grid Backdrop */}
      <CyberneticGridShader />

      {/* 2. Dark glass overlay to keep text completely readable */}
      <div className="absolute inset-0 bg-[#09090b]/85 backdrop-blur-[1px] z-0 pointer-events-none" />

      {/* 3. Foreground content wrapper */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Title block */}
        <div className="w-full text-left mb-12 border-b border-zinc-800/60 pb-4">
          <h2 className="font-space text-2xl font-bold text-white tracking-tight">
            Tech Stack
          </h2>
          <p className="font-sora text-xs text-zinc-500 mt-1 uppercase tracking-wider">
            Core languages, frameworks, and engineering tools
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="w-full flex flex-wrap gap-2 mb-10 select-none">
          {["all", "languages", "web", "mobile", "tools"].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-1.5 border font-space text-[10px] font-bold tracking-wider rounded uppercase transition-all cursor-pointer ${
                activeCategory === cat
                  ? "border-zinc-300 bg-zinc-800/30 text-white"
                  : "border-zinc-800/60 bg-zinc-900/10 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
          {filteredTech.map((tech) => (
            <div
              key={tech.name}
              onMouseEnter={() => soundManager.playClick(900 + Math.random() * 200)}
              className="linear-card p-5 flex flex-col justify-between gap-3 border border-zinc-800 bg-zinc-900/10 rounded-xl"
            >
              <div className="flex items-center gap-2">
                <span className="text-base select-none">{tech.icon}</span>
                <h3 className="font-space text-sm font-bold text-white">
                  {tech.name}
                </h3>
              </div>
              <p className="font-sora text-xs leading-relaxed text-zinc-400">
                {tech.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
