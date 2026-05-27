"use client";

import React from "react";
import { ShaderAnimation } from "./shader-lines";

export default function DemoOne() {
  return (
    <div className="relative flex h-[650px] w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-zinc-950 border border-zinc-800">
      {/* Background WebGL lines scanning radar */}
      <ShaderAnimation />

      {/* Floating text content */}
      <span className="pointer-events-none z-10 text-center text-5xl sm:text-7xl font-bold font-orbitron tracking-tighter whitespace-pre-wrap text-white drop-shadow-[0_0_20px_rgba(99,102,241,0.5)]">
        SHADER LINES
      </span>
    </div>
  );
}
