"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const openHandRef = useRef<SVGSVGElement>(null);
  const closedHandRef = useRef<SVGSVGElement>(null);
  
  const [isVisible, setIsVisible] = useState(false);
  
  const mouseRef = useRef({ x: 0, y: 0 });
  const trailRef = useRef({ x: 0, y: 0 });
  
  // Track cursor states: default (ball only), pointer (arrow + circle + ball), grab (hand + circle + ball)
  const cursorStateRef = useRef<"default" | "pointer" | "grab" | "grabbing">("default");
  const isGrabActiveRef = useRef(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      document.documentElement.classList.remove("has-custom-cursor");
      return;
    }

    const shouldUseNativeCursor = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
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

      // 4. Update grab hands: open while hover-ready, closed while actively dragging.
      if (openHandRef.current) {
        openHandRef.current.style.opacity = state === "grab" ? "1" : "0";
        openHandRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%) scale(1)`;
      }

      if (closedHandRef.current) {
        closedHandRef.current.style.opacity = state === "grabbing" ? "1" : "0";
        closedHandRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%) scale(0.92)`;
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

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  if (isMobile || !isVisible) return null;

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
      <div className="block pointer-events-none fixed inset-0 z-[100]">
        
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

        {/* Open grab hand - visible when a draggable target can be stretched */}
        <svg
          ref={openHandRef}
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(9,9,11,0.86)"
          strokeWidth="1.65"
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
            d="M7.8 12.4V7.5C7.8 6.6 8.5 6 9.3 6C10.1 6 10.8 6.6 10.8 7.5V11.4"
          />
          <path
            fill="rgba(255,255,255,0.96)"
            d="M10.8 11.4V5.8C10.8 4.9 11.5 4.3 12.3 4.3C13.1 4.3 13.8 4.9 13.8 5.8V11"
          />
          <path
            fill="rgba(255,255,255,0.96)"
            d="M13.8 11V6.4C13.8 5.5 14.5 4.9 15.3 4.9C16.1 4.9 16.8 5.5 16.8 6.4V11.7"
          />
          <path
            fill="rgba(255,255,255,0.96)"
            d="M16.8 11.7V8.1C16.8 7.2 17.5 6.6 18.3 6.6C19.1 6.6 19.8 7.2 19.8 8.1V14.4C19.8 18.6 17.2 21 13.1 21H10.9C8 21 6.1 19.7 4.9 17.3L3.4 14.3C3 13.5 3.3 12.7 4.1 12.3C4.8 11.9 5.6 12.2 6.1 13L7.8 15.9V12.4"
          />
        </svg>

        {/* Closed grab hand - visible only while actively stretching the ID card */}
        <svg
          ref={closedHandRef}
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(9,9,11,0.88)"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute w-6 h-6 pointer-events-none select-none drop-shadow-[0_1px_2px_rgba(9,9,11,0.9)]"
          style={{
            transform: "translate3d(0, 0, 0) translate(-50%, -50%)",
            opacity: 0,
            transition: "opacity 0.12s ease, transform 0.12s ease",
            willChange: "transform, opacity",
          }}
        >
          <path
            fill="rgba(255,255,255,0.96)"
            d="M7.4 10.8V7.8C7.4 7 8.1 6.4 8.9 6.4C9.7 6.4 10.4 7 10.4 7.8V10.2"
          />
          <path
            fill="rgba(255,255,255,0.96)"
            d="M10.4 10.2V6.4C10.4 5.6 11.1 5 11.9 5C12.7 5 13.4 5.6 13.4 6.4V10.1"
          />
          <path
            fill="rgba(255,255,255,0.96)"
            d="M13.4 10.1V7C13.4 6.2 14.1 5.6 14.9 5.6C15.7 5.6 16.4 6.2 16.4 7V10.6"
          />
          <path
            fill="rgba(255,255,255,0.96)"
            d="M16.4 11V8.6C16.4 7.8 17.1 7.2 17.9 7.2C18.7 7.2 19.4 7.8 19.4 8.6V14.1C19.4 18.4 16.9 21 12.8 21H10.9C8.2 21 6.4 19.7 5.3 17.2L3.9 13.9C3.6 13.1 4 12.3 4.8 12C5.5 11.7 6.3 12 6.7 12.8L7.7 14.9L7.4 10.8"
          />
          <path d="M8.2 10.9H17.2" />
        </svg>

      </div>
    </>
  );
}
