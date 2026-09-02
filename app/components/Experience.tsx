"use client";

import React, { useState } from "react";
import { soundManager } from "../lib/sound";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  ChevronRight,
  ExternalLink,
  Globe
} from "lucide-react";

interface Role {
  title: string;
  year: string;
  desc: string[];
  skills: string[];
}

interface TimelineEvent {
  organization: string;
  shortName: string;
  website: string;
  websiteLabel?: string;
  status: "ACTIVE" | "ARCHIVED";
  themeColor: string; // Tailwind class color mapping
  glowColor: string; // Inline drop shadow color
  roles: Role[];
}

const EXPERIENCES_DATA: TimelineEvent[] = [
  {
    organization: "TAlpha",
    shortName: "TAlpha",
    website: "https://talpha.in/",
    status: "ACTIVE",
    themeColor: "violet",
    glowColor: "rgba(168, 85, 247, 0.2)",
    roles: [
      {
        title: "Junior Developer",
        year: "Aug 2026 — Present",
        desc: [
          "Building mutual fund research & intelligence dashboards with Next.js",
          "Designing type-safe PostgreSQL schemas & queries with Prisma",
          "Deploying containerized backend microservices using Docker"
        ],
        skills: ["Prisma", "Docker", "Tailwind CSS", "PostgreSQL", "Next.js", "TypeScript"],
      }
    ]
  },
  {
    organization: "Gurmat Darbar",
    shortName: "Gurmat Darbar",
    website: "https://gurmatdarbar.com/",
    status: "ACTIVE",
    themeColor: "indigo",
    glowColor: "rgba(129, 140, 248, 0.2)",
    roles: [
      {
        title: "Developer",
        year: "Apr 2026 — Present",
        desc: [
          "Architecting modern responsive web interfaces with Next.js & React",
          "Designing clean digital experiences and custom Tailwind CSS UI",
          "Improving frontend performance, component modularity and UX"
        ],
        skills: ["Next.js", "React.js", "Tailwind CSS", "UI/UX Design", "Web Development"],
      }
    ]
  },
  {
    organization: "VTAP",
    shortName: "VTAP",
    website: "https://www.tischtap.com/",
    status: "ARCHIVED",
    themeColor: "cyan",
    glowColor: "rgba(6, 182, 212, 0.2)",
    roles: [
      {
        title: "Web Developer",
        year: "Mar 2026 — Apr 2026",
        desc: [
          "Developed responsive web interfaces using HTML5, CSS3, and JavaScript",
          "Implemented interactive DOM logic and client-side web components",
          "Optimized cross-browser performance and mobile compatibility"
        ],
        skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Web Development"],
      }
    ]
  },
  {
    organization: "CESS",
    shortName: "CESS",
    website: "https://spectra.cess-gndu.com/",
    websiteLabel: "View Details",
    status: "ARCHIVED",
    themeColor: "emerald",
    glowColor: "rgba(52, 211, 153, 0.2)",
    roles: [
      {
        title: "Finance Head",
        year: "Aug 2025 — Aug 2026",
        desc: [
          "Directed budget allocation & logistics for 170+ hackathon participants",
          "Engineered financial models and expense tracking in Excel & Sheets",
          "Managed event budgeting and sponsorship operations for tech fests"
        ],
        skills: ["Team Leadership", "Budget Optimization", "Event Management", "Excel & Sheets"],
      }
    ]
  }
];

