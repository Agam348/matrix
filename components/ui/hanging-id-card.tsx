"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Image from "next/image";

export default function HangingIdCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Motion values to track card position relative to rest coordinates
  const x = useMotionValue(0);
  const y = useMotionValue(140); // Resting height: hangs down 140px

  // Spring-back animation on release
  const handleDragEnd = () => {
    animate(x, 0, { type: "spring", stiffness: 180, damping: 14 });
    animate(y, 140, { type: "spring", stiffness: 180, damping: 14 });
  };

  // Dynamic rotation tilt based on X displacement (tilts naturally as dragged)
  const rotate = useTransform(x, [-160, 160], [-25, 25]);

  // Dynamic SVG lanyard path
  // Connects top anchor point (150, 0) to card top center (x + 150, y)
  const lanyardPath = useTransform([x, y], ([currX, currY]: number[]) => {
    const startX = 150; // Anchor X
    const startY = 0;   // Anchor Y
    const endX = currX + 150; // Card connection point X
    const endY = currY;       // Card connection point Y

    // Natural gravity curve logic
    const cpX = (startX + endX) / 2;
    const cpY = endY * 0.45;

    return `M ${startX} ${startY} Q ${cpX} ${cpY} ${endX} ${endY}`;
  });

  return (
    <div
      ref={containerRef}
      className="relative w-[300px] h-[520px] flex items-center justify-center select-none"
    >
      {/* SVG Canvas for drawing the lanyard vector */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        viewBox="0 0 300 520"
      >
        {/* Lanyard Background Ribbon (Thick) */}
        <motion.path
          d={lanyardPath}
          fill="none"
          stroke="#18181b"
          strokeWidth={10}
          strokeLinecap="round"
        />

        {/* Lanyard Core Fabric Pattern (Thin Inner Line) */}
        <motion.path
          d={lanyardPath}
          fill="none"
          stroke="#4f46e5" // Indigo fabric stripe
          strokeWidth={4}
          strokeDasharray="4,3"
          strokeLinecap="round"
        />

        {/* Dynamic Metallic Connector Hook (Attached at card top center) */}
        <motion.circle
          cx={useTransform(x, (cx) => cx + 150)}
          cy={y}
          r={6}
          fill="none"
          stroke="#e4e4e7"
          strokeWidth={3}
        />
        <motion.circle
          cx={useTransform(x, (cx) => cx + 150)}
          cy={useTransform(y, (cy) => cy - 4)}
          r={2.5}
          fill="#d4d4d8"
        />
      </svg>

      {/* Draggable Hanging ID Card */}
      <motion.div
        drag
        dragConstraints={{ left: -160, right: 160, top: -80, bottom: 220 }}
        dragElastic={0.6}
        style={{ x, y, rotate }}
        onDragEnd={handleDragEnd}
        className="absolute left-[calc(50%-120px)] top-0 w-[240px] h-[365px] bg-[#121214] border-4 border-zinc-100 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.85)] cursor-grab active:cursor-grabbing flex flex-col justify-start overflow-hidden z-10 hover:border-indigo-400/80 transition-colors duration-300"
      >
        {/* Hologram Light Reflection Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-20 mix-blend-overlay" />

        {/* Top Slot Hole for Clasp */}
        <div className="w-8 h-2 bg-zinc-950/90 rounded-full border border-zinc-800/80 absolute top-3.5 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
          <div className="w-6 h-1 bg-zinc-900 rounded-full" />
        </div>

        {/* ID Photo Frame Container */}
        <div className="relative w-[208px] h-[215px] mx-auto mt-8 bg-zinc-950 rounded-xl border border-zinc-800/50 overflow-hidden shadow-inner shrink-0 z-10">
          <Image
            src="/profile.jpg"
            alt="Agampreet Singh Profile"
            fill
            sizes="208px"
            className="object-cover transition-all duration-500"
            draggable={false}
            priority
          />
          {/* Futuristic corner brackets */}
          <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t-2 border-l-2 border-indigo-500/80" />
          <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t-2 border-r-2 border-indigo-500/80" />
          <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b-2 border-l-2 border-indigo-500/80" />
          <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b-2 border-r-2 border-indigo-500/80" />
        </div>

        {/* Details and Barcode Section */}
        <div className="flex-1 px-4 pt-3 flex flex-col justify-between pb-3.5 z-10 select-none">
          {/* Label Texts */}
          <div className="text-center space-y-0.5">
            <h4 className="font-orbitron text-xs font-black tracking-wider text-zinc-100 uppercase">
              AGAMPREET SINGH
            </h4>
            <p className="font-space text-[9px] font-bold text-indigo-400 tracking-widest uppercase">
              Scholar & Developer
            </p>
          </div>

          {/* Barcode Overlay — Click to visit LinkedIn */}
          <div className="relative group flex flex-col items-center">
            {/* Custom Tooltip */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-zinc-900 border border-zinc-700 rounded-md text-[9px] font-space font-semibold text-zinc-200 tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50">
              View LinkedIn Profile
              {/* Tooltip arrow */}
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-2.5 h-1.5 overflow-hidden">
                <div className="w-2 h-2 bg-zinc-900 border-r border-b border-zinc-700 rotate-45 mx-auto -mt-1" />
              </div>
            </div>

            <a
              href="https://www.linkedin.com/in/agam17"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col items-center space-y-1 cursor-pointer"
            >
            {/* Dynamic CSS Barcode Lines */}
            <div className="flex items-center gap-[1.5px] h-5 opacity-80">
              <div className="w-[1px] h-full bg-zinc-400" />
              <div className="w-[2px] h-full bg-zinc-400" />
              <div className="w-[1px] h-full bg-zinc-400" />
              <div className="w-[3px] h-full bg-zinc-400" />
              <div className="w-[1px] h-full bg-zinc-400" />
              <div className="w-[1px] h-full bg-zinc-400" />
              <div className="w-[4px] h-full bg-zinc-400" />
              <div className="w-[2px] h-full bg-zinc-400" />
              <div className="w-[1px] h-full bg-zinc-400" />
              <div className="w-[3px] h-full bg-zinc-400" />
              <div className="w-[1px] h-full bg-zinc-400" />
              <div className="w-[2px] h-full bg-zinc-400" />
              <div className="w-[1px] h-full bg-zinc-400" />
              <div className="w-[4px] h-full bg-zinc-400" />
            </div>

            {/* Barcode number */}
            <span className="font-mono text-[7px] text-zinc-500 tracking-[0.25em]">
              SYSNODE-3145-7492
            </span>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
