"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundManager } from "../lib/sound";

interface IntroLoaderProps {
  onComplete?: () => void;
}

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const playedChecksRef = useRef<{ p36: boolean; p71: boolean; p100: boolean }>({
    p36: false,
    p71: false,
    p100: false,
  });

  useEffect(() => {
    // Lock body scroll while loader is active
    document.body.style.overflow = "hidden";

    // Measure viewport dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    const startTime = performance.now();
    const duration = 2800; // 2.8s smooth countdown

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const t = Math.min(1, elapsed / duration);
      
      // Smooth natural cubic easing (easeOutCubic)
      const ease = 1 - Math.pow(1 - t, 3);
      const current = Math.min(100, Math.round(ease * 100));
      setProgress(current);

      // Sound triggers on stage transitions
      if (current >= 36 && !playedChecksRef.current.p36) {
        playedChecksRef.current.p36 = true;
        soundManager.playBeep(650, 0.04);
      }
      if (current >= 71 && !playedChecksRef.current.p71) {
        playedChecksRef.current.p71 = true;
        soundManager.playBeep(800, 0.04);
      }
      if (current >= 100 && !playedChecksRef.current.p100) {
        playedChecksRef.current.p100 = true;
        soundManager.playClick(1100);
      }

      if (t < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);

        // Hold gracefully at 100% before lifting
        setTimeout(() => {
          setIsCompleted(true);
        }, 550);
      }
    };

    const animId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "";
    };
  }, []);

  const handleExitComplete = () => {
    setIsMounted(false);
    document.body.style.overflow = "";
    if (onComplete) onComplete();
  };

  if (!isMounted) return null;

  const w = dimensions.width || 1440;
  const curveHeight = Math.min(260, (dimensions.height || 900) * 0.3);

  // Dynamic 3-stage status computations
  const systemStatus = progress >= 36 ? "OK" : "LOADING";
  const interfaceStatus = progress >= 71 ? "OK" : progress >= 36 ? "LOADING" : "WAIT";
  const experienceStatus = progress >= 100 ? "OK" : progress >= 71 ? "LOADING" : "WAIT";

  const titleText = progress === 100 ? "PORTFOLIO READY" : "INITIALIZING PORTFOLIO";
  const statusLabel = progress === 100 ? "STATUS: READY" : "STATUS: INITIALIZING";

  // SVG curved arch paths (curved curtain lift reveal)
  const initialCurvePath = `M0 0 L${w} 0 Q${w / 2} ${curveHeight} 0 0 Z`;
  const targetCurvePath = `M0 0 L${w} 0 Q${w / 2} 0 0 0 Z`;

  return (
    <AnimatePresence>
      <motion.div
        key="intro-loader-screen"
        initial={{ y: 0 }}
        animate={isCompleted ? { y: `calc(-100% - ${curveHeight}px)` } : { y: 0 }}
        transition={{
          duration: 1.45,
          ease: [0.76, 0, 0.24, 1], // Smooth cinematic bezier lift
        }}
        onAnimationComplete={() => {
          if (isCompleted) {
            handleExitComplete();
          }
        }}
        className="fixed inset-0 z-[9999] bg-black flex flex-col justify-between p-8 sm:p-12 md:p-16 select-none"
      >
        {/* Top Spacer */}
        <div className="w-full h-2" />

        {/* Upper-Shifted Checklist & Loading Terminal Module (25-30% from top) */}
        <motion.div 
          animate={isCompleted ? { opacity: 0, y: -40, scale: 0.96 } : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45 }}
          className="flex flex-col items-start justify-start mt-[18vh] sm:mt-[22vh] md:mt-[24vh] mb-auto w-full max-w-sm sm:max-w-md mx-auto space-y-6 sm:space-y-7 z-10 font-mono"
        >
          {/* Header Title */}
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase transition-colors duration-300">
            <span className={`w-2 h-2 rounded-full transition-all duration-300 ${
              progress === 100 
                ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,1)]" 
                : "bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"
            }`} />
            <span className={progress === 100 ? "text-emerald-300" : "text-zinc-300"}>
              {titleText}
            </span>
          </div>

          {/* Sequential 3-Stage Checklist */}
          <div className="w-full text-xs sm:text-sm text-zinc-400 space-y-3 select-none tracking-wider bg-zinc-950/90 border border-zinc-900 rounded-xl p-4 sm:p-5 shadow-inner">
            {/* SYSTEM */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-zinc-300">SYSTEM</span>
              <span className="text-zinc-700 tracking-[0.2em] select-none">.............</span>
              <span className={`w-16 text-right font-mono text-xs sm:text-sm font-bold transition-all duration-300 ${
                systemStatus === "OK" ? "text-emerald-400" : "text-cyan-400 animate-pulse"
              }`}>
                {systemStatus}
              </span>
            </div>

            {/* INTERFACE */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-zinc-300">INTERFACE</span>
              <span className="text-zinc-700 tracking-[0.2em] select-none">..........</span>
              <span className={`w-16 text-right font-mono text-xs sm:text-sm font-bold transition-all duration-300 ${
                interfaceStatus === "OK" ? "text-emerald-400" : interfaceStatus === "LOADING" ? "text-cyan-400 animate-pulse" : "text-zinc-600"
              }`}>
                {interfaceStatus}
              </span>
            </div>

            {/* EXPERIENCE */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-zinc-300">EXPERIENCE</span>
              <span className="text-zinc-700 tracking-[0.2em] select-none">.........</span>
              <span className={`w-16 text-right font-mono text-xs sm:text-sm font-bold transition-all duration-300 ${
                experienceStatus === "OK" ? "text-emerald-400" : experienceStatus === "LOADING" ? "text-cyan-400 animate-pulse" : "text-zinc-600"
              }`}>
                {experienceStatus}
              </span>
            </div>
          </div>

          {/* Progress Bar & Status Metric Row */}
          <div className="w-full space-y-3 pt-1">
            <div className="flex items-center justify-between font-mono text-xs sm:text-[13px]">
              <span className={`tracking-wider font-semibold transition-colors duration-300 ${
                progress === 100 ? "text-emerald-400" : "text-zinc-400"
              }`}>
                {statusLabel}
              </span>
              <span className="font-bold text-white tracking-widest text-sm sm:text-base">
                {progress < 10 ? `0${progress}` : progress}%
              </span>
            </div>

            <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800/80 p-[0.5px]">
              <div
                className="h-full bg-white rounded-full transition-all duration-75 ease-out shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>

        {/* Bottom Status Row */}
        <motion.div 
          animate={isCompleted ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-end justify-between w-full text-zinc-600 font-mono text-[11px] tracking-widest uppercase z-10"
        >
          <div className="flex flex-col space-y-0.5">
            <span className="font-bold text-zinc-300 text-xs tracking-[0.2em]">APS</span>
            <span className="text-[9.5px] text-zinc-500 tracking-widest">DEVELOPER</span>
          </div>
          <span className="font-semibold text-zinc-500">{progress === 100 ? "READY" : "BOOTING"}</span>
        </motion.div>

        {/* Bottom SVG Bezier Curved Curtain Extension */}
        <svg
          className="absolute top-[99.5%] left-0 w-full fill-black pointer-events-none overflow-visible"
          style={{ height: `${curveHeight}px` }}
        >
          <motion.path
            initial={{ d: initialCurvePath }}
            animate={{
              d: isCompleted ? targetCurvePath : initialCurvePath,
            }}
            transition={{
              duration: 1.45,
              ease: [0.76, 0, 0.24, 1],
            }}
          />
        </svg>
      </motion.div>
    </AnimatePresence>
  );
}
