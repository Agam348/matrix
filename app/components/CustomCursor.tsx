"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const handRef = useRef<SVGSVGElement>(null);
  
  const [isVisible, setIsVisible] = useState(false);
  
  const mouseRef = useRef({ x: 0, y: 0 });
  const trailRef = useRef({ x: 0, y: 0 });
  
  // Track cursor states: default (ball only), pointer (arrow + circle + ball), grab (hand + circle + ball)
  const cursorStateRef = useRef<"default" | "pointer" | "grab" | "grabbing">("default");
  const isGrabActiveRef = useRef(false);

  useEffect(() => {
    const shouldUseNativeCursor =
      window.matchMedia("(max-width: 768px)").matches ||
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window;
    let timer: NodeJS.Timeout | undefined;
    
    if (!shouldUseNativeCursor) {
      timer = setTimeout(() => {
        setIsVisible(true);
        document.documentElement.classList.add("has-custom-cursor");
      }, 0);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      updateCursorState(e.target as HTMLElement);
    };

    const updateCursorState = (target: HTMLElement) => {
      if (!target) return;
      
      const computedStyle = window.getComputedStyle(target);
      const cursorStyle = computedStyle.cursor;
      const interactiveTarget = target.closest(
        "a, button, input, textarea, select, summary, [role='button'], [role='link'], [tabindex]:not([tabindex='-1']), .cursor-pointer"
      );

      const isGrab =
        cursorStyle === "grab" ||
        cursorStyle === "grabbing" ||
        target.closest(".cursor-grab") ||
        target.closest(".cursor-grabbing") ||
        target.closest("[data-cursor='grab']") ||
        target.closest("[draggable='true']");
      const isPointer = cursorStyle === "pointer" || Boolean(interactiveTarget);

      if (isGrab) {
        cursorStateRef.current = isGrabActiveRef.current ? "grabbing" : "grab";
      } else if (isPointer) {
        cursorStateRef.current = "pointer";
      } else {
        cursorStateRef.current = "default";
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      updateCursorState(e.target as HTMLElement);
    };

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const computedStyle = window.getComputedStyle(target);
      const cursorStyle = computedStyle.cursor;
      const isGrab =
        cursorStyle === "grab" ||
        cursorStyle === "grabbing" ||
        target.closest(".cursor-grab") ||
        target.closest(".cursor-grabbing") ||
        target.closest("[data-cursor='grab']") ||
        target.closest("[draggable='true']");
      if (isGrab) {
        isGrabActiveRef.current = true;
        cursorStateRef.current = "grabbing";
      }
    };

    const handleMouseUp = () => {
      isGrabActiveRef.current = false;
      const hoveredElement = document.elementFromPoint(mouseRef.current.x, mouseRef.current.y);
      if (hoveredElement) {
        updateCursorState(hoveredElement as HTMLElement);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });

    return () => {
      if (timer) clearTimeout(timer);
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // requestAnimationFrame loop to update cursor elements directly on the DOM
  useEffect(() => {
    if (!isVisible) return;

    let animId: number;

    const tick = () => {
      const mouse = mouseRef.current;
      const trail = trailRef.current;
      const state = cursorStateRef.current;

      // Smooth trail lag interpolation for the follow-glow
      const dx = mouse.x - trail.x;
      const dy = mouse.y - trail.y;
      trail.x += dx * 0.12;
      trail.y += dy * 0.12;

      // 1. Update center dot (ball) - Always visible and follows the mouse
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
      }

      // 2. Update transparent white circle halo for clickable and draggable targets
      if (haloRef.current) {
        if (state === "pointer" || state === "grab" || state === "grabbing") {
          const haloScale = state === "grabbing" ? 0.86 : 1;
          haloRef.current.style.opacity = "1";
          haloRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%) scale(${haloScale})`;
        } else {
          haloRef.current.style.opacity = "0";
          haloRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%) scale(0.45)`;
        }
      }

      // 3. Update custom arrow icon, with its tip aligned to the pointer position
      if (arrowRef.current) {
        if (state === "pointer") {
          arrowRef.current.style.opacity = "1";
          arrowRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
        } else {
          arrowRef.current.style.opacity = "0";
        }
      }

      // 4. Update custom grab hand icon, centered on drag targets like the ID card
      if (handRef.current) {
        if (state === "grab" || state === "grabbing") {
          handRef.current.style.opacity = "1";
          const grabScale = state === "grabbing" ? "scale(0.85)" : "scale(1)";
          handRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%) ${grabScale}`;
        } else {
          handRef.current.style.opacity = "0";
        }
      }

      // 5. Update background glow backplate
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${trail.x}px, ${trail.y}px, 0) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(tick);
    };

    tick();
    return () => cancelAnimationFrame(animId);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Global Ambient Cursor Follow-Glow backplate */}
      <div className="block pointer-events-none fixed inset-0 z-[1]">
        <div
          ref={glowRef}
          className="absolute w-[360px] h-[360px] rounded-full mix-blend-screen opacity-70 pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.055) 0%, rgba(99, 102, 241, 0.01) 50%, rgba(0, 0, 0, 0) 80%)",
            transform: "translate3d(0, 0, 0) translate(-50%, -50%)",
            willChange: "transform",
          }}
        />
      </div>

      {/* 2. Custom Cursor Elements Wrapper */}
      <div className="block pointer-events-none fixed inset-0 z-50">
        
        {/* Soft transparent white circle for clickable and draggable targets */}
        <div
          ref={haloRef}
          className="absolute w-16 h-16 rounded-full pointer-events-none select-none"
          style={{
            transform: "translate3d(0, 0, 0) translate(-50%, -50%)",
            opacity: 0,
            background: "radial-gradient(circle, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0.18) 48%, rgba(255,255,255,0.05) 72%, rgba(255,255,255,0) 100%)",
            boxShadow: "0 0 22px rgba(255,255,255,0.2)",
            transition: "opacity 0.16s ease, transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
            willChange: "transform, opacity",
          }}
        />

        {/* Small Center Dot (Ball) - Always visible */}
        <div
          ref={dotRef}
          className="absolute w-2.5 h-2.5 bg-white rounded-full pointer-events-none select-none border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.55)]"
          style={{
            transform: "translate3d(0, 0, 0) translate(-50%, -50%)",
            willChange: "transform",
          }}
        />

        {/* Custom Arrow Icon - visible only on clickable controls */}
        <svg
          ref={arrowRef}
          viewBox="0 0 24 24"
          className="absolute w-4 h-4 pointer-events-none select-none drop-shadow-[0_1px_2px_rgba(9,9,11,0.65)]"
          style={{
            transform: "translate3d(0, 0, 0)",
            opacity: 0,
            transition: "opacity 0.15s ease",
            willChange: "transform, opacity",
          }}
        >
          <path
            d="M4 3L18.5 12.5L11.8 13.6L15.7 20L13 21.4L9.2 15L4.8 19.6L4 3Z"
            fill="rgba(255,255,255,0.96)"
            stroke="rgba(9,9,11,0.78)"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>

        {/* Custom Grab Hand Icon - visible on draggable/grab targets */}
        <svg
          ref={handRef}
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.98)"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute w-6 h-6 pointer-events-none select-none drop-shadow-[0_1px_2px_rgba(9,9,11,0.9)]"
          style={{
            transform: "translate3d(0, 0, 0) translate(-50%, -50%)",
            opacity: 0,
            transition: "opacity 0.15s ease, transform 0.15s ease",
            willChange: "transform, opacity",
          }}
        >
          <path
            fill="rgba(255,255,255,0.96)"
            stroke="rgba(9,9,11,0.82)"
            d="M7.2 9.6V5.8a1.55 1.55 0 0 1 3.1 0V9"
          />
          <path
            fill="none"
            stroke="rgba(9,9,11,0.82)"
            d="M10.3 9V4.4a1.55 1.55 0 0 1 3.1 0V9"
          />
          <path
            fill="none"
            stroke="rgba(9,9,11,0.82)"
            d="M13.4 9V5a1.55 1.55 0 0 1 3.1 0V9.5"
          />
          <path
            fill="rgba(255,255,255,0.96)"
            stroke="rgba(9,9,11,0.82)"
            d="M16.5 10V7.5a1.5 1.5 0 0 1 3 0v6.9c0 4.2-2.8 6.6-7 6.6h-2.1c-3.2 0-5.1-1.4-6.2-4.2L2.7 13a1.55 1.55 0 0 1 2.9-1.1l1.6 3.4V9.6"
          />
        </svg>

      </div>
    </>
  );
}
