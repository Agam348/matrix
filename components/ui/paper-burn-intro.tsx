"use client";

import React, { useEffect, useRef, useLayoutEffect } from "react";

const VERT_SRC = `#version 300 es
precision highp float;
layout(location=0) in vec2 a_pos;
out vec2 v_uv;
void main() {
    v_uv = a_pos * 0.5 + 0.5;
    gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG_SRC = `#version 300 es
precision highp float;

out vec4 fragColor;
in vec2 v_uv;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_progress; // 0.0 to 1.0

// High quality 2D hash
float hash21(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
}

// Smooth 2D noise with cubic Hermite interpolation
float smoothNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    
    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));
    
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

// 4-Octave Rotational FBM for realistic flame turbulence
float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 4; i++) {
        v += a * smoothNoise(p);
        p = rot * p * 2.15 + vec2(12.5, 34.2);
        a *= 0.5;
    }
    return v;
}

// Swirling Volumetric Fire Plasma Generator
float firePlasma(vec2 p, float t) {
    // Dynamic upward convection flow
    vec2 flow = vec2(0.0, -t * 1.8);
    
    // Domain warped turbulent flame layers
    vec2 q = vec2(
        fbm(p + flow),
        fbm(p + vec2(4.3, 1.7) + flow * 0.8)
    );
    
    vec2 r = vec2(
        fbm(p + 3.0 * q + vec2(2.1, 7.3) + flow * 1.2),
        fbm(p + 3.0 * q + vec2(6.8, 3.4) + flow * 1.1)
    );
    
    return fbm(p + 2.8 * r);
}

