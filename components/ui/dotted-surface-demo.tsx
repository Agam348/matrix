"use client";

import React from "react";
import { DottedSurface } from "./dotted-surface";

export default function DemoOne() {
  return (
    <div className="relative flex h-[650px] w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-zinc-950 border border-zinc-800">
      {/* Undulating 3D Particle Wave Background */}
      <DottedSurface className="absolute inset-0 w-full h-full" />

      {/* Floating text content */}
      <div className="relative z-10 text-center space-y-2 select-none">
        <h1 className="text-5xl sm:text-7xl font-bold font-orbitron tracking-tighter text-white drop-shadow-[0_0_20px_rgba(99,102,241,0.5)]">
          Dotted Surface
        </h1>
        <p className="font-space text-xs font-bold tracking-widest text-indigo-400 uppercase">
          An Interactive 3D WebGL Wave
        </p>
      </div>
    </div>
  );
}
