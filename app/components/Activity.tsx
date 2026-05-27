"use client";

import React, { useState } from "react";
import { soundManager } from "../lib/sound";

interface Commit {
  hash: string;
  repo: string;
  msg: string;
  time: string;
}

const COMMITS_DATA: Commit[] = [
  { hash: "f0d2c88", repo: "gurmat-darbar-app", msg: "implemented mobile layout state configurations", time: "2 hrs ago" },
  { hash: "3e5a1b2", repo: "tischtap-ordering", msg: "integrated responsive digital menu viewsheets", time: "1 day ago" },
  { hash: "b8c19d4", repo: "cess-tech-fest", msg: "structured budget modeling tracking sheets", time: "3 days ago" },
  { hash: "9e40f1a", repo: "portfolio-minimal", msg: "optimized layout typography and grid density", time: "5 days ago" },
];

export default function Activity() {
  const [commits] = useState<Commit[]>(COMMITS_DATA);
  
  const rows = 7;
  const cols = 34;
  const [gridData, setGridData] = useState<number[][]>(() =>
    Array(rows)
      .fill(0)
      .map((_, r) =>
        Array(cols)
          .fill(0)
          .map((_, c) => {
            // A simple deterministic pseudo-random generator to ensure matching
            // server and client output, avoiding hydration mismatch.
            const val = Math.sin(r * 12.9898 + c * 78.233) * 43758.5453123;
            return Math.floor((val - Math.floor(val)) * 4);
          })
      )
  );

  const handleCellClick = (r: number, c: number) => {
    soundManager.playBeep(800 + r * 50 + c * 10, 0.05);
    const newGrid = [...gridData.map((row) => [...row])];
    newGrid[r][c] = (newGrid[r][c] + 1) % 5;
    setGridData(newGrid);
  };

  return (
    <section
      id="activity"
      className="py-24 px-6 sm:px-12 max-w-5xl mx-auto flex flex-col justify-center items-center w-full min-h-screen"
    >
      {/* Title block */}
      <div className="w-full text-left mb-12 border-b border-zinc-800/80 pb-4">
        <h2 className="font-space text-2xl font-bold text-white tracking-tight">
          Activity
        </h2>
        <p className="font-sora text-xs text-zinc-500 mt-1 uppercase tracking-wider">
          Software engineering stats and version tracking history
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-stretch">
        
        {/* Left Side: Stats and Languages */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Stats Grid */}
          <div className="linear-card p-5 grid grid-cols-2 gap-4 border border-zinc-800 bg-zinc-900/10 rounded-xl">
            <div className="space-y-1">
              <span className="text-[10px] font-space font-bold text-zinc-500 uppercase tracking-wider block">Commits</span>
              <span className="text-xl font-space font-bold text-indigo-400">1,492</span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-space font-bold text-zinc-500 uppercase tracking-wider block">Repos</span>
              <span className="text-xl font-space font-bold text-white">24</span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-space font-bold text-zinc-500 uppercase tracking-wider block">PRs</span>
              <span className="text-xl font-space font-bold text-indigo-400">72</span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-space font-bold text-zinc-500 uppercase tracking-wider block">Stars</span>
              <span className="text-xl font-space font-bold text-white">36</span>
            </div>
          </div>

          {/* Languages visualizer */}
          <div className="linear-card p-5 space-y-4 flex-1 flex flex-col justify-center border border-zinc-800 bg-zinc-900/10 rounded-xl">
            <div className="text-xs font-bold font-space text-zinc-300 border-b border-zinc-800/60 pb-2">
              Language Split
            </div>
            
            <div className="space-y-3">
              {[
                { name: "TypeScript / React", pct: 45, color: "bg-indigo-400" },
                { name: "Dart / Flutter", pct: 30, color: "bg-zinc-400" },
                { name: "JavaScript", pct: 15, color: "bg-zinc-600" },
                { name: "Python / Data Science", pct: 10, color: "bg-zinc-700" },
              ].map((lang) => (
                <div key={lang.name} className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-space font-bold text-zinc-400">
                    <span>{lang.name}</span>
                    <span>{lang.pct}%</span>
                  </div>
                  <div className="w-full bg-zinc-950 h-1 rounded-full overflow-hidden border border-zinc-900">
                    <div className={`h-full ${lang.color}`} style={{ width: `${lang.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Contribution Grid & Commits */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Contribution Grid */}
          <div className="linear-card p-5 flex flex-col overflow-x-auto border border-zinc-800 bg-zinc-900/10 rounded-xl">
            <div className="text-xs font-bold font-space text-zinc-300 border-b border-zinc-800/60 pb-2 mb-4 flex justify-between items-center">
              <span>Contribution Matrix</span>
            </div>
            
            {/* Grid display */}
            <div className="flex flex-col gap-1 w-max mx-auto md:mx-0">
              {gridData.map((row, rIdx) => (
                <div key={rIdx} className="flex gap-1">
                  {row.map((val, cIdx) => (
                    <button
                      key={cIdx}
                      onClick={() => handleCellClick(rIdx, cIdx)}
                      className={`w-3 h-3 rounded-sm transition-all focus:outline-none cursor-pointer ${
                        val === 0
                          ? "bg-zinc-900/60 hover:bg-zinc-800"
                          : val === 1
                          ? "bg-indigo-500/15 hover:bg-indigo-500/25"
                          : val === 2
                          ? "bg-indigo-500/30 hover:bg-indigo-500/40"
                          : val === 3
                          ? "bg-indigo-500/50 hover:bg-indigo-500/65"
                          : "bg-indigo-500"
                      }`}
                    />
                  ))}
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-[9px] font-space text-zinc-500 mt-4 select-none">
              <span>Less</span>
              <div className="flex gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-zinc-900" />
                <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500/15" />
                <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500/30" />
                <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500/50" />
                <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500" />
              </div>
              <span>More</span>
            </div>
          </div>

          {/* Commits logs feed */}
          <div className="linear-card p-5 flex flex-col flex-1 border border-zinc-800 bg-zinc-900/10 rounded-xl min-h-[160px]">
            <div className="text-xs font-bold font-space text-zinc-300 border-b border-zinc-800/60 pb-2 mb-3">
              Commit Feed Logs
            </div>
            
            <div className="flex-1 space-y-2 overflow-y-auto pr-2 scrollbar-thin">
              {commits.map((commit, idx) => (
                <div
                  key={commit.hash + idx}
                  className="flex items-start justify-between font-space text-[10px] py-2 border-b border-zinc-900 last:border-0 hover:bg-zinc-800/10 transition-colors px-1"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-indigo-400 font-semibold">{commit.repo}</span>
                      <span className="text-zinc-300">{commit.msg}</span>
                    </div>
                    <div className="text-zinc-500">{commit.hash}</div>
                  </div>
                  <span className="text-zinc-500 shrink-0 select-none">{commit.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
