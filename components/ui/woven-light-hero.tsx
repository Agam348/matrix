"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import * as THREE from 'three';

// --- Main Hero Component ---
export const WovenLightHero = () => {
  const textControls = useAnimation();
  const buttonControls = useAnimation();

  useEffect(() => {
    // Add a more elegant font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    textControls.start(i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 1.5,
        duration: 1.2,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }));
    buttonControls.start({
        opacity: 1,
        transition: { delay: 2.5, duration: 1 }
    });

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, [textControls, buttonControls]);

  const headline = "Woven by Light";
  
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black">
      <WovenCanvas />
      <HeroNav />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-6xl md:text-8xl text-white" style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 0 50px rgba(255, 255, 255, 0.3)' }}>
            {headline.split(" ").map((word, i) => (
                <span key={i} className="inline-block">
                    {word.split("").map((char, j) => (
                        <motion.span key={j} custom={i * 5 + j} initial={{ opacity: 0, y: 50 }} animate={textControls} style={{ display: 'inline-block' }}>
                            {char}
                        </motion.span>
                    ))}
                    {i < headline.split(" ").length - 1 && <span>&nbsp;</span>}
                </span>
            ))}
        </h1>
        <motion.p
          custom={headline.length}
          initial={{ opacity: 0, y: 30 }}
          animate={textControls}
          className="mx-auto mt-6 max-w-xl text-lg text-slate-300"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          An interactive tapestry of light and motion, crafted with code and creativity.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={buttonControls} className="mt-10">
          <button className="rounded-full border-2 border-white/20 bg-white/10 px-8 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20" style={{ fontFamily: "'Inter', sans-serif" }}>
            Explore the Weave
          </button>
        </motion.div>
      </div>
    </div>
  );
};

// --- Navigation Component ---
const HeroNav = () => {
    return (
        <motion.nav 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 1, duration: 1 } }}
            className="absolute top-0 left-0 right-0 z-20 p-6"
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white">⎎</span>
                    <span className="text-xl font-bold text-white" style={{ fontFamily: "'Inter', sans-serif" }}>Woven</span>
                </div>
            </div>
        </motion.nav>
    );
};

// --- Three.js Canvas Component ---
export const WovenCanvas = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    if (window.matchMedia("(max-width: 768px), (pointer: coarse)").matches) return;

    const container = mountRef.current;

    let width = container.clientWidth;
    let height = container.clientHeight;
    if (width === 0 || height === 0) {
      const rect = container.getBoundingClientRect();
      width = rect.width || window.innerWidth;
      height = rect.height || 600;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2(0, 0);
    const clock = new THREE.Clock();

    // --- Woven Silk Torus Knot Particles ---
    const particleCount = 26000;
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const geometry = new THREE.BufferGeometry();
    const torusKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 32);

    // Color theme matching the MATRIX aesthetic (cyan, sky-blue, space-indigo, and cyber-emerald)
    const themeColors = [
      new THREE.Color("#6366f1"), // space-indigo
      new THREE.Color("#06b6d4"), // cyber-cyan
      new THREE.Color("#38bdf8"), // sky-blue
      new THREE.Color("#10b981"), // cyber-emerald
    ];

    for (let i = 0; i < particleCount; i++) {
        const vertexIndex = i % torusKnot.attributes.position.count;
        const x = torusKnot.attributes.position.getX(vertexIndex);
        const y = torusKnot.attributes.position.getY(vertexIndex);
        const z = torusKnot.attributes.position.getZ(vertexIndex);
        
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        originalPositions[i * 3] = x;
        originalPositions[i * 3 + 1] = y;
        originalPositions[i * 3 + 2] = z;

        const baseColor = themeColors[Math.floor(Math.random() * themeColors.length)];
        const color = baseColor.clone();
        
        // Add subtle variations to give rich visual texture
        color.offsetHSL(
          (Math.random() - 0.5) * 0.04, 
          (Math.random() - 0.5) * 0.08, 
          (Math.random() - 0.5) * 0.1
        );

        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
        
        velocities[i * 3] = 0;
        velocities[i * 3 + 1] = 0;
        velocities[i * 3 + 2] = 0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Using AdditiveBlending on dark background for stunning glows
    const material = new THREE.PointsMaterial({
        size: 0.02,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.85,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Mouse movement coordinate mapping corrected for scroll offset
    const handleMouseMove = (event: MouseEvent) => {
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        mouse.x = (x / rect.width) * 2 - 1;
        mouse.y = -(y / rect.height) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Intersection Observer to pause animation loop when off-screen
    let isVisible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );
    observer.observe(container);

    let animationId = 0;
    const animate = () => {
        animationId = requestAnimationFrame(animate);
        if (!isVisible) return; // Skip updating & rendering if off-screen
        
        const elapsedTime = clock.getElapsedTime();
        const mouseWorldX = mouse.x * 3;
        const mouseWorldY = mouse.y * 3;
        const mouseWorldZ = 0;

        for (let i = 0; i < particleCount; i++) {
            const ix = i * 3;
            const iy = i * 3 + 1;
            const iz = i * 3 + 2;

            const px = positions[ix];
            const py = positions[iy];
            const pz = positions[iz];

            const ox = originalPositions[ix];
            const oy = originalPositions[iy];
            const oz = originalPositions[iz];

            let vx = velocities[ix];
            let vy = velocities[iy];
            let vz = velocities[iz];

            // Direct arithmetic distance calculations (0 object allocations)
            const dx = px - mouseWorldX;
            const dy = py - mouseWorldY;
            const dz = pz - mouseWorldZ;
            const distSq = dx * dx + dy * dy + dz * dz;
            const dist = Math.sqrt(distSq);

            if (dist < 1.5 && dist > 0.0001) {
                const force = (1.5 - dist) * 0.01;
                vx += (dx / dist) * force;
                vy += (dy / dist) * force;
                vz += (dz / dist) * force;
            }

            // Return to original position force
            const rx = ox - px;
            const ry = oy - py;
            const rz = oz - pz;
            
            vx += rx * 0.001;
            vy += ry * 0.001;
            vz += rz * 0.001;
            
            // Damping velocity
            vx *= 0.95;
            vy *= 0.95;
            vz *= 0.95;

            positions[ix] = px + vx;
            positions[iy] = py + vy;
            positions[iz] = pz + vz;
            
            velocities[ix] = vx;
            velocities[iy] = vy;
            velocities[iz] = vz;
        }
        geometry.attributes.position.needsUpdate = true;

        points.rotation.y = elapsedTime * 0.05;
        renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const w = rect.width || window.innerWidth;
        const h = rect.height || 600;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
        observer.disconnect();
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        
        // Clean up WebGL resources
        geometry.dispose();
        material.dispose();
        torusKnot.dispose();
        renderer.dispose();

        if (container && renderer.domElement && container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
        }
    };
  }, []);

  return (
    <div ref={mountRef} className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(99,102,241,0.16),transparent_36%),linear-gradient(135deg,rgba(6,182,212,0.08),transparent_46%,rgba(16,185,129,0.07))] md:hidden" />
    </div>
  );
};
