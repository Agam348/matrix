"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { soundManager } from "../lib/sound";
import { 
  Radar, 
  Cpu, 
  CheckCircle2, 
  Radio, 
  Play,
  Pause
} from "lucide-react";

interface RadarNode {
  id: string;
  name: string;
  category: "Web" | "Mobile" | "Backend" | "Tools";
  badge: string;
  logo: string;
  brandColor: string;
  accentGlow: string;
  radius: number; // in px from center
  angleDeg: number; // in degrees
  note: string;
  tags: string[];
  logoClassName?: string;
}

const RADAR_NODES: RadarNode[] = [
  // INNER ORBIT (R = 120px) - Primary Core Frameworks & Languages
  {
    id: "react",
    name: "React.js",
    category: "Web",
    badge: "Core Framework",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    brandColor: "#00d8ff",
    accentGlow: "rgba(0, 216, 255, 0.35)",
    radius: 120,
    angleDeg: 0,
    note: "Reactive component hierarchy and concurrent state management",
    tags: ["Hooks", "Virtual DOM", "SPA"],
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Web",
    badge: "App Router & SSR",
    logo: "/next.svg",
    brandColor: "#ffffff",
    accentGlow: "rgba(255, 255, 255, 0.3)",
    radius: 120,
    angleDeg: 60,
    note: "Full-stack server-side rendering, routing & production bundling",
    tags: ["Server Actions", "SSR", "App Router"],
    logoClassName: "brightness-0 invert",
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Web",
    badge: "Typed JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    brandColor: "#3178c6",
    accentGlow: "rgba(49, 120, 198, 0.35)",
    radius: 120,
    angleDeg: 120,
    note: "Static type safety, interfaces, generics & robust scalable architecture",
    tags: ["Type Safety", "Generics", "Interfaces"],
  },
  {
    id: "flutter",
    name: "Flutter",
    category: "Mobile",
    badge: "Cross-Platform",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
    brandColor: "#54c5f8",
    accentGlow: "rgba(84, 197, 248, 0.35)",
    radius: 120,
    angleDeg: 180,
    note: "Custom widget tree rendering and native hybrid compilation",
    tags: ["Mobile UI", "Material", "Android/iOS"],
  },
  {
    id: "python",
    name: "Python",
    category: "Backend",
    badge: "Data Science & AI",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    brandColor: "#387eb8",
    accentGlow: "rgba(56, 126, 184, 0.35)",
    radius: 120,
    angleDeg: 240,
    note: "Empirical statistical modeling, data analysis & ML pipelines",
    tags: ["Data Modeling", "Pandas", "Scripting"],
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Backend",
    badge: "Relational DBMS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    brandColor: "#4169e1",
    accentGlow: "rgba(65, 105, 225, 0.35)",
    radius: 120,
    angleDeg: 300,
    note: "ACID transactions, relational schemas, indexing & query tuning",
    tags: ["ACID", "Relational", "Indexing"],
  },

  // MIDDLE ORBIT (R = 185px) - Languages, Mobile Engines & Databases
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Web",
    badge: "Design Tokens",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    brandColor: "#38bdf8",
    accentGlow: "rgba(56, 189, 248, 0.35)",
    radius: 185,
    angleDeg: 0,
    note: "Modern utility styling, @theme design tokens and fluid layouts",
    tags: ["PostCSS", "Responsive", "Tokens"],
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "Web",
    badge: "ES6+ Full-Stack",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    brandColor: "#f7df1e",
    accentGlow: "rgba(247, 223, 30, 0.35)",
    radius: 185,
    angleDeg: 60,
    note: "Asynchronous Web APIs, event loop execution & DOM controllers",
    tags: ["Promises", "Async/Await", "Web APIs"],
  },
  {
    id: "prisma",
    name: "Prisma",
    category: "Backend",
    badge: "Type-Safe ORM",
    logo: "https://cdn.simpleicons.org/prisma/white",
    brandColor: "#ffffff",
    accentGlow: "rgba(255, 255, 255, 0.25)",
    radius: 185,
    angleDeg: 120,
    note: "Type-safe database client, schema modeling & automated migrations",
    tags: ["ORM", "Type-Safe DB", "Migrations"],
  },
  {
    id: "sql",
    name: "SQL",
    category: "Backend",
    badge: "Relational DB",
    logo: "https://cdn.simpleicons.org/sqlite/33B3E3",
    brandColor: "#33b3e3",
    accentGlow: "rgba(51, 179, 227, 0.35)",
    radius: 185,
    angleDeg: 180,
    note: "Relational schema design, normalization & query optimization",
    tags: ["Relational", "Joins", "Indexing"],
  },
  {
    id: "java",
    name: "Java",
    category: "Backend",
    badge: "OOP & Systems",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
    brandColor: "#e76f00",
    accentGlow: "rgba(231, 111, 0, 0.35)",
    radius: 185,
    angleDeg: 240,
    note: "Object-oriented architectures, robust design patterns, data structures & algorithms",
    tags: ["Algorithms", "Data Structures", "JVM"],
  },
  {
    id: "flask",
    name: "Flask",
    category: "Backend",
    badge: "Micro REST APIs",
    logo: "https://cdn.simpleicons.org/flask/white",
    brandColor: "#ffffff",
    accentGlow: "rgba(255, 255, 255, 0.25)",
    radius: 185,
    angleDeg: 300,
    note: "Lightweight Python REST endpoints, routing & microservice backends",
    tags: ["REST", "Routing", "Python"],
  },

  // OUTER ORBIT (R = 250px) - Tools, AI & Cloud Platforms
  {
    id: "antigravity",
    name: "Antigravity",
    category: "Tools",
    badge: "Agentic AI IDE",
    logo: "/antigravity.png",
    brandColor: "#38bdf8",
    accentGlow: "rgba(56, 189, 248, 0.4)",
    radius: 250,
    angleDeg: 0,
    note: "Advanced agentic coding environment, autonomous problem solving & AI pairing",
    tags: ["Agentic AI", "DeepMind", "Automation"],
  },
  {
    id: "codex",
    name: "Codex",
    category: "Tools",
    badge: "AI Engineering",
    logo: "/codex-logo.png",
    brandColor: "#818cf8",
    accentGlow: "rgba(129, 140, 248, 0.35)",
    radius: 250,
    angleDeg: 60,
    note: "Agentic AI development, prompt architecture & automated code generation",
    tags: ["Agentic AI", "Automation", "LLMs"],
  },
  {
    id: "git",
    name: "Git",
    category: "Tools",
    badge: "Version Control",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    brandColor: "#f05032",
    accentGlow: "rgba(240, 80, 50, 0.35)",
    radius: 250,
    angleDeg: 120,
    note: "Atomic commits, branching strategies & rebase workflows",
    tags: ["Branching", "History", "VCS"],
  },
  {
    id: "firebase",
    name: "Firebase",
    category: "Tools",
    badge: "Cloud Services",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",
    brandColor: "#ffca28",
    accentGlow: "rgba(255, 202, 40, 0.35)",
    radius: 250,
    angleDeg: 180,
    note: "Real-time NoSQL databases, user authentication & cloud storage",
    tags: ["Firestore", "Auth", "Hosting"],
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "Tools",
    badge: "Edge Cloud Platform",
    logo: "https://cdn.simpleicons.org/vercel/white",
    brandColor: "#ffffff",
    accentGlow: "rgba(255, 255, 255, 0.3)",
    radius: 250,
    angleDeg: 240,
    note: "Continuous deployment pipelines, edge network routing & serverless functions",
    tags: ["Edge Runtime", "CI/CD", "Serverless"],
  },
  {
    id: "css3",
    name: "CSS3",
    category: "Web",
    badge: "Styling & Animations",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    brandColor: "#1572b6",
    accentGlow: "rgba(21, 114, 182, 0.35)",
    radius: 250,
    angleDeg: 300,
    note: "CSS3 animations, Flexbox/Grid layouts & responsive media queries",
    tags: ["CSS3", "Keyframes", "Flex/Grid"],
  },
];

