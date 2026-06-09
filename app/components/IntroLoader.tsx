"use client";

import React, { useEffect, useState } from "react";
import Phosphor30 from "@/components/ui/phosphor-30";

const INTRO_DURATION_MS = 3600;
const REVEAL_DURATION_MS = 1150;

export default function IntroLoader() {
  const [isMounted, setIsMounted] = useState(true);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 768px), (pointer: coarse)");
    const updateMobile = () => setIsMobile(mobileQuery.matches);
    const mobileTimer = window.setTimeout(updateMobile, 0);

    const revealTimer = window.setTimeout(() => {
      setIsRevealing(true);
    }, INTRO_DURATION_MS);

    const removeTimer = window.setTimeout(() => {
      setIsMounted(false);
    }, INTRO_DURATION_MS + REVEAL_DURATION_MS);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(mobileTimer);
      window.clearTimeout(revealTimer);
      window.clearTimeout(removeTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (!isMounted) {
      document.body.style.overflow = "";
    }
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black transition-transform duration-[1150ms] ease-[cubic-bezier(0.83,0,0.17,1)] ${
        isRevealing ? "-translate-y-full" : "translate-y-0"
      }`}
      aria-hidden="true"
    >
      {isMobile !== false ? (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(99,102,241,0.28),transparent_35%),radial-gradient(circle_at_20%_75%,rgba(56,189,248,0.14),transparent_28%),#000]" />
      ) : (
        <Phosphor30 />
      )}
      <div className="absolute inset-x-0 bottom-10 z-10 flex items-center justify-center">
        <div
          className={`h-px w-24 overflow-hidden bg-white/10 transition-opacity duration-300 ${
            isRevealing ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="h-full w-full origin-left animate-[intro-progress_3.6s_linear_forwards] bg-white/80" />
        </div>
      </div>
    </div>
  );
}
