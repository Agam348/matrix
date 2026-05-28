"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
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
      className="relative w-full py-32 px-6 sm:px-12 overflow-hidden flex items-center justify-center bg-transparent z-0"
    >
      {/* 1. Full-screen WebGL Cybernetic Grid Backdrop */}
      <CyberneticGridShader />

      {/* 2. Dark glass overlay to keep text completely readable */}
      <div className="absolute inset-0 bg-[#09090b]/90 backdrop-blur-[1px] z-0 pointer-events-none" />

      {/* 3. Foreground content wrapper */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Title block */}
        <div className="w-full text-left mb-16 border-b border-zinc-900/60 pb-5">
          <motion.div
            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-1"
          >
            <span className="w-1 h-7 bg-gradient-to-b from-cyan-400 to-indigo-500 rounded-full shrink-0" />
            <h2 className="font-orbitron text-3xl sm:text-4xl font-extrabold tracking-widest uppercase">
              <span className="text-white">TECH </span><span className="text-indigo-400">STACK</span>
            </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-space text-xs text-zinc-500 mt-2 uppercase tracking-wider pl-4"
          >
            Core languages, frameworks, and engineering tools
          </motion.p>
        </div>

        {/* Filter Tabs - Subtly Bordered */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full flex flex-wrap gap-2 mb-12 select-none"
        >
          {["all", "languages", "web", "mobile", "tools"].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-1.5 border font-space text-[9px] font-bold tracking-widest rounded-sm uppercase transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? "border-indigo-500/60 bg-indigo-950/30 text-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.15)]"
                  : "border-zinc-800/60 bg-transparent text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Tech Grid - 100% borderless and card-free! */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8 w-full"
        >
          {filteredTech.map((tech) => (
            <motion.div
              layout
              key={tech.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4 }}
              onMouseEnter={() => soundManager.playClick(900 + Math.random() * 200)}
              className="group relative flex flex-col justify-start gap-2 py-3 pl-3 border-l border-transparent hover:border-indigo-500/40 bg-transparent hover:bg-indigo-950/10 hover:scale-[1.02] transition-all duration-300 rounded-r-sm"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-lg select-none filter grayscale group-hover:grayscale-0 transition-all duration-300">
                  {tech.icon}
                </span>
                
                <h3 className="font-space text-xs font-bold text-zinc-200 group-hover:text-indigo-300 transition-colors duration-300">
                  {tech.name}
                </h3>
              </div>
              
              <p className="font-sora text-[10px] leading-relaxed text-zinc-500 group-hover:text-zinc-400 transition-colors max-w-[260px]">
                {tech.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
