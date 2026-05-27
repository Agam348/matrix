"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

interface PerspectiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Max rotateX in degrees. Default 14. */
  maxRotateX?: number;
  /** Max rotateY in degrees. Default 30. */
  maxRotateY?: number;
  /** Lerp factor 0–1. Higher = snappier follow. Default 0.12. */
  smoothing?: number;
}

export const Perspective = ({
  maxRotateX = 14,
  maxRotateY = 30,
  smoothing = 0.12,
  className,
  children,
  ...props
}: PerspectiveProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const card = cardRef.current;
    if (!container || !card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetX = 0;
    let targetY = 0;
    let rotX = 0;
    let rotY = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);

      // full strength inside the card, fade across the next 2 card-radii
      const dist = Math.hypot(dx, dy);
      const falloff = dist <= 1 ? 1 : Math.max(0, 1 - (dist - 1) / 2);

      targetX = clamp(dy, -1, 1) * maxRotateX * falloff;
      targetY = -clamp(dx, -1, 1) * maxRotateY * falloff;
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const tick = () => {
      rotX += (targetX - rotX) * smoothing;
      rotY += (targetY - rotY) * smoothing;

      const lift = Math.min(
        1,
        Math.hypot(rotX / maxRotateX, rotY / maxRotateY),
      );

      container.style.setProperty("--rx", `${rotX.toFixed(2)}deg`);
      container.style.setProperty("--ry", `${rotY.toFixed(2)}deg`);
      container.style.setProperty("--lift", lift.toFixed(3));

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    tick();

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [maxRotateX, maxRotateY, smoothing]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "[perspective:1200px] motion-safe:animate-perspective-blur-in",
        className,
      )}
      {...props}
    >
      <div className="[transform-style:preserve-3d] w-full h-full">
        <div
          ref={cardRef}
          className="w-full h-full will-change-transform"
          style={{
            transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

type HighlightColor = "red" | "purple" | "green";

interface HighlightProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Color preset. Default "green". */
  color?: HighlightColor;
}

export const Highlight = ({
  color = "green",
  className,
  style,
  children,
  ...props
}: HighlightProps) => {
  const bgColors = {
    red: "rgba(232, 156, 156, 0.95)",
    purple: "rgba(184, 160, 219, 0.95)",
    green: "rgba(159, 214, 141, 0.95)",
  };

  const ringColors = {
    red: "220, 130, 130",
    purple: "160, 120, 220",
    green: "120, 200, 100",
  };

  return (
    <span
      className={cn(
        "inline-block rounded-[3px] px-2.5 py-0.5 text-zinc-950 font-bold shadow-sm will-change-[transform,box-shadow] select-none",
        className,
      )}
      style={{
        backgroundColor: bgColors[color],
        color: "#09090b",
        transform:
          "translate(calc(-8px * var(--lift, 0)), calc(-6px * var(--lift, 0)))",
        boxShadow: `rgba(${ringColors[color]}, calc(0.8 * var(--lift, 0))) 2px 1.5px 0px 0.75px, rgba(${ringColors[color]}, calc(0.3 * var(--lift, 0))) 8px 4px 4px 0px`,
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
