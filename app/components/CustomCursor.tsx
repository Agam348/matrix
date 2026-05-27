"use client";

import React, { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const trailRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only enable custom cursor on devices that support hover (desktops)
    const isMobile = window.matchMedia("(max-width: 768px)").matches || !("ontouchstart" in window);
    let timer: NodeJS.Timeout;
    if (isMobile) {
      timer = setTimeout(() => {
        setIsVisible(true);
      }, 0);
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[role='button']")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Smooth trail lagging interpolation
  useEffect(() => {
    let animId: number;
    
    const updateTrail = () => {
      setTrailPosition((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        
        // Speed scaling interpolation
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      
      animId = requestAnimationFrame(updateTrail);
    };

    updateTrail();
    return () => cancelAnimationFrame(animId);
  }, [position]);

  if (!isVisible) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-50">
      {/* Target Dot */}
      <div
        className="fixed w-1.5 h-1.5 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovered ? 0.5 : 1})`,
          transition: "transform 0.15s ease",
        }}
      />
      
      {/* Outer Lagging Orbit Ring */}
      <div
        ref={trailRef}
        className={`fixed rounded-full -translate-x-1/2 -translate-y-1/2 border transition-all duration-300 ${
          isHovered
            ? "w-8 h-8 border-white bg-white/5"
            : "w-6 h-6 border-zinc-500/40"
        }`}
        style={{
          left: `${trailPosition.x}px`,
          top: `${trailPosition.y}px`,
        }}
      />
    </div>
  );
}
