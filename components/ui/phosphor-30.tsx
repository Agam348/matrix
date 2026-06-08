"use client";

import React, { useEffect, useRef } from "react";

const SHADER_SRC = `#version 300 es
precision highp float;

out vec4 fragColor;
in vec2 v_uv;

uniform vec3  iResolution;
uniform float iTime;
uniform int   iFrame;
uniform vec4  iMouse;

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2  r  = iResolution.xy;
    float t  = iTime;
    vec3  FC = vec3(fragCoord, t);
    vec4  o  = vec4(0.0);

    float s = 0.0;
    for (float i = 0.0, z = 0.0, d = 0.0; i++ < 8e1; o += (cos(s + vec4(0.0, 1.0, 8.0, 0.0)) + 1.0) / d)
    {
        vec3 p = z * normalize(FC.rgb * 2.0 - r.xyy);
        vec3 a = normalize(cos(vec3(5.0, 0.0, 1.0) + t - d * 4.0));
        p.z += 5.0;

        a = a * dot(a, p) - cross(a, p);
        for (d = 1.0; d++ < 9.0; )
            a -= sin(a * d + t).zxy / d;

        z += d = 0.1 * abs(length(p) - 3.0) + 0.07 * abs(cos(s = a.y));
    }
    o = tanh(o / 5e3);

    fragColor = vec4(o.rgb, 1.0);
}

void main(){
  mainImage(fragColor, gl_FragCoord.xy);
}
`;

