"use client";

import React, { useEffect, useState } from "react";
import Phosphor30 from "@/components/ui/phosphor-30";

const INTRO_DURATION_MS = 3600;
const FADE_DURATION_MS = 650;

export default function IntroLoader() {
  const [isMounted, setIsMounted] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => {
      setIsFading(true);
    }, INTRO_DURATION_MS - FADE_DURATION_MS);

    const removeTimer = window.setTimeout(() => {
      setIsMounted(false);
    }, INTRO_DURATION_MS);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(fadeTimer);
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
      className={`fixed inset-0 z-[100] bg-black transition-opacity duration-700 ease-out ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <Phosphor30 />
      <div className="absolute inset-x-0 bottom-10 z-10 flex items-center justify-center">
        <div className="h-px w-24 overflow-hidden bg-white/10">
          <div className="h-full w-full origin-left animate-[intro-progress_3.6s_linear_forwards] bg-white/80" />
        </div>
      </div>
    </div>
  );
}
