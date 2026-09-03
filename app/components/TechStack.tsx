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
  // INNER ORBIT (R = 90px) - Primary Core Frameworks & Languages
  {
    id: "react",
    name: "React.js",
    category: "Web",
    badge: "Core Frontend Engine",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    brandColor: "#00d8ff",
    accentGlow: "rgba(0, 216, 255, 0.35)",
    radius: 90,
    angleDeg: 0,
    note: "Crafting modular component architectures with custom hooks, memoization and high-performance UI state synchronization",
    tags: ["Hooks", "SPA", "Performance"],
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Web",
    badge: "Full-Stack Framework",
    logo: "/next.svg",
    brandColor: "#ffffff",
    accentGlow: "rgba(255, 255, 255, 0.3)",
    radius: 90,
    angleDeg: 60,
    note: "Architecting high-speed production applications using App Router, Server Actions, dynamic SSR and optimized asset delivery",
    tags: ["App Router", "SSR", "Server Actions"],
    logoClassName: "brightness-0 invert",
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Web",
    badge: "Type-Safe Architecture",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    brandColor: "#3178c6",
    accentGlow: "rgba(49, 120, 198, 0.35)",
    radius: 90,
    angleDeg: 120,
    note: "Enforcing strict static typing, robust interfaces and reusable generic schemas across full-stack codebases",
    tags: ["Strict Types", "Generics", "Interfaces"],
  },
  {
    id: "flutter",
    name: "Flutter",
    category: "Mobile",
    badge: "Cross-Platform Mobile",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
    brandColor: "#54c5f8",
    accentGlow: "rgba(84, 197, 248, 0.35)",
    radius: 90,
    angleDeg: 180,
    note: "Engineering fluid 60/120fps native iOS and Android experiences with clean reactive state management",
    tags: ["Mobile", "Dart", "Android / iOS"],
  },
  {
    id: "python",
    name: "Python",
    category: "Backend",
    badge: "Data & Backend Scripting",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    brandColor: "#387eb8",
    accentGlow: "rgba(56, 126, 184, 0.35)",
    radius: 90,
    angleDeg: 240,
    note: "Building statistical analysis pipelines, data processing models and automated backend utilities",
    tags: ["Data Science", "Pandas", "Automation"],
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Backend",
    badge: "Relational Database",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    brandColor: "#4169e1",
    accentGlow: "rgba(65, 105, 225, 0.35)",
    radius: 90,
    angleDeg: 300,
    note: "Designing relational schemas, ACID-compliant transactions, complex SQL queries and index optimizations",
    tags: ["ACID", "Relational", "Indexing"],
  },

  // MIDDLE ORBIT (R = 145px) - Languages, Mobile Engines & Databases
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Web",
    badge: "Design System Styling",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    brandColor: "#38bdf8",
    accentGlow: "rgba(56, 189, 248, 0.35)",
    radius: 145,
    angleDeg: 0,
    note: "Developing custom design token systems, fluid responsive layouts and dark-mode glassmorphic aesthetics",
    tags: ["PostCSS", "Design Tokens", "Glassmorphism"],
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "Web",
    badge: "Modern ES6+ Engine",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    brandColor: "#f7df1e",
    accentGlow: "rgba(247, 223, 30, 0.35)",
    radius: 145,
    angleDeg: 60,
    note: "Writing clean asynchronous execution logic, event-driven DOM controllers and native Web API workflows",
    tags: ["Async/Await", "Event Loop", "Web APIs"],
  },
  {
    id: "prisma",
    name: "Prisma",
    category: "Backend",
    badge: "Type-Safe ORM",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg",
    brandColor: "#5a67d8",
    accentGlow: "rgba(90, 103, 216, 0.35)",
    radius: 145,
    angleDeg: 120,
    note: "Managing declarative database models, automated migration rollouts and end-to-end type-safe queries",
    tags: ["Type-Safe Queries", "Migrations", "Schema"],
    logoClassName: "brightness-0 invert",
  },
  {
    id: "sql",
    name: "SQL",
    category: "Backend",
    badge: "Query Engineering",
    logo: "https://cdn.simpleicons.org/sqlite/33B3E3",
    brandColor: "#33b3e3",
    accentGlow: "rgba(51, 179, 227, 0.35)",
    radius: 145,
    angleDeg: 180,
    note: "Crafting complex relational joins, aggregations, database views and performance-tuned data queries",
    tags: ["Joins", "Aggregation", "Query Tuning"],
  },
  {
    id: "java",
    name: "Java",
    category: "Backend",
    badge: "OOP & Core Systems",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
    brandColor: "#e76f00",
    accentGlow: "rgba(231, 111, 0, 0.35)",
    radius: 145,
    angleDeg: 240,
    note: "Implementing scalable object-oriented software patterns, data structures and core algorithmic logic",
    tags: ["OOP", "Data Structures", "Algorithms"],
  },
  {
    id: "flask",
    name: "Flask",
    category: "Backend",
    badge: "Python Micro-Services",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg",
    brandColor: "#ffffff",
    accentGlow: "rgba(255, 255, 255, 0.25)",
    radius: 145,
    angleDeg: 300,
    note: "Building lightweight REST API endpoints, JWT authentication services and backend micro-integrations",
    tags: ["REST APIs", "Microservices", "Auth"],
    logoClassName: "brightness-0 invert",
  },

  // OUTER ORBIT (R = 200px) - Tools, AI & Cloud Platforms
  {
    id: "antigravity",
    name: "Antigravity",
    category: "Tools",
    badge: "Agentic AI Platform",
    logo: "/antigravity.png",
    brandColor: "#38bdf8",
    accentGlow: "rgba(56, 189, 248, 0.4)",
    radius: 200,
    angleDeg: 0,
    note: "Leveraging agentic AI workflows, multi-step code synthesis and automated refactoring to accelerate development cycles",
    tags: ["Agentic AI", "Code Synthesis", "Automation"],
  },
  {
    id: "codex",
    name: "Codex",
    category: "Tools",
    badge: "AI Engineering",
    logo: "/codex-logo.png",
    brandColor: "#818cf8",
    accentGlow: "rgba(129, 140, 248, 0.35)",
    radius: 200,
    angleDeg: 60,
    note: "Constructing prompt pipelines, automated test suites and context-aware code generation workflows",
    tags: ["LLM Integration", "Prompt Engineering", "Testing"],
  },
  {
    id: "git",
    name: "Git",
    category: "Tools",
    badge: "Version Control",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    brandColor: "#f05032",
    accentGlow: "rgba(240, 80, 50, 0.35)",
    radius: 200,
    angleDeg: 120,
    note: "Managing production git history with semantic atomic commits, collaborative branching models and clean rebase workflows",
    tags: ["Atomic Commits", "Branching", "CI/CD"],
  },
  {
    id: "docker",
    name: "Docker",
    category: "Tools",
    badge: "Containerization",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    brandColor: "#2496ed",
    accentGlow: "rgba(36, 150, 237, 0.4)",
    radius: 200,
    angleDeg: 180,
    note: "Packaging reproducible application environments, writing multi-stage Dockerfiles and orchestrating multi-container stacks with Compose",
    tags: ["Containers", "Multi-Stage Builds", "Compose"],
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "Tools",
    badge: "Edge Deployment",
    logo: "https://cdn.simpleicons.org/vercel/white",
    brandColor: "#ffffff",
    accentGlow: "rgba(255, 255, 255, 0.3)",
    radius: 200,
    angleDeg: 240,
    note: "Configuring continuous deployment pipelines, global edge network caching and serverless cloud functions",
    tags: ["Edge Network", "CI/CD", "Serverless"],
  },
  {
    id: "css3",
    name: "CSS3",
    category: "Web",
    badge: "Animations & Layouts",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    brandColor: "#1572b6",
    accentGlow: "rgba(21, 114, 182, 0.35)",
    radius: 200,
    angleDeg: 300,
    note: "Crafting hardware-accelerated keyframe animations, complex 3D CSS transforms and responsive grid architectures",
    tags: ["3D Transforms", "Keyframes", "Grid / Flex"],
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

  const orbit1Nodes = RADAR_NODES.filter((n) => n.radius === 90);
  const orbit2Nodes = RADAR_NODES.filter((n) => n.radius === 145);
  const orbit3Nodes = RADAR_NODES.filter((n) => n.radius === 200);

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
            node.radius === 90
              ? 360 / 45
              : node.radius === 145
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
                  className={`group relative flex items-center justify-center w-9.5 h-9.5 sm:w-10.5 sm:h-10.5 rounded-xl border transition-all duration-300 ${
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
                      className="absolute -top-1 -right-1 w-2 h-2 rounded-full animate-ping"
                      style={{ backgroundColor: node.brandColor }}
                    />
                  )}

                  <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 flex items-center justify-center pointer-events-none">
                    <Image
                      src={node.logo}
                      alt={`${node.name} logo`}
                      width={22}
                      height={22}
                      unoptimized
                      style={{ width: "auto", height: "auto" }}
                      className={`max-h-5 max-w-5 sm:max-h-5.5 sm:max-w-5.5 object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ${node.logoClassName ?? ""}`}
                    />
                  </div>
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
      className="relative w-full py-6 sm:py-8 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-gradient-to-br from-indigo-600/10 via-sky-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-10 w-[450px] h-[450px] bg-purple-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-4 sm:gap-5">
        
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800/40 pb-3 sm:pb-4">
          <motion.div
            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2.5">
              <span className="w-1 h-7 bg-gradient-to-b from-indigo-400 to-sky-400 rounded-full shrink-0" />
              <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-widest text-white leading-none">
                TECH <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">STACK</span>
              </h2>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex items-center gap-2 self-start md:self-end px-3 py-1 rounded-full bg-zinc-900/60 border border-zinc-800 text-zinc-400 font-space text-[9.5px] font-bold tracking-wider uppercase"
          >
            <Radio className="w-3 h-3 text-indigo-400" />
            <span className="text-zinc-200">{filteredNodes.length} Technologies</span>
          </motion.div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-950/70 border border-zinc-850 backdrop-blur-md">
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
                  className={`px-3 py-1.5 rounded-lg font-space text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-indigo-600 text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                      : "text-zinc-300 hover:text-white hover:bg-zinc-900/80"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsOrbitPaused(!isOrbitPaused);
                soundManager.playClick(isOrbitPaused ? 1100 : 800);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border font-mono text-[8.5px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                isOrbitPaused
                  ? "bg-amber-950/40 border-amber-500/50 text-amber-300 hover:bg-amber-900/40 shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                  : "bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:text-indigo-300 hover:border-indigo-500/40"
              }`}
            >
              {isOrbitPaused ? (
                <>
                  <Play className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                  <span>REVOLUTION: PAUSED</span>
                </>
              ) : (
                <>
                  <Pause className="w-2.5 h-2.5 text-indigo-400 fill-indigo-400" />
                  <span>{hoveredNode ? "ORBIT: LOCKED" : "ORBIT: REVOLVING"}</span>
                </>
              )}
            </button>

            <span className="font-mono text-[8.5px] text-zinc-500 hidden sm:inline-block tracking-wider">
              HOVER TO LOCK
            </span>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center">
          
          {/* LEFT: 2D/3D ORBITAL RADAR CONSTELLATION (Desktop/Tablet/Mobile) */}
          <div className="lg:col-span-7 flex items-center justify-center relative w-full h-[360px] sm:h-[460px] lg:h-[470px] bg-zinc-950/50 border border-zinc-900/80 rounded-2xl p-2 sm:p-3 overflow-hidden backdrop-blur-xl shadow-2xl">
            
            {/* Ambient subtle spotlight inside Radar */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent_65%)] pointer-events-none" />

            {/* Radar Stage Container with Adaptive Mobile Scaling */}
            <div className="relative w-full h-full flex items-center justify-center scale-[0.72] xs:scale-[0.82] sm:scale-90 md:scale-100 origin-center transition-transform pointer-events-auto">
              {/* Radar Crosshairs */}
              <div className="absolute inset-x-0 top-1/2 h-px bg-zinc-900 pointer-events-none" />
              <div className="absolute inset-y-0 left-1/2 w-px bg-zinc-900 pointer-events-none" />

              {/* Rotating Radar Scanner Beam */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[410px] h-[410px] rounded-full pointer-events-none animate-spin [animation-duration:18s]">
                <div className="w-1/2 h-1/2 bg-gradient-to-br from-zinc-500/5 to-transparent rounded-tl-full origin-bottom-right transform rotate-45" />
              </div>

              {/* Concentric Orbital Rings - Clean Minimalist Paths */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] rounded-full border border-zinc-800/80 pointer-events-none" />

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[290px] h-[290px] rounded-full border border-zinc-800/60 border-dashed pointer-events-none" />

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-zinc-900 pointer-events-none" />

              {/* Center Core Node */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-zinc-950 border border-zinc-700 shadow-xl">
                <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-300 mb-0.5" />
                <span className="font-space text-[7.5px] sm:text-[8px] font-black text-white uppercase tracking-wider">
                  CORE
                </span>
                <span className="font-space text-[6px] sm:text-[6.5px] text-indigo-400 font-bold tracking-widest">
                  ACTIVE
                </span>
              </div>

              {/* DYNAMIC PLANETARY REVOLVING ORBIT LAYERS */}
              {renderOrbitGroup(orbit1Nodes)}
              {renderOrbitGroup(orbit2Nodes)}
              {renderOrbitGroup(orbit3Nodes)}
            </div>

          </div>

          <div className="lg:col-span-5 flex flex-col">
            <div className="relative w-full rounded-2xl bg-zinc-950/85 border border-zinc-800/80 overflow-hidden shadow-2xl backdrop-blur-xl p-5 sm:p-6 flex flex-col justify-between h-[440px] sm:h-[460px] lg:h-[470px]">
              
              {/* Details Header Bar */}
              <div className="flex items-center justify-between border-b border-zinc-900 pb-2.5">
                <div className="flex items-center gap-2">
                  <Radar className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="font-space text-[10px] text-zinc-300 uppercase tracking-widest font-bold">
                    Technology Overview
                  </span>
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-indigo-950/50 border border-indigo-500/30 text-indigo-300 font-space text-[8.5px] uppercase font-bold tracking-wider">
                  {activeNode.category}
                </span>
              </div>

              {/* Active Node Detailed Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, x: 8, filter: "blur(4px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0)" }}
                  exit={{ opacity: 0, x: -8, filter: "blur(4px)" }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3.5 my-auto py-1"
                >
                  {/* Title & Brand Icon */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl bg-zinc-900 border flex items-center justify-center p-2 shadow-inner shrink-0"
                      style={{ borderColor: activeNode.brandColor }}
                    >
                      <Image
                        src={activeNode.logo}
                        alt={`${activeNode.name} logo`}
                        width={28}
                        height={28}
                        unoptimized
                        style={{ width: "auto", height: "auto" }}
                        className={`max-h-7 max-w-7 object-contain drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] ${activeNode.logoClassName ?? ""}`}
                      />
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-space text-lg sm:text-xl font-bold text-white tracking-wide">
                          {activeNode.name}
                        </h3>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      </div>
                      <span className="font-space text-[9px] text-indigo-400 font-bold uppercase tracking-wider block">
                        {activeNode.badge}
                      </span>
                    </div>
                  </div>

                  {/* Architecture & Usage Note */}
                  <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                    <p className="font-sora text-xs sm:text-[13px] text-zinc-200 leading-relaxed font-normal">
                      {activeNode.note}
                    </p>
                  </div>

                  {/* Radar Telemetry Metrics */}
                  <div className="grid grid-cols-2 gap-2 font-mono text-[9.5px]">
                    <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-0.5">
                      <span className="text-zinc-400 uppercase block text-[8.5px] font-bold">Orbit Level</span>
                      <span className="text-zinc-100 font-bold font-space text-xs">
                        {activeNode.radius < 110 ? "Orbit 1 (Core)" : activeNode.radius < 170 ? "Orbit 2 (Platform)" : "Orbit 3 (Tools)"}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-0.5">
                      <span className="text-zinc-400 uppercase block text-[8.5px] font-bold">Polar Angle</span>
                      <span className="text-zinc-100 font-bold font-space text-xs">
                        {activeNode.angleDeg}° Azimuth
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="space-y-2 pt-1 border-t border-zinc-800/80">
                    <span className="text-[9px] font-space font-bold uppercase tracking-widest text-zinc-400 block">
                      Core Capabilities
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeNode.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-700/80 text-[9.5px] font-mono text-zinc-200 uppercase tracking-wider font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Card Footer */}
              <div className="pt-2.5 border-t border-zinc-800/80 flex items-center justify-between text-[9px] font-space text-zinc-400 select-none">
                <span className="flex items-center gap-1.5 font-bold text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Production Ready
                </span>
                <span className="text-zinc-500 font-medium">Interactive Constellation</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