export default function Experience() {
  const [activeTab, setActiveTab] = useState(0);


  const activeExp = EXPERIENCES_DATA[activeTab];

  const handleTabClick = (index: number) => {
    if (activeTab === index) return;
    setActiveTab(index);
    soundManager.playClick(1000 + index * 100);
  };



  return (
    <section id="experience" className="relative w-full bg-[#09090b] pt-8 md:pt-12 pb-12 md:pb-16 px-4 md:px-0">
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center justify-center space-y-3 mb-8 md:mb-10 z-10 px-2 md:px-4">
            <h2 className="font-orbitron text-3xl sm:text-5xl font-extrabold tracking-widest text-white uppercase select-none leading-tight">
              MY{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-indigo-200 to-zinc-400">
                EXPERIENCE
              </span>
            </h2>
            <p className="font-sora text-[11px] sm:text-xs text-zinc-400 max-w-lg text-center leading-relaxed">
              Work history and production engineering experience
            </p>
          </div>
        }
      >
        {/* Main Dashboard Layout inside tilted card */}
        <div className="w-full h-full flex flex-col md:flex-row bg-zinc-950/40 backdrop-blur-md text-zinc-100 font-sora border border-zinc-800/80 rounded-2xl overflow-hidden shadow-2xl">
          
          {/* LEFT SIDEBAR: Organization Navigation */}
          <div className="w-full md:w-[32%] border-b md:border-b-0 md:border-r border-zinc-800/80 p-4 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible md:overflow-y-auto gap-2 md:gap-2.5 shrink-0 select-none custom-scrollbar scrollbar-thin">
            {EXPERIENCES_DATA.map((exp, index) => {
              const isActive = activeTab === index;
              
              // Dynamic themes
              const activeBorderColor = 
                exp.themeColor === "indigo" ? "border-indigo-500/30 bg-indigo-950/20" :
                exp.themeColor === "emerald" ? "border-emerald-500/30 bg-emerald-950/20" :
                exp.themeColor === "purple" ? "border-purple-500/30 bg-purple-950/20" :
                "border-cyan-500/30 bg-cyan-950/20";

              const activeIndicator = 
                exp.themeColor === "indigo" ? "bg-indigo-400" :
                exp.themeColor === "emerald" ? "bg-emerald-400" :
                exp.themeColor === "purple" ? "bg-purple-400" :
                "bg-cyan-400";

              return (
                <button
                  key={exp.organization}
                  onClick={() => handleTabClick(index)}
                  onMouseEnter={() => soundManager.playHoverClick(850)}
                  className={`flex-1 md:flex-initial flex items-center gap-3 px-4 py-3 text-left border rounded-xl transition-all duration-300 cursor-pointer whitespace-nowrap md:whitespace-normal shrink-0 ${
                    isActive
                      ? `${activeBorderColor} text-white shadow-md`
                      : "border-zinc-800/60 bg-zinc-950/40 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 hover:bg-zinc-900/40"
                  }`}
                >
                  {/* Left Indicator Tag */}
                  <div className={`hidden md:block w-1.5 h-6 rounded-full transition-all duration-300 shrink-0 ${
                    isActive ? activeIndicator : "bg-zinc-800"
                  }`} />

                  <div className="flex flex-col space-y-0.5">
                    <span className="font-space text-xs sm:text-sm font-bold tracking-tight">
                      {exp.shortName}
                    </span>
                    <span className="text-[10.5px] text-zinc-400 font-sora font-medium truncate max-w-[140px]">
                      {exp.roles[0]?.title}
                    </span>
                  </div>

                  {isActive && (
                    <ChevronRight className="hidden md:block w-4 h-4 ml-auto text-zinc-400" />
                  )}
                </button>
              );
            })}
          </div>

          {/* RIGHT DETAILS PANE: Full Node Info */}
          <div className="flex-1 p-5 md:p-7 overflow-y-auto flex flex-col h-[26rem] md:h-full custom-scrollbar">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0)" }}
                exit={{ opacity: 0, x: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.25 }}
                className="flex flex-col space-y-5 h-full"
              >
                {/* Header Node Info */}
                <div className="border-b border-zinc-800/80 pb-4 space-y-3">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    {/* Left: Status Badge */}
                    <div className="flex items-center gap-2">
                      {activeExp.status === "ACTIVE" ? (
                        <span className="flex items-center gap-1.5 text-[9.5px] font-mono font-bold tracking-wider text-emerald-400 bg-emerald-950/40 px-2.5 py-1 border border-emerald-500/30 rounded-md uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block shrink-0" />
                          STATUS: ONGOING
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-[9.5px] font-mono font-bold tracking-wider text-zinc-400 bg-zinc-900/90 px-2.5 py-1 border border-zinc-800 rounded-md uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 inline-block shrink-0" />
                          STATUS: ARCHIVED
                        </span>
                      )}
                    </div>

                    {/* Right: Clean Professional Website Link Button */}
                    {activeExp.website && (
                      <a
                        href={activeExp.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => soundManager.playHoverClick(950)}
                        className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 font-sora text-xs font-bold tracking-tight transition-all duration-200 shadow-sm shrink-0 active:scale-[0.97]"
                      >
                        <span>{activeExp.websiteLabel || "Visit Website"}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-zinc-800 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    )}
                  </div>

                  <h3 className="font-space text-xl md:text-2xl font-extrabold text-white leading-snug">
                    {activeExp.organization}
                  </h3>
                </div>

                {/* Body Roles Content */}
                <div className="flex-1 space-y-6">
                  {activeExp.roles.map((role, rIndex) => (
                    <div 
                      key={role.title} 
                      className={`space-y-3 pb-5 ${
                        rIndex < activeExp.roles.length - 1 ? "border-b border-zinc-800/60" : ""
                      }`}
                    >
                      {/* Role header */}
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className={`p-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800 shrink-0 ${
                            activeExp.themeColor === "indigo" ? "text-indigo-400" :
                            activeExp.themeColor === "emerald" ? "text-emerald-400" :
                            activeExp.themeColor === "purple" ? "text-purple-400" :
                            "text-cyan-400"
                          }`}>
                            <Briefcase className="w-4 h-4" />
                          </div>
                          <span className="font-space text-sm sm:text-base font-bold text-white tracking-wide">
                            {role.title}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] sm:text-[10.5px] font-semibold text-zinc-300 bg-zinc-900/90 px-3 py-1 rounded-lg border border-zinc-800 shadow-sm">
                          {role.year}
                        </span>
                      </div>

                      {/* Bullet point accomplishments */}
                      <ul className="space-y-2.5 pl-1">
                        {role.desc.map((bullet, bIndex) => (
                          <li 
                            key={bIndex} 
                            className="flex items-start gap-2.5 text-zinc-200 font-sora text-xs sm:text-sm leading-relaxed group"
                          >
                            <span className={`font-mono text-[9px] mt-1 shrink-0 select-none ${
                              activeExp.themeColor === "indigo" ? "text-indigo-400" :
                              activeExp.themeColor === "emerald" ? "text-emerald-400" :
                              activeExp.themeColor === "purple" ? "text-purple-400" :
                              "text-cyan-400"
                            }`}>
                              [#]
                            </span>
                            <span className="group-hover:text-white transition-colors">
                              {bullet}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Skill tags block */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {role.skills.map((skill) => {
                          const tagColor = 
                            activeExp.themeColor === "indigo" ? "border-indigo-500/30 bg-indigo-950/20 text-indigo-300 hover:border-indigo-400 hover:text-white" :
                            activeExp.themeColor === "emerald" ? "border-emerald-500/30 bg-emerald-950/20 text-emerald-300 hover:border-emerald-400 hover:text-white" :
                            activeExp.themeColor === "purple" ? "border-purple-500/30 bg-purple-950/20 text-purple-300 hover:border-purple-400 hover:text-white" :
                            "border-cyan-500/30 bg-cyan-950/20 text-cyan-300 hover:border-cyan-400 hover:text-white";

                          return (
                            <span
                              key={skill}
                              className={`px-2.5 py-1 border text-[10px] font-mono tracking-wider rounded-md font-bold uppercase transition-all duration-300 shrink-0 ${tagColor}`}
                            >
                              {skill}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </ContainerScroll>

      {/* Styled webkit scrollbar overlay for the experience panel */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(9, 9, 11, 0.2);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(39, 39, 42, 0.4);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(63, 63, 70, 0.6);
        }
      `}</style>
    </section>
  );
}
