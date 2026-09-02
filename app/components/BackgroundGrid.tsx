"use client";

import React, { useEffect, useRef } from "react";

export default function BackgroundGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(max-width: 768px), (pointer: coarse)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Particle nodes for floating connection web
    const nodeCount = 30; // Fewer nodes for cleaner feel
    const nodes: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25, // Slower, calmer movement
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.0 + 0.5,
      });
    }

    let animId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid floor perspective lines in background
      ctx.strokeStyle = "rgba(255, 255, 255, 0.015)";
      ctx.lineWidth = 1;
      
      const horizontalSpacing = 80; // Larger spacing for a cleaner grid
      const verticalSpacing = 80;
      
      for (let x = 0; x < canvas.width; x += horizontalSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += verticalSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw connection web lines
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodeCount; i++) {
        const n1 = nodes[i];
        
        // Update positions
        n1.x += n1.vx;
        n1.y += n1.vy;
        
        // Boundary checking
        if (n1.x < 0 || n1.x > canvas.width) n1.vx *= -1;
        if (n1.y < 0 || n1.y > canvas.height) n1.vy *= -1;
        
        // Draw particle
        ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
        ctx.beginPath();
        ctx.arc(n1.x, n1.y, n1.radius, 0, Math.PI * 2);
        ctx.fill();

        // Check distances to link
        for (let j = i + 1; j < nodeCount; j++) {
          const n2 = nodes[j];
          const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
          
          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.05;
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-50 overflow-hidden bg-[#09090b] pointer-events-none">
      {/* Interlinked Node Web Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 hidden w-full h-full md:block" />
    </div>
  );
}
