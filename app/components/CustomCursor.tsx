"use client";

import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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

  // Smooth trail lagging interpolation for the background glow spotlight
  useEffect(() => {
    let animId: number;
    
    const updateTrail = () => {
      setTrailPosition((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        
        return {
          x: prev.x + dx * 0.12,
          y: prev.y + dy * 0.12,
        };
      });
      
      animId = requestAnimationFrame(updateTrail);
    };

    updateTrail();
    return () => cancelAnimationFrame(animId);
  }, [position]);

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Global Ambient Cursor Follow-Glow backplate */}
      <div className="hidden lg:block pointer-events-none fixed inset-0 z-[1]">
        <div
          className="absolute w-[360px] h-[360px] rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-screen opacity-70 pointer-events-none transition-all duration-300"
          style={{
            left: `${trailPosition.x}px`,
            top: `${trailPosition.y}px`,
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.055) 0%, rgba(99, 102, 241, 0.01) 50%, rgba(0, 0, 0, 0) 80%)",
          }}
        />
      </div>

      {/* 2. Restored Target Center Dot (Small white dot) */}
      <div className="hidden lg:block pointer-events-none fixed inset-0 z-50">
        <div
          className="fixed w-3 h-3 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: `translate(-50%, -50%) scale(${isHovered ? 0.5 : 1})`,
            transition: "transform 0.15s ease",
          }}
        />
      </div>
    </>
  );
}
