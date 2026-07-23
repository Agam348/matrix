"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { soundManager } from "../lib/sound";

interface SkillItem {
  name: string;
  logo: string;
  logoClassName?: string;
  isPrimary?: boolean;
}

const SKILLS_DATA: SkillItem[] = [
  {
    name: "React JS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    isPrimary: true,
  },
  {
    name: "Next JS",
    logo: "/next.svg",
    logoClassName: "brightness-0 invert",
    isPrimary: true,
  },
  {
    name: "Tailwind CSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    isPrimary: true,
  },
  {
    name: "Python",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    isPrimary: true,
  },
  {
    name: "Java",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  },
  {
    name: "HTML",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  },
  {
    name: "CSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  },
  {
    name: "Flask",
    logo: "https://cdn.simpleicons.org/flask/white",
  },
  {
    name: "SQL",
    logo: "https://cdn.simpleicons.org/sqlite/33B3E3",
  },
  {
    name: "Flutter",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
    isPrimary: true,
  },
  {
    name: "Firebase",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",
  },
  {
    name: "Git",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  },
  {
    name: "GitHub",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
    logoClassName: "brightness-0 invert",
  },
  {
    name: "Codex",
    logo: "/codex-logo.png",
  },
];

export default function TechStack() {
  // Split skills into 3 rows for parallax spacing
  const row1 = SKILLS_DATA.filter((_, idx) => idx % 3 === 0);
  const row2 = SKILLS_DATA.filter((_, idx) => idx % 3 === 1);
  const row3 = SKILLS_DATA.filter((_, idx) => idx % 3 === 2);

  // Custom shuffles of the row items to prevent identical items from appearing adjacent to each other
  const row1Shuffled = [row1[2], row1[0], row1[3], row1[1], row1[4]]; // HTML, React JS, SQL, JavaScript, Git
  const row2Shuffled = [row2[2], row2[0], row2[3], row2[1], row2[4]]; // CSS, Next JS, Flutter, Python, GitHub
  const row3Shuffled = [row3[2], row3[0], row3[3], row3[1], row3[4]]; // Flask, Tailwind CSS, Firebase, Java, Codex

  // Quadruple items with alternating shuffles to prevent gaps on ultra-wide screens while avoiding adjacent duplicates
  const duplicatedRow1 = [...row1, ...row1Shuffled, ...row1, ...row1Shuffled];
  const duplicatedRow2 = [...row2, ...row2Shuffled, ...row2, ...row2Shuffled];
  const duplicatedRow3 = [...row3, ...row3Shuffled, ...row3, ...row3Shuffled];

  interface Particle {
    id: number;
    size: number;
    x: number;
    y: number;
    duration: number;
    delay: number;
  }

  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const list = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: Math.random() * 5 + 3,
      x: Math.random() * 100,
      y: Math.random() * 70 + 20,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 4,
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(list);
  }, []);

  return (
    <section
      id="skills"
      className="relative w-full py-20 md:py-28 px-6 sm:px-12 overflow-hidden flex items-center justify-center bg-transparent z-0"
    >
      {/* Moving Ambient Blue Gradients */}
      <motion.div
        animate={{
          x: ["-20%", "20%", "-20%"],
          y: ["-10%", "30%", "-10%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/8 blur-[130px] pointer-events-none z-0"
      />
      <motion.div
        animate={{
          x: ["20%", "-20%", "20%"],
          y: ["30%", "-10%", "30%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/6 blur-[110px] pointer-events-none z-0"
      />

      {/* Faint Cyberpunk Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.04)_1px,transparent_1px)] bg-[size:45px_45px] pointer-events-none z-0" />

      {/* Subtle Light Streaks */}
      <motion.div
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/4 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent pointer-events-none z-0"
      />
      <motion.div
        animate={{
          x: ["100%", "-100%"],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-1/3 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/15 to-transparent pointer-events-none z-0"
      />

      {/* Floating Glowing Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          animate={{
            y: ["0px", "-400px"],
            opacity: [0, 0.7, 0],
            x: ["0px", `${(p.id % 2 === 0 ? 1 : -1) * 35}px`],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
          className="absolute rounded-full bg-blue-500/20 blur-[1px] pointer-events-none z-0"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
        />
      ))}

      {/* Dark overlay backdrop to keep contrast */}
      <div className="absolute inset-0 bg-[#09090b]/85 pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <h2 className="font-space text-5xl sm:text-6xl md:text-7xl font-black tracking-normal text-white leading-none">
            Skills
          </h2>
        </motion.div>

        {/* Infinite marquee row wrapper with standard spacing (gap-10) */}
        <div className="relative w-full overflow-hidden flex flex-col gap-10 select-none pointer-events-auto">
          {/* Side gradients */}
          <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#09090b] via-[#09090b]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#09090b] via-[#09090b]/80 to-transparent z-10 pointer-events-none" />

          {/* Row 1: Moves Left (18 sec) */}
          <div className="w-full overflow-hidden">
            <motion.div
              animate={{
                x: ["0%", "-50%"],
              }}
              transition={{
                ease: "linear",
                duration: 18,
                repeat: Infinity,
              }}
              className="flex gap-4 w-max whitespace-nowrap"
            >
              {duplicatedRow1.map((skill, idx) => (
                <div
                  key={`${skill.name}-r1-${idx}`}
                  onMouseEnter={() => soundManager.playHoverClick(1000)}
                  className={`flex items-center gap-2.5 px-5 py-2 border rounded-[18px] bg-zinc-950/75 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] cursor-pointer group ${
                    skill.isPrimary 
                      ? "border-blue-500/35 text-white" 
                      : "border-zinc-800/80 text-zinc-400 hover:text-white"
                  }`}
                >
                  <Image
                    src={skill.logo}
                    alt={`${skill.name} logo`}
                    width={22}
                    height={22}
                    unoptimized
                    className={`h-[22px] w-[22px] object-contain transition-transform duration-300 group-hover:rotate-12 ${skill.logoClassName ?? ""}`}
                  />
                  <span className="font-space text-[10px] font-extrabold tracking-[0.15em] uppercase select-none">
                    {skill.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Row 2: Moves Right (22 sec) */}
          <div className="w-full overflow-hidden">
            <motion.div
              animate={{
                x: ["-50%", "0%"],
              }}
              transition={{
                ease: "linear",
                duration: 22,
                repeat: Infinity,
              }}
              className="flex gap-4 w-max whitespace-nowrap"
            >
              {duplicatedRow2.map((skill, idx) => (
                <div
                  key={`${skill.name}-r2-${idx}`}
                  onMouseEnter={() => soundManager.playHoverClick(1000)}
                  className={`flex items-center gap-2.5 px-5 py-2 border rounded-[18px] bg-zinc-950/75 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] cursor-pointer group ${
                    skill.isPrimary 
                      ? "border-blue-500/35 text-white" 
                      : "border-zinc-800/80 text-zinc-400 hover:text-white"
                  }`}
                >
                  <Image
                    src={skill.logo}
                    alt={`${skill.name} logo`}
                    width={22}
                    height={22}
                    unoptimized
                    className={`h-[22px] w-[22px] object-contain transition-transform duration-300 group-hover:rotate-12 ${skill.logoClassName ?? ""}`}
                  />
                  <span className="font-space text-[10px] font-extrabold tracking-[0.15em] uppercase select-none">
                    {skill.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Row 3: Moves Left (28 sec) */}
          <div className="w-full overflow-hidden">
            <motion.div
              animate={{
                x: ["0%", "-50%"],
              }}
              transition={{
                ease: "linear",
                duration: 28,
                repeat: Infinity,
              }}
              className="flex gap-4 w-max whitespace-nowrap"
            >
              {duplicatedRow3.map((skill, idx) => (
                <div
                  key={`${skill.name}-r3-${idx}`}
                  onMouseEnter={() => soundManager.playHoverClick(1000)}
                  className={`flex items-center gap-2.5 px-5 py-2 border rounded-[18px] bg-zinc-950/75 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] cursor-pointer group ${
                    skill.isPrimary 
                      ? "border-blue-500/35 text-white" 
                      : "border-zinc-800/80 text-zinc-400 hover:text-white"
                  }`}
                >
                  <Image
                    src={skill.logo}
                    alt={`${skill.name} logo`}
                    width={22}
                    height={22}
                    unoptimized
                    className={`h-[22px] w-[22px] object-contain transition-transform duration-300 group-hover:rotate-12 ${skill.logoClassName ?? ""}`}
                  />
                  <span className="font-space text-[10px] font-extrabold tracking-[0.15em] uppercase select-none">
                    {skill.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