const VERT_SRC = `#version 300 es
precision highp float;
layout(location=0) in vec2 a_pos;
out vec2 v_uv;
void main(){
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

function safeCompile(gl: WebGL2RenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return { shader: null, log: "Failed to create shader." };

  gl.shaderSource(shader, src);
  gl.compileShader(shader);

  const ok = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  const log = gl.getShaderInfoLog(shader) || "";

  return { shader: ok ? shader : null, log };
}

function safeLink(gl: WebGL2RenderingContext, vs: WebGLShader, fs: WebGLShader) {
  const program = gl.createProgram();
  if (!program) return { program: null, log: "Failed to create program." };

  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  const ok = gl.getProgramParameter(program, gl.LINK_STATUS);
  const log = gl.getProgramInfoLog(program) || "";

  return { program: ok ? program : null, log };
}

function drawError(gl: WebGL2RenderingContext, msg: string) {
  console.error(msg);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.clearColor(0.2, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

function ShaderCanvas({
  fragSource,
  pixelRatio,
}: {
  fragSource: string;
  pixelRatio?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const frameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, l: 0, r: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const canvasEl = canvas;
    const context = canvasEl.getContext("webgl2", { premultipliedAlpha: false });
    if (!context) return;
    const gl: WebGL2RenderingContext = context;

    let disposed = false;
    let vao: WebGLVertexArrayObject | null = null;
    let vbo: WebGLBuffer | null = null;
    let program: WebGLProgram | null = null;
    let ro: ResizeObserver | null = null;
    let resizeScheduled = false;
    let mouseBound = false;
    let ctxBound = false;

    const getDpr = () => {
      const sys = window.devicePixelRatio || 1;
      return Math.max(1, Math.min(2, pixelRatio ?? sys));
    };

    function applySize() {
      resizeScheduled = false;
      if (disposed) return;

      const dpr = getDpr();
      const cssW = Math.max(1, canvasEl.clientWidth | 0);
      const cssH = Math.max(1, canvasEl.clientHeight | 0);
      const w = Math.max(1, Math.floor(cssW * dpr));
      const h = Math.max(1, Math.floor(cssH * dpr));

      if (canvasEl.width !== w || canvasEl.height !== h) {
        canvasEl.width = w;
        canvasEl.height = h;
        gl.viewport(0, 0, w, h);
      }
    }

    function scheduleSize() {
      if (resizeScheduled) return;
      resizeScheduled = true;
      requestAnimationFrame(applySize);
    }

    const onMove = (event: MouseEvent) => {
      const rect = canvasEl.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouseRef.current.x = Math.max(0, Math.min(x, rect.width));
      mouseRef.current.y = Math.max(0, Math.min(rect.height - y, rect.height));
    };

    const onDown = (event: MouseEvent) => {
      if (event.button === 0) mouseRef.current.l = 1;
      if (event.button === 2) mouseRef.current.r = 1;
    };

    const onUp = (event: MouseEvent) => {
      if (event.button === 0) mouseRef.current.l = 0;
      if (event.button === 2) mouseRef.current.r = 0;
    };

    const onCtxMenu = (event: Event) => event.preventDefault();
    const onContextLost = (event: Event) => {
      event.preventDefault();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
    const onContextRestored = () => {
      scheduleSize();
      startRef.current = performance.now();
      frameRef.current = 0;
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
    };

    function cleanup() {
      disposed = true;

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      if (mouseBound) {
        canvasEl.removeEventListener("mousemove", onMove);
        canvasEl.removeEventListener("mousedown", onDown);
        canvasEl.removeEventListener("mouseup", onUp);
        canvasEl.removeEventListener("contextmenu", onCtxMenu);
        mouseBound = false;
      }

      if (ctxBound) {
        canvasEl.removeEventListener("webglcontextlost", onContextLost);
        canvasEl.removeEventListener("webglcontextrestored", onContextRestored);
        ctxBound = false;
      }

      if (ro) {
        ro.disconnect();
        ro = null;
      }

      if (vbo) {
        gl.deleteBuffer(vbo);
        vbo = null;
      }
      if (vao) {
        gl.deleteVertexArray(vao);
        vao = null;
      }
      if (program) {
        gl.deleteProgram(program);
        program = null;
      }
    }

    vao = gl.createVertexArray();
    vbo = gl.createBuffer();
    if (!vao || !vbo) {
      drawError(gl, "Failed to create VAO/VBO.");
      return cleanup;
    }

    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const { shader: vs, log: vsLog } = safeCompile(gl, gl.VERTEX_SHADER, VERT_SRC);
    if (!vs) {
      drawError(gl, `Vertex compile error:\n${vsLog}`);
      return cleanup;
    }

    const { shader: fs, log: fsLog } = safeCompile(gl, gl.FRAGMENT_SHADER, fragSource);
    if (!fs) {
      drawError(gl, `Fragment compile error:\n${fsLog}`);
      gl.deleteShader(vs);
      return cleanup;
    }

    const linked = safeLink(gl, vs, fs);
    gl.deleteShader(vs);
    gl.deleteShader(fs);

    if (!linked.program) {
      drawError(gl, `Program link error:\n${linked.log}`);
      return cleanup;
    }
    program = linked.program;

    const uResolution = gl.getUniformLocation(program, "iResolution");
    const uTime = gl.getUniformLocation(program, "iTime");
    const uFrame = gl.getUniformLocation(program, "iFrame");
    const uMouse = gl.getUniformLocation(program, "iMouse");

    ro = new ResizeObserver(scheduleSize);
    ro.observe(canvasEl);
    scheduleSize();

    canvasEl.addEventListener("mousemove", onMove);
    canvasEl.addEventListener("mousedown", onDown);
    canvasEl.addEventListener("mouseup", onUp);
    canvasEl.addEventListener("contextmenu", onCtxMenu);
    mouseBound = true;

    canvasEl.addEventListener("webglcontextlost", onContextLost);
    canvasEl.addEventListener("webglcontextrestored", onContextRestored);
    ctxBound = true;

    startRef.current = performance.now();
    frameRef.current = 0;

    function tick(now: number) {
      if (disposed) return;
      if (gl.isContextLost()) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const time = (now - startRef.current) / 1000;
      frameRef.current += 1;

      try {
        if (resizeScheduled) applySize();

        gl.useProgram(program);

        const dpr = getDpr();
        const w = canvasEl.width;
        const h = canvasEl.height;

        if (uResolution) gl.uniform3f(uResolution, w, h, dpr);
        if (uTime) gl.uniform1f(uTime, time);
        if (uFrame) gl.uniform1i(uFrame, frameRef.current);
        if (uMouse) {
          const mouse = mouseRef.current;
          gl.uniform4f(uMouse, mouse.x * dpr, mouse.y * dpr, mouse.l, mouse.r);
        }

        gl.bindVertexArray(vao);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      } catch (error) {
        drawError(gl, (error as Error)?.message ?? String(error));
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    return cleanup;
  }, [fragSource, pixelRatio]);

  return (
    <div className="absolute inset-0">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}

export default function Phosphor30() {
  return (
    <div className="fixed inset-0 h-dvh w-screen overflow-hidden bg-black">
      <ShaderCanvas fragSource={SHADER_SRC} />
    </div>
  );
}
