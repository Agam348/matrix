"use client";

import React, { useState } from "react";
import { Laptop, Copy, Check, ExternalLink, ShieldAlert } from "lucide-react";

export default function MobileBlockGate() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex md:hidden flex-col items-center justify-between p-6 sm:p-10 bg-[#09090b] text-zinc-100 select-none overflow-y-auto">
      {/* Background Cyber Grid Lines & Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.25),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b15_1px,transparent_1px),linear-gradient(to_bottom,#18181b15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Top Header / System Bar */}
      <div className="relative z-10 w-full flex items-center justify-between border-b border-zinc-800/60 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="font-space text-xs tracking-[0.25em] text-zinc-400 uppercase font-semibold">
            APS // SYSTEM OVERRIDE
          </span>
        </div>
        <div className="px-2.5 py-0.5 rounded-full border border-amber-500/30 bg-amber-950/30 text-amber-300 font-space text-[10px] tracking-wider uppercase flex items-center gap-1.5">
          <ShieldAlert className="w-3 h-3 text-amber-400" />
          DESKTOP GATE
        </div>
      </div>

      {/* Center Main Hero Container */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto py-8 max-w-sm">
        {/* Holographic Laptop Pulse Ring */}
        <div className="relative mb-8 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-2xl animate-pulse" />
          <div className="relative flex items-center justify-center w-24 h-24 rounded-2xl bg-zinc-900/80 border border-indigo-500/40 shadow-[0_0_30px_rgba(99,102,241,0.25)]">
            <Laptop className="w-12 h-12 text-indigo-400 animate-[bounce_3s_ease-in-out_infinite]" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <h1 className="text-2xl sm:text-3xl font-black font-orbitron tracking-wide text-white uppercase mb-3">
          PLEASE VIEW ON <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-amber-300">LAPTOP / PC</span>
        </h1>

        <p className="text-zinc-400 text-sm font-space leading-relaxed mb-8">
          This digital portfolio is engineered with real-time 3D WebGL shaders, interactive spatial physics and custom sound synthesis designed exclusively for larger screens.
        </p>

        {/* Action: Copy Link Button */}
        <button
          onClick={handleCopyLink}
          className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-space text-xs tracking-wider uppercase font-semibold shadow-[0_0_20px_rgba(99,102,241,0.35)] active:scale-[0.98] transition-all duration-200 border border-indigo-400/30 mb-4"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span className="text-emerald-200">PORTFOLIO LINK COPIED!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>COPY LINK TO OPEN ON LAPTOP</span>
            </>
          )}
        </button>

        <p className="text-zinc-500 text-[11px] font-space tracking-wide">
          Paste this link in your laptop browser to experience the full interactive site.
        </p>
      </div>

      {/* Bottom Direct Connect Links */}
      <div className="relative z-10 w-full pt-4 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-zinc-400 text-xs font-space">
        <span className="text-[11px] text-zinc-500">Agampreet Singh © 2026</span>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Agam348"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white flex items-center gap-1 transition-colors"
          >
            GitHub <ExternalLink className="w-3 h-3 text-zinc-500" />
          </a>
          <a
            href="https://www.linkedin.com/in/Agam17"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white flex items-center gap-1 transition-colors"
          >
            LinkedIn <ExternalLink className="w-3 h-3 text-zinc-500" />
          </a>
        </div>
      </div>
    </div>
  );
}