export default function TechStack() {
  const [selectedNode, setSelectedNode] = useState<RadarNode>(RADAR_NODES[0]);
  const [hoveredNode, setHoveredNode] = useState<RadarNode | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [isOrbitPaused, setIsOrbitPaused] = useState<boolean>(false);
  const [orbitTime, setOrbitTime] = useState<number>(0);

  const activeNode = hoveredNode || selectedNode;

  const filteredNodes = activeCategory === "All"
    ? RADAR_NODES
    : RADAR_NODES.filter((n) => n.category === activeCategory);

  const orbit1Nodes = RADAR_NODES.filter((n) => n.radius === 120);
  const orbit2Nodes = RADAR_NODES.filter((n) => n.radius === 185);
  const orbit3Nodes = RADAR_NODES.filter((n) => n.radius === 250);

  // High-performance 60fps orbital clock loop
  useEffect(() => {
    let animationFrameId: number;
    let lastTimestamp = performance.now();

    const updateOrbit = (now: number) => {
      const deltaSec = (now - lastTimestamp) / 1000;
      lastTimestamp = now;

      if (!isOrbitPaused && !hoveredNode) {
        setOrbitTime((prev) => prev + deltaSec);
      }

      animationFrameId = requestAnimationFrame(updateOrbit);
    };

    animationFrameId = requestAnimationFrame(updateOrbit);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isOrbitPaused, hoveredNode]);

  const handleNodeClick = (node: RadarNode) => {
    setSelectedNode(node);
    soundManager.playClick(1000);
  };

  const renderOrbitGroup = (nodes: RadarNode[]) => {
    return (
      <>
        {nodes.map((node, idx) => {
          const isSelected = activeNode.id === node.id;
          const isFilteredOut = activeCategory !== "All" && node.category !== activeCategory;

          // Planetary speeds: Orbit 1 (45s CW), Orbit 2 (65s CCW), Orbit 3 (90s CW)
          const speedDegPerSec =
            node.radius === 120
              ? 360 / 45
              : node.radius === 185
              ? -(360 / 65)
              : 360 / 90;

          const currentAngleDeg = node.angleDeg + speedDegPerSec * orbitTime;
          const rad = (currentAngleDeg * Math.PI) / 180;
          const xOffset = Number((Math.cos(rad) * node.radius).toFixed(2));
          const yOffset = Number((Math.sin(rad) * node.radius).toFixed(2));

          return (
            <div
              key={node.id}
              suppressHydrationWarning
              className="absolute top-1/2 left-1/2 pointer-events-none z-30"
              style={{
                transform: `translate(calc(-50% + ${xOffset}px), calc(-50% + ${yOffset}px))`,
              }}
            >
              {/* Planet icon card - ALWAYS 100% straight and upright */}
              <div
                className={`transition-all duration-500 ease-out ${
                  isFilteredOut
                    ? "opacity-0 scale-0 pointer-events-none invisible"
                    : "opacity-100 scale-100 pointer-events-auto z-20"
                }`}
              >
                <button
                  disabled={isFilteredOut}
                  onClick={() => !isFilteredOut && handleNodeClick(node)}
                  onMouseEnter={() => {
                    if (!isFilteredOut) {
                      setHoveredNode(node);
                      soundManager.playHoverClick(1000 + idx * 25);
                    }
                  }}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`group relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-2xl border transition-all duration-300 ${
                    isSelected
                      ? "bg-zinc-900 border-indigo-400 scale-125 z-40 shadow-[0_0_25px_rgba(99,102,241,0.6)] cursor-pointer"
                      : "bg-zinc-950/90 border-zinc-800/80 hover:border-zinc-500 hover:scale-115 hover:bg-zinc-900 z-10 cursor-pointer"
                  }`}
                  style={{
                    boxShadow: isSelected && !isFilteredOut ? `0 0 25px ${node.accentGlow}` : undefined,
                  }}
                >
                  {/* Brand indicator dot on selected */}
                  {isSelected && !isFilteredOut && (
                    <span
                      className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full animate-ping"
                      style={{ backgroundColor: node.brandColor }}
                    />
                  )}

                  <Image
                    src={node.logo}
                    alt={`${node.name} logo`}
                    width={20}
                    height={20}
                    unoptimized
                    style={{ width: "auto", height: "auto" }}
                    className={`max-h-5 max-w-5 sm:max-h-6 sm:max-w-6 object-contain ${node.logoClassName ?? ""}`}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <section
      id="skills"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-gradient-to-br from-indigo-600/10 via-sky-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-10 w-[450px] h-[450px] bg-purple-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-10">
        
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800/40 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3">
              <span className="w-1 h-8 bg-gradient-to-b from-indigo-400 to-sky-400 rounded-full shrink-0" />
              <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-widest text-white leading-none">
                TECH <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">STACK</span>
              </h2>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2 self-start md:self-end px-3.5 py-1.5 rounded-full bg-zinc-900/60 border border-zinc-800 text-zinc-400 font-space text-[10px] font-bold tracking-wider uppercase"
          >
            <Radio className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span className="text-zinc-200">RADAR ACTIVE // {filteredNodes.length} NODES TRACKED</span>
          </motion.div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 p-1 rounded-xl bg-zinc-950/70 border border-zinc-850 backdrop-blur-md">
            {["All", "Web", "Backend", "Mobile", "Tools"].map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    soundManager.playClick(900);
                    if (cat !== "All") {
                      const firstMatch = RADAR_NODES.find((n) => n.category === cat);
                      if (firstMatch) {
                        setSelectedNode(firstMatch);
                      }
                    }
                  }}
                  onMouseEnter={() => soundManager.playHoverClick(950)}
                  className={`px-3 py-1.5 rounded-lg font-space text-[9.5px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-indigo-600 text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900/60"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                setIsOrbitPaused(!isOrbitPaused);
                soundManager.playClick(isOrbitPaused ? 1100 : 800);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-mono text-[9px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                isOrbitPaused
                  ? "bg-amber-950/40 border-amber-500/50 text-amber-300 hover:bg-amber-900/40 shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                  : "bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:text-indigo-300 hover:border-indigo-500/40"
              }`}
            >
              {isOrbitPaused ? (
                <>
                  <Play className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span>REVOLUTION: PAUSED</span>
                </>
              ) : (
                <>
                  <Pause className="w-3 h-3 text-indigo-400 fill-indigo-400" />
                  <span>{hoveredNode ? "ORBIT: LOCKED" : "ORBIT: REVOLVING"}</span>
                </>
              )}
            </button>

            <span className="font-mono text-[9px] text-zinc-500 hidden sm:inline-block">
              HOVER TO LOCK
            </span>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT: 2D/3D ORBITAL RADAR CONSTELLATION (Desktop/Tablet) */}
          <div className="lg:col-span-7 flex items-center justify-center relative w-full h-[560px] sm:h-[600px] lg:h-[640px] bg-zinc-950/50 border border-zinc-900/80 rounded-3xl p-4 overflow-hidden backdrop-blur-xl shadow-2xl">
            
            {/* Ambient Radial Spotlight inside Radar */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.08),transparent_65%)] pointer-events-none" />

            {/* Radar Crosshairs */}
            <div className="absolute inset-x-0 top-1/2 h-px bg-zinc-900/80 pointer-events-none" />
            <div className="absolute inset-y-0 left-1/2 w-px bg-zinc-900/80 pointer-events-none" />

            {/* Rotating Radar Scanner Beam */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[510px] h-[510px] rounded-full pointer-events-none animate-spin [animation-duration:16s]">
              <div className="w-1/2 h-1/2 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-tl-full origin-bottom-right transform rotate-45" />
            </div>

            {/* Concentric Orbital Rings - Clean Minimalist Paths */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] rounded-full border border-indigo-500/25 pointer-events-none" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[370px] h-[370px] rounded-full border border-zinc-800/80 border-dashed pointer-events-none" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-zinc-900 pointer-events-none" />

            {/* Center Core Node */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-zinc-950 border-2 border-indigo-500/60 shadow-[0_0_30px_rgba(99,102,241,0.4)]">
              <div className="absolute inset-0 rounded-full bg-indigo-500/20 animate-ping [animation-duration:3s]" />
              <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400 mb-1" />
              <span className="font-space text-[8px] sm:text-[9px] font-black text-white uppercase tracking-wider">
                CORE
              </span>
              <span className="font-mono text-[6.5px] text-indigo-400 tracking-widest">
                SYS_ONLINE
              </span>
            </div>

            {/* DYNAMIC PLANETARY REVOLVING ORBIT LAYERS */}
            {renderOrbitGroup(orbit1Nodes)}
            {renderOrbitGroup(orbit2Nodes)}
            {renderOrbitGroup(orbit3Nodes)}

          </div>

          <div className="lg:col-span-5 flex flex-col">
            <div className="relative w-full rounded-3xl bg-zinc-950/85 border border-zinc-800/80 overflow-hidden shadow-2xl backdrop-blur-xl p-6 sm:p-7 flex flex-col justify-between min-h-[460px] sm:min-h-[520px]">
              
              {/* HUD Header Bar */}
              <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                <div className="flex items-center gap-2">
                  <Radar className="w-4 h-4 text-indigo-400 animate-spin [animation-duration:10s]" />
                  <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-bold">
                    TELEMETRY_HUD // NODE_DATA
                  </span>
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-indigo-950/50 border border-indigo-500/30 text-indigo-300 font-mono text-[8.5px] uppercase font-bold">
                  {activeNode.category} SECTOR
                </span>
              </div>

              {/* Active Node Detailed Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, x: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0)" }}
                  exit={{ opacity: 0, x: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6 my-auto py-4"
                >
                  {/* Title & Brand Icon */}
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl bg-zinc-900 border flex items-center justify-center p-3 shadow-inner shrink-0"
                      style={{ borderColor: activeNode.brandColor }}
                    >
                      <Image
                        src={activeNode.logo}
                        alt={`${activeNode.name} logo`}
                        width={28}
                        height={28}
                        unoptimized
                        style={{ width: "auto", height: "auto" }}
                        className={`max-h-7 max-w-7 object-contain ${activeNode.logoClassName ?? ""}`}
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-space text-xl sm:text-2xl font-bold text-white tracking-wide">
                          {activeNode.name}
                        </h3>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      </div>
                      <span className="font-mono text-[9.5px] text-indigo-400 font-bold uppercase tracking-wider block">
                        {activeNode.badge}
                      </span>
                    </div>
                  </div>

                  {/* Architecture & Usage Note */}
                  <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-900">
                    <p className="font-sora text-xs text-zinc-300 leading-relaxed">
                      {activeNode.note}
                    </p>
                  </div>

                  {/* Radar Telemetry Metrics */}
                  <div className="grid grid-cols-2 gap-3 font-mono text-[9px]">
                    <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-900 space-y-0.5">
                      <span className="text-zinc-500 uppercase block">Orbit Level</span>
                      <span className="text-zinc-200 font-bold font-space text-[11px]">
                        {activeNode.radius < 150 ? "Orbit 1" : activeNode.radius < 250 ? "Orbit 2" : "Orbit 3"}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-900 space-y-0.5">
                      <span className="text-zinc-500 uppercase block">Polar Angle</span>
                      <span className="text-zinc-200 font-bold font-space text-[11px]">
                        {activeNode.angleDeg}° Azimuth
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="space-y-2 pt-2 border-t border-zinc-900">
                    <span className="text-[8.5px] font-space font-bold uppercase tracking-widest text-zinc-500 block">
                      Architectural Capabilities
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeNode.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-[8.5px] font-mono text-zinc-300 uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* HUD Footer */}
              <div className="pt-3 border-t border-zinc-900 flex items-center justify-between text-[8px] font-mono text-zinc-500 select-none">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  SENSOR_LOCK: STABLE
                </span>
                <span>SYSTEM_ID: MATRIX_RADAR_V4</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
