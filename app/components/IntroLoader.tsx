"use client";

import React, { useEffect, useState, useCallback } from "react";
import { PaperBurnCanvas, EmberSparks } from "@/components/ui/paper-burn-intro";
import { soundManager } from "../lib/sound";

const BURN_DURATION_MS = 3600; // 3.6s Cinematic direct fire combustion reveal
const DELAY_MS = 200;

export default function IntroLoader() {
  const [isMounted, setIsMounted] = useState(true);
  const [isBurning, setIsBurning] = useState(false);

  useEffect(() => {
    // Lock page scrolling during intro fire reveal
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.setAttribute("data-intro-active", "true");

    // Play ignition sound when fire ignites
    const soundTimer = window.setTimeout(() => {
      setIsBurning(true);
      soundManager.playEmp();
    }, DELAY_MS);

    return () => {
      window.clearTimeout(soundTimer);
      document.body.style.overflow = previousOverflow;
      document.body.removeAttribute("data-intro-active");
      const curtain = document.getElementById("intro-preloader-curtain");
      if (curtain) curtain.remove();
    };
  }, []);

  const handleBurnComplete = useCallback(() => {
    setIsMounted(false);
    document.body.style.overflow = "";
    document.body.removeAttribute("data-intro-active");
    const curtain = document.getElementById("intro-preloader-curtain");
    if (curtain) curtain.remove();
  }, []);

  useEffect(() => {
    if (!isMounted) {
      document.body.style.overflow = "";
      document.body.removeAttribute("data-intro-active");
      const curtain = document.getElementById("intro-preloader-curtain");
      if (curtain) curtain.remove();
    }
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div
      className="fixed inset-0 z-[100] pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Real-Time WebGL2 Volumetric Paper Combustion Shader (Starts instantly from frame 0) */}
      <PaperBurnCanvas
        delayMs={DELAY_MS}
        durationMs={BURN_DURATION_MS}
        onComplete={handleBurnComplete}
      />

      {/* 2. Atmospheric flying fire embers & rising ash particles */}
      {isBurning && <EmberSparks />}
    </div>
  );
}
