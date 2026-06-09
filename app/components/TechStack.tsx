"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { GlowCard } from "@/components/ui/spotlight-card";
import { soundManager } from "../lib/sound";

interface SkillItem {
  name: string;
  logo: string;
  logoClassName?: string;
  glowColor?: "blue" | "purple" | "green" | "red" | "orange";
}

const SKILLS_DATA: SkillItem[] = [
  {
    name: "React.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    glowColor: "blue",
  },
  {
    name: "Next.js",
    logo: "/next.svg",
    logoClassName: "brightness-0 invert",
    glowColor: "purple",
  },
  {
    name: "Tailwind CSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    glowColor: "blue",
  },
  {
    name: "TypeScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    glowColor: "blue",
  },
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    glowColor: "orange",
  },
  {
    name: "HTML5",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    glowColor: "orange",
  },
  {
    name: "CSS3",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    glowColor: "blue",
  },
  {
    name: "Python",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    glowColor: "green",
  },
  {
    name: "Java",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
    glowColor: "red",
  },
  {
    name: "Flutter",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
    glowColor: "blue",
  },
  {
    name: "Git",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    glowColor: "orange",
  },
  {
    name: "GitHub",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
    logoClassName: "brightness-0 invert",
    glowColor: "purple",
  },
  {
    name: "GSAP",
    logo: "https://cdn.simpleicons.org/greensock/88CE02",
    glowColor: "green",
  },
  {
    name: "Canva",
    logo: "/canva-logo.svg",
    glowColor: "purple",
  },
];

export default function TechStack() {
  return (
    <section
      id="skills"
      className="relative w-full py-20 md:py-28 px-6 sm:px-12 overflow-hidden flex items-center justify-center bg-transparent z-0"
    >
      <div
        className="absolute inset-0 w-full h-full opacity-35 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(115deg, rgba(255,255,255,0.045), transparent 24%, rgba(99,102,241,0.06) 48%, transparent 72%), radial-gradient(circle, rgba(99, 102, 241, 0.075) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 28px 28px",
        }}
      />

      <div className="absolute inset-0 bg-[#09090b]/86 backdrop-blur-[1px] z-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 sm:mb-14"
        >
          <h2 className="font-space text-5xl sm:text-6xl md:text-7xl font-black tracking-normal text-white leading-none">
            Skills
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS_DATA.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1],
                delay: Math.min(index * 0.035, 0.25),
              }}
              onMouseEnter={() => soundManager.playHoverClick(900 + index * 20)}
              className="relative min-h-[155px] sm:min-h-[210px]"
            >
              <GlowCard
                customSize
                glowColor={skill.glowColor ?? "blue"}
                className="group h-full min-h-[155px] sm:min-h-[210px] flex flex-col items-center justify-center bg-zinc-950/10 transition-all duration-300 hover:bg-white/[0.035]"
              >
                <span className="absolute -top-2.5 -left-1.5 z-10 font-mono text-2xl leading-none text-white select-none">
                  +
                </span>
                <span className="absolute -top-2.5 -right-1.5 z-10 font-mono text-2xl leading-none text-white select-none">
                  +
                </span>
                <span className="absolute -bottom-3 -left-1.5 z-10 font-mono text-2xl leading-none text-white select-none">
                  +
                </span>
                <span className="absolute -bottom-3 -right-1.5 z-10 font-mono text-2xl leading-none text-white select-none">
                  +
                </span>

                <div className="mobile-no-hover absolute inset-0 z-0 bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.07)_45%,transparent_65%)] translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700 pointer-events-none" />

                <h3 className="relative z-10 font-space text-2xl sm:text-4xl font-black text-white tracking-normal text-center leading-none drop-shadow-[0_0_12px_rgba(255,255,255,0.18)]">
                  {skill.name}
                </h3>

                <Image
                  src={skill.logo}
                  alt={`${skill.name} logo`}
                  width={44}
                  height={44}
                  unoptimized
                  className={`mobile-no-hover relative z-10 mt-5 sm:mt-7 h-9 w-9 sm:h-10 sm:w-10 object-contain transition-transform duration-300 group-hover:scale-110 ${
                    skill.logoClassName ?? ""
                  }`}
                />
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
