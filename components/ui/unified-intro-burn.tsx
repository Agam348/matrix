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

uniform vec2  iResolution;
uniform float iTime;
uniform float u_progress; // 0.0 to 1.0

// Fast 2D Hash
float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}

// Smooth Value Noise
float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

// 4-Octave Rotational FBM
float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 4; i++) {
        v += a * noise(p);
        p = rot * p * 2.05 + vec2(12.3, 23.7);
        a *= 0.5;
    }
    return v;
}

// Swirling Volumetric Fire Plasma Generator
float firePlasma(vec2 p, float t) {
    vec2 flow = vec2(0.0, -t * 1.6);
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

void main() {
    if (u_progress >= 1.0) {
        discard;
        return;
    }

    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    vec2 center = vec2(0.5, 0.5);
    vec2 p = uv - center;
    float aspect = iResolution.x / iResolution.y;
    p.x *= aspect;

    float t = iTime;
    float dist = length(p);

    // 1. Calculate the rotating Phosphor30 fractal sphere
    vec2 r = iResolution.xy;
    vec3 FC = vec3(gl_FragCoord.xy, t);
    vec4 orbColor = vec4(0.0);

    float s = 0.0;
    for (float i = 0.0, z = 0.0, d = 0.0; i++ < 7e1; orbColor += (cos(s + vec4(0.0, 1.0, 8.0, 0.0)) + 1.0) / d)
    {
        vec3 pos = z * normalize(FC.rgb * 2.0 - r.xyy);
        vec3 a = normalize(cos(vec3(5.0, 0.0, 1.0) + t - d * 4.0));
        pos.z += 5.0;

        a = a * dot(a, pos) - cross(a, pos);
        for (d = 1.0; d++ < 9.0; )
            a -= sin(a * d + t).zxy / d;

        z += d = 0.1 * abs(length(pos) - 3.0) + 0.07 * abs(cos(s = a.y));
    }
    orbColor = tanh(orbColor / 5e3);

    // 2. If combustion has not started, render pristine circular fractal orb
    if (u_progress <= 0.0001) {
        fragColor = vec4(orbColor.rgb, 1.0);
        return;
    }

    // 3. Combustion Phase: Fire emerges organically from the core of the circular ball
    float maxRadius = length(vec2(aspect * 0.5, 0.5)) * 1.38;
    float currentRadius = u_progress * maxRadius;

    vec2 flameCoord = p * 4.5 + vec2(0.0, -t * 0.6);
    float flameTurbulence = firePlasma(flameCoord, t);
    float fiberNoise = noise(p * 24.0 + vec2(0.0, -t * 0.8));

    // Ragged fire boundary rooted in the ball's structure
    float raggedEdge = (flameTurbulence * 0.32 - 0.16) + (fiberNoise * 0.04);
    float burnFront = currentRadius + raggedEdge;
    float diff = burnFront - dist;

    // A. Inside the expanding burn hole: 100% transparent to reveal portfolio website
    if (diff > 0.0) {
        discard;
        return;
    }

    // B. Burning Combustion Seam on the edge of the circular ball
    float edge = -diff;
    float coreWidth  = 0.048;
    float flameWidth = 0.120;
    float emberWidth = 0.220;

    if (edge < coreWidth) {
        // ZONE 1: Incandescent Core Fire (Molten White-Gold eruption from ball center)
        float norm = edge / coreWidth;
        float pulse = 0.9 + 0.1 * sin(t * 18.0 + p.x * 25.0);
        vec3 core = mix(vec3(1.0, 1.0, 1.0), vec3(1.0, 0.86, 0.22), norm) * pulse;
        
        float lick = pow(flameTurbulence, 2.0) * 0.6;
        core += vec3(lick, lick * 0.85, lick * 0.25);
        
        fragColor = vec4(core, 1.0);
        return;
    } else if (edge < flameWidth) {
        // ZONE 2: Swirling Fire Plasma licking along the circular ball
        float norm = (edge - coreWidth) / (flameWidth - coreWidth);
        float flicker = 0.88 + 0.12 * cos(t * 12.0 + p.y * 20.0);
        vec3 fire = mix(vec3(1.0, 0.70, 0.06), vec3(0.96, 0.26, 0.01), norm) * flicker;
        fire *= (0.85 + 0.35 * flameTurbulence);
        
        // Harmonize fire with the underlying orb's intensity
        fire += orbColor.rgb * (1.0 - norm) * 0.4;
        
        fragColor = vec4(fire, 1.0);
        return;
    } else if (edge < emberWidth) {
        // ZONE 3: Glowing Red-Hot Ball Filaments & Embers
        float norm = (edge - flameWidth) / (emberWidth - flameWidth);
        float breathe = 0.85 + 0.15 * sin(t * 6.0 + flameTurbulence * 8.0);
        vec3 ember = mix(vec3(0.92, 0.20, 0.01), vec3(0.42, 0.06, 0.0), norm) * breathe;
        
        // Seamlessly ignite the fractal ball's filaments into glowing fire veins!
        vec3 heatedOrb = orbColor.rgb + vec3(orbColor.g * 0.8 + orbColor.r * 1.2, orbColor.g * 0.3, 0.0);
        vec3 finalEmber = mix(ember, heatedOrb, norm * 0.6);
        
        fragColor = vec4(finalEmber, 1.0);
        return;
    }

    // C. Outside the combustion zone: The remaining parts of the circular ball continue rotating!
    // Near the fire edge, the ball reflects warm fiery heat glow
    float heatGlowDist = clamp((edge - emberWidth) / 0.25, 0.0, 1.0);
    vec3 heatCorona = vec3(0.35, 0.08, 0.0) * (1.0 - heatGlowDist) * (0.8 + 0.2 * sin(t * 8.0));
    
    vec3 resultColor = orbColor.rgb + heatCorona;
    fragColor = vec4(resultColor, 1.0);
}
`;

interface UnifiedIntroBurnProps {
  burnActive: boolean;
  burnDurationMs: number;
  onComplete?: () => void;
  className?: string;
}

export function UnifiedIntroBurn({
  burnActive,
  burnDurationMs,
  onComplete,
  className,
}: UnifiedIntroBurnProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const startTimeRef = useRef<number>(0);
  const burnStartTimeRef = useRef<number | null>(null);
  const onCompleteRef = useRef(onComplete);
  const burnActiveRef = useRef(burnActive);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    burnActiveRef.current = burnActive;
    if (burnActive && burnStartTimeRef.current === null) {
      burnStartTimeRef.current = performance.now();
    }
  }, [burnActive]);

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

    // Full screen quad buffer
    const quad = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, "iResolution");
    const uTime = gl.getUniformLocation(program, "iTime");
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
    let animId: number;

    const render = (now: number) => {
      const time = (now - startTimeRef.current) * 0.001;
      let progress = 0;

      if (burnActiveRef.current) {
        if (burnStartTimeRef.current === null) {
          burnStartTimeRef.current = now;
        }
        const elapsed = now - burnStartTimeRef.current;
        const x = Math.min(elapsed / burnDurationMs, 1);

        // Quintic Smoothstep for infinite zero-jerk continuous motion
        progress = x * x * x * (x * (x * 6 - 15) + 10);

        if (x >= 1) {
          progress = 1.0;
          if (onCompleteRef.current) {
            onCompleteRef.current();
          }
        }
      }

      gl.useProgram(program);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, time);
      gl.uniform1f(uProgress, progress);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.bindVertexArray(vao);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      if (progress < 1.0) {
        animId = requestAnimationFrame(render);
      }
    };

    // Synchronously paint frame 0 to eliminate any initial flash
    render(performance.now());

    // Cleanly remove static HTML curtain now that WebGL is drawing
    const curtain = document.getElementById("intro-preloader-curtain");
    if (curtain) {
      curtain.remove();
    }

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(vbo);
      gl.deleteVertexArray(vao);
    };
  }, [burnDurationMs]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none z-50 ${className || ""}`}
      style={{ display: "block" }}
    />
  );
}

// Atmospheric convective flying ember sparks & rising ash
export function UnifiedEmberSparks({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;
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

    const particles = Array.from({ length: 55 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 2.0 + 0.8) * dpr;
      return {
        x: centerX + (Math.random() - 0.5) * 40 * dpr,
        y: centerY + (Math.random() - 0.5) * 40 * dpr,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (Math.random() * 1.6 + 0.6) * dpr,
        size: (Math.random() * 2.2 + 0.9) * dpr,
        alpha: Math.random() * 0.9 + 0.1,
        decay: Math.random() * 0.005 + 0.003,
        color: Math.random() > 0.4 ? "#ffc300" : "#ff6a00",
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha > 0) {
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
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
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-50"
      style={{ display: "block" }}
    />
  );
}
