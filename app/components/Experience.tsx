"use client";

import React, { useState } from "react";
import { soundManager } from "../lib/sound";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, 
  Briefcase, 
  Calendar, 
  Cpu, 
  ChevronRight 
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
  duration: string;
  status: "ACTIVE" | "ARCHIVED";
  themeColor: string; // Tailwind class color mapping
  glowColor: string; // Inline drop shadow color
  roles: Role[];
}

const EXPERIENCES_DATA: TimelineEvent[] = [
  {
    organization: "Gurmat Darbar",
    shortName: "Gurmat Darbar",
    duration: "Apr 2026 — Present",
    status: "ACTIVE",
    themeColor: "indigo",
    glowColor: "rgba(129, 140, 248, 0.2)",
    roles: [
      {
        title: "Developer",
        year: "Apr 2026 — Present",
        desc: [
          "Working on the design and development of the Gurmat Darbar website",
          "Contributing to the development of the Gurmat Darbar Android application",
          "Collaborating with team members to improve functionality and user experience"
        ],
        skills: ["Flutter", "Dart", "UI/UX Design", "Web Development", "Android Development"],
      }
    ]
  },
  {
    organization: "Computer Engineering Student Society (CESS)",
    shortName: "CESS GNDU",
    duration: "Aug 2025 — May 2026",
    status: "ARCHIVED",
    themeColor: "emerald",
    glowColor: "rgba(52, 211, 153, 0.2)",
    roles: [
      {
        title: "Finance Head",
        year: "Aug 2025 — May 2026",
        desc: [
          "Organized a 3-day Tech Fest and 30 hour Hackathon, managing resources for 170+ participants and 50 teams",
          "Utilized Excel and Google Sheets for advanced expense tracking and financial modeling",
          "Managed budgeting and financial planning for multiple student-led events"
        ],
        skills: ["Team Leadership", "Budget Optimization", "Event Management", "Excel & Sheets"],
      }
    ]
  },
  {
    organization: "VTAP",
    shortName: "VTAP",
    duration: "Mar 2026 — Apr 2026",
    status: "ARCHIVED",
    themeColor: "cyan",
    glowColor: "rgba(6, 182, 212, 0.2)",
    roles: [
      {
        title: "Web Developer",
        year: "Mar 2026 — Apr 2026",
        desc: [
          "Worked on the development and design of the VTAP website",
          "Worked on the development and optimization of client websites",
          "Built responsive user interfaces and enhanced custom web layouts"
        ],
        skills: ["Next.js", "React.js", "Tailwind CSS", "NFC Integrations", "UI/UX Design", "Web Development"],
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
    <section id="experience" className="relative w-full bg-[#09090b] py-12 md:py-16 px-4 md:px-0">
      {/* Absolute subtle background lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none z-0" />

      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center justify-center space-y-4 mb-8 md:mb-10 z-10 px-2 md:px-4">
            <div className="font-space text-[9px] font-bold tracking-[0.25em] text-indigo-400 bg-indigo-950/20 px-3 py-1.5 rounded border border-indigo-500/10 uppercase">
              Chronology Node
            </div>
            <h2 className="font-orbitron text-3xl sm:text-5xl font-extrabold tracking-widest text-white uppercase select-none leading-tight">
              MY{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-indigo-200 to-zinc-400">
                EXPERIENCE
              </span>
            </h2>
            <p className="font-sora text-[10px] sm:text-xs text-zinc-500 uppercase tracking-[0.18em] sm:tracking-widest max-w-lg text-center leading-relaxed mt-2">
              Scroll down to adjust perspective & interact with my workspace history console
            </p>
          </div>
        }
      >
        {/* Main Dashboard Layout inside tilted card */}
        <div className="w-full h-full flex flex-col md:flex-row bg-zinc-950/20 backdrop-blur-md text-zinc-100 font-sora border border-zinc-900/30 rounded-2xl overflow-hidden">
          
          {/* LEFT SIDEBAR: Organization Navigation */}
          <div className="w-full md:w-[32%] border-b md:border-b-0 md:border-r border-zinc-900/40 p-4 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible md:overflow-y-auto gap-2 md:gap-2.5 shrink-0 select-none custom-scrollbar scrollbar-thin">
            
            {/* Terminal Sidebar Header (Desktop only) */}
            <div className="hidden md:flex items-center gap-2 px-3 py-2 text-zinc-500 border-b border-zinc-900/40 pb-3 mb-2 w-full">
              <Terminal className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span className="font-space text-[9px] tracking-wider uppercase font-bold text-zinc-400">
                SYS_DATABASE //
              </span>
            </div>

            {EXPERIENCES_DATA.map((exp, index) => {
              const isActive = activeTab === index;
              
              // Dynamic themes
              const activeBorderColor = 
                exp.themeColor === "indigo" ? "border-indigo-500/20 bg-indigo-950/10" :
                exp.themeColor === "emerald" ? "border-emerald-500/20 bg-emerald-950/10" :
                exp.themeColor === "purple" ? "border-purple-500/20 bg-purple-950/10" :
                "border-cyan-500/20 bg-cyan-950/10";

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
                      ? `${activeBorderColor} text-white shadow-[0_4px_20px_-2px_rgba(0,0,0,0.4)]`
                      : "border-zinc-900/30 bg-zinc-950/10 text-zinc-400 hover:text-zinc-200 hover:border-zinc-800/40 hover:bg-zinc-900/10"
                  }`}
                  style={{
                    boxShadow: isActive ? `0 0 15px -3px ${exp.glowColor}` : ""
                  }}
                >
                  {/* Left Indicator Tag */}
                  <div className={`hidden md:block w-1.5 h-6 rounded-full transition-all duration-300 shrink-0 ${
                    isActive ? activeIndicator : "bg-zinc-800"
                  }`} />

                  <div className="flex flex-col space-y-0.5">
                    <span className="font-space text-[11px] font-bold tracking-tight">
                      {exp.shortName}
                    </span>
                    <span className="text-[9px] text-zinc-500 font-mono tracking-wider">
                      {exp.duration.split("—")[0].trim()}
                    </span>
                  </div>

                  {isActive && (
                    <ChevronRight className="hidden md:block w-3.5 h-3.5 ml-auto text-zinc-500" />
                  )}
                </button>
              );
            })}
          </div>

          {/* RIGHT DETAILS PANE: Full Node Info */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto flex flex-col h-[24rem] md:h-full custom-scrollbar">
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
                <div className="border-b border-zinc-900/40 pb-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9px] text-zinc-500 bg-zinc-900/40 px-2 py-0.5 rounded uppercase tracking-widest border border-zinc-900/60">
                        NODE_0{activeTab + 1}
                      </span>
                      {activeExp.status === "ACTIVE" ? (
                        <span className="flex items-center gap-1.5 text-[8px] font-mono font-bold tracking-wider text-emerald-400 bg-emerald-950/20 px-2 py-0.5 border border-emerald-500/10 rounded uppercase">
                          <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping inline-block shrink-0" />
                          STATUS: ONGOING
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-[8px] font-mono font-bold tracking-wider text-zinc-400 bg-zinc-900/40 px-2 py-0.5 border border-zinc-800/40 rounded uppercase">
                          <span className="w-1 h-1 rounded-full bg-zinc-650 inline-block shrink-0" />
                          STATUS: RETRIEVED
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1 text-[9px] text-zinc-500 font-mono">
                      <Calendar className="w-3 h-3 text-zinc-650" />
                      <span>{activeExp.duration}</span>
                    </div>
                  </div>

                  <h3 className="font-space text-base md:text-lg font-bold text-white mt-2 leading-snug">
                    {activeExp.organization}
                  </h3>
                </div>

                {/* Body Roles Content */}
                <div className="flex-1 space-y-6">
                  {activeExp.roles.map((role, rIndex) => (
                    <div 
                      key={role.title} 
                      className={`space-y-3 pb-5 ${
                        rIndex < activeExp.roles.length - 1 ? "border-b border-zinc-900/40" : ""
                      }`}
                    >
                      {/* Role header */}
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <div className={`p-1 rounded bg-zinc-900/50 border border-zinc-900 shrink-0 ${
                            activeExp.themeColor === "indigo" ? "text-indigo-400" :
                            activeExp.themeColor === "emerald" ? "text-emerald-400" :
                            activeExp.themeColor === "purple" ? "text-purple-400" :
                            "text-cyan-400"
                          }`}>
                            <Briefcase className="w-3.5 h-3.5" />
                          </div>
                          <span className="font-space text-xs font-bold text-zinc-200 tracking-wide">
                            {role.title}
                          </span>
                        </div>
                        <span className="font-mono text-[8px] text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-900/60">
                          {role.year}
                        </span>
                      </div>

                      {/* Bullet point accomplishments */}
                      <ul className="space-y-2 pl-1">
                        {role.desc.map((bullet, bIndex) => (
                          <li 
                            key={bIndex} 
                            className="flex items-start gap-2 text-zinc-400 font-sora text-[11px] leading-relaxed group"
                          >
                            <span className={`font-mono text-[8px] mt-1 shrink-0 select-none ${
                              activeExp.themeColor === "indigo" ? "text-indigo-500/50" :
                              activeExp.themeColor === "emerald" ? "text-emerald-500/50" :
                              activeExp.themeColor === "purple" ? "text-purple-500/50" :
                              "text-cyan-500/50"
                            }`}>
                              [#]
                            </span>
                            <span className="group-hover:text-zinc-300 transition-colors">
                              {bullet}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Skill tags block */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {role.skills.map((skill) => {
                          const tagColor = 
                            activeExp.themeColor === "indigo" ? "border-indigo-500/5 hover:border-indigo-500/20 hover:bg-indigo-950/10 text-indigo-400/80 hover:text-indigo-300" :
                            activeExp.themeColor === "emerald" ? "border-emerald-500/5 hover:border-emerald-500/20 hover:bg-emerald-950/10 text-emerald-400/80 hover:text-emerald-300" :
                            activeExp.themeColor === "purple" ? "border-purple-500/5 hover:border-purple-500/20 hover:bg-purple-950/10 text-purple-400/80 hover:text-purple-300" :
                            "border-cyan-500/5 hover:border-cyan-500/20 hover:bg-cyan-950/10 text-cyan-400/80 hover:text-cyan-300";

                          return (
                            <span
                              key={skill}
                              className={`px-2 py-0.5 border bg-zinc-950/40 text-[8px] font-space tracking-wider rounded-md font-bold uppercase transition-all duration-300 shrink-0 ${tagColor}`}
                            >
                              {skill}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mini System status footer (Desktop only) */}
                <div className="hidden md:flex items-center gap-1.5 justify-end font-mono text-[8px] text-zinc-650 border-t border-zinc-900/40 pt-3 mt-auto w-full select-none">
                  <Cpu className="w-2.5 h-2.5 text-zinc-700 animate-spin [animation-duration:8s]" />
                  <span>MATRIXCORE_SYSV4 // DATALOG_DEC_SECURE // OK</span>
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