// Cellular Voronoi for glowing ember veins & burning paper ash
float voronoi(vec2 p) {
    vec2 n = floor(p);
    vec2 f = fract(p);
    float minDist = 1.0;
    for (int j = -1; j <= 1; j++) {
        for (int i = -1; i <= 1; i++) {
            vec2 g = vec2(float(i), float(j));
            vec2 o = vec2(hash21(n + g), hash21(n + g + vec2(17.3, 43.1)));
            vec2 r = g + o - f;
            float d = dot(r, r);
            minDist = min(minDist, d);
        }
    }
    return sqrt(minDist);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    
    // Before combustion: solid black paper cover
    if (u_progress <= 0.0001) {
        fragColor = vec4(0.0, 0.0, 0.0, 1.0);
        return;
    }
    
    if (u_progress >= 1.0) {
        discard;
        return;
    }

    vec2 center = vec2(0.5, 0.5);
    vec2 p = uv - center;
    float aspect = u_resolution.x / u_resolution.y;
    p.x *= aspect;

    float t = u_time * 2.0;

    // Heat & flame tongues rise with thermal buoyancy
    vec2 flameCoord = p * 4.5;
    flameCoord.y -= t * 0.6;

    float flameTurbulence = firePlasma(flameCoord, t);
    float ashTexture = voronoi(p * 22.0);
    float fiberNoise = smoothNoise(p * 28.0 + vec2(0.0, -t * 1.2));

    // Diagonal distance needed to completely clear all screen corners
    float maxRadius = length(vec2(aspect * 0.5, 0.5)) * 1.38;
    float currentRadius = u_progress * maxRadius;

    // Asymmetric organic paper combustion front with cellulose fiber tears
    float raggedEdge = (flameTurbulence * 0.35 - 0.175) + (fiberNoise * 0.05);
    float burnFront = currentRadius + raggedEdge;

    float dist = length(p);
    float diff = burnFront - dist;

    if (diff > 0.0) {
        // Burn hole interior: 100% transparent to reveal your portfolio
        discard;
    } else {
        float edge = -diff;
        
        // Photorealistic Blackbody Combustion Gradient Zones
        float flameCore = 0.048;
        float flameBody = 0.115;
        float emberZone = 0.20;
        float charSoot  = 0.32;

        if (edge < flameCore) {
            // ZONE 1: Incandescent Plasma Core (1500°C+ White-Yellow Blinding Light)
            float norm = edge / flameCore;
            float pulse = 0.9 + 0.1 * sin(t * 22.0 + p.x * 30.0 + p.y * 20.0);
            
            vec3 coreLight = mix(vec3(1.0, 1.0, 1.0), vec3(1.0, 0.88, 0.25), norm) * pulse;
            
            float lick = pow(flameTurbulence, 2.0) * 0.6;
            coreLight += vec3(lick, lick * 0.85, lick * 0.3);
            
            fragColor = vec4(coreLight, 1.0);
        } else if (edge < flameBody) {
            // ZONE 2: Volumetric Swirling Fire (1100°C Golden Flame Mantle)
            float norm = (edge - flameCore) / (flameBody - flameCore);
            float flicker = 0.88 + 0.12 * cos(t * 14.0 + p.y * 25.0);
            
            vec3 firePlasmaColor = mix(vec3(1.0, 0.72, 0.08), vec3(0.98, 0.28, 0.01), norm) * flicker;
            firePlasmaColor *= (0.8 + 0.4 * flameTurbulence);
            
            fragColor = vec4(firePlasmaColor, 1.0);
        } else if (edge < emberZone) {
            // ZONE 3: Glowing Red-Hot Embers & Molten Ash Cracks (800°C)
            float norm = (edge - flameBody) / (emberZone - flameBody);
            float breathe = 0.82 + 0.18 * sin(t * 7.0 + ashTexture * 12.0);
            
            vec3 emberColor = mix(vec3(0.92, 0.20, 0.01), vec3(0.45, 0.06, 0.0), norm) * breathe;
            
            if (ashTexture < 0.32) {
                float fissure = (0.32 - ashTexture) / 0.32;
                emberColor += vec3(1.0, 0.55, 0.05) * fissure * breathe;
            }
            
            fragColor = vec4(emberColor, 1.0);
        } else if (edge < charSoot) {
            // ZONE 4: Burnt Carbon & Charred Black Ash (Smoldering paper boundary)
            float norm = (edge - emberZone) / (charSoot - emberZone);
            vec3 soot = mix(vec3(0.24, 0.09, 0.03), vec3(0.0, 0.0, 0.0), norm);
            soot += vec3(flameTurbulence * 0.05);
            
            fragColor = vec4(soot, 1.0);
        } else {
            // ZONE 5: Intact unburned solid black paper
            fragColor = vec4(0.0, 0.0, 0.0, 1.0);
        }
    }
}
`;

interface PaperBurnCanvasProps {
  durationMs: number;
  delayMs?: number;
  onComplete?: () => void;
  className?: string;
}

export function PaperBurnCanvas({
  durationMs,
  delayMs = 200,
  onComplete,
  className,
}: PaperBurnCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glRef = useRef<WebGL2RenderingContext | null>(null);
  const progRef = useRef<WebGLProgram | null>(null);
  const animRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
      powerPreference: "high-performance",
    });
    if (!gl) return;
    glRef.current = gl;

    // Compile Vertex Shader
    const vs = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vs, VERT_SRC);
    gl.compileShader(vs);

    // Compile Fragment Shader
    const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fs, FRAG_SRC);
    gl.compileShader(fs);

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    progRef.current = program;

    // Full screen quad buffer
    const quad = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uProgress = gl.getUniformLocation(program, "u_progress");

    const resize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
    };

    resize();
    window.addEventListener("resize", resize);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    startTimeRef.current = performance.now();

    // 120fps hardware-accelerated direct GPU render loop
    const render = (now: number) => {
      if (!gl || !progRef.current) return;

      const totalElapsed = now - startTimeRef.current;
      const burnElapsed = Math.max(0, totalElapsed - delayMs);
      const x = Math.min(burnElapsed / durationMs, 1);

      // Quintic Smoothstep: 6x^5 - 15x^4 + 10x^3
      const progress = burnElapsed === 0 ? 0 : x * x * x * (x * (x * 6 - 15) + 10);
      const time = totalElapsed * 0.001;

      gl.useProgram(progRef.current);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, time);
      gl.uniform1f(uProgress, progress);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.bindVertexArray(vao);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      if (x < 1) {
        animRef.current = requestAnimationFrame(render);
      } else {
        if (onCompleteRef.current) {
          onCompleteRef.current();
        }
      }
    };

    // Synchronously render the initial black frame before browser paints
    render(performance.now());

    // Cleanly remove static HTML curtain now that WebGL is drawing frame 0
    const curtain = document.getElementById("intro-preloader-curtain");
    if (curtain) {
      curtain.remove();
    }

    animRef.current = requestAnimationFrame(render);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      if (gl) {
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.deleteBuffer(vbo);
        gl.deleteVertexArray(vao);
      }
    };
  }, [durationMs, delayMs]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none z-50 ${className || ""}`}
      style={{ display: "block" }}
    />
  );
}

// Atmospheric convective flying ember sparks & rising ash
export function EmberSparks() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const particles = Array.from({ length: 65 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 2.2 + 0.8) * dpr;
      return {
        x: centerX + (Math.random() - 0.5) * 50 * dpr,
        y: centerY + (Math.random() - 0.5) * 50 * dpr,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (Math.random() * 1.8 + 0.8) * dpr,
        size: (Math.random() * 2.4 + 1.0) * dpr,
        alpha: Math.random() * 0.9 + 0.1,
        decay: Math.random() * 0.004 + 0.003,
        color:
          Math.random() > 0.4
            ? "#ffc300"
            : Math.random() > 0.5
            ? "#ff7b00"
            : "#ff2200",
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        p.vx += (Math.random() - 0.5) * 0.05 * dpr;

        if (p.alpha > 0) {
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8 * dpr;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-50"
      style={{ display: "block" }}
    />
  );
}
